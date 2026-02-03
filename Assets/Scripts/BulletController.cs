using UnityEngine;

/// <summary>
/// プレイヤーが発射する弾を制御するクラス。
/// </summary>
public class BulletController : MonoBehaviour
{
    //弾の速さ
    public float bulletSpeed = 10f;
    //弾の攻撃力
    public int damage = 1;

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
        // linearVelocity は Unity 6 以降の新しいプロパティです（旧 velocity）
        rb.linearVelocity = transform.up * bulletSpeed;
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
            if (other.TryGetComponent<IDamageable>(out var target))
            {
                target.TakeDamage(damage);
            }

            //自分自身（弾）は破壊する
            Destroy(gameObject);
        }
    }
}
