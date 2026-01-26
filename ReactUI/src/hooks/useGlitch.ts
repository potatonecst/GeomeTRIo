import { useState, useEffect } from 'react';

// グリッチ演出のための座標ズレとフラグを提供するカスタムフック
// 役割: 「時々バグったように座標がずれる」という数値を計算して返すだけのアシスタント
// コンポーネントからロジックを切り離すことで、複数のコンポーネントで同じ演出を再利用できます。
export const useGlitch = () => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        // タイマーのIDを保存する変数。
        // コンポーネントが消える（アンマウント）時に、これらのIDを使ってタイマーをキャンセルしないと、
        // 存在しないコンポーネントの状態を更新しようとしてエラー（メモリリーク）になります。
        let timeoutHandle: any;
        let intervalHandle: any;
        let isMounted = true; // コンポーネントがマウントされているかどうかのフラグ

        const loop = () => {
            // 再帰的なタイムアウト（Recursive Timeout）パターン
            // forやwhileループを使わず、処理が終わったら「次の予約」を入れることで無限ループを実現します。
            // setIntervalだと間隔が一定になってしまいますが、この方法なら「ランダムな間隔」で実行できます。
            // これにより、他の処理をブロックせずに待機できます。

            // 次のグリッチ発生までの時間をランダムに決定（2秒〜5秒後）
            // Math.random() は 0以上1未満の乱数を返します。
            const nextDelay = Math.random() * 3000 + 2000;

            // setTimeout: 指定時間後に一度だけ関数を実行する
            timeoutHandle = setTimeout(() => {
                if (!isMounted) return;
                setIsGlitching(true); // グリッチ開始

                // グリッチの継続時間をランダムに決定（0.1秒〜0.3秒）
                const duration = Math.random() * 200 + 100;

                // 継続時間の間、50ミリ秒ごとに位置をランダムにずらす（振動）
                // setInterval: 指定時間ごとに繰り返し関数を実行する
                intervalHandle = setInterval(() => {
                    setOffset({
                        x: (Math.random() - 0.5) * 10, // -5px 〜 +5px の範囲でランダム
                        y: (Math.random() - 0.5) * 4   // -2px 〜 +2px の範囲でランダム
                    });
                }, 50);

                // グリッチ終了処理
                setTimeout(() => {
                    if (!isMounted) return;
                    clearInterval(intervalHandle); // 振動を止める
                    setIsGlitching(false); // グリッチ終了
                    setOffset({ x: 0, y: 0 }); // 位置を元に戻す
                    loop(); // 次のグリッチを予約（再帰呼び出し）
                }, duration);
            }, nextDelay);
        };

        loop(); // 最初のループを開始

        // クリーンアップ関数: コンポーネントが消える時にタイマーを全て解除する
        return () => {
            isMounted = false;
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
        };
    }, []); // 空の依存配列: マウント時に1回だけ実行

    return { offset, isGlitching };
};