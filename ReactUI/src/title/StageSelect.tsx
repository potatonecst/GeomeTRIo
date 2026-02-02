import { useState, useEffect } from 'react';
import { MenuButton } from '../components/MenuButton';
import { GlitchText } from '../components/GlitchText';
import { useGlobals } from '@reactunity/renderer';

interface StageSelectProps {
    onBack: () => void;
    onGameStart: () => void;
}

const STAGES = [
    { label: "Stage 1", sceneName: "Stage1", disabled: true }, // まだシーンがないため無効化
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
        } else {
            // マウント（表示）直後は透明度0からスタートし、50ms後に1にすることでフェードインさせる
            const timer = setTimeout(() => setOpacity(1), 50);
            return () => clearTimeout(timer);
        }
    }, [isExiting, onBack]);

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
                // 無効なステージの場合は開始しない
                if (STAGES[selectedIndex].disabled) {
                    interop?.PlaySound('cancel');
                    return;
                }

                // という設計だったが、ラグ解消のためC#側の再生を削除し、React側で即座に鳴らす方針に変更。
                // 遷移アニメーション(300ms)があるため、ボタンを押した瞬間のフィードバックとしてここで鳴らすのが適切。
                interop?.PlaySound('submit');

                // LOADING表示開始
                onGameStart();
                setIsStarting(true); // ボタンを押下状態にする

                // アニメーション開始の猶予を持たせるため、少し遅延させてからロードを開始する
                // これにより「瞬時に真っ黒」になるのを防ぎ、フェードインの出だしを確実に描画させる
                setTimeout(() => {
                    const stage = STAGES[selectedIndex];
                    if (interop && typeof interop.StartGame === 'function') {
                        interop.StartGame(stage.sceneName);
                    } else {
                        console.log(`Start Game: ${stage.sceneName}`);
                        setIsStarting(false);
                        setIsExiting(true);
                    }
                }, 100);
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
        <view className="flex-col w-full h-full p-12 text-white font-mono transition-opacity duration-300" style={{ opacity }}>
            {/* Header: 画面上部の見出し */}
            <view className="flex-row justify-between items-end mb-4 border-b-2 border-cyan-900 pb-2 w-full">
                <GlitchText text="STAGE SELECT" className="text-8xl font-bold text-white tracking-tighter leading-none whitespace-nowrap" />
                <text className="text-3xl text-cyan-600">MISSION: INFILTRATION</text>
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
                        className="h-24 mb-6"
                        disabled={stage.disabled}
                    />
                ))}
            </view>

            {/* Description Area (Optional): 選択中のステージの説明を表示 */}
            <view className="absolute right-12 top-64 w-1/2 p-6 border border-cyan-900 bg-black bg-opacity-50">
                <text className="text-cyan-400 mb-4 text-4xl">&gt;&gt; MISSION BRIEFING</text>
                <text className="text-gray-300 text-4xl leading-normal">
                    {selectedIndex === 0
                        ? "Standard mission. Breach the defense grid and neutralize the core."
                        : "Endless survival mode. Test your limits against infinite waves."}
                </text>
            </view>
        </view>
    );
};