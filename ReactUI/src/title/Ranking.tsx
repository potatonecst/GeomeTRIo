import '../index.css';
import { useState, useEffect, useMemo } from 'react';
import { useGlobals } from '@reactunity/renderer';
import { MenuButton } from '../components/MenuButton';
import { GlitchText } from '../components/GlitchText';

// C#側の ScoreRecord 構造体 (GameData.cs) に対応する型定義
// 注意: C#側には 'rank' や 'name' が含まれていないため、React側で補完する必要があります。
type ScoreRecord = {
    score: number;
    date: string;
    hp: number;
    sp: number;
    autoFire: boolean;
};

// Unity (C#) 側から受け取るデータ全体の型定義
type GameData = {
    stage1Scores: ScoreRecord[];
    scoreAttackScores: ScoreRecord[];
    // 必要に応じて他のデータもここに追加
};

// フィルタリング条件の状態管理用型
type FilterState = {
    hp: number | 'ANY';
    sp: number | 'ANY';
    auto: boolean | 'ANY';
};

const STAGES = ['Stage 1', 'Score Attack'];
const FILTER_KEYS = ['hp', 'sp', 'auto'];


export const Ranking = ({ onBack }: { onBack: () => void }) => {
    // ReactUnityのGlobalsオブジェクトを取得
    // ドキュメントに従い、Globalsへのアクセスにはこのフックを使用する
    // これにより、C#側でGlobalsに変更があった場合に検知できます。
    const globals = useGlobals() as any;
    // useGlobals経由でGameInteropオブジェクトを取得
    // C#側でGlobalsに登録されると、useGlobalsが再描画をトリガーし、ここが更新される
    const interop = globals.GameInterop;

    // 画面の不透明度（フェードイン・アウト用）
    const [opacity, setOpacity] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    // ステージ選択の状態 (0: Stage 1, 1: Score Attack)
    // useState: Reactの状態管理フック。
    // 引数: 初期値 (ここでは 0)
    // 戻り値: [現在の値, 値を更新する関数] のペア
    // 効果: setSelectedStageIndex を呼ぶと、selectedStageIndex の値が変わり、画面が再描画されます。
    const [selectedStageIndex, setSelectedStageIndex] = useState(0);

    // フォーカスエリアの状態 ('stage': 左側のリスト, 'filter': 右側の設定)
    const [focusArea, setFocusArea] = useState<'stage' | 'filter'>('stage');

    // フィルタ設定の選択行 (0: HP, 1: SP, 2: Auto)
    const [filterRowIndex, setFilterRowIndex] = useState(0); // 0:HP, 1:SP, 2:Auto

    // フィルタリング条件の状態
    // オブジェクト形式で複数の状態をまとめて管理しています。
    const [filters, setFilters] = useState<FilterState>({
        hp: 'ANY',
        sp: 'ANY',
        auto: 'ANY',
    });

    // ランキングデータの状態
    // 初期値は空のオブジェクト。Unityからデータを受け取るまでは空の状態となる。
    const [scoresData, setScoresData] = useState<Record<string, ScoreRecord[]>>({
        'Stage 1': [],
        'Score Attack': []
    });

    // フェードイン・アウト制御
    useEffect(() => {
        if (isExiting) {
            setOpacity(0);
            const timer = setTimeout(onBack, 300); // アニメーション終了後に戻る
            return () => clearTimeout(timer);
        } else {
            // マウント時にフェードイン
            const timer = setTimeout(() => setOpacity(1), 50);
            return () => clearTimeout(timer);
        }
    }, [isExiting, onBack]);

    // データ取得用エフェクト
    // コンポーネントが表示された時（マウント時）に一度だけ実行され、Unity側からデータを取得します。
    // useEffect: 副作用（画面描画以外の処理）を実行するフック。
    // 第2引数（依存配列）が [] なので、最初の1回だけ実行されます。
    useEffect(() => {
        // Unity側で定義された関数 `getGameData` を呼び出す想定
        const fetchData = () => {
            try {
                // GameInteropが存在し、かつGetGameDataメソッドを持っているか確認
                if (interop && typeof interop.GetGameData === 'function') {
                    // JSON文字列として受け取る場合を想定
                    // JSON.parse(): 文字列（テキスト）をJavaScriptのオブジェクトや配列に変換する関数です。
                    const json = interop.GetGameData();
                    const data: GameData = typeof json === 'string' ? JSON.parse(json) : json;

                    // 取得したデータをReactの状態（State）に反映
                    // これにより scoresData が更新され、画面の再描画がトリガーされます。
                    setScoresData({
                        'Stage 1': data.stage1Scores || [],
                        'Score Attack': data.scoreAttackScores || []
                    });
                }
            } catch (e) {
                console.error("Failed to fetch ranking data:", e);
            }
        };
        fetchData();
    }, [interop]); // 依存配列: interop が変更されたら（C#から登録されたら）再実行する

    // フィルタリングロジック (useMemo)
    // 依存配列 ([selectedStageIndex, filters, scoresData]) のいずれかが変化した時だけ再計算されます。
    // これにより、無関係な再描画時の計算コストを削減できます。
    // useMemo: 計算結果をキャッシュ（保存）しておくフック。
    // 毎回計算すると重くなる処理などに使います。
    const filteredScores = useMemo(() => {
        const stageName = STAGES[selectedStageIndex];
        // 現在選択されているステージのスコアリストを取得
        const scores = scoresData[stageName] || [];

        // フィルタ条件に従ってデータを絞り込む
        // filterメソッド: 配列の中身を順番にチェックし、条件（trueを返すもの）だけを残した「新しい配列」を作ります。
        // 引数 s: 配列内の個々の要素（ここでは ScoreRecord）が入ってきます。
        return scores.filter(s => {
            // HPフィルタ: 'ANY' でなく、かつ値が一致しない場合は除外
            if (filters.hp !== 'ANY' && s.hp !== filters.hp) return false;
            // SPフィルタ
            if (filters.sp !== 'ANY' && s.sp !== filters.sp) return false;
            // AutoFireフィルタ
            if (filters.auto !== 'ANY' && s.autoFire !== filters.auto) return false;
            // すべてのチェックを通過したら true を返し、リストに残す
            return true;
        }).sort((a, b) => b.score - a.score); // sortメソッド: 配列を並び替える。b.score - a.score で降順（大きい順）になる。
    }, [selectedStageIndex, filters, scoresData]);

    // キー入力ハンドリング
    useEffect(() => {
        // C# (ReactInputBridge) からの入力を受け取る関数を定義
        (window as any).onMenuInput = (event: string) => {
            if (isExiting) return; // 終了アニメーション中は入力を無視

            // 戻る操作
            if (event === 'cancel') {
                interop?.PlaySound('cancel');
                if (focusArea === 'filter') {
                    setFocusArea('stage'); // フィルタからステージ選択へ戻る
                } else {
                    setIsExiting(true); // フェードアウト開始
                }
                return;
            }

            if (focusArea === 'stage') {
                // ステージ選択エリアの操作
                if (event === 'up') {
                    interop?.PlaySound('move');
                    setSelectedStageIndex(prev => (prev - 1 + STAGES.length) % STAGES.length);
                }
                if (event === 'down') {
                    interop?.PlaySound('move');
                    setSelectedStageIndex(prev => (prev + 1) % STAGES.length);
                }
                if (event === 'right' || event === 'submit') {
                    interop?.PlaySound('submit'); // 決定音でエリア移動
                    setFocusArea('filter');
                }
            } else {
                // フィルタ設定エリアの操作
                if (event === 'up') {
                    interop?.PlaySound('move');
                    setFilterRowIndex(prev => (prev - 1 + FILTER_KEYS.length) % FILTER_KEYS.length);
                }
                if (event === 'down') {
                    interop?.PlaySound('move');
                    setFilterRowIndex(prev => (prev + 1) % FILTER_KEYS.length);
                }
                if (event === 'left') {
                    interop?.PlaySound('move');
                    // 値変更（左）
                    changeFilterValue(filterRowIndex, -1);
                }
                if (event === 'right') {
                    interop?.PlaySound('move');
                    // 値変更（右）
                    changeFilterValue(filterRowIndex, 1);
                }
                // 左端でさらに左を押したらステージ選択に戻る処理は、
                // 誤操作防止のためキャンセルボタン推奨とする
            }
        };

        // クリーンアップ: コンポーネントが消える時に関数を空にする
        return () => { (window as any).onMenuInput = () => { }; };
    }, [focusArea, filterRowIndex, filters, onBack, isExiting, interop]);

    // フィルタ値を変更する関数
    // direction: +1 (右) または -1 (左)
    const changeFilterValue = (rowIndex: number, direction: number) => {
        // setFiltersに関数を渡すことで、現在の状態(prev)をもとに新しい状態を計算します。
        setFilters(prev => {
            // スプレッド構文 (...prev): 現在のフィルタ設定をコピーして新しいオブジェクトを作ります。
            // Reactでは状態を直接書き換えず、コピーを変更してセットするのがルールです。
            const next = { ...prev };

            if (rowIndex === 0) { // HP (1-10, ANY)
                // ANY(0) <-> 1 <-> ... <-> 10
                let current = next.hp === 'ANY' ? 0 : next.hp;
                let newVal = current + direction;
                if (newVal < 0) newVal = 10;
                if (newVal > 10) newVal = 0;
                next.hp = newVal === 0 ? 'ANY' : newVal;
            } else if (rowIndex === 1) { // SP (0-10, ANY)
                // ANY(-1) <-> 0 <-> ... <-> 10
                let current = next.sp === 'ANY' ? -1 : next.sp;
                let newVal = current + direction;
                if (newVal < -1) newVal = 10;
                if (newVal > 10) newVal = -1;
                next.sp = newVal === -1 ? 'ANY' : newVal;
            } else if (rowIndex === 2) { // Auto (ANY, OFF, ON)
                // ANY(0) <-> OFF(1) <-> ON(2)
                const states: (boolean | 'ANY')[] = ['ANY', false, true];
                // indexOf: 配列の中から特定の値を探し、その位置（インデックス）を返します。
                let currentIdx = states.indexOf(next.auto);
                // 配列の長さで割った余り(%)を使うことで、インデックスを循環（ループ）させています。
                let newIdx = (currentIdx + direction + states.length) % states.length;
                next.auto = states[newIdx];
            }
            return next;
        });
    };

    // ASCIIゲージ生成ヘルパー
    // 数値を視覚的なバー（[|||...]）に変換して返します
    const renderGauge = (value: number, max: number) => {
        const totalLen = 10;
        // Math.round: 四捨五入して整数にします。
        const filledLen = Math.round((value / max) * totalLen);
        // repeat: 文字列を指定回数繰り返します。
        // 視認性を上げるため、'|'と'.'の代わりに'='と'-'を使用します
        const bar = '='.repeat(filledLen) + '-'.repeat(totalLen - filledLen);
        return `[${bar}]`;
    };

    // 値を固定幅（中央揃え）にフォーマットするヘルパー
    // 例: "1" -> "  1  ", "10" -> " 10  ", "ANY" -> " ANY "
    const formatValue = (val: string | number) => {
        const str = val.toString();
        const width = 3; // ANYに合わせて3文字分確保
        const padding = width - str.length;
        const padLeft = Math.floor(padding / 2);
        const padRight = padding - padLeft;
        return ' '.repeat(padLeft) + str + ' '.repeat(padRight);
    };

    // フィルタの表示用テキストとゲージを取得するヘルパー
    const getFilterDisplay = (type: 'hp' | 'sp' | 'auto') => {
        const val = filters[type];
        // ANYの場合は専用の表示にして、0や10と区別する
        const anyGauge = '[   ANY    ]';

        if (type === 'hp') {
            if (val === 'ANY') return { label: 'HP', text: `< ${formatValue('ANY')} >`, gauge: anyGauge };
            return { label: 'HP', text: `< ${formatValue(val as number)} >`, gauge: renderGauge(val as number, 10) };
        }
        if (type === 'sp') {
            if (val === 'ANY') return { label: 'SP', text: `< ${formatValue('ANY')} >`, gauge: anyGauge };
            return { label: 'SP', text: `< ${formatValue(val as number)} >`, gauge: renderGauge(val as number, 10) };
        }
        if (type === 'auto') {
            if (val === 'ANY') return { label: 'AUTO FIRE', text: `< ${formatValue('ANY')} >`, gauge: anyGauge };
            return { label: 'AUTO FIRE', text: val ? `< ${formatValue('ON')} >` : `< ${formatValue('OFF')} >`, gauge: val ? '[==========]' : '[----------]' };
        }
        return { label: '', text: '', gauge: '' };
    };

    return (
        <view className="flex-col w-full h-full p-8 text-white font-mono transition-opacity duration-300" style={{ opacity }}>
            {/* Header Area: 全幅の見出しとステータス表示 */}
            <view className="flex-row justify-between items-end mb-4 border-b-2 border-cyan-900 pb-2 w-full">
                <GlitchText text="RANKING" className="text-4xl font-bold text-white tracking-tighter leading-none" />
                <text className="text-sm text-cyan-600">DATABASE: LOCAL_STORAGE</text>
            </view>

            {/* Content Area: 左右分割 */}
            <view className="flex-row w-full flex-1">
                {/* Left Column: Stage List */}
                <view className="w-1/4 border-r-2 border-cyan-900 pr-4 h-full">
                    <text className="text-lg mb-2 text-cyan-400 font-bold tracking-widest">SELECT STAGE</text>
                    {/* mapメソッドを使って、ステージ名のリストからUI要素を生成します */}
                    {STAGES.map((stage, idx) => (
                        <MenuButton
                            key={stage}
                            label={stage}
                            isSelected={idx === selectedStageIndex}
                            barClass="w-full"
                            className="h-8 mb-2"
                            // フォーカスがステージ選択にない場合は半透明にして、非アクティブであることを示す
                            style={{ opacity: focusArea === 'stage' ? 1 : 0.4 }}
                        />
                    ))}
                </view>

                {/* Right Column: Filters & Ranking */}
                <view className="w-3/4 pl-8 flex-col h-full">
                    {/* Filter Area */}
                    <view className={`mb-2 p-2 bg-black border border-cyan-900 flex-shrink-0 ${focusArea === 'filter' ? 'shadow-[0_0_15px_rgba(0,255,255,0.3)]' : 'opacity-70'}`}>
                        <text className="text-xs text-cyan-600 mb-1">&gt;&gt; FILTER CONFIG ----------------------- [ READY ]</text>

                        {FILTER_KEYS.map((key, idx) => {
                            const display = getFilterDisplay(key as 'hp' | 'sp' | 'auto');
                            const isFocused = focusArea === 'filter' && filterRowIndex === idx;
                            return (
                                <view key={key} className="flex-row justify-between mb-0 items-center">
                                    <view className="flex-row text-xs">
                                        <text className={`w-28 ${isFocused ? 'text-cyan-400' : 'text-gray-500'}`}>{display.label} :</text>
                                        <text className={`${isFocused ? 'text-white bg-cyan-900' : 'text-gray-400'}`}>{display.text}</text>
                                    </view>
                                    <text className="text-gray-600 text-xs tracking-widest">{display.gauge}</text>
                                </view>
                            );
                        })}
                    </view>

                    {/* Ranking List */}
                    <view className="flex-col gap-1 flex-1">
                        {/* Header */}
                        <view className="flex-row justify-between px-2 mb-1 border-b border-gray-800 pb-1 items-end flex-shrink-0">
                            <view className="flex-row items-end">
                                <text className="text-xs text-cyan-600 w-12">RANK</text>
                                <text className="text-xs text-cyan-600 w-32">SCORE</text>
                            </view>
                            <view className="flex-row gap-4 items-end">
                                <text className="text-xs text-cyan-600" style={{ whiteSpace: 'nowrap' }}>SETTINGS</text>
                                <text className="text-xs text-cyan-600 w-28 text-right">DATE</text>
                            </view>
                        </view>

                        {filteredScores.length === 0 ? (
                            <text className="text-center text-gray-600 mt-10">NO RECORDS FOUND</text>
                        ) : (
                            filteredScores.map((score, idx) => (
                                <view key={idx} className="flex-row justify-between items-center bg-gray-900 p-2 border-l-2 border-gray-700">
                                    <view className="flex-row items-center">
                                        {/* 順位はフィルタ後のリストのインデックス + 1 で表示 */}
                                        <text className="text-lg font-bold text-cyan-500 w-12">{`${idx + 1}.`}</text>
                                        {/* toLocaleString(): 数値をカンマ区切りの文字列（例: 1,000）に変換します */}
                                        <text className="text-lg text-white w-32">{score.score.toLocaleString()}</text>
                                    </view>
                                    <view className="flex-row items-center gap-4">
                                        {/* 設定 */}
                                        <text className="text-xs text-gray-500">{`HP:${score.hp} SP:${score.sp} Auto:${score.autoFire ? 'ON' : 'OFF'}`}</text>
                                        {/* 日付 */}
                                        <text className="text-xs text-gray-500 w-28 text-right">{score.date}</text>
                                    </view>
                                </view>
                            ))
                        )}
                    </view>
                </view>
            </view>
        </view>
    );
};
