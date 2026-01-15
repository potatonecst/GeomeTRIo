# システム・UI仕様 (System & UI Specs)

## 1. ランキングシステム
- **記録対象:** 各ステージ（"Stage1", "ScoreAttack"）ごとのスコア
- **保存数:** 上位5件
- **ネームエントリー:** ハイスコア更新時、プレイヤーネームと共に保存・表示する

## 2. UI (User Interface)
- **技術スタック:** Unity uGUI (Canvas), TextMeshPro, Input System (UI Navigation)
- **HUD表示:**
  - **HPゲージ:** 現在のHPを表示（ハートアイコンやバーなど）
  - **SPゲージ:** 現在のSPを表示
  - **スコア:** 現在の獲得スコア
  - **発射点インジケーター:** 現在どの頂点が発射口になっているかを可視化
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
    - `initialHp` (int): 初期HP (Default: 3)
    - `initialSp` (int): 初期SP (Default: 3)
    - `autoFireEnabled` (bool): オート連射設定 (Default: false)
    - `totalPlayTime` (float): 総プレイ時間
    - `totalEnemiesDefeated` (int): 総撃破数
    - `stage1Scores` (List<ScoreRecord>): ステージ1のハイスコアリスト
    - `scoreAttackScores` (List<ScoreRecord>): スコアアタックのハイスコアリスト
  - **データ構造 (`ScoreRecord` 構造体):**
    - `score` (int): スコア
    - `date` (string): 達成日時 (例: "2024/05/20")
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