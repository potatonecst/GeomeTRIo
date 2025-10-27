using UnityEngine;

public class CheserEnemyController : MonoBehaviour
{
    public float speed = 1f;
    private Transform player;

    //HP関連
    public int baseHP = 1;
    private int currentHP;

    //敵の射撃に関する変数
    public float shootingStartTime = 12f; //弾を打ち始める時間
    public float aimingStartTime = 12f; //自機狙いを始める時間
    public float fireRate = 5f; //弾の発射間隔
    private float nextFireTime = 0f; //次回の発射時間
    private bool canShoot = false; //射撃可能かどうか

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        int additionalHP = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f); //HPが90秒ごとに1増加
        currentHP = baseHP + additionalHP;

        GameObject playerGameObject = GameObject.FindGameObjectWithTag("Player");
        player = playerGameObject?.transform;
    }

    // Update is called once per frame
    void Update()
    {
        if (player == null)
        {
            return;
        }

        Vector3 direction = player.position - transform.position;
        direction.Normalize();
        transform.Translate(direction * speed * Time.deltaTime);

        if (!canShoot && GameManager.instance.timeElapsed >= shootingStartTime)
        {
            canShoot = true;
            nextFireTime = Time.time + Random.Range(2f, 2f + fireRate);
        }

        if (canShoot && Time.time > nextFireTime)
        {
            Shoot();
            nextFireTime = Time.time + fireRate;
        }
    }

    //射撃関数
    public void Shoot()
    {
        //弾の向きの変数
        Quaternion rotation;

        //指定時間を経過していたら、弾の向きをプレイヤーの方向に指定
        if (player != null && GameManager.instance.timeElapsed >= aimingStartTime)
        {
            Vector2 directionToPlayer = player.position - transform.position;
            float angle = Mathf.Atan2(directionToPlayer.y, directionToPlayer.x) * Mathf.Rad2Deg - 90f;
            rotation = Quaternion.Euler(0, 0, angle);
        }
        else
        {
            rotation = Quaternion.Euler(0, 0, 0);
        }

        //GameManagerから敵の弾のプレハブを取得して生成
        GameObject bullet = Instantiate(GameManager.instance.enemyBulletPrefab, transform.position, rotation);

        //生成した弾のEnemyBulletControllerを取得
        EnemyBulletController bulletController = bullet.GetComponent<EnemyBulletController>();
        if (bulletController != null)
        {
            //通常弾より遅いスピードに設定
            bulletController.speed = 3f;
        }

        GameManager.instance?.PlayEnemyShootSound(); //効果音再生
    }

    //敵がダメージを受ける関数
    public void TakeDamage(int damage)
    {
        currentHP -= damage;

        if (currentHP <= 0)
        {
            GameManager.instance.AddScore(20);
            Destroy(gameObject);
        }
    }

    //プレイヤーに衝突した場合
    private void OnTriggerStay2D(Collider2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            PlayerController playerScript = other.GetComponent<PlayerController>();
            playerScript?.TakeDamage(1);
        }
    }

        //他の敵に当たった場合
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.CompareTag("Enemy"))
        {
            CreateRevengeBulletsAndDestroy();
        }
    }

    //弾を全方位に発射して消える
    private void CreateRevengeBulletsAndDestroy()
    {
        for (int i = 0; i < 8; ++i)
        {
            //発射角度を指定
            float angle = 45f * i;
            Quaternion rotation = Quaternion.Euler(0, 0, angle);

            Instantiate(GameManager.instance.enemyBulletPrefab, transform.position, rotation);
        }
        GameManager.instance?.PlayEnemyShootSound(); //効果音再生

        GameManager.instance.AddScore(5); //相殺ボーナススコア
        Destroy(gameObject);
    }
}
