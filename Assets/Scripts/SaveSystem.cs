using UnityEngine;
using System.IO;

public static class SaveSystem
{
    // 指定したファイル名で保存する
    public static void Save(string fileName, GameData data)
    {
        // 1. 保存先のフルパスを作成
        string path = Path.Combine(Application.persistentDataPath, fileName);

        // 2. GameDataをJSON文字列に変換 (第2引数trueで読みやすく整形)
        string json = JsonUtility.ToJson(data, true);

        // 3. ファイルを書き込み
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
            return JsonUtility.FromJson<GameData>(json);
        }

        // ファイルがない場合はnullを返す（呼び出し側で新規作成を判断するため）
        return null;
    }

    // 指定したファイルを削除する
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