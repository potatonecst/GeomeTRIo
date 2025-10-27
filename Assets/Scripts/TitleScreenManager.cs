using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TMPro;

public class TitleScreenManager : MonoBehaviour
{
    public GameObject titleText;
    public GameObject pressAnyButtonText;
    public GameObject mainMenuPanel;
    public GameObject firstSelectedButtonMainMenu;
    public GameObject optionsPanel;
    public GameObject firstSelectedComponentOptions;

    [Header("Ranking UI")]
    public GameObject rankingPanel;
    public TextMeshProUGUI stageNameLabel;
    public Button prevStageButton;
    public Button nextStageButton;
    public List<TextMeshProUGUI> rankingScoreTexts;
    public List<TextMeshProUGUI> rankingPlayerNameTexts;

    //ステージ選択用変数
    private List<string> stageNames = new List<string> { "Stage1", "ScoreAttack" };
    private int currentStageIndex = 0;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        pressAnyButtonText.SetActive(true);
        mainMenuPanel.SetActive(false);
    }

    // Update is called once per frame
    void Update()
    {
        if (pressAnyButtonText.activeInHierarchy && Keyboard.current != null && Keyboard.current.anyKey.wasPressedThisFrame)
        {
            GameManager.instance?.PlaySubmitSound(); //効果音再生
            ShowMainMenu(); //メインメニューを表示する
        }
    }

    void ShowMainMenu()
    {
        //UIを切り替え
        titleText.SetActive(true);
        pressAnyButtonText.SetActive(false);
        mainMenuPanel.SetActive(true);

        EventSystem.current.SetSelectedGameObject(firstSelectedButtonMainMenu);
    }

    public void HideMainMenu()
    {
        GameManager.instance?.PlayCancelSound(); //効果音再生
        //処理はコルーチンに依頼
        StartCoroutine(HideMainMenuCoroutine());
    }

    private IEnumerator HideMainMenuCoroutine()
    {
        mainMenuPanel.SetActive(false);
        EventSystem.current.SetSelectedGameObject(null);

        //現在のフレームの描画が終わるまで待つ
        yield return new WaitForEndOfFrame();

        pressAnyButtonText.SetActive(true);
    }

    public void StartScoreAttack()
    {
        GameManager.instance?.PlaySubmitSound(); //効果音再生
        GameManager.instance?.ResetScore();
        SceneManager.LoadScene("ScoreAttack");
    }

    public void ShowRankingPanel()
    {
        GameManager.instance?.PlaySubmitSound(); //効果音再生
        mainMenuPanel.SetActive(false);
        titleText.SetActive(false);
        rankingPanel.SetActive(true);
        currentStageIndex = 0;
        UpdateRankingDisplay();
        EventSystem.current.SetSelectedGameObject(nextStageButton.gameObject);
    }

    public void HideRankingPanel()
    {
        GameManager.instance?.PlayCancelSound(); //効果音再生
        rankingPanel.SetActive(false);
        ShowMainMenu();
    }

    public void UpdateRankingDisplay()
    {
        //現在選択中のステージ名を取得
        string targetStage = stageNames[currentStageIndex];

        stageNameLabel.text = targetStage; //ステージ名を更新

        var allRankings = SaveSystem.LoadGameData().rankings;
        RankingData rankingData = null;
        if (allRankings.ContainsKey(targetStage))
        {
            rankingData = allRankings[targetStage];
        }

        //ランキングデータをUIに反映
        for (int i = 0; i < rankingScoreTexts.Count; ++i)
        {
            if (rankingData != null && i < rankingData.scores.Count)
            {
                //データがある場合はスコアと名前を表示
                rankingScoreTexts[i].text = rankingData.scores[i].score.ToString();
                rankingPlayerNameTexts[i].text = rankingData.scores[i].playerName.ToString();
            }
            else
            {
                //データがない場合は--と表示
                rankingScoreTexts[i].text = "--";
                rankingPlayerNameTexts[i].text = "--";
            }
        }
    }

    public void SelectNextStage()
    {
        GameManager.instance?.PlaySubmitSound(); //効果音再生

        currentStageIndex++;

        //リストの最後を超えた場合、最初に戻る。
        if (currentStageIndex >= stageNames.Count)
        {
            currentStageIndex = 0;
        }

        UpdateRankingDisplay();
    }

    public void SelectPrevStage()
    {
        GameManager.instance?.PlaySubmitSound(); //効果音再生

        currentStageIndex--;

        //リストの最初よりも前になった場合
        if (currentStageIndex < 0)
        {
            currentStageIndex = stageNames.Count - 1;
        }

        UpdateRankingDisplay();
    }

    public void OpenOptions()
    {
        GameManager.instance?.PlaySubmitSound(); //効果音再生

        mainMenuPanel.SetActive(false);
        titleText.SetActive(false);
        optionsPanel.SetActive(true);
        EventSystem.current.SetSelectedGameObject(firstSelectedComponentOptions);
    }

    public void CloseOptions()
    {
        GameManager.instance?.PlayCancelSound(); //効果音再生
        optionsPanel.SetActive(false);
        ShowMainMenu();
    }
}
