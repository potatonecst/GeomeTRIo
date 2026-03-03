// AWS SDK (Software Development Kit) のモジュールを読み込みます。
// v3では必要な機能だけを個別にインポートできるため、アプリのサイズを小さく保てます。

// Node.js 標準の暗号化モジュール。ハッシュ値（チェックサム）の計算に使用します。
import { createHmac } from "crypto";
// DynamoDBClient: AWSのデータベース「DynamoDB」と通信するための基本的なクライアントです。
// これがAWSとの接続窓口になります。
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// DynamoDBDocumentClient, PutCommand, GetCommand:
// DynamoDBをより扱いやすくするための便利なツール群です。
// - DynamoDBDocumentClient: データをJavaScriptのオブジェクト(JSON)としてそのまま保存・取得できるようにするラッパー（包み込む）ライブラリ。
//   通常、DynamoDBは {"S": "文字列"} のような特殊な形式でデータを扱いますが、これを使うと普通の {"name": "文字列"} で扱えます。
// - PutCommand: データを「置く（保存・上書き）」ための命令セット。
// - GetCommand: データを「取得する」ための命令セット。
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
// json-stable-stringify: オブジェクトのキーをソートしてからJSON文字列に変換するライブラリ。
// これにより、クライアントとサーバーでキーの順序が違っても、必ず同じ文字列が生成され、チェックサムが安定します。
import stringify from "json-stable-stringify";

// DynamoDBクライアントの初期化
// region: "ap-northeast-1" はAWSの「東京リージョン（データセンター）」を指定しています。
// 物理的に近い場所を指定することで、通信速度が速くなります。
const client = new DynamoDBClient({ region: "ap-northeast-1" });

// DocumentClientの作成
// 先ほど作成した基本クライアント(client)を、より使いやすいDocumentClientに変換します。
// これ以降は、この 'docClient' を使ってデータベース操作を行います。
const docClient = DynamoDBDocumentClient.from(client);

// テーブル名 (AWSコンソールで作成したものと合わせる)
const TABLE_NAME = "GeomeTRIo_SaveData";

// Unityから送られてくるデータの型定義
// C#のGameDataクラスと構造を合わせる必要はありませんが、
// 最低限「何をしたいか(action)」「誰のデータか(userId)」「本人確認(authToken)」が必要です。
interface RequestBody {
    action: "save" | "load"; // "save"なら保存、"load"なら読み込み
    userId: string;          // ユーザーを一意に識別するID (UUIDなど)
    authToken: string;       // セキュリティ対策: 本人確認用のトークン（パスワードのようなもの）
    saveData?: any;          // 保存時のみ使用。C#のGameDataがそのままJSONとして入る
    checksum?: string;       // 改竄防止用のチェックサム
}

