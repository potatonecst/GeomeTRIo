using UnityEngine;
using System.Collections;

/// <summary>
/// 通常の敵キャラクター（直進タイプ）を制御するクラス。
/// 画面上部から出現し、下方向へ移動しながら、一定間隔で弾を発射します。
/// </summary>
public class EnemyController : MonoBehaviour, IDamageable, IChainExplodable
{
    //プレイヤー
    private GameObject playerObject;

    //敵の移動読度
    public float speed = 1f;

    //敵の射撃に関する変数
    public float shootingStartTime = 40f; //弾を打ち始める時間
    public float aimingStartTime = 90f; //自機狙いを始める時間 (レベル1に合わせて90秒に変更)
    public float fireRate = 1.5f; //弾の発射間隔
    private float nextFireTime = 0f; //次回の発射時間
    private bool canShoot = false; //射撃可能かどうか

    // 弾の基礎速度（Spawnerから変更可能にする）
    public float bulletSpeedBase = 3.0f;

    // 弾の速度変化設定（Spawnerから設定）
    [HideInInspector] public bool bulletUseSpeedVariation = false;
    [HideInInspector] public float bulletDecelDelay = 0.5f;
    [HideInInspector] public float bulletMinSpeed = 5.0f;
    [HideInInspector] public float bulletDecelerationRate = 10.0f; // 減速率

    //HPに関する変数
    public int baseHP = 1;
    private int currentHP;
    private int maxHP; // 最大HPを記憶

    // スコア関連
    public int baseScore = 100; // 基礎点 (10 -> 100)
    [HideInInspector] public float scoreMultiplier = 1.0f; // 倍率（Spawnerから設定）
    private int scoreValue; // 最終的なスコア

    // 編隊ボーナス用
    [HideInInspector] public int formationId = -1; // -1は編隊なし
    private bool isDead = false; // プレイヤーに倒されたかどうかのフラグ
    private bool isSelfDestructing = false; // 誘爆処理中かどうかのフラグ

    // ヒット演出用
    private SpriteRenderer spriteRenderer;
    private Color originalColor;

    [Header("Effects")]
    public GameObject deathEffectPrefab; // 死亡時のエフェクト（パーティクル）
    public GameObject powerUpItemPrefab; // パワーアップアイテムのプレハブ

    [Header("UI")]
    public Transform hpBarTransform; // HPバーのTransform（Scaleを変えるため）
    private Vector3 hpBarOriginalLocalPosition; // HPバーの初期位置（左寄せ計算用）
    private float hpBarOriginalScaleX; // HPバーの初期スケールX
    private float hpBarXOffset; // HPバーのX方向オフセット（左寄せ用）
    private float hpBarYOffset; // HPバーのY方向オフセット（高さ）
    private float hpBarOriginalWidth; // HPバーの初期幅（ワールドサイズ）
    private float spawnTime; // 生成時刻

    // 画面外判定用の境界値（初期値は5.5だが、Startでカメラに合わせて再計算する）
    private float visibleYLimit = 5.5f;
    private float visibleXLimit = 4.5f; // HUDを考慮した横幅制限（プレイヤー移動範囲3.5 + マージン）

    // 自機狙いモードになる前の固定射撃方向
    private Quaternion fixedRotation;

    // 難易度による連射速度の自動調整を行うかどうか
    [HideInInspector] public bool useFireRateScaling = true;

    /// <summary>
    /// 初期化処理。
    /// ゲームの経過時間に応じてHPを強化し、プレイヤーオブジェクトの参照を取得します。
    /// </summary>
    void Start()
    {
        spawnTime = Time.time; // 生成時刻を記録

        // ゲームの経過時間に応じて敵を強化します。
        // 90秒ごとに難易度レベルが上昇します (開始時:0 -> 90秒:1 -> 180秒:2 ...)
        // Mathf.FloorToInt: 小数点以下を切り捨てて整数にします。
        // 例: 45秒 / 90 = 0.5 -> 0 (基礎点のみ加算)
        int difficultyLevel = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);

        // HPはレベル分だけ増加させますが、硬くなりすぎないように上限(30)を設けます。
        // プレイヤーの攻撃力も上がるため、後半はこれくらいあっても倒せます。
        currentHP = Mathf.Min(30, baseHP + difficultyLevel);
        maxHP = currentHP;

