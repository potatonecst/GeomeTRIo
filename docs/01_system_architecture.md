# システムアーキテクチャ (System Architecture)

本ドキュメントでは、GeomeTRIoのシステム全体の構造、UnityとReactUnityの連携方式、および主要なゲームロジック（GameManager）の設計について、コードの行間にある意図まで含めて解説します。

## 1. 全体構成とハイブリッドアーキテクチャ (System Overview)

本プロジェクトは、ゲームプレイ部分（アクション）に Unity 標準機能を使用し、タイトル画面やメニュー画面などのUI部分に **ReactUnity** を採用したハイブリッドアーキテクチャを採用しています。

*   **Game Scene (Unity):**
    *   `Stage1`, `ScoreAttack` などのゲームプレイシーン。
    *   物理演算、衝突判定、パーティクルエフェクトなどは Unity の機能をフル活用。
    *   HUD (Head-Up Display) も ReactUnity で実装し、C#側の状態をポーリングして描画します。
*   **Title Scene (ReactUnity):**
    *   `TitleScene`。タイトル、メニュー、ランキング、設定画面など、UI主体のシーン。
    *   HTML/CSS (Tailwind CSS like) + React でUIを構築。
    *   アニメーションやグリッチ演出を React コンポーネントとして実装。

---

## 2. Unity (C#) と React (TypeScript) の連携

ReactUnity 環境下では、C# と JavaScript (QuickJS) が相互に通信を行う必要があります。
これは、Unityの世界（ゲームロジック）とReactの世界（UI表示）をつなぐ「橋」のようなものです。

### 2.1 入力イベントの伝達 (C# -> React)
Unity の `Input System` で検知したコントローラーやキーボードの入力を、React 側のグローバル関数を呼び出すことで伝達します。

*   **C#側 (`ReactInputBridge.cs`):**
    *   `ReactRenderer` のコンテキストを取得し、`ExecuteScript` を使用して JS側の関数 `window.onMenuInput(event)` 等を実行。
    *   例: 「上キーが押された」→ `onMenuInput('up')` を実行。
*   **React側 (`Menu.tsx` 等):**
    *   `useEffect` 内で `(window as any).onMenuInput` にコールバック関数を登録してイベントを受信。
    *   例: `onMenuInput` が呼ばれたら、選択中の項目を一つ上にずらす。

### 2.2 データと機能の提供 (C# -> React)
ランキングデータの取得やゲーム開始などの機能は、C# 側のオブジェクトを React 側に公開することで実現しています。

*   **C#側 (`ReactInputBridge.cs`):**
    *   `GameInterop` クラスを定義し、`ReactRenderer.Globals` に登録。
    *   これにより、React側からは `Globals.GameInterop` という名前でC#のオブジェクトが見えるようになります。
*   **React側 (`Ranking.tsx` 等):**
    *   `useGlobals` フック経由で `GameInterop` のメソッド (`GetGameData`, `StartGame` 等) を呼び出し。
    *   例: `interop.StartGame("Stage1")` を呼ぶと、C#側の `StartGame` メソッドが実行され、シーン遷移が始まります。

---

## 3. ゲームマネージャーとクラス設計 (Game Logic Design)

Unity側のゲームロジックは、各オブジェクト（自機、敵、UI）を統括する「監督」役の `GameManager` を中心に構成されています。

### 3.1 主要クラスの役割
- **GameManager:** ゲーム全体の状態（プレイ中、ゲームオーバー、スコア計算）、セーブデータ(GameData)の保持・保存、BGM管理を行うシングルトンクラス。
- **PlayerController:** 自機の操作を担当。
- **EnemySpawner:** 敵の出現タイミングと生成を担当。
- **SettingsManager:** ゲーム設定（音量、振動など）の管理と永続化（PlayerPrefs）を担当する静的クラス。どこからでも `SettingsManager.GetBGMVolume()` のようにアクセスできます。
- **VibrationManager:** ゲームパッドの振動制御を担当。優先度付きの振動リクエストを管理するシングルトンクラス。
- **ReactInputBridge:** Unityの入力イベントをReactに伝達し、ReactからのAPI呼び出し(GameInterop)を処理するブリッジクラス。

