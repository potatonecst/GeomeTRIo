using UnityEngine;
using System.Collections;

/// <summary>
/// 全ての敵キャラクターの基底クラス。
/// 共通のステータス管理、ダメージ処理、誘爆処理などを実装します。
/// </summary>
public class EnemyBase : MonoBehaviour, IDamageable, IChainExplodable
{
    [Header("Base Stats")]
    public float speed = 1f;
    public int baseHP = 1;
    protected int currentHP;
    protected int maxHP;

    [Header("Score")]
    public int baseScore = 100;
    [HideInInspector] public float scoreMultiplier = 1.0f;
    protected int scoreValue;

    [Header("Formation")]
    [HideInInspector] public int formationId = -1; // -1は編隊なし

    [Header("Effects")]
    public GameObject deathEffectPrefab;
    public GameObject powerUpItemPrefab;

    [Header("UI")]
    public Transform hpBarTransform;
    protected Vector3 hpBarOriginalLocalPosition;
    protected float hpBarOriginalScaleX;
    protected float hpBarXOffset;
    protected float hpBarYOffset;
    protected float hpBarOriginalWidth;

    protected float spawnTime;
    protected float visibleYLimit = 5.5f;
    protected float visibleXLimit = 4.5f;

    protected SpriteRenderer spriteRenderer;
    protected Color originalColor;
    protected bool isSelfDestructing = false;
    protected bool isDead = false;

    protected virtual void Start()
    {
        // 敵タグを確実に設定（プレハブでの設定漏れ防止）
        // これがないとBulletControllerのCompareTag("Enemy")に引っかからず、ダメージを受けません。
        gameObject.tag = "Enemy";

        spawnTime = Time.time;
        int difficultyLevel = GetDifficultyLevel();

        // デフォルトのステータス計算 (子クラスで上書き可能)
        InitStats(difficultyLevel);

        // コンポーネント取得
        spriteRenderer = GetComponent<SpriteRenderer>();
        if (spriteRenderer != null) originalColor = spriteRenderer.color;

        // HPバー初期化
        InitHPBar();

        // 画面外判定の初期化
        InitScreenBounds();

        // 物理設定
        InitPhysics();
    }

