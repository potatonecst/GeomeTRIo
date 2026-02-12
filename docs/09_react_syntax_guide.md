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
