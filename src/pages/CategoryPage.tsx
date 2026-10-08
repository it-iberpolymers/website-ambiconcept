import { useParams } from 'react-router-dom'
import { Link, Navigate } from '@/i18n/router'
import { useProducts } from '@/hooks/useProducts'
import { useCategoryContent } from '@/hooks/useCategoryContent'
import { useI18n } from '@/i18n'
import { cardImgStyle } from '@/lib/cardImgStyle'
import { toPublicSlug } from '@/lib/categorySlug'
import PageSeo from '@/components/seo/PageSeo'
import '@/styles/page-shell.css'
import '@/styles/category-page.css'

export default function CategoryPage() {
  const { slug: rawSlug } = useParams<{ slug: string }>()
  const slug = rawSlug ? toPublicSlug(rawSlug) : rawSlug
  const { t } = useI18n()
  const content = useCategoryContent(slug ?? '')
  const { products, loading } = useProducts({ categorySlug: slug })

  // Category exists but no rich content yet — fall back to filtered catalog
  if (!content) {
    return <Navigate to={`/produtos?categoria=${slug}`} replace />
  }

  return (
    <div className="min-h-screen bg-white cp-page">

      <PageSeo
        title={content.seoTitle}
        description={content.seoDescription}
        path={`/categorias/${content.slug}`}
        ogImage={content.image}
      />

      {/* Header */}
      <div className="ps-hero text-center">
        <div className="max-w-[1140px] mx-auto px-5 relative z-[1]">
          <nav aria-label={t('catpage.breadcrumb')} className="flex items-center justify-center gap-1.5 text-[12px] text-white/75 mb-8">
            <Link to="/" className="hover:text-[#95d855] transition-colors">{t('common.home')}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/produtos" className="hover:text-[#95d855] transition-colors">{t('common.products')}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/75">{content.headline}</span>
          </nav>
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#95d855] mb-4">
            {content.eyebrow}
          </p>
          <h1 className="text-[42px] md:text-[56px] font-bold tracking-[-0.03em] text-white leading-none mb-4">
            {content.headline}
          </h1>
          <p className="text-[#b4c7b8] text-[15px] max-w-xl mx-auto leading-relaxed">
            {content.tagline}
          </p>
        </div>
        <svg className="ps-hero-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60V28C240 -4 480 -4 720 22s480 30 720 4V60z" />
        </svg>
      </div>

      {/* Intro */}
      <div className="cp-intro">
        <div>
          <span className="cp-intro-eyebrow">{content.eyebrow}</span>
          <h2 className="cp-intro-title">{content.headline}</h2>
          <p className="cp-intro-tagline">{content.tagline}</p>
          <p className="cp-intro-body">{content.intro}</p>
          <a href="#modelos" className="btn-outline">{t('catpage.viewModels')}</a>
        </div>
        <div className="cp-intro-img-wrap">
          <img
            src={content.image}
            alt={content.imageAlt}
            className="cp-intro-img"
            loading="eager"
          />
        </div>
      </div>

      {/* Highlights */}
      <section className="cp-highlights-section" aria-labelledby="highlights-heading">
        <div className="cp-highlights-inner">
          <span className="cp-section-eyebrow">{t('catpage.highlights.eyebrow')}</span>
          <h2 id="highlights-heading" className="cp-section-title">
            {t('catpage.highlights.title')}
          </h2>
          <div className="cp-highlights-grid">
            {content.highlights.map((h, i) => (
              <div key={h.title} className="cp-highlight-card">
                <span className="cp-highlight-number">0{i + 1}</span>
                <h3 className="cp-highlight-title">{h.title}</h3>
                <p className="cp-highlight-desc">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        id="modelos"
        className="cp-products-section"
        aria-labelledby="products-heading"
      >
        <div className="cp-products-inner">
          <span className="cp-section-eyebrow">{t('catpage.products.eyebrow')}</span>
          <h2 id="products-heading" className="cp-section-title">
            {content.headline}
          </h2>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-black/[0.08] animate-pulse">
                  <div className="aspect-[4/3] bg-[#e8ede8]" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 w-2/3 bg-[#e8ede8] rounded" />
                    <div className="h-3 w-1/3 bg-[#e8ede8] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              {products.map((product, idx) => (
                <li key={product.id}>
                  <Link to={`/produtos/${product.category?.slug}/${product.slug}`} className="pc-card">
                    <div className="pc-card-img-wrap">
                      {product.cover_image ? (
                        <img
                          src={product.cover_image}
                          alt={product.name}
                          className="pc-card-img"
                          style={cardImgStyle(product.slug)}
                          loading={idx === 0 ? 'eager' : 'lazy'}
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
                      <h3 className="pc-card-name">{product.name}</h3>
                      {product.specifications?.['Capacidade']
                        ? <p className="pc-card-capacity">{String(product.specifications['Capacidade'])}</p>
                        : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Specs */}
      <section className="cp-specs-section" aria-labelledby="specs-heading">
        <div className="cp-specs-inner">
          <div>
            <span className="cp-specs-label">{t('catpage.specs.label')}</span>
            <h2 id="specs-heading" className="cp-specs-title">
              {t('catpage.specs.title')}
            </h2>
            <p className="cp-specs-sub">
              {t('catpage.specs.sub', { name: content.headline.toLowerCase() })}
            </p>
            <Link to="/contactos" className="btn-ghost">
              {t('catpage.talkSpecialist')}
            </Link>
          </div>
          <dl className="cp-specs-table">
            {content.specs.map((s) => (
              <div key={s.label} className="cp-spec-row">
                <dt className="cp-spec-key">{s.label}</dt>
                <dd className="cp-spec-val">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="cp-cta-section cp-cta-section--green" aria-labelledby="cta-cat-heading">
        <div className="cp-cta-inner">
          <h2 id="cta-cat-heading" className="cp-cta-title">
            {t('catpage.cta.line1')} <br /><span className="cp-cta-title-line">{t('catpage.cta.line2')}</span> <br />{t('catpage.cta.line3')}
          </h2>
          <p className="cp-cta-sub">
            {t('catpage.cta.sub', { name: content.headline.toLowerCase() })}
          </p>
          <Link to="/contactos" className="btn-dark">
            {t('catpage.talkSpecialist')}
          </Link>
        </div>
      </section>

    </div>
  )
}
