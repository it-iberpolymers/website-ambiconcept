import { auth } from '@/lib/firebase'
import type { ContentTranslations } from '@/types'

type Texts = Record<string, string | undefined>

export const TRANSLATION_FAILED =
  'Guardado, mas a tradução automática falhou: nas outras línguas o site mostra o texto em português. ' +
  'Volte a guardar para tentar de novo (o motivo está na consola do browser).'

const filled = (texts: Texts) => Object.fromEntries(Object.entries(texts).filter(([, v]) => v?.trim())) as Record<string, string>

/**
 * Traduções a guardar com o conteúdo (campo `i18n`): se os textos em português não mudaram desde a
 * última tradução, reaproveita-a; senão pede-as a /api/translate (api/translate.ts).
 * null = a tradução falhou: guarda-se na mesma e as outras línguas mostram o português.
 */
export async function translationsFor(
  texts: Texts,
  previousTexts?: Texts,
  previous?: ContentTranslations | null,
): Promise<ContentTranslations | null> {
  const current = filled(texts)
  if (previous && previousTexts && JSON.stringify(filled(previousTexts)) === JSON.stringify(current)) return previous
  if (Object.keys(current).length === 0) return {}
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await auth?.currentUser?.getIdToken()}` },
      body: JSON.stringify({ texts: current }),
    })
    if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? res.statusText)
    return await res.json()
  } catch (e) {
    console.error('Tradução automática falhou:', e)
    return null
  }
}