        // 移動速度の上昇: レベルごとに 0.1f ずつ速くする（上限 3.0f）
        // Mathf.Min: 2つの値のうち小さい方を返します。これにより、速度が3.0fを超えないように制限（キャップ）しています。
        // これにより、後半は敵がより速く迫ってくるようになります。
        speed = Mathf.Min(3.0f, speed + (difficultyLevel * 0.1f));

        if (useFireRateScaling)
        {
            // 難易度調整: 90秒ごとのレベルアップに合わせて段階的に連射速度を上げる
            // 初期: 1.5秒 -> Lv1: 1.4秒 -> ... -> Lv10: 0.5秒 (下限)
            // Mathf.Max: 2つの値のうち大きい方を返します。これにより、間隔が0.5秒より短くならないようにしています。
            fireRate = Mathf.Max(0.5f, 1.5f - (difficultyLevel * 0.1f));
        }

        // スコア計算: (基礎点 + 難易度ボーナス) * 倍率
        scoreValue = Mathf.RoundToInt((baseScore + (difficultyLevel * 100)) * scoreMultiplier);

        // プレイヤーの位置を知るために、"Player" というタグがついたオブジェクトを探します。
        // GameObject.FindGameObjectWithTag: シーン全体から指定タグのオブジェクトを検索します（処理が重いのでStartで一度だけ行います）。
        playerObject = GameObject.FindGameObjectWithTag("Player");

        // 初期位置に基づいて、自機狙いモードになる前の射撃方向（上か下か）を決定・固定します。
        // 途中でプレイヤーが移動しても向きを変えないことで、「自機狙いではない」挙動を明確にします。
        if (playerObject != null && playerObject.transform.position.y > transform.position.y)
        {
            fixedRotation = Quaternion.Euler(0, 0, 0f); // 上
        }
        else
        {
            fixedRotation = Quaternion.Euler(0, 0, 180f); // 下
        }

        // 自分の見た目（スプライト）を管理するコンポーネントを取得します。
        // GetComponent<T>(): このゲームオブジェクトについている指定のコンポーネントを探して取得します。
        // ここでは、ダメージを受けた時に色を変えるために取得しています。
        spriteRenderer = GetComponent<SpriteRenderer>();
        if (spriteRenderer != null)
        {
            // 元の色（通常時の赤色）を覚えておきます。
            // 後で白く光らせた後、この色に戻すためです。
            originalColor = spriteRenderer.color;
        }

        // HPバーの初期状態を記録します。
        // Unityの標準的な四角形スプライトは「中心」が基準点になっているため、
        // 単に横幅を縮めると、両端から縮んでしまいます。
        // 「左端を固定して減らす」表現をするために、初期位置とサイズを基準に計算を行います。
        if (hpBarTransform != null)
        {
            hpBarOriginalLocalPosition = hpBarTransform.localPosition;
            hpBarOriginalScaleX = hpBarTransform.localScale.x;

            // HPバーの高さをスプライトのサイズに合わせて動的に調整
            // 回転している敵（斜め移動）はBoundsが高くなるためバーも高く、
            // 回転していない敵（正方形）はBoundsが低いためバーも低くなります。
            if (spriteRenderer != null)
            {
                // スプライトの上端 + マージン(0.2f)
                hpBarYOffset = spriteRenderer.bounds.extents.y + 0.2f;
            }
            else
            {
                hpBarYOffset = hpBarOriginalLocalPosition.y;
            }

            hpBarXOffset = hpBarOriginalLocalPosition.x;

            // HPバーのSpriteRendererを取得して初期幅を記録
            var barSr = hpBarTransform.GetComponent<SpriteRenderer>();
            if (barSr != null)
            {
                hpBarOriginalWidth = barSr.bounds.size.x;
            }
        }

        // HPが1（一撃で倒せる雑魚敵）の場合は、HPバーを表示する必要がないため非表示にします。
        // SetActive(false): オブジェクトを無効化（非表示）にします。
        if (maxHP <= 1 && hpBarTransform != null)
        {
            hpBarTransform.gameObject.SetActive(false);
        }

