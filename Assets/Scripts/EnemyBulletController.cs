using UnityEngine;

public class EnemyBulletController : MonoBehaviour
{
    [HideInInspector] public float speed = 20f; //敵同士の相殺時のデフォルト速度
    private Rigidbody2D rb;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void Start()
    {
        rb.linearVelocity = transform.up * speed;
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            PlayerController player = other.GetComponent<PlayerController>();
            player?.TakeDamage(1);

            Destroy(gameObject);
        }
    }
}
