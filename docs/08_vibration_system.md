# 8. 振動フィードバックシステム (Vibration System)

ゲームパッドの振動（Haptics）を管理する `VibrationManager` の設計と実装について解説します。

## 概要

シューティングゲームにおいて、振動は「撃っている感」や「ダメージの衝撃」を伝える重要なフィードバックです。
しかし、単純に振動APIを呼ぶだけでは、以下のような問題が発生します。

1.  **振動の競合:** 被弾時の「強い振動」中に、射撃の「弱い振動」が上書きしてしまい、衝撃が弱く感じてしまう。
2.  **振動の残留:** 振動中にポーズしたりシーン遷移すると、コントローラーが振動しっぱなしになる。

これらを解決するために、**優先度付き振動マネージャー** (`VibrationManager`) を実装しました。

## VibrationManager クラス

`GameManager` オブジェクトにアタッチされ、シングルトンとして機能します。

### 主な機能

*   **優先度管理:** 現在再生中の振動よりも「優先度が高い」リクエストだけを受け付けます。低いリクエストは無視されます。
*   **自動停止:** 指定時間が経過すると自動的に振動を停止します。
*   **安全な停止:** シーン遷移時やDisable時に `InputSystem.ResetHaptics()` を呼び出し、全デバイスの振動を停止します。

### API仕様

```csharp
public void Vibrate(float low, float high, float duration, float priority = 1.0f)
```

*   **low (0.0 - 1.0):** 低周波モーターの強さ。重い衝撃（爆発、被弾）を表現します。
*   **high (0.0 - 1.0):** 高周波モーターの強さ。鋭い感触（射撃、金属音）を表現します。
*   **duration (秒):** 振動する時間。
*   **priority (float):** 優先度。数値が高いほど優先度が高く、既存の振動をキャンセルして上書きします。

### 実装例

#### 1. プレイヤーの射撃 (低優先度)
射撃は頻繁に発生するため、優先度を低く設定します。もし被弾中（高優先度）であれば、射撃の振動は無視されます。

```csharp
// 非常に弱く、一瞬だけ揺らす
// 優先度: 0.5 (低い)
VibrationManager.instance.Vibrate(0.0f, 0.1f, 0.05f, 0.5f);
```

#### 2. プレイヤーの被弾 (高優先度)
ダメージは重要なイベントなので、射撃の振動を強制的に止めて、強い衝撃を発生させます。

```csharp
// 強く、重く揺らす
// 優先度: 2.0 (高い)
VibrationManager.instance.Vibrate(0.8f, 0.5f, 0.4f, 2.0f);
```

## 内部ロジック

```csharp
public void Vibrate(..., float priority)
{
    // 設定でOFFなら無視
    if (!SettingsManager.IsVibrationEnabled()) return;

    // 現在振動中かつ、新しいリクエストの優先度が低いなら無視
    if (Time.time < vibrationEndTime && priority < currentPriority)
    {
        return; 
    }

    // 振動を適用し、終了時間を更新
    Gamepad.current.SetMotorSpeeds(low, high);
    vibrationEndTime = Time.time + duration;
    currentPriority = priority;
    
    // 停止用コルーチンを開始
    // ...
}
```

## 注意点

*   **ポーズ時の挙動:** `WaitForSeconds` ではなく `WaitForSecondsRealtime` を使用することで、`Time.timeScale = 0` (ポーズ中) でも正しく振動が停止するように対策しています。
*   **ゲームパッド未接続:** `Gamepad.current` が null の場合は安全に処理をスキップします。
*   **DualSense (PS5) の制限:** Windows/macOSにおいて、Bluetooth接続時は振動制御がサポートされていません（Unity Input Systemの仕様）。振動機能を使用する場合は**USB有線接続**が必要です。
*   **Input System設定:** `Supported Devices` リストを使用する場合、キーボードやマウスも明示的に追加しないと反応しなくなるため、基本的にはリストを空（デフォルト）にしておくことを推奨します。