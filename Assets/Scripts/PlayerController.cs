using UnityEngine;
using UnityEngine.InputSystem;
using System.Collections;
using System.Collections.Generic;

/// <summary>
/// プレイヤー（自機）の操作、移動、攻撃、ダメージ処理を管理するクラス。
/// UnityのInput Systemを使用して入力を受け取ります。
/// </summary>
public class PlayerController : MonoBehaviour, IDamageable
{
    // シングルトンインスタンス (UIからの参照用)
    public static PlayerController instance;

    //自動生成されたPlayerInputActionsクラスの変数
    private PlayerInputActions playerInputActions;

    //Spriteの表示・非表示を管理
    private SpriteRenderer spriteRenderer;

    //Rigidbodyを保存する変数
    private Rigidbody2D rb;

    //移動に関する変数
    public float moveSpeed = 20f; //publicにするとUnityエディタのInspectorから調整できる

    //HPとダメージに関する変数
    public float invincibilityDuration = 1.5f; //無敵時間
    private Coroutine activeInvincibilityCoroutine; //コルーチン格納変数
    private bool isInvincible = false; //無敵状態判定

    //射撃に関する変数
    public GameObject bulletPrefab;
    public List<Transform> firePoints; //3つの発射点を格納するリスト
    private int currentFirePointIndex = 1; //現在選択中の発射点の番号（0=左、1=中、2=右）
    public RectTransform firePointMarker; //発射点のUIマーカーのRectTransformを格納する変数
    public float fireRate = 0.1f; //連射間隔
    private float nextFireTime = 0; //次に弾を発射できる時間
    private bool fireButtonHeld = false; //発射ボタンが押され続けているか

    //スピンアタックに関する変数
    public float spinAttackDuration = 2f; //持続時間
    public float spinAttackFireRate = 0.1f; //連射間隔
    public float spinSpeed = 720f; //回転速度
    private bool isSpinning = false; //スピンアタック判定

    // パワーアップ関連
    public int weaponLevel = 1; // 現在の武器レベル (1~10)
    private int currentExp = 0; // 現在の経験値
    // レベルアップに必要な経験値テーブル (Lv1->2: 5個, ... Lv9->10: 150個)
    private int[] nextLevelExp = new int[] { 5, 10, 20, 35, 50, 70, 90, 120, 150, 9999 };
    private const int MAX_LEVEL = 10;
    private int burstCount = 1; // バースト数（一度の発射で撃つ弾数）

    // デバフ（状態異常）関連
    private bool isWeaponJammed = false; // 武器ジャミング状態（射撃不可）
    private Coroutine jamCoroutine;

    /// <summary>
    /// スクリプトのインスタンスがロードされた時に呼び出されます。
    /// コンポーネントの取得など、初期化処理を行います。
    /// </summary>
    private void Awake()
    {
        if (instance == null) instance = this;
        //自身のRigidbody2Dを取得
        rb = GetComponent<Rigidbody2D>();
    }

    /// <summary>
    /// このオブジェクトが有効になったときに呼ばれます。
    /// Input Systemのイベント登録を行います。
    /// </summary>
    private void OnEnable()
    {
        // InputActionsの初期化とイベント登録はここで行う
        if (playerInputActions == null)
        {
            playerInputActions = new PlayerInputActions();

            // Fireアクションの登録（startedとcanceledを使用）
            playerInputActions.Player.Fire.started += OnFireButtonPressed;
            playerInputActions.Player.Fire.canceled += OnFireButtonReleased;

            // 他のアクションの登録(xxアクションが実行されたら、yy関数を呼び出すよう登録)
            playerInputActions.Player.SwitchWeapon.performed += SwitchWeapon;
            playerInputActions.Player.SpinAttack.performed += PerformSpinAttack;
        }

        //Player Actionマップを有効にする
        playerInputActions.Player.Enable();
    }

    /// <summary>
    /// このオブジェクトが無効になったときに呼ばれます。
    /// Input Systemのイベント解除を行い、メモリリークを防ぎます。
    /// </summary>
    private void OnDisable()
    {
        // 有効化したものは、必ずここで無効化し、イベント登録も解除する
        if (playerInputActions != null)
        {
            playerInputActions.Player.Disable();

            // Fireアクションの解除
            playerInputActions.Player.Fire.started -= OnFireButtonPressed;
            playerInputActions.Player.Fire.canceled -= OnFireButtonReleased;

            // 他のアクションの解除
            playerInputActions.Player.SwitchWeapon.performed -= SwitchWeapon;
            playerInputActions.Player.SpinAttack.performed -= PerformSpinAttack;
        }
    }

