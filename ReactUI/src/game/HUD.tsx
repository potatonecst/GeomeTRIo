import { useGameStatus } from '../hooks/useGameStatus';
import { ProgressBar } from '../components/ProgressBar';

type GameStatus = {
    score: number;
    hp: number;
    sp: number;
    maxHp: number;
    maxSp: number;
    spCharge: number;
    maxSpCharge: number;
    isGameOver: boolean;
    isNewHighScore: boolean;
    isPaused: boolean;
    level: number;
    currentExp: number;
    nextExp: number;
    systemMessage: string;
    systemStatus: string;
    engineStatus: string;
    weaponStatus: string;
    stageName: string;
    timeElapsed: number;
};

export const HUD = () => {
    // カスタムフック useGameStatus を使って、Unityから最新のゲーム状態（HP, SP, スコア等）を取得します。
    // この status オブジェクトは、Unity側の値が変化するたびに自動的に更新され、再描画されます。
    const status = useGameStatus() as unknown as GameStatus;
    // absolute配置に変更し、画面端に固定する
    // w-[325px] が効かない可能性があるため削除し、style属性で指定する
    const sidebarStyle = "h-full bg-black border-cyan-900 flex-col p-6 pointer-events-auto absolute top-0 bottom-0";

    // 時間フォーマットヘルパー (秒 -> MM:SS)
    const formatTime = (seconds: number) => {
        if (!seconds) return "00:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <view className="w-full h-full pointer-events-none relative">
            {/* 左サイドバー (マスク用 + 装飾) */}
            <view className={`${sidebarStyle} border-r-2 items-end left-0`} style={{ width: 550 }}>
                <text className="text-cyan-600 text-3xl tracking-widest mb-1">OPERATION</text>
                <text className="text-white text-4xl tracking-widest mb-8" style={{ fontFamily: 'SourceHanCodeJP' }}>
                    {status.stageName}
                </text>

                <text className="text-cyan-600 text-3xl tracking-widest mb-1">TIME</text>
                <text className="text-white text-4xl tracking-widest mb-auto" style={{ fontFamily: 'SourceHanCodeJP' }}>
                    {formatTime(status.timeElapsed)}
                </text>
            </view>

            {/* 中央は空ける (ゲーム画面が見える領域) */}

            {/* 右サイドバー (ステータス表示) */}
            <view className={`${sidebarStyle} border-l-2 right-0`} style={{ width: 550 }}>
                {/* SCORE AREA */}
                <view className="mb-8">
                    <text className="text-cyan-600 text-3xl tracking-widest mb-1 whitespace-nowrap">SCORE</text>
                    <text className="text-white text-7xl tracking-widest whitespace-nowrap" style={{ fontFamily: 'SourceHanCodeJP' }}>
                        {status.score.toString().padStart(8, '0')}
                    </text>
                </view>

                {/* STATUS AREA */}
                <view className={`mb-6 ${status.hp <= 1 ? "animate-pulse" : ""}`}>
                    <view className="flex-row justify-between mb-1">
                        <text className={`${status.hp <= 1 ? "text-red-500" : "text-cyan-600"} text-2xl tracking-widest`}>HP</text>
                        <text className={`${status.hp <= 1 ? "text-red-500" : "text-white"} text-2xl`}>{status.hp} / {status.maxHp}</text>
                    </view>
                    <ProgressBar value={status.hp} max={status.maxHp} color={status.hp <= 1 ? "#ff3333" : "#00ff00"} />
                </view>

                <view className="mb-8">
                    <view className="flex-row justify-between mb-1">
                        <text className="text-cyan-600 text-2xl tracking-widest">SP CHARGE</text>
                        <text className="text-white text-2xl">x {status.sp}</text>
                    </view>
                    <ProgressBar value={status.spCharge} max={status.maxSpCharge} color="#00ffff" />
                </view>

                {/* LEVEL & EXP AREA (Moved below SP) */}
                <view className="mb-6">
                    <view className="flex-row justify-between mb-1">
                        <text className="text-yellow-400 text-2xl tracking-widest">LV {status.level}</text>
                        <text className="text-white text-xl">EXP {status.currentExp} / {status.nextExp}</text>
                    </view>
                    <ProgressBar value={status.currentExp} max={status.nextExp} color="#facc15" />
                </view>

                {/* STATUS MONITOR */}
                <view className="flex-1 border-t-2 border-cyan-900 pt-4 mt-auto">
                    <text className="text-cyan-600 text-2xl tracking-widest mb-2">STATUS MONITOR</text>

                    {/* 常時表示ステータス (半透明) */}
                    <view className="flex-col gap-1 opacity-70">
                        {/* SYSTEM */}
                        <view className={`flex-row ${status.hp <= 1 ? "animate-pulse" : ""}`}>
                            <text className={`text-2xl ${status.hp <= 1 ? "text-red-500" : "text-cyan-600"}`}>&gt; SYSTEM: </text>
                            <text className={`text-2xl ml-2 ${status.hp <= 1 ? "text-red-500" : "text-white"}`}>{status.systemStatus}</text>
                        </view>

                        {/* ENGINE */}
                        <view className="flex-row">
                            <text className={`text-2xl ${status.engineStatus === 'OFFLINE' ? "text-red-500" : "text-cyan-600"}`}>&gt; ENGINE: </text>
                            <text className={`text-2xl ml-2 ${status.engineStatus === 'OFFLINE' ? "text-red-500" : "text-white"}`}>{status.engineStatus}</text>
                        </view>

                        {/* WEAPON */}
                        <view className="flex-row">
                            <text className="text-cyan-600 text-2xl">&gt; WEAPON: </text>
                            <text className="text-white text-2xl ml-2">{status.weaponStatus}</text>
                        </view>
                    </view>

                    {/* 一時的なメッセージ (不透明・強調表示) */}
                    {status.systemMessage !== "" && (
                        <text className="text-yellow-400 text-2xl animate-pulse mt-4 font-bold">&gt; {status.systemMessage}</text>
                    )}
                </view>
            </view>
        </view>
    );
};
