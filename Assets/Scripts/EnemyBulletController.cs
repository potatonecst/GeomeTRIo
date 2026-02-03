using UnityEngine;

/// <summary>
/// 敵が発射する弾を制御するクラス。
/// </summary>
public class EnemyBulletController : MonoBehaviour
{
    [HideInInspector] public float speed = 20f; //敵同士の相殺時のデフォルト速度
    private Rigidbody2D rb;

    /// <summary>
    /// 初期化処理。
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
        rb.linearVelocity = transform.up * speed;
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
                target.TakeDamage(1);
            }

            Destroy(gameObject);
        }
    }
}
