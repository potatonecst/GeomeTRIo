using UnityEngine;

/// <summary>
/// 誘爆（Chain Explosion）が発生するオブジェクトが実装するインターフェース。
/// これを実装しているオブジェクト同士が衝突すると、誘爆処理が発動します。
/// IDamageableと同様に、相手の具体的なクラスを知らなくても「誘爆できる」ことだけを判定するために使用します。
/// </summary>
public interface IChainExplodable
{
    /// <summary>
    /// 誘爆時の処理を実行します。
    /// 弾をばら撒いたり、パルスを出したり、スコアを加算したりする処理をここに記述します。
    /// </summary>
    void OnChainExplosion();
}
