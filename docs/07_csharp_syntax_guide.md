# C# Syntax Guide (C# 構文ガイド)

本プロジェクトで使用されている、C# の特徴的な構文や設計パターンについての解説です。

## 1. 式形式のメンバー定義 (Expression-bodied members)

メソッドやプロパティの中身が「1つの式（値を返す処理）」だけで完結する場合に、`=>`（アロー演算子）を使って短縮して記述する構文です。

### 構文
```csharp
// 通常の書き方
public GameData Data
{
    get { return gameData; }
}

// 式形式での書き方
public GameData Data => gameData;
```

### 解説
*   **意味:** 「このプロパティ（`Data`）の値は、矢印の右側（`gameData`）と同じです」という定義です。
*   **メリット:** `get { return ... }` という定型文を省略でき、コードがスッキリして読みやすくなります。
*   **用途:** 主に「読み取り専用プロパティ」や「単純な値を返すメソッド」の定義に使用されます。

---

## 2. 自動実装プロパティとアクセス制限 (Auto-implemented properties with access modifiers)

プロパティの「読み取り（get）」と「書き込み（set）」に対して、異なるアクセス権限（public/privateなど）を設定する機能です。

### 構文
```csharp
public int CurrentScore { get; private set; } = 0;
```

### 解説
この1行で以下の3つのことを定義しています。

1.  **`public int CurrentScore`**:
    *   このプロパティ自体は `public` なので、他のクラス（外部）からアクセス可能です。
2.  **`get;`**:
    *   値の「読み取り（取得）」は、プロパティ全体の制限（`public`）と同じです。
    *   **結果:** 誰でも現在のスコアを見る（取得する）ことができます。
3.  **`private set;`**:
    *   値の「書き込み（設定）」は `private` です。
    *   **結果:** このクラス（`GameManager`）の中でしか、スコアを変更（代入）できません。

### メリット（カプセル化）
ゲームのスコアやHPなど、「UI表示のために他のクラスから参照させたいが、勝手に値を書き換えられるとバグの原因になる」変数を定義するときに非常に重要です。
値を変更したい場合は、`AddScore(int points)` のような専用のメソッドを用意し、そのメソッド経由でのみ変更を許可することで、データの整合性を守ることができます。

### 仕組み（コンパイラによる自動生成）
この書き方は **「自動実装プロパティ (Auto-Implemented Properties)」** と呼ばれます。
コンパイラがビルド時に、値を保存するための「裏方の変数（バックフィールド）」を自動的に生成してくれるため、プログラマーが自分で変数を宣言する必要がありません。

---

## 3. 属性 (Attributes)

クラス、メソッド、変数などの上に `[...]` で記述されるメタデータ（付加情報）です。Unityでは、エディタの挙動を制御するために頻繁に使用されます。

### 構文
```csharp
[SerializeField]
private int maxHp = 10;

[System.Serializable]
public class GameData { ... }
```

### 解説
*   **`[SerializeField]`**:
    *   通常、`private` な変数はUnityのエディタ（Inspector）に表示されず、保存もされません。
    *   この属性をつけることで、「`private` だけどUnityに保存（シリアライズ）させ、エディタから設定可能にする」ことができます。
    *   **メリット:** 他のスクリプトから勝手に書き換えられるのを防ぎつつ（カプセル化）、エディタ上で調整が可能になります。
*   **`[System.Serializable]`**:
    *   自作のクラスや構造体につけることで、そのクラスをUnityが保存可能な形式（JSONなど）に変換できるようにします。これがないと、Inspectorに表示されず、セーブデータとしても保存できません。
*   **`[RequireComponent(typeof(T))]`**:
    *   スクリプトが動作するために必須となるコンポーネント（例: `ParticleSystem`）を指定します。
    *   この属性がついたスクリプトをGameObjectに追加すると、指定したコンポーネントも自動的に追加されます。また、誤って削除できなくなります。
    *   **メリット:** `GetComponent` で取得する際に「コンポーネントがない！」というエラー（NullReferenceException）を未然に防げます。
