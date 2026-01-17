# 4. データ保存とUIシステム

ランキングや設定を永続化（保存）する仕組みと、Singletonパターンを用いたUI更新、そしてInput Systemを用いたUIナビゲーションについて解説します。

## データの保存方法：JSONシリアライズ

このプロジェクトでは、すべてのユーザーデータ（設定、ランキング、統計）を **JSON形式** で一元管理しています。

### 変更点：PlayerPrefsの廃止とGameDataへの統合
以前は設定値（HP、SPなど）を `PlayerPrefs` で管理していましたが、現在は `GameData` クラスに統合しました。
これにより、以下のメリットがあります。
1. **データの一元管理:** 設定、スコア、進行状況を1つのファイル (`.sav`) で管理できます。
2. **整合性の確保:** ランキング記録時に「そのスコアを出した時の設定」を正確に保存・比較できます。

### データ構造 (GameData)
`GameData` クラスは、ゲームの全永続化データを保持するルートオブジェクトです。`[System.Serializable]` 属性をつけることで、`JsonUtility` による変換を可能にしています。

```csharp
[System.Serializable] // これをつけると保存可能になる
public class GameData
{
    public string playerName = "Player";
    
    // プレイヤー設定 (HP, SP, AutoFire)
    public PlayerSettings settings = new PlayerSettings(3, 3);
    
    // プレイ統計
    public PlayerStats stats = new PlayerStats();
    
    // ランキングデータ
    public List<ScoreRecord> stage1Scores = new List<ScoreRecord>();
    public List<ScoreRecord> scoreAttackScores = new List<ScoreRecord>();
}
```

**保存処理 (FileStream):**
C#標準の `BinaryFormatter` を使用して、クラスのインスタンスをバイト列に変換し、ファイル（`.sav`）として保存します。

```csharp
public void SaveGame(GameData data)
{
    // 保存先のパス（OSによって異なるが、Unityが自動で適切な場所を選んでくれる）
    string path = Application.persistentDataPath + "/savedata.sav";
    
    // usingを使うことで、処理が終わった後に自動的にファイルを閉じてくれる（重要！）
    using (FileStream stream = new FileStream(path, FileMode.Create))
    {
        BinaryFormatter formatter = new BinaryFormatter();
        formatter.Serialize(stream, data);
    }
}
```
**注意:** `Application.persistentDataPath` は、Windowsなら `AppData`、Macなら `Library/Application Support` など、アプリが書き込み権限を持つ安全なフォルダを指します。

## UIの更新とObserverパターン

HPが減ったとき、HPゲージのUIはどうやってそれを知るのでしょうか？
`Update()` で毎フレームHPをチェックするのは無駄が多いです。

ここで **Observer（観察者）パターン** や **C# Action（イベント）** を使います。

### 実装例

**PlayerController側:**
```csharp
// HPが変化したことを通知するイベント
public event Action<int> OnHpChanged;

public void TakeDamage(int damage)
{
    currentHp -= damage;
    // イベント発火！登録しているUIに通知を送る
    OnHpChanged?.Invoke(currentHp);
}
```

**UIManager側:**
```csharp
// Playerのイベントを購読（Subscribe）する
player.OnHpChanged += UpdateHpGauge;

// 【重要】オブジェクトが破壊されるときに購読を解除しないとエラーの原因になる
private void OnDestroy()
{
    if (player != null)
        player.OnHpChanged -= UpdateHpGauge;
}

private void UpdateHpGauge(int newHp)
{
    // ここでUIを書き換える
    hpText.text = "HP: " + newHp;
}
```

これにより、**「HPが変化した瞬間だけ」** UI更新処理が走るため、非常に効率的です。
