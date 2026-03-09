# Infrastructure Syntax Guide (YAML, Serverless, GitHub Actions)

本プロジェクトのインフラ設定（`serverless.yml`）やCI/CD設定（GitHub Actions）で使用されている構文の解説です。

## 1. YAML (YAML Ain't Markup Language) の基本

設定ファイルを書くためによく使われるデータ形式です。**「インデント（字下げ）」** によってデータの階層構造を表現するのが最大の特徴です。

### 基本ルール
1.  **インデントはスペース2つ:** タブ文字（Tab）は使用禁止です。必ず半角スペースを使います。
2.  **階層構造:** インデントが深いほど、上の項目の「中身（子要素）」になります。
3.  **コメント:** `#` から行末まではコメントとして無視されます。

### 構文例
```yaml
# キー: 値
name: GeomeTRIo
version: 1.0

# ネスト（入れ子）
provider:
  name: aws        # provider の中身
  region: tokyo    # provider の中身

# リスト（配列）: 行頭に「-」をつける
colors:
  - red
  - blue
  - green
```

---

## 2. Serverless Framework 独自の構文 (`serverless.yml`)

YAMLの中に埋め込まれる、Serverless Framework 特有の変数や機能です。

### 接頭辞の意味
*   **`sls` (Serverless)**:
    *   Serverless Framework が自動的に設定する**組み込み変数**です。
    *   フレームワーク自体が管理している確定した情報（現在のステージ、サービス名など）を取得する際に使います。
*   **`opt` (Options)**:
    *   デプロイコマンド実行時にユーザーが指定した**コマンドラインオプション（引数）**です。
    *   例: `serverless deploy --stage prod` と実行した場合の `prod` を取得します。

### `${...}` 変数参照
設定値を動的に変えるために使用します。

*   **`${sls:stage}`**:
    *   現在のデプロイステージ（`dev` や `prod`）に置き換わります。
    *   例: `TableName: Saves_${sls:stage}` → `Saves_dev`
*   **`${opt:stage, 'dev'}`**:
    *   コマンドライン引数 `--stage` の値を使います。もし指定がなければ、デフォルト値 `'dev'` を使います。
    *   記述場所: `provider.stage` の設定などで使用。

### CloudFormation 構文 (`resources` セクション)
AWSのリソースを直接定義する部分は、AWS CloudFormation の書き方に従います。

*   **`Type`**: 作成するリソースの種類（例: `AWS::DynamoDB::Table`）。
*   **`Properties`**: そのリソースの設定項目。
    *   **`AttributeDefinitions` (部品定義)**:
        *   キーとして使用する属性の「名前」と「型」を宣言します。ここに書いたものだけがキーとして使えます。
    *   **`KeySchema` (組み立て)**:
        *   `AttributeDefinitions` で定義した属性を、具体的に「どの役割（HASH=主キー / RANGE=ソートキー）」で使うかを指定します。
        *   ※同じ `userId` を2回書くことになりますが、これは「定義」と「使用」の関係にあるため必須です。

---

## 3. GitHub Actions 独自の構文 (`.github/workflows/*.yml`)

GitHub Actions のワークフロー定義で使用される構文です。

### 構造
*   **`on`**: 「いつ」実行するか（トリガー）。
    *   `workflow_dispatch`: 手動実行ボタン。
    *   `push`: コードがプッシュされた時。
*   **`jobs`**: 「なにを」実行するか。
*   **`steps`**: ジョブの中の「手順」。上から順に実行されます。
    *   **`uses`**: 他の人が作った機能（アクション）を使う（例: `actions/checkout@v4`）。
    *   **`run`**: コマンドライン命令を実行する（例: `npm install`）。

### `${{ ... }}` コンテキスト参照
GitHub Actions が持っている情報や変数にアクセスするための構文です。

*   **`${{ secrets.MY_SECRET }}`**:
    *   GitHubリポジトリの Settings > Secrets に保存した暗号化された秘密情報（パスワードなど）。
    *   ログには `***` と表示され、隠蔽されます。
*   **`${{ env.MY_ENV }}`**:
    *   ワークフロー内で定義した環境変数 (`env:`)。
*   **`${{ github.event.inputs.stage }}`**:
    *   手動実行 (`workflow_dispatch`) 時に、ユーザーが入力フォームで選択した値。

---

## 4. よくある間違いと注意点

### インデントのズレ
YAMLはインデントが命です。1マスずれるだけで「別の項目の設定」とみなされ、エラーになります。

**悪い例:**
```yaml
provider:
  name: aws
 region: tokyo  # エラー！ name と高さが合っていない
```

### コロンの後のスペース
キーと値の間には必ずスペースが必要です。

*   OK: `key: value`
*   NG: `key:value` （ひととかたまりの文字列とみなされる）

### 文字列のクォート
基本的にはクォート（`"` や `'`）なしで書けますが、記号を含む場合や、数字を文字列として扱いたい場合はクォートが必要です。

*   `version: "1.0"` （文字列の "1.0"）
*   `version: 1.0` （数値の 1.0）
*   `pattern: "*.txt"` （`*` はYAMLで特別な意味を持つことがあるためクォート推奨）
```
