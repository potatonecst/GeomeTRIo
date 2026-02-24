using UnityEngine;
using System.Collections;

/// <summary>
/// パルス機雷を制御するクラス。
/// 設置後、一定時間点滅して警告し、その後爆発してパルスを生成します。
/// </summary>
public class PulseMineController : MonoBehaviour
{
    public float fuseTime = 3.0f; // 爆発までの時間
    public GameObject explosionPrefab; // パルス（PulseExplosion）のプレハブ
    [HideInInspector] public float explosionRadius = 5.0f; // 爆発半径（JammerEnemyから設定される）

    private SpriteRenderer spriteRenderer;
    private bool isExploded = false; // 二重爆発防止用フラグ

    void Start()
    {
        spriteRenderer = GetComponent<SpriteRenderer>();

        // 起爆時間をランダム化（±20%）して、予測しづらくする
        // これにより、プレイヤーが「リズム」で避けるのを防ぎ、緊張感を持たせます。
        fuseTime = Random.Range(fuseTime * 0.8f, fuseTime * 1.2f);

        StartCoroutine(DetonateSequence());
    }

    // コルーチン: 時間経過で処理を行うためのメソッド
    IEnumerator DetonateSequence()
    {
        float timer = 0f;
        float blinkInterval = 0.5f;

        // 爆発までのカウントダウン（点滅演出）
        // 指定された時間(fuseTime)が経過するまでループします。
        while (timer < fuseTime)
        {
            if (isExploded) yield break; // 既に接触で爆発していたら終了

            // 後半は点滅を速くする
            // 爆発が近づくにつれて間隔を短くし、危険を知らせます。
            if (timer > fuseTime * 0.7f) blinkInterval = 0.1f;
            else if (timer > fuseTime * 0.4f) blinkInterval = 0.25f;

            if (spriteRenderer != null)
            {
                // 色を反転させて点滅（紫 <-> 白）
                // 三項演算子 (条件 ? 真の値 : 偽の値) を使って色を切り替えています。
                spriteRenderer.color = spriteRenderer.color == Color.white ? new Color(0.6f, 0f, 1f) : Color.white;
            }

            // 指定時間待機してからループの先頭に戻ります。
            // yield return: コルーチンの処理を一時停止し、Unityに制御を返します。
            yield return new WaitForSeconds(blinkInterval);
            timer += blinkInterval;
        }

        Explode();
    }

    // プレイヤーが接触したら即爆発
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (isExploded) return;

        if (other.CompareTag("Player"))
        {
            Explode();
        }
    }

    // 爆発処理
    void Explode()
    {
        if (isExploded) return;
        isExploded = true;

        if (explosionPrefab != null)
        {
            GameObject explosion = Instantiate(explosionPrefab, transform.position, Quaternion.identity);
            // パルスのサイズを設定
            var pe = explosion.GetComponent<PulseExplosionController>();
            if (pe != null)
            {
                pe.maxRadius = explosionRadius;
            }
            // 爆発音を再生
            GameManager.instance?.PlayEnemyShootSound();
        }

        Destroy(gameObject);
    }
}
