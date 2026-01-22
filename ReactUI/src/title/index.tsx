/**
 * TitleApp (タイトル画面のエントリーポイント)
 * 
 * このファイルはタイトル画面全体の構成、背景演出、画面遷移のロジックを管理しています。
 */
import { render } from '@reactunity/renderer';
import { useState, useEffect } from 'react';
import '../index.css';
import { Menu } from './Menu';
import { Ranking } from './Ranking';
import { Settings } from './Settings';

// 画面の状態を表す型定義
// 'title': タイトル画面（ロゴ表示など）
// 'ranking': ランキング画面
// 'settings': 設定画面
type Screen = 'title' | 'ranking' | 'settings';

// グリッド背景コンポーネント
// 意味: 幾何学的な戦場となる仮想空間の座標グリッドを表現
// 役割: 画面全体に広がるグリッド線を、斜めにスクロールさせて奥行きと動きを出す
const GridBackground = () => {
    // offset: グリッドのスクロール位置を管理する状態変数 (0 ~ gridSize)
    // useState: Reactの「フック」と呼ばれる機能の一つ。コンポーネント内で変化する値を保持します。
    // setOffset関数を呼ぶと、Reactはこのコンポーネントを再描画（リレンダリング）して画面を更新します。
    const [offset, setOffset] = useState(0);
    const gridSize = 160; // グリッドの間隔

    // アニメーションループの設定
    // useEffect: コンポーネントの表示に合わせて「副作用（画面描画以外の処理）」を実行するフック。
    // 第二引数に空の配列 [] を渡しているため、この処理は「コンポーネントが最初に画面に表示された時（マウント時）」に1回だけ実行されます。
    useEffect(() => {
        let handle: number;
        const startTime = Date.now();
        const speed = 10; // スクロール速度

        // 毎フレーム実行されるループ関数
        const loop = () => {
            // Date.now(): 現在の時刻（ミリ秒）を取得するJavaScriptの標準メソッド。
            const elapsed = (Date.now() - startTime) / 1000;

            // 経過時間に基づいてオフセットを計算
            // % gridSize を使うことで、一定距離進んだら0に戻り、無限に続いているように見せかける（無限スクロール）
            setOffset((elapsed * speed) % gridSize);

            // requestAnimationFrame: ブラウザ（Unity）に対し、「次の画面更新のタイミングでこの関数を実行してほしい」と予約するメソッド。
            // これを再帰的に呼び出すことで、パラパラ漫画のように連続して処理が走り、滑らかなアニメーションになります。
            handle = requestAnimationFrame(loop);
        };
        handle = requestAnimationFrame(loop);

        // クリーンアップ関数: コンポーネントが消える時にアニメーションを停止する
        // cancelAnimationFrame: 予約していたアニメーションフレームの実行を取り消します。
        // これをしないと、画面遷移した後も裏で処理が動き続けてエラーや重くなる原因になります。
        return () => cancelAnimationFrame(handle);
    }, []);

    // 画面を覆うのに十分な本数を用意
    const width = 4000;
    const height = 4000;
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    // 描画部分
    return (
        <view className="absolute top-0 left-0 w-full h-full overflow-hidden" style={{ opacity: 0.05 }}>
            <view
                style={{
                    position: 'absolute',
                    left: -1000 + offset, // 初期位置をずらしておく
                    top: -1000 + offset,
                    width: width,
                    height: height,
                }}
            >
                {/* 縦線 */}
                {/* Array.from({ length: cols }): 指定した長さの配列を生成します。 */}
                {/* .map((_, i) => ...): 配列の要素数分だけループし、<view>タグ（線）を生成して返します。Reactでリストを表示する定石です。 */}
                {Array.from({ length: cols }).map((_, i) => (
                    <view
                        key={`col-${i}`}
                        className="absolute"
                        style={{
                            left: i * gridSize,
                            top: 0,
                            bottom: 0,
                            width: 1,
                            backgroundColor: '#00ffff', // シアン色に変更
                            opacity: 0.3
                        }}
                    />
                ))}
                {/* 横線 */}
                {Array.from({ length: rows }).map((_, i) => (
                    <view
                        key={`row-${i}`}
                        className="absolute"
                        style={{
                            top: i * gridSize,
                            left: 0,
                            right: 0,
                            height: 1,
                            backgroundColor: '#00ffff', // シアン色に変更
                            opacity: 0.3
                        }}
                    />
                ))}
            </view>
        </view>
    );
};

