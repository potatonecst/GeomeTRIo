import { type ReactNode } from 'react';

// ボタンコンポーネントのプロパティ定義
export interface ButtonProps {
    // children: Reactの特別なプロパティ。
    // <Button>ここにある中身</Button> の「ここにある中身」が自動的に渡されます。
    children: ReactNode;
    onClick?: () => void;
    style?: any;
    className?: string;
}

// 共通のボタンスタイルを提供するコンポーネント
// ReactUnityの <button> 要素をラップしている
export const Button = ({ children, onClick, style, className }: ButtonProps) => {
    return (
        <button
            className={className}
            onClick={onClick}
            style={{
                padding: '10px 20px',
                backgroundColor: '#eee',
                borderRadius: '5px',
                alignItems: 'center',
                justifyContent: 'center',
                ...style
            }}
        >
            {/* 文字列が渡された場合は <text> で囲む必要がある（ReactUnityの仕様） */}
            {/* typeof children === 'string': childrenの中身が「文字」かどうかを判定しています。 */}
            {/* ReactUnityでは <view> や <button> の中に直接文字を書けないため、<text>タグで囲む処理を自動化しています。 */}
            {typeof children === 'string' ? <text>{children}</text> : children}
        </button>
    );
};