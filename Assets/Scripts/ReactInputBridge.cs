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
            return JsonUtility.ToJson(GameManager.instance.Data);
        }
        return "{}";
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
        UnityEditor.EditorApplication.isPlaying = false;
#else
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

    private ReactRendererBase _reactRenderer;
    private InputAction _pressAnyKeyAction;
    private InputAction _navigateAction;
    private InputAction _submitAction;
    private InputAction _cancelAction;

    // ナビゲーション入力のクールタイム（連続入力防止）管理用変数
    // メニュー操作時にカーソルが高速に移動しすぎてしまうのを防ぐため、一度入力したら一定時間入力を無視します。
    private float _nextNavigateTime = 0f; // 次に入力を受け付ける時刻（Time.unscaledTime基準）
    private const float NavigateDelay = 0.15f; // 入力間隔の最小値（秒）。この時間内は次の入力を無視します。

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }

        _reactRenderer = GetComponent<ReactRendererBase>();
        if (!_reactRenderer) Debug.LogError("[ReactInputBridge] ReactRenderer not found!");

        // InputActionを初期化
        // type: Button は「押した/離した」を検知するのに適しています
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
        _navigateAction = new InputAction("Navigate", type: InputActionType.Value);
        _navigateAction.AddCompositeBinding("2DVector")
            .With("Up", "<Keyboard>/upArrow")
            .With("Down", "<Keyboard>/downArrow")
            .With("Left", "<Keyboard>/leftArrow")
            .With("Right", "<Keyboard>/rightArrow")
            .With("Up", "<Keyboard>/w")
            .With("Down", "<Keyboard>/s")
            .With("Left", "<Keyboard>/a")
            .With("Right", "<Keyboard>/d")
            .With("Up", "<Gamepad>/dpad/up")
            .With("Down", "<Gamepad>/dpad/down")
            .With("Left", "<Gamepad>/dpad/left")
            .With("Right", "<Gamepad>/dpad/right")
            .With("Up", "<Gamepad>/leftStick/up")
            .With("Down", "<Gamepad>/leftStick/down")
            .With("Left", "<Gamepad>/leftStick/left")
            .With("Right", "<Gamepad>/leftStick/right");

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
        _cancelAction.AddBinding("<Keyboard>/backspace");
        _cancelAction.AddBinding("<Gamepad>/buttonEast");
        _cancelAction.performed += _ => SendEvent("cancel");
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
    }

    // オブジェクトが無効になったら監視停止
    private void OnDisable()
    {
        _pressAnyKeyAction.Disable();
        _navigateAction.Disable();
        _submitAction.Disable();
        _cancelAction.Disable();
    }

    private void OnDestroy()
    {
        _pressAnyKeyAction?.Dispose();
        _navigateAction?.Dispose();
        _submitAction?.Dispose();
        _cancelAction?.Dispose();

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
}