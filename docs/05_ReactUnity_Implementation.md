# ReactUnity Implementation Guide

## 1. 概要
本ドキュメントは、`ReactUI/src/title/index.tsx` および関連コンポーネントの実装詳細について解説します。
ReactUnityは、Web開発で使われる **React** という技術を使って、UnityのUI（uGUI）を構築するためのツールです。

### このコードの読み方
通常のWebサイト開発（HTML/DOM）とは異なり、Unity専用のタグやルールが存在します。

*   **`<view>`**: HTMLの `<div>` に相当。コンテナやレイアウト枠として使用します。
*   **`<text>`**: HTMLの `<span>` や `<p>` に相当。文字を表示するために必須です（`<view>`の中に直接文字は書けません）。
*   **`className`**: CSSクラスを指定します。本プロジェクトでは **Tailwind CSS** ライクな書き方（`flex-row`, `items-center` 等）でレイアウトを組んでいます。

## 2. コンポーネント解説

### 2.1 TitleApp (`src/title/index.tsx`)
アプリケーションの「司令塔」となるメインコンポーネントです。画面全体の切り替えや、ゲームの状態管理を行います。

#### 状態管理 (`useState`)
画面の状態を「変数」として保持し、その値が変わると自動的に画面を書き換えます。
```typescript
// 画面遷移の状態: 'title' か 'ranking' か 'settings' か
const [currentScreen, setCurrentScreen] = useState<Screen>('title');

// 接続演出の状態: 'idle'(待機) -> 'connecting'(ログ) -> 'connected'(メニュー)
const [connectionState, setConnectionState] = useState('idle');
```

#### 入力ハンドリング (`useEffect`)
Unity（C#側）からの入力を受け取るための「橋渡し」を行っています。
Reactコンポーネントが表示された時（マウント時）にイベントを登録し、消える時（アンマウント時）に解除する処理です。

```typescript
useEffect(() => {
    // Unityから呼ばれる関数をwindowオブジェクトに定義
    (window as any).onAnyKeyPress = () => {
        // 待機中なら接続を開始する
        if (connectionState === 'idle') setConnectionState('connecting');
    };

    // クリーンアップ関数: コンポーネントが消える時にイベントを空にする
    return () => { (window as any).onAnyKeyPress = () => {}; };
}, [connectionState]); // connectionStateが変わるたびに再登録
```

### 2.2 GridBackground
サイバーパンク感を出すための、背景でスクロールし続けるグリッド線です。

#### アニメーションの仕組み (`requestAnimationFrame`)
Webやゲーム開発でアニメーションさせる際の定石です。「次の画面描画のタイミングでこの関数を実行してね」とブラウザ（Unity）に依頼します。

```typescript
const loop = () => {
    // 経過時間に応じてオフセット（ズレ）を計算
    // % gridSize を使うことで、一定距離進んだら0に戻り、無限に続いているように見せる
    setOffset((elapsed * speed) % gridSize);
    
    // 次のフレームも自分自身を呼び出す（ループ）
    requestAnimationFrame(loop);
};
```
**学習ポイント:** CSSアニメーションではなくJSで座標を計算しているのは、スクロール速度や方向を動的に制御しやすくするためです。

### 2.3 GeometricDebris
背景に浮遊する三角形や四角形のパーティクル（粒子）です。

#### 配列による管理
複数の物体を動かす場合、それらの情報を配列（リスト）で管理します。

```typescript
// 各パーティクルの情報（座標、回転、速度など）を持つオブジェクトの配列
const [particles, setParticles] = useState([
    { id: 0, x: 10, y: 20, rotation: 0, ... },
    { id: 1, x: 50, y: 80, rotation: 45, ... },
    ...
]);
```
ループ内で `setParticles` を呼び出し、全パーティクルの `y` 座標や `rotation` を少しずつ変化させることで、全体が動いているように見せています。画面外に出た粒子を反対側に戻す処理もここで行います。

### 2.4 GlitchLogo
タイトルロゴです。時々「バグった」ように表示が乱れる（グリッチ）演出を入れています。

#### ランダムな発火 (`setTimeout`)
規則的な動きではなく、不定期に乱れさせるために、再帰的な `setTimeout` を使っています。

1.  2〜5秒待つ。
2.  グリッチ開始（`setIsGlitching(true)`）。
3.  0.1秒間、激しく位置をランダムにずらす。
4.  グリッチ終了。
5.  最初に戻る。

