using UnityEngine;

/// <summary>
/// 追尾型の敵キャラクターを制御するクラス。
/// プレイヤーの位置に向かって移動し、自機狙い弾を発射します。
/// </summary>
public class ChaserEnemyController : MonoBehaviour, IDamageable
{
    public float speed = 1f;
    // メンバ変数: Transformであることを明確にするため playerTransform とする
    private Transform playerTransform;

    //HP関連
    public int baseHP = 1;
    private int currentHP;

    //敵の射撃に関する変数
    public float shootingStartTime = 12f; //弾を打ち始める時間
    public float aimingStartTime = 12f; //自機狙いを始める時間
    public float fireRate = 5f; //弾の発射間隔
    private float nextFireTime = 0f; //次回の発射時間
    private bool canShoot = false; //射撃可能かどうか

    /// <summary>
    /// 初期化処理。
    /// 難易度に応じたHP設定と、ターゲット（プレイヤー）の取得を行います。
    /// </summary>
    void Start()
    {
        int additionalHP = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f); //HPが90秒ごとに1増加
        currentHP = baseHP + additionalHP;

        GameObject playerGameObject = GameObject.FindGameObjectWithTag("Player");
        playerTransform = playerGameObject?.transform;
    }

    /// <summary>
    /// 毎フレーム呼び出される更新処理。
    /// プレイヤーへの追尾移動と、射撃制御を行います。
    /// </summary>
    void Update()
    {
        if (playerTransform == null)
        {
            return;
        }

        // プレイヤーの方向ベクトルを計算し、その方向へ移動する
        Vector3 direction = playerTransform.position - transform.position;
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

    /// <summary>
    /// 弾を発射する処理。
    /// </summary>
    public void Shoot()
    {
        //弾の向きの変数
        Quaternion rotation;

        //指定時間を経過していたら、弾の向きをプレイヤーの方向に指定
        if (playerTransform != null && GameManager.instance.timeElapsed >= aimingStartTime)
        {
            Vector2 directionToPlayer = playerTransform.position - transform.position;
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

    /// <summary>
    /// ダメージを受けた際の処理（IDamageableインターフェースの実装）。
    /// </summary>
    public void TakeDamage(int damage)
    {
        currentHP -= damage;

        if (currentHP <= 0)
        {
            GameManager.instance.AddScore(20);
            GameManager.instance.IncrementEnemiesDefeated(); //撃破数カウント
            Destroy(gameObject);
        }
    }

    /// <summary>
    /// プレイヤーと接触し続けている間の処理。
    /// </summary>
    private void OnTriggerStay2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            // ローカル変数: ここで 'player' を使うのが最も自然です (player.TakeDamage)
            if (other.TryGetComponent<IDamageable>(out var player))
            {
                player.TakeDamage(1);
            }
        }
    }

    /// <summary>
    /// 他のオブジェクトと接触した瞬間の処理。
    /// </summary>
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Enemy"))
        {
            CreateRevengeBulletsAndDestroy();
        }
    }

    /// <summary>
    /// 誘爆時の処理。全方位弾を発射して自滅します。
    /// </summary>
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