*   **`[DefaultExecutionOrder(order)]`**:
    *   スクリプトの `Awake`, `OnEnable`, `Start` などが呼ばれる順番を制御します。
    *   数値が小さいほど先に実行されます（デフォルトは0）。
    *   **メリット:** 「マネージャーが初期化される前に他のスクリプトがアクセスしてエラーになる」といったタイミング問題を解決できます。`ReactInputBridge` では `-100` に設定して早期初期化を行っています。
*   **`[ExecuteAlways]`**:
    *   通常、スクリプトはプレイモード中のみ動作しますが、この属性をつけるとエディタモード（編集画面）でも `Update` や `OnEnable` が実行されるようになります。
    *   **メリット:** `AspectRatioEnforcer` のように、ゲームを再生していなくても「黒帯」の表示を確認したい場合など、エディタ拡張的な挙動を実現できます。

---

## 4. Null条件演算子 (Null-conditional operator)

オブジェクトが `null` かどうかをチェックしてからアクセスする処理を、短く書くための演算子 `?.` です。

### 構文
```csharp
// 通常の書き方
if (interop != null) {
    interop.PlaySound("move");
}

// Null条件演算子を使った書き方
interop?.PlaySound("move");
```

### 解説
*   **意味:** 「もし `interop` が `null` でなければ `PlaySound` を実行する。`null` なら何もしない（nullを返す）」という処理です。
*   **メリット:** `NullReferenceException`（ぬるぽ）によるクラッシュを防ぐためのチェックを、1行で簡潔に書けます。

---

## 5. コルーチン (Coroutines)

処理を途中で一時停止し、次のフレームや指定時間後に再開できる特殊なメソッドです。非同期処理やアニメーション演出に使われます。

### 構文
```csharp
private IEnumerator LoadSceneAsync()
{
    // 処理A
    yield return new WaitForSeconds(1.0f); // 1秒待機
    // 処理B
}
```

### キーワード解説
*   **`IEnumerator` (インターフェース)**:
    *   このメソッドが「中断と再開が可能な処理（イテレータ）」であることを示します。
*   **`yield return ...`**:
    *   ここで処理を一時停止し、Unityに制御を返します。
    *   `new WaitForSeconds(1.0f)` なら「1秒後にここに戻ってきて」と予約します。
    *   `null` なら「次のフレーム（画面更新）でここに戻ってきて」となります。

### 仕組み
通常のメソッドは一度呼ばれると最後まで一気に実行されますが、コルーチンは `yield` の場所で「しおり」を挟んで本を閉じるような動きをします。Unityのゲームループが毎フレームその「しおり」を確認し、条件（時間が経ったか等）が満たされていれば、そこから続きを実行します。

---

## 6. コルーチンと async/await (Coroutines vs async/await)

非同期処理（時間をまたぐ処理）を行うための2つの主要な手法です。

### Unityコルーチン (Coroutines)
Unity独自の機能で、メインスレッドの更新ループ（Update）と連携して動作します。

*   **仕組み:** `IEnumerator` を返し、`yield return` で処理を中断・再開します。
*   **メリット:** フレーム単位の制御（`WaitForEndOfFrame`など）が簡単。Unityのライフサイクルと連動する（GameObjectが消えると止まる）。
*   **デメリット:** 戻り値を返すのが苦手。例外処理（try-catch）が効きにくい。

### async/await (Task / UniTask)
C#標準の非同期処理機能です。Unityでは `UniTask` というライブラリを使うのが一般的です。

*   **仕組み:** `Task` や `UniTask` を返し、`await` で完了を待ちます。
*   **メリット:** 戻り値を返せる。`try-catch` でエラーハンドリングができる。パフォーマンスが高い（UniTaskの場合）。
*   **デメリット:** Unityのライフサイクルとの連携に注意が必要（キャンセル処理など）。

### 使い分け
*   **コルーチン:** 演出、アニメーション、単純な待機処理。
*   **async/await:** 通信、ファイル読み込み、複雑な計算、戻り値が必要な処理。

---

## 7. プロパティ (Properties)

クラスのメンバー変数（フィールド）の値を読み書きするための、柔軟な仕組みです。外から見るとただの変数のように見えますが、内部的には「メソッド（関数）」として動作しています。

