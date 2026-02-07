using UnityEngine;
using System.Collections;

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
    private int maxHP;

    //敵の射撃に関する変数
    public float shootingStartTime = 12f; //弾を打ち始める時間
    public float aimingStartTime = 12f; //自機狙いを始める時間
    public float fireRate = 5f; //弾の発射間隔
    private float nextFireTime = 0f; //次回の発射時間
    private bool canShoot = false; //射撃可能かどうか

    // ヒット演出用
    private SpriteRenderer spriteRenderer;
    private Color originalColor;

    [Header("Effects")]
    public GameObject deathEffectPrefab;

    [Header("UI")]
    public Transform hpBarTransform;
    private Vector3 hpBarOriginalLocalPosition;
    private float hpBarOriginalScaleX;

    /// <summary>
    /// 初期化処理。
    /// 難易度に応じたHP設定と、ターゲット（プレイヤー）の取得を行います。
    /// </summary>
    void Start()
    {
        int additionalHP = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f); //HPが90秒ごとに1増加
        currentHP = baseHP + additionalHP;
        maxHP = currentHP;

        // プレイヤーオブジェクトを探して、その Transform（位置情報）を保持します。
        GameObject playerGameObject = GameObject.FindGameObjectWithTag("Player");
        playerTransform = playerGameObject?.transform;

        // SpriteRendererを取得し、元の色を保持しておく
        spriteRenderer = GetComponent<SpriteRenderer>();
        if (spriteRenderer != null)
        {
            originalColor = spriteRenderer.color;
        }

        // HPバーの初期位置とスケールを保存
        if (hpBarTransform != null)
        {
            hpBarOriginalLocalPosition = hpBarTransform.localPosition;
            hpBarOriginalScaleX = hpBarTransform.localScale.x;
        }

        // HPが1以下の場合はHPバーを隠す
        if (maxHP <= 1 && hpBarTransform != null)
        {
            hpBarTransform.gameObject.SetActive(false);
        }
    }

    /// <summary>
    /// 毎フレーム呼び出される更新処理。
    /// プレイヤーへの追尾移動と、射撃制御を行います。
    /// </summary>
    void Update()
    {
        // プレイヤーがいなければ何もしない（ゲームオーバー後など）
        if (playerTransform == null)
        {
            return;
        }

        // プレイヤーへの方向ベクトルを計算（目標位置 - 現在位置）
        Vector3 direction = playerTransform.position - transform.position;

        // Normalize: ベクトルの長さを1に正規化します。
        // これをしないと、遠くにいるプレイヤーほど速く移動してしまいます。
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
        // 弾の向き
        Quaternion rotation;

        // 自機狙い開始時間を過ぎていれば、プレイヤーの方を向く
        if (playerTransform != null && GameManager.instance.timeElapsed >= aimingStartTime)
        {
            // プレイヤーへの方向を計算
            Vector2 directionToPlayer = playerTransform.position - transform.position;
            // 角度を計算 (-90f はスプライトの向き補正)
            float angle = Mathf.Atan2(directionToPlayer.y, directionToPlayer.x) * Mathf.Rad2Deg - 90f;
            rotation = Quaternion.Euler(0, 0, angle);
        }
        else
        {
            // まだ狙わない場合は、回転なし（0度）
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

        // HPが残っている場合はヒットフラッシュ演出を入れる
        if (currentHP > 0)
        {
            StartCoroutine(FlashWhite());
        }

        // HPバーの更新
        if (hpBarTransform != null && maxHP > 1)
        {
            float hpRatio = (float)currentHP / (float)maxHP;

            Vector3 newScale = hpBarTransform.localScale;
            newScale.x = hpBarOriginalScaleX * hpRatio;
            hpBarTransform.localScale = newScale;

            float widthDiff = hpBarOriginalScaleX - newScale.x;
            Vector3 newPos = hpBarOriginalLocalPosition;
            newPos.x -= widthDiff * 0.5f;
            hpBarTransform.localPosition = newPos;
        }

        if (currentHP <= 0)
        {
            GameManager.instance.AddScore(20);
            GameManager.instance.IncrementEnemiesDefeated(); //撃破数カウント

            // 死亡エフェクト生成
            if (deathEffectPrefab != null)
            {
                Instantiate(deathEffectPrefab, transform.position, Quaternion.identity);
            }
            Destroy(gameObject);
        }
    }

    /// <summary>
    /// ダメージを受けた瞬間に白く光らせるコルーチン。
    /// </summary>
    private IEnumerator FlashWhite()
    {
        if (spriteRenderer != null)
        {
            spriteRenderer.color = Color.white; // 白くする
            yield return new WaitForSeconds(0.05f); // 一瞬待つ
            spriteRenderer.color = originalColor; // 元の色に戻す
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

        // 死亡エフェクト生成
        if (deathEffectPrefab != null)
        {
            Instantiate(deathEffectPrefab, transform.position, Quaternion.identity);
        }
        Destroy(gameObject);
    }
}
