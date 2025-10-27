using UnityEngine;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Collections.Generic;

public static class SaveSystem
{
    private static string saveFileName = "/savedata.sav";

    //すべてのランキングを保存する関数
    public static void SaveGameData(GameData data)
    {
        BinaryFormatter formatter = new BinaryFormatter();
        string path = Application.persistentDataPath + saveFileName;
        FileStream stream = new FileStream(path, FileMode.Create);

        //GameDataを丸ごとバイナリに変換して保存
        formatter.Serialize(stream, data);
        stream.Close();
    }

    //すべてのランキングを読み込む関数
    public static GameData LoadGameData()
    {
        string path = Application.persistentDataPath + saveFileName;
        if (File.Exists(path))
        {
            BinaryFormatter formatter = new BinaryFormatter();
            FileStream stream = new FileStream(path, FileMode.Open);

            //ファイルからGameDataを丸ごと復元
            GameData data = formatter.Deserialize(stream) as GameData;
            stream.Close();

            return data;
        }
        else
        {
            //セーブファイルがなければ、空のDictionaryを返す
            return new GameData();
        }
    }

    public static void DeleteSaveData()
    {
        string path = Application.persistentDataPath + saveFileName;
        if (File.Exists(path))
        {
            File.Delete(path);
        }

        GameManager.instance?.InitializeGameData(); //空の新しいGameDataで上書き
    }
}