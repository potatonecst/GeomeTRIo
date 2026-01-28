import { useGameStatus } from '../hooks/useGameStatus';
import { ProgressBar } from '../components/ProgressBar';

export const HUD = () => {
    const status = useGameStatus();
    // absolute配置に変更し、画面端に固定する
    // w-[325px] が効かない可能性があるため削除し、style属性で指定する
    const sidebarStyle = "h-full bg-black border-cyan-900 flex-col p-6 pointer-events-auto absolute top-0 bottom-0";

    return (
        <view className="w-full h-full pointer-events-none relative">
            {/* 左サイドバー (マスク用 + 装飾) */}
            <view className={`${sidebarStyle} border-r-2 items-end left-0`} style={{ width: 600 }}>
                <text className="text-cyan-900 text-xs tracking-widest mt-auto">SYSTEM: ONLINE</text>
                <text className="text-cyan-900 text-xs tracking-widest">L-MASK: ACTIVE</text>
            </view>

            {/* 中央は空ける (ゲーム画面が見える領域) */}

            {/* 右サイドバー (ステータス表示) */}
            <view className={`${sidebarStyle} border-l-2 right-0`} style={{ width: 600 }}>
                {/* SCORE AREA */}
                <view className="mb-8">
                    <text className="text-cyan-600 text-xs tracking-widest mb-1 whitespace-nowrap">SCORE</text>
                    <text className="text-white text-3xl tracking-widest whitespace-nowrap" style={{ fontFamily: 'SourceHanCodeJP' }}>
                        {status.score.toString().padStart(8, '0')}
                    </text>
                </view>

                {/* STATUS AREA */}
                <view className="mb-6">
                    <view className="flex-row justify-between mb-1">
                        <text className="text-cyan-600 text-xs tracking-widest">INTEGRITY</text>
                        <text className="text-white text-xs">{status.hp} / 10</text>
                    </view>
                    <ProgressBar value={status.hp} max={10} color="#ff3333" />
                </view>

                <view className="mb-8">
                    <view className="flex-row justify-between mb-1">
                        <text className="text-cyan-600 text-xs tracking-widest">ENERGY</text>
                        <text className="text-white text-xs">{status.sp} / 10</text>
                    </view>
                    <ProgressBar value={status.sp} max={10} color="#00ffff" />
                </view>

                {/* SYSTEM LOG */}
                <view className="flex-1 border-t-2 border-cyan-900 pt-4 mt-auto">
                    <text className="text-cyan-600 text-xs tracking-widest mb-2">SYSTEM LOG</text>
                    <view className="flex-col gap-1 opacity-70">
                        <text className="text-gray-500 text-xs">&gt; ENGAGING...</text>
                        <text className="text-cyan-500 text-xs animate-pulse">&gt; RECORDING</text>
                    </view>
                </view>
            </view>
        </view>
    );
};
