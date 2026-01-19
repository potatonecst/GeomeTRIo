import { useState, useEffect } from 'react';

interface MenuProps {
    onNavigate: (screen: 'ranking' | 'settings') => void;
    onPlay: () => void;
    onBack: () => void;
}

export const Menu = ({ onNavigate, onPlay, onBack }: MenuProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const menuItems = [
        { label: "Play Game", action: onPlay },
        { label: "Ranking", action: () => onNavigate('ranking') },
        { label: "Settings", action: () => onNavigate('settings') },
        { label: "Back", action: onBack },
    ];

    // C#からの入力を監視
    useEffect(() => {
        (window as any).onMenuInput = (event: string) => {
            if (event === 'up') {
                setSelectedIndex(prev => (prev - 1 + menuItems.length) % menuItems.length);
            } else if (event === 'down') {
                setSelectedIndex(prev => (prev + 1) % menuItems.length);
            } else if (event === 'submit') {
                menuItems[selectedIndex].action();
            } else if (event === 'cancel') {
                onBack();
            }
        };

        return () => { (window as any).onMenuInput = () => { }; };
    }, [selectedIndex, menuItems, onBack]); // selectedIndexを依存配列に入れることで、submit時に最新のindexを参照する

    return (
        <view className="flex-col items-start w-full mt-10 pl-24">
            {menuItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                    <view key={index} className="flex-col mb-4">
                        <view className="flex-row items-center">
                            {/* 矢印 */}
                            <text
                                className={`text-2xl text-white mr-3 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                                style={{ fontFamily: 'Melete-Medium' }}
                            >
                                ▶
                            </text>
                            <text
                                className="text-2xl text-white"
                                style={{ fontFamily: 'Melete-Medium', opacity: isSelected ? 1 : 0.6 }}
                            >
                                {item.label}
                            </text>
                        </view>
                        {/* 長めの下線 */}
                        <view className={`h-0.5 bg-white mt-1 transition-all duration-300 ${isSelected ? 'w-96' : 'w-0'}`} />
                    </view>
                );
            })}
        </view>
    );
};