using UnityEngine;
using TMPro; //TextMesh Pro
using UnityEngine.SceneManagement;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;
using System.Linq;
using System.Collections.Generic;
using System.Collections;
using UnityEngine.UI; // uGUIを使用するために追加

[RequireComponent(typeof(AudioSource))]
public class GameManager : MonoBehaviour
{
    // シングルトンパターン (Singleton Pattern)
    //staticなインスタンス。これにより、他のどのスクリプトからでも簡単にアクセスできる。
    public static GameManager instance;

    //セーブデータ
    private GameData gameData;
    public GameData Data => gameData; // 外部から読み書きするためのプロパティ

    // 現在のシーンのUI管理役（自作スクリプト）を保存しておくための箱
    // SceneManager（Unity標準機能）とは別物です。こちらはスコア表示などの「見た目」を担当します。
    private SceneUIManager sceneUI;

    //ランキング関連
    public int rankingLimit = 5; //何位まで保存するか

    //スコア関連
    // React側から参照できるようにプロパティ化
    public int CurrentScore { get; private set; } = 0;
    public int CurrentHP { get; private set; }
    public int CurrentSP { get; private set; }
    public int MaxHP { get; private set; }
    public int MaxSP { get; private set; }

    // ゲーム状態フラグ
    public bool IsGameOver { get; private set; } = false;
    public bool IsNewHighScore { get; private set; } = false;

    // タイトル画面の演出（Press Any Button -> ログ）をスキップするかどうかのフラグ
    public bool SkipTitleSequence { get; set; } = false;

    //ポーズ関連
    private bool isPaused = false;
    public bool IsPaused => isPaused; // 外部公開用プロパティ
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

    // シーン遷移時のチラつき防止用オーバーレイ
    private GameObject overlayCanvasObj;
    private Image overlayImage;

    void Awake()
    {
        // シーン内にGameManagerが一つしか存在しないようにするための一般的な設定（シングルトンパターン）
        // static変数 'instance' に自分自身を代入することで、外部から GameManager.instance でアクセス可能にします。
        // これにより、どのスクリプトからでも GameManager.instance でアクセスできるようになります。
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(gameObject); // シーンを切り替えてもこのオブジェクトを破壊しない
            // これにより、BGMの継続再生やスコアの保持が可能になります。

            // フレームレート設定
            // シューティングゲームとして滑らかな操作感を実現するため、60fpsに固定します。
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
            Destroy(gameObject);
        }

        // 遷移用オーバーレイの準備
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

