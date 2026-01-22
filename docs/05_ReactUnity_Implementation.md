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
画面下部の帯です。

#### 条件付きレンダリング (Conditional Rendering)
画面の状態によって表示する内容をガラッと変えています。

```typescript
{isMenuOpen ? (
    // メニューが開いている時は操作ガイドを表示
    <view> ...操作ガイド... </view>
) : (
    // そうでない時はコピーライトのみ表示
    <view> © 2026 potatonecst </view>
)}
```
三項演算子 `cond ? true : false` を使うことで、HTMLの中にロジックを埋め込んでいます。

## 3. 技術的なポイントまとめ
1.  **宣言的UI**: 「ボタンの色を赤にする」という命令を書くのではなく、「エラー状態なら赤になる」という**ルール**を書くのがReact流です。
2.  **コンポーネント指向**: 画面を「背景」「ロゴ」「メニュー」といった部品に分け、それぞれを独立して作ることで、複雑な画面も管理しやすくなります。
3.  **Unityとの連携**: `window` オブジェクトを経由して、C#（Unity）からの入力を受け取ったり、逆にC#へ命令を送ったり（ゲーム開始など）しています。