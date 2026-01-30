
interface MenuButtonProps {
    label: string;
    isSelected: boolean;
    isPressed?: boolean; // 押下状態フラグ
    onClick?: () => void;
    style?: any;
    className?: string;
    barClass?: string;
}

// メニュー画面などで使う、選択時に背景が伸びるボタン
// 役割: 選択状態（isSelected）に応じて見た目を変化させ、ユーザーに現在のフォーカス位置を伝える
// 技術的ポイント: CSSの transition プロパティを使用して、幅や色の変化を滑らかにアニメーションさせています。
export const MenuButton = ({ label, isSelected, isPressed, onClick, style, className, barClass }: MenuButtonProps) => {
    // 背景バーの幅を指定するクラス。指定がなければデフォルト幅(w-80)を使用。
    const barWidth = barClass || 'w-80';
    return (
        <view
            className={`relative w-full transition-opacity duration-300 ${className || 'h-24 mb-4'}`}
            style={style || {}}
            onClick={onClick}
        >
            {/* 背景（長方形）: 選択されると幅が伸びるアニメーション */}
            {/* transition-all duration-300 により、幅の変化が滑らかになります */}
            {/* isPressed時は白く発光させ、アニメーションを高速化(duration-75)してレスポンスを良くする */}
            <view
                className={`border transition-all absolute left-0 top-0 bottom-0 ${isPressed ? 'bg-white border-white duration-75 bg-opacity-100' : 'bg-[#ff3333] border-[#ff3333] duration-300 bg-opacity-10'} ${isSelected ? barWidth : 'w-0'}`}
            />
            {/* テキストと矢印 */}
            <view className="absolute left-0 top-0 bottom-0 right-0 flex-row items-center pl-2">
                {/* 選択時のみ表示される矢印（▶） */}
                {/* isPressed時は矢印も黒くして視認性を確保 */}
                <text
                    className={`text-3xl mr-4 transition-colors duration-300 ${isPressed ? 'text-black' : 'text-white'} ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                    style={{ top: -1 }}
                >
                    ▶
                </text>
                {/* ボタンのラベルテキスト。選択時は白く、非選択時は少し暗くする */}
                <text
                    className={`text-3xl transition-colors duration-300 ${isPressed ? 'text-black font-bold' : (isSelected ? 'text-white' : 'text-[#e2e8f0]')}`}
                    style={{ opacity: isSelected ? 1 : 0.6 }}
                >
                    {label}
                </text>
            </view>
        </view>
    );
};