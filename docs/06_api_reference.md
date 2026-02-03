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