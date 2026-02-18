using UnityEngine;
using System.Collections;

/// <summary>
/// ジャマー敵（妨害タイプ）を制御するクラス。
/// 攻撃は行わず、パルス機雷を設置します。死亡時にパルスを放出して自爆します。
/// </summary>
public class JammerEnemyController : MonoBehaviour, IDamageable, IChainExplodable
{
    public float speed = 1.5f;
    public int hp = 3;
    private int maxHP; // 最大HPを記憶
    public int baseScore = 300; // 基礎点 (50 -> 300: 追尾敵と同等に調整)
    private int scoreValue; // レベル補正後のスコア

    [Header("Jammer Settings")]
    public GameObject minePrefab; // 機雷のプレハブ
    public GameObject pulseExplosionPrefab; // 死亡時に出すパルスのプレハブ
    public float mineInterval = 2.0f; // 機雷を置く間隔

    // 難易度による自動調整を行うかどうか（Spawnerから特殊設定する場合はfalseにする）
    // [HideInInspector]: Unityのエディタ（Inspector）上でこの変数を非表示にします。
    // public変数として外部からアクセス可能にしつつ、手動での誤設定を防ぎたい場合に使います。
    [HideInInspector] public bool useDifficultyScaling = true;
    [HideInInspector] public float initialDelayMin = 1.0f; // 初回設置までの最小遅延

    private float nextMineTime;
    private SpriteRenderer spriteRenderer;
    private Color originalColor;

    // 画面外判定用
    private float visibleYLimit = 6.0f;

    [Header("UI")]
    public Transform hpBarTransform; // HPバーのTransform
    private Vector3 hpBarOriginalLocalPosition;
    private float hpBarOriginalScaleX;
    private float hpBarXOffset;
    private float hpBarYOffset;
    private float hpBarOriginalWidth;

    private bool isSelfDestructing = false; // 誘爆処理中フラグ
    private float currentExplosionRadius = 5.0f; // パルスの爆発半径

    void Start()
    {
        // このオブジェクトに "Enemy" タグを設定します。
        // これにより、プレイヤーの弾や他の敵（誘爆判定）から「敵である」と認識されるようになります。
        gameObject.tag = "Enemy";

        // 難易度レベルの計算 (開始時:0 -> 90秒:1 -> 180秒:2 ...)
        // Mathf.FloorToInt: 小数点以下を切り捨てて整数にします。
        // 例: 45秒 / 90 = 0.5 -> 0 (基礎点のみ加算)
        int difficultyLevel = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);

        // 難易度に応じて強化
        if (useDifficultyScaling)
        {

            // HP増加。ジャマー敵は元々硬いですが、それでも上限(100)を設けます。
            // プレイヤーの火力インフレに対応するため、かなり高く設定します。
            maxHP = Mathf.Min(100, hp + difficultyLevel);
            hp = maxHP;

            // 機雷設置間隔の短縮 (初期2.0秒 -> レベルごとに0.15秒短縮 -> 下限0.8秒)
            // Mathf.Max: 引数の中で大きい方の値を返します。これにより、0.8秒より短くならないように制限しています。
            mineInterval = Mathf.Max(0.8f, 2.0f - (difficultyLevel * 0.15f));

            // 移動速度の上昇: レベルごとに 0.1f ずつ速くする（上限 3.5f）
            // Mathf.Min: 2つの値のうち小さい方を返します。これにより、速度が3.5fを超えないように制限（キャップ）しています。
            speed = Mathf.Min(3.5f, speed + (difficultyLevel * 0.1f));
        }
        else
        {
            maxHP = hp; // 設定値をそのまま使う
        }

        // スコア計算: 基礎点 + (レベル * 100)
        scoreValue = baseScore + (difficultyLevel * 100);

        // パルス範囲の計算: レベルごとに0.5f広げる
        // 画面全体を覆って回避不能（詰み）にならないよう、上限を7.5fに設定します。
        // Mathf.Min: 2つの値のうち小さい方を返します。
        currentExplosionRadius = Mathf.Min(7.5f, 5.0f + (difficultyLevel * 0.5f));

