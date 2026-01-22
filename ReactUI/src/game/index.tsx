import { render } from '@reactunity/renderer';
import '../index.css';

// ゲームプレイ中に表示されるHUD（Head-Up Display）のエントリーポイント
// HPやスコアなどをここに実装していく予定
const GameHUD = () => {
    return (
        <view><text>Game HUD</text></view>
    );
};

// render: ReactUnityの描画を開始する関数。
// 引数に渡したコンポーネント（ここでは <GameHUD />）を、UnityのUIとして生成・表示します。
render(<GameHUD />);