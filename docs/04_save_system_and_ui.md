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

**環境による接続先の切り替え:**
開発中と本番リリース時で接続先のAPI（およびデータベース）を自動で切り替えるため、プリプロセッサディレクティブを使用しています。

```csharp
#if UNITY_EDITOR || DEVELOPMENT_BUILD
    // 開発環境 (Dev)
    private const string API_URL = "https://.../dev/GeomeTRIo_Backend";
#else
    // 本番環境 (Prod)
    private const string API_URL = "https://.../prod/GeomeTRIo_Backend";
#endif
```

**通常保存 (Optimistic Locking):**
```csharp
public void Save(string userId, GameData data, Action<bool, string> callback = null)
{
    // 内部で保持している最終更新日時(_lastUpdatedAt)と共に送信し、排他制御を行います。
    // ※トークン取得やチェックサム計算は SaveCoroutine 内部で行われます。
    StartCoroutine(SaveCoroutine(userId, data, _lastUpdatedAt, callback));
}
```

**強制保存 (Force Save):**
競合発生時にユーザーが「強制上書き」を選択した場合に使用します。 
```csharp
public void ForceSave(string userId, GameData data, Action<bool, string> callback = null)
{
    string authToken = GetAuthToken();
    string jsonData = JsonUtility.ToJson(data);
    string checksum = CalculateChecksum(jsonData, authToken);

    // prevUpdatedAt に null を渡すことで、サーバー側の整合性チェックをスキップさせます。
    StartCoroutine(SaveCoroutine(userId, authToken, jsonData, checksum, null, callback));
}
```
**セキュリティ対策:**
1. **通信経路:** HTTPSを使用。
2. **改竄防止:** HMAC-SHA256 による署名（チェックサム）を付与し、通信途中のデータ書き換えを検知。
3. **整合性維持:** updatedAt を用いた楽観的ロックにより、古いデータによる意図しない上書き（先祖返り）を防止。
4. **JSON正規化:** チェックサム計算時、JSONのキー順序が異なるとハッシュ値が変わってしまうため、キーをアルファベット順にソート（正規化）してから計算しています。

### データ整合性とサニタイズ (Data Sanitization)

**空文字とnullの変換問題:**
DynamoDBとUnity(C#)の間でデータをやり取りする際、以下の仕様により「初期値が消える」現象が発生する可能性があります。

1.  **DynamoDBの制約**: 空文字 (`""`) を保存できない場合があるため、バックエンド側で `null` に変換して保存しています (`convertEmptyValues: true`)。
2.  **JSONデシリアライズ**: 保存された `null` をUnityで読み込むと、JSONに `"key": null` と記録されているため、C#クラスの初期値（例: `playerName = "PLAYER"`) が `null` で上書きされてしまいます。

**対策:**
ロード直後に **サニタイズ（浄化）処理** を実行し、`null` になっている文字列フィールドを空文字 `""` や適切な初期値に復元しています。

```csharp
// CloudSaveManager.cs
if (loadedData.playerName == null) loadedData.playerName = "";
```

### 削除処理 (Delete)
`DeleteSaveData` メソッドは、クラウド上のデータを削除し、ローカルの `PlayerPrefs` も消去してアプリを初期状態（タイトル画面）にリセットします。

**失敗時のリカバリ:**
削除通信が失敗した場合、React側のUIは「削除中（操作不能）」のままスタックしてしまう可能性があります。
これを防ぐため、失敗時には `ReactInputBridge.Instance.NotifyDeleteFailed()` を呼び出し、React側の `window.onDeleteFailed` イベントを発火させてUIのロックを解除（復帰）させています。

```csharp
// GameManager.cs
// 失敗時はリロードせず、React側に通知してUIを復帰させる
ReactInputBridge.Instance?.NotifyDeleteFailed();
```

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