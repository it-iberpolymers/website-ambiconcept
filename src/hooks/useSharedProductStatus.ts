import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { SHARED_PRODUCT_IDS } from '@/data/sharedProductMap'

/**
 * Lê (só leitura) a coleção 'products' partilhada com o configurador de
 * propostas e o kit digital, para saber se um produto do site foi
 * descontinuado nessa coleção. Produtos sem mapeamento em
 * SHARED_PRODUCT_IDS são sempre considerados ativos.
 */
export function useSharedProductStatus(): {
  isDiscontinued: (slug: string) => boolean
  loading: boolean
} {
  const [statusById, setStatusById] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(!!db)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return
    }

    let cancelled = false

    ;(async () => {
      try {
        const snap = await getDocs(collection(db!, 'products'))
        if (!cancelled) {
          const map: Record<string, string> = {}
          snap.docs.forEach((d) => { map[d.id] = (d.data().status as string) ?? '' })
          setStatusById(map)
        }
      } catch {
        // Sem acesso à coleção partilhada — trata todos os produtos como ativos
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [])

  function isDiscontinued(slug: string): boolean {
    const ids = SHARED_PRODUCT_IDS[slug]
    if (!ids || ids.length === 0) return false
    return ids.every((id) => statusById[id] !== undefined && statusById[id] !== 'ativo')
  }

  return { isDiscontinued, loading }
}
