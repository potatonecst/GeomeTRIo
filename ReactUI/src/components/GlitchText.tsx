import { useGlitch } from '../hooks/useGlitch';

interface GlitchTextProps {
    text: string;
    isAlert?: boolean;
    className?: string;
    style?: any;
}

// 汎用グリッチテキストコンポーネント
// 役割: テキストに「接触不良」のようなノイズ演出（色ズレ、振動）を加える
// 使い方: <GlitchText text="GAME OVER" isAlert={true} />
export const GlitchText = ({ text, isAlert, className, style }: GlitchTextProps) => {
    // さきほど作ったフックを使って、現在のズレ(offset)とグリッチ中か(isGlitching)を取得
    // ロジックをフックに分離することで、コンポーネントの見通しを良くしています。
    const { offset, isGlitching } = useGlitch();
    const safeStyle = style || {}; // styleがundefinedの場合は空オブジェクトにする

    // isAlertフラグに応じて色を切り替える
    // 通常時: シアン(青緑)系 / 警告時: 赤系
    const ghost1Color = isAlert ? '#ff0000' : '#ff0000'; // ゴースト1は常に赤
    const ghost2Color = isAlert ? '#ffff00' : '#00ffff'; // ゴースト2は警告時に黄色、通常はシアン

    return (
        <view className={`relative ${className || ''}`} style={safeStyle}>
            {/* グリッチ中のみ表示されるゴースト（残像） */}
            {/* メインのテキストから少し座標をずらして、色を変えたテキストを重ねることで色収差を表現 */}
            {isGlitching && (
                <>
                    <text className={`absolute ${className || ''}`} style={{ ...safeStyle, transform: `translate(${offset.x * 2}px, ${offset.y * 2}px)`, opacity: 0.7, color: ghost1Color }}>
                        {text}
                    </text>
                    <text className={`absolute ${className || ''}`} style={{ ...safeStyle, transform: `translate(${-offset.x}px, ${-offset.y}px)`, opacity: 0.7, color: ghost2Color }}>
                        {text}
                    </text>
                </>
            )}
            {/* 本体: こちらも微妙に振動させる */}
            <text className={className} style={{ ...safeStyle, transform: `translate(${offset.x}px, ${offset.y}px)` }}>
                {text}
            </text>
        </view>
    );
};