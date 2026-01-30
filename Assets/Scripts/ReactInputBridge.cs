using UnityEngine;
using ReactUnity;
using UnityEngine.InputSystem;
using TMPro;

// React側へ公開するメソッドを持つクラス（独立させる）
// このクラスのインスタンスがReact側のGlobalsに登録され、JavaScriptから呼び出せるようになります。
public class GameInterop
{
    // ゲームデータをJSON形式で取得するメソッド
    // React側からは useGlobals().GameInterop.GetGameData() のように呼び出されます。
    public string GetGameData()
    {
        if (GameManager.instance != null)
        {
            // JsonUtility.ToJson(object):
            // 渡されたオブジェクトのパブリックフィールドを読み取り、JSON形式の文字列に変換（シリアライズ）して返します。
            return JsonUtility.ToJson(GameManager.instance.Data);
        }
        return "{}";
    }

    // JsonUtility用にシリアライズ可能なクラスを定義
    // [System.Serializable]: この属性をクラスや構造体につけることで、
    // Unityのシリアライザ（Inspector表示やJsonUtilityなど）がそのデータを保存・読み込みできるようになります。
    [System.Serializable]
    private class SettingsData
    {
        public int hp;
        public int sp;
        public bool auto_fire;
        public string player_name;
        public int bgm_vol;
        public int se_vol;
        public bool vibration;
        public bool crt_filter;
        // 統計情報
        public float total_play_time;
        public int total_enemies_defeated;
        public int total_games_played;
        public int total_damage_taken;
        public int total_shots_fired;
    }

    // ゲームプレイ中のステータスデータ
    [System.Serializable]
    private class InGameStatus
    {
        public int score;
        public int hp;
        public int sp;
        public int maxHp;
        public int maxSp;
        public bool isGameOver;
        public bool isNewHighScore;
        public bool isPaused;
    }

    // 現在の設定値をJSONで取得するメソッド
    public string GetSettings()
    {
        // 統計情報はセーブデータ（GameData）に含まれているため、GameManagerから取得します。
        // GameManagerが存在しない場合（エディタでの単体テスト時など）は、空のデータを使用します。
        var stats = GameManager.instance != null ? GameManager.instance.Data.stats : new PlayerStats();

        var settings = new SettingsData
        {
            hp = SettingsManager.GetInitialHP(),
            sp = SettingsManager.GetInitialSP(),
            auto_fire = SettingsManager.IsAutofireEnabled(),
            player_name = SettingsManager.GetPlayerName(),
            bgm_vol = SettingsManager.GetBGMVolume(),
            se_vol = SettingsManager.GetSEVolume(),
            vibration = SettingsManager.IsVibrationEnabled(),
            crt_filter = SettingsManager.IsCRTFilterEnabled(),

            // 統計情報 (GameData from GameManager)
            total_play_time = stats.totalPlayTime,
            total_enemies_defeated = stats.totalEnemiesDefeated,
            total_games_played = stats.totalGamesPlayed,
            total_damage_taken = stats.totalDamageTaken,
            total_shots_fired = stats.totalShotsFired
        };
        // 設定データをJSON文字列に変換して返します。
        return JsonUtility.ToJson(settings);
    }

    // ゲーム中のステータス（スコア、HP、SP）をJSONで取得するメソッド
    // React側で毎フレーム呼び出して表示を更新するために使用します。
    public string GetInGameStatus()
    {
        if (GameManager.instance == null) return "{}";

        var status = new InGameStatus
        {
            score = GameManager.instance.CurrentScore,
            hp = GameManager.instance.CurrentHP,
            sp = GameManager.instance.CurrentSP,
            maxHp = GameManager.instance.MaxHP,
            maxSp = GameManager.instance.MaxSP,
            isGameOver = GameManager.instance.IsGameOver,
            isNewHighScore = GameManager.instance.IsNewHighScore,
            isPaused = GameManager.instance.IsPaused
        };
        return JsonUtility.ToJson(status);
    }

