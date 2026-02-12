import { useState, useEffect, useCallback, useRef } from 'react';

// グリッチ演出のための座標ズレとフラグを提供するカスタムフック
// 役割: 「時々バグったように座標がずれる」という数値を計算して返すだけのアシスタント
// 引数 options.auto: 
//   true (デフォルト): ランダムな間隔で自動的にグリッチが発生します（タイトルロゴなど）。
//   false: 自動では発生せず、trigger() 関数を呼んだ時だけ発生します（演出用）。
export const useGlitch = (options: { auto?: boolean } = { auto: true }) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isGlitching, setIsGlitching] = useState(false);

    // アンマウント判定とタイマー管理のためのRef
    const isMountedRef = useRef(true);
    const intervalHandleRef = useRef<any>(null);
    const timeoutHandleRef = useRef<any>(null);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
            if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);
            if (timeoutHandleRef.current) clearTimeout(timeoutHandleRef.current);
        };
    }, []);

    // 外部からグリッチを手動で発生させる関数。
    // 演出などで、特定のタイミングで画面を揺らしたい場合に使用します。
    // 既にグリッチ中の場合は、現在のグリッチをキャンセルして新しい設定で上書きします。
    //
    // @param duration - グリッチが続く時間（ミリ秒）。デフォルトは200ms。
    // @param intensity - 揺れの強さ（ピクセル）。値が大きいほど激しく揺れます。デフォルトは10px。
    const trigger = useCallback((duration: number = 200, intensity: number = 10) => {
        if (!isMountedRef.current) return;

        // 既存のグリッチがあればキャンセルして上書き
        if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);
        if (timeoutHandleRef.current) clearTimeout(timeoutHandleRef.current);

        setIsGlitching(true);

        intervalHandleRef.current = setInterval(() => {
            if (!isMountedRef.current) return;
            setOffset({
                x: (Math.random() - 0.5) * intensity,
                y: (Math.random() - 0.5) * (intensity * 0.4)
            });
        }, 50);

        timeoutHandleRef.current = setTimeout(() => {
            if (!isMountedRef.current) return;
            if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);
            setIsGlitching(false);
            setOffset({ x: 0, y: 0 });
        }, duration);
    }, []);

    useEffect(() => {
        if (!options.auto) return;

        let loopTimeout: any;

        const loop = () => {
            // 再帰的なタイムアウト（Recursive Timeout）パターン
            // forやwhileループを使わず、処理が終わったら「次の予約」を入れることで無限ループを実現します。
            // setIntervalだと間隔が一定になってしまいますが、この方法なら「ランダムな間隔」で実行できます。
            // これにより、他の処理をブロックせずに待機できます。

            // 次のグリッチ発生までの時間をランダムに決定（2秒〜5秒後）
            // Math.random() は 0以上1未満の乱数を返します。
            const nextDelay = Math.random() * 3000 + 2000;

            // setTimeout: 指定時間後に一度だけ関数を実行する
            loopTimeout = setTimeout(() => {
                if (!isMountedRef.current) return;

                // 手動トリガーと競合する可能性がありますが、自動モードではループを優先します
                if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);

                setIsGlitching(true); // グリッチ開始

                // グリッチの継続時間をランダムに決定（0.1秒〜0.3秒）
                const duration = Math.random() * 200 + 100;

                // 継続時間の間、50ミリ秒ごとに位置をランダムにずらす（振動）
                // setInterval: 指定時間ごとに繰り返し関数を実行する
                intervalHandleRef.current = setInterval(() => {
                    if (!isMountedRef.current) return;
                    setOffset({
                        x: (Math.random() - 0.5) * 10, // -5px 〜 +5px の範囲でランダム
                        y: (Math.random() - 0.5) * 4   // -2px 〜 +2px の範囲でランダム
                    });
                }, 50);

                // グリッチ終了処理
                timeoutHandleRef.current = setTimeout(() => {
                    if (!isMountedRef.current) return;
                    if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);
                    setIsGlitching(false); // グリッチ終了
                    setOffset({ x: 0, y: 0 }); // 位置を元に戻す
                    loop(); // 次のグリッチを予約（再帰呼び出し）
                }, duration);
            }, nextDelay);
        };

        loop(); // 最初のループを開始

        // クリーンアップ関数: コンポーネントが消える時にタイマーを全て解除する
        return () => {
            clearTimeout(loopTimeout);
            if (timeoutHandleRef.current) clearTimeout(timeoutHandleRef.current);
            if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);
        };
    }, [options.auto]); // 空の依存配列: マウント時に1回だけ実行

    return { offset, isGlitching, trigger };
};