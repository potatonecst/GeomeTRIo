# システム・UI仕様 (System & UI Specs)

## 1. ランキングシステム
- **記録対象:** 各ステージ（"Stage1", "ScoreAttack"）ごとのスコア
- **保存数:** 上位5件
- **ネームエントリー:** ハイスコア更新時、プレイヤーネームと共に保存・表示する

## 2. UI (User Interface)
- **技術スタック:** ReactUnity (HTML/CSS/React), Input System (UI Navigation)
- **画面解像度とアスペクト比:**
  - **基準解像度:** 1920x1080 (FHD)
  - **アスペクト比:** 16:9 に固定。
  - **レターボックス:** 画面比率が16:9と異なる場合、Unity側 (`AspectRatioEnforcer`) と React側 (`AspectRatioWrapper`) の双方で制御し、余白部分を黒帯（レターボックス/ピラーボックス）で埋める。
  - **スケーリング:** UIは基準解像度でレイアウトされ、画面サイズに合わせてアスペクト比を維持したまま最大サイズまで拡大・縮小される。
- **HUD表示:**
  - **HP / SP / スコア:** ReactUnity側で `GameManager` の状態をポーリングして描画。
  - **発射点インジケーター:** 自機周辺に表示（World Space UI または Sprite）。
  - **敵HPバー:** HPが2以上の敵の頭上に表示（Spriteによる簡易表示）。左端固定で減少するアニメーションを行う。
  - **Status Monitor:** 機体の状態を常時表示するモニターエリア。
    - **SYSTEM:** 機体耐久度（NORMAL / CRITICAL）。
      - ゲームオーバー時は **FATAL ERROR** と表示。
    - **ENGINE:** 動力・移動システム（ACTIVE / STANDBY / OFFLINE）。将来的に移動系デバフを表示。
      - ゲームオーバー時は **DESTROYED** と表示。
    - **WEAPON:** 火器管制システム（ONLINE [詳細]）。現在のレベルや武装タイプ（BURST, 3-WAY等）を表示。
      - ゲームオーバー時は **CRITICAL ERROR** と表示。
    - **メッセージ:** レベルアップ時などに一時的な通知を強調表示する。
  - **左サイドバー:** 現在のステージ名（STAGE）と経過時間（TIME）を表示。
  - **開始演出:** ステージ開始時、ターミナルウィンドウが表示され、システム起動ログ（BOOT_SEQUENCE...）と共にHUDの各パーツが段階的にフェードインする。最後に「MISSION START」と共に視界（暗転）が解除される。

- **ReactUnity連携:**
  - **UI描画:** タイトル画面、ランキング、設定画面などのメニュー周りは ReactUnity (HTML/CSS/React) で描画。
  - **入力ブリッジ:** Unityの `Input System` で検知した入力を `ReactInputBridge` 経由で React 側のグローバル関数 (`onMenuInput`, `onAnyKeyPress`) にイベントとして送信。
    - ナビゲーション操作はポーリング方式で監視し、OS標準のようなスムーズな連続入力（キーリピート）を実現。
  - **データ連携:**
    - C#側の `GameInterop` クラスを ReactUnity の `Globals` に登録。
    - React側は `useGlobals` フックを使用して `GameInterop` オブジェクトを取得し、メソッド (`GetGameData`, `StartGame`) を呼び出す。
  - **初期化同期:**
    - シーン遷移時、Unity側のロード完了後即座に画面を表示せず、React側のレイアウト計算と描画準備完了を待機する。
    - React側から `NotifyUIReady` シグナルを受け取ったタイミングで、BGM再生と暗転（オーバーレイ）解除を行うことで、音と映像の完全な同期を実現する。

- **改善・展望:**
  - **コントローラー完全対応:** タイトル画面からゲームプレイ、設定までマウス/キーボード不要で操作可能にする。
  - **ナビゲーション改善:**
    - 上下ループ対応（一番上で上を押すと一番下へ）。
    - 明示的なフォーカス移動（Explicit Navigation）の設定により、意図しないボタンへの移動を防ぐ。
    - キャンセルボタン（Bボタン等）での「戻る」操作の実装。
  - **ディスプレイ設定の拡充:**
    - **解像度変更:** ユーザーが任意の出力解像度（1280x720, 1920x1080, 2560x1440, 3840x2160等）を選択できるようにする。
    - **フルスクリーン切り替え:** 「排他的フルスクリーン」と「ウィンドウモード」を切り替える設定を追加する（特にWindows版での没入感向上のため）。
    - これらはSettings画面に追加し、Unityの `Screen.SetResolution` APIを用いて実装する予定。
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