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
        // 物理挙動を制御する Rigidbody2D コンポーネントを取得します。
        rb = GetComponent<Rigidbody2D>();
    }

    /// <summary>
    /// 生成直後に呼び出され、弾に初速を与えます。
    /// </summary>
    void Start()
    {
        // 弾の速度を設定します。
        // transform.up: このオブジェクトの「上」方向（回転を考慮した進行方向）
        // linearVelocity: Unity 6以降の新しい速度プロパティ（旧 velocity）
        rb.linearVelocity = transform.up * speed;

        // 進行方向が決まった後に、見た目だけを45度回転させます。
        // これにより、軌道を変えずに「正方形」を「ひし形（角が前）」に見せることができます。
        // Rotate(x, y, z): 現在の回転に対して追加で回転させます。
        transform.Rotate(0, 0, 45);
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