    private void OnDestroy()
    {
        if (instance == this) instance = null;
    }

    /// <summary>
    /// 最初のフレーム更新の前に呼び出されます。
    /// ゲーム設定（HP, SP, AutoFire）の読み込みとUIの初期化を行います。
    /// </summary>
    void Start()
    {
        //SpriteRendererコンポーネントを取得しておく
        spriteRenderer = GetComponentInChildren<SpriteRenderer>();
    }

    /// <summary>
    /// 毎フレーム呼び出されます。
    /// 発射点マーカーの更新や、オート連射の制御を行います。
    /// </summary>
    void Update()
    {
        if (firePointMarker != null)
        {
            firePointMarker.position = firePoints[currentFirePointIndex].position;
            firePointMarker.rotation = firePoints[currentFirePointIndex].rotation;
        }

        //オート連射が有効かつボタンが押され続けている場合
        if (SettingsManager.IsAutofireEnabled() && fireButtonHeld)
        {
            if (Time.time > nextFireTime)
            {
                ShootBullet();
                nextFireTime = Time.time + fireRate; //次の発射時間を設定
            }
        }
    }

    /// <summary>
    /// 固定フレームレートで呼び出されます。
    /// 物理演算（Rigidbody）を使用した移動処理はここで行います。
    /// </summary>
    void FixedUpdate()
    {
        //入力の読み取り
        Vector2 inputVector = playerInputActions.Player.Move.ReadValue<Vector2>();

        //Rigidbodyを使って移動
        Vector2 newPosition = rb.position + inputVector * moveSpeed * Time.fixedDeltaTime;

        //X, Y座標を制限（画面端の制限）
        newPosition.x = Mathf.Clamp(newPosition.x, -3.5f, 3.5f);
        newPosition.y = Mathf.Clamp(newPosition.y, -4.5f, 4.5f);

        //計算後の新しい位置へ移動
        rb.MovePosition(newPosition);

    }

    /// <summary>
    /// Fireボタンが押された瞬間に呼び出されるコールバック関数。
    /// </summary>
    /// <param name="context">入力イベントの情報</param>
    private void OnFireButtonPressed(InputAction.CallbackContext context)
    {
        if (!GameManager.instance.IsGameActive) return;

        fireButtonHeld = true;
        ShootBullet();

        //オート射撃が有効な場合、次回の射撃時間を設定
        if (SettingsManager.IsAutofireEnabled())
        {
            nextFireTime = Time.time + fireRate;
        }
    }

    /// <summary>
    /// Fireボタンが離された瞬間に呼び出されるコールバック関数。
    /// </summary>
    /// <param name="context">入力イベントの情報</param>
    private void OnFireButtonReleased(InputAction.CallbackContext context)
    {
        fireButtonHeld = false;
    }

    /// <summary>
    /// 弾を発射する処理。
    /// 効果音の再生、発射数のカウント、コントローラーの微弱な振動、弾の生成を行います。
    /// </summary>
    private void ShootBullet()
    {
        // ジャミング中は射撃不可
        if (isWeaponJammed)
        {
            // 空撃ち音（キャンセル音）を鳴らす
            GameManager.instance?.PlayCancelSound();
            return;
        }

        // 設定によって射撃モードを切り替えます。
        // オート連射が有効な場合は、連射速度重視（シングルショット）
        if (SettingsManager.IsAutofireEnabled())
        {
            FireSingleShot();
        }
        else
        {
            // 手動連射の場合は、バースト射撃（一度の入力で複数発発射）
            // コルーチンを使って、少し時間を空けながら弾を撃ちます。
            // 手動連射の場合は、バースト射撃（一度の入力で複数発発射）
            StartCoroutine(BurstFireCoroutine());
        }
    }

    /// <summary>
    /// バースト射撃を行うコルーチン。
    /// burstCountの回数だけ、短い間隔で弾を発射します。
    /// </summary>
    private IEnumerator BurstFireCoroutine()
    {
        // 現在のレベルに応じたバースト数（2連射、3連射...）を取得
        int count = burstCount;
        for (int i = 0; i < count; i++)
        {
            FireSingleShot();
            // 次の弾を撃つまで少し待ちます（0.06秒）。
            // これにより「ダダッ」というリズムが生まれます。
            if (i < count - 1) yield return new WaitForSeconds(0.06f); // バースト内の弾間隔
        }
    }

