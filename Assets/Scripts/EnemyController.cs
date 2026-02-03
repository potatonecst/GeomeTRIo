using UnityEngine;

/// <summary>
/// 通常の敵キャラクター（直進タイプ）を制御するクラス。
/// 画面上部から出現し、下方向へ移動しながら、一定間隔で弾を発射します。
/// </summary>
public class EnemyController : MonoBehaviour, IDamageable
{
    //プレイヤー
    private GameObject playerObject;

    //敵の移動読度
    public float speed = 1f;

    //敵の射撃に関する変数
    public float shootingStartTime = 40f; //弾を打ち始める時間
    public float aimingStartTime = 60f; //自機狙いを始める時間
    public float fireRate = 1.5f; //弾の発射間隔
    private float nextFireTime = 0f; //次回の発射時間
    private bool canShoot = false; //射撃可能かどうか

    //HPに関する変数
    public int baseHP = 1;
    private int currentHP;

    /// <summary>
    /// 初期化処理。
    /// ゲームの経過時間に応じてHPを強化し、プレイヤーオブジェクトの参照を取得します。
    /// </summary>
    void Start()
    {
        //ゲーム開始時にHPを最大にする
        int additionalHP = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f); //90秒ごとにHPが1増加
        currentHP = baseHP + additionalHP;

        //プレイヤーを探す
        playerObject = GameObject.FindGameObjectWithTag("Player");
    }

    /// <summary>
    /// 毎フレーム呼び出される更新処理。
    /// 敵の移動と、射撃タイミングの管理を行います。
    /// </summary>
    void Update()
    {
        //敵を下に移動させる
        transform.Translate(Vector3.down * speed * Time.deltaTime);

        //指定時間が経過していたら射撃を許可する
        if (!canShoot && GameManager.instance.timeElapsed >= shootingStartTime)
        {
            canShoot = true;

            //初回の射撃タイミングをランダムにする
            nextFireTime = Time.time + Random.Range(2f, 2f + fireRate);
        }

        //射撃が許可されていたら、弾を打つ
        if (canShoot && Time.time > nextFireTime)
        {
            Shoot();
            nextFireTime = Time.time + fireRate; //次回の発射タイミングを設定
        }
    }

    /// <summary>
    /// 弾を発射する処理。
    /// </summary>
    public void Shoot()
    {
        //プレイヤーの位置(自機狙いのため)
        Transform playerTransform = null;
        if (playerObject != null)
        {
            playerTransform = playerObject.transform;
        }

        //弾の向きの変数
        Quaternion rotation;

        //指定時間が経過していたら、弾の向きをプレイヤーの方向に指定する
        if (playerTransform != null && GameManager.instance.timeElapsed >= aimingStartTime)
        {
            Vector2 directionToPlayer = playerTransform.position - transform.position;
            float angle = Mathf.Atan2(directionToPlayer.y, directionToPlayer.x) * Mathf.Rad2Deg - 90f;
            rotation = Quaternion.Euler(0, 0, angle);
        }
        else
        {
            rotation = Quaternion.Euler(0, 0, 180f);
        }

        //GameManagerから敵の弾プレハブを取得して生成
        GameObject bullet = Instantiate(GameManager.instance.enemyBulletPrefab, transform.position, rotation);

        //生成した弾のEnemyBulletControllerを取得
        EnemyBulletController bulletController = bullet.GetComponent<EnemyBulletController>();
        if (bulletController != null)
        {
            //通常弾用の遅いスピードを設定
            bulletController.speed = 3f;
        }

        GameManager.instance?.PlayEnemyShootSound(); //効果音再生
    }

    /// <summary>
    /// ダメージを受けた際の処理（IDamageableインターフェースの実装）。
    /// HPを減らし、0以下になったら撃破処理を行います。
    /// </summary>
    public void TakeDamage(int damage)
    {
        currentHP -= damage;

        if (currentHP <= 0)
        {
            GameManager.instance.AddScore(10); //10点加算
            GameManager.instance.IncrementEnemiesDefeated(); //撃破数カウント
            Destroy(gameObject);
        }
    }

    /// <summary>
    /// 他のオブジェクトと接触し続けている間に呼ばれる処理。
    /// </summary>
    private void OnTriggerStay2D(Collider2D other)
    {
        //当たった相手のタグがPlayerだった場合
        if (other.CompareTag("Player"))
        {
            //相手からPlayerControllerのスクリプトを取得
            if (other.TryGetComponent<IDamageable>(out var player))
            {
                player.TakeDamage(1);
            }
        }
    }

    /// <summary>
    /// 他のオブジェクトと接触した瞬間に呼ばれる処理。
    /// </summary>
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Enemy"))
        {
            CreateRevengeBulletsAndDestroy();
        }
    }

    /// <summary>
    /// 誘爆（敵同士の衝突）時の処理。全方位に弾をばら撒いて自滅します。
    /// </summary>
    private void CreateRevengeBulletsAndDestroy()
    {
        for (int i = 0; i < 8; ++i)
        {
            //発射角度を指定
            float angle = 45f * i;
            Quaternion rotation = Quaternion.Euler(0, 0, angle);
            //Debug.Log("Spawning bullet at angle: " + angle);

            Instantiate(GameManager.instance.enemyBulletPrefab, transform.position, rotation);
        }
        GameManager.instance?.PlayEnemyShootSound(); //効果音再生

        GameManager.instance.AddScore(5); //相殺ボーナススコア
        Destroy(gameObject);
    }
}
