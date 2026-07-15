import { useState, useEffect } from 'react'
import { getDoc } from 'firebase/firestore'
import { db, siteDoc } from '@/lib/firebase'
import { getCategoryContent, type CategoryHighlight } from '@/data/categories-content'

interface CategoryHighlightsData {
  intro: string
  highlights: CategoryHighlight[]
}

function localFallback(categorySlug: string): CategoryHighlightsData {
  const content = getCategoryContent(categorySlug)
  return { intro: content?.intro ?? '', highlights: content?.highlights ?? [] }
}

export function useCategoryHighlights(categorySlug: string): CategoryHighlightsData & { loading: boolean } {
  const fallback = localFallback(categorySlug)
  const [data, setData] = useState<CategoryHighlightsData>(fallback)
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
        const snap = await getDoc(siteDoc('siteContent', `highlights-${categorySlug}`))
        if (!cancelled && snap.exists()) {
          const d = snap.data() as Partial<CategoryHighlightsData>
          if (d.intro && d.highlights?.length) {
            setData({ intro: d.intro, highlights: d.highlights })
          }
        }
      } catch {
        // Sem acesso — mantém o fallback local
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [categorySlug])

  return { ...data, loading }
}
