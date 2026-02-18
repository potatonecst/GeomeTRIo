using UnityEngine;

/// <summary>
/// パルス（衝撃波）を制御するクラス。
/// 円形に拡大し、接触したプレイヤーにジャミング効果を与えます。
/// </summary>
[RequireComponent(typeof(SpriteRenderer))]
[RequireComponent(typeof(CircleCollider2D))]
public class PulseExplosionController : MonoBehaviour
{
    public float maxRadius = 5f; // 最大半径
    public float expansionSpeed = 15f; // 拡大速度
    public float jamDuration = 3f; // ジャミング効果時間
    [Range(0f, 1f)]
    public float initialAlpha = 0.6f; // 初期の透明度 (0.0:透明 ~ 1.0:不透明)

    private float currentRadius = 0.1f;
    private SpriteRenderer spriteRenderer;
    private CircleCollider2D circleCollider;

    void Start()
    {
        spriteRenderer = GetComponent<SpriteRenderer>();
        circleCollider = GetComponent<CircleCollider2D>();

        // 初期設定
        transform.localScale = Vector3.zero;
        circleCollider.isTrigger = true;

        // 色を紫に設定（プレハブで設定していない場合の保険）
        if (spriteRenderer != null)
        {
            spriteRenderer.color = new Color(0.6f, 0f, 1f, initialAlpha);
        }
    }

    void Update()
    {
        // 拡大処理
        if (currentRadius < maxRadius)
        {
            // 半径を時間経過で大きくします。
            currentRadius += expansionSpeed * Time.deltaTime;
            // スケール（大きさ）を更新します。Z軸は2Dなので1fのままにします。
            transform.localScale = new Vector3(currentRadius, currentRadius, 1f);

            // フェードアウト（大きくなるほど透明に）
            if (spriteRenderer != null)
            {
                // 現在の半径が最大半径に近づくにつれて、アルファ値（不透明度）を下げます。
                // 1.0f - (current / max) で 1.0(不透明) -> 0.0(透明) へと変化させます。
                float alpha = initialAlpha * (1.0f - (currentRadius / maxRadius));
                Color c = spriteRenderer.color;
                c.a = alpha;
                spriteRenderer.color = c;
            }
        }
        else
        {
            // 最大サイズに達したら消滅
            Destroy(gameObject);
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            if (other.TryGetComponent<PlayerController>(out var player))
            {
                // プレイヤーにジャミング効果を適用
                // PlayerController側のメソッドを呼び出して、射撃不可状態にします。
                player.ApplyWeaponJam(jamDuration);
            }
        }
    }
}
