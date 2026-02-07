# 3. 敵の生成とライフサイクル

敵キャラクターがどのように生まれ、動き、そして消えていくのか。その一生（ライフサイクル）を管理するコードについて解説します。

## 1. 敵の生成と破壊 (Instantiate & Destroy)

現在の実装では、Unityの標準的なメソッドを使用して敵の管理を行っています。

### 生成 (Spawning)
`EnemySpawner` スクリプトが、プレハブ（設計図）から実体を作り出します。

```csharp
// プレハブ、位置、回転を指定して生成
Instantiate(enemyPrefab, spawnPosition, Quaternion.identity);
```

### 破壊 (Destruction)
HPが尽きたり、画面外に出た敵はメモリから消去されます。

```csharp
// このゲームオブジェクトを完全に削除する
Destroy(gameObject);
```

## 2. スクリプト関数解剖 (Script Anatomy)

`EnemyController.cs` や `EnemySpawner.cs` には、以下のような関数が含まれているはずです。それぞれの役割を理解しましょう。

### EnemySpawner.cs (敵の出現管理)

| 関数名                    | 役割・解説                                                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **`Start`**               | ゲーム開始時の初期化。最初の敵が出るまでのタイマー設定などを行います。                                                 |
| **`Update`**              | 毎フレーム呼ばれます。出現タイマーを進め、時間が来たら `SpawnEnemy()` を呼びます。                                     |
| **`SpawnEnemy`**          | **重要:** 実際に `Instantiate` を実行する関数です。画面の左端から右端のランダムなX座標を計算し、出現位置を決定します。 |
| **`CalculateDifficulty`** | 時間経過に応じて、敵のHPや出現頻度を調整するロジックが含まれます。                                                     |

### EnemyController.cs (敵の個体制御)

| 関数名                 | 役割・解説                                                                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Start` / `Awake`**  | 自分のHPを設定したり、プレイヤーの位置を取得したりする初期化処理。                                                                                                                            |
| **`Update`**           | **移動処理の核心。** `transform.Translate` を使って下に移動させたり、追尾ロジックを実行します。また、「画面外に出たか？」をチェックし、出たら `Destroy` します。                              |
| **`OnTriggerEnter2D`** | **衝突判定。** 「何かに当たった時」にUnityから自動的に呼ばれます。当たった相手 (`other`) のタグを確認し、弾ならダメージを受け、プレイヤーならダメージを与えます。                             |
| **`TakeDamage`**       | `IDamageable` インターフェースの実装。HPを減らし、**ヒットフラッシュ（白点滅）**を開始します。HPバーの長さを更新し、左寄せになるよう位置を補正します。HPが0以下になったら死亡処理を行います。 |
| **`Die`**              | 死亡処理。**グリッチエフェクト（ExplosionEffect）**を生成し、スコアを加算(`GameManager.AddScore`)した後、自分を `Destroy` します。                                                            |
| **`FlashWhite`**       | (コルーチン) ダメージを受けた瞬間にスプライトを一瞬だけ白くし、フィードバックを与えます。                                                                                                     |
| **`Explode`**          | (誘爆ギミック用) 8方向に弾をばら撒く処理。                                                                                                                                                    |

## 3. 発展：オブジェクトプーリング (Future Optimization)

**※現状のコードでは未実装かもしれませんが、将来的な課題です。**

`Instantiate` と `Destroy` は便利な反面、処理が重く、大量に行うとゲームがカクつく原因（ガベージコレクション）になります。

これを防ぐために、**「使い終わった敵を捨てずに非表示にしておき、次の出現時に再利用する」** 技術を**オブジェクトプーリング**と呼びます。
ステージ制や弾幕量が増えた際には、この仕組みへの書き換えが必要になるでしょう。
```

## ScriptableObject によるデータ管理

敵のパラメータ（HP、スピード、スコア）をコードの中に直接書く（ハードコーディング）と、調整のたびにコンパイルが必要で非効率です。
Unityでは **ScriptableObject** を使ってデータをアセットファイルとして保存します。

### 定義

```csharp
[CreateAssetMenu(fileName = "NewEnemyData", menuName = "Enemy Data")]
public class EnemyData : ScriptableObject
{
    public float moveSpeed = 5f;
    public int maxHp = 1;
    public int scoreValue = 10;
    public GameObject prefab;
}
```

### メリット
1. **デザイナーとの協業:** プログラマー以外でも、Unityエディタ上で数値をいじるだけでバランス調整ができます。
2. **メモリ効率:** 同じ種類の敵が100体いても、参照するデータ（ScriptableObject）は1つだけで済むため、メモリ消費を抑えられます。

## 敵の種類と継承 (Inheritance)

本プロジェクトでは、基本クラス `EnemyController` を継承して、異なる動きをする敵を作っています。

### 1. 通常敵 (EnemyController)
- **出現:** 画面上部 (Y=6)
- **移動:** `transform.Translate(Vector3.down * speed * Time.deltaTime)` で真下に移動。

### 2. 追尾敵 (ChaserEnemyController)
- **出現:** 画面下部 (Y=-6)
- **移動:** プレイヤーの位置を取得し、`Vector3.MoveTowards` を使用して追尾します。
- **継承:** `EnemyController` を継承し、`Move()` メソッドを **override（上書き）** することで実装しています。

## 誘爆ギミックの実装 (Chain Explosion)

敵同士の衝突判定には `OnTriggerEnter2D` を使用します。

```csharp
private void OnTriggerEnter2D(Collider2D other)
{
    // 相手も「敵」だった場合
    if (other.CompareTag("Enemy"))
    {
        // 誘爆処理：全方位弾を発射
        Explode();
        // 自分自身を破壊（プールに戻す）
        Die();
    }
}
```

### 全方位発射のロジック
`Explode()` メソッドでは、**8方向（45度刻み）** に弾を生成します。

```csharp
private void Explode()
{
    for (int i = 0; i < 360; i += 45)
    {
        // Quaternion.Euler(0, 0, i) で角度を作って発射
        Instantiate(bulletPrefab, transform.position, Quaternion.Euler(0, 0, i));
    }
}

## 6. 視覚フィードバックとエフェクト (Visual Feedback & Effects)

プレイヤーの攻撃に対する爽快感を高めるため、以下の視覚効果を実装しています。

### ヒットフラッシュ (Hit Flash)
敵がダメージを受けた際、`SpriteRenderer.color` を一時的に `Color.white` に変更し、0.05秒後に元の色に戻すコルーチンを実行します。これにより、攻撃が当たったことが直感的に伝わります。

### 敵HPバー (Enemy HP Bar)
HPが2以上の敵には頭上にHPバーを表示します。Unityの標準Sprite（中心基準）を使用しているため、単にスケールを縮小すると両端が縮んでしまいます。
これを防ぐため、**「縮小した幅の半分だけ左に移動させる」** 計算を行い、見た目上「左端が固定されている」ように制御しています。

### グリッチ死亡演出 (ExplosionEffect.cs)
敵を倒した際、爆発の代わりに「デジタルなノイズ」が走って消滅する演出を行います。

*   **パーティクル形状:** 横長のバー（Box Shape + 3D Start Size）を使用し、走査線の乱れを表現。
*   **色:** 赤・白・シアンのグラデーションを定義し、`RandomColor` モードでランダムに色を選択することで、中間色（灰色）が混ざらない鮮やかな色収差を演出。
*   **挙動:** 速度と重力を0にし、その場で激しく振動（Noiseモジュール）させた後、0.25秒程度で素早く消滅させます。
```
```
