using System.Collections.Generic; //Listのため

//すべてのデータをまとめる親クラス
[System.Serializable]
public class GameData
{
    //全ステージのランキング情報
    public Dictionary<string, RankingData> rankings;

    //プレイヤーの統計情報
    public PlayerStats playerStats;

    //コンストラクタ。セーブデータがない場合に備えて中身を空の状態で初期化しておく
    public GameData()
    {
        rankings = new Dictionary<string, RankingData>();
        playerStats = new PlayerStats();
    }
}

//スコアとプレイヤーネームのペア
[System.Serializable]
public struct ScoreEntry
{
    public int score;
    public string playerName;
}

//ステージ毎のランキング
[System.Serializable]
public class RankingData
{
    //トップ5を保存するためのリスト
    public List<ScoreEntry> scores = new List<ScoreEntry>();
}

//統計情報を保存するためのクラス
[System.Serializable]
public class PlayerStats
{
    public float totalPlayTime;
    public int totalEnemiesDefeated;
    public int totalTimesPlayed;
}