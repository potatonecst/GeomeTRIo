using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class EnemySpawner : MonoBehaviour
{
    public static EnemySpawner instance;

    [Header("Enemy Prefabs")]
    public GameObject enemyPrefab;       // 通常敵 (上から)
    public GameObject chaserEnemyPrefab; // 追尾敵 (下から)
    public GameObject jammerEnemyPrefab; // ジャマー敵 (機雷設置)

    [Header("Spawn Settings")]
    public float spawnInterval = 2.0f;   // 基本の出現間隔
    public float xLimit = 3.2f;          // X座標の出現範囲 (画面端に余裕を持たせる)
    public float spawnY = 6.0f;          // 出現Y座標 (上)
    public float spawnYBottom = -6.0f;   // 出現Y座標 (下)
    public float chaserSpawnStartTime = 20f; // 追尾敵が出現し始める時間

    [Header("Formation Settings")]
    [Range(0f, 1f)]
    public float formationChance = 0.3f; // 編隊出現の確率 (30%)

    private float timer;
    private float difficultyTimer;

    // --- 編隊ボーナス管理用 ---
    private int nextFormationId = 0;

    private class FormationData
    {
        public int totalCount;     // 編隊の総数
        public int defeatedCount;  // プレイヤーに倒された数
        public int remainingCount; // 画面内に残っている数
    }
    private Dictionary<int, FormationData> activeFormations = new Dictionary<int, FormationData>();

    // 同一フレーム内でのスポーン位置重複を防ぐためのリスト
    // Unityの物理演算(Physics2D)はフレームの最後で更新されるため、
    // 同じフレーム内で連続してInstantiateした場合、直前の敵をOverlapCircleで検知できません。
    // そのため、自前で座標リストを持ってチェックする必要があります。
    private List<Vector3> reservedSpawnPositions = new List<Vector3>();

    private void Awake()
    {
        if (instance == null) instance = this;
    }

    // 新しい編隊IDを発行し、管理リストに登録する
    public int StartFormation(int totalMembers)
    {
        int id = nextFormationId++;
        activeFormations[id] = new FormationData
        {
            totalCount = totalMembers,
            remainingCount = totalMembers,
            defeatedCount = 0
        };
        return id;
    }

    // 敵が消滅（撃破または画面外へ逃走）した時に呼ばれる
    public void ReportEnemyDespawn(int formationId, bool killedByPlayer)
    {
        if (formationId == -1 || !activeFormations.ContainsKey(formationId)) return;

        var data = activeFormations[formationId];
        if (killedByPlayer) data.defeatedCount++;
        data.remainingCount--;

        // 編隊の全員がいなくなった時点で判定
        if (data.remainingCount <= 0)
        {
            // 全員倒していればボーナス
            if (data.defeatedCount >= data.totalCount)
            {
                int bonusScore = 1000; // 全滅ボーナス点 (100 -> 1000)
                // 敵の死亡時スコアポップアップと重なって消えないように、少し遅らせて表示する
                StartCoroutine(TriggerFormationBonusCoroutine(bonusScore));
            }
            activeFormations.Remove(formationId);
        }
    }

    // 編隊ボーナスを遅延表示するコルーチン
    private IEnumerator TriggerFormationBonusCoroutine(int score)
    {
        // 1フレーム待つ（敵の死亡イベント処理やスコア加算が完全に終わるのを待つ）
        yield return null;
        // さらにもう少し待つ（視認性のため、敵のスコアが出た後にポンと出るようにする）
        yield return new WaitForSeconds(0.2f);

        GameManager.instance.TriggerScoreEvent(score, "FORMATION BONUS");
    }

    void Update()
    {
        // ゲーム中以外は停止
        if (GameManager.instance == null || !GameManager.instance.IsGameActive) return;

        // 難易度管理 (90秒ごとに敵の出現頻度を上げる)
        // ※敵のHP上昇はEnemyController側で自動的に行われます
        difficultyTimer += Time.deltaTime;
        if (difficultyTimer >= 90f)
        {
            difficultyTimer = 0;
            // Mathf.Max: 引数の中で大きい方の値を返します。ここでは0.5fを下限として設定しています。
            // 難易度が上がったら出現頻度を少し上げる（最小0.5秒まで）
            spawnInterval = Mathf.Max(0.5f, spawnInterval * 0.95f);

            // 現在の難易度レベルを計算
            int difficultyLevel = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);

            // HPの上限（通常敵・追尾敵はLv29でHP30に到達し、それ以降は増えない）
            // 強化が止まったら通知も止める (Lv30以降は表示しない)
            if (difficultyLevel < 30)
            {
                GameManager.instance.SetSystemMessage("WARNING: ENEMY LEVEL UP!", 3.0f);
            }
        }

        // スポーンタイマー
        timer += Time.deltaTime;
        if (timer >= spawnInterval)
        {
            SpawnWave();
            // timer = 0; // 削除: ここでリセットするとSpawnFormation内の遅延設定(-3.0f)が上書きされてしまうため
        }
    }

    void SpawnWave()
    {
        // 確率で編隊攻撃、それ以外はランダム生成
        if (Random.value < formationChance)
        {
            SpawnFormation();
        }
        else
        {
            SpawnRandom();
        }
    }

    void SpawnRandom()
    {
        // このフレームでの生成処理が始まる前に、予約リストをクリアします。
        reservedSpawnPositions.Clear();

        // ジャマー敵の出現判定
        // Mathf.FloorToInt: 小数点以下を切り捨てて整数にします。
        // 経過時間(timeElapsed)を90秒で割ることで、現在の難易度レベル(0, 1, 2...)を算出しています。
        int difficultyLevel = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);

        // レベルに応じて出現率上昇: Lv1=10%, Lv2=15%, Lv3=20% ... Max 30%
        // Mathf.Max(0, ...) は、レベルが低い時にマイナスにならないようにするためのガードです。
        float jammerChance = 0.1f + Mathf.Max(0, (difficultyLevel - 1) * 0.05f);
        jammerChance = Mathf.Min(jammerChance, 0.3f);

        if (difficultyLevel >= 1 && Random.value < jammerChance && jammerEnemyPrefab != null)
        {
            // 高レベル(Lv4以降)なら確率で2体出す
            int count = (difficultyLevel >= 4 && Random.value > 0.5f) ? 2 : 1;

            for (int i = 0; i < count; i++)
            {
                // 位置探し（最大10回試行）
                for (int attempt = 0; attempt < 10; attempt++)
                {
                    float randomX = Random.Range(-xLimit, xLimit);
                    Vector3 spawnPos = new Vector3(randomX, spawnY, 0);
                    if (IsSpawnPositionSafe(spawnPos))
                    {
                        // 50%の確率で斜め移動（横から出現）させる
                        Quaternion rotation = Quaternion.identity;
                        bool isDiagonal = false;

                        if (Random.value > 0.5f)
                        {
                            isDiagonal = true;
                            // 左右どちらから出現するか
                            bool leftToRight = Random.value > 0.5f;

                            // 出現位置を画面外の横に設定 (SpawnDiagonalStraferを参考)
                            float spawnX = leftToRight ? -3.5f : 3.5f;
                            // Y座標をランダムに決定（中央付近を避ける）
                            float randomY = Random.value > 0.5f ? Random.Range(3.5f, 5.0f) : Random.Range(-5.0f, -3.5f);
                            spawnPos = new Vector3(spawnX, randomY, 0);

                            // 角度設定 (SpawnDiagonalStraferを参考)
                            float baseAngle = Random.Range(30f, 60f);
                            float finalAngle;

                            if (leftToRight) // 左から右へ
                            {
                                // Y > 0 (上半分) なら下方向へ (右下)
                                if (randomY > 0) finalAngle = baseAngle;
                                // Y < 0 (下半分) なら上方向へ (右上)
                                else finalAngle = 180f - baseAngle;
                            }
                            else // 右から左へ
                            {
                                // Y > 0 (上半分) なら下方向へ (左下)
                                if (randomY > 0) finalAngle = -baseAngle;
                                // Y < 0 (下半分) なら上方向へ (左上)
                                else finalAngle = -(180f - baseAngle);
                            }
                            rotation = Quaternion.Euler(0, 0, finalAngle);
                        }

                        GameObject jammer = Instantiate(jammerEnemyPrefab, spawnPos, rotation);

                        // 生成した位置を予約リストに追加し、このフレーム内の後続の生成で重ならないようにします。
                        reservedSpawnPositions.Add(spawnPos);

                        if (isDiagonal)
                        {
                            var ctrl = jammer.GetComponent<JammerEnemyController>();
                            if (ctrl != null)
                            {
                                ctrl.useDifficultyScaling = false; // 自動調整を無効化
                                ctrl.mineInterval = 0.5f; // 高速でばら撒く
                                ctrl.initialDelayMin = 0.0f; // 画面に入ったらすぐ出す
                                // 移動速度アップ: レベルに応じて速くする (初期5.0f -> レベルごとに+0.5f -> 上限8.0f)
                                ctrl.speed = Mathf.Min(8.0f, 5.0f + (difficultyLevel * 0.5f));
                            }
                        }
                        break;
                    }
                }
            }
            // return; // 削除: ジャマーが出ても通常の敵出現処理を続行する（同時出現）
        }

        // 通常敵 (上から)
        // 重なりを防ぐため、安全な位置を探す（最大10回試行）
        for (int i = 0; i < 10; i++)
        {
            float randomX = Random.Range(-xLimit, xLimit);
            Vector3 spawnPos = new Vector3(randomX, spawnY, 0);

            if (IsSpawnPositionSafe(spawnPos))
            {
                Instantiate(enemyPrefab, spawnPos, Quaternion.identity);
                reservedSpawnPositions.Add(spawnPos); // 位置を予約
                break;
            }
        }

        // 追尾敵 (下から) の出現判定
        // レベル1以上から出現。レベル4以上で出現率アップ(30% -> 50%)
        float chaserChance = (difficultyLevel >= 4) ? 0.5f : 0.3f;

        if (difficultyLevel >= 1 && Random.value < chaserChance && chaserEnemyPrefab != null)
        {
            for (int i = 0; i < 10; i++)
            {
                float randomXChaser = Random.Range(-xLimit, xLimit);
                Vector3 spawnPosChaser = new Vector3(randomXChaser, spawnYBottom, 0);

                if (IsSpawnPositionSafe(spawnPosChaser))
                {
                    Instantiate(chaserEnemyPrefab, spawnPosChaser, Quaternion.identity);
                    reservedSpawnPositions.Add(spawnPosChaser); // 位置を予約
                    break;
                }
            }
        }

        // 通常生成時はタイマーを0にリセット（通常のインターバルで次を生成）
        timer = 0f;
    }

    // 位置が安全か（他の敵と重なっていないか）チェックする
    bool IsSpawnPositionSafe(Vector3 position)
    {
        // 1. 物理演算でのチェック (既存の敵)
        // Physics2D.OverlapCircle: 指定した位置と半径の円内に、Colliderが存在するかを調べます。
        // 戻り値は最初に見つかったコライダーです。何もなければnullを返します。
        // 半径0.6fに広げて余裕を持たせる
        Collider2D hit = Physics2D.OverlapCircle(position, 0.6f);
        // Enemyタグを持つものと重なっていたらNG
        if (hit != null && hit.CompareTag("Enemy"))
        {
            return false;
        }

        // 2. 同一フレーム内で予約された位置とのチェック (物理演算が更新される前の敵)
        // まだPhysics2Dには反映されていないが、さっき生成したばかりの敵との距離を測ります。
        foreach (var reservedPos in reservedSpawnPositions)
        {
            // Vector3.Distance: 2点間の距離を計算します。
            // 距離が1.2f未満なら近すぎると判断 (半径0.6f * 2)
            if (Vector3.Distance(position, reservedPos) < 1.2f)
            {
                return false;
            }
        }
        return true;
    }

    // --- 編隊生成ロジック ---

    void SpawnFormation()
    {
        // 編隊生成中は次のスポーンを遅らせる
        // 生成アニメーションに時間がかかるため、次のウェーブがすぐに重ならないようにインターバルを稼ぐ
        // V字編隊の最後尾が画面内に入ってくるまで時間がかかるため、余裕を持って遅らせる
        timer = -3.0f;

        int pattern = Random.Range(0, 3); // 0, 1, 2

        // 難易度に応じて下から出現するか決定
        // レベル3(270秒)以降、かつ50%の確率で下から出現
        int difficultyLevel = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);
        bool spawnFromBottom = difficultyLevel >= 3 && Random.value > 0.5f;

        switch (pattern)
        {
            case 0:
                StartCoroutine(SpawnVFormation(spawnFromBottom));
                break;
            case 1:
                StartCoroutine(SpawnHorizontalLine(spawnFromBottom));
                break;
            case 2:
                StartCoroutine(SpawnDiagonalStrafer());
                break;
        }
    }

    // 1. V字編隊 (The Wedge)
    // 誘爆を狙いやすい逆三角形の編隊
    // IEnumerator: コルーチンとして動作させるための戻り値の型。
    // コルーチンを使うことで、敵を一度に全員出すのではなく、少しずつ時間差で出現させる演出が可能になります。
    IEnumerator SpawnVFormation(bool fromBottom = false)
    {
        // 編隊IDを発行 (リーダー1 + 2列目2 + 3列目2 = 計5体)
        int formationId = StartFormation(5);

        // 出現位置と回転の設定
        float startY = fromBottom ? spawnYBottom : spawnY;
        Quaternion rotation = fromBottom ? Quaternion.Euler(0, 0, 180f) : Quaternion.identity;
        // 後続の展開方向（上からならプラス、下からならマイナス）
        float yDir = fromBottom ? -1f : 1f;

        // 画面中央付近に生成
        // 重ならない位置を探す
        float centerX = 0f;

        // 編隊の最大幅(中心から2.4f)を考慮して、画面端(xLimit)からはみ出さないように中心位置を制限
        // xLimit(3.2f) - 2.4f = 0.8f なので、中心は -0.8 ~ 0.8 の範囲になる
        float maxCenter = Mathf.Max(0f, xLimit - 2.4f);

        for (int i = 0; i < 10; i++)
        {
            centerX = Random.Range(-maxCenter, maxCenter);
            if (IsSpawnPositionSafe(new Vector3(centerX, startY, 0)))
            {
                break;
            }
        }
        Vector3 leaderPos = new Vector3(centerX, startY, 0);

        // リーダー
        GameObject leader = Instantiate(enemyPrefab, leaderPos, rotation);
        var leaderCtrl = leader.GetComponent<EnemyController>();
        if (leaderCtrl != null)
        {
            leaderCtrl.scoreMultiplier = 2.0f; // 編隊ボーナス
            leaderCtrl.formationId = formationId; // 編隊IDセット
        }

        // yield return new WaitForSeconds(秒数):
        // ここで処理を中断し、指定した時間が経過した後に再開します。
        // これにより、リーダーが出現してから少し遅れて2列目が出現する、という動きを作れます。
        yield return new WaitForSeconds(0.2f);

        float xOffset = 1.2f;
        float yOffset = 0.8f;

        // 2列目
        SpawnFormationMember(new Vector3(centerX - xOffset, startY + yOffset * yDir, 0), formationId, rotation);
        SpawnFormationMember(new Vector3(centerX + xOffset, startY + yOffset * yDir, 0), formationId, rotation);

        yield return new WaitForSeconds(0.2f);

        // 3列目
        SpawnFormationMember(new Vector3(centerX - xOffset * 2, startY + yOffset * 2 * yDir, 0), formationId, rotation);
        SpawnFormationMember(new Vector3(centerX + xOffset * 2, startY + yOffset * 2 * yDir, 0), formationId, rotation);
    }

    // 2. 横一列 (The Wall)
    // 画面上部から横一列に並んで降りてくる。面での圧力をかける。
    IEnumerator SpawnHorizontalLine(bool fromBottom = false)
    {
        int count = 5;
        // 編隊IDを発行
        int formationId = StartFormation(count);

        // 出現位置と回転の設定
        float startY = fromBottom ? spawnYBottom : spawnY;
        Quaternion rotation = fromBottom ? Quaternion.Euler(0, 0, 180f) : Quaternion.identity;

        // 画面幅に合わせて配置（少し中央に寄せる）
        float startX = -2.5f;
        float endX = 2.5f;
        float stepX = (endX - startX) / (count - 1);

        for (int i = 0; i < count; i++)
        {
            float x = startX + (stepX * i);
            Vector3 pos = new Vector3(x, startY, 0);

            // 回転を設定（上からなら0度、下からなら180度）
            GameObject enemy = Instantiate(enemyPrefab, pos, rotation);
            var ctrl = enemy.GetComponent<EnemyController>();
            if (ctrl != null)
            {
                ctrl.scoreMultiplier = 2.0f; // 編隊ボーナス
                ctrl.formationId = formationId; // 編隊IDセット
            }
        }
        yield return null;
    }

    // 3. 斜め移動・弾幕 (Diagonal Strafer)
    // 単体で画面を斜めに高速で横切りながら、弾をばら撒く（爆撃機のような挙動）
    IEnumerator SpawnDiagonalStrafer()
    {
        // 重なりを防ぐため、安全な位置を探す（最大10回試行）
        for (int i = 0; i < 10; i++)
        {
            // 左右どちらから出現するかランダムに決定
            bool leftToRight = Random.value > 0.5f;
            float startX = leftToRight ? -3.5f : 3.5f;

            // Y座標をランダムに決定するが、中央付近（-3.5 ~ 3.5）は避ける
            float randomY = Random.value > 0.5f ? Random.Range(3.5f, 5.0f) : Random.Range(-5.0f, -3.5f);
            Vector3 startPos = new Vector3(startX, randomY, 0);

            // 位置が安全なら生成
            if (IsSpawnPositionSafe(startPos))
            {
                // 角度設定 (30度〜60度)
                float baseAngle = Random.Range(30f, 60f);
                float finalAngle;

                if (leftToRight) // 左から右へ
                {
                    // Y > 0 (上半分) なら下方向へ (右下: 30~60度)
                    // Y < 0 (下半分) なら上方向へ (右上: 120~150度)
                    if (randomY > 0) finalAngle = baseAngle;
                    else finalAngle = 180f - baseAngle;
                }
                else // 右から左へ
                {
                    // Y > 0 (上半分) なら下方向へ (左下: -30~-60度)
                    // Y < 0 (下半分) なら上方向へ (左上: -120~-150度)
                    if (randomY > 0) finalAngle = -baseAngle;
                    else finalAngle = -(180f - baseAngle);
                }

                Quaternion rotation = Quaternion.Euler(0, 0, finalAngle);

                // 難易度に応じて連続出現数を決定
                int spawnCount = 1;
                // 90秒ごとのレベルで判定
                int difficultyLevel = Mathf.FloorToInt(GameManager.instance.timeElapsed / 90f);

                if (difficultyLevel >= 2) // 180秒経過後 (Lv2): 激化
                {
                    spawnCount = Random.Range(2, 5); // 2〜4体
                }
                else if (difficultyLevel >= 1) // 90秒経過後 (Lv1): 強化
                {
                    spawnCount = Random.Range(1, 3); // 1〜2体
                }

                // 複数体の場合は編隊ボーナスを設定
                int formationId = (spawnCount > 1) ? StartFormation(spawnCount) : -1;

                for (int j = 0; j < spawnCount; j++)
                {
                    GameObject enemy = Instantiate(enemyPrefab, startPos, rotation);

                    // 弾幕仕様にするためにパラメータを調整
                    var controller = enemy.GetComponent<EnemyController>();
                    if (controller != null)
                    {
                        controller.useFireRateScaling = false; // 自動調整を無効化して手動設定を優先

                        // 難易度調整: レベルに応じて連射速度を上げる (段階的)
                        if (difficultyLevel >= 4) controller.fireRate = 0.2f;       // Lv4以降: 超高速
                        else if (difficultyLevel >= 3) controller.fireRate = 0.25f; // Lv3: かなり高速
                        else if (difficultyLevel >= 2) controller.fireRate = 0.3f;  // Lv2: 高速
                        else if (difficultyLevel >= 1) controller.fireRate = 0.4f;  // Lv1: 中速
                        else controller.fireRate = 0.5f;                            // Lv0: 通常

                        controller.scoreMultiplier = 3.0f; // 強敵ボーナス（3倍）
                        controller.formationId = formationId; // 編隊IDセット

                        // 自機狙い設定
                        // レベル1(90秒)以降、かつ50%の確率で自機狙い有効
                        if (difficultyLevel >= 1 && Random.value > 0.5f)
                        {
                            controller.aimingStartTime = 0f; // 即座に自機狙いモード
                        }
                        else
                        {
                            controller.aimingStartTime = 9999f; // 自機狙い無効
                        }

                        // 速度調整: レベルに応じて速くする (初期5.0f -> レベルごとに+0.5f -> 上限8.0f)
                        controller.speed = Mathf.Min(8.0f, 5.0f + (difficultyLevel * 0.5f));

                        // 弾速調整: 初速は敵より速くして、追い越しを防ぐ
                        // 敵の速度 + 1.0f のマージンを持たせて、確実に前に飛ばす
                        controller.bulletSpeedBase = controller.speed + 1.0f;

                        // 減速設定: 0.4秒後に減速させ、回避可能な速度に落とす
                        // これにより「発射直後は高速で敵を追い越し、その後プレイヤーの手前で減速して弾幕となる」挙動を作ります。
                        controller.bulletUseSpeedVariation = true;
                        controller.bulletDecelDelay = 0.1f; // 減速開始を早める (0.4 -> 0.1秒)
                        controller.bulletMinSpeed = 4.0f;
                        controller.bulletDecelerationRate = 30.0f; // 急激に減速させる (デフォルト10.0f -> 30.0f)

                        // 即座に射撃開始
                        controller.EnableShootingImmediately();
                    }

                    // 次の敵が出るまで少し待つ（連続の場合）
                    if (j < spawnCount - 1)
                    {
                        yield return new WaitForSeconds(0.4f);
                    }
                }

                break; // 生成成功したらループを抜ける
            }
        }
        yield return null;
    }

    void SpawnFormationMember(Vector3 pos, int formationId = -1, Quaternion rotation = default)
    {
        // 画面外チェックなどは簡易的に省略（編隊なので多少はみ出てもOK）
        GameObject enemy = Instantiate(enemyPrefab, pos, rotation);
        var ctrl = enemy.GetComponent<EnemyController>();
        if (ctrl != null)
        {
            ctrl.scoreMultiplier = 2.0f; // 編隊ボーナス
            ctrl.formationId = formationId;
        }
    }
}
