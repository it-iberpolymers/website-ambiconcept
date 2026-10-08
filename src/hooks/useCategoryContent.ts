import { useMemo } from 'react'
import { useI18n } from '@/i18n'
import { localizeDeep } from '@/i18n/localize'
import { getCategoryContent, type CategoryContent } from '@/data/categories-content'

/** Conteúdo da página de categoria na língua atual (chaves `cat.<slug>.…`). */
export function useCategoryContent(slug: string): CategoryContent | undefined {
  const { lang, tf } = useI18n()
  return useMemo(() => {
    const content = getCategoryContent(slug)
    return content && lang !== 'pt' ? localizeDeep(content, `cat.${slug}`, tf) : content
  }, [slug, lang, tf])
}
