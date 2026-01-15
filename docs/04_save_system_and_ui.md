# 4. データ保存とUIシステム

ランキングや設定を永続化（保存）する仕組みと、Observerパターンを用いた効率的なUI更新、そしてInput Systemを用いたUIナビゲーションについて解説します。

## データの保存方法：PlayerPrefs vs バイナリシリアライズ

このプロジェクトでは、保存するデータの種類によって2つの方法を使い分けています。

### 1. PlayerPrefs (設定用)
簡単な設定値（音量、画面設定など）の保存に適しています。

```csharp
// 使用しているキー一覧
const string KEY_INITIAL_HP = "InitialHP";   // 初期HP (Default: 3)
const string KEY_INITIAL_SP = "InitialSP";   // 初期SP (Default: 3)
const string KEY_AUTO_FIRE = "AutoFire";     // オート連射 (0:Off, 1:On)
const string KEY_PLAYER_NAME = "PlayerName"; // プレイヤー名

// 例：読み込み
int hp = PlayerPrefs.GetInt(KEY_INITIAL_HP, 3);
```

### 2. バイナリシリアライズ (ランキング・統計用)
ランキングのような複雑な構造（リストやクラス）を保存する場合、PlayerPrefsは不向きです。クラスをそのままファイルに書き出す「シリアライズ」を使用します。

**GameDataクラス:**
```csharp
[System.Serializable] // これをつけると保存可能になる
public class GameData
{
    public List<int> highScores = new List<int>();
    public string playerName;
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
