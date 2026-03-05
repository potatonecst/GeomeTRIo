import { useState, useEffect } from 'react';
import { useGameStatus } from '../hooks/useGameStatus';

export const OfflineIndicator = ({ className }: { className?: string }) => {
    const status = useGameStatus();
    const isOffline = (status as any).isOffline;
    const [isVisible, setIsVisible] = useState(!!isOffline);

    useEffect(() => {
        setIsVisible(!!isOffline);
    }, [isOffline]);

    return (
        <view className={`flex-row items-center bg-black bg-opacity-80 border border-red-500 px-3 py-1 rounded shadow-[0_0_10px_rgba(255,0,0,0.3)] transition-opacity duration-500 pointer-events-none ${isVisible ? 'opacity-100' : 'opacity-0'} ${className || ''}`}>
            {/* アイコン: 既存の警告アイコンを使用 */}
            <view className="w-4 h-4 mr-2">
                <image
                    // @ts-ignore
                    source="res:Icons/cloud-off"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        unityImageTintColor: '#ef4444' // red-500
                    } as any}
                />
            </view>
            <text
                className="text-red-500 text-sm font-bold tracking-wider animate-pulse"
                style={{ fontFamily: 'SourceHanCodeJP' }}
            >
                OFFLINE MODE
            </text>
        </view>
    );
};