**演出のコツ:** メインのロゴの上に、半透明の「赤」と「シアン」のロゴを少しずらして重ねることで、RGBの色ズレ（色収差）を表現しています。

### 2.5 ConnectionSequence
「接続中...」「ファイアウォール突破...」といった文字が一行ずつ表示される演出です。

#### 段階的な表示
あらかじめ表示したい文章と、表示までの遅延時間（delay）を定義しておきます。

```typescript
const sequence = [
    { text: "> CONNECTING...", delay: 0 },
    { text: "> ACCESS GRANTED.", delay: 1000 },
];
```
`useEffect` の中でこれらをループし、`setTimeout` でそれぞれの時間後に `logs` 配列に追加していくことで、タイピングされているような時間差表示を実現しています。

### 2.6 Menu (`src/title/Menu.tsx`)
メインメニューのリスト部分です。

#### 選択状態の可視化
現在どの項目を選んでいるかを `selectedIndex` (0, 1, 2...) で管理しています。
描画時に、自分のインデックスが `selectedIndex` と一致していれば、スタイルを変更します。

```typescript
// 選択されている項目のスタイル
className={`
    transition-all duration-200  // アニメーション設定
    ${isSelected ? 'w-80 bg-cyan-500' : 'w-60 bg-gray-800'} // 条件によるクラス切り替え
`}
```
このように、**「状態（State）」に応じて「見た目（Class）」を切り替える** のがReactでのUI構築の基本です。

### 2.7 Footer (操作ガイド)
画面下部の帯です。現在はコピーライトのみを表示しています。

**※実装メモ**:
以前はここで条件付きレンダリングを行い、メニュー表示中は操作ガイド（キー割り当て）を表示していましたが、コントローラーのボタン配置の差異（PS/Xbox/Switch）による混乱を避けるため、ガイド表示機能は削除しました。現在は常にコピーライトが表示されます。

### 2.8 Ranking (`src/title/Ranking.tsx`)
*   **データ取得:** マウント時に `interop.GetGameData()` を呼び出し、JSONをパースしてStateに格納します。
*   **フィルタリング:** `useMemo` を使用し、フィルタ条件（HP, SP, Auto）やステージ選択が変更された時のみリストを再計算・ソートします。

### 2.9 GlitchText & useGlitch (`src/components/GlitchText.tsx`, `src/hooks/useGlitch.ts`)
*   **仕組み:** `useGlitch` フックがランダムなタイミングで `offset` (x, y) と `isGlitching` フラグを更新します。
*   **描画:** `GlitchText` はメインのテキストに加え、`isGlitching` が true の間だけ、色違い（赤・シアン）のテキストをずらして配置（ゴースト）することで、色収差と振動を表現しています。

### 2.10 CSSアニメーション (`src/index.css`)
ReactUnity環境でのパフォーマンス安定のため、JSによる毎フレーム更新ではなく、CSS Animationを使用しています。
*   **スピナー:** `.custom-spin` クラスで `@keyframes` を定義し、`rotate` プロパティを変化させています。

## 3. 技術的なポイントまとめ
1.  **宣言的UI**: 「ボタンの色を赤にする」という命令を書くのではなく、「エラー状態なら赤になる」という**ルール**を書くのがReact流です。
2.  **コンポーネント指向**: 画面を「背景」「ロゴ」「メニュー」といった部品に分け、それぞれを独立して作ることで、複雑な画面も管理しやすくなります。
3.  **Unityとの連携**: `window` オブジェクトを経由して、C#（Unity）からの入力を受け取ったり、逆にC#へ命令を送ったり（ゲーム開始など）しています。

### 2.8 KeyIcon (`src/components/KeyIcon.tsx`)
コントローラーのボタンやキーボードのキーを表示するためのアイコンコンポーネントです。
**※現在、タイトル画面では使用していませんが、将来的な拡張（設定画面でのキーコンフィグ表示など）のためにコンポーネント自体は保持しています。**

#### 画像とテキストの切り替え
SVGやPNGなどの画像ファイルがある場合はそれを表示し、ない場合はテキストで代用するロジックを持っています。

```typescript
if (icon) {
    // 画像パス(res:...)があれば <image> タグで表示
    return <image source={icon} ... />;
}
// なければ <text> タグで文字を表示
return <text>{label}</text>;
```
これにより、開発初期は文字で仮置きし、素材が揃ったら画像パスを指定するだけでスムーズに差し替えが可能になります。