### 3.2 シングルトンパターン (Singleton Pattern) の詳細
`GameManager` は、ゲーム中に常に1つだけ存在し、どこからでもアクセス可能にするために **シングルトンパターン** を採用しています。

#### なぜシングルトンを使うのか？
ゲーム中、スコアやゲームの状態を管理するマネージャーは「世界に一つだけ」である必要があります。もし `GameManager` が2つあると、どちらのスコアが正しいのか分からなくなってしまいます。
また、どのスクリプトからでも `GameManager.instance.AddScore(10)` のように簡単にアクセスできるようにするためです。

```csharp
public class GameManager : MonoBehaviour
{
    // static変数として自分自身を保持する
    public static GameManager instance; // どこからでも GameManager.instance でアクセス可能

    void Awake()
    {
        // すでに他のGameManagerが存在していたら、自分を破壊して重複を防ぐ
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(gameObject); // シーン遷移しても破壊されない
        }
        else
        {
            Destroy(gameObject); // 重複したら自分を消す
        }
    }
}
```

**初心者のための解説:**
- `static`: クラスそのものに属する変数です。インスタンス化（`new`）しなくてもアクセスできます。
- `Awake()`: `Start()` よりも先に呼ばれるUnityのイベント関数です。初期化処理はここに書くのが定石です。

### 3.3 ゲームループと状態管理
ゲームには「状態（State）」があります。

1. **Playing (プレイ中):** 自機が動き、敵が出る。
2. **GameOver (ゲームオーバー):** 操作を受け付けず、リザルト画面を出す。
3. **Pause (一時停止):** 時間を止める（`Time.timeScale = 0`）。

これを `enum`（列挙型）で管理するとコードが読みやすくなります。

```csharp
public enum GameState { Playing, GameOver, Pause }
public GameState CurrentState { get; private set; }
```

---

## 4. 難易度管理システム (Difficulty Scaling)

`EnemySpawner` がゲームの経過時間を監視し、動的に難易度を調整しています。

### 実装ロジック
*   **タイマー:** `Update()` 内で `Time.deltaTime` を加算し、経過時間を計測。
*   **強化間隔:** **90秒** ごとに敵のステータスを強化。
*   **強化内容:** 敵のHPを `+1` ずつ加算。

```csharp
private float difficultyTimer;
private int difficultyLevel = 0;

private void Update()
{
    if (GameManager.Instance.CurrentState != GameState.Playing) return;

    difficultyTimer += Time.deltaTime;
    if (difficultyTimer >= 90f) // 90秒ごとに強化
    {
        difficultyTimer = 0;
        difficultyLevel++;
        // 生成する敵のHPを difficultyLevel 分だけ加算する処理へ
    }
}
```

これにより、エンドレスモード（スコアアタック）において、プレイヤーが生き残るほどゲームが難しくなる仕組みを実現しています。

### 4.1 オーディオ優先度管理 (Audio Priority Management)
Unityのオーディオシステムにおける同時発音数制限（Voice Count）により、大量のSEが鳴った際にBGMが消える問題を防ぐため、`GameManager` で優先度付きの再生制御を行っています。

*   **BGM:** `Priority = 0` (最高)。SEによって消されないように設定。
*   **イベントSE:** `Priority = 128` (標準)。レベルアップやUI操作音。
*   **弾発射音:** `Priority = 200` (低)。大量に再生されるため、発音数オーバー時はこれらから間引かれるように設定。

専用の `lowPriorityAudioSource` を追加し、弾の発射音などはそちらで再生しています。

### 4.2 発音間隔の制御 (Sound Throttling)
大量の弾が発射される状況下で、毎フレームSEを再生すると音が重なりすぎて不快になったり、処理負荷が高まったりします。
これを防ぐため、`GameManager` で発射音の再生にクールタイム（最小間隔）を設けています。