    // 設定値を更新するメソッド
    public void UpdateSetting(string key, string value)
    {
        switch (key)
        {
            // int.Parse(string): 文字列を整数(int)に変換します。変換できない場合は例外が発生します。
            // bool.Parse(string): 文字列("True"/"False")を真偽値(bool)に変換します。
            case "hp": SettingsManager.SetInitialHP(int.Parse(value)); break;
            case "sp": SettingsManager.SetInitialSP(int.Parse(value)); break;
            case "auto_fire": SettingsManager.SetAutofire(bool.Parse(value)); break;
            case "player_name": SettingsManager.SetPlayerName(value); break;
            case "bgm_vol":
                SettingsManager.SetBGMVolume(int.Parse(value));
                GameManager.instance?.ApplyAudioSettings(); // 即時反映
                break;
            case "se_vol":
                SettingsManager.SetSEVolume(int.Parse(value));
                // SEは鳴らす瞬間に音量を取得するのでApply不要
                break;
            case "vibration": SettingsManager.SetVibration(bool.Parse(value)); break;
            case "crt_filter": SettingsManager.SetCRTFilter(bool.Parse(value)); break;
        }

        // ここでは保存を行わず、メモリ上の値とゲーム挙動への反映のみを行う
    }

    public void SaveSettings()
    {
        // 設定とセーブデータをディスクに書き込みます。
        SettingsManager.Save(); // PlayerPrefsの保存
        GameManager.instance?.SaveGameData(); // GameDataの保存
    }


    // タイトル画面の演出をスキップすべきかどうかを確認するメソッド
    // React側でタイトル画面の初期化時に呼び出されます。
    public bool ShouldSkipTitleSequence()
    {
        if (GameManager.instance != null && GameManager.instance.SkipTitleSequence)
        {
            GameManager.instance.SkipTitleSequence = false; // フラグを消費（リセット）する
            return true;
        }
        return false;
    }

    public void ResumeGame()
    {
        GameManager.instance?.ResumeGame();
    }

    public void RestartGame()
    {
        GameManager.instance?.RestartGame();
    }

    public void ReturnToTitle()
    {
        GameManager.instance?.ReturnToTitle();
    }

    // 指定したステージ（シーン）を開始するメソッド
    public void StartGame(string stageName)
    {
        if (GameManager.instance != null)
        {
            // 決定音はラグを避けるためReact側で再生する
            // GameManager.instance.PlaySubmitSound();
            // スコアをリセットして新しいゲームを開始
            GameManager.instance.ResetScore();
            // GameManagerのコルーチンを使って遷移（遅延と演出を含む）
            GameManager.instance.LoadSceneWithTransition(stageName);
        }
        else
        {
            // Fallback (GameManagerがない場合)
            UnityEngine.SceneManagement.SceneManager.LoadSceneAsync(stageName);
        }
    }

    // 効果音を再生するメソッド
    // React側からは window.GameInterop.PlaySound('move') のように呼び出されます。
    public void PlaySound(string type)
    {
        if (GameManager.instance == null) return;

        switch (type)
        {
            case "move":
                // GameManagerのメソッドを呼び出して効果音を再生します。
                GameManager.instance.PlayCursorMoveSound();
                break;
            case "submit":
                GameManager.instance.PlaySubmitSound();
                break;
            case "cancel":
                GameManager.instance.PlayCancelSound();
                break;
        }
    }

    // ゲームを終了するメソッド
    public void QuitGame()
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.QuitGame();
            return;
        }

        // フォールバック（GameManagerがない場合など）
#if UNITY_EDITOR
        // Unityエディタ上では再生モードを停止します。
        UnityEditor.EditorApplication.isPlaying = false;
#else
        // ビルド済みアプリではアプリケーションを終了します。
        Application.Quit();
#endif
    }
}

