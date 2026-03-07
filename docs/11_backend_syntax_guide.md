# Backend Syntax Guide (AWS Lambda & TypeScript)

本プロジェクトのバックエンド（サーバーサイド）実装で使用されている、TypeScript および AWS SDK v3 の基本的な構文やパターンについての解説です。

## 1. Lambdaハンドラー関数 (Lambda Handler)

AWS Lambdaにおいて、処理の入り口（エントリーポイント）となる関数です。

### 構文
```typescript
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // 処理内容
    return { statusCode: 200, body: "OK" };
};
```

### 解説
*   **`export`**: この関数を外部（AWSの実行環境）から呼び出せるように公開します。
*   **`async`**: 非同期処理（DBアクセスなど）を行うため、必ず `async` を付けます。
*   **`event`**: クライアント（Unity）から送られてきたリクエスト情報（HTTPヘッダー、ボディなど）が入っています。
*   **戻り値**: HTTPステータスコードとレスポンスボディを含むオブジェクトを返します。

---

## 2. 分割代入 (Destructuring Assignment)

オブジェクトから特定のプロパティを取り出して、同名の変数として定義する構文です。

### 構文
```typescript
// body = { action: "save", userId: "123", ... }
const { action, userId, authToken } = body;
```

### 解説
以下と同じ意味ですが、1行でスッキリ書けます。
```typescript
const action = body.action;
const userId = body.userId;
const authToken = body.authToken;
```

---

## 3. 型定義 (Interface と Type)

TypeScriptでは、オブジェクトの「形」を定義する方法として `interface` と `type` の2つがあります。どちらも似ていますが、いくつかの重要な違いがあります。

### 構文
```typescript
// interfaceの例
interface RequestBody {
    action: 'save' | 'load'; // 文字列リテラル型（この2つの文字列しか許可しない）
    userId: string;
    saveData?: any;          // ? は「省略可能（あってもなくても良い）」という意味
}

// typeの例
type UserID = string;
type ActionType = 'save' | 'load' | 'delete';
```

### interface と type の違い

| 特徴         | interface                                     | type                                                       |
| :----------- | :-------------------------------------------- | :--------------------------------------------------------- |
| 主な用途     | オブジェクトの「形」の定義                    | プリミティブ、共用体、タプルなど、より複雑な型の定義も可能 |
| 拡張方法     | extends キーワード                            | & (交差型) を使用                                          |
| 宣言のマージ | 可能 (同じ名前で複数宣言すると自動で合体する) | 不可能 (同じ名前で再定義するとエラーになる)                |

#### 宣言のマージ (Declaration Merging)
interface の最大の特徴は、同じ名前で複数回定義すると、その内容が自動的に「合体（マージ）」されることです。

```typescript
interface User {
    name: string;
}

interface User {
    age: number;
}

// この時点で User は { name: string; age: number; } となる
```
この性質は、外部ライブラリの型定義を拡張する際などに便利です。

#### どちらを使うべきか？
*   **オブジェクトの形を定義する場合**: `interface` を使うのが一般的です。拡張性に優れています。
*   **共用体 (`string | number`) やタプル (`[string, number]`) など、オブジェクト以外の型を定義したい場合**: `type` を使います。

本プロジェクトの `RequestBody` はオブジェクトの形を定義しているため、`interface` を使用しています。これは良い選択です。

---

## 4. AWS SDK v3 のコマンドパターン

AWSのサービス（DynamoDBなど）を操作する際、v3では「コマンド（命令書）」を作成して「送信（send）」するスタイルで記述します。

### 構文
```typescript
// 1. 命令書を作成 (PutCommand = 保存しろ)
const command = new PutCommand({
    TableName: "MyTable",
    Item: { id: "1", data: "test" }
});

// 2. クライアントに送信して実行
await docClient.send(command);
```

### 解説
*   **`PutCommand`**: データを保存・上書きする命令。
*   **`GetCommand`**: データを取得する命令。
*   **`docClient.send()`**: 命令を実行します。非同期処理なので `await` で完了を待ちます。

---

## 5. JSONのパースと文字列化

HTTP通信ではデータはすべて「文字列」として送受信されるため、プログラムで扱うには変換が必要です。

### 構文
```typescript
// 文字列 -> オブジェクト (受信時)
const body = JSON.parse(event.body);

// オブジェクト -> 文字列 (送信時)
const jsonString = JSON.stringify(responseObject);
```

### 注意点
`JSON.parse` は、渡された文字列が正しいJSON形式でない場合、エラー（例外）を投げます。そのため、必ず `try-catch` ブロックの中で実行するのが定石です。

---

## 6. テンプレートリテラル (Template Literals)

文字列の中に変数を埋め込むための構文です。バッククォート (`` ` ``) で囲みます。

### 構文
```typescript
console.log(`Conflict detected for user ${userId}.`);
```

### 解説
C# の `$"..."` (文字列補間) と同じ機能です。
`"Conflict detected for user " + userId + "."` と書くよりも読みやすくなります。