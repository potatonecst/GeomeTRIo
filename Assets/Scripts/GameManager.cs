using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;
using System.Linq;
using System.Collections.Generic;
using System;
using System.Collections;
using UnityEngine.UI; // uGUIを使用するために追加

/// <summary>
/// ゲーム全体の状態（スコア、HP、シーン遷移、セーブデータ）を管理するシングルトンクラス。
/// シーンを跨いで存在し続け（DontDestroyOnLoad）、ゲームの進行を制御します。
/// </summary>
[RequireComponent(typeof(AudioSource))]
public class GameManager : MonoBehaviour
{
    // シングルトンパターン (Singleton Pattern)
    // staticなインスタンス変数。プログラム全体で共有されます。
    // これにより、他のどのスクリプトからでも GameManager.instance でこのクラスの機能にアクセスできます。
    // 例: GameManager.instance.AddScore(100);
    public static GameManager instance;

    //セーブデータ
    // GameDataクラスのインスタンスを保持します。ここにはプレイヤー名や設定、ハイスコアなどが格納されます。
    private GameData gameData;
    // "=>" (アロー演算子) は「式形式のメンバー定義」です。
    // これは `get { return gameData; }` の省略記法で、「Dataプロパティが参照されたら gameData 変数を返す」という意味です。
    // これにより、外部からは `GameManager.instance.Data` でデータにアクセスできます。
    public GameData Data => gameData;

    //ランキング関連
    public int rankingLimit = 5; // ランキングに保存する最大順位

    //スコア関連
    // React側から参照できるようにプロパティ化
    // "{ get; private set; }" の意味：
    //   get;         -> 読み取りは public (外部から参照可能)
    //   private set; -> 書き込みは private (このクラス内部からのみ変更可能)
    // これにより、外部スクリプトが勝手に値を書き換えるのを防ぎ、AddScoreメソッド等を通してのみ変更を許可しています。
    public int CurrentScore { get; private set; } = 0;
    public int CurrentHP { get; private set; }
    public int CurrentSP { get; private set; }
    public int MaxHP { get; private set; }
    public int MaxSP { get; private set; }

    // SPゲージ（チャージ）関連
    public float CurrentSPCharge { get; private set; } = 0f; // 現在溜まっているチャージ量

    [SerializeField] private float maxSpChargeRequired = 2500f; // 1ストック溜まるのに必要なポイント（調整可能にする）
    public float MaxSPCharge => maxSpChargeRequired;

    // ゲーム状態フラグ
    public bool IsGameOver { get; private set; } = false;
    public bool IsNewHighScore { get; private set; } = false;

    // UIに表示するシステムメッセージ
    public string SystemMessage { get; private set; } = "";

    // トースト通知用メッセージ (画面右上用)
    // React側の Toaster コンポーネントに表示されるメッセージです。
    // セーブ完了("DATA SAVED")や接続中("CONNECTING...")などのシステム状態をユーザーに伝えます。
    public string ToastMessage { get; private set; } = "";
    // メッセージ発行時刻。React側での表示タイミング制御に使用される可能性があります。
    public float LastToastTime { get; private set; }
    // メッセージの一意なID (GUID)。
    // React側は、メッセージの内容が同じでもこのIDが変われば「新しい通知」として扱い、
    // アニメーションを再生し直す（リトリガーする）ことができます。
    public string ToastId { get; private set; } = "";

    // スコア獲得イベント（React側でのポップアップ表示用）
    public int LastScoreEventAmount { get; private set; }
    public string LastScoreEventLabel { get; private set; }
    public float LastScoreEventTime { get; private set; } // イベント発生時刻

    // タイトル画面の演出（Press Any Button -> ログ）をスキップするかどうかのフラグ
    // ゲームプレイからタイトルに戻った際に、演出を飛ばしてすぐにメニューを表示するために使用します。
    public bool SkipTitleSequence { get; set; } = false;

    // ゲームプレイがアクティブに進行中かどうかを示すフラグ。
    // true: プレイヤーの操作が可能で、敵も動く状態。
    // false: カットイン演出中、ポーズ中、またはゲームオーバー後。
    // PlayerControllerやEnemyControllerはこのフラグを見て動作を停止します。
    public bool IsGameActive { get; private set; } = false;

    //ポーズ関連
    private bool isPaused = false;
    public bool IsPaused => isPaused; // 外部公開用プロパティ

    // UnityのInput System（新しい入力管理システム）のアクション定義クラス
    private PlayerInputActions playerInputActions;

    //経過時間
    public float timeElapsed { get; private set; }

    //敵の弾
    public GameObject enemyBulletPrefab;

    //効果音関連
    [Header("Sound")]
    public AudioClip cursorMoveSound;
    public AudioClip submitSound;
    public AudioClip cancelSound;
    public AudioClip playerShootSound;
    public AudioClip enemyShootSound;
    [Header("BGM")]
    public AudioClip titleBgm;
    public AudioClip stage1Bgm;
    public AudioClip scoreAttackBgm;
    private AudioSource audioSource;
    private AudioSource bgmAudioSource;
    private AudioSource lowPriorityAudioSource; // 弾などの低優先度SE用

    // ユーザーIDとファイル名
    public string currentUserId;
    private const string PREFS_USER_ID = "Game_UserId"; // ID保存用のキー
    public string CurrentSaveFileName => $"user_{currentUserId}.sav";

    // シーン遷移時のチラつき防止用オーバーレイ（黒い幕）
    // シーンが切り替わる瞬間に画面を真っ黒にすることで、読み込み中の不自然な表示を隠します。
    private GameObject overlayCanvasObj;
    private Image overlayImage;

    // スコアエクステンド関連
    // 次にHPが回復するスコアの目標値
    private int nextScoreExtend = 200000; // 初期目標 (50000 -> 200000)
    private const int scoreExtendInterval = 200000; // 間隔 (50000 -> 200000)

    // メッセージリセット用のコルーチン
    private Coroutine messageResetCoroutine;
    private Coroutine toastMessageResetCoroutine;

    // クラウドデータがロード済みかどうか（タイトル画面での重複ロード防止）
    private bool isCloudDataLoaded = false;
    // クラウドへの保存を許可するかどうか（ロード失敗時の上書き防止）
    private bool canSaveToCloud = false;
    public bool CanSaveToCloud => canSaveToCloud; // 外部公開用プロパティ
    // オフラインモードかどうか（ロード失敗時にtrueになる）
    // trueの場合、React側の OfflineIndicator が表示され、セーブ処理がスキップされます。
    public bool IsOfflineMode { get; private set; } = false;

    // セーブデータの競合（コンフリクト）が未解決のまま残っているかどうか。
    // trueの場合、シーン遷移後などに再度解決ダイアログを表示します。
    public bool HasPendingConflict { get; private set; } = false;
    private string pendingConflictLocalDate = "";
    private string pendingConflictServerDate = "";

