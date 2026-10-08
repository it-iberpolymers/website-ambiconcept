import { useState, useEffect, useRef } from 'react'
import { useScrollSequence } from '@/hooks/useScrollSequence'
import { Link } from '@/i18n/router'
import type { Product } from '@/types'
import { useI18n } from '@/i18n'
import { useCategoryContent } from '@/hooks/useCategoryContent'
import { storageUrl } from '@/data/local'
import { useProducts } from '@/hooks/useProducts'
import { useRalColors } from '@/hooks/useRalColors'
import { useCategoryHighlights } from '@/hooks/useCategoryHighlights'
import PageSeo from '@/components/seo/PageSeo'
import { BALDES_DOMESTICOS_FEATURE_ICONS as FEATURE_ICONS } from './baldes-domesticos-feature-icons'
import '@/styles/template-baldes-domesticos.css'

interface Props {
  product: Product
}

const BD_TABS = [
  { key: 'materiais',  labelKey: 'bd.tab.materiais' },
  { key: 'cores',      labelKey: 'bd.tab.cores' },
  { key: 'decoracao',  labelKey: 'bd.tab.decoracao' },
]

const SCROLL_FRAME_COUNT = 60
const SCROLL_FRAMES = Array.from(
  { length: SCROLL_FRAME_COUNT },
  (_, i) => `/assets/LOCKEY5L-scroll-${String(i + 1).padStart(2, '0')}.png`
)

