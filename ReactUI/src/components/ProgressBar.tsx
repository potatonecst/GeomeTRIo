import '../index.css';

interface ProgressBarProps {
    value: number;
    max: number;
    color: string;
}

// 汎用プログレスバーコンポーネント
// 役割: HPやSPなどの数値を視覚的なバーとして表示します。
export const ProgressBar = ({ value, max, color }: ProgressBarProps) => {
    // 0%〜100%に制限
    const percentage = Math.max(0, Math.min(100, (value / max) * 100));

    return (
        <view className="w-full h-4 bg-gray-900 border border-gray-700 relative overflow-hidden">
            {/* 背景のグリッド線（目盛り）: 10等分するように線を引く */}
            <view className="absolute inset-0 flex-row justify-between px-1 pointer-events-none">
                {Array.from({ length: 9 }).map((_, i) => (
                    <view key={i} className="w-[1px] h-full bg-black opacity-50" />
                ))}
            </view>

            {/* バー本体 */}
            <view
                className="h-full transition-all duration-300 ease-out"
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}` // 発光表現
                }}
            />
        </view>
    );
};