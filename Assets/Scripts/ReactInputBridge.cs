using UnityEngine;
using ReactUnity;
using UnityEngine.InputSystem;
using TMPro;

public class ReactInputBridge : MonoBehaviour
{
    private ReactRendererBase _reactRenderer;
    private InputAction _pressAnyKeyAction;
    private InputAction _navigateAction;
    private InputAction _submitAction;
    private InputAction _cancelAction;

    private void Awake()
    {
        _reactRenderer = GetComponent<ReactRendererBase>();
        if (!_reactRenderer) Debug.LogError("[ReactInputBridge] ReactRenderer not found!");

        // InputActionを初期化
        _pressAnyKeyAction = new InputAction(type: InputActionType.Button);
        // バインディングを個別に追加（カンマ区切りはコンストラクタでは機能しません）
        _pressAnyKeyAction.AddBinding("<Keyboard>/anyKey");
        _pressAnyKeyAction.AddBinding("<Gamepad>/<Button>");
        // 入力があった瞬間に実行する処理を登録
        _pressAnyKeyAction.performed += _ => OnPressAnyButton();

        // --- ナビゲーション操作 (上/下) ---
        _navigateAction = new InputAction("Navigate");
        // キーボード矢印
        _navigateAction.AddCompositeBinding("1DAxis")
            .With("Positive", "<Keyboard>/upArrow")
            .With("Negative", "<Keyboard>/downArrow");
        // キーボードWASD
        _navigateAction.AddCompositeBinding("1DAxis")
            .With("Positive", "<Keyboard>/w")
            .With("Negative", "<Keyboard>/s");
        // ゲームパッド十字キー
        _navigateAction.AddCompositeBinding("1DAxis")
            .With("Positive", "<Gamepad>/dpad/up")
            .With("Negative", "<Gamepad>/dpad/down");
        // ゲームパッド左スティック
        _navigateAction.AddCompositeBinding("1DAxis")
            .With("Positive", "<Gamepad>/leftStick/up")
            .With("Negative", "<Gamepad>/leftStick/down");

        _navigateAction.performed += ctx => OnNavigate(ctx.ReadValue<float>());

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
    }

    private void OnPressAnyButton()
    {
        Debug.Log("[ReactInputBridge] Input detected!");
        // Reactのコンテキストが初期化されているか確認
        if (_reactRenderer != null && _reactRenderer.Context != null)
        {
            // JS側のグローバル関数 'onAnyKeyPress' を実行する
            _reactRenderer.Context.Script.ExecuteScript("if (typeof onAnyKeyPress === 'function') onAnyKeyPress();");
        }
        else
        {
            Debug.LogWarning("[ReactInputBridge] React Context is not ready.");
        }
    }

    private void OnNavigate(float value)
    {
        if (value > 0.5f) SendEvent("up");
        else if (value < -0.5f) SendEvent("down");
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
}