### 構文
```csharp
// フィールド（変数）
private int _score;

// プロパティ
public int Score
{
    get { return _score; }
    set { _score = value; }
}
```

### 変数（フィールド）との違い
*   **フィールド:** データを直接保存する場所です。`public` にすると、外部から無制限に書き換えられてしまいます。
*   **プロパティ:** データの「出入り口」です。値をセットする前にチェックしたり（例：HPは0未満にしない）、変更があったら通知したりできます。また、値を保持せずその場で計算して返すこともできます（例：`IsGameOver => hp <= 0;`）。

### 関数（メソッド）との違い
*   **メソッド:** 「動作」や「処理」を表します。呼び出すときに `()` が必要です（例：`Attack()`）。
*   **プロパティ:** 「状態」や「データ」を表します。`()` なしで変数のように扱えます（例：`Player.Hp`）。内部的には `get_Score()` や `set_Score(value)` というメソッドが作られていますが、C#ではこれを自然な構文で書けるようにしています。

---

## 8. LINQ (Language Integrated Query)

コレクション（配列やリスト）に対して、フィルタリング、並べ替え、変換などの操作を簡潔に書くための機能です。

### 構文
```csharp
var highScores = scores
    .Where(s => s.score > 1000)      // 1000点より大きいものだけ残す
    .OrderByDescending(s => s.score) // スコアの高い順に並べる
    .ToList();                       // リストに変換する
```

### 解説
*   **`Where`**: 条件に合う要素だけを抽出します（フィルタリング）。
*   **`OrderBy` / `OrderByDescending`**: 要素を並べ替えます（ソート）。
*   **`Select`**: 要素を別の形に変換します（マッピング）。
*   **`ToList` / `ToArray`**: 結果をリストや配列として確定させます。

---

## 9. プロパティの書き方と `init` アクセサ

### 改行とスペース
以下の2つの書き方は、C#コンパイラにとっては**全く同じ意味**です。

```csharp
// 1行で書く（一般的）
public int Score { get; private set; }

// 改行して書く
public int Score
{
    get;
    private set;
}
```
C#では改行やスペースは無視されるため、読みやすい方を選べますが、中身を書かない自動実装プロパティの場合は1行で書くのが標準的です。

### `get`, `set` 以外のアクセサ (`init`)
C# 9.0 から **`init`** というアクセサが追加されました。

```csharp
public int MaxHealth { get; init; }
```
*   **`set`**: いつでも値を変更できる。
*   **`private set`**: クラス内部からのみ変更できる。
*   **`init`**: **オブジェクトを作る瞬間（初期化時）だけ**値を設定でき、その後は変更不可能（読み取り専用）になる。「不変（Immutable）なデータ」を作るときに便利です。

---

## 10. クラスとプロパティの違い

### クラス (Class)
*   **「設計図」** です。ゲーム内の「モノ」や「概念」そのものを定義します。
*   例: `Player`（プレイヤーそのもの）, `GameManager`（ゲーム管理システム）。

### プロパティ (Property)
*   **「設計図の中の項目（特徴・状態）」** です。クラスが持つ「データ」へのアクセス方法を定義します。
*   例: `Player.Hp`（プレイヤーの体力）, `GameManager.CurrentScore`（現在のスコア）。
*   **関係性:** プロパティ単体では存在できず、必ずクラス（または構造体）の中に属する必要があります。

---

## 11. クラスと構造体 (Classes and Structs)

C#には、データと機能をまとめる型として「クラス (`class`)」と「構造体 (`struct`)」の2つがあります。

### 1. 役割と関数との違い
*   **クラス/構造体 (Class/Struct):**
    *   **「モノ・概念」** を表します（名詞）。
    *   データ（変数）と、それに関連する動作（関数）をひとまとめにした「設計図」です。
    *   例: `Player`（プレイヤー）、`Vector3`（座標）。
*   **関数 (Function/Method):**
    *   **「動作・処理」** を表します（動詞）。
    *   例: `Attack()`（攻撃する）、`CalculateScore()`（計算する）。

**なぜクラス/構造体を使うのか？**
関連するデータと処理をまとめることで、コードを**整理整頓**し、**再利用**しやすくするためです。
クラスがなければ、`player1Hp`, `player1X`, `player1Y`... のように大量の変数が散乱し、管理不能になります。

