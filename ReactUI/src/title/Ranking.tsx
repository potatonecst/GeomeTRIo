import { Button } from '../components/Button';
import { Card } from '../components/Card';

interface RankingProps {
    onBack: () => void;
}

export const Ranking = ({ onBack }: RankingProps) => {
    // ダミーのランキングデータ
    const rankingData = [
        { rank: 1, date: "2024/01/15", score: 50000 },
        { rank: 2, date: "2024/01/14", score: 45000 },
        { rank: 3, date: "2024/01/10", score: 40000 },
        { rank: 4, date: "2024/01/05", score: 35000 },
        { rank: 5, date: "2024/01/01", score: 30000 },
    ];

    return (
        <view className="w-full max-w-2xl px-10 h-full flex-col">
            <text style={{ fontSize: 30, marginBottom: 20, textAlign: 'center' }}>Ranking</text>

            <view style={{ flex: 1 }}>
                {rankingData.map((record) => (
                    <Card key={record.rank} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <view style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <text style={{ fontSize: 24, fontWeight: 'bold', marginRight: 15, color: '#555', width: 40 }}>#{record.rank}</text>
                            <text style={{ fontSize: 18 }}>{record.date}</text>
                        </view>
                        <text style={{ fontSize: 20, fontWeight: 'bold' }}>{record.score.toLocaleString()}</text>
                    </Card>
                ))}
            </view>

            <Button style={{ marginTop: 20, alignSelf: 'center' }} onClick={onBack}>Back</Button>
        </view>
    );
};