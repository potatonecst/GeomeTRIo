using UnityEngine;
using System.Collections;

/// <summary>
/// 追尾型の敵キャラクターを制御するクラス。
/// プレイヤーの位置に向かって移動し、自機狙い弾を発射します。
/// </summary>
public class ChaserEnemyController : MonoBehaviour, IDamageable, IChainExplodable
{
    public float speed = 1f;
    // メンバ変数: Transformであることを明確にするため playerTransform とする
    private Transform playerTransform;

    //HP関連
    public int baseHP = 1;
    private int currentHP;
    private int maxHP;

    // スコア関連
    public int baseScore = 300; // 追尾敵は基礎点高め (20 -> 300: 難易度に合わせて上方修正)
    [HideInInspector] public float scoreMultiplier = 1.0f;
    private int scoreValue;

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
    public GameObject powerUpItemPrefab;

    [Header("UI")]
    public Transform hpBarTransform;
    private Vector3 hpBarOriginalLocalPosition;
    private float hpBarOriginalScaleX;
    private float hpBarOriginalWidth; // HPバーの初期幅
    private float spawnTime; // 生成時刻

    // 画面外判定用の境界値
    private float visibleYLimit = 5.5f;
    private float visibleXLimit = 4.5f; // HUDを考慮した横幅制限

    private bool isSelfDestructing = false; // 誘爆処理中フラグ

    /// <summary>
    /// 初期化処理。
    /// 難易度に応じたHP設定と、ターゲット（プレイヤー）の取得を行います。
    /// </summary>
    void Start()
    {
        spawnTime = Time.time; // 生成時刻を記録

        // 90秒ごとに難易度レベルが上昇します (開始時:0 -> 90秒:1 -> 180秒:2 ...)
        // Mathf.FloorToInt: 経過時間を90で割った値の小数点以下を切り捨て、現在の難易度レベルを算出します。
        // 例: 45秒 / 90 = 0.5 -> 0 (基礎点のみ加算)
        int difficultyLevel = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);

        // HPはレベル分だけ増加させますが、硬くなりすぎないように上限(30)を設けます。
        // プレイヤーの攻撃力も上がるため、後半はこれくらいあっても倒せます。
        currentHP = Mathf.Min(30, baseHP + difficultyLevel);
        maxHP = currentHP;

        // 移動速度の上昇: レベルごとに 0.1f ずつ速くする（上限 3.0f）
        // Mathf.Min: 速度が無限に上がらないよう、上限値(3.0f)を設定します。
        speed = Mathf.Min(3.0f, speed + (difficultyLevel * 0.1f));

        // 難易度調整: レベルごとに連射速度を上げる (初期5.0秒 -> レベルごとに0.5秒短縮 -> 下限1.0秒)
        // Mathf.Max: 発射間隔が短くなりすぎて0以下になるのを防ぎ、最低でも1.0秒の間隔を保ちます。
        fireRate = Mathf.Max(1.0f, 5.0f - (difficultyLevel * 0.5f));

        // スコア計算
        scoreValue = Mathf.RoundToInt((baseScore + (difficultyLevel * 100)) * scoreMultiplier);

        // プレイヤーオブジェクトを探して、その Transform（位置情報）を保持します。
        // GameObject.FindGameObjectWithTag: シーン全体から "Player" タグを持つオブジェクトを検索します。
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

