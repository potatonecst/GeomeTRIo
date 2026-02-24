/**
 * TitleApp (タイトル画面のエントリーポイント)
 * 
 * このファイルはタイトル画面全体の構成、背景演出、画面遷移のロジックを管理しています。
 */
import { render, useGlobals } from '@reactunity/renderer';
import { useState, useEffect, useCallback, useRef } from 'react';
import '../index.css';
import { Menu } from './Menu';
import { StageSelect } from './StageSelect';
import { Ranking } from './Ranking';
import { Settings } from './Settings';
import { useGlitch } from '../hooks/useGlitch';
import { GlitchText } from '../components/GlitchText';
import { AspectRatioWrapper } from '../components/AspectRatioWrapper';

// 画面の状態を表す型定義
// 'title': タイトル画面（ロゴ表示など）
// 'stage_select': ステージ選択画面
// 'ranking': ランキング画面
// 'settings': 設定画面
type Screen = 'title' | 'stage_select' | 'ranking' | 'settings';

// グリッド背景コンポーネント
// 意味: 幾何学的な戦場となる仮想空間の座標グリッドを表現
// 役割: 画面全体に広がるグリッド線を、斜めにスクロールさせて奥行きと動きを出す
// 技術的ポイント: CSSアニメーションではなく、JSのrequestAnimationFrameを使って座標を毎フレーム計算し、スムーズな動きを実現しています。
const GridBackground = () => {
    // offset: グリッドのスクロール位置を管理する状態変数 (0 ~ gridSize)
    // useState: Reactの「フック」と呼ばれる機能の一つ。コンポーネント内で変化する値を保持します。
    // setOffset関数を呼ぶと、Reactはこのコンポーネントを再描画（リレンダリング）して画面を更新します。
    const [offset, setOffset] = useState(0);
    const gridSize = 320; // グリッドの間隔 (大きくする)

    // アニメーションループの設定
    // useEffect: コンポーネントの表示に合わせて「副作用（画面描画以外の処理）」を実行するフック。
    // 第二引数（依存配列）に空の配列 [] を渡しているため、この処理は「コンポーネントが最初に画面に表示された時（マウント時）」に1回だけ実行されます。
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

            // requestAnimationFrame: ブラウザ（ここではUnityのUIエンジン）に対し、「次の画面更新のタイミングでこの関数を実行してほしい」と予約するメソッド。
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
// 技術的ポイント: 多数のオブジェクトを配列で管理し、map関数で一括描画しています。
const GeometricDebris = () => {
    // particles: 画面上の全パーティクルの情報を配列で管理
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        // 初期化: ランダムな位置・サイズ・速度・形状を持つデブリを生成
        const count = 15;
        // Math.random(): 0以上1未満のランダムな小数を返すメソッド。これを使って位置やサイズをばらつかせます。
        // Array.fromで指定した数(20個)の配列を作り、mapで中身をランダム生成して埋める
        const initialParticles = Array.from({ length: count }).map((_, i) => {
            // ランダムだと偏りが出るため、インデックスの偶奇で確実に50%ずつ生成する
            const isEnemy = i % 2 === 0;
            return {
                id: i,
                x: Math.random() * 100, // %
                y: Math.random() * 100, // %
                size: Math.random() * 60 + 40, // 40px ~ 100px
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
            // prev.map: 配列の全要素（パーティクル）に対して順番に処理を行い、新しい配列を作成します。
            setParticles(prev => prev.map(p => {
                // 上にゆっくり昇る
                let newY = p.y - p.speed;
                // 画面上部(-5%)に消えたら、画面下(105%)から再出現させてループさせる
                if (newY < -5) newY = 105;

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
                        // 三角形（自機を模したパーティクル）
                        // SVGがAmbiguousMatchExceptionを起こすため、画像で代用
                        // Assets/Resources/Sprites/Triangle.png を用意してください
                        <image
                            // @ts-ignore
                            source="res:Sprites/Triangle"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain', // アスペクト比を維持して枠内に収める
                                unityImageTintColor: p.color
                            } as any}
                        />
                    )}
                </view>
            ))}
        </view>
    );
};

