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
    private AudioSource audioSource;
    private AudioSource bgmAudioSource;

    void Awake()
    {
        //シーン内にGameManagerが一つしか存在しないようにするための一般的な設定（シングルトン）
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(gameObject); //シーンを切り替えてもこのオブジェクトを破壊しない

            //セーブデータをロード
            gameData = SaveSystem.LoadGameData();
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
    }

    private void OnEnable()
    {
        playerInputActions.UI.Enable();
    }

    private void OnDisable()
    {
        playerInputActions?.UI.Disable();
    }

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        //ゲーム開始時にスコア表示を初期化
        sceneUI?.UpdateScoreValueText(score);
    }

    void Update()
    {
        if (Time.timeScale > 0f)
        {
            timeElapsed += Time.deltaTime;
        }
    }

    //SceneUIManagerの登録
    public void RegisterSceneUI(SceneUIManager uiManager)
    {
        sceneUI = uiManager;
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

        RankingData currentRanking;
        if (!gameData.rankings.ContainsKey(currentSceneName))
        {
            //ランキングがない場合
            currentRanking = new RankingData();
            gameData.rankings.Add(currentSceneName, currentRanking);
        }
        else
        {
            currentRanking = gameData.rankings[currentSceneName];
        }

        //SceneManagerにGameOverPanelの表示を依頼
        sceneUI?.ShowGameOverPanel();

        //ランキングに空きがあるかどうか
        bool hasRankingSlot = currentRanking.scores.Count < rankingLimit;

        //ランキングの最下位よりも高スコアかどうか
        bool isHigherThanLastPlace = currentRanking.scores.Count > 0 && score > currentRanking.scores.Last().score;

        if (hasRankingSlot || isHigherThanLastPlace)
        {
            //ランキングデータの個数が0の場合と、ハイスコアを更新した場合にtrue
            bool isHigherThanHighScore = currentRanking.scores.Count == 0 || score > currentRanking.scores.First().score;
            //SceneManegerにScoreEntryPanelの表示を依頼
            sceneUI?.ShowScoreEntryPanel(score, isHigherThanHighScore);
        }
    }

    public void SaveScore()
    {
        PlaySubmitSound(); //効果音再生

        string currentSceneName = SceneManager.GetActiveScene().name;

        RankingData currentRanking = gameData.rankings[currentSceneName];

        //ランキングに今回の結果を追加
        currentRanking.scores.Add(new ScoreEntry { score = score, playerName = sceneUI.playerNameInputField.text });

        //スコアの高い順に並べ替え
        currentRanking.scores = currentRanking.scores.OrderByDescending(s => s.score).ToList();

        //rankingLimitを超過した分を削除
        if (currentRanking.scores.Count > rankingLimit)
        {
            currentRanking.scores.RemoveRange(rankingLimit, currentRanking.scores.Count - rankingLimit);
        }

        //セーブ
        SaveSystem.SaveGameData(gameData);

        //デフォルトプレイヤーネームに設定
        if (sceneUI.asDefaultToggle.isOn)
        {
            SettingsManager.SetPlayerName(sceneUI.playerNameInputField.text);
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
    public void RegisterBGMAudioSource(AudioSource source)
    {
        bgmAudioSource = source;
    }

}