            var barSr = hpBarTransform.GetComponent<SpriteRenderer>();
            if (barSr != null)
            {
                hpBarOriginalWidth = barSr.bounds.size.x;
            }
        }

        // HPが1以下の場合はHPバーを隠す
        if (maxHP <= 1 && hpBarTransform != null)
        {
            hpBarTransform.gameObject.SetActive(false);
        }

        // カメラの表示範囲に基づいて、画面外の境界値を計算します
        if (Camera.main != null)
        {
            // 完全に画面外ギリギリだと、見えないのに当たってしまうことがあるため、0.01だけ内側に入れます。
            float margin = spriteRenderer != null ? spriteRenderer.bounds.extents.y - 0.01f : 0.5f;
            visibleYLimit = Camera.main.orthographicSize + margin;
            // X方向はHUDがあるため、カメラ全幅ではなくプレイエリア幅(4.5)を使用します
            visibleXLimit = 4.5f;
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
            // Mathf.Atan2(y, x): ベクトルのX, Y成分から角度（ラジアン）を計算します。
            // Mathf.Rad2Deg: ラジアンを度数法（0〜360度）に変換する定数です。
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

        // 難易度レベルの取得
        int difficultyLevel = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);

        //生成した弾のEnemyBulletControllerを取得
        EnemyBulletController bulletController = bullet.GetComponent<EnemyBulletController>();
        if (bulletController != null)
        {
            //通常弾より遅いスピードに設定 + レベルごとに0.1f加速 (Lv0:3.0f -> Lv10:4.0f)
            bulletController.speed = 3f + (difficultyLevel * 0.1f);
        }

        GameManager.instance?.PlayEnemyShootSound(); //効果音再生
    }

    /// <summary>
    /// ダメージを受けた際の処理（IDamageableインターフェースの実装）。
    /// </summary>
    public void TakeDamage(int damage)
    {
        // 画面外（出現直後など）にいる場合はダメージを受けない
        // これにより、出現した瞬間にプレイヤーの弾幕に当たって即死するのを防ぎます。
        if (transform.position.y > visibleYLimit || transform.position.y < -visibleYLimit)
        {
            return;
        }

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

            var barSr = hpBarTransform.GetComponent<SpriteRenderer>();
            if (barSr != null)
            {
                float currentWidth = barSr.bounds.size.x;
                float widthDiff = hpBarOriginalWidth - currentWidth;
                Vector3 newPos = hpBarOriginalLocalPosition;
                newPos.x -= widthDiff * 0.5f;
                hpBarTransform.localPosition = newPos;
            }
            else
            {
                float widthDiff = hpBarOriginalScaleX - newScale.x;
                Vector3 newPos = hpBarOriginalLocalPosition;
                newPos.x -= widthDiff * 0.5f;
                hpBarTransform.localPosition = newPos;
            }
        }

        if (currentHP <= 0)
        {
            GameManager.instance.TriggerScoreEvent(scoreValue, ""); // ポップアップ表示
            GameManager.instance.IncrementEnemiesDefeated(); //撃破数カウント

            // 死亡エフェクト生成
            if (deathEffectPrefab != null)
            {
                Instantiate(deathEffectPrefab, transform.position, Quaternion.identity);
            }

            // ドロップ判定 (追尾敵は少し高めの30%とか)
            if (powerUpItemPrefab != null && Random.value <= 0.3f)
            {
                Instantiate(powerUpItemPrefab, transform.position, Quaternion.identity);
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
        // インターフェースによる誘爆判定に変更
        if (other.TryGetComponent<IChainExplodable>(out var explodable))
        {
            // 出現直後（0.5秒間）は誘爆しない
            if (Time.time < spawnTime + 0.5f) return;

            // 画面外（上下左右）にいる場合は誘爆しない
            // HUDの裏側などで誘爆しないようにX座標もチェックします
            if (transform.position.y > visibleYLimit || transform.position.y < -visibleYLimit ||
                transform.position.x > visibleXLimit || transform.position.x < -visibleXLimit)
            {
                return;
            }

            // 自分自身の誘爆処理を実行
            OnChainExplosion();
        }
    }

    /// <summary>
    /// IChainExplodableの実装。誘爆時の処理を行います。
    /// </summary>
    public void OnChainExplosion()
    {
        if (isSelfDestructing) return;
        isSelfDestructing = true;

        // 難易度レベルの取得
        int difficultyLevel = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);

        // レベル上昇の上限を設定（HPカンスト等に合わせてLv30で打ち止め）
        int cappedLevel = Mathf.Min(difficultyLevel, 30);

        // レベルに応じて弾数と速度を強化
        int bulletCount = 8 + (cappedLevel * 2);
        // 速度: 10 -> 10.5 -> 11 ... (上限: 25f)
        float bulletSpeed = 10f + (cappedLevel * 0.5f);

        for (int i = 0; i < bulletCount; ++i)
        {
            //発射角度を指定
            float angle = (360f / bulletCount) * i;
            Quaternion rotation = Quaternion.Euler(0, 0, angle);

            GameObject bullet = Instantiate(GameManager.instance.enemyBulletPrefab, transform.position, rotation);

            // 弾速の設定
            var bc = bullet.GetComponent<EnemyBulletController>();
            if (bc != null)
            {
                bc.speed = bulletSpeed;
                // 誘爆弾も減速させて、回避の猶予を作る
                // 初速は速く(bulletSpeed)、0.1秒後から減速し、最終的に4.0fになる
                bc.useSpeedVariation = true;
                bc.speedVariationDelay = 0.1f;
                bc.minSpeed = 4.0f;
            }
        }
        GameManager.instance?.PlayEnemyShootSound(); //効果音再生

        // 誘爆ボーナス: 本来のスコア + 250点 (2体で500点)
        GameManager.instance.TriggerScoreEvent(scoreValue + 250, "CHAIN");

        // 死亡エフェクト生成
        if (deathEffectPrefab != null)
        {
            Instantiate(deathEffectPrefab, transform.position, Quaternion.identity);
        }
        Destroy(gameObject);
    }
}
