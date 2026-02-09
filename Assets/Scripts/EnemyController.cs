using UnityEngine;
using System.Collections;

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
    private int maxHP; // 最大HPを記憶

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

    // 画面外判定用の境界値（初期値は5.5だが、Startでカメラに合わせて再計算する）
    private float visibleYLimit = 5.5f;

    /// <summary>
    /// 初期化処理。
    /// ゲームの経過時間に応じてHPを強化し、プレイヤーオブジェクトの参照を取得します。
    /// </summary>
    void Start()
    {
        // ゲームの経過時間に応じて敵を強化します。
        // GameManager.instance.timeElapsed: ゲーム開始からの経過時間（秒）
        // Mathf.FloorToInt: 小数点以下を切り捨てて整数にします（例: 1.9 -> 1）
        // 90秒経過するごとに HP が +1 されます。
        int additionalHP = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);
        currentHP = baseHP + additionalHP;
        maxHP = currentHP;

        // プレイヤーの位置を知るために、"Player" というタグがついたオブジェクトを探します。
        // GameObject.FindGameObjectWithTag: シーン全体から指定タグのオブジェクトを検索します（処理が重いのでStartで一度だけ行います）。
        playerObject = GameObject.FindGameObjectWithTag("Player");

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
            // orthographicSizeは画面の高さの半分です。これに少し余裕(0.5)を持たせます。
            // 敵のサイズ(0.5)の半分より少し小さい値(0.24)をマージンとして設定します。
            // これにより、敵が完全に画面外にいる間はダメージを受けなくなります。
            visibleYLimit = Camera.main.orthographicSize + 0.24f;
        }
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
            // まだ自機狙いではない場合は、真下（180度回転）に向けます。
            rotation = Quaternion.Euler(0, 0, 180f);
        }

        // プレハブ（設計図）から弾の実体を生成します。
        // Instantiate(original, position, rotation): オブジェクトを生成するUnityの重要関数です。
        GameObject bullet = Instantiate(GameManager.instance.enemyBulletPrefab, transform.position, rotation);

        // 生成した弾についている制御スクリプトを取得し、速度を設定します。
        EnemyBulletController bulletController = bullet.GetComponent<EnemyBulletController>();
        if (bulletController != null)
        {
            // 通常弾なので少し遅めに設定
            bulletController.speed = 3f;
        }

        // 効果音を再生します。
        // ?. (Null条件演算子): GameManager.instance が null でない場合のみ実行します。
        GameManager.instance?.PlayEnemyShootSound();
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
            float widthDiff = hpBarOriginalScaleX - newScale.x;
            Vector3 newPos = hpBarOriginalLocalPosition;
            newPos.x -= widthDiff * 0.5f;
            hpBarTransform.localPosition = newPos;
        }

        // HPが0以下になったら死亡処理を行います。
        if (currentHP <= 0)
        {
            GameManager.instance.AddScore(10); //10点加算
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
        // 敵同士がぶつかった場合（誘爆ギミック）
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
        // 8方向に弾を発射するループ
        for (int i = 0; i < 8; ++i)
        {
            // 45度ずつ角度をずらします (0, 45, 90, ... 315)
            float angle = 45f * i;
            // 角度から回転情報を作成
            Quaternion rotation = Quaternion.Euler(0, 0, angle);
            //Debug.Log("Spawning bullet at angle: " + angle);

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
