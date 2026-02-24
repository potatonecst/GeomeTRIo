using UnityEngine;
using System.Collections;

/// <summary>
/// 通常の敵キャラクター（直進タイプ）を制御するクラス。
/// 画面上部から出現し、下方向へ移動しながら、一定間隔で弾を発射します。
/// </summary>
public class EnemyController : EnemyBase
{
    //プレイヤー
    private GameObject playerObject;

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

    // 自機狙いモードになる前の固定射撃方向
    private Quaternion fixedRotation;

    // 難易度による連射速度の自動調整を行うかどうか
    [HideInInspector] public bool useFireRateScaling = true;

    /// <summary>
    /// 初期化処理。
    /// ゲームの経過時間に応じてHPを強化し、プレイヤーオブジェクトの参照を取得します。
    /// </summary>
    protected override void Start()
    {
        base.Start(); // 基底クラスの初期化（HP, Speed, Score, UIなど）

        int difficultyLevel = GetDifficultyLevel();

        if (useFireRateScaling)
        {
            // 難易度調整: 90秒ごとのレベルアップに合わせて段階的に連射速度を上げる
            // 初期: 1.5秒 -> Lv1: 1.4秒 -> ... -> Lv10: 0.5秒 (下限)
            // Mathf.Max: 2つの値のうち大きい方を返します。これにより、間隔が0.5秒より短くならないようにしています。
            fireRate = Mathf.Max(0.5f, 1.5f - (difficultyLevel * 0.1f));
        }

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
    }

    /// <summary>
    /// 毎フレーム呼び出される更新処理。
    /// 敵の移動と、射撃タイミングの管理を行います。
    /// </summary>
    protected override void Update()
    {
        base.Update(); // 基本的な移動（下方向）

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

    // 誘爆時の処理
    // override: 親クラス(EnemyBase)のOnChainExplosionメソッドを上書きします。
    public override void OnChainExplosion()
    {
        // 統計情報（誘爆撃破数）を加算
        // 親クラスの処理を呼ぶ前にカウントすることで、確実に記録します。
        GameManager.instance?.IncrementChainKills();
        base.OnChainExplosion();
    }
}
