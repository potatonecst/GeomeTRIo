using System.Collections.Generic;

// [System.Serializable]: この属性をつけることで、Unityがこのクラスのデータを
// ファイルに保存したり、Inspectorウィンドウで表示・編集したりできるようになります。
// これがないと、JsonUtility.ToJson() を使っても中身が空っぽになってしまいます。
[System.Serializable]
public class GameData
{
    // 基本情報
    public string playerName = "Player";

    // まとめる：プレイヤー設定 (初期値 HP:3, SP:3 を保証するためにコンストラクタを使用)
    public PlayerSettings settings = new PlayerSettings(3, 3);

    // まとめる：プレイ統計
    public PlayerStats stats = new PlayerStats();

    // ランキングデータ
    public List<ScoreRecord> stage1Scores = new List<ScoreRecord>();
    public List<ScoreRecord> scoreAttackScores = new List<ScoreRecord>();
}

// プレイヤーの設定項目をまとめた構造体
// struct (構造体): クラスと似ていますが、データそのものを保持する軽量な型です。
[System.Serializable]
public struct PlayerSettings
{
    public int initialHp;
    public int initialSp;
    public bool autoFireEnabled;

    // 初期値を設定するコンストラクタ
    public PlayerSettings(int hp = 3, int sp = 2)
    {
        initialHp = hp;
        initialSp = sp;
        autoFireEnabled = false;
    }
}

// プレイヤーの累積統計データ（プレイ時間や撃破数など）
// ゲームプレイの積み重ねを記録するためのデータ構造です。
[System.Serializable]
public struct PlayerStats
{
    public float totalPlayTime;       // 総プレイ時間（秒）
    public int totalEnemiesDefeated;  // 総撃破数
    public int totalGamesPlayed;      // 総プレイ回数（ステージ開始回数）
    public int totalDamageTaken;      // 総被ダメージ量
    public int totalDamageDealt;      // 総与ダメージ量
    public int totalShotsFired;       // 総発射弾数
    // long型: 64bit整数。最大値は約922京。
    // int型(約21億)では、熱心なプレイヤーが累計スコアをカンストさせてしまう恐れがあるため、
    // より大きな数値を扱えるlong型を採用しています。
    public long totalScore;           // 累計スコア
    public int totalSpUsed;           // SP使用回数
    public int totalChainKills;       // 誘爆撃破数
    public int itemsCollected;        // アイテム取得数
}

// スコアの記録データ
[System.Serializable]
public struct ScoreRecord
{
    public int score;
    public string date;
    // スコアを出した時の条件を記録
    public int hp;
    public int sp;
    public bool autoFire;
}