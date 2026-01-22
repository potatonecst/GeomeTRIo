import { useState, useEffect } from 'react';

// 親コンポーネントから受け取るプロパティ（Props）の定義
// これにより、メニュー項目が選ばれたときに親側で画面遷移などの処理を実行できる
interface MenuProps {
    onNavigate: (screen: 'ranking' | 'settings') => void; // 画面遷移用コールバック
    onPlay: () => void; // ゲーム開始用コールバック
    onBack: () => void; // 戻る用コールバック
    onExit: () => void; // ゲーム終了用コールバック
    isExiting?: boolean; // 終了アニメーション中かどうかのフラグ
}

// メニューリストを表示・操作するコンポーネント
export const Menu = ({ onNavigate, onPlay, onBack, onExit, isExiting }: MenuProps) => {
    // selectedIndex: 現在どのメニュー項目が選択されているか（0番目〜3番目）
    const [selectedIndex, setSelectedIndex] = useState(0);

    // opacity: メニュー全体の不透明度。フェードイン/アウトアニメーションに使用
    const [opacity, setOpacity] = useState(0);

    // メニュー項目の定義
    // label: 表示する文字, action: 決定時に実行する関数
    const menuItems = [
        { label: "Stage Select", action: onPlay },
        { label: "Ranking", action: () => onNavigate('ranking') },
        { label: "Settings", action: () => onNavigate('settings') },
        { label: "Exit Game", action: onExit },
    ];

    // フェードイン・フェードアウト制御
    // isExitingフラグが変わった時に実行される
    useEffect(() => {
        if (isExiting) {
            setOpacity(0); // 終了時は透明にする（フェードアウト）
        } else {
            // 開始時は少し待ってから不透明にする（フェードイン）
            const timer = setTimeout(() => setOpacity(1), 50);
            return () => clearTimeout(timer);
        }
    }, [isExiting]);

    // C#からの入力を監視
    // Unity側でキー入力があった時に window.onMenuInput が呼ばれる想定
    useEffect(() => {
        (window as any).onMenuInput = (event: string) => {
            if (event === 'up') {
                // 上キー: 選択位置を一つ前に戻す。
                // (prev - 1 + length) % length の計算式について:
                // 単に -1 すると 0 の次が -1 になってしまいますが、lengthを足してから割った余り(%)を求めることで、
                // 0 の次は 末尾(length-1) になるように循環（ループ）させています。
                setSelectedIndex(prev => (prev - 1 + menuItems.length) % menuItems.length);
            } else if (event === 'down') {
                // 下キー: 選択位置を一つ進める。
                // (prev + 1) % length を使うことで、末尾の次は 0 に戻るように循環させています。
                setSelectedIndex(prev => (prev + 1) % menuItems.length);
            } else if (event === 'submit') {
                // 決定キー: 現在選択中の項目のアクションを実行
                menuItems[selectedIndex].action();
            } else if (event === 'cancel') {
                // キャンセルキー: 戻る処理を実行
                onBack();
            }
        };

        // クリーンアップ: コンポーネントが消える時に関数を空にする
        return () => { (window as any).onMenuInput = () => { }; };
    }, [selectedIndex, menuItems, onBack]); // selectedIndexを依存配列に入れることで、submit時に最新のindexを参照する

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
                    <view
                        key={index}
                        className="relative h-12 mb-2 w-full transition-opacity duration-300"
                        // 各項目を少しずつ遅らせて表示する（カスケードアニメーション）
                        // index * 120: 0番目は0ms, 1番目は120ms, 2番目は240ms...と遅延時間をずらしています。
                        style={{ opacity, transitionDelay: `${isExiting ? 0 : index * 120}ms` }}
                    >
                        {/* 背景（長方形）: 下線の代わりに配置。文字の後ろに表示されるように先に記述 */}
                        <view
                            className={`bg-[#ff3333] border border-[#ff3333] transition-all duration-300 absolute left-0 top-0 bottom-0 bg-opacity-10 ${isSelected ? 'w-80' : 'w-0'}`}
                        />
                        <view className="absolute left-0 top-0 bottom-0 right-0 flex-row items-center pl-2">
                            {/* 矢印 */}
                            <text
                                className={`text-sm mr-1 transition-colors duration-300 ${isSelected ? 'text-white opacity-100' : 'text-gray-300 opacity-0'}`}
                                style={{ top: -1 }}
                            >
                                ▶
                            </text>
                            <text
                                className={`text-sm transition-colors duration-300 ${isSelected ? 'text-white' : 'text-[#e2e8f0]'}`}
                                style={{ opacity: isSelected ? 1 : 0.6 }}
                            >
                                {item.label}
                            </text>
                        </view>
                    </view>
                );
            })}
        </view>
    );
};