    private void FireSingleShot()
    {
        GameManager.instance?.PlayPlayerShootSound(); //効果音再生
        GameManager.instance?.IncrementShotsFired(); //発射数カウント

        // 発射時の振動: 非常に弱く、短く (優先度: 低)
        VibrationManager.instance?.Vibrate(0.0f, 0.1f, 0.05f, 0.5f);

        //現在選択中の発射点の位置・角度で弾のプレハブを生成

        // 中央の弾 (常に発射)
        // Lv1-2: 1, Lv3-5: 2, Lv6-8: 3, Lv9+: 4
        int centerDamage = 1;
        if (weaponLevel >= 9) centerDamage = 4;
        else if (weaponLevel >= 6) centerDamage = 3;
        else if (weaponLevel >= 3) centerDamage = 2;

        // 中央の弾を発射
        CreateBullet(firePoints[currentFirePointIndex].position, firePoints[currentFirePointIndex].rotation, centerDamage, 1.0f);

        // サイドの弾（Way弾）のペア数を決定します。
        // 1ペアにつき左右に1発ずつ、計2発追加されます。
        // Lv4-6: 1ペア追加 -> 中央1 + 左右2 = 3-Way
        // Lv7-9: 2ペア追加 -> 中央1 + 左右4 = 5-Way
        // Lv10+: 3ペア追加 -> 中央1 + 左右6 = 7-Way
        int sidePairCount = 0;
        if (weaponLevel >= 10) sidePairCount = 3;
        else if (weaponLevel >= 7) sidePairCount = 2;
        else if (weaponLevel >= 4) sidePairCount = 1;

        // サイドの弾（Way弾）を発射するループ
        if (sidePairCount > 0)
        {
            for (int i = 1; i <= sidePairCount; i++)
            {
                int sideDamage = 1;
                float alpha = 1.0f;

                if (i == 1) // 1st Side (Lv4+)
                {
                    // Lv4-5: 1, Lv6-8: 2, Lv9+: 3
                    if (weaponLevel >= 9) sideDamage = 3;
                    else if (weaponLevel >= 6) sideDamage = 2;
                    alpha = 0.8f; // 少し薄く
                }
                else if (i == 2) // 2nd Side (Lv7+)
                {
                    // Lv7-8: 1, Lv9+: 2
                    if (weaponLevel >= 9) sideDamage = 2;
                    alpha = 0.6f; // さらに薄く
                }
                else if (i == 3) // 3rd Side (Lv10+)
                {
                    // Lv10+: 1
                    sideDamage = 1;
                    alpha = 0.4f; // かなり薄く
                }

                float angle = i * 5f; // 5度刻み

                // 右側 (-angle)
                // Quaternion.Euler: 角度（度数法）から回転情報を作成します。
                Quaternion rotR = firePoints[currentFirePointIndex].rotation * Quaternion.Euler(0, 0, -angle);
                CreateBullet(firePoints[currentFirePointIndex].position, rotR, sideDamage, alpha);

                // 左側 (+angle)
                Quaternion rotL = firePoints[currentFirePointIndex].rotation * Quaternion.Euler(0, 0, angle);
                CreateBullet(firePoints[currentFirePointIndex].position, rotL, sideDamage, alpha);
            }
        }
    }

    /// <summary>
    /// 弾を生成し、パラメータを設定するヘルパー関数
    /// </summary>
    private void CreateBullet(Vector3 position, Quaternion rotation, int damage, float alpha = 1.0f)
    {
        // Instantiate: プレハブ（設計図）からゲームオブジェクトの実体を生成します。
        GameObject bullet = Instantiate(bulletPrefab, position, rotation);
        BulletController bc = bullet.GetComponent<BulletController>();
        if (bc != null)
        {
            bc.damage = damage;
            // Lv3以上なら弾を少し大きくする演出
            if (damage > 1) bullet.transform.localScale *= 1.2f;
        }

        // 透明度を設定（サイドの弾を薄くする）
        if (alpha < 1.0f)
        {
            SpriteRenderer sr = bullet.GetComponent<SpriteRenderer>();
            if (sr != null)
            {
                Color color = sr.color;
                color.a = alpha;
                sr.color = color;
            }
        }
    }

