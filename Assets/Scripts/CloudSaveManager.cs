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

    // 開発環境用 (Dev) のURL
    private const string API_URL_DEV = "https://YOUR_API_ID_DEV.execute-api.ap-northeast-1.amazonaws.com/default/GeomeTRIo_Backend";

    // 本番環境用 (Prod) のURL
    private const string API_URL_PROD = "https://YOUR_API_ID_PROD.execute-api.ap-northeast-1.amazonaws.com/default/GeomeTRIo_Backend";

    // 現在の環境に応じて適切なURLを返すプロパティ
    private string ApiUrl
    {
        get
        {
#if UNITY_EDITOR || DEVELOPMENT_BUILD
            return API_URL_DEV; // エディタ上や開発ビルドではDev環境を使用
#else
            return API_URL_PROD; // リリースビルドでは本番環境を使用
#endif
        }
    }

    // 認証用トークンをローカル(PlayerPrefs)に保存しておくためのキー
    // セーブデータ自体は保存しませんが、本人確認用の「鍵」だけは保存します。
    private const string PREFS_AUTH_TOKEN = "CloudSave_AuthToken";

    // リトライ設定
    private const int MAX_RETRIES = 3;
    private const float RETRY_DELAY = 1.0f;

    // サーバーから受け取った最終更新日時（排他制御用）。
    // データをロードした時や、セーブに成功した時にサーバーから返される "updatedAt" をここに保持します。
    // 次回のセーブ時にこれを "prevUpdatedAt" として送信し、「誰か他の人が更新していないか？」を確認します。
    private string _lastUpdatedAt;

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
    /// 内部で保持している _lastUpdatedAt を送信し、整合性チェック（楽観的ロック）を行います。
    /// </summary>
    /// <param name="userId">保存対象のユーザーID。</param>
    /// <param name="data">保存するゲームデータ（GameDataクラスのインスタンス）。</param>
    /// <param name="callback">
    /// 処理完了時に呼び出されるコールバック関数 (Actionデリゲート)。
    /// <list type="bullet">
    /// <item><strong>arg1 (bool)</strong>: 処理結果。成功なら <c>true</c>、失敗なら <c>false</c>。</item>
    /// <item><strong>arg2 (string)</strong>: エラー内容。成功時は <c>null</c>。失敗時はエラーメッセージ（例: "Conflict", "Network Error"）。※時間は入りません。</item>
    /// </list>
    /// </param>
    public void Save(string userId, GameData data, Action<bool, string> callback = null)
    {
        // StartCoroutine: コルーチン（非同期処理）を開始するUnityのメソッドです。
        // 通信は時間がかかるため、メインスレッドを止めないようにコルーチンで行います。
        StartCoroutine(SaveCoroutine(userId, data, _lastUpdatedAt, callback));
    }

    /// <summary>
    /// 強制保存：排他制御（updatedAtチェック）を行わずに保存します。
    /// 競合が発生した際に、ユーザーが「自分のデータで上書きする」を選んだ場合に呼ばれます。
    /// </summary>
    /// <param name="callback">
    /// 完了時のコールバック。
    /// bool: 成功(true)/失敗(false)。
    /// string: エラーメッセージ(失敗時) または null(成功時)。
    /// </param>
    public void ForceSave(string userId, GameData data, Action<bool, string> callback = null)
    {
        // prevUpdatedAt に null を渡すことで、サーバー側の整合性チェックをスキップさせます。
        StartCoroutine(SaveCoroutine(userId, data, null, callback));
    }

    private IEnumerator SaveCoroutine(string userId, GameData data, string prevUpdatedAt, Action<bool, string> callback)
    {
        string authToken = GetAuthToken();

        // 1. GameDataを「キーでソートされたJSON」に変換
        // サーバー側のチェックサム計算と一致させるため、必ずアルファベット順に並べ替えます。
        string jsonSaveData = StableJsonSerialize(data);

        // 2. チェックサム計算 (HMAC-SHA256)
        string checksum = CalculateChecksum(jsonSaveData, authToken);

        // 3. リクエストボディ作成
        // 匿名型 (new { ... }) を使って、送信するJSONの構造を定義します。
        var requestBody = new
        {
            action = "save",
            userId = userId,
            authToken = authToken,
            // JsonConvert.DeserializeObject: JSON文字列を一度オブジェクトに戻して埋め込みます。
            // これにより、二重エンコード（JSONの中にJSON文字列が入る状態）を防ぎ、きれいなJSON構造にします。
            saveData = JsonConvert.DeserializeObject(jsonSaveData), // オブジェクトとして埋め込む
            checksum = checksum,
            // ここで前回の更新日時を送信します。サーバーはこれを見て「データが古くないか」を判断します。
            prevUpdatedAt = prevUpdatedAt
        };

        // JsonConvert.SerializeObject: C#のオブジェクトをJSON形式の文字列に変換します。
        string jsonBody = JsonConvert.SerializeObject(requestBody);
        // Encoding.UTF8.GetBytes: 文字列をバイト配列に変換します。通信で送信するために必要です。
        byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonBody);

        // リトライループ
        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++)
        {
            // usingステートメント: ブロックを抜けた時に自動的に Dispose() を呼び出し、メモリを解放します。
            // UnityWebRequest はネイティブのリソースを使うため、確実に解放する必要があります。
            // これを忘れるとメモリリークの原因になります。
            using (UnityWebRequest www = new UnityWebRequest(ApiUrl, "POST"))
            {
                www.uploadHandler = new UploadHandlerRaw(bodyRaw);
                www.downloadHandler = new DownloadHandlerBuffer();
                www.SetRequestHeader("Content-Type", "application/json");

                Debug.Log($"[CloudSave] Uploading... (Attempt {attempt}/{MAX_RETRIES})");

                // SendWebRequest: リクエストを送信し、完了するまで待機（yield return）します。
                yield return www.SendWebRequest();

                if (www.result == UnityWebRequest.Result.Success)
                {
                    Debug.Log($"[CloudSave] Save Success: {www.downloadHandler.text}");
                    // 保存成功したら、サーバーから返ってきた新しい updatedAt を更新する
                    try
                    {
                        // レスポンスのJSONをパースして、新しい更新日時を取得・保持します。
                        // これにより、次回のセーブも正常に行えるようになります。
                        var response = JsonConvert.DeserializeObject<LoadResponse>(www.downloadHandler.text);
                        if (response != null && !string.IsNullOrEmpty(response.updatedAt))
                        {
                            _lastUpdatedAt = response.updatedAt;
                        }
                    }
                    catch (Exception e)
                    {
                        // JSONパースに失敗してもセーブ自体は成功しているので、エラーにはしない。
                        // ただし、次のセーブでコンフリクトが起きる可能性が高まるため、警告ログは出す。
                        Debug.LogWarning($"[CloudSave] Failed to parse save response to get updatedAt: {e.Message}");
                    }

                    // コールバックを呼び出して成功を通知します。
                    // ?.Invoke: callbackがnullでない場合のみ実行します。
                    // 第1引数 (bool): true (成功)
                    // 第2引数 (string): null (エラーなし)
                    callback?.Invoke(true, null);
                    yield break; // 成功したら終了
                }
                else
                {
                    // HTTPステータスコード 409 (Conflict) は、データの競合を意味します。
                    // サーバー側で「送信された prevUpdatedAt が、現在のDBの updatedAt と一致しない」と判断された場合です。
                    if (www.responseCode == 409)
                    {
                        Debug.LogWarning("[CloudSave] Conflict detected (409).");
                        // エラーメッセージとして "Conflict" を返し、GameManager側でダイアログを出せるようにします。
                        // 第1引数 (bool): false (失敗)
                        // 第2引数 (string): "Conflict" (競合エラーを示す文字列)
                        callback?.Invoke(false, "Conflict");
                        yield break; // リトライしない
                    }

                    Debug.LogWarning($"[CloudSave] Save Failed (Attempt {attempt}): {www.error} : {www.downloadHandler.text}");
                    if (attempt < MAX_RETRIES)
                    {
                        yield return new WaitForSeconds(RETRY_DELAY);
                    }
                    else
                    {
                        // リトライ回数を超えた場合、最終的なエラーを通知
                        // 第2引数には www.error (Unityが生成したエラーメッセージ) が入ります。
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
            using (UnityWebRequest www = new UnityWebRequest(ApiUrl, "POST"))
            {
                www.uploadHandler = new UploadHandlerRaw(bodyRaw);
                www.downloadHandler = new DownloadHandlerBuffer();
                www.SetRequestHeader("Content-Type", "application/json");

                Debug.Log($"[CloudSave] Downloading... (Attempt {attempt}/{MAX_RETRIES})");

                // SendWebRequest: リクエストを送信し、完了するまで待機（yield return）します。
                yield return www.SendWebRequest();

                if (www.result == UnityWebRequest.Result.Success)
                {
                    Debug.Log($"[CloudSave] Load Response: {www.downloadHandler.text}");
                    try
                    {
                        var response = JsonConvert.DeserializeObject<LoadResponse>(www.downloadHandler.text);
                        _lastUpdatedAt = response.updatedAt; // 最終更新日時を保持

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

        using (UnityWebRequest www = new UnityWebRequest(ApiUrl, "POST"))
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
        public string updatedAt;
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
