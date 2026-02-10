using UnityEngine;

/// <summary>
/// 敵の死亡時エフェクト（パーティクル）を制御するスクリプト。
/// プレハブにアタッチすることで、発生時に動的にパラメータを調整し、
/// 飛び散る動きや色の変化を与えます。
/// </summary>
[RequireComponent(typeof(ParticleSystem))]
public class ExplosionEffect : MonoBehaviour
{
    void Start()
    {
        // 自身の ParticleSystem コンポーネントを取得します。
        ParticleSystem ps = GetComponent<ParticleSystem>();

        // mainモジュール: パーティクルの基本設定（寿命、速度、色など）を管理する部分です。
        var main = ps.main;

        // 1. 飛び散り防止: 速度を0にする
        // 爆発して拡散するのではなく、その場で「バグる」ような表現にします。
        main.startSpeed = 0f;

        // 2. 落下防止: 重力を0にする
        // 画面下まで落ちないようにします。
        main.gravityModifier = 0f;

        // 3. 素早いフェードアウト: 寿命を短く設定
        // 0.1秒〜0.25秒で、より鋭くパッと消えるようにします。
        main.startLifetime = new ParticleSystem.MinMaxCurve(0.1f, 0.25f);

        // 4. 色の設定: 赤とシアンで色収差のようなデジタルノイズ感を出す
        // 単純な補間だと中間が灰色になるため、グラデーションで赤・白・シアンを明確に定義します
        // Gradient: 色の変化（グラデーション）を定義するクラスです。
        // SetKeys: 色のキー（ColorKey）と透明度のキー（AlphaKey）を設定します。
        Gradient gradient = new Gradient();
        gradient.SetKeys(
            new GradientColorKey[] {
                new GradientColorKey(Color.red, 0.0f),
                new GradientColorKey(Color.red, 0.3f),
                new GradientColorKey(Color.white, 0.31f), // 境界を狭くして混色（灰色）を防ぐ
                new GradientColorKey(Color.white, 0.69f),
                new GradientColorKey(Color.cyan, 0.7f),
                new GradientColorKey(Color.cyan, 1.0f)
            },
            new GradientAlphaKey[] { new GradientAlphaKey(1.0f, 0.0f), new GradientAlphaKey(1.0f, 1.0f) }
        );
        var colorGradient = new ParticleSystem.MinMaxGradient(gradient);

        // RandomColorモード: グラデーションの中からランダムに1色を選びます。
        // これにより、ある粒子は赤、ある粒子はシアン、といった具合に色が混ざらずに生成されます。
        colorGradient.mode = ParticleSystemGradientMode.RandomColor;
        main.startColor = colorGradient;

        // 5. 形状: 敵のいた場所に留めるため Box (直方体の範囲) に変更
        var shape = ps.shape;
        shape.enabled = true;
        shape.shapeType = ParticleSystemShapeType.Box;
        shape.scale = new Vector3(0.3f, 0.3f, 1f); // 敵のサイズに合わせてさらに縮小

        // 6. ノイズ演出: 粒子を激しく振動させてグリッチ感を出す
        var noise = ps.noise;
        noise.enabled = true; // ノイズモジュールを有効化
        noise.strength = 1.0f; // 振動の強さ。値を大きくすると激しく動き回ります。
        noise.frequency = 20.0f; // 振動の周波数。値を大きくするとジジジッと細かく震えます。
        noise.scrollSpeed = 10.0f; // ノイズパターンの変化速度。

        // 7. 放出量: 一瞬で表示
        var emission = ps.emission;
        emission.enabled = true;
        emission.rateOverTime = 0; // 時間経過による放出（毎秒○個）は無効にします。

        // バースト放出: 指定した時間（0秒時点）に、指定した数（20〜40個）を一気に放出します。
        emission.SetBursts(new ParticleSystem.Burst[] { new ParticleSystem.Burst(0f, 20, 40) });

        // 8. 粒子のサイズ: 3Dサイズを有効にして「横長のノイズバー」にする
        // これにより「粒」ではなく「走査線の乱れ」のような見た目になります
        main.startSize3D = true;
        // MinMaxCurve(min, max): 最小値と最大値の間でランダムなサイズになります。
        main.startSizeX = new ParticleSystem.MinMaxCurve(0.2f, 0.8f); // 横幅
        main.startSizeY = new ParticleSystem.MinMaxCurve(0.01f, 0.05f); // 縦幅（非常に細くする）
        main.startSizeZ = 1f;

        // 9. 終了後の削除
        // StopAction.Destroy: パーティクルの再生が終了したら、自動的にこの GameObject を削除します。
        // これを設定しないと、終わったエフェクトがシーンに残り続けてしまいます。
        main.stopAction = ParticleSystemStopAction.Destroy;

        // パーティクルシステムが再生されていない場合は再生する
        if (!ps.isPlaying)
        {
            ps.Play();
        }

        // 振動演出（Vibration）
        // VibrationManagerを使用することで、優先度管理や設定の一元管理を行います。
        // 強さ: 左0.3/右0.4 (強すぎないように調整), 時間: 0.2秒, 優先度: 0.8
        VibrationManager.instance?.Vibrate(0.3f, 0.4f, 0.2f, 0.8f);
    }
}
