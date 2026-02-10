import { render, useGlobals } from '@reactunity/renderer';
import { useState, useEffect, useRef, useCallback } from 'react';
import '../index.css';
import { HUD, type HUDState } from './HUD';
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

// ステージ開始カットインコンポーネント
type CutinAction = 'show_frame' | 'show_labels' | 'show_engine' | 'show_weapon' | 'show_vital' | 'show_telemetry' | 'start_scan' | 'end_scan' | 'show_system' | 'show_vision';

const StageStartCutin = ({ stageName, onComplete, onProgress }: { stageName: string, onComplete: () => void, onProgress: (action: CutinAction) => void }) => {
    // アニメーションを開始するためのトリガー
    const [isAnimating, setIsAnimating] = useState(false);

    // onCompleteの最新の参照を保持するRef
    const onCompleteRef = useRef(onComplete);
    const onProgressRef = useRef(onProgress);

    useEffect(() => {
        onCompleteRef.current = onComplete;
        onProgressRef.current = onProgress;
    }, [onComplete, onProgress]);

    const sequence = [
        { text: "BOOT_SEQUENCE_INIT...", delay: 200 },
        { text: "INITIALIZING_INTERFACE...", delay: 500, action: 'show_frame' as CutinAction },
        { text: "CONNECTING_ENGINE... OK", delay: 900, action: 'show_engine' as CutinAction },
        { text: "LOADING_WEAPON_MODULES... OK", delay: 1200, action: 'show_weapon' as CutinAction },
        { text: "CHECKING_VITAL_SIGNS... OK", delay: 1500, action: 'show_vital' as CutinAction },
        { text: "STARTING_TELEMETRY... OK", delay: 1800, action: 'show_telemetry' as CutinAction },
        { text: "SCANNING_ENVIRONMENT...", delay: 2100, action: 'start_scan' as CutinAction },
        { text: `ENTRY_POINT_CONFIRMED: [ ${stageName} ]`, delay: 2600, action: 'end_scan' as CutinAction },
        { text: "SYSTEM_ALL_GREEN", delay: 3000, action: 'show_system' as CutinAction },
        { text: "VISUAL_FEED_ONLINE", delay: 3400, action: 'show_vision' as CutinAction },
        { text: ">> MISSION START", delay: 4000 },
    ];

    useEffect(() => {
        const timeouts: any[] = [];

        // アニメーション開始トリガー
        const startTimer = setTimeout(() => setIsAnimating(true), 100);
        timeouts.push(startTimer);

        // ログに対応するアクションを時間差で実行
        sequence.forEach(({ delay, action }) => {
            const t = setTimeout(() => {
                if (action && onProgressRef.current) {
                    onProgressRef.current(action);
                }
            }, delay);
            timeouts.push(t);
        });

        // 完了通知
        const tComplete = setTimeout(() => {
            if (onCompleteRef.current) onCompleteRef.current();
        }, 5000); // シーケンス終了まで待機
        timeouts.push(tComplete);

        return () => { timeouts.forEach(clearTimeout); };
    }, [stageName]); // stageNameが変わったら再実行

    return (
        <view
            className="absolute inset-0 bg-black items-center justify-center pointer-events-none"
            style={{ zIndex: 10001, backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
            {/* ターミナルウィンドウ */}
            <view
                className={`flex-col w-[800px] bg-black border-2 border-cyan-600 bg-opacity-90 p-1 shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                style={{
                }}
            >
                {/* ウィンドウヘッダー */}
                <view className="flex-row justify-between bg-cyan-900 px-2 py-1 mb-2">
                    <text className="text-cyan-100 text-xl font-mono" style={{ fontFamily: 'SourceHanCodeJP' }}>TERMINAL_OUTPUT</text>
                    <text className="text-cyan-100 text-xl font-mono" style={{ fontFamily: 'SourceHanCodeJP' }}>v3.0.1</text>
                </view>

                {/* ログエリア */}
                <view className="flex-col items-start p-4">
                    {/* 全てのログを最初から描画しておく */}
                    {sequence.map((item, i) => {
                        // 最後の行（MISSION START）は強調表示
                        const isHighlight = item.text.includes("MISSION START");
                        return (
                            <text
                                key={i}
                                className={`text-xl font-mono mb-1 tracking-wider transition-opacity duration-300 ${isHighlight ? 'text-yellow-400 font-bold' : 'text-cyan-400'} ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                                style={{
                                    fontFamily: 'SourceHanCodeJP',
                                    transitionDelay: `${item.delay}ms`,
                                }}
                            >
                                {`> ${item.text}`}
                            </text>
                        );
                    })}
                    {/* カーソルも最後のログの後に表示 */}
                    <view
                        className={`w-3 h-5 bg-cyan-400 mt-1 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            transitionDelay: `${sequence[sequence.length - 1].delay + 100}ms`,
                        }}
                    />
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
    // カットイン表示中かどうか
    const [isCutinPlaying, setIsCutinPlaying] = useState(true);

    // HUDの表示状態管理
    const [hudState, setHudState] = useState<HUDState>({
        frame: false,
        labels: false,
        vital: false,
        engine: false,
        weapon: false,
        env: false,
        isScanning: false,
        telemetry: false,
        system: false
    });

    const globals = useGlobals() as any;
    const interop = globals.GameInterop;
    // ステージ名を取得（HUDと同じロジックで取得するか、statusから取る）
    const status = useGameStatus();

    useEffect(() => {
        // マウント後の自動フェードインは廃止し、カットインの進行に任せる
        // ただし、カットインがない場合（万が一のフォールバック）のために安全策を入れても良いが、
        // 基本的に isCutinPlaying=true で始まるため、カットイン側で制御する。

        // C#からの演出リクエストを受け取るハンドラを登録
        // onLoadingRequest: ローディング画面を表示せよ
        (window as any).onLoadingRequest = () => setIsLoading(true);
        (window as any).onFadeOutRequest = () => setIsBlackout(true);
        return () => {
            (window as any).onLoadingRequest = () => { };
            (window as any).onFadeOutRequest = () => { };
        };
    }, []);

    // カットイン完了時の処理
    const handleCutinComplete = useCallback(() => {
        setIsCutinPlaying(false);
        // ゲームループ開始をUnityに通知
        interop?.StartGameLoop();
    }, [interop]);

    // カットイン進行中のアクション処理
    const handleCutinProgress = useCallback((action: CutinAction) => {
        if (action === 'show_frame') {
            setHudState(prev => ({ ...prev, frame: true, labels: true }));
        } else if (action === 'show_engine') {
            setHudState(prev => ({ ...prev, engine: true }));
        } else if (action === 'show_weapon') {
            setHudState(prev => ({ ...prev, weapon: true }));
        } else if (action === 'show_vital') {
            setHudState(prev => ({ ...prev, vital: true }));
        } else if (action === 'show_telemetry') {
            setHudState(prev => ({ ...prev, telemetry: true }));
        } else if (action === 'start_scan') {
            setHudState(prev => ({ ...prev, env: true, isScanning: true }));
        } else if (action === 'end_scan') {
            setHudState(prev => ({ ...prev, isScanning: false }));
        } else if (action === 'show_system') {
            setHudState(prev => ({ ...prev, system: true }));
        } else if (action === 'show_vision') {
            setIsBlackout(false);
        }
    }, []);

    return (
        <view className="w-full h-full">
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

            {/* HUD: Blackout Overlay(9999)より手前に表示するために、この位置に配置しzIndexを指定 */}
            <view className="absolute inset-0 pointer-events-none" style={{ zIndex: 10000 }}>
                <HUD hudState={hudState} />
            </view>

            {/* Start Cutin */}
            {/* HUD(10000)よりもさらに手前に表示するために、JSXの最後に配置 */}
            {isCutinPlaying && (
                <StageStartCutin
                    stageName={status.stageName || "STAGE START"}
                    onComplete={handleCutinComplete}
                    onProgress={handleCutinProgress}
                />
            )}
        </view>
    );
};

render(<GameApp />);