    /// <summary>
    /// SwitchWeaponアクション（武器切り替え）が実行されたときに呼ばれる関数。
    /// 発射点のインデックスを変更し、三角形の頂点を切り替えます。
    /// </summary>
    private void SwitchWeapon(InputAction.CallbackContext context)
    {
        if (!GameManager.instance.IsGameActive) return;

        //入力値を読み込む（-1 or +1)
        float switchValue = context.ReadValue<float>();

        if (switchValue > 0) //右側へ
        {
            currentFirePointIndex++;
        }
        else if (switchValue < 0) //左側へ
        {
            currentFirePointIndex--;
        }

        //循環処理
        if (currentFirePointIndex >= firePoints.Count) //一番右を越えたら
        {
            currentFirePointIndex = 0; //一番左に移動
        }
        else if (currentFirePointIndex < 0) //一番左を越えたら
        {
            currentFirePointIndex = firePoints.Count - 1; //一番右へ移動
        }
    }

    /// <summary>
    /// 無敵状態を開始するためのヘルパー関数。
    /// 既存の無敵コルーチンがあれば停止し、新しいコルーチンを開始します。
    /// </summary>
    private void ActivateInvincibility(float duration)
    {
        if (activeInvincibilityCoroutine != null)
        {
            StopCoroutine(activeInvincibilityCoroutine);
        }

        activeInvincibilityCoroutine = StartCoroutine(InvincibilityAndBlinkingCoroutine(duration));
    }

    /// <summary>
    /// 無敵時間中の処理と、スプライトの点滅（被弾演出）を管理するコルーチン。
    /// </summary>
    /// <param name="duration">無敵時間の長さ（秒）</param>
    private IEnumerator InvincibilityAndBlinkingCoroutine(float duration)
    {
        isInvincible = true; //無敵状態開始

        float endTime = Time.time + duration;

        while (Time.time < endTime)
        {
            //スプライトの表示・非表示を反転させて少し待つ
            spriteRenderer.enabled = !spriteRenderer.enabled;
            yield return new WaitForSeconds(0.1f);
        }

        spriteRenderer.enabled = true; //スプライトを表示
        isInvincible = false; //無敵状態解除
        activeInvincibilityCoroutine = null; //変数を空に
    }

    /// <summary>
    /// SpinAttackアクション（必殺技）が実行された時に呼ばれる関数。
    /// </summary>
    private void PerformSpinAttack(InputAction.CallbackContext context)
    {
        if (!GameManager.instance.IsGameActive) return;

        //スピンアタック中でなければ発動
        if (!isSpinning && GameManager.instance.TryUseSP())
        {
            StartCoroutine(SpinAttackCoroutine());
        }
    }

    /// <summary>
    /// スピンアタックの挙動（回転、全方位射撃、無敵）を制御するコルーチン。
    /// </summary>
    private IEnumerator SpinAttackCoroutine()
    {
        ActivateInvincibility(spinAttackDuration); //無敵コルーチン開始
        isSpinning = true; //スピン状態

        // スピンアタック発動時の振動: やや強く、長めに (優先度: 中〜高)
        // 必殺技の「重み」と「回転」を表現するため、低周波と高周波をミックスします
        // 振動時間を攻撃の持続時間(spinAttackDuration)に合わせることで、回転中ずっと振動させます
        VibrationManager.instance?.Vibrate(0.4f, 0.6f, spinAttackDuration, 1.5f);

        float endTime = Time.time + spinAttackDuration;
        float nextFireTime = 0f;

        while (Time.time < endTime)
        {
            //プレイヤーを回転
            transform.Rotate(0, 0, spinSpeed * Time.deltaTime);

            if (Time.time > nextFireTime)
            {
                // レベルに応じたダメージ計算（通常射撃と同じロジック）
                int damage = 1;
                if (weaponLevel >= 9) damage = 4;
                else if (weaponLevel >= 6) damage = 3;
                else if (weaponLevel >= 3) damage = 2;

                // Way数の計算 (通常射撃と同じ)
                int sidePairCount = 0;
                if (weaponLevel >= 10) sidePairCount = 3;
                else if (weaponLevel >= 7) sidePairCount = 2;
                else if (weaponLevel >= 4) sidePairCount = 1;

                // 発射音は一度だけ再生（3つの発射口分をまとめる）
                GameManager.instance?.PlayPlayerShootSound();

                foreach (Transform firePoint in firePoints)
                {
                    // 中央弾
                    CreateBullet(firePoint.position, firePoint.rotation, damage, 1.0f);
                    GameManager.instance?.IncrementShotsFired();

                    // Way弾 (サイド弾)
                    if (sidePairCount > 0)
                    {
                        for (int i = 1; i <= sidePairCount; i++)
                        {
                            int sideDamage = 1;
                            float alpha = 1.0f;

                            // サイド弾のダメージと透明度計算 (FireSingleShotと同じロジック)
                            if (i == 1) // 1st Side
                            {
                                if (weaponLevel >= 9) sideDamage = 3;
                                else if (weaponLevel >= 6) sideDamage = 2;
                                alpha = 0.8f;
                            }
                            else if (i == 2) // 2nd Side
                            {
                                if (weaponLevel >= 9) sideDamage = 2;
                                alpha = 0.6f;
                            }
                            else if (i == 3) // 3rd Side
                            {
                                sideDamage = 1;
                                alpha = 0.4f;
                            }

                            float angle = i * 5f;

                            // 右側
                            Quaternion rotR = firePoint.rotation * Quaternion.Euler(0, 0, -angle);
                            CreateBullet(firePoint.position, rotR, sideDamage, alpha);

                            // 左側
                            Quaternion rotL = firePoint.rotation * Quaternion.Euler(0, 0, angle);
                            CreateBullet(firePoint.position, rotL, sideDamage, alpha);

                            // サイド弾の発射数カウント（左右で2発分）
                            GameManager.instance?.IncrementShotsFired();
                            GameManager.instance?.IncrementShotsFired();
                        }
                    }
                }
                nextFireTime = Time.time + spinAttackFireRate;
            }

            yield return null;
        }

        transform.rotation = Quaternion.identity; //回転をリセット
        isInvincible = false;
        isSpinning = false;
    }

