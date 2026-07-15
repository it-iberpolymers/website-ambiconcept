import { useParams, Link, Navigate } from 'react-router-dom'
import { useProducts } from '@/hooks/useProducts'
import { getCategoryContent } from '@/data/categories-content'
import { categories } from '@/data/local'
import { cardImgStyle } from '@/lib/cardImgStyle'
import PageSeo from '@/components/seo/PageSeo'
import '@/styles/category-page.css'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const content = getCategoryContent(slug ?? '')
  const category = categories.find((c) => c.slug === slug)
  const { products, loading } = useProducts({ categorySlug: slug })

  // Category exists but no rich content yet — fall back to filtered catalog
  if (!content) {
    return <Navigate to={`/produtos?categoria=${slug}`} replace />
  }

  return (
    <div className="min-h-screen bg-white">

      <PageSeo
        title={content.seoTitle}
        description={content.seoDescription}
        path={`/categorias/${content.slug}`}
        ogImage={content.image}
      />

      {/* Header */}
      <div className="bg-white pt-[110px] pb-[48px] text-center">
        <div className="max-w-[1140px] mx-auto px-5">
          <nav aria-label="Localização" className="flex items-center justify-center gap-1.5 text-[11px] text-[#303f49]/35 mb-8">
            <Link to="/" className="hover:text-[#7ab929] transition-colors">Início</Link>
            <span aria-hidden="true">/</span>
            <Link to="/produtos" className="hover:text-[#7ab929] transition-colors">Produtos</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#303f49]/60">{content.headline}</span>
          </nav>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7ab929] mb-4">
            {content.eyebrow}
          </p>
          <h1 className="text-[42px] md:text-[52px] font-semibold uppercase text-[#303f49] leading-none mb-4">
            {content.headline}
          </h1>
          <p className="text-[#303f49]/55 text-[15px] max-w-xl mx-auto leading-relaxed">
            {content.tagline}
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="cp-intro">
        <div>
          <span className="cp-intro-eyebrow">{content.eyebrow}</span>
          <h2 className="cp-intro-title">{content.headline}</h2>
          <p className="cp-intro-tagline">{content.tagline}</p>
          <p className="cp-intro-body">{content.intro}</p>
          <a href="#modelos" className="btn-outline">Ver modelos</a>
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
          <span className="cp-section-eyebrow">Características</span>
          <h2 id="highlights-heading" className="cp-section-title">
            Desenvolvido para o ambiente urbano
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
          <span className="cp-section-eyebrow">Modelos disponíveis</span>
          <h2 id="products-heading" className="cp-section-title">
            {category?.name ?? content.headline}
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
            <span className="cp-specs-label">Ficha Técnica</span>
            <h2 id="specs-heading" className="cp-specs-title">
              Especificações da categoria
            </h2>
            <p className="cp-specs-sub">
              Parâmetros técnicos de referência para os contentores de {content.headline.toLowerCase()}.
              Cada produto pode ter especificações individuais — consulte a ficha de cada modelo.
            </p>
            <Link to="/contactos" className="btn-ghost">
              Falar com um Especialista
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
      <section className="cp-cta-section" aria-labelledby="cta-cat-heading">
        <div className="cp-cta-inner">
          <h2 id="cta-cat-heading" className="cp-cta-title">
            Apresente o seu projeto. Os especialistas encontram a solução certa.
          </h2>
          <p className="cp-cta-sub">
            Partilhe os requisitos do seu município ou operação RSU. Desenvolvemos a solução de {content.headline.toLowerCase()} mais adequada ao seu contexto.
          </p>
          <Link to="/contactos" className="btn-primary">
            Falar com um Especialista
          </Link>
        </div>
      </section>

    </div>
  )
}
