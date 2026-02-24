import { useState, useEffect, useCallback, useRef } from 'react';
import { useGlobals } from '@reactunity/renderer';
import { MenuButton } from '../components/MenuButton';
import { GlitchText } from '../components/GlitchText';
import { LicenseMenu } from './LicenseMenu';

interface SettingsProps {
    onBack: () => void;
    onSettingChange?: (key: string, value: any) => void;
}

// 設定カテゴリの定義
const CATEGORIES = ['GAMEPLAY', 'AUDIO', 'SYSTEM', 'STATS', 'ABOUT', 'RESET'];

// 設定項目の定義
type SettingItemDef = {
    id: string;
    label: string;
    type: 'slider' | 'toggle' | 'text' | 'button' | 'stat' | 'license'; // licenseを追加
    description: string;
    min?: number; // スライダー用: 最小値
    max?: number; // スライダー用: 最大値
};

// 使用可能な文字セット（アーケードスタイル用）
// アーケードゲームのハイスコア入力画面を意識し、英大文字と数字、一部の記号のみに制限しています。
const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._!?&@";

// カテゴリごとの設定項目リスト
const SETTINGS_MAP: Record<string, SettingItemDef[]> = {
    'GAMEPLAY': [
        { id: 'hp', label: 'INITIAL HP', type: 'slider', min: 1, max: 10, description: 'Set the initial Hit Points (1-10).' },
        { id: 'sp', label: 'INITIAL SP', type: 'slider', min: 0, max: 10, description: 'Set the initial Special Points (0-10).' },
        { id: 'auto_fire', label: 'AUTO FIRE', type: 'toggle', description: 'Toggle automatic firing.' },
    ],
    'AUDIO': [
        { id: 'bgm_vol', label: 'BGM VOLUME', type: 'slider', min: 0, max: 100, description: 'Adjust the volume level of background music.' },
        { id: 'se_vol', label: 'SE VOLUME', type: 'slider', min: 0, max: 100, description: 'Adjust the volume level of sound effects.' },
    ],
    'SYSTEM': [
        // Player Name: 決定キーで編集モードに入り、上下で文字変更、左右でカーソル移動
        { id: 'player_name', label: 'PLAYER NAME', type: 'text', description: 'Set your pilot name.' },
        { id: 'vibration', label: 'VIBRATION', type: 'toggle', description: 'Enable or disable controller vibration feedback.' },
    ],
    'STATS': [
        { id: 'total_games_played', label: 'GAMES PLAYED', type: 'stat', description: 'Total number of games played.' },
        { id: 'total_play_time', label: 'PLAY TIME', type: 'stat', description: 'Total time spent in game.' },
        { id: 'total_score', label: 'TOTAL SCORE', type: 'stat', description: 'Total score earned across all games.' },
        { id: 'total_sp_used', label: 'SP USED', type: 'stat', description: 'Total number of Spin Attacks activated.' },
        { id: 'total_chain_kills', label: 'CHAIN KILLS', type: 'stat', description: 'Total enemies defeated by chain explosions.' },
        { id: 'items_collected', label: 'ITEMS COLLECTED', type: 'stat', description: 'Total power-up items collected.' },
        { id: 'total_enemies_defeated', label: 'ENEMIES DEFEATED', type: 'stat', description: 'Total number of enemies destroyed.' },
        { id: 'total_shots_fired', label: 'SHOTS FIRED', type: 'stat', description: 'Total number of bullets fired.' },
        { id: 'total_damage_dealt', label: 'DAMAGE DEALT', type: 'stat', description: 'Total damage dealt to enemies.' },
        { id: 'total_damage_taken', label: 'DAMAGE TAKEN', type: 'stat', description: 'Total damage received from enemies.' },
    ],
    'ABOUT': [
        { id: 'app_version', label: 'VERSION', type: 'stat', description: 'Current application version.' },
        { id: 'developer', label: 'DEVELOPER', type: 'stat', description: 'Developed by potatonecst.' },
        { id: 'show_licenses', label: 'LICENSES', type: 'license', description: 'View third-party software licenses.' },
    ],
    'RESET': [
        { id: 'reset_defaults', label: 'RESET ALL', type: 'button', description: 'Restore all settings to default values.' }
    ]
};

