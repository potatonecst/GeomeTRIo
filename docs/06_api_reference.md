# API Reference

## C# API (Exposed to React)

React側から `useGlobals().GameInterop` 経由でアクセス可能な C# クラスのメソッドです。

### `GameInterop` Class

#### `string GetGameData()`
*   **説明:** 現在保存されているゲームデータ（ランキング、設定など）を JSON 文字列として返します。
*   **戻り値:** `GameData` クラスをシリアライズした JSON 文字列。データが存在しない場合は `"{}"`。
*   **使用例 (React):**
    ```typescript
    const json = interop.GetGameData();
    const data = JSON.parse(json);
    ```

#### `string GetSettings()`
*   **説明:** 現在の設定値（音量、キー設定、統計情報など）を JSON 文字列として返します。
*   **戻り値:** `SettingsData` 構造体をシリアライズした JSON 文字列。

#### `string GetInGameStatus()`
*   **説明:** ゲームプレイ中の動的なステータス（スコア、HP、SP、フラグなど）を JSON 文字列として返します。
*   **戻り値:** `InGameStatus` 構造体をシリアライズした JSON 文字列。
*   **用途:** React側で毎フレーム呼び出し、HUDを更新するために使用します。
*   **ステータス詳細:**
    *   `systemStatus`:
        *   `"NORMAL"`: 通常
        *   `"CRITICAL"`: HPが1以下
        *   `"FATAL ERROR"`: ゲームオーバー
    *   `engineStatus`:
        *   `"ACTIVE"`: 通常
        *   `"STANDBY"`: ポーズ中またはゲーム開始前
        *   `"DESTROYED"`: ゲームオーバー
    *   `weaponStatus`:
        *   `"LV.X ..."`: 通常（レベルと詳細）
        *   `"CRITICAL ERROR"`: ゲームオーバー

#### `void UpdateSetting(string key, string value)`
*   **説明:** 指定した設定項目の値を更新します（メモリ上のみ）。
*   **引数:**
    *   `key`: 設定項目のID（例: "bgm_vol", "hp"）。
    *   `value`: 設定値の文字列表現。

#### `void SaveSettings()`
*   **説明:** 現在の設定値をファイル（PlayerPrefsおよびGameData）に保存して永続化します。

#### `void StartGame(string stageName)`
*   **説明:** 指定されたステージ（シーン）を読み込み、ゲームを開始します。
*   **引数:**
    *   `stageName`: 読み込む Unity シーンの名前（例: "Stage1", "ScoreAttack"）。
*   **動作:**
    1.  現在のスコアをリセット。
    2.  `GameManager.LoadSceneWithTransition` を呼び出し、ローディング演出と暗転を伴う非同期遷移を開始。

#### `void StartGameLoop()`
*   **説明:** ゲームのメインループを開始します。
*   **用途:** ステージ開始時のカットイン演出（React側）が終了したタイミングで呼び出します。
*   **動作:** `GameManager.IsGameActive` を `true` にし、`Time.timeScale` を `1` に設定してゲームを進行させます。

---

## React Components

`ReactUI/src/components/` にある主要な再利用可能コンポーネントです。

### `<GlitchText />`

テキストにグリッチ（色ズレ・振動）演出を付与するコンポーネント。

*   **Props:**
    *   `text` (string): 表示するテキスト。
    *   `isAlert` (boolean, optional): `true` の場合、グリッチの色が赤系（警告色）になります。デフォルトはシアン系。
    *   `className` (string, optional): Tailwind CSS クラス。
    *   `style` (object, optional): インラインスタイル。
*   **使用例:**
    ```tsx
    <GlitchText text="RANKING" className="text-4xl font-bold" />
    ```

### `<MenuButton />`

メニューやリストで使用する、選択状態に応じてスタイルが変化するボタン。

*   **Props:**
    *   `label` (string): ボタンのラベルテキスト。
    *   `isSelected` (boolean): 現在選択されているかどうか。`true` の場合、背景バーが伸び、矢印が表示されます。
    *   `onClick` (() => void, optional): クリック時のハンドラ（マウス操作用）。
    *   `className` (string, optional): コンテナのクラス。サイズ調整などに使用。
    *   `barClass` (string, optional): 選択時の背景バーの幅を指定するクラス（例: `w-full`, `w-80`）。デフォルトは `w-80`。
*   **使用例:**
    ```tsx
    <MenuButton
        label="Stage 1"
        isSelected={idx === selectedIndex}
        barClass="w-full"
        className="h-8 mb-2"
    />
    ```

---

## React Hooks

`ReactUI/src/hooks/` にあるカスタムフックです。

### `useGlitch(options)`

グリッチ演出（ランダムな座標ズレ）を計算して返すフック。

*   **引数:**
    *   `options` (object, optional):
        *   `auto` (boolean): `true` の場合、ランダムな間隔で自動的にグリッチが発生します。デフォルトは `true`。
*   **戻り値:**
    *   `offset` ({ x: number, y: number }): 現在の座標ズレ量。
    *   `isGlitching` (boolean): 現在グリッチ中かどうか。
    *   `trigger(duration, intensity)` (function): 手動でグリッチを発生させる関数。
        *   `duration` (number): 持続時間（ミリ秒）。デフォルト 200。
        *   `intensity` (number): 揺れの強さ（ピクセル）。デフォルト 10。
*   **使用例:**
    ```typescript
    // 自動モード (タイトルロゴなど)
    const { offset, isGlitching } = useGlitch();

    // 手動トリガーモード (演出など)
    const { offset, trigger } = useGlitch({ auto: false });
    // ...
    trigger(300, 20);
    ```

### `useGameStatus()`

Unity側から提供されるゲームのステータス（スコア、HP、SPなど）を定期的に取得するフック。

*   **戻り値:**
    *   `status` (object): 現在のゲーム状態オブジェクト。
        *   `score`, `hp`, `sp`, `maxHp`, `maxSp` (number): 基本ステータス。
        *   `isGameOver`, `isNewHighScore`, `isPaused` (boolean): フラグ。
        *   `systemStatus`, `engineStatus`, `weaponStatus` (string): HUD表示用のステータス文字列。
        *   その他、レベルや経験値などの情報が含まれます。
*   **使用例:**
    ```typescript
    const status = useGameStatus();
    return <text>SCORE: {status.score}</text>;
    ```
    ※ 内部で `requestAnimationFrame` を使用して毎フレーム更新を行っています。