    /// <summary>
    /// インスタンスの初期化とシングルトンの設定を行います。
    /// セーブデータのロードや、シーン遷移用オーバーレイの準備もここで実行されます。
    /// </summary>
    void Awake()
    {
        // シングルトンパターン (Singleton Pattern)
        // ゲーム中に GameManager は「たった1つ」しか存在してはいけません。
        // static変数 'instance' に自分自身を代入することで、外部から GameManager.instance と書くだけでアクセスできるようにします。
        if (instance == null)
        {
            instance = this;

            // DontDestroyOnLoad: 指定したオブジェクトを、シーン遷移時に破棄されないようにするUnityのメソッドです。
            // 通常、シーンが切り替わると前のシーンのオブジェクトはすべて消えますが、
            // GameManagerはゲーム全体を通して存在し続ける必要があるため、この設定を行います。
            // これにより、BGMの継続再生やスコアの保持が可能になります。
            DontDestroyOnLoad(gameObject);

            // ユーザーIDの初期化（なければ生成して保存）
            // これにより、端末ごとに固有のIDが割り振られ、クラウド上で区別されます。
            InitializeUserId();

            // フレームレート設定
            // ゲームの動作速度を秒間60フレーム（60fps）に固定します。
            // これにより、PCの性能差によるゲームスピードのばらつきを抑えます。
            // QualitySettings.vSyncCount = 0: 垂直同期（VSync）を無効化します。
            // Unityでは、VSyncが有効だと targetFrameRate の設定が無視されてしまうため、必ず0にする必要があります。
            QualitySettings.vSyncCount = 0; // VSyncを無効化（targetFrameRateを有効にするため）
            Application.targetFrameRate = 60;

            // クラウドセーブ移行のため、Awakeでは一旦デフォルト（空）のデータで初期化します。
            // 実際のデータはタイトル画面での接続演出後にクラウドからロードします。
            gameData = new GameData();

            // CloudSaveManagerが存在しない場合は追加（保険）
            if (GetComponent<CloudSaveManager>() == null)
            {
                gameObject.AddComponent<CloudSaveManager>();
            }
        }
        else
        {
            // もし既に別の GameManager が存在していた場合（シーン遷移で戻ってきた時など）、
            // 自分自身（新しい方）を破壊して、重複を防ぎます。
            Destroy(gameObject);
        }

        // 遷移用オーバーレイ（黒い画面）をプログラムから生成して準備します
        SetupOverlayCanvas();

        //Pause時の入力システムの準備
        playerInputActions = new PlayerInputActions();

        // イベントの購読 (Subscription)
        //UIマップのPauseアクションが実行されたら、TogglePause関数を呼び出す
        // '+=' 演算子: 左側のイベント（performed）に、右側のメソッド（TogglePause）を追加（登録）します。
        playerInputActions.UI.Pause.performed += TogglePause;

        //自分についているAudioSourceを取得
        audioSource = GetComponent<AudioSource>();
        // SE用の優先度は標準(128)にしておく
        // Priority: 0(最優先) 〜 256(最低)。デフォルトは128。
        if (audioSource != null) audioSource.priority = 128;

        // 弾発射音などの低優先度SE用AudioSourceを追加
        // AddComponent<T>(): ゲームオブジェクトに新しいコンポーネントを動的に追加します。
        lowPriorityAudioSource = gameObject.AddComponent<AudioSource>();
        lowPriorityAudioSource.playOnAwake = false;
        // 弾の音は大量に鳴るため、同時発音数制限（Voice Count）に引っかかった場合、
        // BGM(0)や重要なSE(128)よりも先に消されるように、優先度を低く(200)設定します。
        lowPriorityAudioSource.priority = 200; // 128より大きく設定して優先度を下げる（0が最高、256が最低）

        // BGM用のAudioSourceを動的に追加（SE用とは分けるため）
        bgmAudioSource = gameObject.AddComponent<AudioSource>();
        bgmAudioSource.loop = true;
        bgmAudioSource.playOnAwake = false;
        // BGMの優先度を最高(0)に設定する。
        // Unityのオーディオシステムは同時発音数を超えると優先度の低い音を消すため、SE(128)にBGMが消されないようにする。
        bgmAudioSource.priority = 0;
    }

    /// <summary>
    /// シーン遷移時のチラつきを隠すための、真っ黒なオーバーレイCanvasを動的に生成します。
    /// Prefabを使用せず、コードのみでUIを構築しています。
    /// </summary>
    private void SetupOverlayCanvas()
    {
        // Unityのエディタ上でPrefabを作らず、プログラム（コード）だけで画面を覆う黒い幕を作ります。
        // 新しいゲームオブジェクトを作成
        overlayCanvasObj = new GameObject("TransitionOverlayCanvas");
        DontDestroyOnLoad(overlayCanvasObj); // これもシーン遷移で消えないようにする

        // Canvasコンポーネントを追加（UIの描画に必要）
        // RenderMode.ScreenSpaceOverlay: カメラの位置に関係なく、常に画面の最前面に表示する設定です。
        // UIをカメラに追従させるのではなく、画面に貼り付けるイメージです。
        Canvas canvas = overlayCanvasObj.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvas.sortingOrder = 32767; // 最前面に表示

        CanvasScaler scaler = overlayCanvasObj.AddComponent<CanvasScaler>();
        scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        scaler.referenceResolution = new Vector2(1920, 1080);

        // 黒い画像を表示するための子オブジェクトを作成
        GameObject imageObj = new GameObject("BlackPanel");
        imageObj.transform.SetParent(overlayCanvasObj.transform, false);

        overlayImage = imageObj.AddComponent<Image>();
        overlayImage.color = Color.black;
        overlayImage.raycastTarget = false; // 入力は阻害しない

        // 全画面に広げる
        RectTransform rect = overlayImage.rectTransform;
        rect.anchorMin = Vector2.zero;
        rect.anchorMax = Vector2.one;
        rect.offsetMin = Vector2.zero;
        rect.offsetMax = Vector2.zero;

        // 最初は非表示にしておく
        overlayCanvasObj.SetActive(false);
    }

    private void OnEnable()
    {
        // Input Systemを有効化
        playerInputActions.UI.Enable();

        // イベントの購読
        // シーン読み込み完了イベントを購読（BGM切り替えなどのため）
        // SceneManager.sceneLoaded はUnityエンジン側（標準機能）が持っている「通知リスト」のようなものです。
        // ここに自分の関数（OnSceneLoaded）を登録（+=）しておくと、
        // Unityがシーン読み込みを完了したタイミングで、自動的にその関数を呼び出してくれます。
        SceneManager.sceneLoaded += OnSceneLoaded;
    }

    private void OnDisable()
    {
        // オブジェクトが無効化される際に、イベント購読を解除（メモリリーク防止）
        // '-=' 演算子: イベントからメソッドを削除（解除）します。これを忘れるとエラーの原因になります。
        playerInputActions?.UI.Disable();
        SceneManager.sceneLoaded -= OnSceneLoaded;
    }

    /// <summary>
    /// 最初のフレーム更新の前に呼び出されます。
    /// 音量の適用や、シーンごとの初期化処理（BGM再生、プレイ回数カウント）を行います。
    /// </summary>
    void Start()
    {

        // 音量設定を適用
        ApplyAudioSettings();

        // BGM再生はReact側の準備完了通知（OnGameUIReady）を待ってから行います。
        // これにより、起動時に画面が表示される前にBGMが鳴り始めてしまう「フライング再生」を防ぎます。
        string currentScene = SceneManager.GetActiveScene().name;

        // 修正: プレイ回数の加算処理を削除
        // OnSceneLoaded イベントで一元管理するため、ここでは行いません。
        // これにより、エディタ実行時などの二重加算を防ぎます。

        // タイトル画面に戻ってきたら、ロード済みフラグをリセットして再ロード可能にする
        if (currentScene == "TitleScene")
        {
            // ここでの自動リセットは廃止。React側から制御する。
        }
    }