### 2. クラスと構造体の違い
見た目は似ていますが、メモリ上の扱いが大きく異なります。

| 特徴             | クラス (`class`)                 | 構造体 (`struct`)                              |
| :--------------- | :------------------------------- | :--------------------------------------------- |
| **型**           | **参照型** (Reference Type)      | **値型** (Value Type)                          |
| **メモリ配置**   | ヒープ (Heap)                    | スタック (Stack) ※例外あり                     |
| **代入時の挙動** | **参照**（住所）がコピーされる   | **値**（中身）が丸ごとコピーされる             |
| **デフォルト値** | `null`                           | 全フィールドが0/falseの状態                    |
| **継承**         | 可能                             | 不可 (インターフェース実装は可)                |
| **用途**         | プレイヤー、敵、マネージャーなど | 座標(`Vector3`)、色(`Color`)、矩形(`Rect`)など |

#### 参照型 vs 値型
*   **クラス (参照型):**
    *   変数は「データの実体がある場所（住所）」を持っています。
    *   `Player p1 = p2;` とすると、`p1` と `p2` は**同じ実体**を指します。`p1.Hp` を変えると `p2.Hp` も変わります。
*   **構造体 (値型):**
    *   変数は「データそのもの」を持っています。
    *   `Vector3 v1 = v2;` とすると、`v2` の中身が `v1` に**コピー**されます。`v1.x` を変えても `v2.x` は変わりません。

### 3. 使い分けの指針
基本的には **クラス (`class`)** を使用しますが、以下の条件に当てはまる場合は **構造体 (`struct`)** が適しています。

1.  **データが小さい:** 16バイト以下（例: `int` 4つ分程度）が目安。
2.  **不変性:** 作成後に値を頻繁に変更しない、または使い捨てのデータ。
3.  **継承不要:** 親クラスや子クラスを持つ必要がない。

**Unityでの例:**
*   **構造体:** `Vector3` (座標), `Quaternion` (回転), `Color` (色), `Rect` (矩形)
*   **クラス:** `GameObject`, `Transform`, `MonoBehaviour`, `List<T>`

---

## 12. ジェネリクス (Generics `<T>`)

クラスやメソッドを作る際に、**「扱うデータの型」をあえて決めずに、後から指定できるようにする機能**です。`<T>` という記号（型パラメータ）を使って表現します。

### 構文と例
```csharp
// 定義する側: 型を T として仮置きする
public class Box<T>
{
    public T Content;
}

// 使う側: 具体的な型（intやstring）を指定する
Box<int> numberBox = new Box<int>();
numberBox.Content = 123;

Box<string> stringBox = new Box<string>();
stringBox.Content = "Hello";
```

### Unityでの利用例
*   **`GetComponent<T>()`**: 「指定した型」のコンポーネントを取得します。
    *   `GetComponent<Rigidbody>()` -> Rigidbody型が返ってくる。
    *   `GetComponent<PlayerController>()` -> PlayerController型が返ってくる。
*   **`List<T>`**: 「指定した型」専用のリストを作ります。
    *   `List<string>` -> 文字列しか入れられないリスト。取り出す時も文字列として扱えるので安全です。

### メリット
1.  **型安全性:** 間違った型のデータを入れようとするとエラーになるため、バグを防げます。
2.  **再利用性:** 型ごとに別々のクラス（`IntList`, `StringList`...）を作る必要がなくなります。

---

## 13. Unityの MonoBehaviour (モノ・ビヘイビア)

Unityにおいて、**「ゲームオブジェクトにアタッチして動かすスクリプト」** が継承しなければならない特別な基底クラスです。

### 普通のクラスとの違い

| 特徴         | 普通のC#クラス (`class`) | MonoBehaviour継承クラス                                                   |
| :----------- | :----------------------- | :------------------------------------------------------------------------ |
| **生成方法** | `new MyClass()` で作る   | **`new` 禁止**。`AddComponent<MyScript>()` するか、Inspectorで貼り付ける  |
| **寿命管理** | ガベージコレクション任せ | Unityエンジンが管理（シーン遷移で破棄など）                               |
| **イベント** | 自分で呼ぶ必要がある     | `Start`, `Update`, `OnCollisionEnter` などを**Unityが自動で呼んでくれる** |
| **存在場所** | メモリ上のどこか         | 必ず**GameObjectにくっついている**（コンポーネントとして存在）            |

