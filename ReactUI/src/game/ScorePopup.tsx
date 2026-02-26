import { useState, useEffect, useRef } from 'react';
import { useGameStatus } from '../hooks/useGameStatus';

// スコア獲得時にポップアップ表示を行うコンポーネント
// 役割: 敵撃破時などに "+100" のような数値を画面上に浮かび上がらせる演出を担当します。
export const ScorePopup = () => {
    // useGameStatusの型定義が更新されていない可能性があるため、anyにキャストして新しいフィールドにアクセスします
    // Unity側から送られてくる scoreEventAmount, scoreEventLabel, scoreEventTime を監視します。
    const status = useGameStatus() as any;

    // 表示中のポップアップを管理するState
    // 複数のポップアップが同時に存在できるように配列で管理します。
    const [popups, setPopups] = useState<{ id: number, amount: number, label: string, opacity: number, y: number }[]>([]);

    // 前回のイベント時刻を記録して、重複処理を防ぐ
    // Unity側はポーリングで同じ値を返し続けるため、時刻が変わった時だけ処理する必要があります。
    // useRef: 再描画されても値を保持し続ける「箱」です。
    // useStateと違い、書き換えても再描画が発生しないため、ロジック内部の管理用変数に適しています。
    // ここでは「画面表示には関係ないが、ロジック判定に必要な前回の値」を保持するために使っています。
    const lastEventTimeRef = useRef(0);
    const nextIdRef = useRef(0);

    useEffect(() => {
        // 新しいイベントが発生したかチェック (タイムスタンプで比較)
        // Unity側でイベント発生時に Time.unscaledTime を更新しているため、
        // 前回記録した時刻よりも新しい時刻であれば「新規イベント」とみなします。
        if (status.scoreEventTime > lastEventTimeRef.current && status.scoreEventAmount > 0) {
            lastEventTimeRef.current = status.scoreEventTime;

            const id = nextIdRef.current++;
            const newPopup = {
                id,
                amount: status.scoreEventAmount,
                label: status.scoreEventLabel,
                opacity: 0, // 最初は透明（フェードイン用）
                y: 20       // 少し下から出現（上昇アニメーション用）
            };

            // 以前は配列に追加していましたが、連なって表示されるのを防ぐため、
            // 常に最新の1つだけを表示するように置き換えます。
            setPopups([newPopup]);

            // アニメーション開始 (フェードイン + 上昇)
            // requestAnimationFrameを使うことで、DOM追加の次のフレームでスタイルを変更し、CSS transitionを発火させます。
            // Reactの状態更新は非同期ですが、requestAnimationFrameでラップすることで
            // 「要素の描画」→「スタイルの変更（アニメーション開始）」の順序を確実にします。
            requestAnimationFrame(() => {
                setPopups(prev => prev.map(p => p.id === id ? { ...p, opacity: 1, y: 0 } : p));
            });

            // 消去タイマー
            setTimeout(() => {
                // フェードアウト開始
                setPopups(prev => prev.map(p => p.id === id ? { ...p, opacity: 0, y: -20 } : p));

                // アニメーション完了後にリストから削除
                setTimeout(() => {
                    setPopups(prev => prev.filter(p => p.id !== id));
                }, 300);
            }, 2000); // 2秒間表示
        }
    }, [status.scoreEventTime, status.scoreEventAmount, status.scoreEventLabel]);

    return (
        // 画面右上（スコア表示の下あたり）に配置
        // HUDのサイドバー内(right-0)に重なるように配置
        // pointer-events-none: ゲームプレイの邪魔にならないようにクリック判定を無効化
        <view className="absolute top-40 right-8 flex-col items-end pointer-events-none">
            {popups.map(popup => (
                <view
                    key={popup.id}
                    className="flex-row items-center mb-1 transition-all duration-300 ease-out"
                    style={{ opacity: popup.opacity, transform: `translateY(${popup.y}px)` }}
                >
                    {/* ラベルがある場合のみ表示 (例: "FORMATION BONUS") */}
                    {popup.label && (
                        <text className="text-cyan-400 text-2xl font-mono mr-2" style={{ textShadow: '0 0 5px cyan', fontFamily: 'SourceHanCodeJP' }}>
                            {popup.label}
                        </text>
                    )}
                    <text className="text-yellow-400 text-4xl" style={{ textShadow: '0 0 5px yellow', fontFamily: 'SourceHanCodeJP' }}>
                        +{popup.amount}
                    </text>
                </view>
            ))}
        </view>
    );
};