// DefaultExecutionOrder(-100): このスクリプトを他のスクリプト（特にReactUnity）より先に実行させるための属性。
// これにより、ReactUnityが初期化される前にGlobalsへの登録準備を整えることができます。
[DefaultExecutionOrder(-100)]
// ReactInputBridge: UnityのInput Systemからの入力を検知し、React側のJavaScript関数を呼び出すブリッジクラス
public class ReactInputBridge : MonoBehaviour
{
    public static ReactInputBridge Instance { get; private set; }

    [Tooltip("このブリッジをプライマリ（GameManagerからの命令を受け取る唯一のインスタンス）として設定します。")]
    public bool isPrimaryBridge = false;

    private ReactRendererBase _reactRenderer;
    private InputAction _pressAnyKeyAction;
    private InputAction _navigateAction;
    private InputAction _submitAction;
    private InputAction _cancelAction;
    private InputAction _backspaceAction;

    // ナビゲーション入力のクールタイム（連続入力防止）管理用変数
    // メニュー操作時にカーソルが高速に移動しすぎてしまうのを防ぐため、一度入力したら一定時間入力を無視します。
    private float _nextNavigateTime = 0f; // 次に入力を受け付ける時刻（Time.unscaledTime基準）
    private const float NavigateDelay = 0.15f; // 入力間隔の最小値（秒）。この時間内は次の入力を無視します。

    private void Awake()
    {
        if (isPrimaryBridge)
        {
            if (Instance != null && Instance != this)
            {
                Debug.LogWarning("[ReactInputBridge] 複数のプライマリブリッジが検出されました。このインスタンスは破棄されます。", gameObject);
                Destroy(this);
                return;
            }
            Instance = this;
        }

        _reactRenderer = GetComponent<ReactRendererBase>();
        if (!_reactRenderer) Debug.LogError("[ReactInputBridge] ReactRenderer not found!");

        // InputActionを初期化
        // type: Button は「押した/離した」を検知するのに適しています
        // InputAction: Input Systemにおける「入力の単位」です。
        // ボタン押し、軸入力などの定義と、それに対するバインディング（キー割り当て）を管理します。
        _pressAnyKeyAction = new InputAction(type: InputActionType.Button);
        // バインディングを個別に追加（カンマ区切りはコンストラクタでは機能しません）
        _pressAnyKeyAction.AddBinding("<Keyboard>/anyKey");
        _pressAnyKeyAction.AddBinding("<Gamepad>/<Button>");
        // 入力があった瞬間に実行する処理を登録
        // performedイベント: 入力が確定した瞬間に発火します
        _pressAnyKeyAction.performed += _ => OnPressAnyButton();

        // --- ナビゲーション操作 (上下左右) ---
        // 1DAxis から 2DVector に変更して左右も検知できるようにする
        // type: Value はスティックの傾きなど連続的な値を扱うのに適しています
        // AddCompositeBinding("2DVector"): 上下左右の4つの入力をまとめて、
        // 1つの Vector2 (x, y) の値として扱えるようにする「コンポジット（複合）バインディング」を追加します。
        _navigateAction = new InputAction("Navigate", type: InputActionType.Value);
        _navigateAction.AddCompositeBinding("2DVector")
            .With("Up", "<Keyboard>/upArrow")
            .With("Down", "<Keyboard>/downArrow")
            .With("Left", "<Keyboard>/leftArrow")
            .With("Right", "<Keyboard>/rightArrow")
            .With("Up", "<Gamepad>/dpad/up")
            .With("Down", "<Gamepad>/dpad/down")
            .With("Left", "<Gamepad>/dpad/left")
            .With("Right", "<Gamepad>/dpad/right")
            .With("Up", "<Gamepad>/leftStick/up")
            .With("Down", "<Gamepad>/leftStick/down")
            .With("Left", "<Gamepad>/leftStick/left")
            .With("Right", "<Gamepad>/leftStick/right");

        // ctx.ReadValue<Vector2>(): 現在の入力値を Vector2 型として読み取ります。
        // 上下左右の入力状態に応じて、(0, 1) や (-1, 0) などの値が返ってきます。
        _navigateAction.performed += ctx => OnNavigate(ctx.ReadValue<Vector2>());

        // --- 決定操作 (Enter, Space, 南ボタン) ---
        _submitAction = new InputAction("Submit");
        _submitAction.AddBinding("<Keyboard>/enter");
        _submitAction.AddBinding("<Keyboard>/space");
        _submitAction.AddBinding("<Gamepad>/buttonSouth");
        _submitAction.performed += _ => SendEvent("submit");

        // --- キャンセル/戻る操作 (Esc, Backspace, 東ボタン) ---
        _cancelAction = new InputAction("Cancel");
        _cancelAction.AddBinding("<Keyboard>/escape");
        // Backspaceは文字削除に使用するため、キャンセルアクションからは除外
        _cancelAction.AddBinding("<Gamepad>/buttonEast");
        _cancelAction.performed += _ => SendEvent("cancel");

        // --- Backspace操作 ---
        _backspaceAction = new InputAction("Backspace");
        _backspaceAction.AddBinding("<Keyboard>/backspace");
        _backspaceAction.AddBinding("<Gamepad>/buttonWest");
        _backspaceAction.performed += _ => SendEvent("backspace");
    }

