using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.EventSystems;

public class SceneUIManager : MonoBehaviour
{
    //UI部品への参照
    [Header("HUD")]
    public TextMeshProUGUI scoreValueText;
    public TextMeshProUGUI hpValueText;
    public TextMeshProUGUI spValueText;

    [Header("Game Over UI")]
    public GameObject gameOverPanel;
    public Button restartButton;
    public Button returnToTitleButton;

    [Header("Score Entry UI")]
    public GameObject scoreEntryPanel;
    public TextMeshProUGUI scoreEntryPanelTitleText;
    public TextMeshProUGUI finalScoreText;
    public TMP_InputField playerNameInputField;
    public Toggle asDefaultToggle;

    [Header("Pause UI")]
    public GameObject pausePanel;
    public GameObject firstSelectedButtonPause;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        GameManager.instance?.RegisterSceneUI(this);

        Camera sceneCamera = Camera.main;
        if (sceneCamera != null)
        {
            //MainCameraからAudioSourceを取得
            AudioSource bgmSource = sceneCamera.GetComponent<AudioSource>();

            if (bgmSource != null)
            {
                GameManager.instance?.RegisterBGMAudioSource(bgmSource);
            }
        }
    }

    // Update is called once per frame
    void Update()
    {

    }

    public void UpdateScoreValueText(int newScore)
    {
        scoreValueText.text = newScore.ToString();
    }

    public void UpdateHPValueText(int newHP)
    {
        hpValueText.text = newHP.ToString();
    }

    public void UpdateSPValueText(int newSP)
    {
        spValueText.text = newSP.ToString();
    }

    public void ShowGameOverPanel()
    {
        gameOverPanel.SetActive(true);

        //リスタートボタンを選択
        EventSystem.current.SetSelectedGameObject(restartButton.gameObject);
    }

    public void ShowScoreEntryPanel(int score, bool isHigherThanHighScore)
    {
        scoreEntryPanel?.SetActive(true);
        restartButton.interactable = false;
        returnToTitleButton.interactable = false;

        scoreEntryPanelTitleText.text = isHigherThanHighScore ? "NEW HIGH SCORE!" : "RANK IN!";

        finalScoreText.text = "SCORE: " + score;

        //SettingsManagerからデフォルトプレイヤーネームを取得
        playerNameInputField.text = SettingsManager.GetPlayerName();

        //入力欄にフォーカスを当てる
        EventSystem.current.SetSelectedGameObject(playerNameInputField.gameObject);
    }

    public void HideScoreEntryPanel()
    {
        GameManager.instance?.SaveScore();
        scoreEntryPanel.SetActive(false);
        restartButton.interactable = true;
        returnToTitleButton.interactable = true;
        EventSystem.current.SetSelectedGameObject(restartButton.gameObject);
    }

    public void ShowPausePanel()
    {
        pausePanel.SetActive(true);

        //フォーカスをポーズ画面の最初のボタンに当てる
        EventSystem.current.SetSelectedGameObject(firstSelectedButtonPause);
    }

    private void HidePausePanel()
    {
        pausePanel.SetActive(false);

        //フォーカスをゲームに戻す
        EventSystem.current.SetSelectedGameObject(null);
    }

    //Restartボタンが押された場合
    public void OnRestartButtonPressed()
    {
        GameManager.instance?.RestartGame();
    }

    //Return to Titleボタンが押された場合
    public void OnReturnToTitleButtonPressed()
    {
        GameManager.instance?.ReturnToTitle();
    }

    //Resumeボタンが押された場合
    public void OnResumeButtonPressed()
    {
        GameManager.instance?.PlaySubmitSound(); //効果音再生
        HidePausePanel();
        GameManager.instance?.ResumeGame();
    }
}
