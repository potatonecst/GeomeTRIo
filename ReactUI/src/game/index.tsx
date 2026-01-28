import { render, useGlobals } from '@reactunity/renderer';
import { useState } from 'react';
import '../index.css';
import { HUD } from './HUD';
import { GlitchText } from '../components/GlitchText';

// ゲームオーバーパネル
const GameOverPanel = () => {
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;

    // 表示状態の管理（本来はC#からイベントを受け取るが、今はモックとして非表示にしておく）
    // ※後ほどC#と連携させます
    const [isVisible] = useState(false);

    // 常にレンダリングしておき、opacityで表示/非表示を切り替える（フェード用）
    return (
        <view
            className="absolute inset-0 items-center justify-center bg-black bg-opacity-80 transition-opacity duration-500"
            style={{
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none' // 見えない時はクリック判定を消す
            }}
        >
            <view className="flex-col items-center p-10 border-2 border-red-600 bg-black">
                <GlitchText text="GAME OVER" isAlert={true} className="text-6xl text-red-600 mb-8 font-bold tracking-widest" />

                <view className="flex-row gap-4">
                    <button className="bg-red-900 px-6 py-2" onClick={() => interop?.PlaySound('submit')}>
                        <text className="text-white">RETRY</text>
                    </button>
                    <button className="bg-gray-800 px-6 py-2" onClick={() => interop?.PlaySound('cancel')}>
                        <text className="text-white">TITLE</text>
                    </button>
                </view>
            </view>
        </view>
    );
};

const GameApp = () => {
    return (
        <view className="w-full h-full">
            {/* 1. HUD (サイドバー含む) */}
            <HUD />

            {/* 2. ゲームオーバーパネル (一番手前) */}
            <GameOverPanel />
        </view>
    );
};

render(<GameApp />);
