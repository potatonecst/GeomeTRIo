import { useState, useEffect, useMemo } from 'react';
import { MenuButton } from '../components/MenuButton';
import { GlitchText } from '../components/GlitchText';
import { useGlobals } from '@reactunity/renderer';

interface StageSelectProps {
    onBack: () => void;
    onGameStart: () => void;
}

const STAGES = [
    { label: "Stage 1", sceneName: "Stage1" },
    { label: "Score Attack", sceneName: "ScoreAttack" }
];

// ステージ選択画面コンポーネント
export const StageSelect = ({ onBack, onGameStart }: StageSelectProps) => {
    // useGlobals: ReactUnityが提供するフック。
    // C#側で ReactRenderer.Globals に登録したオブジェクトにアクセスするために使用します。
    // ここでは C# の GameInterop クラスのインスタンスを取得し、ゲーム開始メソッドを呼び出すために使います。
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;

    // 選択中のステージのインデックス (0: Stage 1, 1: Score Attack)
    const [selectedIndex, setSelectedIndex] = useState(0);

    // 画面の不透明度。フェードイン・アウトのアニメーションに使用します。
    const [opacity, setOpacity] = useState(0);

    // 画面遷移中（戻る操作中）かどうかのフラグ
    const [isExiting, setIsExiting] = useState(false);

    // ゲーム開始処理中かどうかのフラグ（二重送信防止やアニメーション待機用）
    const [isStarting, setIsStarting] = useState(false);

    // フェードイン・アウト制御
    // useEffect: コンポーネントの状態変化に応じて副作用（アニメーション等）を実行します。
    useEffect(() => {
        if (isExiting) {
            // 終了フラグが立ったら透明度を0にしてフェードアウト
            setOpacity(0);
            // 300ms待ってから親コンポーネントの onBack を呼び出し、実際に画面を切り替える
            const timer = setTimeout(onBack, 300);
            return () => clearTimeout(timer);
        } else if (isStarting) {
            // ゲーム開始時はフェードアウトだけして、遷移はC#側で行われるため待つ
            setOpacity(0);
        } else {
            // マウント（表示）直後は透明度0からスタートし、50ms後に1にすることでフェードインさせる
            const timer = setTimeout(() => setOpacity(1), 50);
            return () => clearTimeout(timer);
        }
    }, [isExiting, isStarting, onBack]);

    // 入力ハンドリング
    // C# (ReactInputBridge) からの入力を受け取るイベントリスナーを設定します。
    // 依存配列に必要な変数をすべて含めることで、状態が更新された際にリスナーも正しく更新されるようにします。
    useEffect(() => {
        // windowオブジェクトに onMenuInput 関数を定義し、C#から呼び出せるようにします。
        (window as any).onMenuInput = (event: string) => {
            // 遷移中や開始処理中は入力を受け付けない（ガード処理）
            if (isExiting || isStarting) return;

            if (event === 'up') {
                interop?.PlaySound('move');
                // 上キー: インデックスを減らす。0より小さくなったら末尾にループさせる。
                // (prev - 1 + length) % length という計算式は、循環リストの定番テクニックです。
                setSelectedIndex(prev => (prev - 1 + STAGES.length) % STAGES.length);
            } else if (event === 'down') {
                interop?.PlaySound('move');
                // 下キー: インデックスを増やす。末尾を超えたら0に戻る。
                setSelectedIndex(prev => (prev + 1) % STAGES.length);
            } else if (event === 'submit') {
                // StartGame内でPlaySubmitSoundを呼んでいるため、ここでは鳴らさない、
                // という設計だったが、ラグ解消のためC#側の再生を削除し、React側で即座に鳴らす方針に変更。
                // 遷移アニメーション(300ms)があるため、ボタンを押した瞬間のフィードバックとしてここで鳴らすのが適切。
                interop?.PlaySound('submit');

                // 親コンポーネントにゲーム開始を通知
                onGameStart();

                // ゲーム開始処理
                setIsStarting(true);
                // アニメーションやSEのために少し待ってから実行
                setTimeout(() => {
                    const stage = STAGES[selectedIndex];
                    // C#側のStartGameメソッドを呼び出す
                    // typeof チェックを行うことで、C#側の準備ができていない場合のエラーを防ぐ
                    if (interop && typeof interop.StartGame === 'function') {
                        interop.StartGame(stage.sceneName);
                    } else {
                        // フォールバック（開発用など）
                        console.log(`Start Game: ${stage.sceneName}`);
                        // GameInteropがない場合はインターフェースだけ戻す
                        setIsStarting(false);
                        setIsExiting(true);
                    }
                }, 300);
            } else if (event === 'cancel') {
                interop?.PlaySound('cancel');
                // キャンセルキー: 戻る処理を開始（フェードアウトへ）
                setIsExiting(true);
            }
        };

        // クリーンアップ関数: コンポーネントがアンマウントされる（消える）時に、
        // グローバル関数を空の関数で上書きして、無効な呼び出しを防ぎます。
        return () => { (window as any).onMenuInput = () => { }; };
    }, [selectedIndex, isExiting, isStarting, interop, onBack, onGameStart]);

    return (
        <view className="flex-col w-full h-full p-8 text-white font-mono transition-opacity duration-300" style={{ opacity }}>
            {/* Header: 画面上部の見出し */}
            <view className="flex-row justify-between items-end mb-8 border-b-2 border-cyan-900 pb-2 w-full">
                <GlitchText text="STAGE SELECT" className="text-4xl font-bold text-white tracking-tighter leading-none" />
                <text className="text-sm text-cyan-600">MISSION: INFILTRATION</text>
            </view>

            {/* Stage List: ステージ選択ボタンのリスト */}
            <view className="flex-col w-1/3">
                {STAGES.map((stage, idx) => (
                    <MenuButton
                        key={idx}
                        label={stage.label}
                        isSelected={idx === selectedIndex}
                        // ゲーム開始処理中かつ、この項目が選択されている場合に「押下状態」にする
                        isPressed={isStarting && idx === selectedIndex}
                        barClass="w-full"
                        className="h-12 mb-4"
                    />
                ))}
            </view>

            {/* Description Area (Optional): 選択中のステージの説明を表示 */}
            <view className="absolute right-8 top-32 w-1/2 p-4 border border-cyan-900 bg-black bg-opacity-50">
                <text className="text-cyan-400 mb-2">&gt;&gt; MISSION BRIEFING</text>
                <text className="text-gray-300 text-sm">
                    {selectedIndex === 0
                        ? "Standard mission. Breach the defense grid and neutralize the core."
                        : "Endless survival mode. Test your limits against infinite waves."}
                </text>
            </view>
        </view>
    );
};