import { useSearchParams, Link } from 'react-router-dom'
import { useProducts, useProductCategories } from '@/hooks/useProducts'
import { cardImgStyle } from '@/lib/cardImgStyle'
import { FLOWS, sortByFlowOrder, cardCoverImage } from '@/data/flows'
import { toPublicSlug } from '@/lib/categorySlug'
import PageSeo from '@/components/seo/PageSeo'
import '@/styles/page-shell.css'
import '@/styles/products-catalog.css'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = toPublicSlug(searchParams.get('categoria') ?? '')
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
    <div className="ps-page">

      <PageSeo
        title={seoTitle}
        description={seoDescription}
        path={activeCategory ? `/produtos?categoria=${activeCategory}` : '/produtos'}
      />

      {/* Header */}
      <div className="ps-hero">
        <div className="max-w-[1140px] mx-auto px-5 text-center relative z-[1]">
          <nav aria-label="Localização" className="flex items-center justify-center gap-1.5 text-[11px] text-white/45 mb-8">
            <Link to="/" className="hover:text-[#95d855] transition-colors">Início</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/75">Produtos</span>
          </nav>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#95d855] mb-3">Catálogo</p>
          <h1 className="text-[42px] md:text-[56px] font-bold tracking-[-0.03em] text-white leading-none font-['Poppins',sans-serif]">
            Produtos
          </h1>
          <p className="mt-5 text-[#b4c7b8] max-w-xl mx-auto text-[15px] leading-relaxed">
            Mais variedade, mais personalização, mais soluções<br />para a gestão de resíduos urbanos.
          </p>
        </div>
        <svg className="ps-hero-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60V28C240 -4 480 -4 720 22s480 30 720 4V60z" />
        </svg>
      </div>

      {/* Main layout */}
      <div className="max-w-[1320px] mx-auto px-5 md:px-6 pt-[30px] pb-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">

          {/* Sidebar */}
          <aside className="pc-aside">
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
                  <div key={i} className="rounded-[28px] overflow-hidden bg-white animate-pulse">
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
