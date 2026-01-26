# アーキテクチャ設計 (Architecture)

本プロジェクトでは、ゲームプレイ部分（アクション）に Unity 標準機能を使用し、タイトル画面やメニュー画面などのUI部分に **ReactUnity** を採用したハイブリッドアーキテクチャを採用しています。

## 1. 全体構成

*   **Game Scene (Unity):**
    *   `Stage1`, `ScoreAttack` などのゲームプレイシーン。
    *   物理演算、衝突判定、パーティクルエフェクトなどは Unity の機能をフル活用。
    *   HUD (Head-Up Display) は現状 uGUI で実装（将来的には ReactUnity 化も検討）。
*   **Title Scene (ReactUnity):**
    *   `TitleScene`。タイトル、メニュー、ランキング、設定画面。
    *   HTML/CSS (Tailwind CSS like) + React でUIを構築。
    *   アニメーションやグリッチ演出を React コンポーネントとして実装。

## 2. Unity (C#) と React (TypeScript) の連携

ReactUnity 環境下では、C# と JavaScript (QuickJS) が相互に通信を行う必要があります。本プロジェクトでは以下のパターンで連携を行っています。

### 2.1 入力イベントの伝達 (C# -> React)

Unity の `Input System` で検知したコントローラーやキーボードの入力を、React 側のグローバル関数を呼び出すことで伝達します。

*   **C#側 (`ReactInputBridge.cs`):**
    *   `ReactRenderer` のコンテキストを取得。
    *   `Input System` のイベント（Navigate, Submit, Cancel）をフック。
    *   `ExecuteScript` を使用して、JS側の関数 `window.onMenuInput(event)` を実行。
*   **React側 (`Menu.tsx`, `Ranking.tsx` 等):**
    *   `useEffect` 内で `(window as any).onMenuInput` にコールバック関数を代入。
    *   受け取ったイベント名 ('up', 'down', 'submit', 'cancel') に応じてステートを更新。

### 2.2 データと機能の提供 (C# -> React)

ランキングデータの取得やゲーム開始などの機能は、C# 側のオブジェクトを React 側に公開することで実現しています。

*   **C#側 (`ReactInputBridge.cs`):**
    *   `GameInterop` クラスを定義し、`GetGameData()` や `StartGame()` メソッドを実装。
    *   `ReactRenderer.Globals` および `Context.Globals` に `GameInterop` のインスタンスを登録。
    *   `Update` メソッドで登録状況を監視し、コンテキスト生成のタイミングズレによる未登録を防ぐ（ポーリング的な登録保証）。
*   **React側 (`Ranking.tsx`, `StageSelect.tsx`):**
    *   `@reactunity/renderer` の `useGlobals` フックを使用。
    *   `globals.GameInterop` 経由で C# のメソッドにアクセス。
    *   `useEffect` の依存配列に `globals.GameInterop` を指定することで、オブジェクトが利用可能になったタイミングで処理を実行。

## 3. 画面遷移フロー

タイトル画面内の遷移は React の State (`currentScreen`) で管理し、ゲームプレイへの遷移は Unity の `SceneManager` を使用します。

1.  **起動**: `TitleScene` (Unity) -> `TitleApp` (React) マウント。
2.  **タイトル**: `currentScreen = 'title'`。
3.  **メニュー**: 任意のキー入力で接続演出 -> メニュー表示。
4.  **画面内遷移**:
    *   Ranking選択 -> `currentScreen = 'ranking'` (Rankingコンポーネント表示)。
    *   Stage Select選択 -> `currentScreen = 'stage_select'`。
5.  **ゲーム開始**:
    *   Stage Select でステージ決定。
    *   React から `interop.StartGame("Stage1")` を呼び出し。
    *   C# 側で `SceneManager.LoadScene("Stage1")` を実行。
    *   Unity のシーンが切り替わり、ReactUnity のコンテキストは破棄される。

## 4. ディレクトリ構成

*   `Assets/Scripts/`: Unity C# スクリプト (`GameManager`, `ReactInputBridge` 等)。
*   `ReactUI/`: React プロジェクト。
    *   `src/title/`: タイトル画面用コンポーネント (`index.tsx`, `Menu.tsx`, `Ranking.tsx` 等)。
    *   `src/components/`: 共通コンポーネント (`GlitchText.tsx`, `MenuButton.tsx` 等)。
    *   `src/hooks/`: カスタムフック (`useGlitch.ts` 等)。