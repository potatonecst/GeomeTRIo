import { render, useGlobals } from '@reactunity/renderer';
import { useState, useEffect } from 'react';
import '../index.css';
import { HUD } from './HUD';
import { GlitchText } from '../components/GlitchText';
import { useGameStatus } from '../hooks/useGameStatus';
import { MenuButton } from '../components/MenuButton';

// ゲームオーバーパネルコンポーネント
// 役割: ゲームオーバー時に表示され、リトライかタイトルへ戻るかを選択させる
const GameOverPanel = () => {
    // useGlobals: C#側のGameInteropにアクセスするためのフック
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;

    // useGameStatus: 現在のゲーム状態（スコア、HP、ゲームオーバーフラグ等）を取得するカスタムフック
    const status = useGameStatus();

    // ボタン選択状態の管理 (0: Restart, 1: Title)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPressed, setIsPressed] = useState(false);

    // ゲームオーバー時のみ入力を受け付ける
    useEffect(() => {
        if (!status.isGameOver) return;

        // window.onMenuInput: C# (ReactInputBridge) から呼び出される入力イベントハンドラ
        (window as any).onMenuInput = (event: string) => {
            if (event === 'left') {
                // 現在の選択が0でない場合のみ移動処理を行う
                // これにより、左端でさらに左を押した時に無駄なSEが鳴るのを防ぐ
                if (selectedIndex !== 0) {
                    interop?.PlaySound('move');
                    setSelectedIndex(0);
                }
            } else if (event === 'right') {
                // 右端での連打防止
                if (selectedIndex !== 1) {
                    interop?.PlaySound('move');
                    setSelectedIndex(1);
                }
            } else if (event === 'submit') {
                interop?.PlaySound('submit');
                // ボタンの押下アニメーションを開始
                setIsPressed(true);

                // アニメーションの完了を待ってからアクションを実行
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

        // クリーンアップ: コンポーネントが非表示になる際、ハンドラを無効化する
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

// ポーズパネルコンポーネント
// 役割: ゲーム一時停止時に表示され、再開かタイトルへ戻るかを選択させる
const PausePanel = () => {
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;
    const status = useGameStatus();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPressed, setIsPressed] = useState(false);

    // ポーズ中のみ入力を監視
    useEffect(() => {
        if (!status.isPaused) return;

        (window as any).onMenuInput = (event: string) => {
            if (event === 'left') {
                // 移動可能な場合のみ処理（SE連打防止）
                if (selectedIndex !== 0) {
                    interop?.PlaySound('move');
                    setSelectedIndex(0);
                }
            } else if (event === 'right') {
                // 移動可能な場合のみ処理（SE連打防止）
                if (selectedIndex !== 1) {
                    interop?.PlaySound('move');
                    setSelectedIndex(1);
                }
            } else if (event === 'submit') {
                interop?.PlaySound('submit');
                // 押下アニメーション
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

        // クリーンアップ
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

// ゲームシーン全体のルートコンポーネント
// 役割: HUD、ポーズ、ゲームオーバー画面の統括と、シーン遷移時の演出（ローディング、暗転）を管理
const GameApp = () => {
    // ローディング表示フラグ（タイトルへ戻る時などに使用）
    const [isLoading, setIsLoading] = useState(false);
    // シーン遷移直後は真っ暗な状態から始める（フェードインのため true で初期化）
    const [isBlackout, setIsBlackout] = useState(true);

    useEffect(() => {
        // マウント後、少し待ってからフェードイン（暗転解除）を開始
        const timer = setTimeout(() => setIsBlackout(false), 100);

        // C#からの演出リクエストを受け取るハンドラを登録
        // onLoadingRequest: ローディング画面を表示せよ
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
