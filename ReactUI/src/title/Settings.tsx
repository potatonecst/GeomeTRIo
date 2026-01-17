import { Button } from '../components/Button';

interface SettingsProps {
    onBack: () => void;
}

export const Settings = ({ onBack }: SettingsProps) => {
    return (
        <view>
            <text style={{ fontSize: 30 }}>Settings</text>
            {/* ここに音量設定などを実装 */}
            <Button style={{ marginTop: 20 }} onClick={onBack}>Back</Button>
        </view>
    );
};