    private void Update()
    {
        // Contextが有効で、かつGameInteropが未登録の場合に登録する
        // ReactUnityのContextは非同期に生成されたり、リロードで再生成されたりするため、
        // Update内で監視して、未登録の状態であれば登録を行う「ポーリング」方式を採用しています。
        // これにより、初期化タイミングのズレやリロード時にも確実にオブジェクトを渡せます。
        if (_reactRenderer != null && _reactRenderer.Context != null)
        {
            if (!_reactRenderer.Context.Globals.ContainsKey("GameInterop"))
            {
                // React側のグローバル変数 'GameInterop' に、C#の GameInterop クラスのインスタンスを登録します。
                // これにより、React側から `interop.GetGameData()` のようにC#のメソッドを呼べるようになります。
                _reactRenderer.Context.Globals["GameInterop"] = new GameInterop();
            }
        }
    }

    // オブジェクトが有効になったら入力を監視開始
    private void OnEnable()
    {
        _pressAnyKeyAction.Enable();
        _navigateAction.Enable();
        _submitAction.Enable();
        _cancelAction.Enable();
        _backspaceAction.Enable();
        if (Keyboard.current != null)
        {
            // Keyboard.current.onTextInput: キーボードからのテキスト入力を受け取るイベントです。
            // キーが押されるたびに、入力された文字（char）を引数として登録されたメソッド（OnTextInput）を呼び出します。
            Keyboard.current.onTextInput += OnTextInput;
        }
    }

    // オブジェクトが無効になったら監視停止
    private void OnDisable()
    {
        _pressAnyKeyAction.Disable();
        _navigateAction.Disable();
        _submitAction.Disable();
        _cancelAction.Disable();
        _backspaceAction.Disable();
        if (Keyboard.current != null)
        {
            Keyboard.current.onTextInput -= OnTextInput;
        }
    }

    private void OnDestroy()
    {
        _pressAnyKeyAction?.Dispose();
        _navigateAction?.Dispose();
        _submitAction?.Dispose();
        _cancelAction?.Dispose();
        _backspaceAction?.Dispose();

        if (Instance == this) Instance = null;
    }

    private void OnPressAnyButton()
    {
        Debug.Log("[ReactInputBridge] Input detected!");
        // Reactのコンテキストが初期化されているか確認
        if (_reactRenderer != null && _reactRenderer.Context != null)
        {
            // JS側のグローバル関数 'onAnyKeyPress' を実行する
            // ExecuteScriptを使うことで、C#からJavaScriptのコードを直接実行できます。
            _reactRenderer.Context.Script.ExecuteScript("if (typeof onAnyKeyPress === 'function') onAnyKeyPress();");
        }
        else
        {
            Debug.LogWarning("[ReactInputBridge] React Context is not ready.");
        }
    }

