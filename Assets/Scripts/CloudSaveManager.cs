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
    /// <summary>
    /// シングルトンインスタンス。どこからでもアクセス可能です。
    /// </summary>
    public static CloudSaveManager Instance { get; private set; }

    // 開発環境用 (Dev) のURL
    private const string API_URL_DEV = "https://yas8jqkch9.execute-api.ap-northeast-1.amazonaws.com/";

    // 本番環境用 (Prod) のURL
    private const string API_URL_PROD = "https://YOUR_API_ID_PROD.execute-api.ap-northeast-1.amazonaws.com/default/GeomeTRIo_Backend";

    /// <summary>
    /// 現在の環境（エディタ/開発ビルド か 本番ビルド）に応じて適切なAPIのエンドポイントURLを返します。
    /// </summary>
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

    /// <summary>
    /// インスタンスの初期化を行います。シングルトンパターンの実装を含みます。
    /// </summary>
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
    /// このトークンはサーバー側でユーザー認証に使用されます。
    /// </summary>
    /// <returns>認証トークン文字列</returns>
    /// <summary>
    /// 認証トークンを取得します。なければ生成してPlayerPrefsに保存します。
    /// </summary>
    private string GetAuthToken()
    {
        // PlayerPrefs.HasKey(key): 指定したキー（PREFS_AUTH_TOKEN）に対応するデータが保存されているか確認します。
        // 戻り値: 保存されていれば true、なければ false。
        if (!PlayerPrefs.HasKey(PREFS_AUTH_TOKEN))
        {
            // 新規トークン生成 (32文字のランダム文字列)
            // Guid.NewGuid(): 世界で唯一の識別子（GUID/UUID）を生成します。
            // ToString("N"): GUIDをハイフンなしの32桁の数字列（例: "d41d8cd98f00b204e9800998ecf8427e"）に変換します。
            // これを2つ繋げて、より長く予測困難なトークンにします。
            string token = Guid.NewGuid().ToString("N") + Guid.NewGuid().ToString("N");
            // PlayerPrefs.SetString(key, value): 指定したキーで文字列データを保存（メモリ上にセット）します。
            PlayerPrefs.SetString(PREFS_AUTH_TOKEN, token);
            // PlayerPrefs.Save(): メモリ上の変更をディスク（ファイル）に書き込んで確定させます。
            PlayerPrefs.Save();
        }
        // PlayerPrefs.GetString(key): 指定したキーで保存されている文字列を取得します。
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
        // 引数には実行したいコルーチンメソッド（SaveCoroutine）の戻り値を渡します。
        // 通信は時間がかかるため、メインスレッドを止めないようにコルーチンで行います。
        StartCoroutine(SaveCoroutine(userId, data, _lastUpdatedAt, callback));
    }

    /// <summary>
    /// 強制保存：排他制御（updatedAtチェック）を行わずに保存します。
    /// 競合が発生した際に、ユーザーが「自分のデータで上書きする」を選んだ場合に呼ばれます。
    /// </summary>
    /// <param name="userId">保存対象のユーザーID。</param>
    /// <param name="data">保存するゲームデータ。</param>
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

    /// <summary>
    /// 保存処理の実体となるコルーチン。
    /// データのシリアライズ、チェックサム計算、通信、リトライ処理を行います。
    /// </summary>
    /// <param name="userId">ユーザーID</param>
    /// <param name="data">ゲームデータ</param>
    /// <param name="prevUpdatedAt">前回の更新日時（排他制御用）。強制保存の場合はnull。</param>
    /// <param name="callback">完了コールバック</param>
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
            // 変更: オブジェクトに戻さず、JSON文字列のまま送信する
            // これにより、サーバー側での再シリアライズによる差異（浮動小数点の表記など）を防ぎ、チェックサム検証を確実に成功させます。
            saveData = jsonSaveData,
            checksum = checksum,
            // ここで前回の更新日時を送信します。サーバーはこれを見て「データが古くないか」を判断します。
            prevUpdatedAt = prevUpdatedAt
        };

        // JsonConvert.SerializeObject: C#のオブジェクトをJSON形式の文字列に変換します。
        // 引数: 変換したいオブジェクト（ここでは requestBody）。
        // 戻り値: JSON文字列。
        string jsonBody = JsonConvert.SerializeObject(requestBody);
        // Encoding.UTF8.GetBytes: 文字列をバイト配列に変換します。通信で送信するために必要です。
        // UnityWebRequestでデータを送る際は、文字列ではなくバイト配列にする必要があります。
        byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonBody);

        // リトライループ
        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++)
        {
            // usingステートメント: ブロックを抜けた時に自動的に Dispose() を呼び出し、メモリを解放します。
            // UnityWebRequest はネイティブのリソースを使うため、確実に解放する必要があります。
            // これを忘れるとメモリリークの原因になります。
            // new UnityWebRequest(url, method): 指定したURLとHTTPメソッド（"POST"）でリクエストを作成します。
            using (UnityWebRequest www = new UnityWebRequest(ApiUrl, "POST"))
            {
                // uploadHandler: 送信するデータを管理するハンドラを設定します。
                // new UploadHandlerRaw(byte[]): バイト配列を生データとして送信するためのハンドラを作成します。
                www.uploadHandler = new UploadHandlerRaw(bodyRaw);
                // downloadHandler: 受信するデータを管理するハンドラを設定します。
                // new DownloadHandlerBuffer(): 受信データをメモリ上のバッファ（文字列など）として保持するハンドラを作成します。
                www.downloadHandler = new DownloadHandlerBuffer();
                // SetRequestHeader(name, value): HTTPリクエストヘッダーを設定します。
                // "Content-Type": "application/json" は、送信するデータがJSON形式であることをサーバーに伝えます。
                www.SetRequestHeader("Content-Type", "application/json");

                Debug.Log($"[CloudSave] Uploading... (Attempt {attempt}/{MAX_RETRIES})");

                // SendWebRequest: リクエストを送信し、完了するまで待機（yield return）します。
                // 戻り値は AsyncOperation で、これ自体は非同期操作を表します。
                yield return www.SendWebRequest();

                // www.result: 通信の結果状態を表します。
                // UnityWebRequest.Result.Success: 通信が成功したことを示します。
                if (www.result == UnityWebRequest.Result.Success)
                {
                    // www.downloadHandler.text: サーバーから返ってきたレスポンスボディを文字列として取得します。
                    Debug.Log($"[CloudSave] Save Success: {www.downloadHandler.text}");
                    // 保存成功したら、サーバーから返ってきた新しい updatedAt を更新する
                    try
                    {
                        // JsonConvert.DeserializeObject<T>(json): JSON文字列を指定した型（LoadResponse）のオブジェクトに変換（デシリアライズ）します。
                        // レスポンスのJSONをパースして、新しい更新日時を取得・保持します。
                        // これにより、次回のセーブも正常に行えるようになります。
                        var response = JsonConvert.DeserializeObject<LoadResponse>(www.downloadHandler.text);
                        // string.IsNullOrEmpty(value): 文字列が null または 空文字("") かどうかを判定します。
                        if (response != null && !string.IsNullOrEmpty(response.updatedAt))
                        {
                            _lastUpdatedAt = response.updatedAt;
                        }
                    }
                    catch (Exception e)
                    {
                        // JSONパースに失敗してもセーブ自体は成功しているので、エラーにはしない。
                        // ただし、次のセーブでコンフリクトが起きる可能性が高まるため、警告ログは出す。
                        // Debug.LogWarning(message): 警告レベルのログ（黄色）を表示します。
                        // e.Message: 例外のエラーメッセージを取得します。
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
                    // www.responseCode: サーバーから返されたHTTPステータスコード（200, 404, 500など）を取得します。
                    if (www.responseCode == 409)
                    {
                        Debug.LogWarning("[CloudSave] Conflict detected (409).");
                        // エラーメッセージとして "Conflict" を返し、GameManager側でダイアログを出せるようにします。
                        // 第1引数 (bool): false (失敗)
                        // 第2引数 (string): "Conflict" (競合エラーを示す文字列)
                        callback?.Invoke(false, "Conflict");
                        yield break; // リトライしない
                    }

                    // www.error: 通信エラーの内容（テキスト）を取得します。
                    Debug.LogWarning($"[CloudSave] Save Failed (Attempt {attempt}): {www.error} : {www.downloadHandler.text}");
                    if (attempt < MAX_RETRIES)
                    {
                        // WaitForSeconds(seconds): 指定した秒数だけ待機します。
                        // リトライ前に少し待つことで、一時的なネットワーク障害の回復を待ちます。
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
    /// <param name="userId">読み込むユーザーID</param>
    /// <param name="callback">
    /// 完了時のコールバック。
    /// bool: 成功(true)/失敗(false)。
    /// GameData: 読み込んだデータ（失敗時はnull）。
    /// </param>
    public void Load(string userId, Action<bool, GameData> callback)
    {
        StartCoroutine(LoadCoroutine(userId, callback));
    }

    /// <summary>
    /// 読み込み処理の実体となるコルーチン。
    /// </summary>
    /// <param name="userId">読み込むユーザーID</param>
    /// <param name="callback">完了時のコールバック</param>
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

                            // サニタイズ処理: DynamoDBの仕様(空文字->null)や、JSONデシリアライズによるnull上書きを補正します。
                            if (loadedData != null)
                            {
                                // 1. playerName
                                // クラス定義で "PLAYER" と初期化していても、JSONに "playerName": null が含まれていると
                                // デシリアライズ時に null で上書きされてしまいます。
                                if (loadedData.playerName == null) loadedData.playerName = "";

                                // 2. リスト (ランキングデータ)
                                // 空のリストが null として扱われる可能性があるため、nullなら空リストで初期化します。
                                if (loadedData.stage1Scores == null) loadedData.stage1Scores = new List<ScoreRecord>();
                                if (loadedData.scoreAttackScores == null) loadedData.scoreAttackScores = new List<ScoreRecord>();

                                // 3. リスト内の文字列 (date)
                                // 構造体内の文字列も null になる可能性があるためチェックします。
                                SanitizeScoreList(loadedData.stage1Scores);
                                SanitizeScoreList(loadedData.scoreAttackScores);
                            }

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
    /// <param name="userId">削除するユーザーID</param>
    /// <param name="callback">完了時のコールバック（成功: true, 失敗: false）</param>
    public void Delete(string userId, Action<bool> callback = null)
    {
        StartCoroutine(DeleteCoroutine(userId, callback));
    }

    /// <summary>
    /// 削除処理の実体となるコルーチン。
    /// </summary>
    /// <param name="userId">削除するユーザーID</param>
    /// <param name="callback">完了時のコールバック</param>
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

    /// <summary>
    /// スコアリスト内のnull文字をサニタイズするヘルパーメソッド（構造体内の文字列用）。
    /// DynamoDBからロードした際にnullになっている文字列フィールドを空文字に変換します。
    /// </summary>
    /// <param name="list">サニタイズ対象のスコアリスト</param>
    private void SanitizeScoreList(List<ScoreRecord> list)
    {
        // list.Count: リストに含まれる要素の数を取得します。
        for (int i = 0; i < list.Count; i++)
        {
            var record = list[i];
            if (record.date == null)
            {
                record.date = "";
                // 構造体（struct）は値型なので、変数 record を変更してもリストの中身は変わりません。
                // 変更した record をリストの元の位置に代入し直す必要があります。
                list[i] = record;
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

    /// <summary>
    /// オブジェクトを「キーをアルファベット順にソートしたJSON文字列」に変換します。
    /// サーバー側とクライアント側でJSONのキー順序が異なるとチェックサムが一致しないため、
    /// 順序を保証するために使用します。
    /// </summary>
    /// <param name="obj">シリアライズ対象のオブジェクト</param>
    /// <returns>ソート済みのJSON文字列</returns>
    private string StableJsonSerialize(object obj)
    {
        // JsonSerializerSettings: JSON変換時の詳細な設定を行うクラスです。
        var settings = new JsonSerializerSettings
        {
            // ContractResolver: JSONのプロパティ（キー）をどのように処理するかを決める設定です。
            // ここでは自作の AlphabeticalContractResolver を指定して、キーをアルファベット順にソートさせます。
            ContractResolver = new AlphabeticalContractResolver(),
            // Formatting.None: 改行やインデントを入れず、1行の文字列にします（データサイズ削減のため）。
            Formatting = Formatting.None,
            // NullValueHandling.Ignore: 値が null のプロパティはJSONに出力しないようにします。
            NullValueHandling = NullValueHandling.Ignore
        };
        // Converters.Add: 特定の型（ここではlong型）の変換処理をカスタマイズするコンバーターを追加します。
        settings.Converters.Add(new LongToStringConverter()); // long型を文字列として出力するコンバーターを追加

        // JsonConvert.SerializeObject(obj, settings): 設定を適用してオブジェクトをJSON文字列に変換します。
        return JsonConvert.SerializeObject(obj, settings);
    }

    /// <summary>
    /// HMAC-SHA256 アルゴリズムを使用してデータのチェックサム（署名）を計算します。
    /// </summary>
    /// <param name="dataString">署名対象のデータ文字列</param>
    /// <param name="key">秘密鍵（認証トークン）</param>
    /// <returns>計算されたハッシュ値（16進数文字列）</returns>
    private string CalculateChecksum(string dataString, string key)
    {
        // Encoding.UTF8.GetBytes(string): 文字列をバイト配列に変換します。ハッシュ計算はバイト単位で行われるためです。
        byte[] keyBytes = Encoding.UTF8.GetBytes(key);
        byte[] dataBytes = Encoding.UTF8.GetBytes(dataString);

        // HMACSHA256: SHA256ハッシュ関数を使用したHMAC（Hash-based Message Authentication Code）計算クラスです。
        // 秘密鍵（keyBytes）を使って、データの改竄を検知するための署名を作成します。
        // new HMACSHA256(keyBytes): 指定された秘密鍵を使って、計算機を初期化（作成）します。
        // この鍵を知っている人（クライアントとサーバー）だけが、同じハッシュ値を計算できます。
        // usingを使うことで、計算終了後に暗号化リソースを確実に破棄します。
        using (HMACSHA256 hmac = new HMACSHA256(keyBytes))
        {
            // ComputeHash(byte[]): データのハッシュ値を計算します。戻り値はバイト配列です。
            byte[] hashBytes = hmac.ComputeHash(dataBytes);

            // BitConverter.ToString(byte[]): バイト配列を "A1-B2-C3..." のようなハイフン区切りの16進数文字列に変換します。
            // Replace("-", ""): ハイフンを削除して "A1B2C3..." にします。
            // ToLower(): 小文字 "a1b2c3..." に変換します（サーバー側の実装と合わせるため）。
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }

    /// <summary>
    /// JSONシリアライズ時にプロパティをアルファベット順にソートするためのリゾルバー。
    /// <para>
    /// <b>なぜクラスを作る必要があるのか？</b><br/>
    /// Newtonsoft.Jsonライブラリの仕様上、シリアライズのルール（ContractResolver）を変更するには、
    /// <c>IContractResolver</c> インターフェースを実装したクラス（またはその派生クラス）のインスタンスを渡す必要があるためです。
    /// 単なる関数ではなく、クラスとして定義し、特定のメソッド（CreateProperties）をオーバーライド（上書き）することで、
    /// ライブラリの内部動作をカスタマイズする仕組みになっています。
    /// </para>
    /// </summary>
    private class AlphabeticalContractResolver : DefaultContractResolver
    {
        /// <summary>
        /// クラスのプロパティ一覧を作成するメソッドをオーバーライド（上書き）します。
        /// </summary>
        /// <param name="type">シリアライズ対象の型。</param>
        /// <param name="memberSerialization">メンバーのシリアライズ設定。</param>
        /// <returns>順序付けされたプロパティのリスト。</returns>
        // protected: このクラスと、これを継承したクラスからしかアクセスできないようにします。
        // override: 親クラス（DefaultContractResolver）にある同名のメソッドを、このクラス専用の処理で上書きします。
        protected override IList<JsonProperty> CreateProperties(Type type, MemberSerialization memberSerialization)
        {
            // base.CreateProperties: 親クラス（DefaultContractResolver）の標準的なプロパティ取得処理を呼び出します。
            // OrderBy(p => p.PropertyName): 取得したプロパティリストを、名前（PropertyName）のアルファベット順に並べ替えます。
            // ToList(): 結果をリスト形式に変換して返します。
            return base.CreateProperties(type, memberSerialization).OrderBy(p => p.PropertyName).ToList();
        }
    }

    /// <summary>
    /// long型を文字列としてJSON化するためのコンバーター。
    /// JavaScript(Node.js)のNumber型は 2^53 までしか扱えず、C#のlong(Ticksなど)をそのまま送ると
    /// 精度落ちやオーバーフローエラー(MAX_SAFE_INTEGER超過)が発生するため、文字列として送受信します。
    /// </summary>
    private class LongToStringConverter : JsonConverter
    {
        /// <summary>
        /// このコンバーターが、指定された型に対応しているかどうかを判定します。
        /// </summary>
        /// <param name="objectType">判定対象の型。</param>
        /// <returns>long型 または long?型 なら true。</returns>
        public override bool CanConvert(Type objectType)
        {
            // typeof(long): long型、 typeof(long?): Null許容long型に対応します。
            return objectType == typeof(long) || objectType == typeof(long?);
        }

        /// <summary>
        /// C#のオブジェクト（long値）をJSONに書き込む時の処理です。
        /// </summary>
        /// <param name="writer">JSONを書き込むためのライター。</param>
        /// <param name="value">変換対象の値（ここではlong型の数値）。</param>
        /// <param name="serializer">シリアライザ本体。</param>
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            // writer.WriteValue: 値をJSONに書き込みます。
            // value.ToString(): long型の数値を文字列に変換してから書き込みます（例: 123 -> "123"）。
            writer.WriteValue(value.ToString());
        }

        /// <summary>
        /// JSONからC#のオブジェクト（long値）を読み込む時の処理です。
        /// </summary>
        /// <param name="reader">JSONを読み込むためのリーダー。</param>
        /// <param name="objectType">変換先の型（long）。</param>
        /// <param name="existingValue">既存の値。</param>
        /// <param name="serializer">シリアライザ本体。</param>
        /// <returns>変換後のオブジェクト（long型の数値）。</returns>
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            // reader.TokenType: 現在読み込んでいるJSONトークンの種類（文字列、数値など）を確認します。
            // 文字列として来ている場合 ("123") -> long.Parse で数値に戻します。
            if (reader.TokenType == JsonToken.String) return long.Parse((string)reader.Value);
            // 数値として来ている場合 (123) -> Convert.ToInt64 でlong型に変換します。
            if (reader.TokenType == JsonToken.Integer) return Convert.ToInt64(reader.Value);
            return 0L;
        }
    }
}
