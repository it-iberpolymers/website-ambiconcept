import { useSearchParams, Link } from 'react-router-dom'
import { useProducts, useProductCategories } from '@/hooks/useProducts'
import { storageUrl } from '@/data/local'
import { cardImgStyle } from '@/lib/cardImgStyle'
import type { Product } from '@/types'
import PageSeo from '@/components/seo/PageSeo'
import '@/styles/products-catalog.css'

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

function cardCoverImage(product: Product, activeFlow: string): string | undefined {
  const override = FLOW_COVER_OVERRIDES[activeFlow]?.[product.slug]
  if (override) return override
  return product.cover_image
}

// Fluxos — mistura frações de resíduo (texto livre em Frações/Fluxo) com linhas de
// negócio que não têm campo próprio (Limpeza Urbana = categoria Papeleiras,
// Porta-a-porta = só a gama AMBI TWO, não o AMBI FOUR).
function fracoesText(product: Product): string {
  const spec = product.specifications ?? {}
  return String(spec['Frações'] ?? spec['Fluxo'] ?? '')
}

const FLOWS: { label: string; match: (p: Product) => boolean; order?: string[] }[] = [
  {
    label: 'Vidro',
    match: (p) => ['ambi-two-120l', 'ambi-two-140l', 'ambi-2-5', 'ambi-2-7'].includes(p.slug),
    order: ['ambi-two-120l', 'ambi-two-140l', 'ambi-2-5', 'ambi-2-7'],
  },
  {
    label: 'Biorresíduos',
    match: (p) => ['lockey-5l', 'lockey-7l', 'ambi-1-0'].includes(p.slug)
      || p.slug.startsWith('ambi-two') || p.slug.startsWith('ambi-four'),
    // ordem pedida para este fluxo, em vez da ordem por defeito do catálogo
    order: ['lockey-5l', 'lockey-7l', 'ambi-two', 'ambi-four', 'ambi-1-0'],
  },
  { label: 'Limpeza Urbana', match: (p) => p.category?.slug === 'papeleiras' },
  { label: 'Porta-a-porta', match: (p) => p.slug.startsWith('ambi-two') },
  { label: 'Óleos Alimentares Usados', match: (p) => fracoesText(p).includes('Óleos Alimentares Usados') },
]

