import { useMemo } from 'react'
import { useI18n } from '@/i18n'
import { localizeDeep } from '@/i18n/localize'
import { getFlowContent, type FlowContent } from '@/data/flows-content'

/** Conteúdo da página de fluxo na língua atual (chaves `flow.<slug>.…`). */
export function useFlowContent(slug: string): FlowContent | undefined {
  const { lang, tf } = useI18n()
  return useMemo(() => {
    const content = getFlowContent(slug)
    return content && lang !== 'pt' ? localizeDeep(content, `flow.${slug}`, tf) : content
  }, [slug, lang, tf])
}