        // GetComponent<T>: このオブジェクトにアタッチされている指定のコンポーネントを取得します。
        spriteRenderer = GetComponent<SpriteRenderer>();
        if (spriteRenderer != null) originalColor = spriteRenderer.color;

        // 最初の機雷設置タイミングをランダムに
        // Time.time: ゲーム開始からの経過時間（秒）。
        // Random.Range(min, max): 指定範囲内のランダムな数値を返します。
        // これにより、出現直後に一斉に機雷を置くのを防ぎ、タイミングをばらけさせます。
        // mineIntervalが短縮されてinitialDelayMinを下回る可能性があるため、Maxで調整
        float maxDelay = Mathf.Max(initialDelayMin, mineInterval);
        nextMineTime = Time.time + Random.Range(initialDelayMin, maxDelay);

        // 画面外判定の計算
        if (Camera.main != null)
        {
            // EnemyControllerと同様のマージン計算に変更
            // bounds.extents.y: スプライトの高さの半分（中心から端までの距離）。
            float margin = spriteRenderer != null ? spriteRenderer.bounds.extents.y - 0.01f : 0.5f;
            visibleYLimit = Camera.main.orthographicSize + margin;
        }

        // HPバーの初期化
        if (hpBarTransform != null)
        {
            // 初期状態（位置、スケール）を記録しておき、ダメージを受けた時の計算基準にします。
            hpBarOriginalLocalPosition = hpBarTransform.localPosition;
            hpBarOriginalScaleX = hpBarTransform.localScale.x;

            if (spriteRenderer != null)
            {
                // スプライトの高さに合わせて、HPバーを頭上に配置します。
                // Vector3.up * ... でY座標を調整しています。
                hpBarYOffset = spriteRenderer.bounds.extents.y + 0.2f;
            }
            else
            {
                hpBarYOffset = hpBarOriginalLocalPosition.y;
            }
            hpBarXOffset = hpBarOriginalLocalPosition.x;

            var barSr = hpBarTransform.GetComponent<SpriteRenderer>();
            if (barSr != null)
            {
                hpBarOriginalWidth = barSr.bounds.size.x;
            }
        }

        // HPが1以下の場合は非表示
        if (maxHP <= 1 && hpBarTransform != null)
        {
            hpBarTransform.gameObject.SetActive(false);
        }

        // 物理設定の正規化 (EnemyControllerと同様)
        // Collider2D: 当たり判定を行うコンポーネント。
        var col = GetComponent<Collider2D>();
        // isTrigger = true: 物理的な衝突（跳ね返り）はせず、通過のみを検知する設定にします。
        if (col != null) col.isTrigger = true;

