# 1. 全体設計とゲームマネージャー

このドキュメントでは、GeomeTRIoの全体的な構造、シングルトンパターンの詳細な実装理由、そしてゲームバランスを司る難易度管理システムについて、コードの行間にある意図まで含めて解説します。

## アーキテクチャの概要

Unityでのゲーム開発では、各オブジェクト（自機、敵、UIなど）が独立して動くだけでなく、それらを統括する「監督」のような存在が必要です。このプロジェクトでは、以下のような構成になっています。

- **GameManager:** ゲーム全体の状態（プレイ中、ゲームオーバー、スコア計算）を管理する監督。
- **PlayerController:** 自機の操作を担当。
- **EnemySpawner:** 敵の出現タイミングと生成を担当。
- **UIManager:** スコア表示やHPゲージの更新を担当。

## シングルトンパターン (Singleton Pattern)

`GameManager` には、**シングルトン (Singleton)** というデザインパターンが採用されることが一般的です。

### なぜシングルトンを使うのか？
ゲーム中、スコアやゲームの状態を管理するマネージャーは「世界に一つだけ」である必要があります。もし `GameManager` が2つあると、どちらのスコアが正しいのか分からなくなってしまいます。
また、どのスクリプトからでも `GameManager.Instance.AddScore(10)` のように簡単にアクセスできるようにするためです。

### 実装のポイント

```csharp
public class GameManager : MonoBehaviour
{
    // static変数として自分自身を保持する
    public static GameManager Instance { get; private set; }

    private void Awake()
    {
        // すでに他のGameManagerが存在していたら、自分を破壊して重複を防ぐ
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        
        Instance = this;
        
        // シーン遷移してもこのオブジェクトを維持したい場合は以下を有効化します。
        // 今回は各ステージごとにリセットするため、コメントアウトしています。
        // DontDestroyOnLoad(gameObject);
    }
}
```

**初心者のための解説:**
- `static`: クラスそのものに属する変数です。インスタンス化（`new`）しなくてもアクセスできます。
- `Awake()`: `Start()` よりも先に呼ばれるUnityのイベント関数です。初期化処理はここに書くのが定石です。

## ゲームループと状態管理

ゲームには「状態（State）」があります。

1. **Playing (プレイ中):** 自機が動き、敵が出る。
2. **GameOver (ゲームオーバー):** 操作を受け付けず、リザルト画面を出す。
3. **Pause (一時停止):** 時間を止める（`Time.timeScale = 0`）。

これを `enum`（列挙型）で管理するとコードが読みやすくなります。

```csharp
public enum GameState { Playing, GameOver, Pause }
public GameState CurrentState { get; private set; }
```

## 難易度管理システム (Difficulty Scaling)

本プロジェクトでは、`EnemySpawner` がゲームの経過時間を監視し、動的に難易度を調整しています。

### 実装ロジック
- **タイマー:** `Update()` 内で `Time.deltaTime` を加算し、経過時間を計測。
- **強化間隔:** **90秒** ごとに敵のステータスを強化。
- **強化内容:** 敵のHPを `+1` ずつ加算。

```csharp
private float difficultyTimer;
private int difficultyLevel = 0;

private void Update()
{
    if (GameManager.Instance.CurrentState != GameState.Playing) return;

    difficultyTimer += Time.deltaTime;
    if (difficultyTimer >= 90f) // 90秒ごとに強化
    {
        difficultyTimer = 0;
        difficultyLevel++;
        // 生成する敵のHPを difficultyLevel 分だけ加算する処理へ
    }
}
```

この設計により、エンドレスモード（スコアアタック）において、プレイヤーが生き残るほどゲームが難しくなる仕組みを実現しています。
```
