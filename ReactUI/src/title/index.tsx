import { render } from '@reactunity/renderer';
import { useState } from 'react';
import '../index.css';
import { Button } from '../components/Button';
import { Menu } from './Menu';
import { Ranking } from './Ranking';
import { Settings } from './Settings';

// 画面の定義
type Screen = 'title' | 'menu' | 'ranking' | 'settings';

const TitleApp = () => {
    // 現在どの画面を表示しているかを管理するState
    const [currentScreen, setCurrentScreen] = useState<Screen>('title');

    return (
        <view style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            {/* タイトル画面 */}
            {currentScreen === 'title' && (
                <view>
                    <text style={{ fontSize: 40, marginBottom: 20 }}>GeomeTRIo</text>
                    <Button onClick={() => setCurrentScreen('menu')} style={{ width: 200, height: 50 }}>Start</Button>
                </view>
            )}

            {/* メニュー画面 */}
            {currentScreen === 'menu' && (
                <Menu
                    onNavigate={(screen) => setCurrentScreen(screen)}
                    onPlay={() => console.log("Game Start!")}
                />
            )}

            {/* ランキング画面 */}
            {currentScreen === 'ranking' && (
                <Ranking onBack={() => setCurrentScreen('menu')} />
            )}

            {/* 設定画面 */}
            {currentScreen === 'settings' && (
                <Settings onBack={() => setCurrentScreen('menu')} />
            )}
        </view>
    );
};

render(<TitleApp />);