    protected int GetDifficultyLevel()
    {
        return Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);
    }

    protected virtual void InitStats(int difficultyLevel)
    {
        // デフォルト: HP上限30, 速度上限3.0
        currentHP = Mathf.Min(30, baseHP + difficultyLevel);
        maxHP = currentHP;
        speed = Mathf.Min(3.0f, speed + (difficultyLevel * 0.1f));
        scoreValue = Mathf.RoundToInt((baseScore + (difficultyLevel * 100)) * scoreMultiplier);
    }

    protected virtual void InitHPBar()
    {
        if (hpBarTransform != null)
        {
            hpBarOriginalLocalPosition = hpBarTransform.localPosition;
            hpBarOriginalScaleX = hpBarTransform.localScale.x;
            hpBarXOffset = hpBarOriginalLocalPosition.x;

            if (spriteRenderer != null)
            {
                hpBarYOffset = spriteRenderer.bounds.extents.y + 0.2f;
            }
            else
            {
                hpBarYOffset = hpBarOriginalLocalPosition.y;
            }

            var barSr = hpBarTransform.GetComponent<SpriteRenderer>();
            if (barSr != null) hpBarOriginalWidth = barSr.bounds.size.x;

            if (maxHP <= 1) hpBarTransform.gameObject.SetActive(false);
        }
    }

    protected virtual void InitScreenBounds()
    {
        if (Camera.main != null)
        {
            float margin = spriteRenderer != null ? spriteRenderer.bounds.extents.y - 0.01f : 0.5f;
            visibleYLimit = Camera.main.orthographicSize + margin;
        }
    }

    protected virtual void InitPhysics()
    {
        var col = GetComponent<Collider2D>();
        if (col != null) col.isTrigger = true;
        var rb = GetComponent<Rigidbody2D>();
        if (rb != null) rb.gravityScale = 0f;
    }

    protected virtual void Update()
    {
        // 基本的な移動（下方向）
        transform.Translate(Vector3.down * speed * Time.deltaTime);
    }

    protected virtual void LateUpdate()
    {
        if (hpBarTransform != null && hpBarTransform.gameObject.activeSelf)
        {
            hpBarTransform.rotation = Quaternion.identity;
            hpBarTransform.position = transform.position + Vector3.up * hpBarYOffset + Vector3.right * hpBarXOffset;
        }
    }

    public virtual void TakeDamage(int damage)
    {
        if (IsOutOfBounds()) return;

        currentHP -= damage;

        // 与ダメージを加算 (統計情報用)
        // ?. (Null条件演算子): GameManager.instance が null でない場合のみ、右側のメソッドを実行します。
        // シーン遷移中などでGameManagerが存在しない場合にエラーになるのを防ぎます。
        GameManager.instance?.IncrementDamageDealt(damage);

        if (currentHP > 0)
        {
            StartCoroutine(FlashWhite());
        }

        UpdateHPBar();

        if (currentHP <= 0)
        {
            Die();
        }
    }

    protected bool IsOutOfBounds()
    {
        return transform.position.y > visibleYLimit || transform.position.y < -visibleYLimit ||
               transform.position.x > visibleXLimit || transform.position.x < -visibleXLimit;
    }

    protected void UpdateHPBar()
    {
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
                hpBarXOffset = hpBarOriginalLocalPosition.x - widthDiff * 0.5f;
            }
            else
            {
                float widthDiff = hpBarOriginalScaleX - newScale.x;
                hpBarXOffset = hpBarOriginalLocalPosition.x - widthDiff * 0.5f;
            }
        }
    }

    protected virtual void Die()
    {
        isDead = true;
        if (formationId != -1) EnemySpawner.instance?.ReportEnemyDespawn(formationId, true);

        GameManager.instance.TriggerScoreEvent(scoreValue, "");
        GameManager.instance.IncrementEnemiesDefeated();

        if (deathEffectPrefab != null)
        {
            Instantiate(deathEffectPrefab, transform.position, Quaternion.identity);
        }

        // ドロップ判定 (デフォルト20%)
        if (powerUpItemPrefab != null && Random.value <= 0.2f)
        {
            Instantiate(powerUpItemPrefab, transform.position, Quaternion.identity);
        }

        Destroy(gameObject);
    }

    protected virtual void OnDestroy()
    {
        if (!isDead && formationId != -1 && EnemySpawner.instance != null)
        {
            EnemySpawner.instance.ReportEnemyDespawn(formationId, false);
        }
    }

    protected IEnumerator FlashWhite()
    {
        if (spriteRenderer != null)
        {
            spriteRenderer.color = Color.white;
            yield return new WaitForSeconds(0.05f);
            spriteRenderer.color = originalColor;
        }
    }

    protected virtual void OnTriggerStay2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            if (other.TryGetComponent<IDamageable>(out var player))
            {
                player.TakeDamage(1);
            }
        }
    }

    protected virtual void OnTriggerEnter2D(Collider2D other)
    {
        if (other.TryGetComponent<IChainExplodable>(out var explodable))
        {
            if (Time.time < spawnTime + 0.5f) return;
            if (IsOutOfBounds()) return;

            OnChainExplosion();
        }
    }

    public virtual void OnChainExplosion()
    {
        if (isSelfDestructing) return;
        isSelfDestructing = true;

        int difficultyLevel = GetDifficultyLevel();
        int cappedLevel = Mathf.Min(difficultyLevel, 30);
        int bulletCount = 8 + (cappedLevel * 2);
        float bulletSpeed = 10f + (cappedLevel * 0.5f);

        for (int i = 0; i < bulletCount; ++i)
        {
            float angle = (360f / bulletCount) * i;
            Quaternion rotation = Quaternion.Euler(0, 0, angle);
            GameObject bullet = Instantiate(GameManager.instance.enemyBulletPrefab, transform.position, rotation);
            var bc = bullet.GetComponent<EnemyBulletController>();
            if (bc != null)
            {
                bc.speed = bulletSpeed;
                bc.useSpeedVariation = true;
                bc.speedVariationDelay = 0.1f;
                bc.minSpeed = 4.0f;
            }
        }
        GameManager.instance?.PlayEnemyShootSound();
        GameManager.instance.TriggerScoreEvent(scoreValue + 250, "CHAIN");

        if (deathEffectPrefab != null)
        {
            Instantiate(deathEffectPrefab, transform.position, Quaternion.identity);
        }
        Destroy(gameObject);
    }
}