### 使い分け
*   **MonoBehaviour:** キャラクター、敵、UI、マネージャーなど、シーン上に存在してUnityのイベント（更新、衝突など）を受け取るもの。
*   **普通のクラス:** セーブデータ構造（`GameData`）、計算ロジック、定数管理など、GameObjectとして存在する必要がないもの。

---

## 14. static（静的）とインスタンス（非静的）

クラスのメンバー（変数やメソッド）が、**「個々のオブジェクトに属するか」**、**「クラスそのものに属するか」** の違いです。
一言で言うと、**「みんなで共有するもの（static）」** か **「個々人が持っているもの（インスタンス）」** かの違いです。

### 違いのイメージ
### わかりやすい例え：時計
*   **インスタンス変数 = 「個人の腕時計」**
    *   Aさんの時計とBさんの時計は別物です。Aさんが時間を合わせても、Bさんの時計は変わりません。
    *   `Player` クラスの `Hp` はこれです。プレイヤーAがダメージを受けても、プレイヤーBのHPは減りません。
*   **static変数 = 「教室の壁掛け時計」**
    *   クラス全員で1つの時計を共有します。誰かが時間をずらすと、全員にとっての時間が変わります。
    *   `GameManager.instance` や `Mathf.PI`（円周率）はこれです。世界に1つだけの情報や、共通のルールです。

| 特徴           | インスタンスメンバー (通常)                              | static メンバー (静的)                                        |
| :------------- | :------------------------------------------------------- | :------------------------------------------------------------ |
| **キーワード** | なし                                                     | `static`                                                      |
| **所属**       | **個々のオブジェクト** (Instance)                        | **クラス全体** (Class)                                        |
| **イメージ**   | **「個人の腕時計」**<br>Aさんの時計とBさんの時計は別物。 | **「教室の壁掛け時計」**<br>全員で1つの時計を共有する。       |
| **呼び出し方** | `player.Hp` (変数名.メンバー)                            | `Mathf.PI` (クラス名.メンバー)                                |
| **用途**       | HP、名前、座標など、個体ごとに違う値                     | 定数、便利関数(`Mathf`)、シングルトン(`GameManager.instance`) |

### コード例
### コードでの違い
```csharp
public class Player
{
    // インスタンス変数: プレイヤーごとに別々のHPを持つ
    public int Hp;

    // static変数: 全プレイヤーで共有される（例: サーバーの接続先）
    public static string ServerUrl;
}

// 使う時
Player p1 = new Player();
p1.Hp = 100; // p1のHP

Player.ServerUrl = "http://..."; // クラスから直接アクセス
```

---

## 15. インターフェース (interface)

クラスが **「どのような機能を持っているか（メソッドやプロパティ）」** という **「契約（ルール）」** だけを定義したものです。中身の処理（実装）は書きません。

### 役割
**「中身は違っても、使い方は同じ」** にするために使います（多態性・ポリモーフィズム）。

### コード例
```csharp
// 「ダメージを受けられる」という契約
public interface IDamageable
{
    void TakeDamage(int amount); // 「どう処理するか」は書かない
}

// 契約を守るクラス (Player)
public class Player : IDamageable
{
    public int Hp;
    // 契約通りに TakeDamage を実装する義務がある
    public void TakeDamage(int amount) { Hp -= amount; }
}

// 契約を守るクラス (Enemy)
public class Enemy : IDamageable
{
    public int Armor;
    // Enemyは防御力で軽減するかもしれない（実装は自由）
    public void TakeDamage(int amount) { /* ... */ }
}
```

### メリット
攻撃する側は、相手が `Player` なのか `Enemy` なのか `木箱` なのかを知らなくても、`IDamageable` さえ持っていれば `TakeDamage()` を呼ぶことができます。

---

## 16. デリゲートとイベント (Delegates and Events)

メソッド（関数）を変数に入れて持ち運んだり、他のクラスに「何かが起きたらこれを実行して」と依頼したりする仕組みです。

