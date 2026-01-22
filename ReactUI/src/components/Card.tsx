import { type ReactNode } from 'react';

export interface CardProps {
    children: ReactNode;
    style?: any;
    className?: string;
}

// 情報を枠で囲って表示するためのカードコンポーネント
export const Card = ({ children, style, className }: CardProps) => {
    return (
        <view
            className={className}
            style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                padding: '15px',
                border: '1px solid #e0e0e0',
                // ...style (スプレッド構文): 親コンポーネントから渡された style オブジェクトの中身をここに展開します。
                // これにより、デフォルトのスタイル（背景色など）を維持しつつ、呼び出し側で幅やマージンなどを上書き・追加できます。
                ...style
            }}
        >
            {children}
        </view>
    );
};