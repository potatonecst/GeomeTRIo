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

    /// <summary>
    /// スクリプトのインスタンスがロードされた時に呼び出されます。
    /// コンポーネントの取得など、初期化処理を行います。
    /// </summary>
    private void Awake()
    {
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
        GameManager.instance?.PlayPlayerShootSound(); //効果音再生
        GameManager.instance?.IncrementShotsFired(); //発射数カウント

        // 発射時の振動: 非常に弱く、短く (優先度: 低)
        VibrationManager.instance?.Vibrate(0.0f, 0.1f, 0.05f, 0.5f);

        //現在選択中の発射点の位置・角度で弾のプレハブを生成
        Instantiate(bulletPrefab, firePoints[currentFirePointIndex].position, firePoints[currentFirePointIndex].rotation);
    }

    /// <summary>
    /// SwitchWeaponアクション（武器切り替え）が実行されたときに呼ばれる関数。
    /// 発射点のインデックスを変更し、三角形の頂点を切り替えます。
    /// </summary>
    private void SwitchWeapon(InputAction.CallbackContext context)
    {
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
                foreach (Transform firePoint in firePoints)
                {
                    Instantiate(bulletPrefab, firePoint.position, firePoint.rotation);
                    GameManager.instance?.IncrementShotsFired(); //スピンアタックの弾もカウント
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
}