    /// <summary>
    /// 毎フレーム呼び出されます。
    /// ゲームの経過時間を計測します（ポーズ中を除く）。
    /// </summary>
    void Update()
    {
        // ポーズ中でなく、かつゲーム開始演出が終わっていれば経過時間を加算
        if (Time.timeScale > 0f && IsGameActive)
        {
            timeElapsed += Time.deltaTime;
        }
    }

    // 設定から音量を適用する
    public void ApplyAudioSettings()
    {
        // UIの0-100をAudioSourceの0.0-1.0に変換
        // UnityのAudioSource.volumeプロパティは 0.0(無音) 〜 1.0(最大) のfloat値で指定する必要があります。
        float bgmVol = SettingsManager.GetBGMVolume() / 100f;
        // SEは個別にPlayOneShotで鳴らす際に音量を乗算するか、AudioSource自体の音量を変える
        // ここではAudioSource（SE用）とbgmAudioSource（BGM用）のVolumeプロパティを設定します
        if (bgmAudioSource != null) bgmAudioSource.volume = bgmVol;
    }

    /// <summary>
    /// シーン読み込み完了時に自動的に呼び出されるイベントハンドラ。
    /// </summary>
    /// <param name="scene">読み込まれたシーンの情報</param>
    /// <param name="mode">読み込みモード（Single/Additive）</param>
    // これらの引数は、Unity側がイベントを発火させる際に自動的にセットして渡してくれます。
    // プログラマーが自分で呼び出す必要はありません。
    private void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        // BGM再生とオーバーレイ（黒幕）の消去は、React側の準備完了（OnGameUIReady）を待ってから行います。
        // そのため、ここでは処理を行いません。これにより、画面表示とBGMのタイミングが完全に同期します。

