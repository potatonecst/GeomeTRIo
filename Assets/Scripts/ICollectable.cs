using UnityEngine;

/// <summary>
/// プレイヤーが取得（収集）できるアイテムが実装するインターフェース。
/// 経験値アイテム、回復アイテム、ボム補充アイテムなど、
/// 「拾ったら何か効果があるもの」を統一的に扱うために使用します。
/// </summary>
public interface ICollectable
{
    /// <summary>
    /// アイテムがプレイヤーに拾われた時に実行される処理。
    /// </summary>
    /// <param name="player">アイテムを拾ったプレイヤーのコントローラー</param>
    void OnCollected(PlayerController player);
}