### 1. 「変数に関数を入れる」とは？ (Delegate)
通常、変数は `int a = 10;` のように数値を入れますが、デリゲートは **「メソッド（関数）を入れる変数」** です。

```csharp
// メソッドを入れるための「型」 (Actionは引数なし・戻り値なしのメソッド用)
Action myAction;

// メソッドを代入（変数に関数を入れる！）
myAction = TogglePause;

// 変数を使ってメソッドを実行
myAction(); // TogglePause() が動く
```

### 2. `+=` は何をしている？ (Event Registration)
イベントやデリゲートに対してメソッドを登録するには `+=` を使います。`GameManager.cs` で見かける以下のコードは、**「イベント通知リストへの登録」** を行っています。

```csharp
// GameManager.cs の例
// "Pause" アクションが実行されたら TogglePause メソッドを呼ぶように登録
playerInputActions.UI.Pause.performed += TogglePause;
```

### event キーワード
デリゲートをより安全に使うための修飾子です。`event` をつけると、外部からは「登録(`+=`)」と「解除(`-=`)」しかできなくなり、「上書き(`=`)」や「勝手に実行(`Invoke()`)」ができなくなります。
*   **`playerInputActions...performed`**: 「ポーズボタンが押された」というイベント（通知リスト）。
*   **`+=`**: 「リストに追加する」。
*   **`TogglePause`**: 実行したいメソッド。

つまり、「ポーズボタンが押されたら、私の TogglePause メソッドも呼んでください」 と予約しています。

### 3. なぜ `event` キーワードがついているのか？
`performed` などの定義元には `event` キーワードがついています。
デリゲートは単なる変数なので、そのままだと危険な操作ができてしまいます。`event` をつけることで、**安全装置** をかけます。

*   **`event` なし（危険）:**
    *   `myDelegate = MethodA;` （上書き！前に登録されていた他の人のメソッドが消える）
    *   `myDelegate.Invoke();` （勝手に実行！イベント発生元じゃないのに通知を送れてしまう）
*   **`event` あり（安全）:**
    *   `myEvent += MethodA;` （追加しかできない）
    *   `myEvent -= MethodA;` （削除しかできない）
    *   **外部からは「登録」と「解除」しかできなくなる** ため、安全に通知システムを作れます。

### コード例: 自作イベント
```csharp
public class Player
{
    // イベント定義: 外部は「聴く」ことしかできない
    // eventをつけることで、外部からは += と -= しかできなくなる
    public event Action<int> OnHpChanged;

    public void TakeDamage(int damage)
    {
        // イベント発火: 登録されている全員に通知を送る
        OnHpChanged?.Invoke(damage);
    }
}
```

---

## 17. ラムダ式 (Lambda Expressions)

メソッドをわざわざ定義せずに、その場限りの「名無しの関数」を書くための記法です。LINQやイベント登録で多用されます。

### 構文
` (引数) => { 処理 } `

### コード例
```csharp
// 通常の書き方（メソッド定義）
void UpdateUI(int hp) { text.text = hp.ToString(); }
player.OnHpChanged += UpdateUI;

// ラムダ式（その場で書く）
player.OnHpChanged += (hp) => {
    text.text = hp.ToString();
};

// LINQでの利用（引数が1つの場合カッコを省略可能、処理が1行なら{}とreturnを省略可能）
var highScores = scores.Where(s => s.value > 1000);
```

---

## 18. 文字列補間 (String Interpolation)

文字列の中に変数の値を直接埋め込むための、`$` を使った書き方です。

### コード例
```csharp
int score = 100;
string name = "Player";

// 昔の書き方
string msg1 = "Name: " + name + ", Score: " + score;
string msg2 = string.Format("Name: {0}, Score: {1}", name, score);

// 文字列補間（推奨）
string msg3 = $"Name: {name}, Score: {score}";
```

---

## 19. var (型推論)

変数の宣言時に、右辺（代入する値）から型が明らかな場合、型名を `var` と書いて省略できる機能です。

