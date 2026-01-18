import { type ReactNode } from 'react';

export interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    style?: any;
    className?: string;
}

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
            {typeof children === 'string' ? <text>{children}</text> : children}
        </button>
    );
};