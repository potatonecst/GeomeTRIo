using UnityEngine;

public class DestroyZone : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D other)
    {
        //入ってきた相手を破壊する
        Destroy(other.gameObject);
    }
}