*   **プレイヤー:** `0.02秒` (秒間50回まで)。最大連射速度(0.05秒)でも音が抜けないように設定。
*   **敵:** `0.01秒` (秒間100回まで)。敵は数が多いため、制限を緩くして（間隔を短くして）音が途切れないようにしつつ、極端な負荷を防ぐ。

---

## 5. 統計情報の記録 (Statistics Tracking)

プレイヤーの活動記録を `GameData` 内の `PlayerStats` 構造体に保持し、ゲームプレイの節目で更新・保存しています。

*   **記録項目:** 総プレイ時間、総撃破数、総プレイ回数、総被ダメージ数、総発射数。
*   **更新タイミング:**
    *   敵撃破時、被弾時、発射時（メモリ上での加算）。
    *   ゲーム開始時、ゲームオーバー時、タイトルへ戻る時（ファイルへの保存）。

---

## 6. 設定データの管理 (Settings Management)

設定データは、その性質に応じて保存先を分けています。

*   **セーブデータ (`GameData.json`):** ユーザーの進行状況やプレイスタイルに関わる設定（HP, SP, AutoFire, PlayerName）。`GameManager` が管理。
*   **グローバル設定 (`PlayerPrefs`):** アプリケーション全体で共有される環境設定（BGM/SE音量, 振動）。`SettingsManager` が管理。

ReactUIの `Settings` 画面での変更は即座にメモリ上に反映されますが、ファイルへの書き込み（永続化）は画面を閉じるタイミングで一括して行われます。

---

## 7. 画面遷移フロー (Scene Transition)

タイトル画面内の遷移は React の State (`currentScreen`) で管理し、ゲームプレイへの遷移は Unity の `SceneManager` を使用します。

### 7.1 起動からメニューまで
1.  **起動**: `TitleScene` (Unity) -> `TitleApp` (React) マウント。
2.  **タイトル**: `currentScreen = 'title'`。
3.  **メニュー**: 任意のキー入力で接続演出 -> メニュー表示。
4.  **画面内遷移**:
    *   Ranking選択 -> `currentScreen = 'ranking'` (Rankingコンポーネント表示)。
    *   Stage Select選択 -> `currentScreen = 'stage_select'`。

### 7.2 ゲーム開始シーケンス (ローディング演出)
ReactUIによるリッチな演出と、Unityのシーンロードによるフリーズを両立させるため、以下の遷移フローを採用しています。

1.  **開始リクエスト:** React (`StageSelect`) が `StartGame` を呼び出す。
2.  **ローディング表示:** React側で "LOADING" とスピナーを表示。
3.  **非同期ロード開始:** `GameManager` が `SceneManager.LoadSceneAsync` を開始 (`allowSceneActivation = false`)。
4.  **演出待機:** 最低0.5秒間待機し、ローディングアニメーションを見せる。
5.  **暗転 (Blackout):** ロード完了後、`GameManager` が uGUI の黒いオーバーレイをフェードインさせて画面を暗転させる。
6.  **シーン切り替え:** 暗転完了後、`allowSceneActivation = true` にして実際にシーンを切り替える。
7.  **UI準備待機:** 新しいシーンの `Start` ではBGM再生を行わず、React側の `AspectRatioWrapper` がレイアウト計算を完了するのを待つ。
8.  **開始同期:** React側から `NotifyUIReady` が呼ばれると、`GameManager` がBGM再生を開始し、黒いオーバーレイを非表示にする。これにより、FOUC（一瞬の表示崩れ）を防ぎ、音と映像が同期して開始される。

---

## 8. ディレクトリ構成

*   `Assets/Scripts/`: Unity C# スクリプト (`GameManager`, `ReactInputBridge` 等)。
*   `ReactUI/`: React プロジェクト。
    *   `src/title/`: タイトル画面用コンポーネント。
    *   `src/components/`: 共通コンポーネント。
    *   `src/hooks/`: カスタムフック。