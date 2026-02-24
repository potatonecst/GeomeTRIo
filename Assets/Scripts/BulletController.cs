using UnityEngine;

/// <summary>
/// プレイヤーが発射する弾を制御するクラス。
/// </summary>
public class BulletController : MonoBehaviour, IProjectile
{
    //弾の速さ
    public float bulletSpeed = 10f;
    //弾の攻撃力
    public int damage = 1;

    // IProjectileの実装: ダメージ量を返す
    public int Damage => damage;

    // IProjectileの実装: プレイヤーの弾なので false
    public bool IsEnemy => false;

    private Rigidbody2D rb;

    /// <summary>
    /// コンポーネントの取得など、初期化処理を行います。
    /// </summary>
    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    /// <summary>
    /// 生成直後に呼び出され、弾に初速を与えます。
    /// </summary>
    void Start()
    {
        //弾が向いている方向に、指定したスピードを与える
        // transform.up: このオブジェクトの「上」方向（回転を考慮した進行方向）のベクトル。
        // これに速度(scalar)を掛けることで、向いている方向に進む速度ベクトルを作れます。
        // linearVelocity は Unity 6 以降の新しいプロパティです（旧 velocity）
        rb.linearVelocity = transform.up * bulletSpeed;
    }

    // IProjectileの実装: ヒット時の処理（消滅）
    public void OnHit()
    {
        Destroy(gameObject);
    }

    /// <summary>
    /// 他のオブジェクト（トリガー）に接触した瞬間に呼び出されます。
    /// </summary>
    /// <param name="other">接触した相手のコライダー</param>
    private void OnTriggerEnter2D(Collider2D other)
    {
        //当たった相手のTagが"Enemy"だった場合
        if (other.CompareTag("Enemy"))
        {
            // インターフェースを取得してダメージを与える（SendMessageより高速で安全）
            // 相手がどんなクラス（通常敵、追尾敵、ボスなど）であっても、
            // IDamageableさえ持っていれば、共通の方法でダメージを与えられます（ポリモーフィズム）。
            if (other.TryGetComponent<IDamageable>(out var target))
            {
                target.TakeDamage(Damage);
            }

            //自分自身（弾）は破壊する
            OnHit();
        }
    }
}
