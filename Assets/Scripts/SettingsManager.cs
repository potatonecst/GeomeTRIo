using UnityEngine;

public static class SettingsManager
{
    //PlayerPrefsのキー
    private const string initialHPKey = "PlayerInitialHP";
    private const string initialSPKey = "PlayerInitialSP";
    private const string autofireKey = "AutofireEnabled";
    private const string playerNameKey = "PlayerName";

    //PlayerPrefsの初期値
    private const int defaultInitialHP = 3;
    private const int defaultInitilaSP = 3;
    private const int defaultAutofire = 0;
    private const string defaultPlayerName = "Player1";

    //初期HP取得
    public static int GetInitialHP()
    {
        return PlayerPrefs.GetInt(initialHPKey, defaultInitialHP);
    }

    //初期HP割り当て
    public static void SetInitialHP(int hp)
    {
        PlayerPrefs.SetInt(initialHPKey, hp);
    }

    //初期ボム数取得
    public static int GetInitialSP()
    {
        return PlayerPrefs.GetInt(initialSPKey, defaultInitilaSP);
    }

    //初期ボム数割り当て
    public static void SetInitialSP(int sp)
    {
        PlayerPrefs.SetInt(initialSPKey, sp);
    }

    //オート連射設定状況取得
    public static bool IsAutofireEnabled()
    {
        return PlayerPrefs.GetInt(autofireKey, defaultAutofire) == 1;
    }

    //オート連射設定状況割り当て
    public static void SetAutofire(bool isEnabled)
    {
        PlayerPrefs.SetInt(autofireKey, isEnabled ? 1 : 0);
    }

    //プレイヤーネーム取得
    public static string GetPlayerName()
    {
        return PlayerPrefs.GetString(playerNameKey, defaultPlayerName);
    }

    //プレイヤーネーム割り当て
    public static void SetPlayerName(string name)
    {
        PlayerPrefs.SetString(playerNameKey, name);
    }
}