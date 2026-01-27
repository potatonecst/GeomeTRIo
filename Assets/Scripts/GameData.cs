using System.Collections.Generic;

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

[System.Serializable]
public struct PlayerSettings
{
    public int initialHp;
    public int initialSp;
    public bool autoFireEnabled;

    // 初期値を設定するコンストラクタ
    public PlayerSettings(int hp = 3, int sp = 3)
    {
        initialHp = hp;
        initialSp = sp;
        autoFireEnabled = false;
    }
}

// プレイヤーの累積統計データ
[System.Serializable]
public struct PlayerStats
{
    public float totalPlayTime;       // 総プレイ時間（秒）
    public int totalEnemiesDefeated;  // 総撃破数
    public int totalGamesPlayed;      // 総プレイ回数（ステージ開始回数）
    public int totalDamageTaken;      // 総被ダメージ量
    public int totalShotsFired;       // 総発射弾数
}

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