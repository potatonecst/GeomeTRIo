using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using System.IO;

public class OptionsManager : MonoBehaviour
{
    [Header("UI Components")]
    public GameObject optionsPanel;
    public Slider hpSlider;
    public TextMeshProUGUI hpValueText;
    public Slider spSlider;
    public TextMeshProUGUI spValueText;
    public Toggle autofireToggle;
    public GameObject playerNameButton;
    public TextMeshProUGUI playerNameTextOnButton;
    public GameObject playerNameInputPanel;
    public TMP_InputField playerNameInputField;
    public GameObject deleteSaveDataButton;
    public GameObject confirmDeleteSaveDataPanel;
    public GameObject cancelButton;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        //各値の初期設定
        hpSlider.value = SettingsManager.GetInitialHP();
        spSlider.value = SettingsManager.GetInitialSP();

        //初期値をテキストに表示
        UpdateHPText(hpSlider.value);
        UpdateSPText(spSlider.value);

        //スライダーの値が変更された場合に呼び出す関数を登録
        hpSlider.onValueChanged.AddListener(UpdateHPText);
        spSlider.onValueChanged.AddListener(UpdateSPText);

        //オート連射設定を読み込み
        autofireToggle.isOn = SettingsManager.IsAutofireEnabled();

        //プレイヤー名を読み込み
        playerNameTextOnButton.text = SettingsManager.GetPlayerName();

        //トグルが押された場合に呼び出す関数
        autofireToggle.onValueChanged.AddListener(SetAutofire);
    }

    public void UpdateHPText(float value)
    {
        hpValueText.text = ((int)value).ToString();
        SettingsManager.SetInitialHP((int)value);
    }

    public void UpdateSPText(float value)
    {
        spValueText.text = ((int)value).ToString();
        SettingsManager.SetInitialSP((int)value);
    }

    public void SetAutofire(bool isEnabled)
    {
        GameManager.instance?.PlaySubmitSound(); //効果音再生
        SettingsManager.SetAutofire(isEnabled);
    }

    public void OpenNameInputPanel()
    {
        GameManager.instance?.PlaySubmitSound(); //効果音再生
        optionsPanel.SetActive(false);
        playerNameInputPanel.SetActive(true);

        //現在のプレイヤーネームを入力欄に反映
        playerNameInputField.text = SettingsManager.GetPlayerName();

        //入力欄にフォーカス
        EventSystem.current.SetSelectedGameObject(playerNameInputField.gameObject);
    }

    public void CloseNameInputPanel()
    {
        playerNameInputPanel.SetActive(false);
        optionsPanel.SetActive(true);
        EventSystem.current.SetSelectedGameObject(playerNameButton);
    }

    public void OnPressedCloseNameInputPanel()
    {
        GameManager.instance?.PlayCancelSound(); //効果音再生
        CloseNameInputPanel();
    }

    public void ConfirmNameChange()
    {
        GameManager.instance?.PlaySubmitSound(); //効果音再生
        string newName = playerNameInputField.text;
        SettingsManager.SetPlayerName(newName); //新しいプレイヤーネームを保存
        playerNameTextOnButton.text = newName;
        CloseNameInputPanel();
    }

    public void ShowConfirmDeleteSaveDataPanel()
    {
        GameManager.instance?.PlaySubmitSound(); //効果音再生
        confirmDeleteSaveDataPanel.SetActive(true);
        optionsPanel.SetActive(false);
        EventSystem.current.SetSelectedGameObject(cancelButton);
    }

    public void HideConfirmDeleteSaveDataPanel()
    {
        GameManager.instance?.PlayCancelSound(); //効果音再生
        confirmDeleteSaveDataPanel.SetActive(false);
        optionsPanel.SetActive(true);
        EventSystem.current.SetSelectedGameObject(deleteSaveDataButton);
    }

    public void DeleteGameData()
    {
        GameManager.instance?.PlaySubmitSound(); //効果音再生
        string fileName = GameManager.instance.CurrentSaveFileName;
        SaveSystem.DeleteSaveData(fileName);
        GameManager.instance?.InitializeGameData();
        //PlayerPrefs.DeleteAll();
        SceneManager.LoadScene("TitleScene");
    }
}
