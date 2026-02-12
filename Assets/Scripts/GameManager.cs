using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;
using System.Linq;
using System.Collections.Generic;
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

    // ユーザーIDとファイル名
    public string currentUserId = "default_player";
    public string CurrentSaveFileName => $"user_{currentUserId}.sav";

    // シーン遷移時のチラつき防止用オーバーレイ（黒い幕）
    // シーンが切り替わる瞬間に画面を真っ黒にすることで、読み込み中の不自然な表示を隠します。
    private GameObject overlayCanvasObj;
    private Image overlayImage;

    // スコアエクステンド関連
    // 次にHPが回復するスコアの目標値
    private int nextScoreExtend = 50000;
    private const int scoreExtendInterval = 50000;

    // メッセージリセット用のコルーチン
    private Coroutine messageResetCoroutine;

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

            // フレームレート設定
            // ゲームの動作速度を秒間60フレーム（60fps）に固定します。
            // これにより、PCの性能差によるゲームスピードのばらつきを抑えます。
            QualitySettings.vSyncCount = 0; // VSyncを無効化（targetFrameRateを有効にするため）
            Application.targetFrameRate = 60;

            //セーブデータをロード
            gameData = SaveSystem.Load(CurrentSaveFileName);
            if (gameData == null)
            {
                gameData = new GameData();
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

        // BGM用のAudioSourceを動的に追加（SE用とは分けるため）
        bgmAudioSource = gameObject.AddComponent<AudioSource>();
        bgmAudioSource.loop = true;
        bgmAudioSource.playOnAwake = false;
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

        // 現在のシーン名に合わせてBGMを再生（デバッグ起動時なども考慮）
        string currentScene = SceneManager.GetActiveScene().name;
        PlayGameBGM(currentScene);

        // ゲームプレイシーンならプレイ回数を加算して保存
        if (currentScene == "Stage1" || currentScene == "ScoreAttack")
        {
            gameData.stats.totalGamesPlayed++;
            SaveGameData();
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
        PlayGameBGM(scene.name);

        // ゲームプレイシーンならプレイ回数を加算して保存
        if (scene.name == "Stage1" || scene.name == "ScoreAttack")
        {
            gameData.stats.totalGamesPlayed++;
            SaveGameData();
        }

        // シーンロード完了後、少し待ってからオーバーレイを消す（Reactの初期化待ち）
        StartCoroutine(HideOverlayCoroutine());
    }

    /// <summary>
    /// 指定されたシーン名に対応するBGMを再生します。
    /// </summary>
    public void PlayGameBGM(string sceneName)
    {
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
        // ReactUnityの初期化とフェードイン開始を待つ（0.2秒程度）
        // React側は isBlackout=true で開始されるため、この黒幕が消えても下は黒い状態になっている
        // Time.timeScaleが0になっているため、Realtimeを使用する
        yield return new WaitForSecondsRealtime(0.2f);
        overlayCanvasObj.SetActive(false);
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
    }

    /// <summary>
    /// スコアを加算し、UIを更新します。
    /// また、一定スコアごとのエクステンド（HP回復）判定も行います。
    /// </summary>
    public void AddScore(int points)
    {
        CurrentScore += points;

        // スコアエクステンド判定
        if (CurrentScore >= nextScoreExtend)
        {
            HealPlayer(1);
            nextScoreExtend += scoreExtendInterval;
            PlaySubmitSound(); // エクステンド音（仮で決定音を使用）
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

            //セーブ
            SaveSystem.Save(CurrentSaveFileName, gameData);

            //デフォルトプレイヤーネームに設定
            //if (sceneUI.asDefaultToggle.isOn)
            //{
            //    gameData.playerName = sceneUI.playerNameInputField.text;
            //}
        }
    }

    /// <summary>
    /// 現在のシーンをリロードしてゲームを再開します。
    /// </summary>
    public void RestartGame()
    {
        // 遷移開始時に振動を停止
        VibrationManager.instance?.StopAllVibrations();

        // ランクインしていれば保存
        SaveScore();

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
        // ランクインしていれば保存
        SaveScore();

        // 途中終了した場合も、そこまでのプレイ時間を加算して保存する
        gameData.stats.totalPlayTime += timeElapsed;
        SaveGameData();

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

    /// <summary>
    /// プレイヤーの射撃音を再生します。
    /// </summary>
    public void PlayPlayerShootSound()
    {
        if (playerShootSound != null)
        {
            float seVol = SettingsManager.GetSEVolume() / 100f;
            audioSource.PlayOneShot(playerShootSound, seVol);
        }
    }

    /// <summary>
    /// 敵の射撃音を再生します。
    /// </summary>
    public void PlayEnemyShootSound()
    {
        if (enemyShootSound != null)
        {
            float seVol = SettingsManager.GetSEVolume() / 100f;
            audioSource.PlayOneShot(enemyShootSound, seVol);
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
    public void SaveGameData()
    {
        SaveSystem.Save(CurrentSaveFileName, gameData);
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
    /// HUDに表示するシステムメッセージを設定します。
    /// </summary>
    /// <param name="message">表示するメッセージ</param>
    /// <param name="duration">表示時間（秒）。0の場合は永続表示。</param>
    public void SetSystemMessage(string message, float duration = 0f)
    {
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
        yield return new WaitForSeconds(duration);
        SystemMessage = "";
    }

    /// <summary>
    /// カットイン演出が終了し、ゲームプレイを開始する際に呼び出されます。
    /// React側の StageStartCutin コンポーネントの演出完了時に、
    /// ReactInputBridge 経由でこのメソッドが実行されます。
    /// </summary>
    public void StartGameLoop()
    {
        IsGameActive = true;
        // カットイン終了、ゲーム開始（時間を動かす）
        Time.timeScale = 1f;
    }
}
