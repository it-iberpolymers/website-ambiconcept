import type { CSSProperties } from 'react'

// Ajuste fino por produto — alinha a base (translateY) e/ou reduz o tamanho
// (scale) de fotos com menos margem vazia interna do que as outras. Partilhado
// entre /produtos e /produtos?categoria=X para não desalinhar os dois.
export const CARD_IMG_ADJUST: Record<string, { y?: number; scale?: number }> = {
  'ambi-3-7': { y: 1 },
  'ambi-1-0': { scale: 0.85, y: 10 },
  'ambi-urban': { y: -2 },
}

export function cardImgStyle(slug: string): CSSProperties | undefined {
  const adjust = CARD_IMG_ADJUST[slug]
  if (!adjust) return undefined
  const style: Record<string, string> = {}
  if (adjust.y) style['--pc-adjust-y'] = `${adjust.y}px`
  if (adjust.scale) style['--pc-adjust-scale'] = `${adjust.scale}`
  return style as CSSProperties
}
