using UnityEngine;

/// <summary>
/// 弾や投射物（Projectile）が実装するインターフェース。
/// 弾のダメージ量や、ヒット時の挙動（消滅など）を統一的に扱うために使用します。
/// 将来的に「弾を打ち消す」「反射する」といった機能を実装する際に役立ちます。
/// </summary>
public interface IProjectile
{
    /// <summary>
    /// この弾が与えるダメージ量。
    /// </summary>
    int Damage { get; }

    /// <summary>
    /// この弾が敵の弾かどうか。trueならボム等で消去対象になります。
    /// </summary>
    bool IsEnemy { get; }

    /// <summary>
    /// 弾が何かに当たった時（または打ち消された時）の処理。
    /// 基本的には Destroy(gameObject) で自分自身を消滅させます。
    /// </summary>
    void OnHit();
}