// 幾何学的なデブリ（残骸/データ）コンポーネント
// 意味: 自機（三角形）と敵（四角形）の構成要素や残骸がデジタル空間に漂っている様子を表現
// 役割: 背景に浮遊するパーティクルを描画・アニメーションさせる
const GeometricDebris = () => {
    // particles: 画面上の全パーティクルの情報を配列で管理
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        // 初期化: ランダムな位置・サイズ・速度・形状を持つデブリを生成
        const count = 20;
        // Math.random(): 0以上1未満のランダムな小数を返すメソッド。これを使って位置やサイズをばらつかせます。
        // Array.fromで指定した数(20個)の配列を作り、mapで中身をランダム生成して埋める
        const initialParticles = Array.from({ length: count }).map((_, i) => {
            const isEnemy = Math.random() < 0.4;
            return {
                id: i,
                x: Math.random() * 100, // %
                y: Math.random() * 100, // %
                size: Math.random() * 20 + 10, // 10px ~ 30px
                speed: Math.random() * 0.02 + 0.01,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.15 + 0.05,
                shape: isEnemy ? 'square' : 'triangle',
                color: isEnemy ? '#ff3333' : 'white',
            };
        });
        setParticles(initialParticles);

        // アニメーションループ
        let handle: number;
        const loop = () => {
            // setParticlesに関数を渡す書き方: 現在の状態(prev)を受け取り、新しい状態を返す関数を渡します。
            // setParticlesに関数を渡すことで、現在の状態(prev)をもとに新しい状態を計算する
            setParticles(prev => prev.map(p => {
                // 上にゆっくり昇る
                let newY = p.y - p.speed;
                if (newY < -5) newY = 105; // 画面上部に消えたら、画面下(105%)から再出現させてループさせる

                // 回転させる
                let newRotation = p.rotation + p.rotationSpeed;

                // 更新した値を返す
                // { ...p }: スプレッド構文。オブジェクトpの中身をすべてコピーし、変更したいプロパティ(y, rotation)だけ上書きした新しいオブジェクトを作ります。
                return { ...p, y: newY, rotation: newRotation };
            }));
            handle = requestAnimationFrame(loop);
        };
        handle = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(handle);
    }, []);

    return (
        <view className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {particles.map(p => (
                <view
                    key={p.id}
                    className="absolute items-center justify-center"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                        transform: `rotate(${p.rotation}deg)`,
                    }}
                >
                    {p.shape === 'square' ? (
                        // 四角形（敵のモチーフ）
                        <view
                            style={{
                                width: '100%',
                                height: '100%',
                                borderWidth: 1,
                                borderColor: p.color,
                            }}
                        />
                    ) : (
                        // 三角形（自機のモチーフ）
                        <text
                            style={{
                                fontSize: p.size,
                                color: p.color,
                            }}
                        >△</text>
                    )}
                </view>
            ))}
        </view>
    );
};

// 接続シーケンス（コンソールログ）コンポーネント
// 意味: サーバーへの接続や認証プロセスをハッキング風に演出
// 役割: タイトル画面でボタンを押した後、メニューが出るまでの間に文字をパラパラと表示する
const ConnectionSequence = ({ onComplete }: { onComplete: () => void }) => {
    // logs: 現在表示されているログのリスト
    const [logs, setLogs] = useState<{ text: string; isAlert?: boolean }[]>([]);

    useEffect(() => {
        // 表示するログの内容とタイミング
        // delayは「開始から何ミリ秒後に表示するか」を指定
        const sequence = [
            { text: "> ESTABLISHING CONNECTION...", delay: 0 },
            { text: "> HANDSHAKE INITIATED...", delay: 200 },
            { text: "> VERIFYING CREDENTIALS...", delay: 400 },
            { text: "> BYPASSING FIREWALL...", delay: 700 },
            { text: "> ACCESS GRANTED.", delay: 1000 },
            { text: "> SYSTEM ALERT: INTRUDER DETECTED.", delay: 1300, isAlert: true }
        ];

        let timeouts: number[] = [];

        // 定義したシーケンスに従って、setTimeoutで遅延実行を予約していく
        sequence.forEach(({ text, delay, isAlert }, index) => {
            // setTimeout: 指定した時間（ミリ秒）後に、関数を一度だけ実行するタイマーメソッド。
            // ここでは、delayミリ秒後に setLogs を実行してログを追加するように予約しています。
            const timeout = setTimeout(() => {
                // 既存のログ(prev)の後ろに新しいログを追加する
                setLogs(prev => [...prev, { text, isAlert }]);

                // もしこれが最後のログなら、少し待ってから完了通知(onComplete)を呼ぶ
                if (index === sequence.length - 1) {
                    setTimeout(onComplete, 200);
                }
            }, delay);
            timeouts.push(timeout);
        });

        // クリーンアップ: 途中で画面が閉じられた場合、予約していたタイマーを全てキャンセルする
        // clearTimeout: setTimeoutで予約したタイマーを解除するメソッド。
        return () => timeouts.forEach(clearTimeout);
    }, [onComplete]);

    // 最後のログが警告（ALERT）の場合、枠線を赤くする
    const isAlert = logs.length > 0 && logs[logs.length - 1].isAlert;

    return (
        <view className="flex-col items-start p-2 bg-black bg-opacity-80 border" style={{ width: 300, height: 125, justifyContent: 'flex-start', flexShrink: 0, borderColor: isAlert ? '#ff3333' : '#00ffff', fontFamily: 'SourceHanCodeJP' }}>
            {/* ターミナルウィンドウ: 幅と高さを固定し、上詰め(justify-start)で表示。flexShrink: 0で縮小防止 */}
            {logs.map((log, i) => (
                <text
                    key={i}
                    className="text-xs font-mono"
                    style={{
                        color: log.isAlert ? '#ff3333' : '#00ffff',
                        fontFamily: 'monospace',
                        textShadow: '0 0 5px currentColor',
                        flexShrink: 0,
                        marginBottom: 2
                    }}
                >
                    {log.text}
                </text>
            ))}
        </view>
    );
};

