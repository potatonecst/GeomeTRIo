using UnityEngine;
using UnityEngine.Networking;
using System;
using System.Collections;
using System.Text;
using System.Security.Cryptography;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

/// <summary>
/// AWS Lambda + DynamoDB と通信してクラウドセーブを行うクラス。
/// ローカルファイルは作成せず、メモリ上のデータをクラウドと同期します。
/// </summary>
public class CloudSaveManager : MonoBehaviour
{
    public static CloudSaveManager Instance { get; private set; }

    // AWS API GatewayのURL (デプロイ後に取得したURLに書き換えてください)
    private const string API_URL = "https://YOUR_API_ID.execute-api.ap-northeast-1.amazonaws.com/default/GeomeTRIo_Backend";

    // 認証用トークンをローカル(PlayerPrefs)に保存しておくためのキー
    // セーブデータ自体は保存しませんが、本人確認用の「鍵」だけは保存します。
    private const string PREFS_AUTH_TOKEN = "CloudSave_AuthToken";

    // リトライ設定
    private const int MAX_RETRIES = 3;
    private const float RETRY_DELAY = 1.0f;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    /// <summary>
    /// 認証トークンを取得します。なければ生成してPlayerPrefsに保存します。
    /// </summary>
    private string GetAuthToken()
    {
        if (!PlayerPrefs.HasKey(PREFS_AUTH_TOKEN))
        {
            // 新規トークン生成 (32文字のランダム文字列)
            string token = Guid.NewGuid().ToString("N") + Guid.NewGuid().ToString("N");
            PlayerPrefs.SetString(PREFS_AUTH_TOKEN, token);
            PlayerPrefs.Save();
        }
        return PlayerPrefs.GetString(PREFS_AUTH_TOKEN);
    }

    /// <summary>
    /// セーブデータをクラウドに保存します。
    /// </summary>
    public void Save(string userId, GameData data, Action<bool, string> callback = null)
    {
        StartCoroutine(SaveCoroutine(userId, data, callback));
    }

    private IEnumerator SaveCoroutine(string userId, GameData data, Action<bool, string> callback)
    {
        string authToken = GetAuthToken();

        // 1. GameDataを「キーでソートされたJSON」に変換
        // サーバー側のチェックサム計算と一致させるため、必ずアルファベット順に並べ替えます。
        string jsonSaveData = StableJsonSerialize(data);

        // 2. チェックサム計算 (HMAC-SHA256)
        string checksum = CalculateChecksum(jsonSaveData, authToken);

        // 3. リクエストボディ作成
        var requestBody = new
        {
            action = "save",
            userId = userId,
            authToken = authToken,
            saveData = JsonConvert.DeserializeObject(jsonSaveData), // オブジェクトとして埋め込む
            checksum = checksum
        };

        string jsonBody = JsonConvert.SerializeObject(requestBody);
        byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonBody);