    // キーボードからのテキスト入力を処理
    private void OnTextInput(char c)
    {
        // char.IsControl(char): 指定した文字が制御文字（バックスペース、タブ、エンターなど）かどうかを判定します。
        // 制御文字の場合は true を返します。
        // 制御文字は除外
        if (char.IsControl(c)) return;

        if (_reactRenderer != null && _reactRenderer.Context != null)
        {
            // React側の関数 'onTextInput' を呼び出す
            // 入力された文字を引数として渡す
            _reactRenderer.Context.Script.ExecuteScript($"if (typeof onTextInput === 'function') onTextInput('{c}');");
        }
    }

    // ナビゲーション操作（矢印キー、スティック、WASD）が行われた時に呼ばれる関数
    // Input System の "Navigate" アクションに紐づけられています。
    private void OnNavigate(Vector2 value)
    {
        // 1. クールタイムのチェック
        // 前回の入力から一定時間（NavigateDelay）経過していない場合は、処理を中断して入力を無視します。
        // Time.unscaledTime: ゲーム内の時間（Time.time）ではなく、現実の経過時間を使用します。
        // これにより、ポーズ中（Time.timeScale = 0）でゲームの時間が止まっていても、メニュー操作が可能になります。
        if (Time.unscaledTime < _nextNavigateTime) return;

        bool inputDetected = false;

        // 2. 入力値の判定とイベント送信
        // 入力値（value）は -1.0 ～ 1.0 の範囲です。
        // 誤作動防止のため、閾値（0.5f）を超えた場合のみ入力とみなします（デッドゾーン処理）。

        // 上下方向の判定
        if (value.y > 0.5f)
        {
            SendEvent("up"); // React側に 'up' イベントを送信
            inputDetected = true;
        }
        else if (value.y < -0.5f)
        {
            SendEvent("down"); // React側に 'down' イベントを送信
            inputDetected = true;
        }

        // 左右方向の判定
        if (value.x > 0.5f)
        {
            SendEvent("right"); // React側に 'right' イベントを送信
            inputDetected = true;
        }
        else if (value.x < -0.5f)
        {
            SendEvent("left"); // React側に 'left' イベントを送信
            inputDetected = true;
        }

        // 3. 次回の入力許可時刻の更新
        // いずれかの方向に入力があった場合、次回の入力許可時刻を設定します。
        // 現在時刻 + 待機時間 = 次に入力を受け付ける時刻
        if (inputDetected)
        {
            _nextNavigateTime = Time.unscaledTime + NavigateDelay;
        }
    }

    private void SendEvent(string eventName)
    {
        if (_reactRenderer != null && _reactRenderer.Context != null)
        {
            // React側の関数 'onMenuInput' を呼び出す
            // ExecuteScript(script): 文字列として渡されたJavaScriptコードを、ReactUnityのコンテキスト内で実行します。
            // ここでは、React側で定義されたグローバル関数 `onMenuInput` を呼び出しています。
            // 引数としてイベント名（up, down, submit, cancel）を渡す
            _reactRenderer.Context.Script.ExecuteScript($"if (typeof onMenuInput === 'function') onMenuInput('{eventName}');");
        }
    }

    // 画面をフェードアウト（暗転）させる命令を送る
    public void FadeOutScreen()
    {
        if (_reactRenderer != null && _reactRenderer.Context != null)
        {
            // React側の関数 'onFadeOutRequest' を呼び出す
            _reactRenderer.Context.Script.ExecuteScript("if (typeof onFadeOutRequest === 'function') onFadeOutRequest();");
        }
    }

    // ローディング画面を表示する命令を送る
    public void ShowLoadingScreen()
    {
        if (_reactRenderer != null && _reactRenderer.Context != null)
        {
            _reactRenderer.Context.Script.ExecuteScript("if (typeof onLoadingRequest === 'function') onLoadingRequest();");
        }
    }
}