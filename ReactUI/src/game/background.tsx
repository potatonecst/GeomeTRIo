import { render } from '@reactunity/renderer';
import { useState, useEffect } from 'react';
import '../index.css';

const GameBackground = () => {
    const [offset, setOffset] = useState(0);
    const gridSize = 160; // タイトル画面と同じサイズ感

    useEffect(() => {
        let handle: number;
        const startTime = Date.now();
        const speed = 100; // スクロール速度

        const loop = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            // 垂直方向（Y軸）のみスクロール
            setOffset((elapsed * speed) % gridSize);
            handle = requestAnimationFrame(loop);
        };
        handle = requestAnimationFrame(loop);
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
                        left: -1000,
                        top: -1000 + offset,
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