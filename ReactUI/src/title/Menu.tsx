import { Button } from '../components/Button';

interface MenuProps {
    onNavigate: (screen: 'ranking' | 'settings' | 'title') => void;
    onPlay: () => void;
}

export const Menu = ({ onNavigate, onPlay }: MenuProps) => {
    return (
        <view>
            <text style={{ fontSize: 30, marginBottom: 20 }}>Main Menu</text>
            <Button style={{ marginBottom: 10 }} onClick={onPlay}>Play Game</Button>
            <Button style={{ marginBottom: 10 }} onClick={() => onNavigate('ranking')}>Ranking</Button>
            <Button style={{ marginBottom: 10 }} onClick={() => onNavigate('settings')}>Settings</Button>
            <Button onClick={() => onNavigate('title')}>Back to Title</Button>
        </view>
    );
};