import { render } from '@reactunity/renderer';
import { useState, useEffect } from 'react';
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

    // タイトル画面での入力検知
    useEffect(() => {
        if (currentScreen === 'title') {
            // タイトル画面ならメニューへ遷移する関数を登録
            (window as any).onAnyKeyPress = () => {
                setCurrentScreen('menu');
            };
        } else {
            // それ以外の画面では何もしない関数を登録（エラー回避のため）
            (window as any).onAnyKeyPress = () => { };
        }

        return () => { (window as any).onAnyKeyPress = () => { }; };
    }, [currentScreen]);

    return (
        <view className="w-full h-full flex-col justify-center items-center bg-black">
            {/* タイトル画面 */}
            {currentScreen === 'title' && (
                <view className="w-full h-full flex-col items-center justify-center">
                    {/* フォントが反映されない場合、インラインスタイルで直接指定してみる */}
                    <text className="text-6xl mb-10 text-white" style={{ fontFamily: 'Melete-Bold' }}>GeomeTRIo</text>
                    <text className="text-xl animate-pulse text-gray-400" style={{ fontFamily: 'Melete-Medium' }}>Press Any Button</text>
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