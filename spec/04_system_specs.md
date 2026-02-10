# システム・UI仕様 (System & UI Specs)

## 1. ランキングシステム
- **記録対象:** 各ステージ（"Stage1", "ScoreAttack"）ごとのスコア
- **保存数:** 上位5件
- **ネームエントリー:** ハイスコア更新時、プレイヤーネームと共に保存・表示する

## 2. UI (User Interface)
- **技術スタック:** ReactUnity (HTML/CSS/React), Input System (UI Navigation)
- **HUD表示:**
  - **HP / SP / スコア:** ReactUnity側で `GameManager` の状態をポーリングして描画。
  - **発射点インジケーター:** 自機周辺に表示（World Space UI または Sprite）。
  - **敵HPバー:** HPが2以上の敵の頭上に表示（Spriteによる簡易表示）。左端固定で減少するアニメーションを行う。
  - **Status Monitor:** 機体の状態を常時表示するモニターエリア。
    - **SYSTEM:** 機体耐久度（NORMAL / CRITICAL）。
    - **ENGINE:** 動力・移動システム（ACTIVE / STANDBY / OFFLINE）。将来的に移動系デバフを表示。
    - **WEAPON:** 火器管制システム（ONLINE [詳細]）。現在のレベルや武装タイプ（BURST, 3-WAY等）を表示。
    - **メッセージ:** レベルアップ時などに一時的な通知を強調表示する。
  - **左サイドバー:** 現在のステージ名（STAGE）と経過時間（TIME）を表示。

- **ReactUnity連携:**
  - **UI描画:** タイトル画面、ランキング、設定画面などのメニュー周りは ReactUnity (HTML/CSS/React) で描画。
  - **入力ブリッジ:** Unityの `Input System` で検知した入力を `ReactInputBridge` 経由で React 側のグローバル関数 (`onMenuInput`, `onAnyKeyPress`) にイベントとして送信。
    - ナビゲーション操作はポーリング方式で監視し、OS標準のようなスムーズな連続入力（キーリピート）を実現。
  - **データ連携:**
    - C#側の `GameInterop` クラスを ReactUnity の `Globals` に登録。
    - React側は `useGlobals` フックを使用して `GameInterop` オブジェクトを取得し、メソッド (`GetGameData`, `StartGame`) を呼び出す。

- **改善・展望:**
  - **コントローラー完全対応:** タイトル画面からゲームプレイ、設定までマウス/キーボード不要で操作可能にする。
  - **ナビゲーション改善:**
    - 上下ループ対応（一番上で上を押すと一番下へ）。
    - 明示的なフォーカス移動（Explicit Navigation）の設定により、意図しないボタンへの移動を防ぐ。
    - キャンセルボタン（Bボタン等）での「戻る」操作の実装。
  - **デザイン刷新:** Webの `shadcn/ui` のような洗練されたモダンなUIデザインを目指す。

## 3. 技術・データ管理
- **セーブデータ管理:**
  - **保存形式:** JSONテキスト形式 (`JsonUtility` を使用)
  - **ファイル名規則:** `user_{userId}.sav`
    - `userId`: プレイヤー識別子（初期値: "default_player"）
    - 保存場所: `Application.persistentDataPath`
  - **データ構造 (`GameData` クラス):**
    - `playerName` (string): プレイヤー名
    - `settings` (PlayerSettings): プレイヤー設定
      - `initialHp` (int): 初期HP (Default: 3)
      - `initialSp` (int): 初期SP (Default: 2)
      - `autoFireEnabled` (bool): オート連射設定 (Default: false)
    - `stats` (PlayerStats): プレイ統計
      - `totalPlayTime` (float): 総プレイ時間
      - `totalEnemiesDefeated` (int): 総撃破数
    - `stage1Scores` (List<ScoreRecord>): ステージ1のハイスコアリスト
    - `scoreAttackScores` (List<ScoreRecord>): スコアアタックのハイスコアリスト
  - **データ構造 (`ScoreRecord` 構造体):**
    - `score` (int): スコア
    - `date` (string): 達成日時 (例: "2024/05/20 15:30")
    - `hp` (int): 達成時の初期HP設定
    - `sp` (int): 達成時の初期SP設定
    - `autoFire` (bool): 達成時のオート連射設定
  - **責任分界:**
    - `SaveSystem`: ファイルの読み書き（I/O）のみを担当。
    - `GameManager`: 現在の `userId` の管理と、保存タイミングの制御を担当。
  - **展望:** 将来的に `currentUserId` をAWS CognitoのIDと連携させ、クラウド同期を実現する。

- **コーディング規約:**
  - フィールド: `[SerializeField] private` を使用
  - 入力: `Input System` (PlayerInputActions) を使用
  - クラス/メソッド: PascalCase, 変数: camelCase

## 4. シーン構成
- **TitleScene:** タイトル、メインメニュー、オプション、ランキング
- **Stage1 / ScoreAttack:** ゲームプレイ用シーン