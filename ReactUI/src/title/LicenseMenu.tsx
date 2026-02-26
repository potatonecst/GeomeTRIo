import { useState, useEffect, useMemo, useRef } from 'react';
import { useGlobals } from '@reactunity/renderer';
import { MenuButton } from '../components/MenuButton';
import { GlitchText } from '../components/GlitchText';
import unityLicenses from '../data/unity-licenses.json';
import webLicensesData from '../data/web-licenses.json';

// Webライセンスデータの整形（オブジェクト形式の場合は配列に変換）
// Array.isArray: 引数が配列かどうかを判定します。
// Object.entries: オブジェクトを [key, value] のペアの配列に変換します。
const webLicenses = Array.isArray(webLicensesData)
    ? webLicensesData
    : Object.entries(webLicensesData).map(([key, value]) => ({
        name: key,
        ...(value as any)
    }));

interface LicenseMenuProps {
    onBack: () => void;
}

export const LicenseMenu = ({ onBack }: LicenseMenuProps) => {
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;

    // 表示するライセンスデータの統合
    // useMemo: 計算結果をキャッシュ（メモ化）するフックです。
    // 依存配列（[]）が空なので、コンポーネントの初回レンダリング時に1回だけ実行されます。
    const allLicenses = useMemo(() => {
        // UnityとWebのライセンスを結合し、名前の昇順（A-Z）でソートする
        // ... (スプレッド構文): 配列の中身を展開して、新しい配列に結合します。
        // sort: 配列を並べ替えます。
        // localeCompare: 文字列同士を比較します。toLowerCase()で小文字化することで、大文字小文字を区別せずに並べ替えます。
        return [...unityLicenses, ...webLicenses].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }, []);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [focusArea, setFocusArea] = useState<'list' | 'content'>('list');
    const [scrollPos, setScrollPos] = useState(0);
    const [opacity, setOpacity] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 右側詳細エリアのスクロール計算用
    const [contentHeight, setContentHeight] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    // 左側リストエリアの高さ
    const [leftListHeight, setLeftListHeight] = useState(0);

    const containerRef = useRef<any>(null);
    const textContentRef = useRef<any>(null);
    const leftListRef = useRef<any>(null);

    const currentLicense = allLicenses[selectedIndex];

    // 高さ取得のヘルパー関数
    // 複数のプロパティをチェックして、有効な高さを取得する
    const getHeight = (ref: any) => {
        if (!ref) return 0;

        try {
            // ReactUnity (UI Toolkit / uGUI) properties
            // UnityのUIシステムでは、レイアウト計算が完了するまで高さが取得できない場合があるため、
            // プロパティアクセスで例外が発生する可能性があるためtry-catchで囲む
            if (ref.Layout?.height > 0) return ref.Layout.height;
            if (ref.layout?.height > 0) return ref.layout.height;
            if (ref.scrollHeight > 0) return ref.scrollHeight;
            if (ref.clientHeight > 0) return ref.clientHeight;

            // Deep access
            if (ref.Element?.layout?.height > 0) return ref.Element.layout.height;
            if (ref.RectTransform?.rect?.height > 0) return ref.RectTransform.rect.height;
        } catch (e) {
            // ignore errors
        }
        return 0;
    };

    // ライセンス変更時にリセット＆高さ計測
    useEffect(() => {
        setScrollPos(0);
        setIsLoading(true);
        setContentHeight(0);
        setContainerHeight(0);

        // setInterval: 指定した時間（ミリ秒）ごとに処理を繰り返し実行します。
        // ここでは50msごとに高さをチェックし、レイアウト計算が完了するのを待ちます（ポーリング）。
        // UnityのUI Toolkitはレイアウト計算が非同期で行われるため、即座には高さが取得できない場合があります。
        const startTime = Date.now();
        const intervalId = setInterval(() => {
            let cHeight = 0;
            let vHeight = 0;
            let lHeight = 0;

            if (containerRef.current) {
                vHeight = getHeight(containerRef.current);
            }
            if (textContentRef.current) {
                cHeight = getHeight(textContentRef.current);
            }
            if (leftListRef.current) {
                lHeight = getHeight(leftListRef.current);
            }

            // 値が取得できたらStateを更新
            if (cHeight > 0) setContentHeight(cHeight);
            if (vHeight > 0) setContainerHeight(vHeight);
            if (lHeight > 0) setLeftListHeight(lHeight);

            // 両方の高さが取得できたらローディング解除（操作可能にする）
            if (cHeight > 0 && vHeight > 0) {
                setIsLoading(false);
                clearInterval(intervalId); // 計測終了（タイマーを止める）
            }

            // タイムアウト (2秒) で計測終了
            // 万が一高さが取れなくても、無限ループにならないように強制終了します。
            if (Date.now() - startTime > 2000) {
                clearInterval(intervalId);
                setIsLoading(false);
            }
        }, 50);

        return () => clearInterval(intervalId);
    }, [currentLicense]);

    // フェードイン・アウト
    useEffect(() => {
        if (isExiting) {
            setOpacity(0);
            const timer = setTimeout(onBack, 300);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setOpacity(1), 50);
            return () => clearTimeout(timer);
        }
    }, [isExiting, onBack]);

    // 入力ハンドリング
    useEffect(() => {
        // Unityからの入力を受け取るグローバル関数を定義
        // Settings画面など他の画面のハンドラを上書きして、この画面専用の操作を有効にします。
        (window as any).onMenuInput = (event: string) => {
            if (isExiting) return;

            if (event === 'cancel') {
                interop?.PlaySound('cancel');
                if (focusArea === 'content') {
                    setFocusArea('list'); // リストに戻る
                } else {
                    setIsExiting(true); // 戻る
                }
                return;
            }

            // 左側のリスト選択モード
            if (focusArea === 'list') {
                // リスト操作
                if (event === 'up') {
                    interop?.PlaySound('move');
                    setSelectedIndex(prev => (prev - 1 + allLicenses.length) % allLicenses.length);
                }
                if (event === 'down') {
                    interop?.PlaySound('move');
                    setSelectedIndex(prev => (prev + 1) % allLicenses.length);
                }
                if (event === 'right' || event === 'submit') {
                    interop?.PlaySound('submit');
                    setFocusArea('content'); // 詳細エリアへフォーカス移動
                }
            } else {
                // 右側の詳細（本文）スクロールモード
                // コンテンツ操作（スクロール）
                if (isLoading) return; // ロード中は操作不可

                if (event === 'up') {
                    // スクロールアップ (値を減らす)
                    setScrollPos(prev => Math.max(0, prev - 50));
                }
                if (event === 'down') {
                    // スクロールダウン (値を増やす)
                    setScrollPos(prev => {
                        // Refから最新の高さを取得（Stateは更新が遅れる場合があるため）
                        let cHeight = contentHeight || getHeight(textContentRef.current);
                        let vHeight = containerHeight || getHeight(containerRef.current);

                        // レイアウト情報が取れない場合のフォールバック
                        if (cHeight <= 0) {
                            const text = currentLicense?.licenseText || "";
                            // 改行コードで分割して行数をカウント
                            const newLines = text.split('\n').length;
                            // 行数から高さを概算します。
                            // 36px: text-2xl(24px) * leading-normal(1.5) = 36px (1行の高さ)
                            // 1.1: 自動折り返しによる行数増加を見越した係数（余裕を持たせる）
                            cHeight = (newLines * 36) * 1.1;
                        }
                        if (vHeight <= 0) vHeight = 600;

                        // コンテナのパディングを削除したため、vHeightそのものが表示領域
                        const visibleHeight = vHeight;

                        // コンテンツが表示領域に収まっている場合はスクロールさせない
                        if (cHeight <= visibleHeight) return 0;

                        // スクロール上限の計算
                        // コンテンツ全体の高さから、表示されている部分の高さを引いた残りが、スクロールできる最大量です。
                        // シンプルに「コンテンツ高さ - 表示領域」とする
                        const maxScroll = cHeight - visibleHeight;

                        return Math.min(maxScroll, prev + 50);
                    });
                }
                if (event === 'left') {
                    interop?.PlaySound('cancel');
                    setFocusArea('list');
                }
            }
        };

        // クリーンアップ: 画面を抜ける時に入力を無効化
        return () => { (window as any).onMenuInput = () => { }; };
    }, [focusArea, selectedIndex, allLicenses.length, isExiting, interop, contentHeight, containerHeight, isLoading]);

    return (
        <view className="flex-col w-full h-full p-12 text-white transition-opacity duration-300" style={{ opacity, fontFamily: 'SourceHanCodeJP' }}>
            {/* Header */}
            <view className="flex-row justify-between items-end mb-4 border-b-2 border-cyan-900 pb-2 w-full">
                <GlitchText text="LICENSES" className="text-8xl font-bold text-white tracking-tighter leading-none whitespace-nowrap" />
                <text className="text-3xl text-cyan-600">OPEN SOURCE SOFTWARE</text>
            </view>

            <view className="flex-row w-full flex-1 overflow-hidden">
                {/* Left Column: List */}
                <view className="w-[450px] border-r-2 border-cyan-900 pr-4 h-full flex-col flex-shrink-0">
                    <text className="text-4xl mb-6 text-cyan-400 font-bold tracking-widest">LIBRARIES</text>
                    {/* リスト表示（簡易的なスクロール対応：選択項目が常に表示されるようにsliceする等の工夫も可能だが、今回は全リスト表示前提） */}
                    {/* 項目数が多い場合はここもスクロールが必要になるが、今回は簡易実装として overflow-hidden で切り捨てる */}
                    <view ref={leftListRef} className="flex-col flex-1 overflow-hidden relative">
                        <view className="flex-col" style={{
                            // アイテム高さ: h-24(96px) + mb-6(24px) = 120px
                            // スクロール位置の計算ロジック:
                            // 1. 基本位置: (selectedIndex - 2) * 120
                            //    選択中の項目がリストの「上から3番目」に来るようにスクロールさせます。
                            // 2. 上限設定: (allLicenses.length * 120) - (leftListHeight || 600)
                            //    リストの末尾が画面の下端より上にいかない（下に空白ができない）ように制限します。
                            // 3. 下限設定: Math.max(0, ...) でマイナス（上方向への行き過ぎ）を防ぎます。
                            transform: `translateY(${Math.max(0, Math.min((selectedIndex - 2) * 120, (allLicenses.length * 120) - (leftListHeight || 600)))}px)`,
                            transition: 'transform 0.2s ease-out'
                        }}>
                            {allLicenses.map((l, idx) => (
                                <MenuButton
                                    key={idx}
                                    label={l.name}
                                    isSelected={idx === selectedIndex}
                                    isPressed={false}
                                    barClass="w-full"
                                    className="h-24 mb-6 w-full flex-shrink-0"
                                    style={{ opacity: focusArea === 'list' ? 1 : 0.5 }}
                                />
                            ))}
                        </view>
                    </view>
                </view>

                {/* Right Column: Content */}
                <view className={`flex-1 pl-8 flex-col h-full ${focusArea === 'content' ? 'opacity-100' : 'opacity-70'}`}>
                    <text className="text-5xl mb-2 text-cyan-400 font-bold tracking-widest">{currentLicense?.name}</text>
                    <view className="flex-row mb-6 text-gray-400 text-2xl">
                        <text className="mr-4">VER: {currentLicense?.version || 'N/A'}</text>
                        <text>LICENSE: {currentLicense?.licenses}</text>
                    </view>

                    {/* Scrollable Area */}
                    <view
                        ref={containerRef}
                        className="flex-1 bg-gray-900 border border-gray-700 overflow-hidden relative flex-col"
                    >
                        {/* ローディングオーバーレイ */}
                        {isLoading && (
                            <view className="absolute inset-0 bg-gray-900 items-center justify-center" style={{ zIndex: 50 }}>
                                <text className="text-cyan-400 text-2xl animate-pulse tracking-widest">CALCULATING_LAYOUT...</text>
                            </view>
                        )}

                        {/* スクロールバー（必要な場合のみ表示） */}
                        {!isLoading && contentHeight > containerHeight && (
                            <view className="absolute right-1 top-1 bottom-1 w-1 bg-gray-800">
                                <view
                                    className="w-full bg-cyan-600"
                                    style={{
                                        // バーの高さ: (表示領域 / 全体の高さ) * 100%。
                                        // コンテンツが長いほどバーは短くなります。ただし、視認性を保つため最小10%を確保します。
                                        height: `${Math.max(10, (containerHeight / contentHeight) * 100)}%`,
                                        // バーの位置: (現在のスクロール量 / 全体の高さ) * 100%。
                                        // コンテンツのスクロール位置（割合）に合わせてバーを移動させます。
                                        top: `${(scrollPos / contentHeight) * 100}%`
                                    }}
                                />
                            </view>
                        )}

                        {/* 本文 */}
                        <view
                            ref={textContentRef}
                            // 下の行を見るためにコンテンツを上に移動させる（プラス）。
                            // position: absolute を指定して、親コンテナの高さ制限を受けずに本来の高さを確保する
                            style={{
                                transform: `translateY(${scrollPos}px)`,
                                transition: 'transform 0.1s linear',
                                flexDirection: 'column',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                padding: 16, // p-4相当のパディング
                                opacity: isLoading ? 0 : 1
                            }}
                        >
                            <view className="flex-col">
                                <text
                                    className="text-white text-2xl leading-normal whitespace-pre-wrap"
                                    style={{ flexShrink: 0, alignSelf: 'flex-start' }}
                                >
                                    {currentLicense?.licenseText?.trim() || "No license text available."}
                                </text>
                            </view>
                        </view>
                    </view>

                    {/* Footer Guide */}
                    <view className="mt-2 flex-row justify-end">
                        {focusArea === 'content' ? (
                            <view className="flex-row">
                                <text className="text-cyan-400 text-2xl animate-pulse mr-8">[UP/DOWN] SCROLL</text>
                                <text className="text-cyan-400 text-2xl animate-pulse">[LEFT/ESC] BACK</text>
                            </view>
                        ) : (
                            <text className="text-gray-500 text-2xl">[RIGHT/ENTER] VIEW DETAILS</text>
                        )}
                    </view>
                </view>
            </view>
        </view>
    );
};