// ロゴにグリッチノイズ（接触不良のような乱れ）を与えるコンポーネント
// 役割: タイトルロゴを時々激しく振動させたり色ズレさせて、サイバーパンク感を出す
const GlitchLogo = ({ isAlert }: { isAlert: boolean }) => {
    // offset: ロゴの表示位置のズレ（x, y）
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    // isGlitching: 現在グリッチ演出中かどうかのフラグ
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        let timeoutHandle: any;
        let intervalHandle: any;
        let isMounted = true; // コンポーネントが存在しているかどうかのチェック用

        const loop = () => {
            // 次のグリッチ発生までの時間をランダムに決定（2秒〜5秒後）
            const nextDelay = Math.random() * 3000 + 2000;

            // 再帰的なsetTimeoutパターン: 処理が終わったら次のタイマーをセットすることで、不定期な繰り返し処理を実現しています。
            timeoutHandle = setTimeout(() => {
                if (!isMounted) return;
                // グリッチ開始
                setIsGlitching(true);

                // グリッチの継続時間をランダムに決定（0.1秒〜0.3秒）
                const duration = Math.random() * 200 + 100;

                // 継続時間の間、50ミリ秒ごとに位置をランダムにずらす（振動）
                // setInterval: 指定した時間間隔で、関数を繰り返し実行し続けるメソッド。
                intervalHandle = setInterval(() => {
                    setOffset({
                        x: (Math.random() - 0.5) * 10,
                        y: (Math.random() - 0.5) * 4
                    });
                }, 50);

                // グリッチ終了処理
                setTimeout(() => {
                    if (!isMounted) return;
                    clearInterval(intervalHandle); // 振動を止める
                    setIsGlitching(false); // フラグを下ろす
                    setOffset({ x: 0, y: 0 }); // 位置を元に戻す
                    loop(); // 次のグリッチを予約するために再帰呼び出し
                }, duration);
            }, nextDelay);
        };

        loop();

        return () => {
            // クリーンアップ: タイマーを全て破棄
            // clearInterval: setIntervalで開始した繰り返し処理を停止するメソッド。
            isMounted = false;
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
        };
    }, []);

    const baseColor = '#e2e8f0';
    const triColor = isAlert ? '#ff3333' : '#00ffff';

    return (
        <view className="relative items-center justify-center">
            {/* グリッチ用ゴースト（赤・シアンのズレ）: グリッチ中のみ表示 */}
            {isGlitching && (
                <>
                    <view className="flex-row items-baseline absolute" style={{ transform: `translate(${offset.x * 2}px, ${offset.y * 2}px)`, opacity: 0.7 }}>
                        <text className="text-5xl" style={{ fontFamily: 'Melete-Light', color: '#ff0000' }}>GEOME</text>
                        <text className="text-5xl mx-1" style={{ fontFamily: 'Melete-Bold', color: '#ff0000' }}>TRI</text>
                        <text className="text-5xl" style={{ fontFamily: 'Melete-Light', color: '#ff0000' }}>O</text>
                    </view>
                    <view className="flex-row items-baseline absolute" style={{ transform: `translate(${-offset.x}px, ${-offset.y}px)`, opacity: 0.7 }}>
                        <text className="text-5xl" style={{ fontFamily: 'Melete-Light', color: '#00ffff' }}>GEOME</text>
                        <text className="text-5xl mx-1" style={{ fontFamily: 'Melete-Bold', color: '#00ffff' }}>TRI</text>
                        <text className="text-5xl" style={{ fontFamily: 'Melete-Light', color: '#00ffff' }}>O</text>
                    </view>
                </>
            )}

            {/* メインロゴ */}
            <view className="flex-row items-baseline" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
                <text className="text-5xl" style={{ fontFamily: 'Melete-Light', color: baseColor }}>GEOME</text>
                <text className="text-5xl mx-1 animate-pulse transition-colors duration-300" style={{ fontFamily: 'Melete-Bold', color: triColor }}>TRI</text>
                <text className="text-5xl" style={{ fontFamily: 'Melete-Light', color: baseColor }}>O</text>
            </view>
        </view>
    );
};

