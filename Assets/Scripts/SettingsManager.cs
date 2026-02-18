using UnityEngine;

/// <summary>
/// ゲーム全体の環境設定（音量、振動など）を管理する静的クラス。
/// Unity標準の "PlayerPrefs" 機能を使用して、設定値をデバイスに保存（永続化）します。
/// staticクラスにすることで、インスタンス化せずにどこからでもアクセス可能にしています。
/// </summary>
public static class SettingsManager
{
    // PlayerPrefsで使用するキー定数
    // PlayerPrefs Keys
    /// <summary>BGM音量の保存キー</summary>
    private const string KEY_BGM_VOLUME = "BGM_VOLUME";

    /// <summary>SE音量の保存キー</summary>
    private const string KEY_SE_VOLUME = "SE_VOLUME";

    /// <summary>振動設定の保存キー</summary>
    private const string KEY_VIBRATION = "VIBRATION";

    /// <summary>
    /// 初期HPを取得します。GameManagerが存在しない場合はデフォルト値(3)を返します。
    /// </summary>
    public static int GetInitialHP()
    {
        if (GameManager.instance == null) return 3;
        return GameManager.instance.Data.settings.initialHp;
    }

    /// <summary>
    /// 初期HPを設定します。
    /// </summary>
    public static void SetInitialHP(int hp)
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.Data.settings.initialHp = hp;
        }
    }

    /// <summary>
    /// 初期SP（ボム数）を取得します。GameManagerが存在しない場合はデフォルト値(2)を返します。
    /// </summary>
    public static int GetInitialSP()
    {
        if (GameManager.instance == null) return 2;
        return GameManager.instance.Data.settings.initialSp;
    }

    /// <summary>
    /// 初期SP（ボム数）を設定します。
    /// </summary>
    public static void SetInitialSP(int sp)
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.Data.settings.initialSp = sp;
        }
    }

    /// <summary>
    /// オート連射が有効かどうかを取得します。
    /// </summary>
    public static bool IsAutofireEnabled()
    {
        if (GameManager.instance == null) return false;
        return GameManager.instance.Data.settings.autoFireEnabled;
    }

    /// <summary>
    /// オート連射の有効/無効を設定します。
    /// </summary>
    public static void SetAutofire(bool isEnabled)
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.Data.settings.autoFireEnabled = isEnabled;
        }
    }

    /// <summary>
    /// プレイヤー名を取得します。
    /// </summary>
    public static string GetPlayerName()
    {
        if (GameManager.instance == null) return "PLAYER";
        return GameManager.instance.Data.playerName ?? "PLAYER";
    }

    /// <summary>
    /// プレイヤー名を設定します。
    /// </summary>
    public static void SetPlayerName(string name)
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.Data.playerName = name;
        }
    }

    // --- グローバル設定 (PlayerPrefs) ---

    /// <summary>
    /// BGM音量を取得します (0-100)。デフォルトは80です。
    /// </summary>
    public static int GetBGMVolume()
    {
        // PlayerPrefs.GetInt(key, defaultValue):
        // 指定したキーで保存されている整数値を取得します。
        // キーが存在しない（まだ保存されていない）場合は、第2引数のデフォルト値（ここでは80）を返します。
        return PlayerPrefs.GetInt(KEY_BGM_VOLUME, 80); // デフォルト80
    }

    /// <summary>
    /// BGM音量を設定します (0-100)。
    /// </summary>
    public static void SetBGMVolume(int volume)
    {
        // Mathf.Clamp(value, min, max): 値を指定した最小値と最大値の間に制限します。
        // PlayerPrefs.SetInt(key, value): 指定したキーで整数値を保存します（この時点ではメモリ上への書き込み）。
        PlayerPrefs.SetInt(KEY_BGM_VOLUME, Mathf.Clamp(volume, 0, 100));
        // 即時保存せず、メモリ上の値のみ更新
    }

    /// <summary>
    /// SE音量を取得します (0-100)。デフォルトは100です。
    /// </summary>
    public static int GetSEVolume()
    {
        return PlayerPrefs.GetInt(KEY_SE_VOLUME, 100); // デフォルト100
    }

    /// <summary>
    /// SE音量を設定します (0-100)。
    /// </summary>
    public static void SetSEVolume(int volume)
    {
        PlayerPrefs.SetInt(KEY_SE_VOLUME, Mathf.Clamp(volume, 0, 100));
    }

    /// <summary>
    /// 振動機能が有効かどうかを取得します。デフォルトは有効(true)です。
    /// </summary>
    public static bool IsVibrationEnabled()
    {
        return PlayerPrefs.GetInt(KEY_VIBRATION, 1) == 1; // デフォルトON
    }

    /// <summary>
    /// 振動機能の有効/無効を設定します。
    /// </summary>
    public static void SetVibration(bool isEnabled)
    {
        PlayerPrefs.SetInt(KEY_VIBRATION, isEnabled ? 1 : 0);
    }

    /// <summary>
    /// PlayerPrefsの設定をディスクに保存（永続化）します。
    /// </summary>
    public static void Save()
    {
        // PlayerPrefs.Save(): メモリ上の変更内容をディスク（ファイル）に書き込んで永続化します。
        // ディスクI/Oが発生するため、頻繁に呼び出すとパフォーマンスに影響します。
        // そのため、設定画面を閉じるタイミングなどでまとめて呼び出すのが推奨されます。
        PlayerPrefs.Save();
    }
}