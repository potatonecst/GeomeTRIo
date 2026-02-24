using UnityEngine;

/// <summary>
/// 敵が発射する弾を制御するクラス。
/// </summary>
public class EnemyBulletController : MonoBehaviour, IProjectile
{
    [HideInInspector] public float speed = 20f; //敵同士の相殺時のデフォルト速度
    private Rigidbody2D rb;

    // 攻撃力（デフォルト1）
    public int damage = 1;
    public int Damage => damage;

    // IProjectileの実装: 敵の弾なので true
    public bool IsEnemy => true;

    // 速度変化（減速）用の変数
    [HideInInspector] public bool useSpeedVariation = false;
    [HideInInspector] public float speedVariationDelay = 0.5f; // 変化開始までの時間
    [HideInInspector] public float minSpeed = 5.0f; // 最低速度
    [HideInInspector] public float decelerationRate = 10.0f; // 減速率

    private float timeSinceStart;
    private float currentSpeed;

    /// <summary>
    /// 初期化処理。
    /// </summary>
    void Awake()
    {
        // 物理挙動を制御する Rigidbody2D コンポーネントを取得します。
        rb = GetComponent<Rigidbody2D>();
        if (rb != null)
        {
            rb.gravityScale = 0f; // 重力の影響を受けないようにする
        }

        // 弾同士が衝突して軌道が変わらないように、強制的にTrigger（すり抜け）モードにする
        var col = GetComponent<Collider2D>();
        if (col != null) col.isTrigger = true;
    }

    /// <summary>
    /// 生成直後に呼び出され、弾に初速を与えます。
    /// </summary>
    void Start()
    {
        // 弾の速度を設定します。
        currentSpeed = speed;
        // transform.up: このオブジェクトの「上」方向（回転を考慮した進行方向）
        // linearVelocity: Unity 6以降の新しい速度プロパティ（旧 velocity）
        rb.linearVelocity = transform.up * currentSpeed;

        // 進行方向が決まった後に、見た目だけを45度回転させます。
        // これにより、軌道を変えずに「正方形」を「ひし形（角が前）」に見せることができます。
        // Rotate(x, y, z): 現在の回転に対して追加で回転させます。
        transform.Rotate(0, 0, 45);
    }

    /// <summary>
    /// 物理演算の更新タイミング（固定間隔）で呼び出されます。
    /// 弾の速度変化（減速）処理を行います。
    /// </summary>
    void FixedUpdate()
    {
        // 速度変化が有効な場合
        if (useSpeedVariation)
        {
            // 経過時間を加算
            timeSinceStart += Time.fixedDeltaTime;

            // 指定時間が経過したら減速開始
            if (timeSinceStart >= speedVariationDelay)
            {
                // 徐々に最低速度まで落とす
                // Mathf.MoveTowards: 現在の値を目標値に向かって、指定した最大変化量（step）だけ近づけます。
                // Time.fixedDeltaTime を掛けることで、フレームレートに依存しない一定の減速率になります。
                currentSpeed = Mathf.MoveTowards(currentSpeed, minSpeed, decelerationRate * Time.fixedDeltaTime);

                // 修正: transform.up を使うと、Start()での45度回転の影響で進行方向が曲がってしまうため、
                // 現在の速度ベクトル(rb.linearVelocity)の向きを維持したまま、速さだけを更新する。
                // sqrMagnitude: ベクトルの長さの2乗。0に近いかどうかの判定を高速に行うために使用。
                if (rb.linearVelocity.sqrMagnitude > 0.001f)
                {
                    // normalized: ベクトルの向きはそのままで、長さを1にしたベクトルを取得。
                    // それに現在の速度(currentSpeed)を掛けることで、新しい速度ベクトルを作ります。
                    rb.linearVelocity = rb.linearVelocity.normalized * currentSpeed;
                }
            }
        }
    }

    // IProjectileの実装: ヒット時の処理（消滅）
    public void OnHit()
    {
        Destroy(gameObject);
    }

    /// <summary>
    /// プレイヤーに接触した際の処理。
    /// </summary>
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            if (other.TryGetComponent<IDamageable>(out var target))
            {
                target.TakeDamage(Damage);
            }

            OnHit();
        }
    }
}