### コード例
```csharp
var score = 100;                // int と推論される
var name = "Player";            // string と推論される
var player = new Player();      // Player と推論される
var list = new List<string>();  // List<string> と推論される（長い型名を書かなくて済む）
```
**注意:** 型が何かわかりにくい場合（例: `var result = GetData();`）は、可読性のために明示的に型を書くことが推奨されます。

## 20. TryGetComponent と out 変数

コンポーネントを取得する際、存在するかどうかを確認してから取得する安全で高速なパターンです。

### 構文
```csharp
// 従来の書き方
var damageable = other.GetComponent<IDamageable>();
if (damageable != null)
{
    damageable.TakeDamage(1);
}

// TryGetComponentを使った書き方（推奨）
if (other.TryGetComponent<IDamageable>(out var damageable))
{
    damageable.TakeDamage(1);
}
```

### 解説
* **TryGetComponent**: コンポーネントがあれば true を返し、中身を out 引数に入れます。なければ false を返します。
* **out var 変数名**: メソッドの結果を受け取るための変数を、その場で宣言する機能です。
* **メリット**: GetComponent して null チェックするよりも処理が少し速く、コードもスッキリします。また、メモリ割り当て（GC Alloc）も抑えられます。

---

## 21. enum (列挙型)

複数の状態や種類などを、名前付きの定数としてひとまとめに定義する機能です。「魔法の数字（マジックナンバー）」を排除し、コードを読みやすく安全にするために使われます。

### 構文
```csharp
// ゲームの状態を定義する例
public enum GameState { Playing, Paused, GameOver, Menu }

// 変数として使用
private GameState currentState;

// 値の比較
if (currentState == GameState.Playing)
{
    // プレイ中の処理
}
```

### メリット
1.  **可読性:** `if (state == 0)` よりも `if (state == GameState.Playing)` の方が、何をしているか一目瞭然です。
2.  **安全性:** `GameState` 型の変数には、定義された値（`Playing`, `Paused` など）しか代入できないため、無効な値（例: `5`）が入るのを防げます。

---

## 22. switch ステートメント

1つの変数の値に応じて、処理を多方向に分岐させるための構文です。`if-else if` を何度も繰り返すよりも、コードがスッキリして見通しが良くなります。

### 構文
```csharp
// PlayerController.cs のレベルアップメッセージ処理の例
switch (weaponLevel)
{
    case 2:
        effectText = "BURST FIRE x2";
        break; // breakを忘れると次のcaseも実行されてしまうので注意
    case 3:
        effectText = "POWER UP";
        break;
    default: // どのcaseにも当てはまらない場合
        effectText = "";
        break;
}
```

### 解説
*   **`case 値:`**: 変数がこの値と一致した場合に、次の `break;` までの処理を実行します。
*   **`break;`**: `switch` 文を抜けます。C#では原則として必須です。
*   **`default:`**: どの `case` にも一致しなかった場合に実行されます。

---

## 23. 三項演算子 (Ternary Operator)

`if-else` 文を使わずに、条件に応じて値を切り替える式を1行で書くための演算子 `? :` です。

### 構文
`条件式 ? 真の場合の値 : 偽の場合の値`

### コード例
```csharp
// ReactInputBridge.cs の例
// GameManagerが存在すればその統計情報を、なければ新規作成して使う
var stats = GameManager.instance != null ? GameManager.instance.Data.stats : new PlayerStats();

// 通常の if-else で書いた場合
PlayerStats stats;
if (GameManager.instance != null) {
    stats = GameManager.instance.Data.stats;
} else {
    stats = new PlayerStats();
}
```

---

## 24. ネストされたクラス (Nested Classes)

クラスの中に定義されたクラスのことです。親クラスと密接に関係するデータ構造やヘルパークラスを定義する場合に使われます。

### コード例
```csharp
public class GameInterop
{
    // GameInterop 内部でのみ使用するデータ構造
    // private なので外部からは見えない（隠蔽）
    [System.Serializable]
    private class SettingsData
    {
        public int hp;
        public int sp;
        // ...
    }
}
```

### メリット
1.  **カプセル化:** そのクラス内部でしか使わない型を外部から隠すことができます。
2.  **整理整頓:** 関連する型を物理的に近くに配置でき、プロジェクトのファイル数が増えるのを防げます。