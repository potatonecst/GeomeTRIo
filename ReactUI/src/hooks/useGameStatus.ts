import { useState, useEffect } from 'react';
import { useGlobals } from '@reactunity/renderer';

// ゲームのステータス（スコア、HP、SP）を取得するカスタムフック
// 役割: Unity側から提供される GetInGameStatus メソッドを定期的に呼び出し、最新のゲーム状態を返します。
export const useGameStatus = () => {
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;

    // 初期値
    const [status, setStatus] = useState({
        score: 0,
        hp: 3,
        sp: 3,
        maxHp: 3,
        maxSp: 3,
        isGameOver: false,
        isNewHighScore: false,
        isPaused: false
    });

    useEffect(() => {
        let handle: number;

        // 毎フレーム実行されるループ
        const loop = () => {
            if (interop && typeof interop.GetInGameStatus === 'function') {
                try {
                    // UnityからJSON文字列を取得してパース
                    const json = interop.GetInGameStatus();
                    const data = JSON.parse(json);
                    // 取得したデータで上書きするが、欠損している場合はデフォルト値を維持するためにマージする
                    setStatus(prev => ({ ...prev, ...data }));
                } catch (e) {
                    // エラーは無視（ゲームループを止めないため）
                }
            }
            // requestAnimationFrame: 次の描画フレームで再度この関数を実行するように予約します。
            // これにより、UnityのUpdateループに近い頻度でステータスを更新できます。
            handle = requestAnimationFrame(loop);
        };

        handle = requestAnimationFrame(loop);

        // クリーンアップ: コンポーネントがアンマウントされる時にループを停止します。
        return () => cancelAnimationFrame(handle);
    }, [interop]);

    return status;
};