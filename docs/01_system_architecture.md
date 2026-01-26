# システムアーキテクチャ (System Architecture)

本ドキュメントでは、GeomeTRIoのシステム全体の構造、UnityとReactUnityの連携方式、および主要なゲームロジック（GameManager）の設計について、コードの行間にある意図まで含めて解説します。

## 1. 全体構成 (System Overview)

本プロジェクトは、ゲームプレイ部分（アクション）に Unity 標準機能を使用し、タイトル画面やメニュー画面などのUI部分に **ReactUnity** を採用したハイブリッドアーキテクチャを採用しています。

*   **Game Scene (Unity):**
    *   `Stage1`, `ScoreAttack` などのゲームプレイシーン。
    *   物理演算、衝突判定、パーティクルエフェクトなどは Unity の機能をフル活用。
    *   HUD (Head-Up Display) は現状 uGUI で実装。
*   **Title Scene (ReactUnity):**
    *   `TitleScene`。タイトル、メニュー、ランキング、設定画面。
    *   HTML/CSS (Tailwind CSS like) + React でUIを構築。
    *   アニメーションやグリッチ演出を React コンポーネントとして実装。

---

## 2. Unity (C#) と React (TypeScript) の連携

ReactUnity 環境下では、C# と JavaScript (QuickJS) が相互に通信を行う必要があります。

### 2.1 入力イベントの伝達 (C# -> React)
Unity の `Input System` で検知したコントローラーやキーボードの入力を、React 側のグローバル関数を呼び出すことで伝達します。

*   **C#側 (`ReactInputBridge.cs`):**
    *   `ReactRenderer` のコンテキストを取得し、`ExecuteScript` を使用して JS側の関数 `window.onMenuInput(event)` 等を実行。
*   **React側 (`Menu.tsx` 等):**
    *   `useEffect` 内で `(window as any).onMenuInput` にコールバック関数を登録してイベントを受信。

### 2.2 データと機能の提供 (C# -> React)
ランキングデータの取得やゲーム開始などの機能は、C# 側のオブジェクトを React 側に公開することで実現しています。

*   **C#側 (`ReactInputBridge.cs`):**
    *   `GameInterop` クラスを定義し、`ReactRenderer.Globals` に登録。
*   **React側 (`Ranking.tsx` 等):**
    *   `useGlobals` フック経由で `GameInterop` のメソッド (`GetGameData`, `StartGame` 等) を呼び出し。

---

## 3. ゲームマネージャーとクラス設計 (Game Logic Design)

Unity側のゲームロジックは、各オブジェクト（自機、敵、UI）を統括する「監督」役の `GameManager` を中心に構成されています。

### 3.1 主要クラスの役割
- **GameManager:** ゲーム全体の状態（プレイ中、ゲームオーバー、スコア計算）、セーブデータ(GameData)の保持・保存、BGM管理を行うシングルトンクラス。
- **PlayerController:** 自機の操作を担当。
- **EnemySpawner:** 敵の出現タイミングと生成を担当。
- **UIManager (SceneUIManager):** スコア表示やHPゲージの更新を担当。

### 3.2 シングルトンパターン (Singleton Pattern)
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

---

## 5. 画面遷移フロー (Scene Transition)

タイトル画面内の遷移は React の State (`currentScreen`) で管理し、ゲームプレイへの遷移は Unity の `SceneManager` を使用します。

### 5.1 起動からメニューまで
1.  **起動**: `TitleScene` (Unity) -> `TitleApp` (React) マウント。
2.  **タイトル**: `currentScreen = 'title'`。
3.  **メニュー**: 任意のキー入力で接続演出 -> メニュー表示。
4.  **画面内遷移**:
    *   Ranking選択 -> `currentScreen = 'ranking'` (Rankingコンポーネント表示)。
    *   Stage Select選択 -> `currentScreen = 'stage_select'`。

### 5.2 ゲーム開始シーケンス (ローディング演出)
ReactUIによるリッチな演出と、Unityのシーンロードによるフリーズを両立させるため、以下の遷移フローを採用しています。

1.  **開始リクエスト:** React (`StageSelect`) が `StartGame` を呼び出す。
2.  **ローディング表示:** React側で "LOADING" とスピナーを表示。
3.  **非同期ロード開始:** `GameManager` が `SceneManager.LoadSceneAsync` を開始 (`allowSceneActivation = false`)。
4.  **演出待機:** 最低0.5秒間待機し、ローディングアニメーションを見せる。
5.  **暗転 (Blackout):** `GameManager` から `ReactInputBridge.FadeOutScreen()` を呼び出し、React側で黒いオーバーレイを表示。
6.  **シーン切り替え:** 暗転完了後、`allowSceneActivation = true` にして実際にシーンを切り替える。

---

## 6. ディレクトリ構成

*   `Assets/Scripts/`: Unity C# スクリプト (`GameManager`, `ReactInputBridge` 等)。
*   `ReactUI/`: React プロジェクト。
    *   `src/title/`: タイトル画面用コンポーネント。
    *   `src/components/`: 共通コンポーネント。
    *   `src/hooks/`: カスタムフック。