using UnityEngine;

/// <summary>
/// ゲーム画面の背景（グリッド線）を生成し、スクロールさせるクラス。
/// テクスチャのUVオフセットを操作することで、無限スクロールを表現します。
/// ※現在は ReactUnity (game/background.tsx) 側で背景を描画しているため、
/// このコンポーネントは使用されていないか、フォールバック用として残されています。
/// </summary>
public class BackgroundScroller : MonoBehaviour
{
    [Header("Scroll Settings")]
    public float scrollSpeed = 0.1f;

    [Header("Grid Appearance")]
    // ReactUnityの背景色 #0f172a (R:15, G:23, B:42) に合わせる
    public Color backgroundColor = new Color(15f / 255f, 23f / 255f, 42f / 255f);
    // グリッド線は薄いシアン。背景色に馴染むようにアルファ値を調整
    // React側: 親opacity(0.05) * 子opacity(0.3) = 0.015
    public Color gridColor = new Color(0.0f, 1.0f, 1.0f, 0.015f);
    // React側: 160px間隔。Unity(高さ10unit=1080px想定)では 160/1080*10 ≒ 1.48unit
    public float worldGridSize = 1.5f;
    public int textureResolution = 256; // 解像度は高めに保ち、線をシャープにする
    public int lineThicknessPixels = 1; // 2 -> 1 にして線を細くする

    private Renderer _renderer;
    private Vector2 _savedOffset;

    /// <summary>
    /// 初期化処理。
    /// グリッド模様のテクスチャを動的に生成し、マテリアルに適用します。
    /// </summary>
    void Start()
    {
        _renderer = GetComponent<Renderer>();

        // 1. 1マス分のテクスチャを動的に生成する
        Texture2D texture = GenerateSingleGridTexture();

        // 2. マテリアルを生成してテクスチャをセットする
        // Unlit/Texture シェーダーを使うことで、ライティングの影響を受けずに綺麗に発色します
        Material mat = new Material(Shader.Find("Unlit/Texture"));
        mat.mainTexture = texture;
        _renderer.material = mat;

        // 3. オブジェクトのスケールに合わせてタイリング（繰り返し）を設定
        UpdateTiling();

        _savedOffset = _renderer.material.mainTextureOffset;
    }

    /// <summary>
    /// 毎フレーム呼び出され、テクスチャのオフセットを更新してスクロールアニメーションを行います。
    /// </summary>
    void Update()
    {
        // 時間経過に合わせてY方向のオフセットをずらすことでスクロールを表現
        // Mathf.Repeat(t, length): t を length で割った余りを返します（0 〜 length の範囲をループする）。
        // これにより、yの値は 0.0 -> 1.0 -> 0.0 ... と滑らかにループし、無限スクロールに見えます。
        float y = Mathf.Repeat(Time.time * scrollSpeed, 1);
        Vector2 offset = new Vector2(_savedOffset.x, y);
        _renderer.material.mainTextureOffset = offset;

#if UNITY_EDITOR
        // エディタ実行中にスケールを変えた場合などに追従するように
        UpdateTiling();
#endif
    }

    /// <summary>
    /// オブジェクトのスケールに合わせて、テクスチャのタイリング（繰り返し回数）を調整します。
    /// </summary>
    void UpdateTiling()
    {
        if (_renderer == null || _renderer.material == null) return;

        // オブジェクトのスケールを取得
        Vector2 scale = transform.localScale;

        // ワールド空間でのグリッドサイズに合わせてタイリング数を計算
        // これにより、Quadが縦長でもグリッドは正方形を保ちます
        Vector2 tiling = new Vector2(scale.x / worldGridSize, scale.y / worldGridSize);

        _renderer.material.mainTextureScale = tiling;
    }

    /// <summary>
    /// 1マス分のグリッド模様のテクスチャを動的に生成します。
    /// </summary>
    Texture2D GenerateSingleGridTexture()
    {
        // Texture2D: プログラムから動的に画像を生成・操作できるクラスです。
        Texture2D tex = new Texture2D(textureResolution, textureResolution);
        tex.filterMode = FilterMode.Bilinear; // 滑らかにする
        tex.wrapMode = TextureWrapMode.Repeat; // 繰り返す設定

        // ピクセルデータの配列を作成（サイズは 幅 x 高さ）
        Color[] pixels = new Color[textureResolution * textureResolution];

        // 背景色で塗りつぶし
        for (int i = 0; i < pixels.Length; i++) pixels[i] = backgroundColor;

        // 線の色を計算（背景色の上にグリッド色を重ねた色を作る）
        Color blendedGridColor = Color.Lerp(backgroundColor, new Color(gridColor.r, gridColor.g, gridColor.b, 1f), gridColor.a);

        // グリッド線を描画（左端と下端）
        for (int i = 0; i < textureResolution; i++)
        {
            for (int t = 0; t < lineThicknessPixels; t++)
            {
                // 縦線
                pixels[i * textureResolution + t] = blendedGridColor;
                // 横線
                pixels[t * textureResolution + i] = blendedGridColor;
            }
        }

        // SetPixels: 計算した色データをテクスチャにセットします（まだGPUには送られません）。
        tex.SetPixels(pixels);
        // Apply: 変更を確定し、データをGPUに転送します。これを呼ばないと描画に反映されません。
        tex.Apply(); // 変更を適用
        return tex;
    }

    /// <summary>
    /// 外部からスクロール速度を変更するためのメソッド。
    /// </summary>
    public void SetSpeed(float newSpeed)
    {
        scrollSpeed = newSpeed;
    }
}