// Lambda関数のエントリーポイント（入り口）
// AWS Lambdaは、インターネットからリクエストが来ると、この 'handler' 関数を実行します。
// async: この関数が「非同期処理（通信待ちなどが発生する）」であることを宣言します。
// event: API Gatewayから渡されたリクエスト情報（URL、HTTPメソッド、ヘッダー、ボディなど）が全部詰まっています。
export const handler = async (event: any) => {
    // ログ出力: AWS CloudWatch Logsというサービスで確認できます。
    // 何かトラブルがあった時、どんなデータが送られてきたかを確認するために重要です。
    console.log("Event:", JSON.stringify(event, null, 2));

    try {
        // API Gatewayからのリクエストボディをパース
        // event.body は「JSON形式の文字列」として送られてくるため、
        // プログラムで扱える「JavaScriptのオブジェクト」に変換（パース）します。
        const body: RequestBody = JSON.parse(event.body);

        // 分割代入 (Destructuring assignment):
        // bodyオブジェクトの中から、action, userId, authToken, saveData という名前のプロパティを取り出し、
        // 同名の変数に代入しています。
        const { action, userId, authToken, saveData, checksum } = body;

        // --- バリデーション（入力チェック） ---

        // ユーザーIDがないと誰のデータかわからないのでエラー(400 Bad Request)を返します。
        if (!userId) {
            return { statusCode: 400, body: JSON.stringify({ message: "Missing userId" }) };
        }
        // トークンがないリクエストは「認証エラー(401 Unauthorized)」として拒否します。
        if (!authToken) {
            return { statusCode: 401, body: JSON.stringify({ message: "Missing authToken" }) };
        }

        // --- アクションによる処理の分岐 ---

        if (action === "save") {
            // --- 保存処理 ---

            // セーブデータの中身が空の場合はエラー
            if (!saveData) {
                return { statusCode: 400, body: JSON.stringify({ message: "Missing saveData" }) };
            }
            // チェックサムがない場合はエラー
            if (!checksum) {
                return { statusCode: 400, body: JSON.stringify({ message: "Missing checksum" }) };
            }

            // 現在時刻の取得
            const now = new Date();

            // TTL (Time To Live: 生存期間) の計算
            // ゲストユーザーのデータが増え続けるのを防ぐため、1年後に自動削除されるようにします。
            // DynamoDBのTTL機能は「秒単位のUnixタイムスタンプ（1970年1月1日からの経過秒数）」で指定する必要があります。
            // now.getTime() はミリ秒なので 1000 で割って秒にし、そこに1年分の秒数(365日 * 24時間 * 60分 * 60秒)を足します。
            const oneYearLater = Math.floor(now.getTime() / 1000) + (365 * 24 * 60 * 60);

            // --- セキュリティチェック: 上書き権限の確認 ---
            // いきなり保存するのではなく、まず現在のデータを取得して、トークンが正しいかチェックします。
            // これにより、他人が勝手にデータを上書きするのを防ぎます。

            // GetCommand: データを取得する命令を作成
            const getCommand = new GetCommand({
                TableName: TABLE_NAME,
                Key: { userId: userId } // 検索キー: userId
            });

            // docClient.send: 命令をAWSに送信し、結果が返ってくるまで待ちます(await)。
            const currentData = await docClient.send(getCommand);

            // データが既に存在し(currentData.Item)、かつ保存されているトークンと送られてきたトークンが一致しない場合
            // -> 「なりすまし」と判断してエラー(403 Forbidden)を返します。
            if (currentData.Item && currentData.Item.authToken !== authToken) {
                return {
                    statusCode: 403,
                    body: JSON.stringify({ message: "Invalid authToken. You cannot overwrite this data." })
                };
            }

            // --- 改竄チェック: チェックサムの検証 ---
            // サーバー側でチェックサムを計算します。
            // 重要: JSONのキーの順序は保証されないため、クライアントとサーバーで同じ文字列を生成する必要があります。
            // 通常の JSON.stringify では {"a":1, "b":2} と {"b":2, "a":1} が別の文字列になりますが、
            // json-stable-stringify を使うことで、キーがアルファベット順にソートされ、必ず同じ文字列になります。
            // これにより、データの中身が同じなら必ず同じチェックサムが生成されることが保証されます。
            // || "" は、万が一 stringify が undefined を返した場合のフォールバック（安全策）です。
            const dataString = stringify(saveData) || "";

            // createHmac: ハッシュ値を計算するためのオブジェクトを作成します。
            // 'sha256': ハッシュアルゴリズム。
            // authToken: 秘密鍵。リクエストごとに異なるため、第三者が偽造するのが困難になります。
            // update(dataString): ハッシュ化したいデータを渡します。
            // digest('hex'): 計算結果を16進数の文字列として取得します。
            const expectedChecksum = createHmac('sha256', authToken)
                .update(dataString)
                .digest('hex');

            // クライアントから送られてきたチェックサムと、サーバーで計算したものが一致しない場合
            // -> 通信経路でデータが書き換えられたか、不正なリクエストであると判断してエラーを返します。
            if (checksum !== expectedChecksum) {
                return {
                    statusCode: 403,
                    body: JSON.stringify({ message: "Invalid checksum. Data may be tampered." })
                };
            }

            // --- データの保存 ---

            // PutCommand: データを「置く（保存・上書き）」命令を作成します。
            const command = new PutCommand({
                TableName: TABLE_NAME,
                // Item: 保存するデータの中身
                Item: {
                    userId: userId,          // 誰のデータか (Partition Key)
                    authToken: authToken,    // 次回チェック用のトークンも一緒に保存
                    data: saveData,          // ゲームデータ本体
                    updatedAt: now.toISOString(), // 更新日時 (文字列)
                    expiresAt: oneYearLater  // 有効期限 (TTL)
                }
            });

            // AWSに保存命令を送信して、完了を待ちます。
            await docClient.send(command);

            // 成功したら 200 OK を返します。
            return { statusCode: 200, body: JSON.stringify({ message: "Save successful" }) };

        } else if (action === "load") {
            // --- 読み込み処理 ---

            // GetCommand: データを「取得」する命令を作成します。
            const command = new GetCommand({
                TableName: TABLE_NAME,
                // Key: どのデータを取得するか指定します（userIdが一致するもの）
                Key: {
                    userId: userId
                }
            });

            // AWSに取得命令を送信して、結果を待ちます。
            const response = await docClient.send(command);

            // response.Item にデータが入っていれば、データが見つかったということです。
            if (response.Item) {
                // --- セキュリティチェック ---
                // 読み込み時もトークンをチェックし、他人が勝手にデータを盗み見れないようにします。
                if (response.Item.authToken !== authToken) {
                    return {
                        statusCode: 403,
                        body: JSON.stringify({ message: "Invalid authToken" })
                    };
                }

                return {
                    statusCode: 200,
                    // 保存しておいた 'data' の中身だけをUnityに返します。
                    // authTokenなどの管理情報は返しません。
                    body: JSON.stringify({ data: response.Item.data })
                };
            } else {
                // データが見つからなかった場合
                // 新規ユーザーの場合はデータがないのが普通なので、エラーではなく「データなし(null)」として 200 OK を返します。
                // Unity側はこれを見て「あ、新規ユーザーだな」と判断します。
                return { statusCode: 200, body: JSON.stringify({ data: null }) };
            }

        } else {
            // actionが "save" でも "load" でもない場合
            return { statusCode: 400, body: JSON.stringify({ message: "Invalid action" }) };
        }

    } catch (error) {
        // tryブロックの中で何か予期せぬエラー（AWSにつながらない、JSONの形式がおかしいなど）が起きた場合
        // ここにジャンプします。
        console.error("Error:", error);
        // 500 Internal Server Error を返して、サーバー側で何かあったことを伝えます。
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: String(error) })
        };
    }
};
