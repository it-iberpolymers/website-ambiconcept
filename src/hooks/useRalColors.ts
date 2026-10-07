import { useState, useEffect } from 'react'
import { getDoc } from 'firebase/firestore'
import { db, siteDoc } from '@/lib/firebase'
import { slugVariants } from '@/lib/categorySlug'
import { DEFAULT_RAL_COLORS, type RalColor } from '@/data/ral-colors'

export function useRalColors(categorySlug: string): { colors: RalColor[]; loading: boolean } {
  const fallback = DEFAULT_RAL_COLORS[categorySlug] ?? []
  const [colors, setColors] = useState<RalColor[]>(fallback)
  const [loading, setLoading] = useState(!!db)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    ;(async () => {
      try {
        // tenta o id atual e depois o antigo (antes da migração dos dados)
        let snap = await getDoc(siteDoc('siteContent', `ral-${slugVariants(categorySlug)[0]}`))
        const legacy = slugVariants(categorySlug)[1]
        if (!snap.exists() && legacy) snap = await getDoc(siteDoc('siteContent', `ral-${legacy}`))
        if (!cancelled && snap.exists()) {
          const data = snap.data() as { colors?: RalColor[] }
          if (data.colors?.length) setColors(data.colors)
        }
      } catch {
        // Sem acesso — mantém o fallback local
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [categorySlug])

  return { colors, loading }
}
