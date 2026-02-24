import { useGameStatus } from '../hooks/useGameStatus';
import { ProgressBar } from '../components/ProgressBar';
import { GlitchText } from '../components/GlitchText';

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

// HUDの各パーツの表示/非表示を制御するフラグ群。
// カットイン演出に合わせて段階的にtrueになります。
export type HUDState = {
    frame: boolean;
    labels: boolean;
    vital: boolean;
    engine: boolean;
    weapon: boolean;
    env: boolean;
    isScanning: boolean;
    telemetry: boolean;
    system: boolean;
};

// HUDコンポーネント
// 役割: ゲーム中のヘッドアップディスプレイ（スコア、HP、残弾、ステータスログなど）を表示します。
// 特徴: ゲーム開始時のカットイン演出に合わせて、各パーツが段階的に表示される（Progressive Reveal）機能を持ちます。
export const HUD = ({ hudState }: { hudState: HUDState }) => {
    // カスタムフック useGameStatus を使って、Unityから最新のゲーム状態（HP, SP, スコア等）を取得します。
    // この status オブジェクトは、Unity側の値が変化するたびに自動的に更新され、再描画されます。
    const status = useGameStatus() as unknown as GameStatus;
    // absolute配置に変更し、画面端に固定する
    // w-[325px] が効かない可能性があるため削除し、style属性で指定する
    const sidebarStyle = "h-full bg-black border-cyan-900 flex-col p-6 pointer-events-auto absolute top-0 bottom-0 transition-opacity duration-500";

    // 時間フォーマットヘルパー (秒 -> MM:SS)
    // Math.floorで分と秒を計算し、padStartで2桁埋め（0詰め）を行います。
    const formatTime = (seconds: number) => {
        if (!seconds) return "00:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <view className="w-full h-full pointer-events-none relative">
            {/* 左サイドバー (マスク用 + 装飾) */}
            {/* pointer-events-auto: 親でnoneにしているが、サイドバー内（もしボタンがあれば）は操作可能にするため。現状は表示のみなので影響薄。 */}
            <view
                className={`${sidebarStyle} border-r-2 items-end left-0 ${hudState.frame ? 'opacity-100' : 'opacity-0'}`}
                style={{ width: 550 }}
            >
                <view className={`flex-col items-end transition-opacity duration-500 ${hudState.labels ? 'opacity-100' : 'opacity-0'}`}>
                    <text className="text-cyan-600 text-3xl tracking-widest mb-1" style={{ fontFamily: 'SourceHanCodeJP' }}>STAGE</text>
                    {/* レイアウトシフト対策: 
                        中身が表示される前でも高さ(h-10)を確保しておくことで、
                        表示された瞬間に下の要素がガタッと動くのを防ぎます。 */}
                    <view className="mb-8 h-10 flex items-center justify-end">
                        {/* 条件分岐による表示切り替え: スキャン演出 -> ステージ名 -> プレースホルダー */}
                        {hudState.isScanning ? (
                            <GlitchText text="SCANNING..." className="text-yellow-400 text-4xl tracking-widest" style={{ fontFamily: 'SourceHanCodeJP' }} />
                        ) : hudState.env ? (
                            <text className="text-white text-4xl tracking-widest" style={{ fontFamily: 'SourceHanCodeJP' }}>{status.stageName}</text>
                        ) : (
                            <text className="text-gray-700 text-4xl tracking-widest" style={{ fontFamily: 'SourceHanCodeJP' }}>---</text>
                        )}
                    </view>

                    <text className="text-cyan-600 text-3xl tracking-widest mb-1" style={{ fontFamily: 'SourceHanCodeJP' }}>TIME</text>
                    <view className="h-10 flex items-center justify-end mb-auto">
                        {hudState.telemetry ? (
                            <text className="text-white text-4xl tracking-widest" style={{ fontFamily: 'SourceHanCodeJP' }}>{formatTime(status.timeElapsed)}</text>
                        ) : (
                            <text className="text-gray-700 text-4xl tracking-widest" style={{ fontFamily: 'SourceHanCodeJP' }}>00:00</text>
                        )}
                    </view>
                </view>
            </view>

            {/* 中央は空ける (ゲーム画面が見える領域) */}

            {/* 右サイドバー (ステータス表示) */}
            <view
                className={`${sidebarStyle} border-l-2 right-0 ${hudState.frame ? 'opacity-100' : 'opacity-0'}`}
                style={{ width: 550 }}
            >
                <view className={`flex-col transition-opacity duration-500 ${hudState.labels ? 'opacity-100' : 'opacity-0'}`}>
                    {/* SCORE AREA */}
                    <view className="mb-8">
                        <text className="text-cyan-600 text-3xl tracking-widest mb-1 whitespace-nowrap" style={{ fontFamily: 'SourceHanCodeJP' }}>SCORE</text>
                        {hudState.telemetry ? (
                            <text className="text-white text-7xl tracking-wider whitespace-nowrap" style={{ fontFamily: 'SourceHanCodeJP' }}>
                                {Math.min(status.score, 9999999999).toString().padStart(10, '0')}
                            </text>
                        ) : (
                            <text className="text-gray-700 text-7xl tracking-wider whitespace-nowrap" style={{ fontFamily: 'SourceHanCodeJP' }}>0000000000</text>
                        )}
                    </view>

                    {/* STATUS AREA */}
                    {/* HPが1以下の時、エリア全体を点滅させて危機感を煽る */}
                    <view className={`mb-6 ${status.hp <= 1 ? "animate-pulse" : ""}`}>
                        <view className="flex-row justify-between mb-1">
                            <text className={`${status.hp <= 1 ? "text-red-500" : "text-cyan-600"} text-2xl tracking-widest`} style={{ fontFamily: 'SourceHanCodeJP' }}>HP</text>
                            {hudState.vital ? (
                                <text className={`${status.hp <= 1 ? "text-red-500" : "text-white"} text-2xl`} style={{ fontFamily: 'SourceHanCodeJP' }}>{status.hp} / {status.maxHp}</text>
                            ) : (
                                <text className="text-gray-700 text-2xl">-- / --</text>
                            )}
                        </view>
                        {/* ProgressBarコンポーネント: 値と最大値を渡すとバーを描画する */}
                        <ProgressBar value={hudState.vital ? status.hp : 0} max={status.maxHp} color={status.hp <= 1 ? "#ff3333" : "#00ff00"} />
                    </view>

                    <view className="mb-8">
                        <view className="flex-row justify-between mb-1">
                            <text className="text-cyan-600 text-2xl tracking-widest" style={{ fontFamily: 'SourceHanCodeJP' }}>SP CHARGE</text>
                            {hudState.weapon ? (
                                <text className="text-white text-2xl" style={{ fontFamily: 'SourceHanCodeJP' }}>x {status.sp}</text>
                            ) : (
                                <text className="text-gray-700 text-2xl">x -</text>
                            )}
                        </view>
                        <ProgressBar value={hudState.weapon ? status.spCharge : 0} max={status.maxSpCharge} color="#00ffff" />
                    </view>

                    {/* LEVEL & EXP AREA (Moved below SP) */}
                    <view className="mb-6">
                        <view className="flex-row justify-between mb-1">
                            {hudState.weapon ? (
                                <>
                                    <text className="text-yellow-400 text-2xl tracking-widest" style={{ fontFamily: 'SourceHanCodeJP' }}>LV {status.level}</text>
                                    <text className="text-white text-xl" style={{ fontFamily: 'SourceHanCodeJP' }}>EXP {status.currentExp} / {status.nextExp}</text>
                                </>
                            ) : (
                                <>
                                    <text className="text-gray-700 text-2xl tracking-widest" style={{ fontFamily: 'SourceHanCodeJP' }}>LV --</text>
                                    <text className="text-gray-700 text-xl" style={{ fontFamily: 'SourceHanCodeJP' }}>EXP -- / --</text>
                                </>
                            )}
                        </view>
                        <ProgressBar value={hudState.weapon ? status.currentExp : 0} max={status.nextExp} color="#facc15" />
                    </view>
                </view>

                {/* STATUS MONITOR */}
                {/* mt-auto: Flexboxの機能で、この要素を可能な限り下に押し下げます（フッター配置） */}
                <view className={`flex-1 border-t-2 border-cyan-900 pt-4 mt-auto transition-opacity duration-500 ${hudState.labels ? 'opacity-100' : 'opacity-0'}`}>
                    <text className="text-cyan-600 text-2xl tracking-widest mb-2" style={{ fontFamily: 'SourceHanCodeJP' }}>STATUS MONITOR</text>

                    {/* 常時表示ステータス (半透明) */}
                    <view className="flex-col gap-1 opacity-70">
                        {/* SYSTEM */}
                        <view className={`flex-row ${status.hp <= 1 ? "animate-pulse" : ""}`}>
                            <text className={`text-2xl ${status.hp <= 1 ? "text-red-500" : "text-cyan-600"}`} style={{ fontFamily: 'SourceHanCodeJP' }}>&gt; SYSTEM: </text>
                            {hudState.system ? (
                                <text className={`text-2xl ml-2 tracking-widest ${status.hp <= 1 ? "text-red-500" : "text-green-500"}`} style={{ fontFamily: 'SourceHanCodeJP' }}>{status.systemStatus}</text>
                            ) : (
                                <text className="text-gray-700 text-2xl ml-2" style={{ fontFamily: 'SourceHanCodeJP' }}>---</text>
                            )}
                        </view>

                        {/* ENGINE */}
                        <view className={`flex-row ${status.engineStatus === 'DESTROYED' ? "animate-pulse" : ""}`}>
                            <text className={`text-2xl ${status.engineStatus === 'DESTROYED' ? "text-red-500" : "text-cyan-600"}`} style={{ fontFamily: 'SourceHanCodeJP' }}>&gt; ENGINE: </text>
                            {hudState.engine ? (
                                <text className={`text-2xl ml-2 tracking-widest ${status.engineStatus === 'DESTROYED' ? "text-red-500" : "text-white"}`} style={{ fontFamily: 'SourceHanCodeJP' }}>{status.engineStatus}</text>
                            ) : (
                                <text className="text-gray-700 text-2xl ml-2" style={{ fontFamily: 'SourceHanCodeJP' }}>---</text>
                            )}
                        </view>

                        {/* WEAPON */}
                        <view className={`flex-row ${status.weaponStatus === 'CRITICAL ERROR' || status.weaponStatus === 'JAMMED' ? "animate-pulse" : ""}`}>
                            <text className={`text-2xl ${status.weaponStatus === 'CRITICAL ERROR' ? "text-red-500" : status.weaponStatus === 'JAMMED' ? "text-purple-400" : "text-cyan-600"}`} style={{ fontFamily: 'SourceHanCodeJP' }}>&gt; WEAPON: </text>
                            {hudState.weapon ? (
                                <text className={`text-2xl ml-2 tracking-widest ${status.weaponStatus === 'CRITICAL ERROR' ? "text-red-500" : status.weaponStatus === 'JAMMED' ? "text-purple-400" : "text-white"} whitespace-nowrap`} style={{ fontFamily: 'SourceHanCodeJP' }}>{status.weaponStatus}</text>
                            ) : (
                                <text className="text-gray-700 text-2xl ml-2" style={{ fontFamily: 'SourceHanCodeJP' }}>---</text>
                            )}
                        </view>
                    </view>

                    {/* 一時的なメッセージ (不透明・強調表示) */}
                    {status.systemMessage !== "" && (
                        <text className="text-yellow-400 text-2xl animate-pulse mt-4" style={{ fontFamily: 'SourceCodePro-Medium' }}>&gt; {status.systemMessage}</text>
                    )}
                </view>
            </view>
        </view>
    );
};