        // タイトル画面に戻ってきたら、ロード済みフラグをリセットして再ロード可能にする
        if (scene.name == "TitleScene")
        {
            // ここでの自動リセットは廃止。React側から制御する。
        }
    }

    /// <summary>
    /// 指定されたシーン名に対応するBGMを再生します。
    /// </summary>
    public void PlayGameBGM(string sceneName)
    {
        Debug.Log($"[GameManager] PlayGameBGM: {sceneName}");
        if (sceneName == "TitleScene") PlayBGM(titleBgm);
        else if (sceneName == "Stage1") PlayBGM(stage1Bgm);
        else if (sceneName == "ScoreAttack") PlayBGM(scoreAttackBgm);
    }

    /// <summary>
    /// 指定したAudioClipをBGMとして再生します。
    /// 既に同じ曲が流れている場合は再開しません。
    /// </summary>
    public void PlayBGM(AudioClip clip)
    {
        if (clip == null) return;
        if (bgmAudioSource.clip == clip && bgmAudioSource.isPlaying) return;

        bgmAudioSource.Stop();
        bgmAudioSource.clip = clip;
        bgmAudioSource.Play();
    }

    /// <summary>
    /// ローディング演出（React側の表示待ち＋暗転）を伴うシーン遷移を開始します。
    /// </summary>
    /// <param name="sceneName">遷移先のシーン名</param>
    // ReactUI側でローディング画面を表示している間に、裏で非同期読み込みを行います。
    // StartCoroutine: コルーチン（時間をまたぐ処理）を開始するUnityのメソッドです。
    public void LoadSceneWithTransition(string sceneName)
    {
        StartCoroutine(LoadSceneAsyncCoroutine(sceneName));
    }

    /// <summary>
    /// 非同期でシーンを読み込み、完了後にフェードアウトして画面を切り替えるコルーチン。
    /// </summary>
    // IEnumerator: コルーチンとして動作させるための戻り値の型です。
    // コルーチンとは、処理を途中で中断（yield）し、次のフレームや指定時間後に再開できる特別な関数です。
    // 非同期処理（ロード待ちなど）を同期コードのように書くことができます。
    private IEnumerator LoadSceneAsyncCoroutine(string sceneName)
    {
        // 振動が残らないように、シーン遷移前に強制停止します。
        // 遷移開始時に振動を停止
        VibrationManager.instance?.StopAllVibrations();

        // スコアや状態をリセット
        ResetScore();

        // React側の描画更新を待つために少し待機
        // Time.timeScaleが0になっているため、Realtimeを使用する
        yield return new WaitForSecondsRealtime(0.1f);

        // 非同期読み込み開始
        // SceneManager.LoadSceneAsync: Unity標準のAPIです。
        // 現在のシーンを動かしたまま、裏側で次のシーンを読み込みます。
        // 戻り値の AsyncOperation オブジェクトを通して、進捗状況の確認や遷移タイミングの制御ができます。
        AsyncOperation asyncLoad = SceneManager.LoadSceneAsync(sceneName);

        // allowSceneActivation = false: 
        // 読み込みが完了しても、自動的に画面を切り替えないようにします。
        // これにより、ロード画面（ReactUI側）を表示し続けることができます。
        // 準備ができたら、あとで true にして画面を切り替えます。
        asyncLoad.allowSceneActivation = false;

        // 読み込み完了まで待機 (progressは0.9までしか進まない)
        // allowSceneActivationがfalseの間は、読み込みが完了してもprogressは0.9で止まります。
        while (asyncLoad.progress < 0.9f)
        {
            // yield return null:
            // ここで処理を中断し、次のフレーム（画面更新）まで待ちます。
            // これがないと無限ループでゲームがフリーズしてしまいます。
            yield return null;
        }

        // ロード完了後、React側の描画準備が整うまで少し待機してからオーバーレイを消す。
        // フェードアウトはReact側で行うため、ここでは単に非表示にするだけで良い。
        // これにより、React側のカットイン演出がUnityの黒画面に隠されるのを防ぐ。
        yield return new WaitForSecondsRealtime(0.2f);
        overlayCanvasObj.SetActive(false);

        // シーン遷移を許可（ここで一瞬フリーズするが、ユーザーは既にロード画面を見ているので違和感が減る）
        asyncLoad.allowSceneActivation = true;
    }

    /// <summary>
    /// シーン遷移完了後、オーバーレイ（黒幕）を非表示にするコルーチン。
    /// </summary>
    private IEnumerator HideOverlayCoroutine()
    {
        // React側から準備完了通知が来た時点で、即座にオーバーレイ（黒幕）を非表示にします。
        // これにより、BGM再生開始と同時に画面が表示され、違和感のない遷移を実現します。
        overlayCanvasObj.SetActive(false);
        yield break;
    }

    /// <summary>
    /// ゲームデータを初期化（リセット）します。
    /// </summary>
    public void InitializeGameData()
    {
        gameData = new GameData(); //空の新しいGameDataで上書き
    }

    /// <summary>
    /// 敵を倒した時に呼び出され、総撃破数を加算し、SPチャージを増加させます。
    /// </summary>
    public void IncrementEnemiesDefeated()
    {
        gameData.stats.totalEnemiesDefeated++;
        AddSPCharge(30f); // 撃破ボーナス: 50 -> 30 に調整
    }

    /// <summary>
    /// プレイヤーがダメージを受けた時に呼び出され、総被ダメージ量を加算します。
    /// </summary>
    public void IncrementDamageTaken(int damage)
    {
        gameData.stats.totalDamageTaken += damage;
    }

    /// <summary>
    /// 敵にダメージを与えた時に呼び出され、総与ダメージ量を加算します。
    /// </summary>
    public void IncrementDamageDealt(int damage)
    {
        gameData.stats.totalDamageDealt += damage;
    }

    /// <summary>
    /// 累計獲得スコアを加算します。
    /// int型(約21億)では足りなくなる可能性があるため、long型(約922京)を使用しています。
    /// </summary>
    /// <param name="amount">加算するスコア量</param>
    public void IncrementTotalScore(int amount)
    {
        // オーバーフロー対策
        // long.MaxValue: 64bit整数の最大値。これを超えて加算すると、数値が一周してマイナスになってしまうため、
        // 加算後の値が最大値を超える場合は、最大値で止める（カンストさせる）処理を入れています。
        if (gameData.stats.totalScore > long.MaxValue - amount)
        {
            gameData.stats.totalScore = long.MaxValue;
        }
        else
        {
            gameData.stats.totalScore += amount;
        }
    }

    /// <summary>
    /// SP使用回数を加算します。
    /// スピンアタック発動時に呼び出されます。
    /// </summary>
    public void IncrementSpUsed()
    {
        gameData.stats.totalSpUsed++;
    }

    /// <summary>
    /// 誘爆撃破数を加算します。
    /// 敵が誘爆（Chain Explosion）によって倒された時に呼び出されます。
    /// </summary>
    public void IncrementChainKills()
    {
        gameData.stats.totalChainKills++;
    }

    /// <summary>
    /// アイテム取得数を加算します。
    /// 経験値アイテムなどを取得した時に呼び出されます。
    /// </summary>
    public void IncrementItemsCollected()
    {
        gameData.stats.itemsCollected++;
    }

    /// <summary>
    /// 弾を発射した時に呼び出され、総発射数を加算します。
    /// </summary>
    public void IncrementShotsFired()
    {
        gameData.stats.totalShotsFired++;
    }

    /// <summary>
    /// スコア、経過時間、HP、SPなどのゲーム状態をリセットします。
    /// ゲーム開始時やリスタート時に呼び出されます。
    /// </summary>
    public void ResetScore()
    {
        // スコアを0にリセット
        CurrentScore = 0;

        // ゲーム開始前は時間を止めておく（カットイン演出のため）
        Time.timeScale = 0f;
        // 表示用のキャッシュも初期値に戻しておく（プレイヤー生成までの繋ぎ）
        MaxHP = SettingsManager.GetInitialHP();
        MaxSP = SettingsManager.GetInitialSP();
        CurrentHP = MaxHP;
        CurrentSP = MaxSP;
        CurrentSPCharge = 0f; // チャージもリセット
        // SkipTitleSequence = false; // ここではリセットしない

        IsGameOver = false;
        IsNewHighScore = false;

        isPaused = false; // ポーズ状態もリセット

        IsGameActive = false; // ゲーム開始前状態にリセット

        timeElapsed = 0;
        nextScoreExtend = scoreExtendInterval; // エクステンド目標もリセット
        SetSystemMessage("");

        // スコアイベント情報もリセット（前回のゲームのイベントが残らないようにする）
        LastScoreEventAmount = 0;
        LastScoreEventLabel = "";
        LastScoreEventTime = 0f;
    }

    /// <summary>
    /// スコアを加算し、UIを更新します。
    /// また、一定スコアごとのエクステンド（HP回復）判定も行います。
    /// </summary>
    public void AddScore(int points)
    {
        // オーバーフロー対策: 加算するとintの最大値(約21億)を超える場合は、最大値で止める
        // int.MaxValue: 2,147,483,647
        // longにキャストして計算することで、溢れた分を正しく判定できるようにする
        if ((long)CurrentScore + points > int.MaxValue)
        {
            CurrentScore = int.MaxValue;
        }
        else
        {
            CurrentScore += points;
        }

        // 累計スコアにも加算
        IncrementTotalScore(points);

        // スコアエクステンド判定
        if (CurrentScore >= nextScoreExtend)
        {
            HealPlayer(1);
            nextScoreExtend += scoreExtendInterval;
            PlaySubmitSound(); // エクステンド音（仮で決定音を使用）
        }
    }

    /// <summary>
    /// スコアを加算し、同時にUI表示用のイベントを発火させます。
    /// </summary>
    /// <param name="amount">加算スコア</param>
    /// <param name="label">表示ラベル（例: "FORMATION BONUS"）</param>
    public void TriggerScoreEvent(int amount, string label)
    {
        AddScore(amount);

        // 同一フレーム内で同じラベルのイベントが発生した場合、数値を合算する
        // これにより、誘爆で2体同時に倒した時に「250」が2回出るのではなく、「500」とまとめて表示されるようになる
        if (Mathf.Approximately(LastScoreEventTime, Time.unscaledTime) && LastScoreEventLabel == label)
        {
            LastScoreEventAmount += amount;
        }
        else
        {
            LastScoreEventAmount = amount;
            LastScoreEventLabel = label;
            LastScoreEventTime = Time.unscaledTime; // ポーズ中でもUIが反応できるように実時間を使用
        }
    }

    /// <summary>
    /// プレイヤーにダメージを与え、死亡判定を行います。
    /// </summary>
    /// <param name="damage">ダメージ量</param>
    /// <returns>死亡した場合はtrue</returns>
    public bool ApplyDamage(int damage)
    {
        CurrentHP -= damage;
        IncrementDamageTaken(damage);

        if (CurrentHP <= 0)
        {
            ShowGameOverScreen();
            return true;
        }
        return false;
    }

    /// <summary>
    /// プレイヤーのHPを回復します。
    /// 最大HPを超えた場合は、最大HP自体を拡張します（動的上限）。
    /// </summary>
    /// <param name="amount">回復量</param>
    public void HealPlayer(int amount)
    {
        CurrentHP += amount;
        // 現在HPが最大HPを超えたら、最大HPを更新する（動的上限）
        if (CurrentHP > MaxHP)
        {
            MaxHP = CurrentHP;
        }
    }

    /// <summary>
    /// SP（ボム）の使用を試みます。
    /// </summary>
    /// <returns>使用に成功したらtrue、SP不足ならfalse</returns>
    public bool TryUseSP()
    {
        if (CurrentSP > 0)
        {
            CurrentSP--;
            IncrementSpUsed(); // 統計加算
            return true;
        }
        return false;
    }

    /// <summary>
    /// SPチャージゲージを加算します。
    /// ゲージが満タンになると、SP（ボム）のストックが1つ増えます。
    /// </summary>
    /// <param name="amount">チャージ増加量</param>
    public void AddSPCharge(float amount)
    {
        // チャージを加算
        CurrentSPCharge += amount;

        // ゲージが満タン（MaxSPCharge以上）になったらストックを増やす
        // whileループにしているのは、一度に大量のポイントが入って2個以上溜まる場合に対応するためです。
        while (CurrentSPCharge >= MaxSPCharge)
        {
            CurrentSPCharge -= MaxSPCharge; // 余剰分は持ち越し
            // ストックを増やす（上限なし）
            CurrentSP++;
        }
    }

    /// <summary>
    /// ポーズボタンが押された時の処理。ポーズ状態をトグル（切り替え）します。
    /// </summary>
    /// <param name="context">Input Systemのコールバック情報</param>
    private void TogglePause(InputAction.CallbackContext context)
    {
        // タイトル画面ではポーズ機能（BGM停止など）を無効化する
        if (SceneManager.GetActiveScene().name == "TitleScene") return;

        // ゲーム開始前（カットイン中）はポーズ不可
        if (!IsGameActive) return;

        PlaySubmitSound(); //効果音再生
        isPaused = !isPaused;

        if (isPaused)
        {
            PauseGame();
        }
        else
        {
            ResumeGame();
        }
    }

    /// <summary>
    /// ゲームを一時停止します（Time.timeScale = 0）。
    /// </summary>
    void PauseGame()
    {
        // Time.timeScale = 0f: ゲーム内の時間を完全に停止させます。物理演算やアニメーションも止まります。
        // Time.timeScale: ゲーム内の時間の流れの速さ。0にすると停止、1で通常速度、0.5でスローモーションになります。
        Time.timeScale = 0f; //時間を停止
        bgmAudioSource?.Pause(); //BGMを一時停止

        // InputSystemの機能を使って、全デバイスの振動を一時停止する
        InputSystem.PauseHaptics();
    }


    /// <summary>
    /// ゲームを再開します（Time.timeScale = 1）。
    /// </summary>
    public void ResumeGame()
    {
        Time.timeScale = 1f;
        bgmAudioSource?.UnPause(); //BGMを再開

        // 振動を再開する
        InputSystem.ResumeHaptics();

        isPaused = false;
    }

    /// <summary>
    /// ゲームオーバー時の処理。時間を止め、ハイスコア判定を行います。
    /// </summary>
    public void ShowGameOverScreen()
    {
        //ゲームの時間を止める
        Time.timeScale = 0f;

        //BGMを停止
        bgmAudioSource?.Stop();

        IsGameOver = true;

        //現在のステージのシーン名を取得
        string currentSceneName = SceneManager.GetActiveScene().name;

        List<ScoreRecord> currentScores = null;
        if (currentSceneName == "Stage1") currentScores = gameData.stage1Scores;
        else if (currentSceneName == "ScoreAttack") currentScores = gameData.scoreAttackScores;

        if (currentScores != null)
        {
            // 現在の設定（HP, SP, AutoFire）に一致するスコアだけを抽出してソート
            // LINQ (Language Integrated Query) を使用してリスト操作を行っています。
            var filteredScores = currentScores
                .Where(s => s.hp == gameData.settings.initialHp &&
                            s.sp == gameData.settings.initialSp &&
                            s.autoFire == gameData.settings.autoFireEnabled)
                .OrderByDescending(s => s.score)
                .ToList();

            // その設定でのランキングに空きがあるか
            bool hasRankingSlot = filteredScores.Count < rankingLimit;
            // その設定での最下位よりも高スコアか
            bool isHigherThanLastPlace = filteredScores.Count > 0 && CurrentScore > filteredScores.Last().score;

            if (hasRankingSlot || isHigherThanLastPlace)
            {
                // その設定でのハイスコア更新か
                bool isHigherThanHighScore = filteredScores.Count == 0 || CurrentScore > filteredScores.First().score;
                IsNewHighScore = isHigherThanHighScore;
            }
        }

        // ゲームオーバー確定時に即座にスコアと統計を保存する（クラッシュ対策）
        SaveScore();
    }

    /// <summary>
    /// 現在のスコアをランキングデータとして保存します。
    /// 同じ設定条件（HP, SP, AutoFire）のランキングに追加され、上位5件のみが保持されます。
    /// </summary>
    public void SaveScore()
    {
        // React側で決定音を鳴らしているため、ここでは再生しない（重複防止）
        // PlaySubmitSound(); 

        string currentSceneName = SceneManager.GetActiveScene().name;

        List<ScoreRecord> currentScores = null;
        if (currentSceneName == "Stage1") currentScores = gameData.stage1Scores;
        else if (currentSceneName == "ScoreAttack") currentScores = gameData.scoreAttackScores;

        if (currentScores != null)
        {
            // 現在の初期設定を取得
            int currentInitialHp = gameData.settings.initialHp;
            int currentInitialSp = gameData.settings.initialSp;
            bool currentAutoFire = gameData.settings.autoFireEnabled;

            //ランキングに今回の結果を追加
            ScoreRecord newRecord = new ScoreRecord
            {
                score = CurrentScore,
                date = System.DateTime.Now.ToString("yyyy/MM/dd HH:mm"),
                hp = currentInitialHp,
                sp = currentInitialSp,
                autoFire = currentAutoFire
            };
            currentScores.Add(newRecord);

            // 「全く同じ条件」のデータだけを抽出してソート
            // Where: 条件に合うものだけ残す / OrderByDescending: 降順（大きい順）に並べ替え
            var sameConditionScores = currentScores
                // LINQを使って、リストの中から条件に一致するデータだけを抽出・並べ替えしています。
                .Where(s => s.hp == currentInitialHp && s.sp == currentInitialSp && s.autoFire == currentAutoFire)
                .OrderByDescending(s => s.score)
                .ToList();

            // その条件の中で5位から漏れたものを削除
            if (sameConditionScores.Count > rankingLimit)
            {
                // Skip(rankingLimit): 上位5つを飛ばして、6位以降を取得
                var scoresToRemove = sameConditionScores.Skip(rankingLimit).ToList(); // 5位以下のスコアをリストアップ（上位5つのスコアをスキップ）
                foreach (var oldScore in scoresToRemove)
                {
                    currentScores.Remove(oldScore);
                }
            }

            // 今回のプレイ時間を総プレイ時間に加算
            gameData.stats.totalPlayTime += timeElapsed;

            // プレイ回数を加算（ゲームオーバー時）
            gameData.stats.totalGamesPlayed++;

            //セーブ
            SaveGameData();

            //デフォルトプレイヤーネームに設定
            //if (sceneUI.asDefaultToggle.isOn)
            //{
            //    gameData.playerName = sceneUI.playerNameInputField.text;
            //}
        }
    }

    /// <summary>
    /// ユーザーIDを初期化します。
    /// 保存されたIDがあればそれを読み込み、なければ新規生成して保存します。
    /// </summary>
    private void InitializeUserId()
    {
        if (PlayerPrefs.HasKey(PREFS_USER_ID))
        {
            currentUserId = PlayerPrefs.GetString(PREFS_USER_ID);
        }
        else
        {
            currentUserId = System.Guid.NewGuid().ToString();
            PlayerPrefs.SetString(PREFS_USER_ID, currentUserId);
            PlayerPrefs.Save();
        }
        Debug.Log($"[GameManager] User ID: {currentUserId}");
    }

    /// <summary>
    /// 現在のセーブデータを削除し、初期状態に戻します。
    /// </summary>
    public void DeleteSaveData()
    {
        SetToastMessage("DELETING...", 0); // 処理中メッセージ（永続）

        // クラウド上のデータを削除
        CloudSaveManager.Instance?.Delete(currentUserId, (success) =>
        {
            if (success)
            {
                Debug.Log("Cloud save deleted.");
                SetToastMessage("DATA DELETED", 2.0f); // 成功メッセージ（2秒後に消える）

                // 削除成功後にローカルデータも消去してリロード
                PlayerPrefs.DeleteAll();
                PlayerPrefs.Save();

                // 新しいIDを即座に生成（これにより、メモリ上の古いIDが更新され、新しいユーザーとして扱われます）
                InitializeUserId();
                // データを初期化
                InitializeGameData();
                // 音声設定を反映（初期値に戻る）
                ApplyAudioSettings();

                // タイトル画面へリロード（演出スキップなし＝最初から）
                // SkipTitleSequence = false にすることで、次回起動時に "Press Any Button" から始まります。
                SkipTitleSequence = false;
                SceneManager.LoadScene("TitleScene");
            }
            else
            {
                Debug.LogError("Failed to delete cloud save.");
                SetToastMessage("DELETE FAILED", 3.0f);

                // 失敗時はリロードせず、React側に通知してUIを復帰させる
                ReactInputBridge.Instance?.NotifyDeleteFailed();
            }
        });
    }

    /// <summary>
    /// 現在のシーンをリロードしてゲームを再開します。
    /// </summary>
    public void RestartGame()
    {
        // 遷移開始時に振動を停止
        VibrationManager.instance?.StopAllVibrations();

        // React側で決定音を鳴らしているため、ここでは再生しない（重複防止）
        // PlaySubmitSound(); 

        //スコアをリセット
        ResetScore();

        //現在のシーンをもう一度読み込む
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);

        // 時間は止めたままにする（ResetScoreで0fに設定済み）。
        // カットイン演出終了後に StartGameLoop() で 1f に戻される。
    }

    /// <summary>
    /// タイトル画面に戻ります。
    /// </summary>
    public void ReturnToTitle()
    {
        // ゲームオーバー時は ShowGameOverScreen で既に保存済み。
        if (!IsGameOver)
        {
            // ポーズメニューからの離脱（途中終了）の場合
            // スコアランキングには登録しないが、プレイ時間や撃破数などの累積統計（Stats）は保存する
            gameData.stats.totalPlayTime += timeElapsed;
            // プレイ回数を加算（途中終了でも1回とカウント）
            gameData.stats.totalGamesPlayed++;
            SaveGameData();
        }

        // React側で決定音を鳴らしているため、ここでは再生しない（重複防止）
        // PlayCancelSound();

        // 次回タイトル画面読み込み時に演出をスキップするようにフラグを立てる
        SkipTitleSequence = true;

        // ここでは時間を戻さず、コルーチン内で制御する
        // Time.timeScale = 1f;
        // isPaused = false;

        //タイトル画面を読み込む
        //SceneManager.LoadScene("TitleScene"); // 同期ロードを廃止
        StartCoroutine(ReturnToTitleCoroutine());
    }

    /// <summary>
    /// タイトル画面への遷移を制御するコルーチン。
    /// </summary>
    private IEnumerator ReturnToTitleCoroutine()
    {
        // 遷移開始時に振動を停止
        VibrationManager.instance?.StopAllVibrations();

        // 1. React側にローディング表示を依頼
        if (ReactInputBridge.Instance != null)
        {
            ReactInputBridge.Instance.ShowLoadingScreen();
        }

        // React側の描画更新を待つ
        yield return new WaitForSecondsRealtime(0.1f);

        // 2. 非同期読み込み開始
        AsyncOperation asyncLoad = SceneManager.LoadSceneAsync("TitleScene");
        asyncLoad.allowSceneActivation = false;

        // 3. 読み込み完了まで待機
        while (asyncLoad.progress < 0.9f)
        {
            yield return null;
        }

        // 演出待機
        yield return new WaitForSecondsRealtime(0.5f);

        // 4. 暗転
        if (ReactInputBridge.Instance != null)
        {
            ReactInputBridge.Instance.FadeOutScreen();
        }
        yield return new WaitForSecondsRealtime(0.5f);

        // 5. 時間とポーズ状態をリセットしてシーン遷移
        Time.timeScale = 1f;
        isPaused = false;
        asyncLoad.allowSceneActivation = true;
    }

    /// <summary>
    /// カーソル移動時の効果音を再生します。
    /// </summary>
    public void PlayCursorMoveSound()
    {
        if (cursorMoveSound != null)
        {
            float seVol = SettingsManager.GetSEVolume() / 100f;
            audioSource.PlayOneShot(cursorMoveSound, seVol);
        }

        // カーソル移動時の振動: ごく微弱に、一瞬だけ (優先度: 低)
        VibrationManager.instance?.Vibrate(0.0f, 0.1f, 0.03f, 0.5f);
    }

    /// <summary>
    /// 決定時の効果音を再生します。
    /// </summary>
    public void PlaySubmitSound()
    {
        if (submitSound != null)
        {
            float seVol = SettingsManager.GetSEVolume() / 100f;
            audioSource.PlayOneShot(submitSound, seVol);
        }

        // 決定時の振動: 軽く、鋭く「カチッ」 (高周波のみ、優先度: 通常)
        VibrationManager.instance?.Vibrate(0.0f, 0.3f, 0.05f, 1.0f);
    }

    /// <summary>
    /// キャンセル時の効果音を再生します。
    /// </summary>
    public void PlayCancelSound()
    {
        if (cancelSound != null)
        {
            float seVol = SettingsManager.GetSEVolume() / 100f;
            audioSource.PlayOneShot(cancelSound, seVol);
        }

        // キャンセル時の振動: 軽く、鈍く「コツッ」 (低周波のみ、優先度: 通常)
        VibrationManager.instance?.Vibrate(0.3f, 0.0f, 0.05f, 1.0f);
    }

    // 発射音の間引き用タイマー
    private float lastPlayerShootTime = 0f;
    private float lastEnemyShootTime = 0f;
    private const float MIN_PLAYER_SHOOT_SOUND_INTERVAL = 0.02f; // プレイヤー用（秒間50回まで）。最大連射(0.05s)でも音が抜けないように余裕を持たせる。
    private const float MIN_ENEMY_SHOOT_SOUND_INTERVAL = 0.01f; // 敵用（秒間100回まで）。敵は数が多いので制限を緩くする。

    /// <summary>
    /// プレイヤーの射撃音を再生します。
    /// 短時間に連続して呼ばれた場合は間引きます。
    /// </summary>
    public void PlayPlayerShootSound()
    {
        // 間引き処理: 前回の再生から一定時間経過していない場合は再生しない
        if (Time.unscaledTime - lastPlayerShootTime < MIN_PLAYER_SHOOT_SOUND_INTERVAL) return;
        lastPlayerShootTime = Time.unscaledTime;

        if (playerShootSound != null)
        {
            float seVol = SettingsManager.GetSEVolume() / 100f;
            lowPriorityAudioSource.PlayOneShot(playerShootSound, seVol);
        }
    }

    /// <summary>
    /// 敵の射撃音を再生します。
    /// 短時間に連続して呼ばれた場合は間引きます。
    /// </summary>
    public void PlayEnemyShootSound()
    {
        // 間引き処理
        if (Time.unscaledTime - lastEnemyShootTime < MIN_ENEMY_SHOOT_SOUND_INTERVAL) return;
        lastEnemyShootTime = Time.unscaledTime;

        if (enemyShootSound != null)
        {
            float seVol = SettingsManager.GetSEVolume() / 100f;
            lowPriorityAudioSource.PlayOneShot(enemyShootSound, seVol);
        }
    }

    //BGMのAudioSourceを取得する関数
    // 廃止: GameManager内部で生成するようにしたため不要
    // public void RegisterBGMAudioSource(AudioSource source)
    // {
    //     bgmAudioSource = source;
    // }

    /// <summary>
    /// 現在のゲームデータをファイルに保存します。
    /// </summary>
    /// <param name="showMessage">HUDにメッセージを表示するかどうか</param>
    public void SaveGameData(bool showMessage = true)
    {
        // セーブ許可フラグが立っていない場合は保存しない（ロード失敗時の上書き防止）
        if (!canSaveToCloud)
        {
            Debug.LogWarning("[GameManager] Save skipped because cloud data was not loaded successfully (Offline Mode).");
            if (showMessage) SetToastMessage("OFFLINE: SAVE DISABLED", 2.0f);
            return;
        }

        if (CloudSaveManager.Instance != null)
        {
            // セーブ直前に最終更新日時を更新 (UTC Ticks)
            gameData.lastModified = System.DateTime.UtcNow.Ticks;

            Debug.Log("[GameManager] Saving game data...");
            if (showMessage) SetToastMessage("SAVING...", 0); // 保存中メッセージ

            // CloudSaveManager.Instance.Save を呼び出して保存を実行します。
            // 引数のラムダ式 (success, error) => { ... } は、通信完了後に呼ばれます。
            // success (bool): 保存が成功したかどうか (true/false)。
            // error (string): 失敗時のエラーメッセージ。成功時は null。 ※ここは「時間」ではなく「エラー内容」が入ります。
            CloudSaveManager.Instance.Save(currentUserId, gameData, (success, error) =>
            {
                if (success)
                {
                    Debug.Log("[GameManager] Data saved successfully.");
                    if (showMessage) SetToastMessage("DATA SAVED", 2.0f);
                }
                else
                {
                    // エラー内容が "Conflict"（競合）だった場合の特別処理
                    if (error != null && error.StartsWith("Conflict"))
                    {

                        // サーバー日時の整形
                        string[] parts = error.Split('|');
                        string displayServerDate = "Unknown";
                        if (parts.Length > 1 && !string.IsNullOrEmpty(parts[1]))
                        {
                            if (DateTime.TryParse(parts[1], null, System.Globalization.DateTimeStyles.RoundtripKind, out DateTime parsedServerDate))
                                displayServerDate = parsedServerDate.ToLocalTime().ToString("yyyy/MM/dd HH:mm:ss");
                        }

                        // ローカル日時の整形
                        string displayLocalDate = "Unknown";
                        if (gameData.lastModified > 0)
                        {
                            DateTime localDate = new DateTime(gameData.lastModified, DateTimeKind.Utc);
                            displayLocalDate = localDate.ToLocalTime().ToString("yyyy/MM/dd HH:mm:ss");
                        }

                        HasPendingConflict = true; // 競合状態を記憶（シーン遷移しても忘れないように）
                        pendingConflictLocalDate = displayLocalDate;
                        pendingConflictServerDate = displayServerDate;
                        SetToastMessage("CONFLICT DETECTED", 0); // ずっと表示し続ける

                        // コンフリクト発生時はゲーム進行を緊急停止する
                        Time.timeScale = 0f;

                        // コンフリクト発生時、React側に通知してダイアログを表示
                        // ReactInputBridge経由で、React側の window.onSaveConflict() を呼び出します。
                        ReactInputBridge.Instance?.TriggerSaveConflict(displayLocalDate, displayServerDate);
                        return;
                    }

                    Debug.LogError($"[GameManager] Save failed: {error}");
                    if (showMessage) SetToastMessage($"SAVE FAILED: {error}", 3.0f);

                    // セーブ失敗時もオフラインモードに移行して、以降のデータ不整合や上書きを防ぐ
                    canSaveToCloud = false;
                    IsOfflineMode = true;
                }
            });
        }
    }

    /// <summary>
    /// アプリケーションを終了します。エディタ上では再生モードを停止します。
    /// </summary>
    public void QuitGame()
    {
#if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
#else
        Application.Quit();
#endif
    }

    /// <summary>
    /// HUD（画面下部）に表示するシステムメッセージを設定します。
    /// </summary>
    /// <param name="message">表示するメッセージ</param>
    /// <param name="duration">表示時間（秒）。0の場合は永続表示。</param>
    public void SetSystemMessage(string message, float duration = 0f)
    {
        Debug.Log($"[GameManager] SetSystemMessage called: '{message}' (Duration: {duration})");
        // メッセージを更新
        SystemMessage = message;

        // 既にメッセージ消去のタイマーが動いていたらキャンセルします（上書きのため）
        if (messageResetCoroutine != null) StopCoroutine(messageResetCoroutine);

        if (duration > 0f)
        {
            messageResetCoroutine = StartCoroutine(ResetSystemMessageCoroutine(duration));
        }
    }

    private IEnumerator ResetSystemMessageCoroutine(float duration)
    {
        // 指定された時間（秒）だけ待機してから、メッセージを空にします。
        yield return new WaitForSecondsRealtime(duration);
        Debug.Log("[GameManager] ResetSystemMessageCoroutine: Clearing message.");
        SystemMessage = "";
    }

    /// <summary>
    /// 画面右上に表示するトースト通知を設定します。
    /// React側の Toaster コンポーネントがこれを検知して表示します。
    /// </summary>
    /// <param name="message">表示するメッセージ（例: "SAVING..."）</param>
    /// <param name="duration">表示時間（秒）。0を指定すると、次のメッセージで上書きされるまで永続表示されます。</param>
    public void SetToastMessage(string message, float duration = 3.0f)
    {
        Debug.Log($"[GameManager] SetToastMessage called: '{message}' (Duration: {duration})");

        // 同じメッセージ内容ならIDを更新せず、タイマーだけリセット（延長）する
        // これにより、React側での再レンダリング（チラつき）を防ぐ
        if (ToastMessage != message)
        {
            ToastMessage = message;
            // 新しいメッセージの場合のみIDを更新します。
            // React側は toastId の変化を検知して、フェードインアニメーションを開始します。
            ToastId = System.Guid.NewGuid().ToString();
        }

        LastToastTime = Time.unscaledTime; // 発行時刻を記録

        // 既にメッセージ消去のタイマーが動いていたらキャンセルします
        if (toastMessageResetCoroutine != null) StopCoroutine(toastMessageResetCoroutine);

        if (duration > 0f)
        {
            toastMessageResetCoroutine = StartCoroutine(ResetToastMessageCoroutine(duration));
        }
    }

    private IEnumerator ResetToastMessageCoroutine(float duration)
    {
        yield return new WaitForSecondsRealtime(duration);
        ToastMessage = "";
        ToastId = ""; // IDもクリア
    }

    /// <summary>
    /// カットイン演出が終了し、ゲームプレイを開始する際に呼び出されます。
    /// React側の StageStartCutin コンポーネントの演出完了時に、
    /// ReactInputBridge 経由でこのメソッドが実行されます。
    /// </summary>
    public void StartGameLoop()
    {
        IsGameActive = true;

        // コンフリクト解決待ちの場合は、ゲームを開始しない（時間を止めたまま待機）
        // 解決後（ForceSave成功時など）に時間が再開される
        if (HasPendingConflict)
        {
            Debug.LogWarning("[GameManager] StartGameLoop paused due to pending conflict.");
            Time.timeScale = 0f;
            return;
        }

        // カットイン終了、ゲーム開始（時間を動かす）
        Time.timeScale = 1f;
    }

    /// <summary>
    /// React側のUI準備が完了した時に呼び出されます。
    /// BGMの再生と、遷移用オーバーレイの消去を行います。
    /// </summary>
    public void OnGameUIReady()
    {
        string currentScene = SceneManager.GetActiveScene().name;
        Debug.Log($"[GameManager] OnGameUIReady received. Current Scene: {currentScene}. Playing BGM and hiding overlay.");

        // 全てのシーンにおいて、UIの準備が完了したこのタイミングでBGM再生とオーバーレイ消去を行います。
        PlayGameBGM(currentScene);
        StartCoroutine(HideOverlayCoroutine());

        // 未解決のコンフリクトがある場合、シーン遷移後に再度ダイアログを表示する
        // これにより、「ポーズからタイトルに戻る瞬間にコンフリクトしてダイアログが消えてしまった」場合でも、タイトル画面で再表示できます。
        if (HasPendingConflict)
        {
            ReactInputBridge.Instance?.TriggerSaveConflict(pendingConflictLocalDate, pendingConflictServerDate);
        }
    }

    /// <summary>
    /// クラウドからのデータロードを開始します。
    /// タイトル画面でボタンが押されたタイミング（演出中）に呼び出されます。
    /// </summary>
    public void StartCloudLoad()
    {
        // 既にロードを開始している場合は何もしない
        if (isCloudDataLoaded) return;
        isCloudDataLoaded = true;

        // ロード開始時は一旦セーブ不許可にする
        canSaveToCloud = false;
        IsOfflineMode = false; // ロード試行中はオフライン表示を消す

        // ロード中表示 (0秒指定で、結果が出るまで表示し続ける)
        SetToastMessage("CONNECTING...", 0);

        Debug.Log("[GameManager] Starting cloud load...");
        CloudSaveManager.Instance?.Load(currentUserId, (success, data) =>
        {
            if (success)
            {
                if (data != null)
                {
                    gameData = data;
                    ApplyAudioSettings(); // ロードした設定（音量など）を反映
                    Debug.Log("[GameManager] Cloud data loaded successfully.");
                }
                // ロード成功（または新規ユーザー）なのでセーブを許可
                canSaveToCloud = true;
                IsOfflineMode = false;

                // 接続成功
                SetToastMessage("CONNECTED", 2.0f);
            }
            else
            {
                // ロード失敗（通信エラー等）。クラウドデータを保護するためセーブを無効化
                canSaveToCloud = false;
                IsOfflineMode = true; // 失敗したのでオフラインモード
                // 失敗した場合はフラグを戻し、再度ボタンを押した時にリトライできるようにする
                isCloudDataLoaded = false;

                SetToastMessage("CONNECTION FAILED", 3.0f);
                Debug.LogError("[GameManager] Cloud load failed. Save disabled to prevent overwrite.");
            }
        });
    }

    /// <summary>
    /// クラウドロード状態とオフラインモードフラグをリセットします。
    /// React側でタイトル画面（Press Any Button）に戻った時に呼び出されます。
    /// </summary>
    public void ResetCloudLoadState()
    {
        isCloudDataLoaded = false;
        IsOfflineMode = false;
    }

    /// <summary>
    /// コンフリクト解決：クラウドからデータを読み込み直してローカルを更新する
    /// ユーザーが「クラウドのデータを採用（Reload）」を選んだ時に呼ばれます。
    /// </summary>
    public void ResolveConflict_Reload()
    {
        HasPendingConflict = false; // 解決を試みるのでフラグを下ろす
        Debug.Log("[GameManager] Resolving conflict: Reloading from cloud...");
        SetToastMessage("RELOADING...", 0);

        // CloudSaveManagerを使って最新データを取得します。
        CloudSaveManager.Instance.Load(currentUserId, (success, data) =>
        {
            if (success && data != null)
            {
                Debug.Log("Reload successful. Restarting scene...");
                gameData = data; // データを更新
                ApplyAudioSettings();

                // シーンをリロードしてデータを反映
                // メモリ上のデータだけ書き換えても、既に生成された敵やスコア表示には反映されないため、
                // ゲームを再起動（リスタート）して整合性を保ちます。
                RestartGame();
                SetToastMessage("DATA RELOADED", 2.0f);
            }
            else
            {
                Debug.LogError("Reload failed.");
                SetToastMessage("RELOAD FAILED", 3.0f);

                // 失敗した場合は、再度コンフリクト状態に戻してダイアログを出す
                HasPendingConflict = true;
                ReactInputBridge.Instance?.TriggerSaveConflict(pendingConflictLocalDate, pendingConflictServerDate);
            }
        });
    }

    /// <summary>
    /// コンフリクト解決：現在のローカルデータでクラウドを強制的に上書きする
    /// ユーザーが「ローカルのデータを採用（Force Save）」を選んだ時に呼ばれます。
    /// </summary>
    public void ResolveConflict_ForceSave()
    {
        HasPendingConflict = false; // 解決を試みるのでフラグを下ろす
        Debug.Log("[GameManager] Resolving conflict: Force saving...");
        // ForceSaveメソッドを使って強制保存（prevUpdatedAtを無視）
        // ここではSaveGameDataを使わず直接呼ぶ（SaveGameDataは通常保存用）
        if (CloudSaveManager.Instance != null)
        {
            // DateTime.UtcNow.Ticks: 現在時刻を「ティック数（1万分の1ミリ秒単位）」で取得します。
            // 最終更新日時を更新してから保存します。
            gameData.lastModified = System.DateTime.UtcNow.Ticks;
            SetToastMessage("SAVING (FORCED)...", 0);

            // ForceSaveを呼び出し、サーバー側の整合性チェックをスキップさせます。
            // コールバック引数:
            // success (bool): 強制保存が成功したか。
            // error (string): 失敗時のエラーメッセージ。
            CloudSaveManager.Instance.ForceSave(currentUserId, gameData, (success, error) =>
            {
                if (success)
                {
                    Debug.Log("Force save successful.");
                    SetToastMessage("DATA SAVED", 2.0f);

                    // 強制保存成功後、ゲーム中かつポーズ中でなければ時間を再開する
                    if (IsGameActive && !IsPaused)
                    {
                        Time.timeScale = 1f;
                    }
                }
                else
                {
                    Debug.LogError($"Force save failed: {error}");
                    SetToastMessage($"SAVE FAILED: {error}", 3.0f);

                    // 失敗した場合は、再度コンフリクト状態に戻してダイアログを出す
                    HasPendingConflict = true;
                    ReactInputBridge.Instance?.TriggerSaveConflict(pendingConflictLocalDate, pendingConflictServerDate);

                    // 失敗時はオフラインモードへ
                    canSaveToCloud = false;
                    IsOfflineMode = true;
                }
            });
        }
    }
}
