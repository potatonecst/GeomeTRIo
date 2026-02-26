using UnityEngine;
using System.IO;

/// <summary>
/// セーブデータの読み書き（I/O）を担当する静的クラス。
/// データの構造（GameData）には関知せず、JSON文字列への変換とファイルへの書き込みのみを行います。
/// </summary>
public static class SaveSystem
{
    // 指定したファイル名で保存する
    public static void Save(string fileName, GameData data)
    {
        // 1. 保存先のフルパスを作成
        // Application.persistentDataPath: アプリがデータを保存するためにOSから許可された安全なフォルダのパス。
        // Windowsなら AppData, Macなら Library/Application Support など、環境に合わせて自動的に変わります。
        // Path.Combine: パスの区切り文字（\ や /）をOSに合わせて適切に結合してくれます。
        string path = Path.Combine(Application.persistentDataPath, fileName);

        // 2. GameDataをJSON文字列に変換 (第2引数trueで読みやすく整形)
        // JsonUtility: Unity標準のJSONシリアライザ。高速ですが、Dictionaryなどが扱えない制限があります。
        string json = JsonUtility.ToJson(data, true);

        // 3. ファイルを書き込み
        // File.WriteAllText: 指定したパスに文字列を書き込みます。ファイルがなければ作成し、あれば上書きします。
        File.WriteAllText(path, json);

#if UNITY_EDITOR
        Debug.Log($"[Save] Data saved to: {path}");
#endif
    }

    // 指定したファイル名から読み込む
    public static GameData Load(string fileName)
    {
        string path = Path.Combine(Application.persistentDataPath, fileName);

        if (File.Exists(path))
        {
            // 1. JSON文字列を読み込む
            string json = File.ReadAllText(path);

            // 2. JSONをGameDataクラスのインスタンスに変換
            // FromJson<T>: JSON文字列を解析して、指定した型（T）のオブジェクトを生成します。
            return JsonUtility.FromJson<GameData>(json);
        }

        // ファイルがない場合はnullを返す（呼び出し側で新規作成を判断するため）
        return null;
    }

    // 指定したファイルを削除する
    // 今回追加された「セーブデータ削除」機能で使用されます。
    public static void DeleteSaveData(string fileName)
    {
        string path = Path.Combine(Application.persistentDataPath, fileName);
        if (File.Exists(path))
        {
            File.Delete(path);
#if UNITY_EDITOR
            Debug.Log($"[Delete] File deleted: {path}");
#endif
        }
    }
}