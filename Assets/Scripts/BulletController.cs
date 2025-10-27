using UnityEngine;

public class BulletController : MonoBehaviour
{
    //弾の速さ
    public float bulletSpeed = 10f;
    //弾の攻撃力
    public int damage = 1;

    private Rigidbody2D rb;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void Start()
    {
        //弾が向いている方向に、指定したスピードを与える
        rb.linearVelocity = transform.up * bulletSpeed;
    }

    //他のColliderに当たった時に呼ばれる関数
    private void OnTriggerEnter2D(Collider2D other)
    {
        //当たった相手のTagが"Enemy"だった場合
        if (other.gameObject.CompareTag("Enemy"))
        {
            other.gameObject.SendMessage("TakeDamage", damage);

            //自分自身（弾）は破壊する
            Destroy(gameObject);
        }
    }
}