    /// <summary>
    /// プレイヤーがダメージを受ける処理。
    /// HPの減少、無敵時間の開始、ゲームオーバー判定、強い振動の発生を行います。
    /// </summary>
    public void TakeDamage(int damage)
    {
        if (isInvincible)
        {
            return;
        }

        // GameManagerにダメージ処理を委譲
        bool died = GameManager.instance.ApplyDamage(damage);

        // 被弾時の振動: 強く、重く (優先度: 高)
        // 左モーター(低周波)を強めに回すと「ドーン」という重い衝撃になります
        VibrationManager.instance?.Vibrate(0.8f, 0.5f, 0.4f, 2.0f);

        if (died)
        {
            //プレイヤーを非表示
            gameObject.SetActive(false);
            firePointMarker.gameObject.SetActive(false);
        }
        else
        {
            //まだHPが残っている場合、無敵化のコルーチンを開始
            ActivateInvincibility(invincibilityDuration);
        }
    }

    /// <summary>
    /// 武器ジャミング（射撃不可）状態を適用します。
    /// </summary>
    /// <param name="duration">効果時間（秒）</param>
    public void ApplyWeaponJam(float duration)
    {
        if (jamCoroutine != null) StopCoroutine(jamCoroutine);
        jamCoroutine = StartCoroutine(WeaponJamCoroutine(duration));
    }

    private IEnumerator WeaponJamCoroutine(float duration)
    {
        isWeaponJammed = true;
        GameManager.instance?.SetSystemMessage("WARNING: WEAPON JAMMED!", duration);

        yield return new WaitForSeconds(duration);

        isWeaponJammed = false;
    }

    /// <summary>
    /// パワーアップアイテム取得時の処理
    /// </summary>
    public void AddExp(int amount)
    {
        if (weaponLevel >= MAX_LEVEL) return;

        currentExp += amount;

        // レベルアップ判定 (配列のインデックスは level-1)
        int requiredExp = nextLevelExp[weaponLevel - 1];

        if (currentExp >= requiredExp)
        {
            LevelUp();
        }
    }

