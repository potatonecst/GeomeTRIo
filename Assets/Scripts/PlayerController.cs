using UnityEngine;
using UnityEngine.InputSystem;
using System.Collections;
using System.Collections.Generic;

public class PlayerController : MonoBehaviour
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
    public int initialHP;
    private int currentHP;
    public float invincibilityDuration = 1.5f; //無敵時間
    private Coroutine activeInvincibilityCoroutine; //コルーチン格納変数
    private bool isInvincible = false; //無敵状態判定

    //射撃に関する変数
    public GameObject bulletPrefab;
    public List<Transform> firePoints; //3つの発射点を格納するリスト
    private int currentFirePointIndex = 1; //現在選択中の発射点の番号（0=左、1=中、2=右）
    public RectTransform firePointMarker; //発射点のUIマーカーのRectTransformを格納する変数
    private bool autofireEnabled = false; //オート連射が有効か
    public float fireRate = 0.1f; //連射間隔
    private float nextFireTime = 0; //次に弾を発射できる時間
    private bool fireButtonHeld = false; //発射ボタンが押され続けているか

    //スピンアタックに関する変数
    public int initialSpinAttacks; //最大回数(初期値)
    private int currentSpinAttacks; //残り回数
    public float spinAttackDuration = 2f; //持続時間
    public float spinAttackFireRate = 0.1f; //連射間隔
    public float spinSpeed = 720f; //回転速度
    private bool isSpinning = false; //スピンアタック判定

    private void Awake()
    {
        //自身のRigidbody2Dを取得
        rb = GetComponent<Rigidbody2D>();
    }

    //このオブジェクトが有効になったときに呼ばれる
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

    //このオブジェクトが無効になったときに呼ばれる
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

    void Start()
    {
        initialHP = SettingsManager.GetInitialHP(); //設定したHPを取得
        currentHP = initialHP;
        GameManager.instance.UpdateHPDisplay(currentHP); //開始時のHPを画面に表示するため

        initialSpinAttacks = SettingsManager.GetInitialSP(); //設定したSPを取得
        currentSpinAttacks = initialSpinAttacks;
        GameManager.instance.UpdateSPDisplay(currentSpinAttacks);

        autofireEnabled = SettingsManager.IsAutofireEnabled();

        //SpriteRendererコンポーネントを取得しておく
        spriteRenderer = GetComponentInChildren<SpriteRenderer>();
    }

    //ゲームが実行中、毎フレーム呼ばれ続ける
    void Update()
    {
        if (firePointMarker != null)
        {
            firePointMarker.position = firePoints[currentFirePointIndex].position;
            firePointMarker.rotation = firePoints[currentFirePointIndex].rotation;
        }

        //オート連射が有効かつボタンが押され続けている場合
        if (autofireEnabled && fireButtonHeld)
        {
            if (Time.time > nextFireTime)
            {
                ShootBullet();
                nextFireTime = Time.time + fireRate; //次の発射時間を設定
            }
        }
    }

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

    //Fireボタンが押された瞬間に呼ばれる
    private void OnFireButtonPressed(InputAction.CallbackContext context)
    {
        fireButtonHeld = true;
        ShootBullet();

        //オート射撃が有効な場合、次回の射撃時間を設定
        if (autofireEnabled)
        {
            nextFireTime = Time.time + fireRate;
        }
    }

    //Fireボタンが離された瞬間に呼ばれる
    private void OnFireButtonReleased(InputAction.CallbackContext context)
    {
        fireButtonHeld = false;
    }

    //弾の発射
    private void ShootBullet()
    {
        GameManager.instance?.PlayPlayerShootSound(); //効果音再生
        GameManager.instance?.IncrementShotsFired(); //発射数カウント

        //現在選択中の発射点の位置・角度で弾のプレハブを生成
        Instantiate(bulletPrefab, firePoints[currentFirePointIndex].position, firePoints[currentFirePointIndex].rotation);
    }

    //SwitchWeaponアクションが実行されたときに呼ばれる関数
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

    //無敵化開始のための受付関数
    private void ActivateInvincibility(float duration)
    {
        if (activeInvincibilityCoroutine != null)
        {
            StopCoroutine(activeInvincibilityCoroutine);
        }

        activeInvincibilityCoroutine = StartCoroutine(InvincibilityAndBlinkingCoroutine(duration));
    }

    //無敵と点滅を管理するコルーチン
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

    //SpinAttackアクションが実行された時に呼ばれる関数
    private void PerformSpinAttack(InputAction.CallbackContext context)
    {
        //スピンアタック中でなければ発動
        if (currentSpinAttacks > 0 && !isSpinning)
        {
            currentSpinAttacks--;
            GameManager.instance.UpdateSPDisplay(currentSpinAttacks);
            StartCoroutine(SpinAttackCoroutine());
        }
    }

    private IEnumerator SpinAttackCoroutine()
    {
        ActivateInvincibility(spinAttackDuration); //無敵コルーチン開始
        isSpinning = true; //スピン状態

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

    //ダメージを受けるための関数
    public void TakeDamage(int damage)
    {
        if (isInvincible)
        {
            return;
        }

        currentHP -= damage;
        GameManager.instance.UpdateHPDisplay(currentHP);
        GameManager.instance?.IncrementDamageTaken(damage); //被ダメージカウント

        if (currentHP <= 0)
        {
            GameManager.instance.ShowGameOverScreen();

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