// Ordena por posição no `order` do fluxo (prefixo do slug), mantendo a ordem
// relativa original (sort_order) dentro de cada grupo — sort() é estável.
function sortByFlowOrder(products: Product[], order: string[]): Product[] {
  const rank = (p: Product) => {
    const i = order.findIndex((prefix) => p.slug.startsWith(prefix))
    return i === -1 ? order.length : i
  }
  return [...products].sort((a, b) => rank(a) - rank(b))
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('categoria') ?? ''
  const activeFlow = searchParams.get('fluxo') ?? ''

  const { categories: hookCategories } = useProductCategories()
  // Fetch all products for sidebar counts, then filter client-side for the grid
  const { products: allProducts, loading } = useProducts()

  // Regra: nunca os dois filtros ativos ao mesmo tempo — escolher um limpa o outro.
  function selectCategory(slug: string) {
    const next = new URLSearchParams(searchParams)
    if (slug) next.set('categoria', slug)
    else next.delete('categoria')
    next.delete('fluxo')
    setSearchParams(next)
  }

  function selectFlow(flow: string) {
    const next = new URLSearchParams(searchParams)
    if (flow) next.set('fluxo', flow)
    else next.delete('fluxo')
    next.delete('categoria')
    setSearchParams(next)
  }

  const activeFlowObj = FLOWS.find((f) => f.label === activeFlow)

  const filteredProducts = allProducts.filter((p) =>
    (!activeCategory || p.category?.slug === activeCategory) &&
    (!activeFlowObj || activeFlowObj.match(p))
  )
  const products = activeFlowObj?.order ? sortByFlowOrder(filteredProducts, activeFlowObj.order) : filteredProducts

  const totalCount = allProducts.length

  // Uma passagem por categoria/fluxo (em vez de recalcular no filter e outra vez no render).
  const categoryCounts = new Map(hookCategories.map((c) => [c.slug, allProducts.filter((p) => p.category?.slug === c.slug).length]))
  const flowCounts = new Map(FLOWS.map((f) => [f.label, allProducts.filter((p) => f.match(p)).length]))

  const activeCategoryObj = hookCategories.find((c) => c.slug === activeCategory)
  const seoTitle = activeCategoryObj
    ? `${activeCategoryObj.name} — Produtos | Ambiconcept`
    : 'Produtos — Catálogo Completo | Ambiconcept'
  const seoDescription = activeCategoryObj
    ? `${activeCategoryObj.description} Veja todos os modelos disponíveis.`
    : 'Catálogo completo de contentores e ecopontos Ambiconcept para municípios e operadores RSU. Carga vertical, carga traseira, porta-a-porta, Smart Box e mais.'

  return (
    <div className="min-h-screen bg-white">

      <PageSeo
        title={seoTitle}
        description={seoDescription}
        path={activeCategory ? `/produtos?categoria=${activeCategory}` : '/produtos'}
      />

      {/* Header */}
      <div className="bg-white pt-[110px] pb-[48px] text-center">
        <div className="max-w-[1140px] mx-auto px-5">
          <nav aria-label="Localização" className="flex items-center justify-center gap-1.5 text-[11px] text-[#303f49]/35 mb-8">
            <Link to="/" className="hover:text-[#7ab929] transition-colors">Início</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#303f49]/60">Produtos</span>
          </nav>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7ab929] mb-3">Catálogo</p>
          <h1 className="text-[42px] md:text-[52px] font-semibold uppercase text-[#303f49] leading-none font-['Poppins',sans-serif]">
            Produtos
          </h1>
          <p className="mt-4 text-[#303f49]/55 max-w-xl mx-auto text-[15px]">
            Mais variedade, mais personalização, mais soluções<br />para a gestão de resíduos urbanos.
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-[1140px] mx-auto px-5 py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12">

          {/* Sidebar */}
          <aside>
            <span className="pc-sidebar-label">Categorias</span>
            <nav className="pc-sidebar flex flex-col gap-1" aria-label="Filtrar por categoria">
              <button
                type="button"
                onClick={() => selectCategory('')}
                className={`pc-filter-btn${!activeCategory && !activeFlow ? ' pc-filter-btn--active' : ''}`}
              >
                Todas
                <span className="pc-filter-count">({totalCount})</span>
              </button>
              {hookCategories.filter((cat) => (categoryCounts.get(cat.slug) ?? 0) > 0).map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => selectCategory(cat.slug)}
                  className={`pc-filter-btn${activeCategory === cat.slug ? ' pc-filter-btn--active' : ''}`}
                >
                  {cat.name}
                  <span className="pc-filter-count">({categoryCounts.get(cat.slug) ?? 0})</span>
                </button>
              ))}
            </nav>

            <span className="pc-sidebar-label pc-sidebar-label--spaced">Fluxos</span>
            <nav className="pc-sidebar flex flex-col gap-1" aria-label="Filtrar por fluxo de resíduo">
              {FLOWS.filter((flow) => (flowCounts.get(flow.label) ?? 0) > 0).map((flow) => (
                <button
                  key={flow.label}
                  type="button"
                  onClick={() => selectFlow(activeFlow === flow.label ? '' : flow.label)}
                  className={`pc-filter-btn${activeFlow === flow.label ? ' pc-filter-btn--active' : ''}`}
                >
                  {flow.label}
                  <span className="pc-filter-count">({flowCounts.get(flow.label) ?? 0})</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Product grid */}
          <div>
            <span className="pc-results-count">
              {loading ? 'A carregar…' : `${products.length} produto${products.length !== 1 ? 's' : ''}`}
            </span>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-black/[0.08] animate-pulse">
                    <div className="aspect-[4/3] bg-[#eaeaea]" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 w-1/3 bg-[#eaeaea] rounded" />
                      <div className="h-5 w-2/3 bg-[#eaeaea] rounded" />
                      <div className="h-3 w-full bg-[#eaeaea] rounded" />
                      <div className="h-3 w-4/5 bg-[#eaeaea] rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <p className="text-[#8a9a88] text-sm py-16 text-center">
                Nenhum produto encontrado para estes filtros.
              </p>
            ) : (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                {products.map((product) => {
                  const coverImage = cardCoverImage(product, activeFlow)
                  return (
                  <li key={product.id}>
                    <Link to={`/produtos/${product.category?.slug}/${product.slug}`} className="pc-card">
                      <div className="pc-card-img-wrap">
                        {coverImage ? (
                          <img
                            src={coverImage}
                            alt={product.name}
                            className="pc-card-img"
                            style={cardImgStyle(product.slug)}
                            loading="lazy"
                          />
                        ) : (
                          <div className="pc-card-placeholder">
                            <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="pc-card-info">
                        <h2 className="pc-card-name">{product.name}</h2>
                        {product.specifications?.['Capacidade']
                          ? <p className="pc-card-capacity">{String(product.specifications['Capacidade'])}</p>
                          : null}
                      </div>
                    </Link>
                  </li>
                  )
                })}
              </ul>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
