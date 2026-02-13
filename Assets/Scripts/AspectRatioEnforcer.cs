using UnityEngine;
using UnityEngine.Rendering.Universal;

/// <summary>
/// 画面のアスペクト比を強制的に固定し、必要に応じて黒帯（レターボックス/ピラーボックス）を表示するクラス。
/// Main Cameraにアタッチして使用します。
/// </summary>
[ExecuteAlways] // エディタ上（再生していない時）でも動作するようにし、Gameビューで黒帯を確認できるようにします。
[RequireComponent(typeof(Camera))] // このスクリプトはCameraコンポーネントが必須であることをUnityに伝えます。
public class AspectRatioEnforcer : MonoBehaviour
{
    // 目標とするアスペクト比（16:9 = 1.777...）
    // この比率に合わせて画面の描画領域（Viewport）を調整します。
    public float targetAspect = 16.0f / 9.0f;

    private Camera _targetCamera;
    // 黒帯部分を描画するための背景用カメラ（静的変数として保持し、シーン遷移後も再利用または重複防止）
    private static GameObject _blackBackgroundCameraObj;

    void Start()
    {
        _targetCamera = GetComponent<Camera>();
        // 初期化時に即座に黒帯を適用してチラつきを防ぐ
        Update();

        // ゲーム実行中のみ、黒帯部分のチラつき（残像）防止用カメラを作成
        if (Application.isPlaying)
        {
            // 重複作成防止: 既に存在する場合は作成しない
            if (_blackBackgroundCameraObj == null)
            {
                // シーン内に既存のオブジェクトがないか確認
                _blackBackgroundCameraObj = GameObject.Find("BlackBackgroundCamera");
                if (_blackBackgroundCameraObj == null)
                {
                    _blackBackgroundCameraObj = new GameObject("BlackBackgroundCamera");
                    Camera backCam = _blackBackgroundCameraObj.AddComponent<Camera>();

                    // URP（Universal Render Pipeline）環境下では、カメラスタッキングのために
                    // UniversalAdditionalCameraData コンポーネントが必要です。
                    var cameraData = _blackBackgroundCameraObj.AddComponent<UniversalAdditionalCameraData>();
                    cameraData.renderType = CameraRenderType.Base; // Baseカメラとして明示的に設定

                    // メインカメラより後ろに描画 (float.MinValueだとURPで不具合が出ることがあるため、相対的に低く設定)
                    backCam.depth = (_targetCamera != null ? _targetCamera.depth : 0) - 100;

                    // 背景を単色（黒）で塗りつぶす設定
                    backCam.clearFlags = CameraClearFlags.SolidColor;
                    backCam.backgroundColor = Color.black; // 真っ黒で塗りつぶす

                    // CullingMaskを0（Nothing）に設定し、何もレンダリングしない（背景色のみ表示する）ようにします。
                    backCam.cullingMask = 0; // 何も映さない（ただ黒背景を作るだけ）

                    // シーン遷移してもこのカメラが破棄されないようにします。
                    // これにより、シーン遷移中の黒帯表示も維持されます。
                    DontDestroyOnLoad(_blackBackgroundCameraObj); // シーン遷移でも消さない
                }
            }
        }
    }

    /// <summary>
    /// 毎フレーム呼び出され、画面サイズの変化を監視してカメラの表示領域を調整します。
    /// </summary>
    void Update()
    {
        // 現在の画面のアスペクト比
        // Screen.width / height は、ウィンドウの現在のサイズ（ピクセル）です。
        float windowAspect = (float)Screen.width / Screen.height;

        // 目標に対する現在の比率
        // 1.0f より小さい = 画面が目標より縦長（上下に黒帯が必要）
        // 1.0f より大きい = 画面が目標より横長（左右に黒帯が必要）
        float scaleHeight = windowAspect / targetAspect;

        if (_targetCamera == null) _targetCamera = GetComponent<Camera>();

        // 画面が目標より「縦長」の場合（例: 16:10のMacBookで16:9を表示）
        // 上下に黒帯を入れる
        if (scaleHeight < 1.0f)
        {
            Rect rect = _targetCamera.rect;

            // 横幅は画面いっぱい(1.0)使う
            rect.width = 1.0f;
            // 縦幅は比率に合わせて縮める
            rect.height = scaleHeight;

            // X座標は0（左端）
            rect.x = 0;
            // Y座標を調整して、画面の中央に表示されるようにする
            // (1.0 - 表示高さ) / 2 = 上下の余白の片方分
            rect.y = (1.0f - scaleHeight) / 2.0f; // 中央寄せ

            _targetCamera.rect = rect;
        }
        else // 画面が目標より「横長」の場合（ウルトラワイドなど）
        {
            // 左右に黒帯を入れる（ピラーボックス）
            float scaleWidth = 1.0f / scaleHeight;
            Rect rect = _targetCamera.rect;
            rect.width = scaleWidth;
            rect.height = 1.0f;
            rect.x = (1.0f - scaleWidth) / 2.0f; // 中央寄せ
            rect.y = 0;
            _targetCamera.rect = rect;
        }
    }
}