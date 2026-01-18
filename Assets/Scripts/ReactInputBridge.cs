using UnityEngine;
using ReactUnity;
using UnityEngine.InputSystem;

public class ReactInputBridge : MonoBehaviour
{
    private ReactRendererBase _reactRenderer;
    private InputAction _pressAnyKeyAction;

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
    }

    // オブジェクトが有効になったら入力を監視開始
    private void OnEnable() => _pressAnyKeyAction.Enable();

    // オブジェクトが無効になったら監視停止
    private void OnDisable() => _pressAnyKeyAction.Disable();

    private void OnDestroy() => _pressAnyKeyAction?.Dispose();

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
}