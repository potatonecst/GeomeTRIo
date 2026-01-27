using UnityEngine;

public static class SettingsManager
{
    // PlayerPrefsで使用するキー定数
    // PlayerPrefs Keys
    private const string KEY_BGM_VOLUME = "BGM_VOLUME";
    private const string KEY_SE_VOLUME = "SE_VOLUME";
    private const string KEY_VIBRATION = "VIBRATION";
    private const string KEY_CRT_FILTER = "CRT_FILTER";

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
        if (GameManager.instance == null) return "PLAYER";
        return GameManager.instance.Data.playerName ?? "PLAYER";
    }

    //プレイヤーネーム割り当て
    public static void SetPlayerName(string name)
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.Data.playerName = name;
        }
    }

    // --- グローバル設定 (PlayerPrefs) ---

    // BGM音量 (0-100)
    public static int GetBGMVolume()
    {
        // PlayerPrefs.GetInt(key, defaultValue):
        // 指定したキーで保存されている整数値を取得します。
        // キーが存在しない（まだ保存されていない）場合は、第2引数のデフォルト値（ここでは80）を返します。
        return PlayerPrefs.GetInt(KEY_BGM_VOLUME, 80); // デフォルト80
    }

    public static void SetBGMVolume(int volume)
    {
        // Mathf.Clamp(value, min, max): 値を指定した最小値と最大値の間に制限します。
        // PlayerPrefs.SetInt(key, value): 指定したキーで整数値を保存します（この時点ではメモリ上への書き込み）。
        PlayerPrefs.SetInt(KEY_BGM_VOLUME, Mathf.Clamp(volume, 0, 100));
        // 即時保存せず、メモリ上の値のみ更新
    }

    // SE音量 (0-100)
    public static int GetSEVolume()
    {
        return PlayerPrefs.GetInt(KEY_SE_VOLUME, 100); // デフォルト100
    }

    public static void SetSEVolume(int volume)
    {
        PlayerPrefs.SetInt(KEY_SE_VOLUME, Mathf.Clamp(volume, 0, 100));
    }

    // 振動 (bool)
    public static bool IsVibrationEnabled()
    {
        return PlayerPrefs.GetInt(KEY_VIBRATION, 1) == 1; // デフォルトON
    }

    public static void SetVibration(bool isEnabled)
    {
        PlayerPrefs.SetInt(KEY_VIBRATION, isEnabled ? 1 : 0);
    }

    // CRTフィルタ (bool)
    public static bool IsCRTFilterEnabled()
    {
        return PlayerPrefs.GetInt(KEY_CRT_FILTER, 1) == 1; // デフォルトON
    }

    public static void SetCRTFilter(bool isEnabled)
    {
        PlayerPrefs.SetInt(KEY_CRT_FILTER, isEnabled ? 1 : 0);
    }

    // 設定をディスクに保存する
    public static void Save()
    {
        // PlayerPrefs.Save(): メモリ上の変更内容をディスク（ファイル）に書き込んで永続化します。
        // ディスクI/Oが発生するため、頻繁に呼び出すとパフォーマンスに影響します。
        // そのため、設定画面を閉じるタイミングなどでまとめて呼び出すのが推奨されます。
        PlayerPrefs.Save();
    }
}