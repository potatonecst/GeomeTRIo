# 4. データ保存とUIシステム

ランキングや設定を永続化（保存）する仕組みと、Singletonパターンを用いたUI更新、そしてInput Systemを用いたUIナビゲーションについて解説します。

## データの保存方法：クラウドセーブ (AWS Lambda + DynamoDB)

このプロジェクトでは、すべてのユーザーデータ（設定、ランキング、統計）を **クラウド上のデータベース (DynamoDB)** で一元管理しています。

### 変更点：PlayerPrefsの廃止とGameDataへの統合
以前は設定値（HP、SPなど）を `PlayerPrefs` で管理していましたが、現在は `GameData` クラスに統合しました。
これにより、以下のメリットがあります。
1. **データの一元管理:** 設定、スコア、進行状況を1つのオブジェクトとして管理できます。
2. **整合性の確保:** ランキング記録時に「そのスコアを出した時の設定」を正確に保存・比較できます。
3. **機種変更対応:** 将来的にID連携を行えば、異なる端末でもデータを引き継げます。

### データ構造 (GameData)
`GameData` クラスは、ゲームの全永続化データを保持するルートオブジェクトです。`[System.Serializable]` 属性をつけることで、`JsonUtility` による変換を可能にしています。

```csharp
[System.Serializable] // これをつけると保存可能になる
public class GameData
{
    public string playerName = "Player";
    
    // プレイヤー設定 (HP, SP, AutoFire)
    public PlayerSettings settings = new PlayerSettings(3, 2);
    
    // プレイ統計
    public PlayerStats stats = new PlayerStats();
    
    // ランキングデータ
    public List<ScoreRecord> stage1Scores = new List<ScoreRecord>();
    public List<ScoreRecord> scoreAttackScores = new List<ScoreRecord>();
}

[System.Serializable]
public struct PlayerStats
{
    public float totalPlayTime;
    public int totalEnemiesDefeated;
    public int totalGamesPlayed;
    public int totalDamageTaken;
    public int totalDamageDealt;      // 追加
    public int totalShotsFired;
    public long totalScore;           // 追加 (long)
    public int totalSpUsed;           // 追加
    public int totalChainKills;       // 追加
    public int itemsCollected;        // 追加
}
```

### 保存処理 (CloudSaveManager)
`CloudSaveManager` クラスが AWS Lambda の関数URLに対して HTTP POST リクエストを送信します。

```csharp
public void Save(string userId, string authToken, GameData data, Action<bool, string> callback)
{
   // 1. GameDataをJSON文字列に変換
    string jsonData = JsonUtility.ToJson(data);

    // 2. 改竄防止用のチェックサムを計算 (HMAC-SHA256)
    string checksum = CalculateChecksum(jsonData, authToken);

    // 3. UnityWebRequestで送信
    StartCoroutine(PostRequest(userId, authToken, jsonData, checksum, callback));
}
```
**セキュリティ対策:** 通信にはHTTPSを使用し、さらにデータ改竄を防ぐために HMAC-SHA256 による署名（チェックサム）を付与しています。

## UIの更新: ReactUnityによるポーリング

従来のuGUI実装ではObserverパターンを使用していましたが、ReactUnityへの移行に伴い、**ポーリング方式**に変更しました。

React側（JavaScript）は、`requestAnimationFrame` ループ内で毎フレーム C# 側の状態を取得し、UIを更新します。

### 実装の仕組み

1.  **C#側 (`ReactInputBridge.cs`):**
    *   `GetInGameStatus()` メソッドを提供。現在のHP, SP, スコアなどをJSON形式で返します。
2.  **React側 (`useGameStatus.ts`):**
    *   毎フレーム `interop.GetInGameStatus()` を呼び出し、返却されたJSONをパースしてReactのStateを更新します。
    *   Reactの差分検知機能により、値が変化した箇所だけが効率的に再描画されます。

### スコア表示の安全策 (Score Display Safety)
スコア表示において、以下の二重の安全策を講じています。

1.  **C#側 (GameManager):** `int` 型のオーバーフローを防ぐため、加算時に `int.MaxValue` (約21億) を超えないようにキャップしています。
2.  **React側 (HUD):** 万が一、通信エラーやバグで異常な桁数の数値が送られてきた場合に備え、表示時に `9999999999` (10桁) でカンスト表示にする処理を入れています。

これにより、ゲームロジックの破綻と、UIレイアウトの崩れ（桁あふれ）の両方を防いでいます。

## Input SystemによるUIナビゲーション

ReactUnityのUI操作は、UnityのInput Systemからの入力を `ReactInputBridge` が中継することで実現しています。

### 連携のフロー

1.  **入力検知 (Unity):**
    *   `ReactInputBridge` が `Navigate` (方向キー), `Submit` (決定), `Cancel` (キャンセル) などのActionを監視します。
    *   **ナビゲーション:** `Update` ループ内で毎フレーム入力をポーリングし、長押しによる連続移動（キーリピート）を実装しています。
        *   **Initial Delay:** 初回入力後の待機時間（例: 0.5秒）。
        *   **Repeat Rate:** 連続入力時の間隔（例: 0.1秒）。
        *   **設計意図:** 単純なイベント駆動（`performed`）では「押しっぱなし」の挙動をOS標準のように自然に実装するのが難しいため、ポーリング方式を採用しました。
2.  **イベント送信 (C# -> React):**
    *   入力が発生すると、`ReactRenderer.Context.Script.ExecuteScript` を介して、React側のグローバル関数 `window.onMenuInput(eventName)` を呼び出します。
    *   イベント名: `'up'`, `'down'`, `'left'`, `'right'`, `'submit'`, `'cancel'`, `'backspace'`
3.  **イベント処理 (React):**
    *   各画面コンポーネント（`Menu`, `Settings` 等）は、`useEffect` フック内で `window.onMenuInput` にコールバック関数を登録します。
    *   コンポーネントがアンマウントされる際に、コールバックを解除（空関数で上書き）して、誤動作を防ぎます。