export default function BaldesDomesticosTemplate({ product }: Props) {
  const { t } = useI18n()
  const [slideIndex, setSlideIndex] = useState(0)
  const content = useCategoryContent('baldes-domesticos')!
  const { colors: ralColors } = useRalColors('baldes-domesticos')
  const { intro: categoryIntro, highlights: categoryHighlights } = useCategoryHighlights('baldes-domesticos')
  const { products: relatedRaw } = useProducts({ categorySlug: 'baldes-domesticos' })
  const related = relatedRaw.filter((p) => p.id !== product.id)
  const relatedDisplay: { id: string; slug: string; name: string; cover_image: string; capacity?: string }[] =
    related.map((p) => ({ id: p.id, slug: p.slug, name: p.name, cover_image: p.cover_image, capacity: p.specifications?.capacity ?? (p.specifications?.['Capacidade'] as string | undefined) }))

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const spec = product.specifications
  const capacity = spec.capacity ?? (spec['Capacidade'] as string | undefined)
  const fecho = (spec['Sistema de fecho'] as string | undefined)
  const name = product.name
  const introText = capacity ? t('bd.intro.withCapacity', { name, capacity }) : categoryIntro

  const BD_FAQS = [
    {
      q: t('bd.faq.capacity.q', { name }),
      a: capacity ? t('bd.faq.capacity.a.with', { name, capacity }) : t('bd.faq.capacity.a.without', { name }),
    },
    fecho && {
      q: t('bd.faq.closure.q', { name }),
      a: t('bd.faq.closure.a', { name, closure: fecho }),
    },
    {
      q: t('bd.faq.materials.q', { name }),
      a: t('bd.faq.materials.a', { name }),
    },
    {
      q: t('bd.faq.custom.q', { name }),
      a: t('bd.faq.custom.a', { name }),
    },
    {
      q: t('bd.faq.quote.q', { name }),
      a: t('bd.faq.quote.a', { name }),
    },
  ].filter(Boolean) as { q: string; a: string }[]

  const specProperties = [
    capacity && { '@type': 'PropertyValue', name: t('bd.schema.capacity'), value: capacity },
    fecho && { '@type': 'PropertyValue', name: t('bd.schema.closure'), value: fecho },
    spec.materials?.length && { '@type': 'PropertyValue', name: t('bd.schema.materials'), value: spec.materials.join(', ') },
    spec.colors?.length && { '@type': 'PropertyValue', name: t('bd.schema.colors'), value: spec.colors.join(', ') },
  ].filter(Boolean)

  useEffect(() => {
    if (product.hero_images.length <= 1) return
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % product.hero_images.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [product.hero_images.length])

  const leftHighlights = categoryHighlights.slice(0, 2)
  const rightHighlights = categoryHighlights.slice(2, 4)

  const [activeTab, setActiveTab] = useState('materiais')

  const scrollAnimRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useScrollSequence(scrollAnimRef, canvasRef, SCROLL_FRAMES)

  return (
    <div className="min-h-screen bg-white">
      <PageSeo
        title={`${product.name} — ${t('bd.category')}`}
        description={product.short_description ?? product.description}
        path={`/produtos/baldes-domesticos/${product.slug}`}
        ogImage={product.cover_image}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Product',
              name: product.name,
              description: product.description,
              image: product.hero_images.map((img) => `https://www.ambiconcept.pt${img}`),
              manufacturer: { '@type': 'Organization', name: 'Ambiconcept' },
              brand: { '@type': 'Brand', name: 'Ambiconcept' },
              category: t('bd.schema.category'),
              ...(specProperties.length > 0 && { additionalProperty: specProperties }),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('common.home'), item: 'https://www.ambiconcept.pt/' },
                { '@type': 'ListItem', position: 2, name: t('common.products'), item: 'https://www.ambiconcept.pt/produtos' },
                { '@type': 'ListItem', position: 3, name: t('bd.category'), item: 'https://www.ambiconcept.pt/categorias/baldes-domesticos' },
                { '@type': 'ListItem', position: 4, name: product.name, item: `https://www.ambiconcept.pt/produtos/baldes-domesticos/${product.slug}` },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: BD_FAQS.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ],
        }}
      />

      {/* ── Showcase ──────────────────────────────────────── */}
      <section className="bd-showcase" aria-labelledby="bd-title">
        <div className="bd-showcase-inner">

          <div className="bd-showcase-head">
            <nav aria-label={t('bd.breadcrumb.label')} className="bd-breadcrumb">
              <Link to="/">{t('common.home')}</Link>
              <span aria-hidden="true">/</span>
              <Link to="/produtos">{t('common.products')}</Link>
              <span aria-hidden="true">/</span>
              <Link to="/categorias/baldes-domesticos">{t('bd.category')}</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>
            <h1 id="bd-title" className="bd-showcase-title">{product.name}</h1>
            <p className="bd-showcase-desc">
              {product.short_description ?? product.description}
            </p>
          </div>

          <div className="bd-showcase-grid">

            <div className="bd-features-col bd-features-col--left">
              {leftHighlights.map((h, i) => (
                <div key={h.title} className="bd-feature">
                  <span className="bd-feature-icon">{FEATURE_ICONS[i]}</span>
                  <h3 className="bd-feature-title">{h.title}</h3>
                  <p className="bd-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

            <div className="bd-carousel">
              <div className="bd-carousel-stage">
                {product.hero_images.map((img, i) => (
                  <img
                    key={img}
                    src={img}
                    alt={t('bd.slide.alt', { name, n: i + 1 })}
                    className={`bd-slide${slideIndex === i ? ' bd-slide--active' : ''}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
              {product.hero_images.length > 1 && (
                <div className="bd-carousel-dots" aria-label={t('bd.carousel.select')}>
                  {product.hero_images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      className={`bd-dot${slideIndex === i ? ' bd-dot--active' : ''}`}
                      aria-label={t('bd.carousel.variant', { n: i + 1 })}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="bd-features-col bd-features-col--right">
              {rightHighlights.map((h, i) => (
                <div key={h.title} className="bd-feature">
                  <span className="bd-feature-icon">{FEATURE_ICONS[i + 2]}</span>
                  <h3 className="bd-feature-title">{h.title}</h3>
                  <p className="bd-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Sobre a categoria ─────────────────────────────── */}
      <section className="bd-intro-section" aria-labelledby="bd-intro-heading">
        <div className="bd-intro-inner">
          <span className="bd-section-eyebrow">{content.eyebrow}</span>
          <h2 id="bd-intro-heading" className="bd-related-title">{content.headline}</h2>
          <p className="bd-intro-text">{introText}</p>
        </div>
      </section>

      {/* ── Animação de scroll ────────────────────────────── */}
      <section ref={scrollAnimRef} className="bd-scroll-anim" aria-label={t('bd.scroll.label', { name })}>
        <div className="bd-scroll-anim-sticky">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={t('bd.scroll.label', { name })}
            className="bd-scroll-anim-img"
          />
        </div>
      </section>

      {/* ── Tamanhos ──────────────────────────────────────── */}
      <section className="bd-sizes-section" aria-labelledby="bd-sizes-heading">
        <div className="bd-sizes-inner">
          <div className="bd-sizes-head">
            <h2 id="bd-sizes-heading" className="bd-sizes-title">
              {t('bd.sizes.title.0')}<br />
              <span className="bd-sizes-title-line">{t('bd.sizes.title.1')}</span>
            </h2>
            <p className="bd-sizes-sub">
              {t('bd.sizes.sub')}
            </p>
          </div>
          <div className="bd-sizes-grid">
            <div className="bd-sizes-item">
              <div className="bd-sizes-img-wrap">
                <img src={storageUrl('produtos/_shared/lockey-tamanhos/LOCKEY5L-Tamanho.png')} alt={t('bd.sizes.alt5')} className="bd-sizes-img" loading="lazy" />
              </div>
              <p className="bd-sizes-label">{t('bd.sizes.label5')}</p>
            </div>
            <div className="bd-sizes-item">
              <div className="bd-sizes-img-wrap">
                <img src={storageUrl('produtos/_shared/lockey-tamanhos/LOCKEY7L-Tamanho.png')} alt={t('bd.sizes.alt7')} className="bd-sizes-img" loading="lazy" />
              </div>
              <p className="bd-sizes-label">{t('bd.sizes.label7')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Opções ────────────────────────────────────────── */}
      <section className="bd-options-section" aria-label={t('bd.options.label')}>
        <div className="bd-options-inner">
          <nav className="bd-tabs-nav" role="tablist" aria-label={t('bd.tabs.label')}>
            {BD_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`bd-tab-btn${activeTab === tab.key ? ' bd-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </nav>

          <div className="bd-tabs-body">
            <div id="bd-panel-materiais" role="tabpanel" className={`bd-tab-panel${activeTab === 'materiais' ? ' bd-tab-panel--active' : ''}`}>
              <ul className="bd-mat-list">
                <li>{t('bd.mat.0')}</li>
                <li>{t('bd.mat.1')}</li>
                <li>{t('bd.mat.2')}</li>
              </ul>
            </div>

            <div id="bd-panel-cores" role="tabpanel" className={`bd-tab-panel${activeTab === 'cores' ? ' bd-tab-panel--active' : ''}`}>
              <p className="bd-tab-desc">{t('bd.colors.desc')}</p>
              <div className="bd-colors-grid">
                {ralColors.map((c) => (
                  <div key={c.code} className="bd-color-item">
                    <div className="bd-color-swatch" style={{ background: c.hex }} />
                    <span className="bd-color-label">{c.code}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="bd-panel-decoracao" role="tabpanel" className={`bd-tab-panel${activeTab === 'decoracao' ? ' bd-tab-panel--active' : ''}`}>
              <div className="bd-feature-grid">
                <div className="bd-feature-grid-item">
                  <div className="bd-feature-grid-img-wrap">
                    <img src={storageUrl('produtos/lockey_5l/tabs/decor-frente.svg')} alt={t('bd.tab.decoracao')} className="bd-feature-grid-img" loading="lazy" />
                  </div>
                  <p className="bd-feature-grid-title">{t('bd.tab.decoracao')}</p>
                  <p className="bd-feature-grid-sub">{t('bd.decor.sub')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vídeo ─────────────────────────────────────────── */}
      <section className="bd-video-section" aria-label={t('bd.video.label', { name })}>
        <div className="bd-video-wrap">
          <video
            className="bd-video"
            poster={product.hero_images[0] ?? product.cover_image}
            autoPlay
            muted
            loop
            playsInline
            controls
          >
            <source src="/assets/video-baldes-domesticos.mp4" type="video/mp4" />
          </video>
          <div className="bd-video-overlay">
            <span className="bd-section-eyebrow">{t('bd.video.eyebrow')}</span>
            <h2 className="bd-video-title">{t('bd.video.title', { name })}</h2>
          </div>
        </div>
      </section>

      {/* ── Produtos Semelhantes ─────────────────────────────── */}
      {relatedDisplay.length > 0 && (
        <section className="bd-related-section" aria-labelledby="bd-related-heading">
          <div className="bd-related-inner">
            <div className="bd-related-head">
              <span className="bd-section-eyebrow">{t('bd.category')}</span>
              <h2 id="bd-related-heading" className="bd-related-title">
                {t('bd.related.title')}
              </h2>
              <p className="bd-related-sub">
                {t('bd.related.sub.0')}<br />{t('bd.related.sub.1')}
              </p>
            </div>
            <ul className="bd-related-grid" role="list">
              {relatedDisplay.map((p) => (
                <li key={p.id}>
                  <Link to={`/produtos/baldes-domesticos/${p.slug}`} className="bd-related-card">
                    <div className="bd-related-img-wrap">
                      {p.cover_image ? (
                        <img
                          src={p.cover_image}
                          alt={p.name}
                          className="bd-related-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="bd-related-placeholder">
                          <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="bd-related-info">
                      <p className="bd-related-name">{p.name}</p>
                      {p.capacity && <p className="bd-related-capacity">{p.capacity}</p>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── FAQs ──────────────────────────────────────────── */}
      <section className="bd-faq-section" aria-labelledby="bd-faq-heading">
        <div className="bd-faq-inner">
          <div className="bd-faq-head">
            <span className="bd-section-eyebrow">{t('bd.faq.eyebrow')}</span>
            <h2 id="bd-faq-heading" className="bd-related-title">
              {t('bd.faq.title', { name })}
            </h2>
          </div>
          <div className="bd-faq-list">
            {BD_FAQS.map((item, i) => (
              <div key={item.q} className="bd-faq-item">
                <button
                  type="button"
                  className="bd-faq-question"
                  aria-expanded={openFaq === i}
                  aria-controls={`bd-faq-panel-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="bd-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  id={`bd-faq-panel-${i}`}
                  role="region"
                  className={`bd-faq-answer${openFaq === i ? ' bd-faq-answer--open' : ''}`}
                >
                  <div className="bd-faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sistema de Recolha ────────────────────────────── */}
      <section className="bd-flow-section" aria-labelledby="bd-flow-heading">
        <div className="bd-flow-inner">
          <h2 id="bd-flow-heading" className="bd-flow-title">{t('bd.flow.title')}</h2>
          <p className="bd-flow-sub">
            {t('bd.flow.sub.0')}<br />
            {t('bd.flow.sub.1')}
          </p>
          <Link to="/fluxos/porta-a-porta" className="bd-flow-badge">
            {t('bd.flow.badge')}
          </Link>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bd-cta-section" aria-labelledby="bd-cta-heading">
        <div className="bd-cta-inner">
          <h2 id="bd-cta-heading" className="bd-cta-title">
            {t('bd.cta.title.0')}<br />{t('bd.cta.title.1')}<br />{t('bd.cta.title.2')}
          </h2>
          <p className="bd-cta-sub">
            {t('bd.cta.sub')}
          </p>
          <Link to="/contactos" className="btn-dark">
            {t('bd.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  )
}
