using UnityEngine;

/// <summary>
/// 取得するとプレイヤーの武器経験値を増やすアイテム。
/// </summary>
public class PowerUpItem : MonoBehaviour, ICollectable
{
    public float fallSpeed = 1f;
    public int expValue = 1; // このアイテムで増える経験値量

    [Header("Magnet Settings")]
    public float magnetDistance = 2.0f; // 吸着を開始する距離
    public float magnetSpeed = 12.0f;   // 吸着時の移動速度

    private Transform playerTransform;

    // 二重取得防止用フラグ
    public bool IsCollected { get; private set; } = false;

    void Start()
    {
        // アイテムの色をHUDの経験値バー(#facc15)と統一
        var sr = GetComponent<SpriteRenderer>();
        if (sr != null)
        {
            if (ColorUtility.TryParseHtmlString("#facc15", out Color color)) sr.color = color;
        }

        // プレイヤーの参照を取得
        if (PlayerController.instance != null)
        {
            playerTransform = PlayerController.instance.transform;
        }
    }

    void Update()
    {
        // 取得済みの場合は移動処理を行わない（Destroy待ち）
        if (IsCollected) return;

        // プレイヤーが再生成された場合などに対応するため、nullなら再取得を試みる
        if (playerTransform == null && PlayerController.instance != null)
        {
            playerTransform = PlayerController.instance.transform;
        }

        bool isMagnetActive = false;

        // プレイヤーが存在し、かつアクティブな場合のみ吸着判定
        if (playerTransform != null && playerTransform.gameObject.activeSelf)
        {
            // プレイヤーとの距離を計算します。
            float distance = Vector3.Distance(transform.position, playerTransform.position);
            // 一定距離（magnetDistance）以内なら吸着モードをONにします。
            if (distance <= magnetDistance)
            {
                isMagnetActive = true;
            }
        }

        if (isMagnetActive)
        {
            // プレイヤーに向かって高速移動（吸着）
            // Vector3.MoveTowards: 現在地から目標地点へ、指定した速度で移動させた新しい位置を返します。
            transform.position = Vector3.MoveTowards(transform.position, playerTransform.position, magnetSpeed * Time.deltaTime);
        }
        else
        {
            // 通常の落下移動
            // Transform.Translate: 指定したベクトル分だけ移動させます。
            transform.Translate(Vector3.down * fallSpeed * Time.deltaTime, Space.World);
        }

        // 回転演出（ひし形をくるくる回す）
        transform.Rotate(0, 0, 90f * Time.deltaTime);

        // 画面外に出たら消す（Y座標 -6以下）
        // 吸着中は画面外に出ても消さない（プレイヤーが画面端にいる場合など）
        if (!isMagnetActive && transform.position.y < -6f)
        {
            Destroy(gameObject);
        }
    }

    /// <summary>
    /// ICollectableの実装。プレイヤーに拾われた時の処理。
    /// </summary>
    public void OnCollected(PlayerController player)
    {
        if (IsCollected) return;
        IsCollected = true;

        player.AddExp(expValue); // プレイヤーに経験値を与える
        Destroy(gameObject);     // 自分自身を消滅させる
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            // プレイヤー側の処理はPlayerControllerで行うため、
            // ここでは自分自身を消す処理のみ行うか、
            // あるいはPlayerController側でDestroyしてもらう。
            // 今回はPlayerControllerのOnTriggerEnter2Dで検知して処理するため、
            // ここには衝突処理を書かなくてもOKですが、念のため。
        }
    }
}
