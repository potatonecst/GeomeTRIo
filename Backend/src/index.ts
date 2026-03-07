// --- モジュールのインポート ---
// このセクションでは、このLambda関数が動作するために必要な「部品（モジュール）」を読み込んでいます。

// AWS Lambdaの型定義。TypeScriptで開発する際に、引数eventや戻り値の型を正確に扱うために使用します。
// これにより、コードの入力ミスを防ぎ、エディタの補完機能が効くようになります。
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Node.jsに標準で組み込まれている暗号化モジュール。
// HMAC-SHA256というアルゴリズムでチェックサム（データの指紋のようなもの）を計算するために使用します。
import { createHmac } from 'crypto';

// AWS SDK for JavaScript v3 から、DynamoDBを操作するための部品をインポートします。
// v3はモジュール化されており、必要なものだけを読み込むことで、Lambdaの起動を高速化できます。

// DynamoDBClient: DynamoDBと通信するための基本的なクライアント。AWSへの接続設定（リージョンなど）を保持します。
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

// DynamoDBDocumentClient: JavaScriptのオブジェクトをそのままDynamoDBに保存・取得できるようにする便利なラッパー。
// これがないと、{"data": {"S": "value"}} のようなDynamoDB特有の面倒な形式でデータを扱う必要があります。
// PutCommand: データをテーブルに「置く」（保存または上書きする）ための命令。
// GetCommand: データをテーブルから「取得する」ための命令。
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

// json-stable-stringify: オブジェクトのキーをアルファベット順にソートしてからJSON文字列に変換するライブラリ。
// これにより、クライアント(Unity)とサーバー(Lambda)でキーの順序が異なっていても、必ず同じ文字列が生成され、
// チェックサムの計算結果が一致するようになります。通信改竄の検知に不可欠です。
import stringify from 'json-stable-stringify';


// --- 初期化処理 ---
// このセクションでは、Lambda関数がリクエストを受け取る前に、一度だけ実行される初期設定を行っています。

/**
 * @description AWSのサービスと通信するためのクライアントを初期化します。
 * @param {string} region - 接続先のAWSリージョン。物理的に近いリージョンを指定すると通信が速くなります。
 *                         'ap-northeast-1' は東京リージョンを指します。
 */
const client = new DynamoDBClient({ region: 'ap-northeast-1' });

/**
 * @description 基本的なDynamoDBクライアントを、JavaScriptオブジェクトを直接扱えるドキュメントクライアントに変換します。
 *              これ以降のデータベース操作は、すべてこの `docClient` を通じて行います。
 */
const docClient = DynamoDBDocumentClient.from(client);

/**
 * @description 操作対象のDynamoDBテーブル名。AWSコンソールで作成したテーブル名と一致させる必要があります。
 */
// 環境変数からテーブル名を取得します。設定されていない場合はデフォルト値を使用します。
const TABLE_NAME = process.env.TABLE_NAME || 'GeomeTRIo_Saves';

// --- 型定義 ---
// このセクションでは、プログラム内で使用するデータの構造を定義しています。

/**
 * @interface RequestBody
 * @description Unityクライアントから送信されるリクエストボディの型定義。
 * @property {'save' | 'load'} action - 実行したい操作の種類。
 * @property {string} userId - プレイヤーを一意に識別するID。
 * @property {string} authToken - 本人確認用の秘密のトークン。
 * @property {any} [saveData] - 保存するゲームデータ（'save'アクション時のみ）。
 * @property {string} [checksum] - データの改竄を検知するためのチェックサム（'save'アクション時のみ）。
 * @property {string} [prevUpdatedAt] - クライアントが保持しているデータの最終更新日時。排他制御に使用します。
 */
interface RequestBody {
    action: 'save' | 'load';
    userId: string;
    authToken: string;
    saveData?: any;
    checksum?: string;
    prevUpdatedAt?: string;
}


// --- メインロジック ---

