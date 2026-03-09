# React & TypeScript Syntax Guide

本プロジェクトのUI実装で使用されている、React (TypeScript) の基本的な構文や概念についての解説です。
Unity (C#) 開発者が React のコードを読む際の助けとなるように記述しています。

## 1. 関数コンポーネント (Functional Components)

ReactにおけるUIの最小単位です。C#のクラスに近い概念ですが、JavaScriptでは単なる「関数」として定義します。

### 構文
```tsx
// アロー関数を使った定義
const MyComponent = () => {
    return <text>Hello World</text>;
};
```

### 解説
*   **役割:** UIの一部（ボタン、パネル、リスト項目など）を定義します。
*   **戻り値:** **JSX** と呼ばれる、HTMLタグのような形式で「見た目」を返します。
*   **アロー関数 (`() => {}`):** C#のラムダ式と同じ書き方です。`function MyComponent() {}` と書くのと同じですが、現代のReactではこちらが主流です。

---

## 2. JSX (JavaScript XML)

JavaScriptの中にHTMLタグを直接書ける構文です。

### ReactUnity特有のタグ
Web開発（HTML）とは異なり、UnityのuGUIに変換されるため、専用のタグを使用します。

*   **`<view>`**: コンテナ。HTMLの `<div>` や Unityの `Panel` に相当します。
*   **`<text>`**: 文字列。HTMLの `<span>` や Unityの `Text` に相当します。
*   **`<image>`**: 画像。Unityの `Image` に相当します。

### 波括弧 `{ }` による埋め込み
JSXの中で `{ }` を使うと、JavaScriptの変数や式を埋め込むことができます。C#の文字列補間 `$` に似ています。

```tsx
const name = "Player";
return <text>Hello, {name}!</text>; // -> Hello, Player!
```

---

## 3. Props (プロパティ)

親コンポーネントから子コンポーネントへデータを渡すための仕組みです。C#のメソッド引数に似ています。

### 定義と使用
```tsx
// 子コンポーネント: 引数として props を受け取る
const ScoreDisplay = ({ score }: { score: number }) => {
    return <text>Score: {score}</text>;
};

// 親コンポーネント: 属性のように値を渡す
const Game = () => {
    return <ScoreDisplay score={100} />;
};
```

### 解説
*   **引数の `{ score }`**: **分割代入 (Destructuring)** と呼ばれる構文です。「受け取ったオブジェクトの中から `score` プロパティだけを取り出して変数にする」という意味です。
*   **型定義**: `: { score: number }` で、受け取るデータの型を指定しています（TypeScript）。

---

## 4. State (`useState`)

コンポーネント内部で保持する「状態」です。この値が変化すると、Reactは自動的に画面を再描画します。

### 構文
```tsx
const [count, setCount] = useState(0);
```

### 解説
*   **`useState(0)`**: 初期値を `0` として状態を作成します。
*   **戻り値**: 配列 `[現在の値, 更新用関数]` が返ってきます。
*   **`count`**: 現在の値が入っている変数（読み取り専用）。
*   **`setCount`**: 値を更新するための関数。
    *   `setCount(5)` と呼ぶと、`count` が 5 になり、画面が更新されます。
    *   **重要:** `count = 5` のように直接代入しても画面は更新されません。必ず `setCount` を使います。

---

## 5. 副作用 (`useEffect`)

画面の描画とは関係ない処理（副作用）を行うためのフックです。
Unityの `Start` や `OnDestroy`、イベント購読などに相当します。

### 構文
```tsx
useEffect(() => {
    // 1. マウント時（Start）に実行される処理
    console.log("開始");

    // 2. クリーンアップ関数（OnDestroy）
    return () => {
        console.log("終了");
    };
}, []); // 3. 依存配列
```

### 依存配列 (`[]`) の意味
*   **`[]` (空配列):** 最初の1回だけ実行されます（Unityの `Start`）。
*   **`[score]`**: `score` 変数が変化するたびに実行されます。
*   **指定なし:** 毎フレーム（再描画ごと）実行されます（Unityの `Update` に近いですが、頻度が高いので注意）。

### Unityイベントの登録と依存配列 (Event Registration & Dependencies)

Unity(C#)からのイベント（`window.onSaveConflict`など）を登録する際、`useEffect` の依存配列の扱いに注意が必要です。

**アンチパターン (レースコンディションの原因):**
```tsx
useEffect(() => {
    (window as any).onEvent = () => { ... };
    return () => { (window as any).onEvent = () => {}; }; // クリーンアップ
}, [currentScreen]); // ★依存配列に値がある
```
*   **問題:** `currentScreen` が変わるたびに「登録解除」→「再登録」が走ります。この一瞬の隙間にUnityからイベントが通知されると、取りこぼす可能性があります。

**ベストプラクティス:**
```tsx
useEffect(() => {
    (window as any).onEvent = () => { ... };
}, []); // ★空配列（マウント時のみ）
```
*   **解決:** 最初に1回だけ登録し、画面遷移しても解除しないようにすることで、いつ通知が来ても確実に受け取れるようになります。

---

## 6. カスタムフック (Custom Hooks)

ロジックを再利用可能な関数として切り出したものです。名前は必ず `use` で始めます。

### 例: `useGlitch`
```tsx
export const useGlitch = () => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    
    // グリッチ計算ロジック...

    return offset;
};
```

### メリット
コンポーネントから複雑な計算ロジックを追い出し、見た目（JSX）の記述に集中できます。

---

## 7. 条件付きレンダリング (Conditional Rendering)

C#の `if` 文のように、条件によって表示するものを切り替える構文です。

### `&&` (AND演算子)
「条件が true の時だけ表示する」場合に使います。
```tsx
{isGameOver && <text>GAME OVER</text>}
```

### 三項演算子 (`? :`)
「条件によってAかBか切り替える」場合に使います。
```tsx
{isPaused ? <text>RESUME</text> : <text>PAUSE</text>}
```

---

## 8. マップ (`map`)

配列のデータを元に、リスト表示を行う場合に使います。C#の `foreach` や LINQの `Select` に相当します。

```tsx
const scores = [100, 200, 300];

return (
    <view>
        {scores.map((score, index) => (
            <text key={index}>Score: {score}</text>
        ))}
    </view>
);
```

### `key` プロパティ
リスト表示する際は、各要素に一意な `key` を指定する必要があります。Reactが変更箇所を効率的に特定するために使われます。

---

## 9. TypeScriptの型定義

C#と同様に、変数や関数の引数に型を指定できます。

### インターフェース (interface) / 型エイリアス (type)
オブジェクトの構造を定義します。C#の `class` や `struct` に近いです。

```tsx
type PlayerData = {
    name: string;
    hp: number;
    isAlive: boolean;
};
```

### ジェネリクス
`useState` などで型を明示する場合に使います。

```tsx
const [lines, setLines] = useState<string[]>([]);
```

---

## 10. Tailwind CSS (スタイリング)

CSSを書く代わりに、あらかじめ用意されたクラス名を組み合わせてデザインする手法です。

*   **`flex-row`**: 横並びにする。
*   **`items-center`**: 中央揃えにする。
*   **`text-red-500`**: 文字色を赤にする。
*   **`p-4`**: パディング（内側の余白）を `1rem` (16px) 空ける。
*   **`w-[100px]`**: 幅を100pxに固定する（`[]`を使うと任意の値を指定可能）。

```tsx
<view className="flex-row items-center bg-black p-4">
    <text className="text-white">Menu</text>
</view>
```

---

## 11. 参照の保持 (`useRef`)

再描画を発生させずに値を保持したり、DOM要素（UnityのView）に直接アクセスするために使います。

### 構文
```tsx
const myRef = useRef(initialValue);
```

### 解説
*   **`myRef.current`**: 現在の値にアクセスします。書き換えてもコンポーネントは再描画されません。
*   **用途:**
    *   `setTimeout` のタイマーIDを保持して、アンマウント時にクリアする。
    *   `AspectRatioWrapper` のように、一度だけ実行したい初期化フラグを管理する。

---

## 12. 関数のメモ化 (`useCallback`)

関数を「記憶（メモ化）」して、再描画のたびに関数が作り直されるのを防ぐフックです。

### 構文
```tsx
const handleClick = useCallback(() => {
    console.log("Clicked");
}, []); // 依存配列
```

### 解説
*   **パフォーマンス最適化:** 子コンポーネントに props として関数を渡す際、親が再描画されても関数が「同じもの」として扱われるため、子の無駄な再描画（React.memoと併用時）を防げます。
*   **依存配列:** `useEffect` と同様、配列内の値が変わった時だけ関数が作り直されます。

---

## 13. 変数・State・Ref の違い (Variables vs State vs Refs)

Reactコンポーネント内でデータを扱う3つの方法の違いは、**「値の保持（寿命）」** と **「再描画のトリガー」** です。

| 特徴             | 通常の変数 (`let`)                    | State (`useState`)       | Ref (`useRef`)                |
| :--------------- | :------------------------------------ | :----------------------- | :---------------------------- |
| **値の保持**     | **しない** (レンダリング毎にリセット) | **する** (Reactが保持)   | **する** (Reactが保持)        |
| **更新時の動作** | 何も起きない                          | **再レンダリングされる** | **再レンダリングされない**    |
| **主な用途**     | 一時的な計算                          | UIに表示するデータ       | タイマーID、DOM参照、裏方の値 |

### コード例
```tsx
const Component = () => {
    // 1. 通常の変数: 毎回 0 に戻る
    // 関数が実行されるたびに新しく作られるため、値を記憶できません。
    let normalVar = 0;

    // 2. State: 値を保持し、変わると画面も更新される
    // UIに表示されている数字などはこれを使います。
    const [stateVar, setStateVar] = useState(0);

    // 3. Ref: 値を保持するが、変わっても画面は更新されない
    // アニメーションのタイマーIDや、前回の値を覚えておきたい時に使います。
    const refVar = useRef(0);

    const handleClick = () => {
        normalVar++;             // 次のレンダリングで消えるので意味がない
        setStateVar(s => s + 1); // 画面が更新される（再レンダリング発生）
        refVar.current++;        // 裏で値は増えるが、画面は更新されない
    };
};
```

### 使い分けの判断基準 (Rule of Thumb)
*   **State**: **「画面に表示する値」** や **「変化したら見た目を変えたい値」**。
    *   例: スコア、HP、入力されたテキスト、現在の画面ID。
*   **Ref**: **「画面には表示しないが、記憶しておきたい値」** や **「システム的な管理ID」**。
    *   例: タイマーID (`setTimeout`)、前回の値（比較用）、初期化済みフラグ、DOM要素への参照。

---

## 14. 計算結果のメモ化 (`useMemo`)

計算コストが高い処理の結果を「記憶（メモ化）」して、依存するデータが変わった時だけ再計算させるフックです。

### 構文
```tsx
const sortedData = useMemo(() => {
    // 重い処理（ソートやフィルタリング）
    return data.filter(d => d.active).sort((a, b) => b.score - a.score);
}, [data]); // dataが変わった時だけ再計算
```

### 解説
*   **パフォーマンス向上:** 描画のたびに重い計算が走るのを防ぎます。
*   **`useCallback` との違い:**
    *   `useCallback`: **関数そのもの** を記憶する。
    *   `useMemo`: 関数の **実行結果（戻り値）** を記憶する。

---

## 15. タイマー処理 (`setTimeout` / `setInterval`)

JavaScriptの標準的なタイマー関数ですが、Reactコンポーネント内で使う場合は **クリーンアップ** が重要です。

### 構文とパターン
```tsx
useEffect(() => {
    // タイマーセット
    const timerId = setTimeout(() => {
        console.log("3秒経過");
    }, 3000);

    // クリーンアップ関数（必須！）
    return () => {
        clearTimeout(timerId);
    };
}, []);
```

### なぜクリーンアップが必要か？
コンポーネントが画面から消えた（アンマウントされた）後や、再描画された後に、古いタイマーが動き続けるとエラーやバグの原因になるからです。
`useEffect` の戻り値として関数を返すと、Reactが適切なタイミング（アンマウント時など）でそれを実行してくれます。

---

## 16. スクロール実装パターン (Custom Scrolling)

ReactUnityにおいて、リストや長文をスクロールさせる際の定石パターンです。
Webの `overflow: scroll` に頼らず、`transform` を使って自前で制御することが多いです。

### なぜ自前実装するのか？
1.  **入力制御の統合:** ゲームパッドやキーボード操作と連動させるため。
2.  **パフォーマンス:** `transform: translateY` はGPUアクセラレーションが効きやすく、再レイアウトが発生しないため高速です。
3.  **カスタマイズ性:** スクロールバーのデザインや挙動（慣性、スナップなど）を自由に制御できます。

### 実装ステップ
1.  **高さの取得:** `useRef` と `clientHeight` (または `layout.height`) で、コンテナとコンテンツの高さを取得します。
2.  **位置の管理:** `useState` で `scrollPos` (Y座標) を管理します。
3.  **移動の適用:** コンテンツのラッパーに `style={{ transform: \`translateY(${scrollPos}px)\` }}` を適用します。
4.  **入力ハンドリング:** 上下キーの入力に応じて `scrollPos` を増減させます。
5.  **範囲制限:** `Math.max(0, Math.min(maxScroll, newPos))` で、はみ出しを防ぎます。

---

## 17. 非同期処理 (`async` / `await`)

時間のかかる処理（通信やDB操作など）を、コードの見た目上「待機」させるための構文です。
JavaScriptの `Promise` を直感的に書くために使われます。Backendの実装（AWS Lambda）でも多用されます。

### 構文
```typescript
// 関数に async をつける
const fetchData = async () => {
    // 完了するまでここで待機する (await)
    const result = await someAsyncFunction();
    console.log(result);
};
```

### 解説
*   **`async`**: 「この関数の中で `await` を使います」という宣言。戻り値は自動的に `Promise` になります。
*   **`await`**: 「この処理が終わるまで、次の行に進まずに待ちます」という命令。
*   **メリット**: コールバック地獄（`.then(() => { ... })` の入れ子）を防ぎ、コードを上から下へ流れるように書けます。

---

## 18. 例外処理 (`try` / `catch`)

実行中にエラーが発生する可能性がある処理を囲み、エラー時の対応を記述する構文です。
特に `async/await` と組み合わせて、通信エラーやJSONパースエラーなどを捕捉するのによく使われます。

### 構文
```typescript
try {
    // エラーが起きるかもしれない処理
    const data = JSON.parse(brokenJson);
    await saveData(data);
} catch (error) {
    // エラーが起きたらここが実行される
    console.error("失敗しました:", error);
}
```

### 解説
*   **`try` ブロック**: 正常系の処理を書きます。途中でエラーが起きると、即座に中断して `catch` に飛びます。
*   **`catch` ブロック**: エラー発生時の処理（ログ出力、代替値の返却など）を書きます。