    // シーン遷移の隙間を埋めるための真っ黒なCanvasを生成する
    private void SetupOverlayCanvas()
    {
        overlayCanvasObj = new GameObject("TransitionOverlayCanvas");
        DontDestroyOnLoad(overlayCanvasObj);

        Canvas canvas = overlayCanvasObj.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvas.sortingOrder = 32767; // 最前面に表示

        CanvasScaler scaler = overlayCanvasObj.AddComponent<CanvasScaler>();
        scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        scaler.referenceResolution = new Vector2(1920, 1080);

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

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        //ゲーム開始時にスコア表示を初期化
        sceneUI?.UpdateScoreValueText(CurrentScore);

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

    void Update()
    {
        if (Time.timeScale > 0f)
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

    // シーン読み込み完了時に呼ばれるイベントハンドラ
    // 引数 scene: 読み込まれたシーンの情報, mode: 読み込みモード（Single/Additive）
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

    //SceneUIManagerの登録
    public void RegisterSceneUI(SceneUIManager uiManager)
    {
        sceneUI = uiManager;
    }

    // シーン名に応じたBGMを再生する
    public void PlayGameBGM(string sceneName)
    {
        if (sceneName == "TitleScene") PlayBGM(titleBgm);
        else if (sceneName == "Stage1") PlayBGM(stage1Bgm);
        else if (sceneName == "ScoreAttack") PlayBGM(scoreAttackBgm);
    }

    // 指定したクリップをBGMとして再生（既に流れている場合は何もしない）
    public void PlayBGM(AudioClip clip)
    {
        if (clip == null) return;
        if (bgmAudioSource.clip == clip && bgmAudioSource.isPlaying) return;

        bgmAudioSource.Stop();
        bgmAudioSource.clip = clip;
        bgmAudioSource.Play();
    }

    // ローディング演出付きでシーン遷移を行う
    // ReactUI側でローディング画面を表示している間に、裏で非同期読み込みを行います。
    public void LoadSceneWithTransition(string sceneName)
    {
        StartCoroutine(LoadSceneAsyncCoroutine(sceneName));
    }

    // 非同期読み込みを行うコルーチン (Coroutine)
    // IEnumerator: コルーチンとして動作させるための戻り値の型です。
    // コルーチンとは、処理を途中で中断（yield）し、次のフレームや指定時間後に再開できる特別な関数です。
    private IEnumerator LoadSceneAsyncCoroutine(string sceneName)
    {
        ResetScore();

        // React側の描画更新を待つために少し待機
        yield return new WaitForSeconds(0.1f);

        // 非同期読み込み開始
        // SceneManager.LoadSceneAsync: Unity標準のAPIです。
        // 現在のシーンを動かしたまま、裏側で次のシーンを読み込みます。
        // 戻り値 AsyncOperation を使うことで、進捗状況の確認や遷移タイミングの制御ができます。
        AsyncOperation asyncLoad = SceneManager.LoadSceneAsync(sceneName);

        // allowSceneActivation = false: 
        // 読み込みが完了しても、自動的に画面を切り替えないようにします。
        // これにより、ロード画面（ReactUI側）を表示し続けることができます。
        asyncLoad.allowSceneActivation = false;

        // 読み込み完了まで待機 (progressは0.9までしか進まない)
        // allowSceneActivationがfalseの間は、progressは0.9で止まります。
        while (asyncLoad.progress < 0.9f)
        {
            // yield return null:
            // ここで処理を中断し、次のフレーム（画面更新）まで待ちます。
            // これがないと無限ループでゲームがフリーズしてしまいます。
            yield return null;
        }

        // ロード完了後、Unity側のオーバーレイを使って滑らかにフェードアウト（暗転）させる
        // これにより、React側の描画負荷に関わらず確実にLoading画面ごと暗転できる
        yield return StartCoroutine(FadeOutOverlay());

        // シーン遷移を許可（ここで一瞬フリーズするが、ユーザーは既にロード画面を見ているので違和感が減る）
        asyncLoad.allowSceneActivation = true;
    }

    // オーバーレイを非表示にするコルーチン
    private IEnumerator HideOverlayCoroutine()
    {
        // ReactUnityの初期化とフェードイン開始を待つ（0.2秒程度）
        // React側は isBlackout=true で開始されるため、この黒幕が消えても下は黒い状態になっている
        yield return new WaitForSeconds(0.2f);
        overlayCanvasObj.SetActive(false);
    }

    // オーバーレイを使ってフェードアウトするコルーチン
    private IEnumerator FadeOutOverlay()
    {
        overlayCanvasObj.SetActive(true);
        overlayImage.color = new Color(0, 0, 0, 0); // 透明から開始

        // Canvasを表示した直後の描画更新を待つ（いきなり黒くならないようにする安全策）
        yield return null;

        float duration = 0.5f;
        float elapsed = 0f;

        while (elapsed < duration)
        {
            elapsed += Time.unscaledDeltaTime; // ポーズ状態でも動くようにunscaledDeltaTimeを使用
            float alpha = Mathf.Clamp01(elapsed / duration);
            overlayImage.color = new Color(0, 0, 0, alpha);
            yield return null;
        }

        overlayImage.color = Color.black; // 確実に真っ黒にする
    }

    //
    public void InitializeGameData()
    {
        gameData = new GameData(); //空の新しいGameDataで上書き
    }

    // 統計データの更新用メソッド
    // 敵を倒した時に呼び出され、総撃破数を加算します。
    public void IncrementEnemiesDefeated()
    {
        gameData.stats.totalEnemiesDefeated++;
    }

    // プレイヤーがダメージを受けた時に呼び出され、総被ダメージ量を加算します。
    public void IncrementDamageTaken(int damage)
    {
        gameData.stats.totalDamageTaken += damage;
    }

    // 弾を発射した時に呼び出され、総発射数を加算します。
    public void IncrementShotsFired()
    {
        gameData.stats.totalShotsFired++;
    }

    //スコアと経過時間をリセット
    public void ResetScore()
    {
        CurrentScore = 0;
        Time.timeScale = 1f; // 時間停止を確実に解除
        // 表示用のキャッシュも初期値に戻しておく（プレイヤー生成までの繋ぎ）
        MaxHP = SettingsManager.GetInitialHP();
        MaxSP = SettingsManager.GetInitialSP();
        CurrentHP = MaxHP;
        CurrentSP = MaxSP;
        // SkipTitleSequence = false; // ここではリセットしない

        IsGameOver = false;
        IsNewHighScore = false;

        isPaused = false; // ポーズ状態もリセット
        sceneUI?.UpdateScoreValueText(CurrentScore);

        timeElapsed = 0;
    }

    //スコアを加算
    public void AddScore(int points)
    {
        CurrentScore += points;
        //UIの更新はSceneUIManagerに依頼
        sceneUI?.UpdateScoreValueText(CurrentScore);
    }

    //HP表示を更新
    public void UpdateHPDisplay(int currentHP)
    {
        CurrentHP = currentHP; // 現在値を保持
        sceneUI?.UpdateHPValueText(currentHP);
    }

    //SP表示を更新
    public void UpdateSPDisplay(int currentSP)
    {
        CurrentSP = currentSP; // 現在値を保持
        sceneUI?.UpdateSPValueText(currentSP);
    }

    //
    // InputAction.CallbackContext: Input Systemから渡される入力情報（押されたボタン、値など）
    private void TogglePause(InputAction.CallbackContext context)
    {
        // タイトル画面ではポーズ機能（BGM停止など）を無効化する
        if (SceneManager.GetActiveScene().name == "TitleScene") return;

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

    void PauseGame()
    {
        // Time.timeScale: ゲーム内の時間の流れの速さ。0にすると停止、1で通常速度、0.5でスローモーションになります。
        Time.timeScale = 0f; //時間を停止
        bgmAudioSource?.Pause(); //BGMを一時停止

        //SceneUIManagerにPausePanelの表示を依頼
        //sceneUI?.ShowPausePanel(); // React側で表示するため無効化
    }

    public void ResumeGame()
    {
        Time.timeScale = 1f;
        bgmAudioSource?.UnPause(); //BGMを再開
        isPaused = false;
    }

    //ゲームオーバー画面を表示
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

        //SceneManagerにGameOverPanelの表示を依頼
        //sceneUI?.ShowGameOverPanel(); // React側で表示するため無効化

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
                //SceneManegerにScoreEntryPanelの表示を依頼
                //sceneUI?.ShowScoreEntryPanel(CurrentScore, isHigherThanHighScore); // React側で表示するため無効化
                IsNewHighScore = isHigherThanHighScore;
            }
        }
    }

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

