# 4. データ保存とUIシステム

ランキングや設定を永続化（保存）する仕組みと、Singletonパターンを用いたUI更新、そしてInput Systemを用いたUIナビゲーションについて解説します。

## データの保存方法：JSONシリアライズ

このプロジェクトでは、すべてのユーザーデータ（設定、ランキング、統計）を **JSON形式** で一元管理しています。

### 変更点：PlayerPrefsの廃止とGameDataへの統合
以前は設定値（HP、SPなど）を `PlayerPrefs` で管理していましたが、現在は `GameData` クラスに統合しました。
これにより、以下のメリットがあります。
1. **データの一元管理:** 設定、スコア、進行状況を1つのファイル (`.sav`) で管理できます。
2. **整合性の確保:** ランキング記録時に「そのスコアを出した時の設定」を正確に保存・比較できます。

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
```

### 保存処理 (JSON)
Unity標準の `JsonUtility` を使用して、クラスのインスタンスをJSON文字列に変換し、テキストファイル (`.sav`) として保存します。

```csharp
public void SaveGame(GameData data)
{
    // 保存先のパス（OSによって異なるが、Unityが自動で適切な場所を選んでくれる）
    string path = Application.persistentDataPath + "/savedata.sav";
    
    // JSONに変換してテキストファイルとして保存
    string json = JsonUtility.ToJson(data, true);
    File.WriteAllText(path, json);
}
```
**注意:** `Application.persistentDataPath` は、Windowsなら `AppData`、Macなら `Library/Application Support` など、アプリが書き込み権限を持つ安全なフォルダを指します。

## UIの更新: ReactUnityによるポーリング

従来のuGUI実装ではObserverパターンを使用していましたが、ReactUnityへの移行に伴い、**ポーリング方式**に変更しました。

React側（JavaScript）は、`requestAnimationFrame` ループ内で毎フレーム C# 側の状態を取得し、UIを更新します。

### 実装の仕組み

1.  **C#側 (`ReactInputBridge.cs`):**
    *   `GetInGameStatus()` メソッドを提供。現在のHP, SP, スコアなどをJSON形式で返します。
2.  **React側 (`useGameStatus.ts`):**
    *   毎フレーム `interop.GetInGameStatus()` を呼び出し、返却されたJSONをパースしてReactのStateを更新します。
    *   Reactの差分検知機能により、値が変化した箇所だけが効率的に再描画されます。
 
## Input SystemによるUIナビゲーション

ReactUnityのUI操作は、UnityのInput Systemからの入力を `ReactInputBridge` が中継することで実現しています。

### 連携のフロー

1.  **入力検知 (Unity):**
    *   `ReactInputBridge` が `Navigate` (方向キー), `Submit` (決定), `Cancel` (キャンセル) などのActionを監視します。
    *   **ナビゲーション:** `Update` ループ内で毎フレーム入力をポーリングし、長押しによる連続移動（キーリピート）を実装しています。
        *   **Initial Delay:** 初回入力後の待機時間（例: 0.5秒）。
        *   **Repeat Rate:** 連続入力時の間隔（例: 0.1秒）。
2.  **イベント送信 (C# -> React):**
    *   入力が発生すると、`ReactRenderer.Context.Script.ExecuteScript` を介して、React側のグローバル関数 `window.onMenuInput(eventName)` を呼び出します。
    *   イベント名: `'up'`, `'down'`, `'left'`, `'right'`, `'submit'`, `'cancel'`, `'backspace'`
3.  **イベント処理 (React):**
    *   各画面コンポーネント（`Menu`, `Settings` 等）は、`useEffect` フック内で `window.onMenuInput` にコールバック関数を登録します。
    *   コンポーネントがアンマウントされる際に、コールバックを解除（空関数で上書き）して、誤動作を防ぎます。