import { type ReactNode } from 'react';

interface KeyIconProps {
    icon?: string; // 画像のリソースパス (例: "res:Icons/Button_A")
    label: string; // 画像がない場合に表示する文字 (例: "A") または Unicode文字 (例: "\uE001")
    fontFamily?: string; // アイコンフォントを使用する場合のフォント名
    color?: string; // 文字の場合の色
    className?: string;
}

// コントローラーやキーボードのアイコンを表示するコンポーネント
// SVGやPNG画像がある場合はそれを表示し、なければ文字で代用します
export const KeyIcon = ({ icon, label, fontFamily, color, className }: KeyIconProps) => {
    // 画像パスが指定されている場合は <image> を表示
    if (icon) {
        return (
            <image
                // @ts-ignore
                source={icon}
                className={`w-4 h-4 ${className || ''}`} // サイズは適宜調整
                style={{ objectFit: 'contain' }} // アスペクト比を保持して表示
            />
        );
    }

    // 画像がない場合はテキストを表示（フォールバック）
    return (
        <text className={`${color || 'text-white'} ${className || 'text-xs'}`} style={{ fontFamily }}>
            {label}
        </text>
    );
};