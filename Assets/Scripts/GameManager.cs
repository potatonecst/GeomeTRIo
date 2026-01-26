using UnityEngine;
using TMPro; //TextMesh Pro
using UnityEngine.SceneManagement;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;
using System.Linq;
using System.Collections.Generic;

[RequireComponent(typeof(AudioSource))]
public class GameManager : MonoBehaviour
{
    //staticなインスタンス。これにより、他のどのスクリプトからでも簡単にアクセスできる。
    public static GameManager instance;

    //セーブデータ
    private GameData gameData;
    public GameData Data => gameData; // 外部から読み書きするためのプロパティ

    // 現在のシーンのUI管理役を保存しておくための箱
    private SceneUIManager sceneUI;

    //ランキング関連
    public int rankingLimit = 5; //何位まで保存するか

    //スコア関連
    private int score = 0;

    //ポーズ関連
    private bool isPaused = false;
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

    void Awake()
    {
        //シーン内にGameManagerが一つしか存在しないようにするための一般的な設定（シングルトン）
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(gameObject); //シーンを切り替えてもこのオブジェクトを破壊しない

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

        //Pause時の入力システムの準備
        playerInputActions = new PlayerInputActions();
        //UIマップのPauseアクションが実行されたら、TogglePause関数を呼び出す
        playerInputActions.UI.Pause.performed += TogglePause;

        //自分についているAudioSourceを取得
        audioSource = GetComponent<AudioSource>();

        // BGM用のAudioSourceを動的に追加（SE用とは分けるため）
        bgmAudioSource = gameObject.AddComponent<AudioSource>();
        bgmAudioSource.loop = true;
        bgmAudioSource.playOnAwake = false;
    }

    private void OnEnable()
    {
        playerInputActions.UI.Enable();
        SceneManager.sceneLoaded += OnSceneLoaded;
    }

    private void OnDisable()
    {
        playerInputActions?.UI.Disable();
        SceneManager.sceneLoaded -= OnSceneLoaded;
    }

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        //ゲーム開始時にスコア表示を初期化
        sceneUI?.UpdateScoreValueText(score);

        // 現在のシーン名に合わせてBGMを再生（デバッグ起動時なども考慮）
        string currentScene = SceneManager.GetActiveScene().name;
        PlayGameBGM(currentScene);
    }

    void Update()
    {
        if (Time.timeScale > 0f)
        {
            timeElapsed += Time.deltaTime;
        }
    }

    // シーン読み込み完了時に呼ばれるイベントハンドラ
    private void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        PlayGameBGM(scene.name);
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

    //
    public void InitializeGameData()
    {
        gameData = new GameData(); //空の新しいGameDataで上書き
    }

    //スコアと経過時間をリセット
    public void ResetScore()
    {
        score = 0;
        sceneUI?.UpdateScoreValueText(score);

        timeElapsed = 0;
    }

    //スコアを加算
    public void AddScore(int points)
    {
        score += points;
        //UIの更新はSceneUIManagerに依頼
        sceneUI?.UpdateScoreValueText(score);
    }

    //HP表示を更新
    public void UpdateHPDisplay(int currentHP)
    {
        sceneUI?.UpdateHPValueText(currentHP);
    }

    //SP表示を更新
    public void UpdateSPDisplay(int currentSP)
    {
        sceneUI?.UpdateSPValueText(currentSP);
    }

    //
    private void TogglePause(InputAction.CallbackContext context)
    {
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
        Time.timeScale = 0f; //時間を停止
        bgmAudioSource?.Pause(); //BGMを一時停止

        //SceneUIManagerにPausePanelの表示を依頼
        sceneUI?.ShowPausePanel();
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

        //現在のステージのシーン名を取得
        string currentSceneName = SceneManager.GetActiveScene().name;

        List<ScoreRecord> currentScores = null;
        if (currentSceneName == "Stage1") currentScores = gameData.stage1Scores;
        else if (currentSceneName == "ScoreAttack") currentScores = gameData.scoreAttackScores;

        //SceneManagerにGameOverPanelの表示を依頼
        sceneUI?.ShowGameOverPanel();

        if (currentScores != null)
        {
            // 現在の設定（HP, SP, AutoFire）に一致するスコアだけを抽出してソート
            var filteredScores = currentScores
                .Where(s => s.hp == gameData.settings.initialHp &&
                            s.sp == gameData.settings.initialSp &&
                            s.autoFire == gameData.settings.autoFireEnabled)
                .OrderByDescending(s => s.score)
                .ToList();

            // その設定でのランキングに空きがあるか
            bool hasRankingSlot = filteredScores.Count < rankingLimit;
            // その設定での最下位よりも高スコアか
            bool isHigherThanLastPlace = filteredScores.Count > 0 && score > filteredScores.Last().score;

            if (hasRankingSlot || isHigherThanLastPlace)
            {
                // その設定でのハイスコア更新か
                bool isHigherThanHighScore = filteredScores.Count == 0 || score > filteredScores.First().score;
                //SceneManegerにScoreEntryPanelの表示を依頼
                sceneUI?.ShowScoreEntryPanel(score, isHigherThanHighScore);
            }
        }
    }

    public void SaveScore()
    {
        PlaySubmitSound(); //効果音再生

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
                score = score,
                date = System.DateTime.Now.ToString("yyyy/MM/dd HH:mm"),
                hp = currentInitialHp,
                sp = currentInitialSp,
                autoFire = currentAutoFire
            };
            currentScores.Add(newRecord);

            // 「全く同じ条件」のデータだけを抽出してソート
            var sameConditionScores = currentScores
                .Where(s => s.hp == currentInitialHp && s.sp == currentInitialSp && s.autoFire == currentAutoFire)
                .OrderByDescending(s => s.score)
                .ToList();

            // その条件の中で5位から漏れたものを削除
            if (sameConditionScores.Count > rankingLimit)
            {
                var scoresToRemove = sameConditionScores.Skip(rankingLimit).ToList(); // 5位以下のスコアをリストアップ（上位5つのスコアをスキップ）
                foreach (var oldScore in scoresToRemove)
                {
                    currentScores.Remove(oldScore);
                }
            }

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
        PlaySubmitSound(); //効果音再生

        //スコアをリセット
        ResetScore();

        //現在のシーンをもう一度読み込む
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);

        //止まっていて時間を戻す
        Time.timeScale = 1f;
    }

    public void ReturnToTitle()
    {
        PlayCancelSound(); //効果音再生

        //止まっていた時間を戻す
        Time.timeScale = 1f;

        //タイトル画面を読み込む
        SceneManager.LoadScene("TitleScene");
    }

    //カーソル移動効果音再生
    public void PlayCursorMoveSound()
    {
        if (cursorMoveSound != null)
        {
            audioSource.PlayOneShot(cursorMoveSound);
        }
    }

    //決定等押下効果音再生
    public void PlaySubmitSound()
    {
        if (submitSound != null)
        {
            audioSource.PlayOneShot(submitSound);
        }
    }

    //キャンセル等押下効果音再生
    public void PlayCancelSound()
    {
        if (cancelSound != null)
        {
            audioSource.PlayOneShot(cancelSound);
        }
    }

    //プレイヤー射撃音再生
    public void PlayPlayerShootSound()
    {
        if (playerShootSound != null)
        {
            audioSource.PlayOneShot(playerShootSound);
        }
    }

    //敵射撃音再生
    public void PlayEnemyShootSound()
    {
        if (enemyShootSound != null)
        {
            audioSource.PlayOneShot(enemyShootSound);
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
