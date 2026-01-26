import { type ReactNode } from 'react';

interface MenuButtonProps {
    label: string;
    isSelected: boolean;
    onClick?: () => void;
    style?: any;
    className?: string;
    barClass?: string;
}

// メニュー画面などで使う、選択時に背景が伸びるボタン
// 役割: 選択状態（isSelected）に応じて見た目を変化させ、ユーザーに現在のフォーカス位置を伝える
export const MenuButton = ({ label, isSelected, onClick, style, className, barClass }: MenuButtonProps) => {
    // 背景バーの幅を指定するクラス。指定がなければデフォルト幅(w-80)を使用。
    const barWidth = barClass || 'w-80';
    return (
        <view
            className={`relative w-full transition-opacity duration-300 ${className || 'h-12 mb-2'}`}
            style={style || {}}
            onClick={onClick}
        >
            {/* 背景（長方形）: 選択されると幅が伸びるアニメーション */}
            {/* transition-all duration-300 により、幅の変化が滑らかになります */}
            <view
                className={`bg-[#ff3333] border border-[#ff3333] transition-all duration-300 absolute left-0 top-0 bottom-0 bg-opacity-10 ${isSelected ? barWidth : 'w-0'}`}
            />
            {/* テキストと矢印 */}
            <view className="absolute left-0 top-0 bottom-0 right-0 flex-row items-center pl-2">
                {/* 選択時のみ表示される矢印（▶） */}
                <text
                    className={`text-sm mr-1 transition-colors duration-300 ${isSelected ? 'text-white opacity-100' : 'text-gray-300 opacity-0'}`}
                    style={{ top: -1 }}
                >
                    ▶
                </text>
                {/* ボタンのラベルテキスト。選択時は白く、非選択時は少し暗くする */}
                <text
                    className={`text-sm transition-colors duration-300 ${isSelected ? 'text-white' : 'text-[#e2e8f0]'}`}
                    style={{ opacity: isSelected ? 1 : 0.6 }}
                >
                    {label}
                </text>
            </view>
        </view>
    );
};