        // カメラの表示範囲に基づいて、画面外の境界値を計算します
        if (Camera.main != null)
        {
            // Camera.main.orthographicSize: カメラの中心から上端までの距離（高さの半分）です。
            // マージンをスプライトのサイズ（高さの半分）から動的に取得します。
            // これにより、敵のサイズが変わっても自動的に「画面外」の判定が正しくなります。
            // 完全に画面外ギリギリだと、見えないのに当たってしまうことがあるため、0.01だけ内側に入れます。
            float margin = spriteRenderer != null ? spriteRenderer.bounds.extents.y - 0.01f : 0.5f;

            visibleYLimit = Camera.main.orthographicSize + margin;
        }

        // 物理衝突による振動を防ぐため、ColliderをTrigger（すり抜け）にする
        var col = GetComponent<Collider2D>();
        if (col != null) col.isTrigger = true;

        // Rigidbody2Dがある場合
        var rb = GetComponent<Rigidbody2D>();
        // Kinematicにすると敵同士の衝突判定(誘爆)が効かなくなる可能性があるため、
        // Dynamicのままにしつつ、重力の影響だけを無効化します。
        if (rb != null) rb.gravityScale = 0f;
    }

    /// <summary>
    /// 毎フレーム呼び出される更新処理。
    /// 敵の移動と、射撃タイミングの管理を行います。
    /// </summary>
    void Update()
    {
        // 敵を毎フレーム下方向へ移動させます。
        // transform.Translate: オブジェクトを現在の位置から指定したベクトル分だけ移動させます。
        // Vector3.down: 下方向のベクトル (0, -1, 0)
        // Time.deltaTime: 前のフレームから今のフレームまでの経過時間（秒）。
        // これを掛けることで、パソコンの性能（フレームレート）に関わらず一定の速度で動くようになります。
        transform.Translate(Vector3.down * speed * Time.deltaTime);

        // ゲーム開始から一定時間（shootingStartTime）が経過したら、弾を撃てるようにします。
        if (!canShoot && GameManager.instance.timeElapsed >= shootingStartTime)
        {
            canShoot = true;

            // 敵が一斉に撃ってこないよう、最初の発射タイミングをランダムにずらします。
            // Random.Range(min, max): 指定範囲内のランダムな数値を返します。
            nextFireTime = Time.time + Random.Range(2f, 2f + fireRate);
        }

        // 射撃可能で、かつ次の発射時間を過ぎていれば発射します。
        // Time.time: ゲーム開始からの経過時間。
        if (canShoot && Time.time > nextFireTime)
        {
            Shoot();
            nextFireTime = Time.time + fireRate; // 次回の発射時間を設定（現在時刻 + 間隔）
        }
    }

    /// <summary>
    /// 全てのUpdate処理が終わった後に呼ばれます。
    /// 敵本体が回転していても、HPバーは常に水平かつ正しい位置に表示されるように調整します。
    /// </summary>
    void LateUpdate()
    {
        if (hpBarTransform != null && hpBarTransform.gameObject.activeSelf)
        {
            // 回転をリセット（常に水平）
            // Quaternion.identity: 「回転していない」状態を表す値です (0, 0, 0)。
            hpBarTransform.rotation = Quaternion.identity;
            // 位置をワールド座標で再設定（敵の真上 + 左寄せオフセット）
            // Vector3.up, Vector3.right などの方向ベクトルを使って、敵の位置からの相対座標を計算しています。
            hpBarTransform.position = transform.position + Vector3.up * hpBarYOffset + Vector3.right * hpBarXOffset;
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

        // 弾の発射角度（回転）を格納する変数
        Quaternion rotation;

        // 自機狙い（aimingStartTime経過後）の場合
        if (playerTransform != null && GameManager.instance.timeElapsed >= aimingStartTime)
        {
            // プレイヤーへの方向ベクトルを計算（相手の位置 - 自分の位置）
            Vector2 directionToPlayer = playerTransform.position - transform.position;

            // 方向ベクトルから角度（ラジアン）を計算し、度数法（デグリー）に変換します。
            // Mathf.Atan2(y, x): ベクトルのX, Y成分から角度を求めます。
            // -90f: スプライトの元々の向き（上向き）に合わせて補正しています。
            float angle = Mathf.Atan2(directionToPlayer.y, directionToPlayer.x) * Mathf.Rad2Deg - 90f;

            // 計算した角度から回転情報（Quaternion）を作成します。
            rotation = Quaternion.Euler(0, 0, angle);
        }
        else
        {
            // 自機狙いではない場合は、Startで決定した固定方向を使用します。
            rotation = fixedRotation;
        }

        // プレハブ（設計図）から弾の実体を生成します。
        // Instantiate(original, position, rotation): オブジェクトを生成するUnityの重要関数です。
        GameObject bullet = Instantiate(GameManager.instance.enemyBulletPrefab, transform.position, rotation);

        // 難易度レベルの取得
        int difficultyLevel = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);

        // 生成した弾についている制御スクリプトを取得し、速度を設定します。
        EnemyBulletController bulletController = bullet.GetComponent<EnemyBulletController>();
        if (bulletController != null)
        {
            // 通常弾なので少し遅めに設定 + レベルごとに0.1f加速 (Lv0:3.0f -> Lv10:4.0f)
            bulletController.speed = bulletSpeedBase + (difficultyLevel * 0.1f);

            // 速度変化の設定を適用
            // Spawnerから受け取った設定（減速開始時間や減速率）を、生成した弾のコントローラーに渡します。
            if (bulletUseSpeedVariation)
            {
                bulletController.useSpeedVariation = true;
                bulletController.speedVariationDelay = bulletDecelDelay;
                bulletController.minSpeed = bulletMinSpeed;
                bulletController.decelerationRate = bulletDecelerationRate;
            }
        }

        // 効果音を再生します。
        // ?. (Null条件演算子): GameManager.instance が null でない場合のみ実行します。
        GameManager.instance?.PlayEnemyShootSound();
    }

    /// <summary>
    /// 生成直後から即座に射撃を開始させます（斜め移動の敵などで使用）。
    /// </summary>
    // Spawner側からこのメソッドを呼ぶことで、出現アニメーションを待たずに攻撃させることができます。
    public void EnableShootingImmediately()
    {
        canShoot = true;
        nextFireTime = Time.time; // 待ち時間なしで即発射
    }

    /// <summary>
    /// ダメージを受けた際の処理（IDamageableインターフェースの実装）。
    /// HPを減らし、0以下になったら撃破処理を行います。
    /// </summary>
    public void TakeDamage(int damage)
    {
        // 画面外（出現直後など）にいる場合はダメージを受けない
        // Y座標が境界値を超えているかチェックします。
        if (transform.position.y > visibleYLimit || transform.position.y < -visibleYLimit)
        {
            return;
        }

        currentHP -= damage;

        // まだ生きている場合、ダメージを受けたことを視覚的に伝えます。
        if (currentHP > 0)
        {
            // コルーチン（時間を扱う処理）を開始して、一瞬だけ白く光らせます。
            StartCoroutine(FlashWhite());
        }

        // HPバーが表示されている場合、長さを更新します。
        if (hpBarTransform != null && maxHP > 1)
        {
            // 現在のHP割合を計算 (例: 2/3 = 0.66...)
            float hpRatio = (float)currentHP / (float)maxHP;

            // 1. 横幅（Scale X）を割合に合わせて縮めます。
            Vector3 newScale = hpBarTransform.localScale;
            newScale.x = hpBarOriginalScaleX * hpRatio;
            hpBarTransform.localScale = newScale;

            // 2. 位置を調整します。
            // UnityのScale縮小は「中心に向かって」行われるため、そのままだと両端が縮んでしまいます。
            // 「縮んだ長さの半分」だけ左に移動させることで、見た目上「左端が固定されている」ように見せます。
            var barSr = hpBarTransform.GetComponent<SpriteRenderer>();
            if (barSr != null)
            {
                // Spriteの実際の幅を使って正確に補正
                float currentWidth = barSr.bounds.size.x;
                float widthDiff = hpBarOriginalWidth - currentWidth;
                hpBarXOffset = hpBarOriginalLocalPosition.x - widthDiff * 0.5f;
            }
            else
            {
                float widthDiff = hpBarOriginalScaleX - newScale.x;
                hpBarXOffset = hpBarOriginalLocalPosition.x - widthDiff * 0.5f;
            }
        }

        // HPが0以下になったら死亡処理を行います。
        if (currentHP <= 0)
        {
            isDead = true;
            // 撃破されたことを報告
            if (formationId != -1) EnemySpawner.instance?.ReportEnemyDespawn(formationId, true);

            GameManager.instance.TriggerScoreEvent(scoreValue, ""); // 計算済みスコアを加算（ポップアップ表示）
            GameManager.instance.IncrementEnemiesDefeated(); //撃破数カウント

            // 死亡エフェクト（グリッチノイズ）を生成します。
            if (deathEffectPrefab != null)
            {
                Instantiate(deathEffectPrefab, transform.position, Quaternion.identity);
            }

            // パワーアップアイテムのドロップ判定 (例: 20%の確率)
            // Random.value: 0.0 から 1.0 の間のランダムな数値を返します。
            if (powerUpItemPrefab != null && Random.value <= 0.2f)
            {
                Instantiate(powerUpItemPrefab, transform.position, Quaternion.identity);
            }

            // 自分自身をゲームから削除します。
            Destroy(gameObject);
        }
    }

    // オブジェクトが破棄される時に呼ばれる
    void OnDestroy()
    {
        // まだ死んでいない（HP>0）のに削除された＝画面外へ逃げた、またはシーン遷移
        // シーン遷移でなければ「逃走」として報告する
        if (!isDead && formationId != -1 && EnemySpawner.instance != null)
        {
            EnemySpawner.instance.ReportEnemyDespawn(formationId, false);
        }
    }

    /// <summary>
    /// ダメージを受けた瞬間に白く光らせるコルーチン。
    /// コルーチンを使うと、処理を一時停止（待機）させることができます。
    /// </summary>
    private IEnumerator FlashWhite()
    {
        if (spriteRenderer != null)
        {
            spriteRenderer.color = Color.white; // 色を白に変更

            // 0.05秒間、ここで処理を中断して待ちます。
            // これにより「一瞬光る」演出になります。
            yield return new WaitForSeconds(0.05f);

            spriteRenderer.color = originalColor; // 元の色（赤）に戻す
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
            // 相手から IDamageable インターフェース（ダメージを受けられる機能）を取得します。
            // TryGetComponent: コンポーネントがあれば取得して true を返し、なければ false を返します。
            // out var player: 取得できた場合に、その中身を入れる変数をここで宣言しています。
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
        // 相手が「誘爆可能なオブジェクト」かどうかをインターフェースで判定します。
        // TryGetComponent: 相手が IChainExplodable を実装していれば true を返し、取得します。
        // これにより、タグが "Enemy" でなくても（例: 設置ギミック等）、インターフェースさえあれば誘爆できるようになります。
        if (other.TryGetComponent<IChainExplodable>(out var explodable))
        {
            // 出現直後（0.5秒間）は誘爆しない（スポーン時の事故防止）
            if (Time.time < spawnTime + 0.5f) return;

            // 画面外（上下左右）にいる場合は誘爆しない
            // HUDの裏側などで誘爆しないようにX座標もチェックします
            if (transform.position.y > visibleYLimit || transform.position.y < -visibleYLimit ||
                transform.position.x > visibleXLimit || transform.position.x < -visibleXLimit)
            {
                return;
            }

            // 相手も誘爆可能なら、自分自身の誘爆処理を実行します。
            // ※相手側の OnTriggerEnter2D も同時に呼ばれるため、相手も自分の処理で爆発します。
            OnChainExplosion();
        }
    }

    /// <summary>
    /// IChainExplodableの実装。誘爆時の処理を行います。
    /// 全方位に弾をばら撒き、ボーナススコアを加算して自滅します。
    /// </summary>
    public void OnChainExplosion()
    {
        // 既に処理中なら何もしない（多重衝突防止）
        if (isSelfDestructing) return;
        isSelfDestructing = true;

        // 難易度レベルの取得
        int difficultyLevel = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);

        // レベル上昇の上限を設定（HPカンスト等に合わせてLv30で打ち止め）
        int cappedLevel = Mathf.Min(difficultyLevel, 30);

        // レベルに応じて弾数と速度を強化
        // 弾数: 8 -> 10 -> 12 ... (上限: 68発)
        int bulletCount = 8 + (cappedLevel * 2);
        // 速度: 10 -> 10.5 -> 11 ... (上限: 25f)
        float bulletSpeed = 10f + (cappedLevel * 0.5f);

        // 8方向に弾を発射するループ
        for (int i = 0; i < bulletCount; ++i)
        {
            // 均等な角度で発射
            float angle = (360f / bulletCount) * i;
            // 角度から回転情報を作成
            Quaternion rotation = Quaternion.Euler(0, 0, angle);
            //Debug.Log("Spawning bullet at angle: " + angle);

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
