import { useState, useEffect, useMemo } from 'react';
import { MenuButton } from '../components/MenuButton';
import { useGlobals } from '@reactunity/renderer';

// 親コンポーネントから受け取るプロパティ（Props）の定義
// これにより、メニュー項目が選ばれたときに親側で画面遷移などの処理を実行できる
interface MenuProps {
    onNavigate: (screen: 'stage_select' | 'ranking' | 'settings') => void; // 画面遷移用コールバック
    onPlay: () => void; // ゲーム開始用コールバック
    onBack: () => void; // 戻る用コールバック
    onExit: () => void; // ゲーム終了用コールバック
    isExiting?: boolean; // 終了アニメーション中かどうかのフラグ
    initialIndex?: number; // 初期選択インデックス（前回位置の復元用）
    onIndexChange?: (index: number) => void; // 選択位置が変更された時の通知用
}

// メニューリストを表示・操作するコンポーネント
// 役割: タイトル画面でのメインメニュー（Stage Select, Ranking, Settings, Exit）の表示と入力制御を担当します。
export const Menu = ({ onNavigate, onPlay, onBack, onExit, isExiting, initialIndex = 0, onIndexChange }: MenuProps) => {
    // C#側のGameInteropにアクセスするためにglobalsを取得
    // useGlobals: ReactUnityが提供するフック。Unity側で登録したグローバルオブジェクトにアクセスできます。
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;

    // selectedIndex: 現在どのメニュー項目が選択されているか（0番目〜3番目）
    // useState: コンポーネントの状態を管理するフック。値が変わると再描画されます。
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);

    // opacity: メニュー全体の不透明度。フェードイン/アウトアニメーションに使用
    const [opacity, setOpacity] = useState(0);

    // 画面遷移中（フェードアウト中）かどうか
    const [isNavigating, setIsNavigating] = useState(false);

    // メニュー項目の定義
    // label: 表示する文字, action: 決定時に実行する関数
    // useMemo: 依存配列の中身が変わらない限り、前回の配列を再利用する（メモ化）。
    // これにより、レンダリングごとに新しい配列が作られるのを防ぎ、useEffectの無駄な再実行を抑制できる。
    const menuItems = useMemo(() => [
        { label: "Stage Select", action: () => onNavigate('stage_select') },
        { label: "Ranking", action: () => onNavigate('ranking') },
        { label: "Settings", action: () => onNavigate('settings') },
        { label: "Exit Game", action: onExit },
    ], [onPlay, onNavigate, onExit]);

    // フェードイン・フェードアウト制御
    // isExitingフラグが変わった時に実行される
    // useEffect: 副作用（画面描画以外の処理）を実行するフック。ここではタイマーを使ったアニメーション制御を行います。
    useEffect(() => {
        if (isExiting || isNavigating) {
            setOpacity(0); // 終了時は透明にする（フェードアウト）
        } else {
            // 開始時は少し待ってから不透明にする（フェードイン）
            // setTimeoutを使うことで、レンダリング直後ではなく少し遅らせてアニメーションを開始させます。
            const timer = setTimeout(() => setOpacity(1), 50);
            return () => clearTimeout(timer);
        }
    }, [isExiting, isNavigating]);

    // 選択インデックスが変更されたら親コンポーネントに通知する
    // これにより、画面を行き来してもカーソル位置を記憶・復元できるようになります。
    useEffect(() => {
        if (onIndexChange) {
            onIndexChange(selectedIndex);
        }
    }, [selectedIndex, onIndexChange]);

    // C#からの入力を監視
    // Unity側でキー入力があった時に window.onMenuInput が呼ばれる想定
    useEffect(() => {
        (window as any).onMenuInput = (event: string) => {
            if (isNavigating || isExiting) return; // 遷移中は入力を受け付けない

            if (event === 'up') {
                interop?.PlaySound('move');
                // 上キー: 選択位置を一つ前に戻す。
                // (prev - 1 + length) % length の計算式について:
                // 単に -1 すると 0 の次が -1 になってしまいますが、lengthを足してから割った余り(%)を求めることで、
                // 0 の次は 末尾(length-1) になるように循環（ループ）させています。
                setSelectedIndex(prev => (prev - 1 + menuItems.length) % menuItems.length);
            } else if (event === 'down') {
                interop?.PlaySound('move');
                // 下キー: 選択位置を一つ進める。
                // (prev + 1) % length を使うことで、末尾の次は 0 に戻るように循環させています。
                setSelectedIndex(prev => (prev + 1) % menuItems.length);
            } else if (event === 'submit') {
                interop?.PlaySound('submit');
                // 決定キー: 現在選択中の項目のアクションを実行
                // アニメーションのために少し待ってから実行
                setIsNavigating(true);
                setTimeout(() => {
                    menuItems[selectedIndex].action();
                }, 300);
            } else if (event === 'cancel') {
                interop?.PlaySound('cancel');
                // キャンセルキー: 戻る処理を実行
                onBack();
            }
        };

        // クリーンアップ: コンポーネントが消える時に関数を空にする
        // これを忘れると、コンポーネントが消えた後もイベントが発火し続け、エラーの原因になります。
        return () => { (window as any).onMenuInput = () => { }; };
    }, [selectedIndex, menuItems, onBack, isNavigating, isExiting, interop]); // selectedIndexを依存配列に入れることで、submit時に最新のindexを参照する

    return (
        <view
            className="flex-col items-start w-full mb-10 pl-24 font-sans"
        >
            {/* menuItems配列をループして、各項目のViewを生成する */}
            {/* mapメソッド: 配列の要素を一つずつ取り出し、JSX（タグ）に変換して新しい配列を作ります。 */}
            {menuItems.map((item, index) => {
                // この項目が現在選択されているかどうか
                const isSelected = index === selectedIndex;
                return (
                    <MenuButton
                        key={index}
                        label={item.label}
                        isSelected={isSelected}
                        // 画面遷移中（決定後）かつ、この項目が選択されている場合に「押下状態」にする
                        isPressed={isNavigating && isSelected}
                        // 各項目を少しずつ遅らせて表示する（カスケードアニメーション）
                        // index * 120: 0番目は0ms, 1番目は120ms, 2番目は240ms...と遅延時間をずらしています。
                        style={{ opacity, transitionDelay: `${(isExiting || isNavigating) ? 0 : index * 120}ms` }}
                    />
                );
            })}
        </view>
    );
};