/**
 * @function handler
 * @description AWS Lambdaのエントリーポイント（入り口）となる関数です。
 *              API Gateway経由でHTTPリクエストが届くと、AWSがこの関数を呼び出します。
 * 
 * @param {APIGatewayProxyEvent} event 
 *   API Gatewayから渡されるリクエスト情報（HTTPヘッダー、ボディ、パスパラメータなど）が詰まったオブジェクトです。
 *   - event.body: クライアントから送信されたJSONデータ（文字列）。
 * 
 * @returns {Promise<APIGatewayProxyResult>}
 *   API Gatewayに返すレスポンスオブジェクトです。
 *   - statusCode: HTTPステータスコード（200:成功, 400:不正なリクエスト, 500:サーバーエラーなど）。
 *   - body: クライアントに返すデータ（JSON文字列）。
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // ログ出力: AWSのCloudWatch Logsサービスで、どのようなリクエストが来たかを確認できます。
    // デバッグやトラブルシューティングの際に非常に重要です。
    // JSON.stringifyの第2,第3引数は、JSONを人間が読みやすい形に整形して出力するためのものです。
    console.log('Event:', JSON.stringify(event, null, 2));

    try {
        // --- リクエストボディの解析と検証 ---

        // event.bodyはJSON形式の「文字列」として送られてくるため、
        // プログラムで扱える「JavaScriptのオブジェクト」に変換（パース）します。
        if (!event.body) {
            // ボディが空の場合は、不正なリクエストとしてエラーを返します。
            return { statusCode: 400, body: JSON.stringify({ message: 'Request body is missing.' }) };
        }

        // JSON.parseは失敗するとエラーを投げる可能性があるため、try-catchで囲んで安全に処理します。
        let body: RequestBody;
        try {
            // API Gatewayのテスト機能などから送られた場合、bodyが既にオブジェクトの場合があるため、
            // typeofで型をチェックし、文字列の場合のみパースを実行します。
            body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        } catch (e) {
            // JSONの形式が正しくない場合は、400 Bad Requestエラーを返します。
            return { statusCode: 400, body: JSON.stringify({ message: 'Invalid JSON format in request body.' }) };
        }

        // 分割代入: bodyオブジェクトから各プロパティを取り出し、同名の定数に代入します。
        const { action, userId, authToken, saveData, checksum, prevUpdatedAt } = body;

        // 必須項目の存在チェック。これらがないと処理を続けられないため、早期にエラーを返します。
        if (!userId) {
            return { statusCode: 400, body: JSON.stringify({ message: 'Missing required field: userId' }) };
        }
        if (!authToken) {
            // 認証トークンはセキュリティの要なので、ない場合は「未認証(401)」エラーを返します。
            return { statusCode: 401, body: JSON.stringify({ message: 'Missing required field: authToken' }) };
        }

        // --- アクションに応じた処理の分岐 ---

        if (action === 'save') {
            // --- 保存 (save) 処理 ---

            // 保存処理に必要なデータが揃っているかチェックします。
            if (!saveData) {
                return { statusCode: 400, body: JSON.stringify({ message: 'Missing required field for save action: saveData' }) };
            }
            if (!checksum) {
                return { statusCode: 400, body: JSON.stringify({ message: 'Missing required field for save action: checksum' }) };
            }

            // --- セキュリティチェック1: 上書き権限の確認 ---
            // いきなりデータを保存するのではなく、まず現在のデータを取得して、トークンが正しいかチェックします。
            // これにより、他人が勝手にデータを上書きするのを防ぎます。
            const getCommand = new GetCommand({
                TableName: TABLE_NAME,
                Key: { userId: userId }, // 検索キー: どのユーザーのデータを取得するか
            });
            // docClient.send: 命令をAWSに送信し、結果が返ってくるまで待ちます(await)。
            const currentData = await docClient.send(getCommand);

            // データが既に存在し(currentData.Item)、かつDBに保存されているトークンと送られてきたトークンが一致しない場合
            // -> 「なりすまし」による上書きと判断してエラー(403 Forbidden)を返します。
            if (currentData.Item && currentData.Item.authToken !== authToken) {
                return {
                    statusCode: 403,
                    body: JSON.stringify({ message: 'Invalid authToken. You cannot overwrite this data.' }),
                };
            }

            // --- 排他制御 (Optimistic Locking) ---
            // クライアントが知っている「最終更新日時」と、サーバー上の「最終更新日時」が異なる場合、
            // 別の端末で更新された可能性があるため、上書きを阻止します。
            // ※ prevUpdatedAt が送られてきた場合のみチェックします（移行期間用）。
            if (prevUpdatedAt && currentData.Item && currentData.Item.updatedAt !== prevUpdatedAt) {
                console.warn(`Conflict detected for user ${userId}. DB: ${currentData.Item.updatedAt}, Req: ${prevUpdatedAt}`);
                return {
                    statusCode: 409, // Conflict (競合)
                    body: JSON.stringify({ message: 'Data has been updated by another device. Please reload.' }),
                };
            }

            // --- セキュリティチェック2: データ改竄の検証 ---
            // クライアントから送られてきたデータが、通信の途中で書き換えられていないかを確認します。

            // サーバー側でチェックサムを再計算します。
            // stringify(saveData) は、キーをソートしてJSON文字列に変換します。
            // これにより、クライアントとサーバーで必ず同じ文字列が生成されることが保証されます。
            // || '' は、万が一 stringify が undefined を返した場合のフォールバック（安全策）です。
            // これがないと、undefined が crypto.createHmac に渡されてエラーになります。
            const dataString = stringify(saveData) || '';

            // createHmac: ハッシュ値を計算するためのオブジェクトを作成します。
            // - 第1引数 'sha256': ハッシュアルゴリズムの種類。
            // - 第2引数 authToken: 秘密鍵。リクエストごとに異なるため、第三者が偽造するのが困難になります。
            // .update(dataString): ハッシュ化したいデータを渡します。
            // .digest('hex'): 計算結果を16進数の文字列として取得します。
            const expectedChecksum = createHmac('sha256', authToken)
                .update(dataString)
                .digest('hex');

            // クライアントから送られてきたチェックサムと、サーバーで計算したものが一致しない場合
            // -> 通信経路でデータが書き換えられたか、不正なリクエストであると判断してエラーを返します。
            if (checksum !== expectedChecksum) {
                console.warn(`Checksum mismatch for user ${userId}. Expected: ${expectedChecksum}, Got: ${checksum}`);
                return {
                    statusCode: 403,
                    body: JSON.stringify({ message: 'Invalid checksum. Data may have been tampered with.' }),
                };
            }

            // --- データの保存実行 ---
            const now = new Date();
            // TTL (Time To Live: 生存期間) の計算。ゲストユーザーのデータが増え続けるのを防ぎます。
            // DynamoDBのTTL機能は「秒単位のUnixタイムスタンプ」で指定する必要があります。
            // now.getTime() はミリ秒なので 1000 で割り、1年分の秒数(365日 * 24時間 * 60分 * 60秒)を足します。
            const oneYearLater = Math.floor(now.getTime() / 1000) + (365 * 24 * 60 * 60);

            // PutCommand: データをテーブルに「置く」（保存・上書き）命令を作成します。
            const putCommand = new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    userId: userId,           // パーティションキー
                    authToken: authToken,     // 次回チェック用のトークンも一緒に保存
                    data: saveData,           // ゲームデータ本体
                    updatedAt: now.toISOString(), // 更新日時 (ISO 8601形式の文字列)
                    expiresAt: oneYearLater,  // 有効期限 (TTL)
                },
            });

            // AWSに保存命令を送信して、完了を待ちます。
            await docClient.send(putCommand);

            // 成功したら 200 OK と成功メッセージを返します。
            return { statusCode: 200, body: JSON.stringify({ message: 'Save successful' }) };

        } else if (action === 'load') {
            // --- 読み込み (load) 処理 ---

            // GetCommand: データを「取得」する命令を作成します。
            const getCommand = new GetCommand({
                TableName: TABLE_NAME,
                Key: {
                    userId: userId, // どのユーザーのデータを取得するか指定
                },
            });

            // AWSに取得命令を送信して、結果を待ちます。
            const response = await docClient.send(getCommand);

            // response.Item にデータが入っていれば、データが見つかったということです。
            if (response.Item) {
                // --- セキュリティチェック: 読み込み権限の確認 ---
                // 読み込み時もトークンをチェックし、他人が勝手にデータを盗み見れないようにします。
                if (response.Item.authToken !== authToken) {
                    return {
                        statusCode: 403,
                        body: JSON.stringify({ message: 'Invalid authToken. You cannot access this data.' }),
                    };
                }

                // 成功レスポンス。保存しておいた 'data' プロパティの中身だけをクライアントに返します。
                // authTokenなどの管理情報は返しません。
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        data: response.Item.data,
                        updatedAt: response.Item.updatedAt // クライアントに最終更新日時を伝える
                    }),
                };
            } else {
                // データが見つからなかった場合（新規ユーザーなど）。
                // エラーではなく「データなし(null)」として 200 OK を返します。
                // Unity側はこれを見て「新規ユーザー」として処理を開始します。
                return { statusCode: 200, body: JSON.stringify({ data: null }) };
            }
        } else {
            // actionが 'save' でも 'load' でもない、未知のアクションが指定された場合。
            return { statusCode: 400, body: JSON.stringify({ message: 'Invalid action specified.' }) };
        }
    } catch (error) {
        // tryブロックの中で何か予期せぬエラー（AWSサービスへの接続失敗、プログラムのバグなど）が起きた場合、
        // このcatchブロックにジャンプします。

        // エラー内容をCloudWatch Logsに出力します。
        console.error('An unexpected error occurred:', error);

        // 500 Internal Server Error を返して、サーバー側で問題が発生したことをクライアントに伝えます。
        // エラーの詳細はセキュリティ上クライアントに返さず、汎用的なメッセージにします。
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An internal server error occurred.' }),
        };
    }
};
