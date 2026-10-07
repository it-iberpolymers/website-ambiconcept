import { storageUrl } from '@/data/local'
import type { Product } from '@/types'

export interface Flow {
  slug: string
  label: string
  match: (p: Product) => boolean
  order?: string[]
}

// Fluxos — mistura frações de resíduo (texto livre em Frações/Fluxo) com linhas de
// negócio que não têm campo próprio (Limpeza Urbana = categoria de slug limpeza-urbana,
// Porta-a-porta = só a gama AMBI TWO, não o AMBI FOUR).
function fracoesText(product: Product): string {
  const spec = product.specifications ?? {}
  return String(spec['Frações'] ?? spec['Fluxo'] ?? '')
}

export const FLOWS: Flow[] = [
  {
    slug: 'vidro',
    label: 'Vidro',
    match: (p) => ['ambi-two-120l', 'ambi-two-140l', 'ambi-2-5', 'ambi-2-7'].includes(p.slug),
    order: ['ambi-two-120l', 'ambi-two-140l', 'ambi-2-5', 'ambi-2-7'],
  },
  {
    slug: 'biorresiduos',
    label: 'Biorresíduos',
    match: (p) => ['lockey-5l', 'lockey-7l', 'ambi-1-0'].includes(p.slug)
      || p.slug.startsWith('ambi-two') || p.slug.startsWith('ambi-four'),
    // ordem pedida para este fluxo, em vez da ordem por defeito do catálogo
    order: ['lockey-5l', 'lockey-7l', 'ambi-two', 'ambi-four', 'ambi-1-0'],
  },
  { slug: 'limpeza-urbana', label: 'Limpeza Urbana', match: (p) => p.category?.slug === 'limpeza-urbana' },
  { slug: 'porta-a-porta', label: 'Porta-a-porta', match: (p) => p.slug.startsWith('ambi-two') },
  { slug: 'oleos-alimentares-usados', label: 'Óleos Alimentares Usados', match: (p) => fracoesText(p).includes('Óleos Alimentares Usados') },
]

// Ordena por posição no `order` do fluxo (prefixo do slug), mantendo a ordem
// relativa original (sort_order) dentro de cada grupo — sort() é estável.
export function sortByFlowOrder(products: Product[], order: string[]): Product[] {
  const rank = (p: Product) => {
    const i = order.findIndex((prefix) => p.slug.startsWith(prefix))
    return i === -1 ? order.length : i
  }
  return [...products].sort((a, b) => rank(a) - rank(b))
}

// Capas alternativas que só aparecem com um fluxo específico ativo — fora
// dessa situação, o produto mostra sempre a sua capa por defeito.
const FLOW_COVER_OVERRIDES: Record<string, Record<string, string>> = {
  'Óleos Alimentares Usados': {
    'ambi-1-0': storageUrl('produtos/ambi_1.0/fotos/digital/03_galeria_ambi1_0_0002_ambi1_0_oau1.png'),
  },
  Vidro: {
    'ambi-2-7': storageUrl('produtos/ambi_2.7/fotos/digital/08_ambi2_7_volteador.png'),
    'ambi-2-5': storageUrl('produtos/ambi_2.5/fotos/digital/09_ambi2_5_volteador.png'),
  },
}

export function cardCoverImage(product: Product, activeFlow: string): string | undefined {
  const override = FLOW_COVER_OVERRIDES[activeFlow]?.[product.slug]
  if (override) return override
  return product.cover_image
}
