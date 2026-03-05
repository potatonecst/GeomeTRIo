// ReactUI/src/components/Toaster.tsx

import { useState, useEffect } from 'react';
import { useGlobals } from '@reactunity/renderer';
import { useGameStatus } from '../hooks/useGameStatus';

export const Toaster = () => {
    const status = useGameStatus();
    const globals = useGlobals() as any;

    // マウント時にC#から直接データを取得する関数
    // これにより、Reactの描画開始直後から正しいメッセージを表示できます
    const getSyncData = () => {
        let message = "";
        let toastId = "";

        // statusがまだ空の場合、C#から直接取得を試みる
        if (globals.GameInterop) {
            try {
                const rawStatus = globals.GameInterop.GetInGameStatus();
                const currentStatus = JSON.parse(rawStatus);
                message = currentStatus.toastMessage || "";
                toastId = currentStatus.toastId || "";
            } catch (e) {
                console.warn("Failed to fetch sync status for Toaster", e);
            }
        }
        // statusに既に値があればそちらを優先（再レンダリング時など）
        if ((status as any).toastMessage) {
            message = (status as any).toastMessage;
            toastId = (status as any).toastId;
        }

        return { message, toastId };
    };

    // 表示データと表示フラグを管理するState
    // 初期化関数（Lazy Init）の中で getSyncData を呼ぶことで、
    // マウントされた瞬間から「メッセージがあるなら isVisible: true」の状態を作ります。
    const [toastState, setToastState] = useState(() => {
        const { message, toastId } = getSyncData();
        return {
            message: message,
            id: toastId,
            // メッセージがあれば最初から表示状態にする（フェードインさせない）
            isVisible: !!message
        };
    });

    // Unity側からのステータス更新を監視
    useEffect(() => {
        const msg = (status as any).toastMessage;
        const id = (status as any).toastId;

        if (msg) {
            // メッセージがある場合：内容を更新して表示
            setToastState({ message: msg, id: id, isVisible: true });
        } else {
            // メッセージがない場合：非表示にする（内容は保持してフェードアウトを綺麗に見せる）
            setToastState(prev => ({ ...prev, isVisible: false }));
        }
    }, [(status as any).toastId, (status as any).toastMessage]);

    // スタイル決定ロジック
    const getToastStyle = (msg: string) => {
        if (!msg) return { borderColor: 'border-cyan-500', iconColor: '#22d3ee', icon: 'res:Icons/info' };

        if (msg.includes("FAILED") || msg.includes("ERROR") || msg.includes("OFFLINE")) {
            return { borderColor: 'border-red-500', iconColor: '#ef4444', icon: 'res:Icons/triangle-alert' };
        }
        if (msg.includes("SAVED") || msg.includes("SUCCESS")) {
            return { borderColor: 'border-green-500', iconColor: '#22c55e', icon: 'res:Icons/check-circle' };
        }
        if (msg.includes("SAVING") || msg.includes("LOADING")) {
            return { borderColor: 'border-cyan-500', iconColor: '#22d3ee', icon: 'res:Icons/loader-circle', spin: true };
        }
        return { borderColor: 'border-cyan-500', iconColor: '#22d3ee', icon: 'res:Icons/info' };
    };

    const style = getToastStyle(toastState.message);

    return (
        <view
            className="absolute flex-col items-end gap-2 p-4 pointer-events-none"
            style={{ top: 0, right: 0, zIndex: 99999, width: '100%', height: '100%' }}
        >
            {/* 
                常にレンダリングしておき、opacity で表示/非表示を切り替える。
                transition-opacity duration-300 により、フラグが切り替わった時だけフェードアニメーションする。
                初期化時に isVisible=true なら、最初から opacity-100 で描画されるためチラつかない。
            */}
            <view
                className={`toast-item bg-black bg-opacity-90 border-2 ${style.borderColor} px-6 py-3 flex-row items-center shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-opacity duration-300 ${toastState.isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ minWidth: 300 }}
            >
                <view className={`mr-4 w-8 h-8 ${style.spin ? 'custom-spin' : ''}`}>
                    <image
                        // @ts-ignore
                        source={style.icon}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            unityImageTintColor: style.iconColor
                        } as any}
                    />
                </view>
                <text
                    className="text-white text-xl font-bold tracking-wider"
                    style={{ fontFamily: 'SourceHanCodeJP' }}
                >
                    {toastState.message}
                </text>
            </view>
        </view>
    );
};
