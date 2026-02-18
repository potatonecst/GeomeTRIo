using UnityEngine;
using UnityEngine.InputSystem;
using System.Collections;

/// <summary>
/// ゲームパッドの振動を管理するクラス。
/// 優先度付きで振動リクエストを処理します。
/// </summary>
public class VibrationManager : MonoBehaviour
{
    /// <summary>
    /// シングルトンインスタンス。どこからでも VibrationManager.instance でアクセス可能です。
    /// </summary>
    public static VibrationManager instance;

    /// <summary>
    /// 現在実行中の振動停止用コルーチン。新しい振動が始まった場合にキャンセルするために保持します。
    /// </summary>
    private Coroutine currentCoroutine;

    /// <summary>
    /// 現在の振動が終了する予定の時刻（Time.time基準）。
    /// </summary>
    private float vibrationEndTime;

    /// <summary>現在再生中の振動の優先度。より高い優先度の振動リクエストが来た場合のみ上書きされます。</summary>
    private float currentPriority;

    void Awake()
    {
        if (instance == null) instance = this;
        else Destroy(gameObject);
    }

    /// <summary>
    /// 振動を開始します。
    /// 指定された優先度に基づいて、現在の振動を上書きするかどうかを判断します。
    /// </summary>
    /// <param name="low">低周波モーター（重い振動）の強さ 0.0-1.0</param>
    /// <param name="high">高周波モーター（軽い振動）の強さ 0.0-1.0</param>
    /// <param name="duration">振動する時間（秒）</param>
    /// <param name="priority">優先度（高いほど上書きされにくい）</param>
    public void Vibrate(float low, float high, float duration, float priority = 1.0f)
    {
        // 設定で振動がOFFなら何もしない
        if (!SettingsManager.IsVibrationEnabled()) return;

        // ゲームパッドが接続されていない場合は何もしない
        // Gamepad.current: 現在アクティブなゲームパッドを取得する Input System の静的プロパティ。
        // 接続されていない場合は null になるため、必ずチェックが必要です。
        if (Gamepad.current == null) return;

        // 現在再生中の振動があり、かつ新しい振動の優先度が低い場合は、新しい振動を無視する
        // （例：被弾中の強い振動を、射撃の弱い振動で上書きしないようにする）
        if (Time.time < vibrationEndTime && priority < currentPriority)
        {
            return;
        }

        // 既存の停止処理があればキャンセル
        if (currentCoroutine != null) StopCoroutine(currentCoroutine);

        // 振動適用
        // SetMotorSpeeds(low, high): ゲームパッドのモーターを回転させます。
        // low: 低周波（重い振動）、high: 高周波（軽い振動）。0.0〜1.0で強さを指定。
        Gamepad.current.SetMotorSpeeds(low, high);

        // 状態更新
        vibrationEndTime = Time.time + duration;
        currentPriority = priority;

        // 指定時間後に停止するコルーチンを開始
        currentCoroutine = StartCoroutine(StopVibrationAfterTime(duration));
    }

    /// <summary>
    /// 現在再生中の全ての振動を即座に停止します。
    /// シーン遷移の直前などに呼び出します。
    /// </summary>
    public void StopAllVibrations()
    {
        if (currentCoroutine != null)
        {
            StopCoroutine(currentCoroutine);
            currentCoroutine = null;
        }

        // 全デバイスの振動をリセット（停止）する
        // InputSystem.ResetHaptics(): 接続されている全てのデバイスの振動を強制停止します。
        InputSystem.ResetHaptics();

        vibrationEndTime = 0;
        currentPriority = 0;
    }

    /// <summary>
    /// 指定時間経過後に振動を停止するコルーチン。
    /// </summary>
    /// <param name="duration">待機する時間（秒）</param>
    private IEnumerator StopVibrationAfterTime(float duration)
    {
        // ポーズ中（Time.timeScale = 0）でも振動が止まるように、実時間（Realtime）を使用する
        // WaitForSecondsRealtime: ゲーム内時間の停止（ポーズ）の影響を受けずに待機します。
        // これを使わないと、振動中にポーズした際、振動が止まらなくなるバグが発生します。
        yield return new WaitForSecondsRealtime(duration);

        if (Gamepad.current != null)
        {
            Gamepad.current.SetMotorSpeeds(0, 0);
        }
        currentPriority = 0; // 優先度リセット
    }

    /// <summary>
    /// オブジェクトが無効化された時（ゲーム終了時など）に呼び出されます。
    /// </summary>
    private void OnDisable()
    {
        // ゲーム終了時には必ず振動を止める
        InputSystem.ResetHaptics();
    }
}