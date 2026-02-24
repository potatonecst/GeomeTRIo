using UnityEngine;
using System.Collections;

/// <summary>
/// ジャマー敵（妨害タイプ）を制御するクラス。
/// 攻撃は行わず、パルス機雷を設置します。死亡時にパルスを放出して自爆します。
/// </summary>
public class JammerEnemyController : EnemyBase
{
    [Header("Jammer Settings")]
    public GameObject minePrefab; // 機雷のプレハブ
    public GameObject pulseExplosionPrefab; // 死亡時に出すパルスのプレハブ
    public float mineInterval = 2.0f; // 機雷を置く間隔
    public float contactJamDuration = 3.0f; // 接触時のジャミング時間

    // 難易度による自動調整を行うかどうか（Spawnerから特殊設定する場合はfalseにする）
    // [HideInInspector]: Unityのエディタ（Inspector）上でこの変数を非表示にします。
    // public変数として外部からアクセス可能にしつつ、手動での誤設定を防ぎたい場合に使います。
    [HideInInspector] public bool useDifficultyScaling = true;
    [HideInInspector] public float initialDelayMin = 1.0f; // 初回設置までの最小遅延

    private float nextMineTime;
    private float currentExplosionRadius = 5.0f; // パルスの爆発半径

    protected override void Start()
    {
        base.Start();

        // 最初の機雷設置タイミングをランダムに
        // Time.time: ゲーム開始からの経過時間（秒）。
        // Random.Range(min, max): 指定範囲内のランダムな数値を返します。
        // これにより、出現直後に一斉に機雷を置くのを防ぎ、タイミングをばらけさせます。
        // mineIntervalが短縮されてinitialDelayMinを下回る可能性があるため、Maxで調整
        float maxDelay = Mathf.Max(initialDelayMin, mineInterval);
        nextMineTime = Time.time + Random.Range(initialDelayMin, maxDelay);
    }

    protected override void InitStats(int difficultyLevel)
    {
        // 難易度に応じて強化
        if (useDifficultyScaling)
        {
            // HP増加。ジャマー敵は元々硬いですが、それでも上限(100)を設けます。
            // プレイヤーの火力インフレに対応するため、かなり高く設定します。
            maxHP = Mathf.Min(100, baseHP + difficultyLevel); // baseHPはInspectorで3に設定されている前提
            currentHP = maxHP;

            // 機雷設置間隔の短縮 (初期2.0秒 -> レベルごとに0.15秒短縮 -> 下限0.8秒)
            // Mathf.Max: 引数の中で大きい方の値を返します。これにより、0.8秒より短くならないように制限しています。
            mineInterval = Mathf.Max(0.8f, 2.0f - (difficultyLevel * 0.15f));

            // 移動速度の上昇: レベルごとに 0.1f ずつ速くする（上限 3.5f）
            // Mathf.Min: 2つの値のうち小さい方を返します。これにより、速度が3.5fを超えないように制限（キャップ）しています。
            speed = Mathf.Min(3.5f, speed + (difficultyLevel * 0.1f));
        }
        else
        {
            maxHP = baseHP; // 設定値をそのまま使う
            currentHP = maxHP;
        }

        // スコア計算: 基礎点 + (レベル * 100)
        scoreValue = baseScore + (difficultyLevel * 100);

        // パルス範囲の計算: レベルごとに0.5f広げる
        // 画面全体を覆って回避不能（詰み）にならないよう、上限を7.5fに設定します。
        // Mathf.Min: 2つの値のうち小さい方を返します。
        currentExplosionRadius = Mathf.Min(7.5f, 5.0f + (difficultyLevel * 0.5f));
    }

    protected override void Update()
    {
        base.Update(); // 下に移動

        // 機雷設置
        if (Time.time > nextMineTime)
        {
            // 画面外で見えないパルスが発生するのを防ぐため、画面内にいる場合のみ設置する
            // visibleYLimit は画面の上下端のY座標（絶対値）
            if (transform.position.y > -visibleYLimit && transform.position.y < visibleYLimit)
            {
                PlaceMine();
            }
            nextMineTime = Time.time + mineInterval;
        }

        // 画面外に出たら消滅
        if (transform.position.y < -visibleYLimit)
        {
            Destroy(gameObject);
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

    protected override void Die()
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

        // 自分自身を削除
        Destroy(gameObject);
    }

    // IChainExplodableの実装。誘爆時の処理を行います。
    public override void OnChainExplosion()
    {
        if (isSelfDestructing) return;
        isSelfDestructing = true;

        // 統計情報（誘爆撃破数）を加算
        GameManager.instance?.IncrementChainKills();
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

    // プレイヤーとの接触判定（ジャミング付与）
    protected override void OnTriggerEnter2D(Collider2D other)
    {
        base.OnTriggerEnter2D(other); // 親クラスの処理（誘爆判定など）を実行

        if (other.CompareTag("Player"))
        {
            if (other.TryGetComponent<PlayerController>(out var player))
            {
                player.ApplyWeaponJam(contactJamDuration);
            }
        }
    }

    // 接触ダメージを無効化するためにオーバーライド
    protected override void OnTriggerStay2D(Collider2D other)
    {
        // ジャマー敵本体は接触してもダメージを与えない
        // ただし、接触し続けている間はジャミング効果を継続（更新）させる
        if (other.CompareTag("Player"))
        {
            if (other.TryGetComponent<PlayerController>(out var player))
            {
                player.ApplyWeaponJam(contactJamDuration);
            }
        }
    }
}
