import { storageUrl } from '@/data/local'
import type { HeroSlide } from '@/types'

// Render do AMBI 2.7 que o slider mostra quando o slide não tem imagem própria
export const HERO_RENDER = storageUrl('produtos/ambi_2.7/fotos/digital/00_capa.png')

// imagem do slide inicial antes do redesenho; conta como "sem imagem própria"
const LEGACY_SLIDE_IMAGE = '/assets/hero-ecoponto-ambi-27.webp'

/** imagem própria do slide, ou '' quando usa o render */
export function slideOwnImage(slide: Pick<HeroSlide, 'image_url'>): string {
  return slide.image_url && slide.image_url !== LEGACY_SLIDE_IMAGE ? slide.image_url : ''
}

// Cores que o admin pode dar às partes destacadas do título (fundo escuro do slider)
export const HIGHLIGHT_COLORS = [
  { value: '#95D855', label: 'Verde' },
  { value: '#FFFFFF', label: 'Branco' },
  { value: '#FFC72C', label: 'Amarelo' },
  { value: '#FF8A3D', label: 'Laranja' },
] as const

/** Parte a parte do título: o texto entre *asteriscos* vem marcado como destaque. */
export function titleParts(title: string): Array<{ text: string; highlight: boolean }> {
  return title
    .split(/\*([^*]+)\*/)
    .map((text, i) => ({ text, highlight: i % 2 === 1 }))
    .filter((p) => p.text)
}
