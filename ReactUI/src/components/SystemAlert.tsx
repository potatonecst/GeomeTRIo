import { useEffect, useState } from 'react';
import { useGlobals } from '@reactunity/renderer';
import { GlitchText } from './GlitchText';

interface SystemAlertProps {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
}

export const SystemAlert = ({
    title,
    message,
    confirmLabel = "YES",
    cancelLabel = "NO",
    onConfirm,
    onCancel,
    isOpen
}: SystemAlertProps) => {
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;

    // 0: Cancel (Left), 1: Confirm (Right)
    const [selection, setSelection] = useState(0);

    // 開いたときに選択肢をリセット（デフォルトは左側のCancel/NO）
    useEffect(() => {
        if (isOpen) setSelection(0);
    }, [isOpen]);

    // キーボード/コントローラー入力をハンドリング (ReactUnity用)
    useEffect(() => {
        if (!isOpen) return;

        const handleInput = (key: string) => {
            if (key === 'left' || key === 'right') {
                setSelection(prev => prev === 0 ? 1 : 0);
                interop?.PlaySound('move');
            }
            if (key === 'submit') {
                if (selection === 1) {
                    onConfirm();
                } else {
                    onCancel();
                }
            }
            if (key === 'cancel') {
                onCancel();
            }
        };

        // グローバルな入力イベントを一時的にフックする
        // ※本来はスタック管理が必要ですが、モーダルなので簡易的に上書きします
        const originalInput = (window as any).onMenuInput;
        (window as any).onMenuInput = handleInput;

        return () => {
            // クリーンアップ時に元の入力ハンドラに戻す
            (window as any).onMenuInput = originalInput;
        };
    }, [onConfirm, onCancel, selection, interop, isOpen]);

    if (!isOpen) return null;

    return (
        <view className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-95" style={{ zIndex: 999 }}>
            {/* ダイアログコンテナ */}
            <view className="relative w-[900px] bg-black p-8">
                {/* 装飾レイヤー: 枠線と発光のみを点滅させる（文字には影響させない） */}
                <view className="absolute inset-0 border-2 border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)] animate-pulse pointer-events-none" />

                {/* タイトル */}
                <view className="mb-6 items-center">
                    <GlitchText
                        text={title}
                        isAlert={true}
                        className="text-3xl font-bold text-red-500 tracking-widest"
                    />
                </view>

                {/* メッセージ */}
                <text className="mb-8 text-center text-xl text-white leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'SourceHanCodeJP' }}>
                    {message}
                </text>

                {/* ボタンエリア */}
                <view className="flex-row w-full mt-8">
                    {/* Cancel Button (Left) */}
                    <view className={`flex-1 items-center justify-center py-4 mr-4 ${selection === 0 ? 'bg-cyan-600' : 'border border-gray-600'}`}>
                        <text
                            className="text-3xl text-center"
                            style={{ color: selection === 0 ? '#ffffff' : '#9ca3af', fontFamily: 'SourceHanCodeJP' }}
                        >
                            {cancelLabel}
                        </text>
                    </view>

                    {/* Confirm Button (Right) */}
                    <view className={`flex-1 items-center justify-center py-4 ml-4 ${selection === 1 ? 'bg-red-600' : 'border border-gray-600'}`}>
                        <text
                            className="text-3xl text-center"
                            style={{ color: selection === 1 ? '#ffffff' : '#9ca3af', fontFamily: 'SourceHanCodeJP' }}
                        >
                            {confirmLabel}
                        </text>
                    </view>
                </view>

                {/* 装飾的な走査線 (画像がない場合は省略可) */}
                <view className="absolute inset-0 pointer-events-none bg-black opacity-10" />
            </view>
        </view>
    );
};