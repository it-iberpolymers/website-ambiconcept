import { useSearchParams } from 'react-router-dom'
import { Link } from '@/i18n/router'
import { useProducts, useProductCategories } from '@/hooks/useProducts'
import { cardImgStyle } from '@/lib/cardImgStyle'
import { useI18n } from '@/i18n'
import { FLOWS, sortByFlowOrder, cardCoverImage } from '@/data/flows'
import { toPublicSlug } from '@/lib/categorySlug'
import PageSeo from '@/components/seo/PageSeo'
import '@/styles/page-shell.css'
import '@/styles/products-catalog.css'

export default function Products() {
  const { lang, t } = useI18n()
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
  // singular: 1 em pt/en; 0 e 1 em francês
  const isOne = lang === 'fr' ? products.length < 2 : products.length === 1

  // Uma passagem por categoria/fluxo (em vez de recalcular no filter e outra vez no render).
  const categoryCounts = new Map(hookCategories.map((c) => [c.slug, allProducts.filter((p) => p.category?.slug === c.slug).length]))
  const flowCounts = new Map(FLOWS.map((f) => [f.label, allProducts.filter((p) => f.match(p)).length]))

  const activeCategoryObj = hookCategories.find((c) => c.slug === activeCategory)
  const seoTitle = activeCategoryObj
    ? t('catalog.seo.categoryTitle', { name: activeCategoryObj.name })
    : t('catalog.seo.title')
  const seoDescription = activeCategoryObj
    ? t('catalog.seo.categoryDescription', { description: activeCategoryObj.description ?? '' })
    : t('catalog.seo.description')

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
          <nav aria-label={t('catalog.breadcrumb')} className="flex items-center justify-center gap-1.5 text-[12px] text-white/75 mb-8">
            <Link to="/" className="hover:text-[#95d855] transition-colors">{t('common.home')}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/75">{t('common.products')}</span>
          </nav>
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#95d855] mb-3">{t('catalog.eyebrow')}</p>
          <h1 className="text-[42px] md:text-[56px] font-bold tracking-[-0.03em] text-white leading-none font-['Poppins',sans-serif]">
            {t('common.products')}
          </h1>
          <p className="mt-5 text-[#b4c7b8] max-w-xl mx-auto text-[15px] leading-relaxed">
            {t('catalog.hero.line1')}<br />{t('catalog.hero.line2')}
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
            <span className="pc-sidebar-label">{t('catalog.categories')}</span>
            <nav className="pc-sidebar flex flex-col gap-1" aria-label={t('catalog.filterByCategory')}>
              <button
                type="button"
                onClick={() => selectCategory('')}
                className={`pc-filter-btn${!activeCategory && !activeFlow ? ' pc-filter-btn--active' : ''}`}
              >
                {t('catalog.all')}
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

            <span className="pc-sidebar-label pc-sidebar-label--spaced">{t('common.flows')}</span>
            <nav className="pc-sidebar flex flex-col gap-1" aria-label={t('catalog.filterByFlow')}>
              {FLOWS.filter((flow) => (flowCounts.get(flow.label) ?? 0) > 0).map((flow) => (
                <button
                  key={flow.label}
                  type="button"
                  onClick={() => selectFlow(activeFlow === flow.label ? '' : flow.label)}
                  className={`pc-filter-btn${activeFlow === flow.label ? ' pc-filter-btn--active' : ''}`}
                >
                  {t(`catalog.flow.${flow.slug}`)}
                  <span className="pc-filter-count">({flowCounts.get(flow.label) ?? 0})</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Product grid */}
          <div>
            <span className="pc-results-count">
              {loading ? t('common.loading') : t(isOne ? 'catalog.count.one' : 'catalog.count.other', { n: products.length })}
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
              <p className="text-[#4d5d53] text-sm py-16 text-center">
                {t('catalog.empty')}
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