    private void LevelUp()
    {
        // レベルを上げ、経験値をリセットします。
        weaponLevel++;
        currentExp = 0; // 経験値をリセット（または持ち越し）

        // レベルアップ演出（音やエフェクト）
        GameManager.instance?.PlaySubmitSound(); // 仮で決定音を使用

        // パラメータ反映
        // 連射速度アップ (Lv2, Lv5, Lv8)
        if (weaponLevel >= 8) fireRate = 0.05f;
        else if (weaponLevel >= 5) fireRate = 0.06f;
        else if (weaponLevel >= 2) fireRate = 0.08f;

        // バースト数アップ (Lv2, Lv5, Lv8)
        // 変数は常に更新しておく（プレイ中に設定が切り替わる可能性があるため）
        if (weaponLevel >= 8) burstCount = 4;
        else if (weaponLevel >= 5) burstCount = 3;
        else if (weaponLevel >= 2) burstCount = 2;

        // メッセージ表示（現在のモードに合わせて内容を変える）
        string effectText = "";
        // switch文: 変数の値に応じて処理を分岐させます。if-elseを繰り返すより見やすくなります。
        // ここではレベルごとに、強化された内容のテキストを設定しています。
        switch (weaponLevel)
        {
            case 2:
                effectText = SettingsManager.IsAutofireEnabled() ? "FIRE RATE UP" : "BURST FIRE x2";
                break;
            case 3:
                effectText = "POWER UP";
                break;
            case 4:
                effectText = "3-WAY SHOT";
                break;
            case 5:
                effectText = SettingsManager.IsAutofireEnabled() ? "FIRE RATE UP" : "BURST FIRE x3";
                break;
            case 6:
                effectText = "POWER UP";
                break;
            case 7:
                effectText = "5-WAY SHOT";
                break;
            case 8:
                effectText = SettingsManager.IsAutofireEnabled() ? "FIRE RATE UP" : "BURST FIRE x4";
                break;
            case 9:
                effectText = "POWER UP";
                break;
            case 10:
                effectText = "7-WAY SHOT";
                break;
        }

        // Status Monitorに表示するメッセージを作成し、GameManagerに渡します。
        string message = string.IsNullOrEmpty(effectText) ? "[LEVEL UP!]" : $"[LEVEL UP!] {effectText}";
        GameManager.instance?.SetSystemMessage(message, 3.0f);

        // Lv3, Lv4はShootBullet内で判定
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        // アイテム取得判定
        // 相手が ICollectable（拾えるもの）であれば、その効果を発動させます。
        // これにより、回復アイテムやSP補充アイテムが増えても、ここのコードを変更する必要がなくなります。
        if (other.TryGetComponent<ICollectable>(out var item))
        {
            // item.OnCollected(this) の 'this' は、このスクリプト（PlayerController）のインスタンス自身を指します。
            // アイテム側で「誰が拾ったのか」を知る必要があるため（拾った人の経験値を増やすためなど）、
            // 自分自身（this）を引数として渡しています。
            item.OnCollected(this);
        }
    }

    // UI表示用のゲッター
    public int GetCurrentExp()
    {
        return currentExp;
    }

    public int GetNextLevelExp()
    {
        return nextLevelExp[Mathf.Clamp(weaponLevel - 1, 0, nextLevelExp.Length - 1)];
    }

    // 武器の詳細ステータス文字列を生成する
    public string GetWeaponStatusDescription()
    {
        // ジャミング中はステータスを上書きして警告表示
        if (isWeaponJammed) return "JAMMED";

        List<string> features = new List<string>();

        if (SettingsManager.IsAutofireEnabled())
        {
            // オート連射時はRAPID表記 (短縮)
            if (weaponLevel >= 8) features.Add("RPD3");
            else if (weaponLevel >= 5) features.Add("RPD2");
            else if (weaponLevel >= 2) features.Add("RPD1");
        }
        else
        {
            // 手動時はバースト表記 (短縮)
            if (burstCount > 1) features.Add($"BST{burstCount}");
        }

        // 攻撃力アップ (Lv3: +1, Lv6: +2, Lv9: +3) (短縮)
        if (weaponLevel >= 9) features.Add("PWR3");
        else if (weaponLevel >= 6) features.Add("PWR2");
        else if (weaponLevel >= 3) features.Add("PWR1");

        // Way数
        int wayCount = 0;
        if (weaponLevel >= 10) wayCount = 7;
        else if (weaponLevel >= 7) wayCount = 5;
        else if (weaponLevel >= 4) wayCount = 3;

        if (wayCount > 0) features.Add($"{wayCount}WAY");

        if (features.Count == 0) return $"[LV.{weaponLevel}]NORMAL";

        // スペースなしのスラッシュで区切る
        // string.Join(separator, list): リストの要素を指定した区切り文字で連結して1つの文字列にします。
        // 例: features={"RPD1", "PWR1"} -> "RPD1/PWR1"
        return $"[LV.{weaponLevel}]{string.Join("/", features)}";
    }
}
