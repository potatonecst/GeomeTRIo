import { Button } from '../components/Button';

interface MenuProps {
    onNavigate: (screen: 'ranking' | 'settings' | 'title') => void;
    onPlay: () => void;
}

export const Menu = ({ onNavigate, onPlay }: MenuProps) => {
    return (
        <view className="flex-col items-center w-full">
            <text className="text-3xl mb-5 text-white font-['Melete-Bold']">Main Menu</text>
            <Button className="mb-2.5 w-60" onClick={onPlay}>Play Game</Button>
            <Button className="mb-2.5 w-60" onClick={() => onNavigate('ranking')}>Ranking</Button>
            <Button className="mb-2.5 w-60" onClick={() => onNavigate('settings')}>Settings</Button>
            <Button className="w-60" onClick={() => onNavigate('title')}>Back to Title</Button>
        </view>
    );
};