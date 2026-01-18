import { type ReactNode } from 'react';

export interface CardProps {
    children: ReactNode;
    style?: any;
    className?: string;
}

export const Card = ({ children, style, className }: CardProps) => {
    return (
        <view
            className={className}
            style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                padding: '15px',
                border: '1px solid #e0e0e0',
                ...style
            }}
        >
            {children}
        </view>
    );
};