// 設定画面コンポーネント
export const Settings = ({ onBack, onSettingChange }: SettingsProps) => {
    // useGlobals: ReactUnityが提供するフック。Unity側で登録したグローバルオブジェクトにアクセスできます。
    const globals = useGlobals() as any;
    const interop = globals.GameInterop;

    // 画面のフェードイン・アウト用
    const [opacity, setOpacity] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    // 選択状態の管理
    // useState: コンポーネントの状態を管理するフック。
    // 戻り値: [現在の値, 値を更新する関数] のペア。更新関数を呼ぶと再描画されます。
    // selectedCategoryIndex: 左側のカテゴリリストで現在選択されているインデックス
    // selectedItemIndex: 右側の設定項目リストで現在選択されているインデックス
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    // フォーカスエリアの状態管理 ('category': 左側のカテゴリ選択, 'item': 右側の設定項目操作)
    const [focusArea, setFocusArea] = useState<'category' | 'item'>('category');

    // カテゴリ選択ボタンの押下状態（アニメーション用）
    const [isCategoryPressed, setIsCategoryPressed] = useState(false);

    // 名前編集モードの状態
    const [isEditingName, setIsEditingName] = useState(false);
    const [editCursor, setEditCursor] = useState(0); // 現在編集中の文字位置 (0-7)

    // ライセンスメニューの表示状態
    const [showLicenseMenu, setShowLicenseMenu] = useState(false);

    // 設定値の状態管理
    // 初期値を空オブジェクトにすると、初回レンダリング時に undefined エラーになるため、デフォルト値を入れておく
    const [values, setValues] = useState<Record<string, number | boolean | string>>({
        'hp': 3,
        'sp': 3,
        'auto_fire': false,
        'bgm_vol': 80,
        'se_vol': 100,
        'player_name': 'PLAYER',
        'vibration': true,
        'total_games_played': 0,
        'total_play_time': 0,
        'total_score': 0,
        'total_sp_used': 0,
        'total_chain_kills': 0,
        'items_collected': 0,
        'total_enemies_defeated': 0,
        'total_shots_fired': 0,
        'total_damage_dealt': 0,
        'total_damage_taken': 0,
        'app_version': '0.0.0',
        'developer': 'potatonecst',
    });

    // スクロール計算用
    const [listHeight, setListHeight] = useState(0);
    // useRef: 再描画を発生させずに値を保持したり、DOM要素（ここではView）への参照を保持するために使います。
    // ref={listRef} と書くことで、その要素の実体にアクセスできるようになります。
    const listRef = useRef<any>(null);

    // 初期化時にUnityから設定値を取得
    // useEffect: 副作用（画面描画以外の処理）を実行するフック。
    // 第2引数（依存配列）が [interop] なので、interopオブジェクトが利用可能になったタイミングで1回実行されます。
    useEffect(() => {
        if (interop && typeof interop.GetSettings === 'function') {
            try {
                const json = interop.GetSettings();
                // JSON.parse(): JSON形式の文字列をJavaScriptのオブジェクトに変換します。
                // 引数: JSON文字列 (例: '{"hp": 3, "sp": 3}')
                // 戻り値: 解析されたオブジェクト
                const data = JSON.parse(json);
                // 既存の値を維持しつつ、取得したデータで上書きする（マージ）
                setValues(prev => ({ ...prev, ...data }));
            } catch (e) {
                console.error("Failed to parse settings:", e);
                // フォールバック
                setValues({
                    'hp': 3, 'sp': 3, 'auto_fire': false, 'player_name': 'PLAYER',
                    'bgm_vol': 80, 'se_vol': 100, 'vibration': true,
                    'total_score': 0, 'total_sp_used': 0, 'total_chain_kills': 0, 'items_collected': 0, 'total_damage_dealt': 0,
                    'total_games_played': 0, 'total_play_time': 0, 'total_enemies_defeated': 0, 'total_shots_fired': 0, 'total_damage_taken': 0
                });
            }
        } else {
            setValues({
                'hp': 3, 'sp': 3, 'auto_fire': false, 'player_name': 'PLAYER',
                'bgm_vol': 80, 'se_vol': 100, 'vibration': true
            });
        }

        // バージョン情報の取得
        if (interop && typeof interop.GetAppVersion === 'function') {
            const ver = interop.GetAppVersion();
            setValues(prev => ({ ...prev, 'app_version': ver }));
        }
    }, [interop]);

    // リストの高さ計測
    useEffect(() => {
        if (listRef.current) {
            // 要素の高さを取得します。
            // clientHeight: DOM標準のプロパティ
            // layout.height: Unity UI Toolkit独自のプロパティ
            // || (論理和): 左側が0やnullなら、右側の値を採用します。
            const h = listRef.current.clientHeight || listRef.current.layout?.height || 0;
            if (h > 0) setListHeight(h);
        }
    });

    // フェードイン・アウト制御
    // isExitingフラグが変わった時に実行される
    useEffect(() => {
        if (isExiting) {
            setOpacity(0);
            // setTimeout: 指定した時間（ミリ秒）後に、関数を一度だけ実行するタイマーメソッド。
            // 引数: (実行する関数, 遅延時間ms)
            // ここでは300ms後に保存処理と画面遷移を実行するように予約しています。
            const timer = setTimeout(() => {
                interop?.SaveSettings(); // 画面を抜けるタイミングで一括保存
                onBack();
            }, 300);
            return () => clearTimeout(timer);
        } else {
            // 開始時は少し待ってから不透明にする（フェードイン）
            const timer = setTimeout(() => setOpacity(1), 50);
            return () => clearTimeout(timer);
        }
    }, [isExiting, onBack]);

    // 現在選択中のカテゴリ名と、そのカテゴリに含まれるアイテムリストを取得
    const currentCategory = CATEGORIES[selectedCategoryIndex];
    const currentItems = SETTINGS_MAP[currentCategory];

    // Unity側に変更を通知するヘルパー
    // 共通関数として定義し、changeValueやuseEffectから呼び出せるようにします。
    // useCallback: 関数定義を「メモ化（キャッシュ）」して再利用するフックです。
    // 依存配列（[interop]）が変わらない限り、同じ関数インスタンスを使い回すことで、
    // この関数を受け取る子コンポーネントやuseEffectの無駄な再実行を防ぎます。
    const updateUnity = useCallback((key: string, val: any) => {
        if (interop && typeof interop.UpdateSetting === 'function') {
            // interop.UpdateSetting: C#側のメソッドを呼び出し、設定値を即時反映（プレビュー）させます。
            // 引数: key (設定項目ID文字列), val (設定値の文字列表現)
            interop.UpdateSetting(key, val.toString());
            // 親コンポーネントに変更を通知（CRTフィルタの即時反映用）
            onSettingChange?.(key, val);
        }
    }, [interop, onSettingChange]);

    // 設定をリセットする関数
    // useCallbackでメモ化し、不要な再生成を防ぎます。
    const handleReset = useCallback(() => {
        const defaults = {
            'hp': 3,
            'sp': 3,
            'auto_fire': false,
            'bgm_vol': 80,
            'se_vol': 100,
            'player_name': 'PLAYER',
            'vibration': true,
            // 統計情報はリセット対象外とする
        };
        // 既存の値を維持しつつ、デフォルト値で上書きする（統計情報を消さないため）
        setValues(prev => ({ ...prev, ...defaults }));

        // Object.entries: オブジェクトを [key, value] のペアの配列に変換します。 (例: {a:1} -> [['a', 1]])
        // forEach: 配列の各要素に対して、指定した関数を順番に実行します。
        // ここでは、デフォルト値のペアを一つずつ取り出して、Unity側に通知しています。
        Object.entries(defaults).forEach(([key, val]) => {
            updateUnity(key, val);
        });

        interop?.PlaySound('submit');
    }, [updateUnity, interop]);

    // 設定値を変更する関数
    // useCallback: 関数をメモ化して再生成を防ぎます。
    const changeValue = useCallback((itemId: string, delta: number) => {
        // setValuesに関数を渡すことで、現在の状態(prev)をもとに新しい状態を計算します。
        setValues(prev => {
            const currentVal = prev[itemId];
            // Array.find: 配列の中から、条件（テスト関数）に一致する最初の要素を探して返します。
            // 引数: テスト関数 (要素 => 条件)
            const itemDef = currentItems.find(i => i.id === itemId);

            if (!itemDef) return prev;

            let nextVal = currentVal;

            if (itemDef.type === 'slider') {
                // スライダーの場合: min〜maxの間で増減
                const min = itemDef.min ?? 0;
                const max = itemDef.max ?? 100;
                // 範囲が狭い(20以下)なら1刻み、広いなら10刻み
                // HP(1-10)のような狭い範囲は1ずつ細かく調整したいですが、
                // 音量(0-100)のような広い範囲を1ずつ動かすのは大変なので、10ずつ大きく動かせるようにしています。
                const step = (max - min) <= 20 ? 1 : 10;

                const numVal = currentVal as number;
                // Math.max(a, b): aとbのうち大きい方を返します。 (下限の制限に使用)
                // Math.min(a, b): aとbのうち小さい方を返します。 (上限の制限に使用)
                // これらを組み合わせることで、値を min 〜 max の範囲内に収めます。
                nextVal = Math.max(min, Math.min(max, numVal + delta * step));
            } else if (itemDef.type === 'toggle') {
                // トグルの場合: 左右どちらかを押したら反転
                nextVal = !(currentVal as boolean);
            } else if (itemDef.type === 'text') {
                // テキストの場合: ここでは何もしない（編集モードで処理する）
                // ただし、編集モードに入っていない状態で左右を押した場合は何もしないか、
                // あるいはここで編集モードに入るトリガーにしても良いが、今回は決定キーで入る仕様とする。
                return prev;
            } else if (itemDef.type === 'button') {
                return prev;
            } else if (itemDef.type === 'stat') {
                return prev;
            } else if (itemDef.type === 'license') {
                return prev;
            }

            // 値が変わっていない場合は何もしない（音も鳴らさない）
            if (nextVal === currentVal) return prev;

            // 値が変わった場合のみ音を鳴らす
            interop?.PlaySound('move');

            // 変更をUnity側に通知（プレビュー用）
            updateUnity(itemId, nextVal);
            // スプレッド構文 (...prev): 現在の状態をコピーし、変更点だけ上書きした新しいオブジェクトを返します。
            return { ...prev, [itemId]: nextVal };
        });
    }, [currentItems, updateUnity, interop]); // interopを依存に追加

    // 入力ハンドリング
    // Unityからの入力イベントを受け取るための設定
    // useEffect: コンポーネントがマウントされた時、または依存配列（第2引数）の変数が変わった時に実行されます。
    // ここでは、Unity(C#)から呼ばれるグローバル関数を、このコンポーネント専用の処理で上書きしています。
    useEffect(() => {
        // ライセンスメニュー表示中は、Settings側の入力ハンドラを登録しない
        // (LicenseMenuコンポーネントが独自のハンドラを登録するため)
        if (showLicenseMenu) return;

        // キーボード入力（文字）のハンドリング
        (window as any).onTextInput = (char: string) => {
            // 名前編集モードでなければ無視
            if (!isEditingName) return;

            // 入力可能な文字かチェック（英数字とハイフン、スペース）
            const upperChar = char.toUpperCase();
            // String.includes: 文字列の中に、指定した文字列が含まれているかどうかを判定します。
            // 戻り値: 含まれていれば true, なければ false
            if (!CHAR_SET.includes(upperChar)) return;

            setValues(prev => {
                const currentName = prev['player_name'] as string;
                const chars = currentName.split('');
                // カーソル位置に文字を挿入（上書きではなく挿入）
                // Array.splice(開始位置, 削除数, 追加要素...): 配列の内容を変更します。
                // ここでは editCursor の位置に、0文字削除して、upperChar を挿入しています。
                chars.splice(editCursor, 0, upperChar);
                // 最大8文字で切り取る
                const newName = chars.join('').slice(0, 8);
                // ここではUnityへの保存はせず、決定時か終了時にまとめて行う
                return { ...prev, 'player_name': newName };
            });

            // 入力したらカーソルを右に進める（最大8文字）
            // Math.minを使って、カーソル位置が 7 を超えないように制限します。
            setEditCursor(prev => Math.min(7, prev + 1));
            interop?.PlaySound('move');
        };

        // メニュー操作（上下左右、決定、キャンセル）のハンドリング
        // (window as any): TypeScriptの型チェックを回避して、windowオブジェクトに独自のプロパティを追加するためのキャストです。
        // UnityのReactInputBridgeから、この関数が直接呼び出されます。
        (window as any).onMenuInput = (event: string) => {
            if (isExiting) return;

            const playerName = (values['player_name'] as string) || "PLAYER";

            // --- 名前編集モード中の操作 ---
            if (isEditingName) {
                // バックスペース（削除）操作
                if (event === 'backspace') {
                    // カーソルが末尾（新規入力位置）にあるか、文字の上にあるかで挙動を変える
                    if (editCursor >= playerName.length && playerName.length < 8) {
                        // 末尾にいる場合：一つ前の文字を削除してカーソルを戻す (Backspace挙動)
                        if (editCursor > 0) {
                            setValues(prev => {
                                const chars = (prev['player_name'] as string).split('');
                                // Array.splice: 配列から要素を削除します。
                                // ここでは (editCursor - 1) の位置から 1文字削除しています。
                                chars.splice(editCursor - 1, 1);
                                return { ...prev, 'player_name': chars.join('') };
                            });
                            setEditCursor(prev => Math.max(0, prev - 1));
                            interop?.PlaySound('cancel');
                        }
                    } else {
                        // 文字の上にいる場合：その文字を削除して詰める (Delete挙動)
                        setValues(prev => {
                            const chars = (prev['player_name'] as string).split('');
                            // ここでは editCursor の位置（現在の文字）から 1文字削除しています。
                            chars.splice(editCursor, 1);
                            return { ...prev, 'player_name': chars.join('') };
                        });
                        interop?.PlaySound('cancel'); // 削除音
                    }
                    return;
                }
                // 決定またはキャンセルで編集終了
                if (event === 'submit' || event === 'cancel') {
                    // 編集終了
                    setIsEditingName(false);
                    interop?.PlaySound('submit');
                    // 値の更新のみ通知（保存は画面終了時）
                    updateUnity('player_name', values['player_name']);
                    return;
                }
                // カーソル移動（左）
                if (event === 'left') {
                    setEditCursor(prev => Math.max(0, prev - 1));
                    interop?.PlaySound('move');
                }
                // カーソル移動（右）
                if (event === 'right') {
                    // カーソル移動は現在の文字数まで（末尾への追加用）に制限。ただし最大文字数(8)の場合は7まで
                    setEditCursor(prev => Math.min(playerName.length, 7, prev + 1));
                    interop?.PlaySound('move');
                }
                // 文字変更（ドラムロール）
                if (event === 'up' || event === 'down') {
                    // 文字を変更 (ドラムロール)
                    setValues(prev => {
                        const currentName = prev['player_name'] as string;
                        const chars = currentName.split('');

                        // カーソル位置の文字を取得（なければ新規入力扱い）
                        const currentChar = chars[editCursor];
                        let charIndex = -1;
                        if (currentChar) {
                            // String.indexOf: 文字列（または配列）の中で、指定した値が最初に見つかった位置（インデックス）を返します。
                            // 見つからなかった場合は -1 を返します。
                            charIndex = CHAR_SET.indexOf(currentChar);
                        }

                        // 新規入力の場合は 'A' (0) から開始するためのインデックス調整
                        const baseIndex = charIndex === -1 ? -1 : charIndex;
                        const direction = event === 'down' ? 1 : -1;

                        let nextIndex;
                        if (baseIndex === -1) {
                            // 新規: downなら最初('A')、upなら最後
                            nextIndex = direction === 1 ? 0 : CHAR_SET.length - 1;
                        } else {
                            nextIndex = (baseIndex + direction + CHAR_SET.length) % CHAR_SET.length;
                        }

                        chars[editCursor] = CHAR_SET[nextIndex];
                        const newName = chars.join('').slice(0, 8);
                        // updateUnity('player_name', newName);
                        return { ...prev, 'player_name': newName };
                    });
                    interop?.PlaySound('move');
                }
                return;
            }

            // --- 通常モード ---
            // キャンセルボタン（Bボタン/Esc）
            if (event === 'cancel') {
                interop?.PlaySound('cancel');
                if (focusArea === 'item') {
                    // アイテム選択からカテゴリ選択へ戻る
                    setFocusArea('category');
                } else {
                    // 設定画面から抜ける
                    setIsExiting(true);
                }
                return;
            }

            if (focusArea === 'category') {
                // --- カテゴリ選択モード ---
                if (event === 'up') {
                    interop?.PlaySound('move');
                    setSelectedCategoryIndex(prev => (prev - 1 + CATEGORIES.length) % CATEGORIES.length);
                    setSelectedItemIndex(0); // カテゴリを変えたらアイテム選択位置をリセット
                }
                if (event === 'down') {
                    interop?.PlaySound('move');
                    setSelectedCategoryIndex(prev => (prev + 1) % CATEGORIES.length);
                    setSelectedItemIndex(0);
                }
                if (event === 'right' || event === 'submit') {
                    interop?.PlaySound('submit');
                    setIsCategoryPressed(true);
                    setTimeout(() => setIsCategoryPressed(false), 100); // 一瞬だけ光らせる
                    setFocusArea('item'); // 右側のアイテム選択へ移動
                }
            } else {
                // --- アイテム操作モード ---
                if (event === 'up') {
                    interop?.PlaySound('move');
                    setSelectedItemIndex(prev => (prev - 1 + currentItems.length) % currentItems.length);
                }
                if (event === 'down') {
                    interop?.PlaySound('move');
                    setSelectedItemIndex(prev => (prev + 1) % currentItems.length);
                }
                if (event === 'left') {
                    // 値を減らす / トグル切り替え
                    const item = currentItems[selectedItemIndex];
                    if (item.type !== 'text' && item.type !== 'stat' && item.type !== 'button') {
                        changeValue(item.id, -1);
                    }
                }
                if (event === 'right') {
                    // 値を増やす / トグル切り替え
                    const item = currentItems[selectedItemIndex];
                    if (item.type !== 'text' && item.type !== 'stat' && item.type !== 'button') {
                        changeValue(item.id, 1);
                    }
                }
                if (event === 'submit') {
                    const item = currentItems[selectedItemIndex];
                    if (item.type === 'text') {
                        // テキスト項目の場合は編集モードへ移行
                        interop?.PlaySound('submit');
                        setIsEditingName(true);
                        setEditCursor(0);
                    } else if (item.type === 'button' || item.type === 'license') {
                        // ボタン項目の場合はアクションを実行
                        if (item.id === 'reset_defaults') {
                            handleReset();
                        }
                        if (item.id === 'show_licenses') {
                            interop?.PlaySound('submit');
                            setShowLicenseMenu(true);
                        }
                    }
                }
            }
        };

        // クリーンアップ関数
        // コンポーネントがアンマウントされる（画面から消える）時や、useEffectが再実行される直前に呼ばれます。
        // グローバル関数を空の関数で上書きして、古い処理が残らないようにします（メモリリーク防止）。
        return () => { (window as any).onMenuInput = () => { }; (window as any).onTextInput = () => { }; };
    }, [focusArea, selectedCategoryIndex, selectedItemIndex, currentItems, isExiting, interop, changeValue, isEditingName, editCursor, values, handleReset, showLicenseMenu]);

    // ゲージ表示ヘルパー
    const renderGauge = (value: number, max: number) => {
        // 音量などはゲージ表示
        const total = 10;
        // HP=1の時にバーが0にならないよう、min基準ではなく0基準の割合で計算する
        // Math.round: 数値を四捨五入して最も近い整数にします。
        // Math.max / Math.min: 計算結果が 0〜total の範囲に収まるように制限（クランプ）します。
        // (value / max): 現在値の割合（0.0〜1.0）。これに total(10) を掛けて、バーの本数に変換します。
        const filled = Math.max(0, Math.min(total, Math.round((value / max) * total)));
        // String.repeat(count): 文字列を指定した回数だけ繰り返した新しい文字列を返します。
        const bar = '='.repeat(filled) + '-'.repeat(total - filled);
        // valueがundefinedの場合のガードを追加
        return { bar: `[${bar}]`, value: (value ?? 0).toString() };
    };

    // 時間フォーマットヘルパー (秒 -> HH:MM:SS)
    // プレイ時間（秒）を受け取り、時:分:秒の形式の文字列に変換します。
    const formatTime = (seconds: number) => {
        // Math.floor: 数値の小数点以下を切り捨てて、最大の整数を返します。
        const h = Math.floor(seconds / 3600); // 3600秒 = 1時間
        const m = Math.floor((seconds % 3600) / 60); // 1時間で割り切れなかった残りを60で割って「分」を算出
        const s = Math.floor(seconds % 60); // 60で割った余りが「秒」

        // String.padStart(targetLength, padString): 文字列が指定の長さになるまで、先頭に指定した文字を埋めます。
        // ここでは2桁になるように '0' を埋めています（例: 5 -> "05"）。
        // これにより、"1:5:9" ではなく "01:05:09" のように整った形式で表示されます。
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // 現在の説明文を取得
    // カテゴリ選択中はカテゴリの説明、アイテム選択中はアイテムの説明を表示
    let currentDescription = '';
    if (focusArea === 'item') {
        currentDescription = currentItems[selectedItemIndex].description;
    } else {
        // カテゴリ選択時の説明
        currentDescription = currentCategory === 'STATS'
            ? "View play statistics."
            : `Configure ${currentCategory.toLowerCase()} settings.`;
    }

    // スクロール位置の計算
    // アイテムの高さ: h-24(96px) + mb-4(16px) = 112px
    const ITEM_HEIGHT = 112;
    // 表示領域の高さ（計測できない場合は仮の値600pxを使用）
    const visibleHeight = listHeight || 600;
    // 下部に余白を追加して、一番下の項目が選択された時に余裕を持って表示されるようにする
    const bottomPadding = 40;
    // 選択項目が上から2番目に来るようにスクロール
    // Math.max(0, ...): 計算結果がマイナスにならないように、0と比較して大きい方を使います。
    // (全アイテムの高さ + 余白) - 表示領域の高さ = スクロール可能な最大量
    const maxScroll = Math.max(0, (currentItems.length * ITEM_HEIGHT) + bottomPadding - visibleHeight);
    // Math.min(..., maxScroll): スクロール量が最大値を超えないように制限します。
    // (selectedItemIndex - 1): 選択中のアイテムが一番上ではなく、少し下（2番目）に来るようにオフセットさせています。
    const targetScroll = Math.max(0, Math.min((selectedItemIndex - 1) * ITEM_HEIGHT, maxScroll));

    // ライセンスメニュー表示中はそちらを表示
    if (showLicenseMenu) {
        return (
            <LicenseMenu onBack={() => setShowLicenseMenu(false)} />
        );
    }

    return (
        <view className="flex-col w-full h-full p-12 text-white transition-opacity duration-300" style={{ opacity, fontFamily: 'SourceHanCodeJP' }}>
            {/* Header */}
            <view className="flex-row justify-between items-end mb-4 border-b-2 border-cyan-900 pb-2 w-full">
                {/* whitespace-nowrapを追加して、折り返しを防止 */}
                <GlitchText text="SETTINGS" className="text-8xl font-bold text-white tracking-tighter leading-none whitespace-nowrap" />
                <text className="text-3xl text-cyan-600">SYSTEM CONFIGURATION</text>
            </view>

            <view className="flex-row w-full flex-1">
                {/* Left Column: Categories */}
                <view className="w-1/4 border-r-2 border-cyan-900 pr-4 h-full">
                    <text className="text-4xl mb-6 text-cyan-400 font-bold tracking-widest">CATEGORY</text>
                    {CATEGORIES.map((cat, idx) => (
                        <MenuButton
                            key={cat}
                            label={cat}
                            isSelected={idx === selectedCategoryIndex}
                            // カテゴリ選択エリアにフォーカスがあり、かつ決定ボタンが押された瞬間に光らせる
                            isPressed={isCategoryPressed && idx === selectedCategoryIndex}
                            barClass="w-full"
                            className="h-24 mb-6"
                            style={{ opacity: focusArea === 'category' ? 1 : 0.4 }}
                        />
                    ))}
                </view>

                {/* Right Column: Items */}
                <view className="w-3/4 pl-8 flex-col h-full">
                    <text className="text-5xl mb-6 text-cyan-400 font-bold tracking-widest">
                        {currentCategory === 'STATS' ? 'STATISTICS' : (currentCategory === 'ABOUT' ? 'SYSTEM INFORMATION' : 'CONFIGURATION')}
                    </text>

                    {/* flex-1 で残りの高さを確保し、項目リストを表示 */}
                    {/* gap-2 を削除し、個別のマージンで制御することでレイアウト崩れを防ぐ */}
                    <view
                        ref={listRef}
                        className={`flex-col flex-1 overflow-hidden relative ${focusArea === 'item' ? 'opacity-100' : 'opacity-60'}`}
                    >
                        <view className="flex-col w-full transition-transform duration-200 ease-out" style={{ transform: `translateY(${targetScroll}px)` }}>
                            {currentItems.map((item, idx) => {
                                const isSelected = idx === selectedItemIndex;
                                const val = values[item.id];

                                // 値の表示形式を決定
                                let displayValue = '';
                                let displayBar = '';
                                if (item.type === 'slider') {
                                    const gauge = renderGauge(val as number, item.max ?? 100);
                                    displayBar = gauge.bar;
                                    displayValue = gauge.value;
                                } else if (item.type === 'toggle') {
                                    displayValue = val ? 'ON' : 'OFF';
                                } else if (item.type === 'button') {
                                    displayValue = 'EXECUTE';
                                } else if (item.type === 'license') {
                                    displayValue = 'VIEW >';
                                } else if (item.type === 'stat') {
                                    // 統計情報の表示処理
                                    if (typeof val === 'string') {
                                        // 文字列の場合はそのまま表示 (ABOUTカテゴリ用)
                                        displayValue = val;
                                    } else if (item.id === 'total_play_time') {
                                        // プレイ時間は秒数で保存されているため、HH:MM:SS形式に変換して表示
                                        displayValue = formatTime((val as number) || 0);
                                    } else {
                                        // その他の数値（撃破数など）は、3桁区切りのカンマを入れて読みやすくする
                                        // Number.toLocaleString(): 数値をロケール（地域設定）に合わせた形式の文字列に変換します。
                                        // デフォルトでは3桁区切りのカンマが入ります（例: 1000 -> "1,000"）。
                                        displayValue = ((val as number) || 0).toLocaleString();
                                    }
                                } else {
                                    displayValue = val as string;
                                }

                                // 名前入力の表示用コンポーネント
                                const renderNameInput = () => {
                                    const strVal = (val as string) || ''; // undefined/null対策
                                    return (
                                        <view className="flex-row">
                                            {Array.from({ length: 8 }).map((_, i) => {
                                                // 文字があればそれを、なければアンダースコアを表示
                                                const char = strVal[i] || '_';
                                                const isPlaceholder = i >= strVal.length;
                                                const isCursor = isEditingName && isSelected && i === editCursor;

                                                return (
                                                    <text
                                                        key={i}
                                                        className={`font-mono w-12 text-center text-4xl ${isCursor ? 'text-black bg-cyan-400' : (isPlaceholder ? 'text-gray-600' : 'text-yellow-400')}`}
                                                        style={{ fontFamily: 'SourceHanCodeJP' }}
                                                    >
                                                        {char}
                                                    </text>
                                                );
                                            })}
                                        </view>
                                    );
                                };

                                return (
                                    <view
                                        key={item.id}
                                        // flex-shrink-0: 親の高さが足りなくても縮小させない（表示崩れ防止）
                                        // py-4: 上下均等な余白（さらに広げる）
                                        // mb-4: 下マージン（さらに広げる）
                                        // pl-5: 左側のボーダー装飾と文字の間隔を広めに確保
                                        // h-24: 高さを固定してスクロール計算を安定させる
                                        className={`flex-row justify-between items-center pl-5 pr-3 mb-4 h-24 flex-shrink-0 border-l-4 transition-all duration-200 ${isSelected && focusArea === 'item' ? 'bg-gray-800 border-cyan-400' : 'border-transparent'}`}
                                    >
                                        <text className={`text-4xl ${isSelected && focusArea === 'item' ? 'text-white' : 'text-gray-400'}`}>{item.label}</text>

                                        <view className="flex-row items-center">
                                            {/* 左右の矢印（選択中のみ表示） */}
                                            <text className={`mr-4 text-cyan-400 text-4xl ${isSelected && focusArea === 'item' && item.type !== 'text' && item.type !== 'button' && item.type !== 'stat' && item.type !== 'license' ? 'opacity-100' : 'opacity-0'}`}>◀</text>

                                            {/* 値の表示 */}
                                            <view className={`flex-row items-center ${item.type === 'slider' ? 'w-[36rem] justify-end' : (item.type === 'stat' || item.type === 'license' ? 'w-80 justify-end' : 'w-80 justify-center')}`}>
                                                {item.type === 'text' ? renderNameInput() : (
                                                    <>
                                                        {displayBar && (
                                                            <text className="text-yellow-400 text-4xl" style={{ fontFamily: 'SourceHanCodeJP' }}>{displayBar}</text>
                                                        )}
                                                        <text className={`${item.type === 'button' || item.type === 'stat' || item.type === 'license' ? 'w-auto' : 'w-24 text-right'} text-yellow-400 text-4xl`} style={{ fontFamily: 'SourceHanCodeJP' }}>
                                                            {displayValue}
                                                        </text>
                                                    </>
                                                )}
                                            </view>

                                            <text className={`ml-4 text-cyan-400 text-4xl ${isSelected && focusArea === 'item' && item.type !== 'text' && item.type !== 'button' && item.type !== 'stat' && item.type !== 'license' ? 'opacity-100' : 'opacity-0'}`}>▶</text>
                                        </view>
                                    </view>
                                );
                            })}
                        </view>
                    </view>

                    {/* Description Terminal */}
                    {/* absolute配置をやめ、flexレイアウトの一部として下部に配置することで重なりを防ぐ */}
                    <view className="mt-8 p-4 border border-cyan-900 bg-black bg-opacity-80">
                        <text className="text-cyan-600 text-3xl mb-2">&gt;&gt; INFO_PANEL</text>
                        {isEditingName ? (
                            <view className="flex-col">
                                <view className="flex-row mb-2">
                                    <text className="text-cyan-400 text-3xl">[UP/DOWN]</text>
                                    <text className="text-gray-300 text-3xl mr-8">:CHANGE CHAR</text>
                                    <text className="text-cyan-400 text-3xl">[LEFT/RIGHT]</text>
                                    <text className="text-gray-300 text-3xl">:MOVE CURSOR</text>
                                </view>
                                <view className="flex-row">
                                    <text className="text-cyan-400 text-3xl">[SOUTH]</text>
                                    <text className="text-gray-300 text-3xl mr-8">:OK</text>
                                    <text className="text-cyan-400 text-3xl">[EAST]</text>
                                    <text className="text-gray-300 text-3xl mr-8">:CANCEL</text>
                                    <text className="text-cyan-400 text-3xl">[WEST]</text>
                                    <text className="text-gray-300 text-3xl">:DELETE</text>
                                </view>
                            </view>
                        ) : (
                            <text className="text-gray-300 text-3xl">&gt;&gt; {currentDescription}</text>
                        )}
                    </view>
                </view>
            </view>
        </view>
    );
};