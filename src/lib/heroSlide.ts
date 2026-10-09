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