        // リトライループ
        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++)
        {
            using (UnityWebRequest www = new UnityWebRequest(API_URL, "POST"))
            {
                www.uploadHandler = new UploadHandlerRaw(bodyRaw);
                www.downloadHandler = new DownloadHandlerBuffer();
                www.SetRequestHeader("Content-Type", "application/json");

                Debug.Log($"[CloudSave] Uploading... (Attempt {attempt}/{MAX_RETRIES})");

                yield return www.SendWebRequest();

                if (www.result == UnityWebRequest.Result.Success)
                {
                    Debug.Log($"[CloudSave] Save Success: {www.downloadHandler.text}");
                    callback?.Invoke(true, null);
                    yield break; // 成功したら終了
                }
                else
                {
                    Debug.LogWarning($"[CloudSave] Save Failed (Attempt {attempt}): {www.error} : {www.downloadHandler.text}");
                    if (attempt < MAX_RETRIES)
                    {
                        yield return new WaitForSeconds(RETRY_DELAY);
                    }
                    else
                    {
                        callback?.Invoke(false, www.error);
                    }
                }
            }
        }
    }

    /// <summary>
    /// クラウドからデータを読み込みます。
    /// </summary>
    public void Load(string userId, Action<bool, GameData> callback)
    {
        StartCoroutine(LoadCoroutine(userId, callback));
    }

    private IEnumerator LoadCoroutine(string userId, Action<bool, GameData> callback)
    {
        string authToken = GetAuthToken();

        var requestBody = new
        {
            action = "load",
            userId = userId,
            authToken = authToken
        };

        string jsonBody = JsonConvert.SerializeObject(requestBody);
        byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonBody);

        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++)
        {
            using (UnityWebRequest www = new UnityWebRequest(API_URL, "POST"))
            {
                www.uploadHandler = new UploadHandlerRaw(bodyRaw);
                www.downloadHandler = new DownloadHandlerBuffer();
                www.SetRequestHeader("Content-Type", "application/json");

                Debug.Log($"[CloudSave] Downloading... (Attempt {attempt}/{MAX_RETRIES})");

                yield return www.SendWebRequest();

                if (www.result == UnityWebRequest.Result.Success)
                {
                    Debug.Log($"[CloudSave] Load Response: {www.downloadHandler.text}");
                    try
                    {
                        var response = JsonConvert.DeserializeObject<LoadResponse>(www.downloadHandler.text);

                        if (response.data == null)
                        {
                            // 新規ユーザー（データなし）
                            callback?.Invoke(true, null);
                        }
                        else
                        {
                            // GameDataに変換
                            string dataJson = JsonConvert.SerializeObject(response.data);
                            GameData loadedData = JsonConvert.DeserializeObject<GameData>(dataJson);
                            callback?.Invoke(true, loadedData);
                        }
                    }
                    catch (Exception e)
                    {
                        Debug.LogError($"[CloudSave] Parse Error: {e.Message}");
                        callback?.Invoke(false, null);
                    }
                    yield break;
                }
                else
                {
                    Debug.LogWarning($"[CloudSave] Load Failed (Attempt {attempt}): {www.error}");
                    if (attempt < MAX_RETRIES)
                    {
                        yield return new WaitForSeconds(RETRY_DELAY);
                    }
                    else
                    {
                        callback?.Invoke(false, null);
                    }
                }
            }
        }
    }

    /// <summary>
    /// クラウド上のデータを削除します。
    /// </summary>
    public void Delete(string userId, Action<bool> callback = null)
    {
        StartCoroutine(DeleteCoroutine(userId, callback));
    }

    private IEnumerator DeleteCoroutine(string userId, Action<bool> callback)
    {
        string authToken = GetAuthToken();
        var requestBody = new { action = "delete", userId = userId, authToken = authToken };
        string jsonBody = JsonConvert.SerializeObject(requestBody);
        byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonBody);

        using (UnityWebRequest www = new UnityWebRequest(API_URL, "POST"))
        {
            www.uploadHandler = new UploadHandlerRaw(bodyRaw);
            www.downloadHandler = new DownloadHandlerBuffer();
            www.SetRequestHeader("Content-Type", "application/json");

            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.Success)
            {
                Debug.Log($"[CloudSave] Delete Success");
                callback?.Invoke(true);
            }
            else
            {
                Debug.LogError($"[CloudSave] Delete Error: {www.error}");
                callback?.Invoke(false);
            }
        }
    }

    // レスポンス用クラス
    private class LoadResponse
    {
        public string message;
        public object data;
        public string error;
    }

    // キーをアルファベット順にソートしてJSON化
    private string StableJsonSerialize(object obj)
    {
        var settings = new JsonSerializerSettings
        {
            ContractResolver = new AlphabeticalContractResolver(),
            Formatting = Formatting.None,
            NullValueHandling = NullValueHandling.Ignore
        };
        return JsonConvert.SerializeObject(obj, settings);
    }

    // HMAC-SHA256 でチェックサムを計算
    private string CalculateChecksum(string dataString, string key)
    {
        byte[] keyBytes = Encoding.UTF8.GetBytes(key);
        byte[] dataBytes = Encoding.UTF8.GetBytes(dataString);

        using (HMACSHA256 hmac = new HMACSHA256(keyBytes))
        {
            byte[] hashBytes = hmac.ComputeHash(dataBytes);
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }

    // ソート用リゾルバー
    private class AlphabeticalContractResolver : DefaultContractResolver
    {
        protected override IList<JsonProperty> CreateProperties(Type type, MemberSerialization memberSerialization)
        {
            return base.CreateProperties(type, memberSerialization).OrderBy(p => p.PropertyName).ToList();
        }
    }
}