// アプリケーション全体を統括するメインコンポーネント
const TitleApp = () => {
    // 現在どの画面を表示しているかを管理するState
    const [currentScreen, setCurrentScreen] = useState<Screen>('title');

    // 接続状態: 'idle'(待機) -> 'connecting'(ログ表示) -> 'connected'(メニュー表示) -> 'disconnecting'(切断中)
    const [connectionState, setConnectionState] = useState<'idle' | 'connecting' | 'connected' | 'disconnecting'>('idle');

    // 赤フラッシュ演出用
    const [showRedFlash, setShowRedFlash] = useState(false);

    // Unityからの入力イベントを受け取るための設定
    useEffect(() => {
        // 1. Press Any Button の検知
        if (currentScreen === 'title' && connectionState === 'idle') {
            // windowオブジェクトにUnityから呼び出される関数を定義する
            // (window as any): TypeScriptの型チェックを回避して、windowオブジェクトに独自のプロパティを追加するための書き方。
            (window as any).onAnyKeyPress = () => {
                setConnectionState('connecting');
            };
        } else {
            (window as any).onAnyKeyPress = () => { };
        }

        // 2. メニュー操作の検知 (Menuコンポーネント等で処理するためにグローバル関数を空定義しておく)
        // 実際の処理は Menu.tsx などの各コンポーネントの useEffect で上書きされるが、エラー防止のために初期化しておく
        if (!((window as any).onMenuInput)) {
            (window as any).onMenuInput = () => { };
        }

        // クリーンアップ
        return () => {
            (window as any).onAnyKeyPress = () => { };
        };
    }, [currentScreen, connectionState]);

    // 接続シーケンス完了時の処理
    const handleConnectionComplete = () => {
        setConnectionState('connected'); // 状態を「接続済み（メニュー表示）」に変更
        // 侵入完了の瞬間に赤フラッシュ
        setShowRedFlash(true);
        setTimeout(() => setShowRedFlash(false), 200);
    };

    // メニューから戻る時の処理
    const handleMenuBack = () => {
        // 切断処理: ログアウトして待機画面に戻るイメージ
        setConnectionState('disconnecting');
        setTimeout(() => {
            setConnectionState('idle');
        }, 300); // Menuのフェードアウト時間(300ms)に合わせる
    };

    // メニューが開いているかどうかの判定（フッター表示などで使用）
    const isMenuOpen = connectionState === 'connected' || connectionState === 'disconnecting';

    return (
        // 背景色を「真っ黒」から「深いネイビー（ダークスレート）」に変更して、ビネット（黒い影）を目立たせる
        <view className="w-full h-full flex-col justify-center items-center" style={{ backgroundColor: '#0f172a' }}>
            {/* 背景装飾: グリッド */}
            <GridBackground />
            {/* 背景装飾: 幾何学的なデブリ */}
            <GeometricDebris />

            {/* タイトル画面 */}
            {currentScreen === 'title' && (
                <view className="w-full h-full flex-col">
                    {/* 上半分: タイトルロゴ */}
                    <view className="flex-1 w-full items-center justify-end pb-20">
                        {/* グリッチエフェクト付きロゴ */}
                        <GlitchLogo isAlert={isMenuOpen} />
                    </view>

                    {/* 下半分: メニュー/ボタン */}
                    <view className="flex-1 w-full items-center justify-start">
                        {/* 待機状態: Press Any Button を表示 */}
                        {connectionState === 'idle' && (
                            <view className="transition-opacity duration-300 opacity-100">
                                {/* Press Any Button: メニュー項目と同様に三角を追加 */}
                                <view className="relative flex-row items-center justify-center px-10 py-3">
                                    {/* 背景: 枠線と薄いシアンでサイバー感を出す */}
                                    <view className="absolute left-0 top-0 bottom-0 right-0 border border-[#00ffff] bg-[#00ffff] bg-opacity-10 animate-pulse" />

                                    {/* 三角（自機）: まだ侵入前なので白で表示 */}
                                    <text className="text-xl text-white mr-2">▶</text>

                                    {/* テキスト: シアンで発光感 */}
                                    <text className="text-base text-[#00ffff] font-bold tracking-widest" style={{ textShadow: '0 0 8px #00ffff', fontFamily: 'SourceHanCodeJP' }}>
                                        PRESS ANY BUTTON
                                    </text>
                                </view>
                            </view>
                        )}

                        {/* 接続中: コンソールログを表示 */}
                        {connectionState === 'connecting' && (
                            <ConnectionSequence onComplete={handleConnectionComplete} />
                        )}

                        {/* 接続完了: メニューを表示 */}
                        {(connectionState === 'connected' || connectionState === 'disconnecting') && (
                            <Menu
                                onNavigate={(screen) => setCurrentScreen(screen)}
                                onPlay={() => console.log("Game Start!")}
                                onBack={handleMenuBack}
                                onExit={() => console.log("Quit Application")}
                                isExiting={connectionState === 'disconnecting'}
                            />
                        )}
                    </view>
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

            {/* ビネット効果: 画面四隅を暗くして没入感を出す */}
            <view
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{
                    // 内側に影を落とすことでビネットを表現
                    boxShadow: 'inset 0 0 200px 100px rgba(0,0,0,0.9)'
                }}
            />

            {/* 赤フラッシュ演出: 侵入検知時に一瞬表示 */}
            {showRedFlash && (
                <view className="absolute top-0 left-0 w-full h-full bg-[#ff3333] opacity-30 pointer-events-none" />
            )}

            {/* フッター: 操作ガイドとCopyright */}
            {isMenuOpen ? (
                <view className="absolute bottom-0 w-full flex-row items-center justify-between px-6 py-1 bg-black border-t border-[#333] pointer-events-none">
                    <text className="text-gray-400 text-xs font-sans ml-2">Use keys to navigate</text>
                    <view className="flex-row items-center mr-2">
                        {/* Select */}
                        <view className="flex-row items-center ml-4">
                            <view className="flex-row items-center bg-[#222] px-1.5 py-0.5 rounded border border-[#444] mr-1.5">
                                <text className="text-gray-300 text-[10px]">WASD</text>
                                <text className="text-gray-600 text-[10px] mx-1">|</text>
                                <text className="text-gray-300 text-[10px]">↑↓</text>
                            </view>
                            <text className="text-gray-400 text-[10px]">Select</text>
                        </view>
                        {/* Confirm */}
                        <view className="flex-row items-center ml-4">
                            <view className="flex-row items-center bg-[#222] px-1.5 py-0.5 rounded border border-[#444] mr-1.5">
                                <text className="text-gray-300 text-[10px]">Enter</text>
                                <text className="text-gray-600 text-[10px] mx-1">|</text>
                                <text className="text-[#00ffff] text-xs font-bold">A</text>
                            </view>
                            <text className="text-gray-400 text-[10px]">Confirm</text>
                        </view>
                        {/* Back */}
                        <view className="flex-row items-center ml-4">
                            <view className="flex-row items-center bg-[#222] px-1.5 py-0.5 rounded border border-[#444] mr-1.5">
                                <text className="text-gray-300 text-[10px]">Esc</text>
                                <text className="text-gray-600 text-[10px] mx-1">|</text>
                                <text className="text-[#ff3333] text-xs font-bold">B</text>
                            </view>
                            <text className="text-gray-400 text-[10px]">Back</text>
                        </view>
                    </view>
                </view>
            ) : (
                <view className="absolute bottom-4 w-full items-center justify-center pointer-events-none">
                    <text className="text-gray-500 text-xs font-sans">© 2026 potatonecst</text>
                </view>
            )}
        </view>
    );
};

render(<TitleApp />);