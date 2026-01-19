import { render } from '@reactunity/renderer';
import { useState, useEffect } from 'react';
import '../index.css';
import { Menu } from './Menu';
import { Ranking } from './Ranking';
import { Settings } from './Settings';

// 画面の定義
type Screen = 'title' | 'ranking' | 'settings';

const TitleApp = () => {
    // 現在どの画面を表示しているかを管理するState
    const [currentScreen, setCurrentScreen] = useState<Screen>('title');
    // タイトル画面内での状態（キーを押す前か、メニュー表示中か）
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 入力イベントの登録
    useEffect(() => {
        // 1. Press Any Button の検知
        if (currentScreen === 'title' && !isMenuOpen) {
            (window as any).onAnyKeyPress = () => {
                setIsMenuOpen(true);
            };
        } else {
            (window as any).onAnyKeyPress = () => { };
        }

        // 2. メニュー操作の検知 (Menuコンポーネント等で処理するためにグローバル関数を空定義しておく)
        // 実際の処理は各コンポーネントの useEffect で上書きされる
        if (!((window as any).onMenuInput)) {
            (window as any).onMenuInput = () => { };
        }

        return () => {
            (window as any).onAnyKeyPress = () => { };
        };
    }, [currentScreen, isMenuOpen]);

    return (
        <view className="w-full h-full flex-col justify-center items-center bg-black">
            {/* タイトル画面 */}
            {currentScreen === 'title' && (
                <view className="w-full h-full flex-col items-center justify-start pt-20">
                    <text className="text-5xl mb-10 text-white" style={{ fontFamily: 'Melete-Bold' }}>GeomeTRIo</text>

                    {!isMenuOpen ? (
                        <view className="mt-40">
                            <text className="text-xl animate-pulse text-gray-400" style={{ fontFamily: 'Melete-Medium' }}>Press Any Button</text>
                        </view>
                    ) : (
                        <Menu
                            onNavigate={(screen) => setCurrentScreen(screen)}
                            onPlay={() => console.log("Game Start!")}
                            onBack={() => setIsMenuOpen(false)}
                        />
                    )}
                </view>
            )}

            {/* ランキング画面 */}
            {currentScreen === 'ranking' && (
                <Ranking onBack={() => setCurrentScreen('title')} />
            )}

            {/* 設定画面 */}
            {currentScreen === 'settings' && (
                <Settings onBack={() => setCurrentScreen('title')} />
            )}
        </view>
    );
};

render(<TitleApp />);