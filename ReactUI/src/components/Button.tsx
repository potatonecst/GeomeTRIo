import { type ReactNode } from 'react';

export interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    style?: any;
}

export const Button = ({ children, onClick, style }: ButtonProps) => {
    return (
        <button
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