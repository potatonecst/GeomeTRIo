# 2. 自機制御システムとInput System

自機（Player）の移動制御、Input Systemの設定、そしてスクリプト内で使用されている多数の関数群について網羅的に解説します。

## Input System の活用

従来の `Input.GetKey(KeyCode.Space)` ではなく、Unityの新しい **Input System** パッケージを使用しています。

### メリット
1. **マルチデバイス対応:** キーボード、ゲームパッド、タッチ操作を統一的に扱えます。
2. **イベント駆動:** 「ボタンが押された瞬間」に特定のメソッドを呼び出す仕組み（Action）が作りやすいです。「毎フレームチェックする」必要がなくなります。

### Actionの設定 (PlayerInputActions)
- **Move:** Action Type = `Value`, Control Type = `Vector2` (WASD, 左スティック)
- **Fire:** Action Type = `Button` (Space, 南ボタン)
- **Switch:** Action Type = `Button` (Q/E, L/Rボタン)

### 実装例

```csharp
// Input Systemによって生成されたC#クラスを使用
private PlayerInputActions inputActions;

private void OnEnable()
{
    inputActions = new PlayerInputActions();
    inputActions.Player.Enable();
    
    // "Fire" アクションが実行された（performed）時に Fire() メソッドを呼ぶ
    // += は「イベントに登録する」という意味です。
    inputActions.Player.Fire.performed += context => Fire();
    
    // 移動入力はUpdate内で毎フレーム取得する（イベントではない）
}
```

## 発射点の切り替えロジック

このゲームの肝である「三角形の頂点を切り替える」処理は、数学的な回転ではなく、**配列のインデックス操作**として考えるとシンプルになります。

### 考え方
自機には3つの発射点（Transform）があります。

1. Top (前方) - Index 0
2. BottomRight (右後方) - Index 1
3. BottomLeft (左後方) - Index 2

「右に切り替え」ボタンを押すとインデックスを `+1`、「左に切り替え」で `-1` します。

```csharp
[SerializeField] private Transform[] firePoints; // 3つの発射点
private int currentFirePointIndex = 0;

public void SwitchFirePoint(int direction) // directionは +1 か -1
{
    // インデックスを更新
    currentFirePointIndex += direction;

    // 配列の範囲外に出ないようにループさせる処理（重要！）
    if (currentFirePointIndex >= firePoints.Length) 
        currentFirePointIndex = 0;
    else if (currentFirePointIndex < 0) 
        currentFirePointIndex = firePoints.Length - 1;
        
    // 視覚的なフィードバック（現在の発射点を光らせるなど）
    UpdateIndicator();
}
```

## 弾の発射とQuaternion

弾を発射する際、`Instantiate` メソッドを使います。

```csharp
Instantiate(bulletPrefab, firePoints[currentFirePointIndex].position, firePoints[currentFirePointIndex].rotation);
```

ここで重要なのは、**「発射点の `rotation`（向き）をそのまま弾に渡している」** 点です。これにより、三角形の斜めの辺から発射される弾は、自動的にその角度で飛んでいきます。計算で角度を求める必要がなく、UnityのTransform機能を活かした効率的な実装です。

## バースト射撃の実装 (Burst Fire)

手動連射時の爽快感を高めるため、1回の入力で複数発の弾を発射する「バースト射撃」をコルーチンで実装しています。

```csharp
private IEnumerator BurstFireCoroutine()
{
    int count = burstCount; // 現在のレベルに応じた発射数
    for (int i = 0; i < count; i++)
    {
        FireSingleShot(); // 1発発射
        // 次の弾までの短い待機時間
        if (i < count - 1) yield return new WaitForSeconds(0.06f);
    }
}
```

*   **仕組み:** `StartCoroutine` で非同期に処理を開始し、`WaitForSeconds` で弾と弾の間隔（0.06秒）を作っています。
*   **メリット:** `Update` ループで時間を管理するよりもコードが簡潔になり、発射リズムの調整も容易です。
*   **切り替え:** `SettingsManager.IsAutofireEnabled()` をチェックし、オート連射時はこのコルーチンを使わず、単純な連射速度アップ（Rapid Fire）に切り替えています。

## 5. 状態異常とデバフ (Status Effects)

敵の攻撃により、プレイヤー機体に一時的な機能制限（デバフ）が発生することがあります。

### 武器ジャミング (Weapon Jam)
*   **効果:** 一定時間、射撃が不可能になります。射撃ボタンを押すと「カチカチ」という空撃ち音が鳴ります。
*   **発生条件:** ジャマー敵のパルス（PulseExplosion）に接触する。
*   **実装:**
    *   `isWeaponJammed` フラグとコルーチン `WeaponJamCoroutine` で管理。
    *   `ApplyWeaponJam(duration)` メソッドで開始し、指定時間後に自動解除されます。
    *   HUDのWeaponステータスが `"JAMMED"` に書き換わります。

## 6. パワーアップとレベル管理 (Leveling System)

プレイヤーの強化は `weaponLevel` (1〜10) で管理され、経験値アイテム取得時に `AddExp(amount)` が呼ばれて判定されます。

### 経験値テーブル
配列 `nextLevelExp` で各レベルに必要な累積経験値を定義しています。

```csharp
// Lv1->2: 5, Lv2->3: 10 ... Lv9->10: 150
private int[] nextLevelExp = new int[] { 5, 10, 20, 35, 50, 70, 90, 120, 150, 9999 };
```

### レベルごとの強化ロジック
`LevelUp()` メソッド内の `switch` 文や `if` 分岐により、レベルに応じて以下のパラメータが更新されます。

1.  **連射性能 (Lv.2, 5, 8):**
    *   **オート時:** `fireRate` が短縮される (0.1s -> 0.08s -> 0.06s -> 0.05s)。
    *   **手動時:** `burstCount` が増加する (1 -> 2 -> 3 -> 4発)。
2.  **攻撃力 (Lv.3, 6, 9):**
    *   弾の `damage` が増加する (1 -> 2 -> 3 -> 4)。
3.  **攻撃範囲 (Lv.4, 7, 10):**
    *   `sidePairCount` が増加し、斜め方向への弾（Way弾）が追加される。
    *   **3-WAY** (Lv.4) -> **5-WAY** (Lv.7) -> **7-WAY** (Lv.10)。
    *   サイド弾は中央弾よりも威力と透明度を下げてバランスを取っている。
