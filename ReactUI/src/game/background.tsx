/**
 * GameBackground (ゲームプレイ背景コンポーネント)
 * 
 * ゲームプレイ中の背景（グリッド線）を描画・アニメーションさせるコンポーネントです。
 * UnityのBackgroundScroller.csに代わり、ReactUnity側で描画を担当しています。
 * ゲームの状態（ポーズ、ゲームオーバー）に応じてスクロールを停止する制御も行います。
 */
import { render } from '@reactunity/renderer';
import { useState, useEffect, useRef } from 'react';
import '../index.css';
import { useGameStatus } from '../hooks/useGameStatus';

const GameBackground = () => {
    // オフセット（スクロール位置）の状態管理
    const [offset, setOffset] = useState(0);
    const gridSize = 160; // タイトル画面の半分のサイズ感

    // Unity側からゲームの状態（ポーズ中か、ゲームオーバーか）を取得
    const status = useGameStatus();

    // アニメーションループ内で最新の状態を参照するためにRefを使用
    // useStateの値はクロージャに閉じ込められるため、requestAnimationFrameのループ内では
    // 古い値を参照し続けてしまう問題があります。Refを使うことで常に最新の値を参照できます。
    const isGameOverRef = useRef(status.isGameOver);
    const isPausedRef = useRef(status.isPaused);

    // ステータスが変わるたびにRefを更新
    useEffect(() => {
        isGameOverRef.current = status.isGameOver;
        isPausedRef.current = status.isPaused;
    }, [status.isGameOver, status.isPaused]);

    // スクロールアニメーションのループ処理
    useEffect(() => {
        let handle: number;
        let lastTime = Date.now();
        const speed = 100; // スクロール速度
        let currentOffset = 0;

        const loop = () => {
            const now = Date.now();
            // 経過時間（秒）を計算
            const deltaTime = (now - lastTime) / 1000;
            lastTime = now;

            // ゲームオーバーでもポーズ中でもなければスクロールを進める
            // Ref経由で最新の状態をチェック
            if (!isGameOverRef.current && !isPausedRef.current) {
                // オフセットを加算し、グリッドサイズで割った余りをとることでループさせる
                currentOffset = (currentOffset + speed * deltaTime) % gridSize;
                setOffset(currentOffset);
            }
            // 次のフレームで再度loopを実行するように予約
            handle = requestAnimationFrame(loop);
        };

        // ループ開始
        handle = requestAnimationFrame(loop);

        // クリーンアップ: コンポーネントが消える時にループを止める
        return () => cancelAnimationFrame(handle);
    }, []);

    // 画面全体を覆うサイズ
    const width = 4000;
    const height = 4000;
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    return (
        // 背景色をタイトル画面と同じ #0f172a に設定
        <view className="w-full h-full overflow-hidden items-center justify-center" style={{ backgroundColor: '#0f172a' }}>
            {/* グリッドコンテナ: タイトル画面と同じ opacity: 0.05 */}
            <view className="absolute inset-0" style={{ opacity: 0.05 }}>
                <view
                    style={{
                        position: 'absolute',
                        // 画面中央に配置されるように調整
                        left: '50%',
                        marginLeft: -width / 2,
                        top: -1000 + offset, // 計算したオフセットを適用してスクロールさせる
                        width: width,
                        height: height,
                    }}
                >
                    {/* 縦線 */}
                    {Array.from({ length: cols }).map((_, i) => (
                        <view
                            key={`col-${i}`}
                            className="absolute"
                            style={{
                                left: i * gridSize,
                                top: 0,
                                bottom: 0,
                                width: 1,
                                backgroundColor: '#00ffff', // シアン
                                opacity: 0.3 // タイトル画面と同じ
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
                                backgroundColor: '#00ffff', // シアン
                                opacity: 0.3 // タイトル画面と同じ
                            }}
                        />
                    ))}
                </view>
            </view>
        </view>
    );
};

render(<GameBackground />);