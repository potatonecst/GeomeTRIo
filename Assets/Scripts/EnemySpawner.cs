using UnityEngine;

public class EnemySpawner : MonoBehaviour
{
    //生成したい敵のプレハブ
    public GameObject enemyPrefab;
    public GameObject chaserEnemyPrefab;

    //敵の出現開始時間
    public float chaserSpawnStartTime = 20f; //追尾する敵が出現し始める時間

    //敵を配置する際の最小間隔（距離）
    public float minSpawnDistance = 1f;

    //敵を生成する間隔（秒）
    public float spawnInterval = 2f;
    public float chaserSpawnInterval = 5f;

    //敵の生成可能判定
    private bool canSpawnChaser = false; //追尾する敵を生成可能か

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        //SpawnEnemyという関数を、2秒後から2秒間隔で繰り返し呼び出す。
        InvokeRepeating("SpawnEnemy", 2f, spawnInterval);
    }

    void Update()
    {
        //追尾する敵のスポーンが許可されておらず、かつ指定時間が経過したら
        if (!canSpawnChaser && GameManager.instance.timeElapsed >= chaserSpawnStartTime)
        {
            canSpawnChaser = true;
            InvokeRepeating("SpawnChaserEnemy", 0f, chaserSpawnInterval); //遅延0で開始
        }
    }

    void SpawnEnemy()
    {
        //敵を生成する場所をランダムに決める
        float randomX = Random.Range(-3f, 3f); //X座標を-3から3の間でランダムに
        Vector3 spawnPosition = new Vector3(randomX, 6f, 0f); //Y座標は6

        //敵のプレハブをランダムな場所に生成する
        if (IsSpawnPositionSafe(spawnPosition))
        {
            Instantiate(enemyPrefab, spawnPosition, Quaternion.identity);
        }
    }

    void SpawnChaserEnemy()
    {
        float randomX = Random.Range(-3f, 3f);
        Vector3 spawnPosition = new Vector3(randomX, -6f, 0f);

        if (IsSpawnPositionSafe(spawnPosition))
        {
            Instantiate(chaserEnemyPrefab, spawnPosition, Quaternion.identity);
        }
    }

    bool IsSpawnPositionSafe(Vector3 position)
    {
        //Enemyタグがついた、現在アクティブな全てのゲームオブジェクトを探し出す
        GameObject[] allEnemies = GameObject.FindGameObjectsWithTag("Enemy");

        //見つかった全ての敵に対してループ処理を行う
        foreach (GameObject enemy in allEnemies)
        {
            //現在いる敵の誰か一人とでも距離が近すぎる場合
            if (Vector3.Distance(position, enemy.transform.position) < minSpawnDistance)
            {
                //この場所は安全でない
                Debug.Log("Not safe!");
                return false;
            }
        }

        //全てのループを抜けた場合、この場所は安全
        return true;
    }
}
