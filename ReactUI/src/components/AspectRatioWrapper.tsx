import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useGlobals } from '@reactunity/renderer';

// ゲームの基準となる解像度（フルHD）
const TARGET_WIDTH = 1920;
const TARGET_HEIGHT = 1080;

// 画面サイズに合わせて、子要素をスケーリングして16:9の比率で画面中央に表示するラッパーコンポーネント
// children: ラップする子要素（ゲーム画面やタイトル画面のコンテンツ）
// onReady: レイアウト計算が完了し、表示準備が整った時に呼ばれるコールバック関数
export const AspectRatioWrapper = ({ children, onReady }: { children: ReactNode, onReady?: () => void }) => {
    // useGlobals: ReactUnityのグローバルオブジェクトにアクセスするためのフック
    // C#側の GameInterop クラスのメソッドを呼び出すために使用します
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;

    // スケーリング倍率を管理するState
    const [scale, setScale] = useState(1);
    // 画面が表示可能かどうかのフラグ
    // 初期化中やサイズ計算前は false にしておき、不完全な状態での描画（FOUC）を防ぎます
    const [isVisible, setIsVisible] = useState(false);

    // 画面サイズを監視し、レイアウトを更新する副作用フック
    useEffect(() => {
        const updateLayout = () => {
            let w = 1920;
            let h = 1080;

            // Unity側から画面サイズを取得します
            // window.innerWidth は ReactUnity 環境では更新が遅れる場合があるため、
            // C# (ReactInputBridge) 経由で正確なサイズを取得します
            if (interop && typeof interop.GetScreenSize === 'function') {
                try {
                    const jsonStr = interop.GetScreenSize();
                    // Unity側のレイアウト準備ができていない場合（空のJSONが返る）は処理を中断して待機します
                    // これにより、一瞬大きく表示されてしまう現象（FOUC）を防ぎます
                    // FOUC (Flash of Unstyled Content): スタイル適用前の崩れた画面が一瞬表示される現象。
                    // ここでは「サイズ計算前の画面」が表示されるのを防いでいます。
                    if (jsonStr === "{}") return;

                    const size = JSON.parse(jsonStr);
                    w = size.x;
                    h = size.y;
                } catch (e) {
                    console.error("Failed to parse screen size", e);
                }
            } else {
                // interopがまだ準備できていない場合も待機します
                // Unityからの正しいサイズが届くまで描画を行いません
                return;
            }

            // 画面に収まる最大の倍率を計算 (Fit)
            // 横幅基準の倍率と高さ基準の倍率のうち、小さい方（より厳しい制約）を採用することで、
            // 画面からはみ出さずに全体を表示します
            const r = Math.min(w / TARGET_WIDTH, h / TARGET_HEIGHT);

            setScale(r);
            setIsVisible(true);
        };

        // ResizeObserverが使えない環境のため、windowリサイズイベントとポーリング（定期実行）で監視します
        // setInterval: 指定時間ごとに処理を繰り返すタイマー。
        // Unity側で画面サイズが変わった場合（ウィンドウサイズ変更など）に追従するために監視します。
        window.addEventListener('resize', updateLayout);
        const intervalId = setInterval(updateLayout, 500); // 0.5秒ごとにチェック

        // 初回実行
        updateLayout();

        // クリーンアップ関数: コンポーネントがアンマウントされる時にイベントリスナーとタイマーを解除します
        return () => {
            window.removeEventListener('resize', updateLayout);
            clearInterval(intervalId);
        };
    }, [interop]);

    // 表示準備が完了したら親コンポーネントに通知する処理
    // useRef: 再描画されても値を保持し続ける変数を作成します（ここでは通知済みフラグとして使用）
    const onReadyCalled = useRef(false);
    useEffect(() => {
        // 表示可能になり(isVisible)、コールバック(onReady)があり、まだ通知していない場合
        if (isVisible && onReady && !onReadyCalled.current) {
            onReady(); // 親に通知（BGM再生などのトリガーになります）
            onReadyCalled.current = true; // 通知済みフラグを立てる
        }
    }, [isVisible, onReady]);

    return (
        // 外側コンテナ: 画面全体を覆うコンテナ
        <view
            id="aspect-ratio-wrapper"
            className="w-full h-full relative"
            // 準備中(isVisible=false)は黒背景で隠し、準備完了したら透明にして下のゲーム画面を見せます
            style={{ backgroundColor: isVisible ? 'transparent' : 'black', overflow: 'hidden' }}
        >
            {/* 
                内側コンテナ: 実際のゲーム画面（1920x1080固定）
                position: 'absolute' と left/top: 50% で画面中央に配置し、
                ネガティブマージン（自身のサイズの半分を引く）で中心を合わせます。
                transform: scale() で、中心を基準に拡大縮小します。
            */}
            <view
                style={{
                    width: TARGET_WIDTH,
                    height: TARGET_HEIGHT,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    marginLeft: -TARGET_WIDTH / 2,
                    marginTop: -TARGET_HEIGHT / 2,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center',
                    opacity: isVisible ? 1 : 0, // 準備ができるまで透明にして隠す
                }}
            >
                {/* isVisibleがtrueになるまで子要素をレンダリングしないことで、
                    アニメーションやタイマーが裏で進行してしまうのを防ぎます */}
                {isVisible && children}
            </view>
        </view>
    );
};
