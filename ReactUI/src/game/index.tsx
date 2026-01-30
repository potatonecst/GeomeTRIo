import { render, useGlobals } from '@reactunity/renderer';
import { useState, useEffect } from 'react';
import '../index.css';
import { HUD } from './HUD';
import { GlitchText } from '../components/GlitchText';
import { useGameStatus } from '../hooks/useGameStatus';
import { MenuButton } from '../components/MenuButton';

// ゲームオーバーパネル
const GameOverPanel = () => {
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;
    const status = useGameStatus();

    // ボタン選択状態の管理 (0: Restart, 1: Title)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPressed, setIsPressed] = useState(false);

    // ゲームオーバー時のみ入力を受け付ける
    useEffect(() => {
        if (!status.isGameOver) return;

        (window as any).onMenuInput = (event: string) => {
            if (event === 'left') {
                interop?.PlaySound('move');
                setSelectedIndex(0);
            } else if (event === 'right') {
                interop?.PlaySound('move');
                setSelectedIndex(1);
            } else if (event === 'submit') {
                interop?.PlaySound('submit');
                setIsPressed(true);
                setTimeout(() => {
                    if (selectedIndex === 0) {
                        interop?.RestartGame();
                    } else {
                        interop?.ReturnToTitle();
                    }
                    setIsPressed(false);
                }, 200);
            }
        };

        return () => { (window as any).onMenuInput = () => { }; };
    }, [status.isGameOver, selectedIndex, interop]);

    // 表示状態の管理
    // status.isGameOver が true の時だけ表示
    if (!status.isGameOver) return null;

    // 常にレンダリングしておき、opacityで表示/非表示を切り替える（フェード用）
    return (
        <view
            className="absolute inset-0 items-center justify-center bg-black bg-opacity-80 transition-opacity duration-500 pointer-events-auto"
        >
            <view className="flex-col items-center p-12 border-4 border-red-600 bg-black w-[800px]">
                <GlitchText text="GAME OVER" isAlert={true} className="text-8xl text-red-600 mb-4 font-bold tracking-widest" />

                {status.isNewHighScore && (
                    <GlitchText text="NEW HIGH SCORE!" isAlert={false} className="text-5xl text-yellow-400 mb-12 font-bold tracking-widest animate-pulse" />
                )}

                {/* justify-between で両端に配置し、px-12 で内側に余白を持たせることで確実に間隔を空ける */}
                <view className="flex-row w-full justify-between px-12 mt-8">
                    <view className="w-64">
                        <MenuButton
                            label="RETRY"
                            isSelected={selectedIndex === 0}
                            isPressed={isPressed && selectedIndex === 0}
                            onClick={() => { }} // クリック処理はonMenuInputで統一
                            barClass="w-full"
                            className="h-20"
                        />
                    </view>
                    <view className="w-64">
                        <MenuButton
                            label="MENU"
                            isSelected={selectedIndex === 1}
                            isPressed={isPressed && selectedIndex === 1}
                            onClick={() => { }}
                            barClass="w-full"
                            className="h-20"
                        />
                    </view>
                </view>
            </view>
        </view>
    );
};

// ポーズパネル
const PausePanel = () => {
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;
    const status = useGameStatus();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        if (!status.isPaused) return;

        (window as any).onMenuInput = (event: string) => {
            if (event === 'left') {
                interop?.PlaySound('move');
                setSelectedIndex(0);
            } else if (event === 'right') {
                interop?.PlaySound('move');
                setSelectedIndex(1);
            } else if (event === 'submit') {
                interop?.PlaySound('submit');
                setIsPressed(true);
                setTimeout(() => {
                    if (selectedIndex === 0) {
                        interop?.ResumeGame();
                    } else {
                        interop?.ReturnToTitle();
                    }
                    setIsPressed(false);
                }, 200);
            } else if (event === 'cancel') {
                // キャンセルキーでも再開できるようにする
                interop?.ResumeGame();
            }
        };

        return () => { (window as any).onMenuInput = () => { }; };
    }, [status.isPaused, selectedIndex, interop]);

    if (!status.isPaused) return null;

    return (
        <view
            className="absolute inset-0 items-center justify-center bg-black bg-opacity-80 transition-opacity duration-500 pointer-events-auto"
        >
            <view className="flex-col items-center p-12 border-4 border-cyan-600 bg-black w-[800px]">
                <GlitchText text="PAUSE" isAlert={false} className="text-8xl text-cyan-600 mb-12 font-bold tracking-widest" />

                <view className="flex-row w-full justify-between px-12 mt-8">
                    <view className="w-64">
                        <MenuButton
                            label="RESUME"
                            isSelected={selectedIndex === 0}
                            isPressed={isPressed && selectedIndex === 0}
                            onClick={() => { }}
                            barClass="w-full"
                            className="h-20"
                        />
                    </view>
                    <view className="w-64">
                        <MenuButton
                            label="MENU"
                            isSelected={selectedIndex === 1}
                            isPressed={isPressed && selectedIndex === 1}
                            onClick={() => { }}
                            barClass="w-full"
                            className="h-20"
                        />
                    </view>
                </view>
            </view>
        </view>
    );
};

const GameApp = () => {
    const [isLoading, setIsLoading] = useState(false);
    // シーン遷移直後は真っ暗な状態から始める（フェードインのため true で初期化）
    const [isBlackout, setIsBlackout] = useState(true);

    useEffect(() => {
        // マウント後にフェードイン（暗転解除）
        const timer = setTimeout(() => setIsBlackout(false), 100);

        (window as any).onLoadingRequest = () => setIsLoading(true);
        (window as any).onFadeOutRequest = () => setIsBlackout(true);
        return () => {
            clearTimeout(timer);
            (window as any).onLoadingRequest = () => { };
            (window as any).onFadeOutRequest = () => { };
        };
    }, []);

    return (
        <view className="w-full h-full">
            <HUD />
            <PausePanel />
            <GameOverPanel />

            {/* Loading Screen */}
            {isLoading && (
                <view className="absolute inset-0 items-center justify-center bg-black bg-opacity-80 pointer-events-none" style={{ zIndex: 9998 }}>
                    <view className="flex-row items-center">
                        <GlitchText text="LOADING" isAlert={false} className="text-6xl text-cyan-400 whitespace-nowrap tracking-widest" />
                        <view className="custom-spin w-12 h-12 border-8 border-cyan-900 border-t-cyan-400 rounded-full ml-6" />
                    </view>
                </view>
            )}

            {/* Blackout Overlay */}
            <view
                className="absolute top-0 left-0 w-full h-full bg-black pointer-events-none transition-opacity duration-500"
                style={{ opacity: isBlackout ? 1 : 0, zIndex: 9999 }}
            />
        </view>
    );
};

render(<GameApp />);
