import { useState, useEffect } from 'react'
import { getDoc } from 'firebase/firestore'
import { db, siteDoc } from '@/lib/firebase'
import { slugVariants } from '@/lib/categorySlug'
import { useI18n } from '@/i18n'
import { localizeDeep } from '@/i18n/localize'
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
  const { lang, tf } = useI18n()
  const fallback = localFallback(categorySlug)
  const [rawData, setData] = useState<CategoryHighlightsData>(fallback)
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
        let snap = await getDoc(siteDoc('siteContent', `highlights-${slugVariants(categorySlug)[0]}`))
        const legacy = slugVariants(categorySlug)[1]
        if (!snap.exists() && legacy) snap = await getDoc(siteDoc('siteContent', `highlights-${legacy}`))
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

  // língua atual: chaves `cat.<slug>.intro` e `cat.<slug>.highlights.<i>.…`
  const data = lang === 'pt' ? rawData : localizeDeep(rawData, `cat.${categorySlug}`, tf)

  return { ...data, loading }
}