    //リスタート
    public void RestartGame()
    {
        // ランクインしていれば保存
        SaveScore();

        // React側で決定音を鳴らしているため、ここでは再生しない（重複防止）
        // PlaySubmitSound(); 

        //スコアをリセット
        ResetScore();

        //現在のシーンをもう一度読み込む
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);

        //止まっていて時間を戻す
        Time.timeScale = 1f;
    }

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

    private IEnumerator ReturnToTitleCoroutine()
    {
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

    //カーソル移動効果音再生
    public void PlayCursorMoveSound()
    {
        if (cursorMoveSound != null)
        {
            float seVol = SettingsManager.GetSEVolume() / 100f;
            audioSource.PlayOneShot(cursorMoveSound, seVol);
        }
    }

    //決定等押下効果音再生
    public void PlaySubmitSound()
    {
        if (submitSound != null)
        {
            float seVol = SettingsManager.GetSEVolume() / 100f;
            audioSource.PlayOneShot(submitSound, seVol);
        }
    }

    //キャンセル等押下効果音再生
    public void PlayCancelSound()
    {
        if (cancelSound != null)
        {
            float seVol = SettingsManager.GetSEVolume() / 100f;
            audioSource.PlayOneShot(cancelSound, seVol);
        }
    }

    //プレイヤー射撃音再生
    public void PlayPlayerShootSound()
    {
        if (playerShootSound != null)
        {
            float seVol = SettingsManager.GetSEVolume() / 100f;
            audioSource.PlayOneShot(playerShootSound, seVol);
        }
    }

    //敵射撃音再生
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

    // データをファイルに保存する
    public void SaveGameData()
    {
        SaveSystem.Save(CurrentSaveFileName, gameData);
    }

    // ゲームを終了する
    public void QuitGame()
    {
#if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
#else
        Application.Quit();
#endif
    }

}