        // Rigidbody2D: 物理挙動（重力や速度）を管理するコンポーネント。
        var rb = GetComponent<Rigidbody2D>();
        // gravityScale = 0f: 重力の影響を受けないようにします（勝手に落ちていかないように）。
        if (rb != null) rb.gravityScale = 0f;
    }

    void Update()
    {
        // 下に移動（少しゆっくり）
        // transform.Translate: 現在位置から指定したベクトル分だけ移動させます。
        // Time.deltaTime: 前のフレームからの経過時間。これを掛けることで、PCの性能に関わらず一定速度で動きます。
        transform.Translate(Vector3.down * speed * Time.deltaTime);

        // 機雷設置
        if (Time.time > nextMineTime)
        {
            PlaceMine();
            nextMineTime = Time.time + mineInterval;
        }

        // 画面外に出たら消滅
        if (transform.position.y < -visibleYLimit)
        {
            Destroy(gameObject);
        }
    }

    void LateUpdate()
    {
        // HPバーの位置調整（敵が動いてもバーは水平を保つ）
        // LateUpdate: 全てのUpdate処理が終わった後に呼ばれます。移動後の最終的な位置に合わせてUIを調整するのに適しています。
        if (hpBarTransform != null && hpBarTransform.gameObject.activeSelf)
        {
            hpBarTransform.rotation = Quaternion.identity;
            hpBarTransform.position = transform.position + Vector3.up * hpBarYOffset + Vector3.right * hpBarXOffset;
        }
    }

    void PlaceMine()
    {
        // Instantiate: プレハブ（設計図）から新しいゲームオブジェクト（実体）を生成します。
        if (minePrefab != null)
        {
            GameObject mine = Instantiate(minePrefab, transform.position, Quaternion.identity);
            // 機雷に爆発範囲を伝える
            var pm = mine.GetComponent<PulseMineController>();
            if (pm != null)
            {
                pm.explosionRadius = currentExplosionRadius;
            }
        }
    }

    public void TakeDamage(int damage)
    {
        // 画面外（上）にいる間は無敵
        if (transform.position.y > visibleYLimit || transform.position.y < -visibleYLimit) return;

        hp -= damage;
        StartCoroutine(FlashWhite());

        // HPバー更新
        if (hpBarTransform != null && maxHP > 1)
        {
            // 現在のHP割合を計算 (例: 2/3 = 0.66...)
            float hpRatio = (float)hp / (float)maxHP;

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

        if (hp <= 0)
        {
            Die();
        }
    }

    void Die()
    {
        // スコア加算と撃破数カウント
        GameManager.instance.TriggerScoreEvent(scoreValue, ""); // ポップアップ表示
        GameManager.instance.IncrementEnemiesDefeated();

        // 死亡時にパルス放出（自爆）
        if (pulseExplosionPrefab != null)
        {
            GameObject explosion = Instantiate(pulseExplosionPrefab, transform.position, Quaternion.identity);
            // パルスのサイズを設定
            var pe = explosion.GetComponent<PulseExplosionController>();
            if (pe != null)
            {
                pe.maxRadius = currentExplosionRadius;
            }
        }

        // 通常の死亡エフェクトも出す（あれば）
        // Instantiate(deathEffect, ...); 

        // 自分自身を削除
        Destroy(gameObject);
    }

    // コルーチン: 時間の経過を待ったり、フレームをまたいで処理を継続できる特別な関数です。
    private IEnumerator FlashWhite()
    {
        if (spriteRenderer != null)
        {
            spriteRenderer.color = Color.white;
            // 0.05秒間待機します。
            yield return new WaitForSeconds(0.05f);
            spriteRenderer.color = originalColor;
        }
    }

    // OnTriggerEnter2D: 他のCollider（IsTrigger=true）と重なった瞬間に呼ばれます。
    // 衝突相手の情報は 'other' 引数に入っています。
    private void OnTriggerEnter2D(Collider2D other)
    {
        // プレイヤーとの接触
        if (other.CompareTag("Player"))
        {
            if (other.TryGetComponent<IDamageable>(out var player))
            {
                player.TakeDamage(1);
            }
        }
        // 敵同士の接触（誘爆）
        // インターフェースによる誘爆判定に変更
        else if (other.TryGetComponent<IChainExplodable>(out var explodable))
        {
            // 画面外では誘爆しない
            if (transform.position.y > visibleYLimit || transform.position.y < -visibleYLimit) return;

            // 自分自身の誘爆処理を実行
            OnChainExplosion();
        }
    }

    // IChainExplodableの実装。誘爆時の処理を行います。
    public void OnChainExplosion()
    {
        if (isSelfDestructing) return;
        isSelfDestructing = true;

        // ジャマー敵は誘爆時に弾ではなくパルスを発生させる
        // ?. (Null条件演算子): GameManager.instance が null でない場合のみ実行します。
        GameManager.instance?.PlayEnemyShootSound(); // パルス発生音として使用
        // 誘爆ボーナス: 本来のスコア + 250点 (2体で500点)
        GameManager.instance.TriggerScoreEvent(scoreValue + 250, "CHAIN");

        if (pulseExplosionPrefab != null)
        {
            GameObject explosion = Instantiate(pulseExplosionPrefab, transform.position, Quaternion.identity);
            // パルスのサイズを設定
            var pe = explosion.GetComponent<PulseExplosionController>();
            if (pe != null)
            {
                pe.maxRadius = currentExplosionRadius;
            }
        }
        Destroy(gameObject);
    }
}