// 接続シーケンス（コンソールログ）コンポーネント
// 意味: サーバーへの接続や認証プロセスをハッキング風に演出
// 役割: タイトル画面でボタンを押した後、メニューが出るまでの間に文字をパラパラと表示する
// 技術的ポイント: setTimeoutを連鎖させることで、時間差でのログ表示を実現しています。
const ConnectionSequence = ({ onComplete, appVersion }: { onComplete: () => void, appVersion: string }) => {
    // 各行の表示状態を管理する配列
    const [visibleLines, setVisibleLines] = useState<boolean[]>([]);
    // ウィンドウ出現アニメーション用の状態 (高さと不透明度)
    const [windowStyle, setWindowStyle] = useState({ height: 0, opacity: 0 });

    // 表示するログの内容とタイミング
    const sequence = [
        { text: "CONNECTION ESTABLISHED...", delay: 100 },
        { text: "HANDSHAKE ACCEPTED...", delay: 300 },
        { text: "FIREWALL BYPASSED...", delay: 500 },
        { text: "CREDENTIALS VERIFIED...", delay: 800 },
        { text: "ACCESS GRANTED.", delay: 1100 },
        { text: "SYSTEM ALERT: INTRUDER DETECTED.", delay: 1400, isAlert: true }
    ];

    // 必要な高さを計算
    // ヘッダー + 上下パディング(約70px) + (行数 × 1行の高さ(約36px))
    // 少し余裕を持たせて計算します
    const targetHeight = 70 + (sequence.length * 40);

    useEffect(() => {
        // マウント直後にアニメーションを開始（ウィンドウを縦に展開）
        const animTimer = setTimeout(() => {
            // 計算した高さまで展開
            setWindowStyle({ height: targetHeight, opacity: 1 });
        }, 50);

        // 初期化: 全ての行を非表示
        setVisibleLines(new Array(sequence.length).fill(false));

        let timeouts: number[] = [];

        // 定義したシーケンスに従って、setTimeoutで遅延実行を予約していく
        sequence.forEach(({ delay }, index) => {
            const timeout = setTimeout(() => {
                setVisibleLines(prev => {
                    const next = [...prev];
                    next[index] = true;
                    return next;
                });

                // もしこれが最後のログなら、少し待ってから完了通知(onComplete)を呼ぶ
                if (index === sequence.length - 1) {
                    setTimeout(onComplete, 200);
                }
            }, delay);
            timeouts.push(timeout);
        });

        // クリーンアップ: 途中で画面が閉じられた場合、予約していたタイマーを全てキャンセルする
        // clearTimeout: setTimeoutで予約したタイマーを解除するメソッド。
        return () => {
            clearTimeout(animTimer);
            timeouts.forEach(clearTimeout);
        };
    }, [onComplete]);

    // 最後のログが警告（ALERT）の場合、枠線を赤くする
    // visibleLinesの最後の要素がtrueなら、sequenceの最後の要素がisAlertかどうかチェック
    const isLastLineVisible = visibleLines[sequence.length - 1];
    const isAlert = isLastLineVisible && sequence[sequence.length - 1].isAlert;

    return (
        <view
            className="flex-col bg-black border-2 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            style={{
                width: 1000,
                height: windowStyle.height, // アニメーション
                opacity: windowStyle.opacity, // アニメーション
                borderColor: isAlert ? '#ff3333' : '#00ffff',
                overflow: 'hidden', // アニメーション中の中身のはみ出し防止
                padding: 4, // StageStartCutinに合わせる
            }}
        >
            {/* ヘッダー: StageStartCutinと統一 */}
            <view className="flex-row justify-between bg-cyan-900 px-2 py-1 mb-2 shrink-0">
                <text className="text-cyan-100 text-xl font-mono" style={{ fontFamily: 'SourceHanCodeJP' }}>CONNECTION_SEQUENCE</text>
                <text className="text-cyan-100 text-xl font-mono" style={{ fontFamily: 'SourceHanCodeJP' }}>{appVersion}</text>
            </view>

            {/* ログエリア */}
            <view className="flex-col items-start px-4 py-2">
                {sequence.map((item, i) => {
                    const isVisible = visibleLines[i];
                    return (
                        <text
                            key={i}
                            className={`text-2xl font-mono mb-1 transition-opacity duration-100 ${item.isAlert ? 'text-red-500' : 'text-cyan-400'} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                            style={{
                                fontFamily: 'SourceHanCodeJP',
                                textShadow: '0 0 5px currentColor',
                                whiteSpace: 'nowrap',
                                // 配列追加方式ではないので、flexShrinkは不要だが念のため
                                flexShrink: 0,
                            }}
                        >
                            {`> ${item.text}`}
                        </text>
                    );
                })}
            </view>
        </view>
    );
};

// ロゴにグリッチノイズ（接触不良のような乱れ）を与えるコンポーネント
// 役割: タイトルロゴを時々激しく振動させたり色ズレさせて、サイバーパンク感を出す
// 技術的ポイント: useGlitchフックを利用して、ロジック（計算）とビュー（表示）を分離しています。
const GlitchLogo = ({ isAlert }: { isAlert: boolean }) => {
    // offset: ロゴの表示位置のズレ（x, y）
    // isGlitching: 現在グリッチ演出中かどうかのフラグ
    // useGlitchフックを使用することで、複雑な計算ロジックを外部ファイル(useGlitch.ts)に任せることができます。
    // これにより、このコンポーネントは「表示」に集中できます。
    const { offset, isGlitching } = useGlitch();

    const baseColor = '#e2e8f0';
    const triColor = isAlert ? '#ff3333' : '#00ffff';

    return (
        <view className="relative items-center justify-center">
            {/* グリッチ用ゴースト（赤・シアンのズレ）: グリッチ中のみ表示 */}
            {isGlitching && (
                <>
                    <view className="flex-row items-baseline absolute" style={{ transform: `translate(${offset.x * 2}px, ${offset.y * 2}px)`, opacity: 0.7 }}>
                        <text className="text-9xl" style={{ fontFamily: 'Melete-Light', color: '#ff0000' }}>GEOME</text>
                        <text className="text-9xl mx-1" style={{ fontFamily: 'Melete-Bold', color: '#ff0000' }}>TRI</text>
                        <text className="text-9xl" style={{ fontFamily: 'Melete-Light', color: '#ff0000' }}>O</text>
                    </view>
                    <view className="flex-row items-baseline absolute" style={{ transform: `translate(${-offset.x}px, ${-offset.y}px)`, opacity: 0.7 }}>
                        <text className="text-9xl" style={{ fontFamily: 'Melete-Light', color: '#00ffff' }}>GEOME</text>
                        <text className="text-9xl mx-1" style={{ fontFamily: 'Melete-Bold', color: '#00ffff' }}>TRI</text>
                        <text className="text-9xl" style={{ fontFamily: 'Melete-Light', color: '#00ffff' }}>O</text>
                    </view>
                </>
            )}

            {/* メインロゴ */}
            <view className="flex-row items-baseline" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
                <text className="text-9xl" style={{ fontFamily: 'Melete-Light', color: baseColor }}>GEOME</text>
                <text className="text-9xl mx-1 animate-pulse transition-colors duration-300" style={{ fontFamily: 'Melete-Bold', color: triColor }}>TRI</text>
                <text className="text-9xl" style={{ fontFamily: 'Melete-Light', color: baseColor }}>O</text>
            </view>
        </view>
    );
};

// アプリケーション全体を統括するメインコンポーネント
// 役割: 画面遷移の状態管理、背景の描画、Unityからの入力イベントの受け口として機能します。
const TitleApp = () => {
    // useGlobals: ReactUnityが提供するフック。Unity側で登録したグローバルオブジェクトにアクセスできます。
    const globals = useGlobals() as any;
    // GameInteropをコンポーネントのトップレベルで取得し、各関数で使い回せるようにする
    const interop = globals.GameInterop;

    // 現在どの画面を表示しているかを管理するState
    const [currentScreen, setCurrentScreen] = useState<Screen>('title');

    // メニューのカーソル位置を記憶するState (初期値: 0)
    const [lastMenuIndex, setLastMenuIndex] = useState(0);

    // 接続状態: 'initializing'(初期化中) -> 'idle'(待機) -> 'connecting'(ログ表示) -> 'connected'(メニュー表示) -> ...
    const [connectionState, setConnectionState] = useState<'initializing' | 'idle' | 'connecting' | 'connected' | 'disconnecting' | 'exiting'>('initializing');

    // ゲーム開始演出用
    const [isGameStarting, setIsGameStarting] = useState(false);

    // 暗転演出用（シーン遷移直前のフリーズ隠し）
    const [isBlackout, setIsBlackout] = useState(false);

    // 赤フラッシュ演出用
    const [showRedFlash, setShowRedFlash] = useState(false);

    // 終了メッセージの表示制御用
    const [shutdownOpacity, setShutdownOpacity] = useState(0);

    // バージョン情報 (デフォルト値はフォールバック用)
    const [appVersion, setAppVersion] = useState("ver. 0.3.0");

    // 初期化済みかどうかを管理するRef
    // useRef: 再描画されても値が保持される「箱」を作ります。useStateと違い、値を書き換えても再描画は発生しません。
    const initializedRef = useRef(false);

    // UI準備完了通知用ハンドラ (AspectRatioWrapperのonReadyコールバック)
    // レイアウト計算が完了し、画面が表示可能になったタイミングで呼び出されます。
    // Unity側に通知を送り、BGM再生と黒幕消去のトリガーとします。
    const handleUIReady = useCallback(() => {
        interop?.NotifyUIReady();
    }, [interop]);

    // 初期化処理: ゲームから戻ってきた場合はタイトル演出をスキップする
    useEffect(() => {
        // Unity側からバージョンを取得 (GameInteropにGetAppVersionメソッドが必要)
        // C#側で実装されるまではデフォルト値が使われます
        if (interop && typeof interop.GetAppVersion === 'function') {
            setAppVersion(`ver. ${interop.GetAppVersion()}`);
        }

        // 既に初期化済みなら何もしない
        if (initializedRef.current) return;

        // interopが利用可能になるまで何もしない
        if (!interop || typeof interop.ShouldSkipTitleSequence !== 'function') {
            return;
        }

        initializedRef.current = true;

        if (interop.ShouldSkipTitleSequence()) {
            setConnectionState('connected'); // メニュー画面から開始
        } else {
            setConnectionState('idle'); // 通常通りPress Any Buttonから開始
        }
    }, [interop]);

    // Unityからの入力イベントを受け取るための設定
    // useEffect: コンポーネントのマウント時や状態変化時に実行される副作用フック
    useEffect(() => {
        // 1. Press Any Button の検知
        if (currentScreen === 'title' && connectionState === 'idle') {
            // windowオブジェクトにUnityから呼び出される関数を定義する
            // (window as any): TypeScriptの型チェックを回避して、windowオブジェクトに独自のプロパティ（onAnyKeyPress）を追加するための書き方。
            (window as any).onAnyKeyPress = () => {
                interop?.PlaySound('submit');
                setConnectionState('connecting');
            };
        } else {
            (window as any).onAnyKeyPress = () => { };
        }

        // 3. 暗転リクエストの検知
        (window as any).onFadeOutRequest = () => {
            setIsBlackout(true);
        };

        // 2. メニュー操作の検知 (Menuコンポーネント等で処理するためにグローバル関数を空定義しておく)
        // 実際の処理は Menu.tsx などの各コンポーネントの useEffect で上書きされるが、エラー防止のために初期化しておく
        if (!((window as any).onMenuInput)) {
            (window as any).onMenuInput = () => { };
        }

        // クリーンアップ
        // コンポーネントがアンマウントされる際に、グローバル関数を無効化してメモリリークやエラーを防ぐ
        return () => {
            (window as any).onAnyKeyPress = () => { };
            (window as any).onFadeOutRequest = () => { };
        };
    }, [currentScreen, connectionState, interop]); // 依存配列も interop に変更

    // 終了シーケンスの制御
    useEffect(() => {
        if (connectionState === 'exiting') {
            // 終了状態になったら、メッセージをフェードインさせる
            const timer = setTimeout(() => setShutdownOpacity(1), 50);
            return () => clearTimeout(timer);
        } else {
            setShutdownOpacity(0);
        }
    }, [connectionState]);

    // 接続シーケンス完了時の処理
    // useCallback: 関数定義を「メモ化（キャッシュ）」するフックです。
    // 通常、Reactコンポーネントが再描画されるたびに、内部の関数はすべて新しく作り直されます。
    // しかし、useCallbackを使うと、依存配列（第2引数）の中身が変わらない限り、同じ関数インスタンスを再利用します。
    // これにより、この関数を受け取る子コンポーネントが無駄に再描画されるのを防ぎます。
    const handleConnectionComplete = useCallback(() => {
        setConnectionState('connected'); // 状態を「接続済み（メニュー表示）」に変更
        // 侵入完了の瞬間に赤フラッシュ
        setShowRedFlash(true);
        setTimeout(() => setShowRedFlash(false), 200);
    }, []); // 依存配列が空 [] なので、この関数は最初に作られたものがずっと使われます。

    // メニューから戻る時の処理
    // これもMenuコンポーネントにpropsとして渡されるため、useCallbackで固定化します。
    const handleMenuBack = useCallback(() => {
        // 切断処理: ログアウトして待機画面に戻るイメージ
        setConnectionState('disconnecting');
        setTimeout(() => {
            setConnectionState('idle');
        }, 300); // Menuのフェードアウト時間(300ms)に合わせる
    }, []);

    // ゲーム終了処理
    // interop オブジェクトを使用していますが、interop自体が変更されない限り関数を作り直す必要はありません。
    const handleExit = useCallback(() => {
        // アプリ終了状態へ遷移（exiting）
        setConnectionState('exiting');

        // フェードアウトアニメーションの完了を待ってから終了コマンドを送信
        setTimeout(() => {
            if (interop && typeof interop.QuitGame === 'function') {
                interop.QuitGame();
            } else {
                console.log("Quit Game (Mock)");
                // エディタなどでGameInteropがない場合やモック時は待機画面に戻す
                setConnectionState('idle');
            }
        }, 500); // フェードアウト(300ms)後、少しの余韻(200ms)を持たせてから終了
    }, [interop]); // interop が変わった時だけ、この関数を作り直します。

    // ゲーム開始処理
    // StageSelectコンポーネントに渡されます。
    const handleGameStart = useCallback(() => {
        setIsGameStarting(true);
    }, []);

    // 画面遷移ハンドラ
    // Menuコンポーネント等で頻繁に使われます。
    const handleNavigate = useCallback((screen: Screen) => {
        setCurrentScreen(screen);
    }, []);

    // メニューが開いているかどうかの判定（フッター表示などで使用）
    const isMenuOpen = connectionState === 'connected' || connectionState === 'disconnecting' || connectionState === 'exiting' || isGameStarting;

    return (
        // 背景色を「真っ黒」から「深いネイビー（ダークスレート）」に変更して、ビネット（黒い影）を目立たせる
        <AspectRatioWrapper onReady={handleUIReady}>
            <view className="absolute inset-0 flex-col justify-center items-center" style={{ backgroundColor: '#0f172a', width: '100%', height: '100%' }}>
                {/* 背景装飾: グリッド */}
                <GridBackground />
                {/* 背景装飾: 幾何学的なデブリ */}
                <GeometricDebris />

                {/* タイトル画面 */}
                {currentScreen === 'title' && (
                    <view className="w-full h-full flex-col p-12">
                        {/* 上半分: タイトルロゴ */}
                        <view className="flex-1 w-full items-center justify-end pb-20">
                            {/* グリッチエフェクト付きロゴ */}
                            <GlitchLogo isAlert={isMenuOpen} />
                        </view>

                        {/* 下半分: メニュー/ボタン */}
                        <view className="flex-1 w-full items-center justify-start">
                            {/* 初期化中は何も表示しない（一瞬のチラつき防止） */}
                            {connectionState === 'initializing' && null}

                            {/* 待機状態: Press Any Button を表示 */}
                            {connectionState === 'idle' && (
                                <view className="transition-opacity duration-300 opacity-100">
                                    {/* Press Any Button: メニュー項目と同様に三角を追加 */}
                                    <view className="relative flex-row items-center justify-center px-16 py-6">
                                        {/* 背景: 枠線と薄いシアンでサイバー感を出す */}
                                        <view className="absolute left-0 top-0 bottom-0 right-0 border border-[#00ffff] bg-[#00ffff] bg-opacity-10 animate-pulse" />

                                        {/* 三角（自機）: まだ侵入前なので白で表示 */}
                                        <text className="text-5xl text-white mr-6">▶</text>

                                        {/* テキスト: シアンで発光感 */}
                                        <text className="text-5xl text-[#00ffff] tracking-widest" style={{ textShadow: '0 0 8px #00ffff', fontFamily: 'SourceHanCodeJP' }}>
                                            PRESS ANY BUTTON
                                        </text>
                                    </view>
                                </view>
                            )}

                            {/* 接続中: コンソールログを表示 */}
                            {connectionState === 'connecting' && (
                                <ConnectionSequence onComplete={handleConnectionComplete} appVersion={appVersion} />
                            )}

                            {/* 接続完了: メニューを表示 */}
                            {(connectionState === 'connected' || connectionState === 'disconnecting' || connectionState === 'exiting') && (
                                <Menu
                                    onNavigate={handleNavigate}
                                    onPlay={() => console.log("Game Start!")}
                                    onBack={handleMenuBack}
                                    onExit={handleExit}
                                    isExiting={connectionState === 'disconnecting' || connectionState === 'exiting'}
                                    initialIndex={lastMenuIndex} // 記憶していた位置を渡す
                                    onIndexChange={setLastMenuIndex} // 位置が変わったら記憶を更新
                                />
                            )}

                            {/* 終了メッセージ */}
                            {connectionState === 'exiting' && (
                                <view className="absolute transition-opacity duration-300" style={{ opacity: shutdownOpacity, top: '25%' }}>
                                    <GlitchText text="SHUTTING DOWN..." isAlert={true} className="text-6xl text-red-500 whitespace-nowrap tracking-widest" style={{ fontFamily: 'SourceHanCodeJP' }} />
                                </view>
                            )}
                        </view>
                    </view>
                )}

                {/* ステージ選択画面 */}
                {currentScreen === 'stage_select' && (
                    <StageSelect onBack={() => setCurrentScreen('title')} onGameStart={handleGameStart} />
                )}

                {/* ランキング画面 */}
                {currentScreen === 'ranking' && (
                    <Ranking onBack={() => setCurrentScreen('title')} />
                )}

                {/* 設定画面 */}
                {currentScreen === 'settings' && (
                    <Settings
                        onBack={() => setCurrentScreen('title')}
                    />
                )}

                {/* ローディング画面: 暗転の下に配置 */}
                <view
                    className="absolute inset-0 items-center justify-center bg-black pointer-events-none transition-opacity duration-500"
                    style={{ opacity: isGameStarting ? 1 : 0, zIndex: 9998 }}
                >
                    {isGameStarting && (
                        <view className="flex-row items-center">
                            <GlitchText text="LOADING" isAlert={false} className="text-6xl text-cyan-400 whitespace-nowrap tracking-widest" style={{ fontFamily: 'SourceHanCodeJP' }} />
                            <view className="custom-spin w-12 h-12 border-8 border-cyan-900 border-t-cyan-400 rounded-full ml-6" />
                        </view>
                    )}
                </view>

                {/* 暗転オーバーレイ: 最前面 */}
                <view
                    className="absolute top-0 left-0 w-full h-full bg-black pointer-events-none transition-opacity duration-500"
                    style={{ opacity: isBlackout ? 1 : 0, zIndex: 9999 }}
                />

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

                {/* フッター: Copyright */}
                {/* 操作ガイドはコントローラーのボタン配置差異の問題により廃止しました */}
                {currentScreen === 'title' && (
                    <>
                        <view className="absolute bottom-4 w-full items-center justify-center pointer-events-none">
                            <text className="text-gray-500 text-2xl font-sans">© 2026 potatonecst</text>
                        </view>
                        <view className="absolute bottom-4 right-4 pointer-events-none">
                            <text className="text-gray-500 text-2xl font-mono">{appVersion}</text>
                        </view>
                    </>
                )}
            </view>
        </AspectRatioWrapper>
    );
};

render(<TitleApp />);