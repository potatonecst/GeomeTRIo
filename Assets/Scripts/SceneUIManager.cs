using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.EventSystems;

// ゲームシーン内のUI（HUD、ポーズ画面、ゲームオーバー画面など）を管理するクラス
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
        // このStartメソッドは、このスクリプトがアタッチされているシーン（Stage1など）が
        // ロードされ、ゲーム内に登場した瞬間にUnityによって自動的に実行されます。
        // GameManagerに自分自身を登録する
        // これにより、GameManagerからUIの更新メソッド（UpdateScoreValueTextなど）を呼び出せるようになります。
        // 'this' はこのクラスのインスタンス（SceneUIManagerがついているオブジェクト自身）を指します。
        // '?.' (Null条件演算子): GameManager.instance が null でない場合のみ実行します。エラー防止用です。
        GameManager.instance?.RegisterSceneUI(this);
    }

    // Update is called once per frame
    void Update()
    {

    }

    public void UpdateScoreValueText(int newScore)
    {
        // ToString(): 数値(int)を文字列(string)に変換します。UIのテキストには文字列しか代入できないため必須です。
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
        // EventSystem: UIのナビゲーション（フォーカス移動）を管理するシステム。
        // SetSelectedGameObject: 指定したオブジェクトを「選択状態」にします。これによりコントローラーやキーボードですぐに操作可能になります。
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
