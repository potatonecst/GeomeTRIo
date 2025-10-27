using UnityEngine;
using UnityEngine.EventSystems;
using TMPro;

public class UISelectionSound : MonoBehaviour, IMoveHandler
{
    public void OnMove(AxisEventData eventData)
    {
        GameObject selectedObject = EventSystem.current.currentSelectedGameObject;

        if (selectedObject != null && selectedObject.GetComponent<TMP_InputField>() != null)
        {
            return; //文字入力欄では効果音を再生しない
        }
        if (eventData.moveDir != MoveDirection.None)
            {
                //カーソル移動の効果音を再生
                GameManager.instance?.PlayCursorMoveSound();
            }
    }
}
