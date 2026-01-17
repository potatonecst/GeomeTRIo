using UnityEngine;

public static class SettingsManager
{
    //初期HP取得
    public static int GetInitialHP()
    {
        if (GameManager.instance == null) return 3;
        return GameManager.instance.Data.settings.initialHp;
    }

    //初期HP割り当て
    public static void SetInitialHP(int hp)
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.Data.settings.initialHp = hp;
        }
    }

    //初期ボム数取得
    public static int GetInitialSP()
    {
        if (GameManager.instance == null) return 3;
        return GameManager.instance.Data.settings.initialSp;
    }

    //初期ボム数割り当て
    public static void SetInitialSP(int sp)
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.Data.settings.initialSp = sp;
        }
    }

    //オート連射設定状況取得
    public static bool IsAutofireEnabled()
    {
        if (GameManager.instance == null) return false;
        return GameManager.instance.Data.settings.autoFireEnabled;
    }

    //オート連射設定状況割り当て
    public static void SetAutofire(bool isEnabled)
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.Data.settings.autoFireEnabled = isEnabled;
        }
    }

    //プレイヤーネーム取得
    public static string GetPlayerName()
    {
        if (GameManager.instance == null) return "Player";
        return GameManager.instance.Data.playerName;
    }

    //プレイヤーネーム割り当て
    public static void SetPlayerName(string name)
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.Data.playerName = name;
        }
    }
}