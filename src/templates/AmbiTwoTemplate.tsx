import { useState, useEffect, useRef } from 'react'
import { useScrollSequence } from '@/hooks/useScrollSequence'
import { Link } from '@/i18n/router'
import type { Product } from '@/types'
import { storageUrl } from '@/data/local'
import { useI18n } from '@/i18n'
import { useCategoryContent } from '@/hooks/useCategoryContent'
import { useProducts } from '@/hooks/useProducts'
import { useRalColors } from '@/hooks/useRalColors'
import { useCategoryHighlights } from '@/hooks/useCategoryHighlights'
import PageSeo from '@/components/seo/PageSeo'
import { CARGA_TRASEIRA_FEATURE_ICONS as FEATURE_ICONS } from './carga-traseira-feature-icons'
import '@/styles/template-ambi-two.css'

interface Props {
  product: Product
}

const AT_TABS = [
  { key: 'materiais',  label: 'at.tab.materiais' },
  { key: 'cores',      label: 'at.tab.cores' },
  { key: 'sinaletica', label: 'at.tab.sinaletica' },
  { key: 'rodas',      label: 'at.tab.rodas' },
]

// TODO: placeholders — substituir por imagens próprias do AMBI TWO quando disponíveis
const AT_CUSTOM_ITEMS = [
  { label: 'at.custom.wheels', img: '/assets/home-porta-a-porta.webp' },
  { label: 'at.custom.lock', img: '/assets/home-porta-a-porta.webp' },
  { label: 'at.custom.pedal', img: '/assets/home-porta-a-porta.webp' },
]

// TODO: substituir por fotos próprias de cada fração de resíduo quando disponíveis
const AT_SIZES = [
  { label: 'at.sizes.paper', img: '/assets/home-porta-a-porta.webp' },
  { label: 'at.sizes.glass', img: '/assets/home-porta-a-porta.webp' },
  { label: 'at.sizes.packaging', img: '/assets/home-porta-a-porta.webp' },
  { label: 'at.sizes.general', img: '/assets/home-porta-a-porta.webp' },
  { label: 'at.sizes.bio', img: '/assets/home-porta-a-porta.webp' },
]

const SCROLL_FRAME_COUNT = 60
const SCROLL_FRAMES = Array.from(
  { length: SCROLL_FRAME_COUNT },
  (_, i) => `/assets/AMBITWO-scroll-${String(i + 1).padStart(2, '0')}.png`
)

export default function AmbiTwoTemplate({ product }: Props) {
  const [slideIndex, setSlideIndex] = useState(0)
  const { t } = useI18n()
  const content = useCategoryContent('carga-traseira')!
  const { colors: ralColors } = useRalColors('carga-traseira')
  const { intro: categoryIntro, highlights: categoryHighlights } = useCategoryHighlights('carga-traseira')
  const { products: relatedRaw } = useProducts({ categorySlug: 'carga-traseira' })
  const related = relatedRaw.filter((p) => p.id !== product.id && p.slug.startsWith('ambi-two'))
  const relatedDisplay: { id: string; slug: string; name: string; cover_image: string; capacity?: string }[] =
    related.map((p) => ({ id: p.id, slug: p.slug, name: p.name, cover_image: p.cover_image, capacity: p.specifications?.capacity ?? (p.specifications?.['Capacidade'] as string | undefined) }))

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const spec = product.specifications
  const capacity = spec.capacity ?? (spec['Capacidade'] as string | undefined)
  const rodas = (spec['Rodas'] as string | undefined)
  const fracoes = (spec['Frações'] as string | undefined)

  const name = product.name
  const AT_FAQS = [
    {
      q: t('at.faq.capacity.q', { name }),
      a: capacity
        ? t('at.faq.capacity.a', { name, capacity })
        : t('at.faq.capacity.aDefault', { name }),
    },
    rodas && {
      q: t('at.faq.wheels.q', { name }),
      a: t('at.faq.wheels.a', { name, wheels: rodas.toLowerCase() }),
    },
    fracoes && {
      q: t('at.faq.fractions.q', { name }),
      a: t('at.faq.fractions.a', { name, fractions: fracoes.toLowerCase() }),
    },
    {
      q: t('at.faq.rfid.q', { name }),
      a: t('at.faq.rfid.a', { name }),
    },
    {
      q: t('at.faq.materials.q', { name }),
      a: t('at.faq.materials.a', { name }),
    },
    {
      q: t('at.faq.quote.q', { name }),
      a: t('at.faq.quote.a', { name }),
    },
  ].filter(Boolean) as { q: string; a: string }[]

  const specProperties = [
    capacity && { '@type': 'PropertyValue', name: t('at.schema.capacity'), value: capacity },
    rodas && { '@type': 'PropertyValue', name: t('at.schema.wheels'), value: rodas },
    fracoes && { '@type': 'PropertyValue', name: t('at.schema.fractions'), value: fracoes },
    spec.materials?.length && { '@type': 'PropertyValue', name: t('at.schema.materials'), value: spec.materials.join(', ') },
    spec.colors?.length && { '@type': 'PropertyValue', name: t('at.schema.colors'), value: spec.colors.join(', ') },
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
        title={t('at.seo.title', { name: product.name })}
        description={product.short_description ?? product.description}
        path={`/produtos/carga-traseira/${product.slug}`}
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
              category: t('at.category'),
              ...(specProperties.length > 0 && { additionalProperty: specProperties }),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('common.home'), item: 'https://www.ambiconcept.pt/' },
                { '@type': 'ListItem', position: 2, name: t('common.products'), item: 'https://www.ambiconcept.pt/produtos' },
                { '@type': 'ListItem', position: 3, name: t('at.category'), item: 'https://www.ambiconcept.pt/categorias/carga-traseira' },
                { '@type': 'ListItem', position: 4, name: product.name, item: `https://www.ambiconcept.pt/produtos/carga-traseira/${product.slug}` },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: AT_FAQS.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ],
        }}
      />

      {/* ── Showcase ──────────────────────────────────────── */}
      <section className="at-showcase" aria-labelledby="at-title">
        <div className="at-showcase-inner">

          <div className="at-showcase-head">
            <nav aria-label={t('at.breadcrumb.aria')} className="at-breadcrumb">
              <Link to="/">{t('common.home')}</Link>
              <span aria-hidden="true">/</span>
              <Link to="/produtos">{t('common.products')}</Link>
              <span aria-hidden="true">/</span>
              <Link to="/categorias/carga-traseira">{t('at.category')}</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>
            <h1 id="at-title" className="at-showcase-title">{product.name}</h1>
            <p className="at-showcase-desc">
              {product.short_description ?? product.description}
            </p>
          </div>

          <div className="at-showcase-grid">

            <div className="at-features-col at-features-col--left">
              {leftHighlights.map((h, i) => (
                <div key={h.title} className="at-feature">
                  <span className="at-feature-icon">{FEATURE_ICONS[i]}</span>
                  <h3 className="at-feature-title">{h.title}</h3>
                  <p className="at-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

            <div className="at-carousel">
              <div className="at-carousel-stage">
                {product.hero_images.map((img, i) => (
                  <img
                    key={img}
                    src={img}
                    alt={t('at.slide.alt', { name: product.name, n: i + 1 })}
                    className={`at-slide${slideIndex === i ? ' at-slide--active' : ''}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
              {product.hero_images.length > 1 && (
                <div className="at-carousel-dots" aria-label={t('at.dots.aria')}>
                  {product.hero_images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      className={`at-dot${slideIndex === i ? ' at-dot--active' : ''}`}
                      aria-label={t('at.dot.aria', { n: i + 1 })}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="at-features-col at-features-col--right">
              {rightHighlights.map((h, i) => (
                <div key={h.title} className="at-feature">
                  <span className="at-feature-icon">{FEATURE_ICONS[i + 2]}</span>
                  <h3 className="at-feature-title">{h.title}</h3>
                  <p className="at-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Sobre a categoria ─────────────────────────────── */}
      <section className="at-intro-section" aria-labelledby="at-intro-heading">
        <div className="at-intro-inner">
          <span className="at-section-eyebrow">{content.eyebrow}</span>
          <h2 id="at-intro-heading" className="at-related-title">{content.headline}</h2>
          <p className="at-intro-text">{categoryIntro}</p>
        </div>
      </section>

      {/* ── Animação de scroll ────────────────────────────── */}
      <section ref={scrollAnimRef} className="at-scroll-anim" aria-label={t('at.scroll.aria', { name: product.name })}>
        <div className="at-scroll-anim-sticky">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={t('at.scroll.aria', { name: product.name })}
            className="at-scroll-anim-img"
          />
        </div>
      </section>

      {/* ── Personalização ────────────────────────────────── */}
      <section className="at-custom-section" aria-labelledby="at-custom-heading">
        <div className="at-custom-inner">
          <div className="at-custom-head">
            <h2 id="at-custom-heading" className="at-custom-title">
              {t('at.custom.title', { name: product.name })}
            </h2>
            <p className="at-custom-sub">
              {t('at.custom.sub.1')}<br />
              {t('at.custom.sub.2')}<br />
              {t('at.custom.sub.3')}
            </p>
          </div>
          <div className="at-custom-grid">
            {AT_CUSTOM_ITEMS.map((item) => (
              <div key={item.label} className="at-custom-item">
                <div className="at-custom-img-wrap">
                  <img src={item.img} alt={t(item.label)} className="at-custom-img" loading="lazy" />
                </div>
                <p className="at-custom-label">{t(item.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tamanhos ──────────────────────────────────────── */}
      <section className="at-sizes-section" aria-labelledby="at-sizes-heading">
        <div className="at-sizes-inner">
          <div className="at-sizes-head">
            <h2 id="at-sizes-heading" className="at-sizes-title">
              AMBI TWO<br />
              <span className="at-sizes-title-line">{t('at.sizes.title.1')}<br />{t('at.sizes.title.2')}</span>
            </h2>
            <p className="at-sizes-sub">
              {t('at.sizes.sub.1')}<br />{t('at.sizes.sub.2')}
            </p>
          </div>
          <div className="at-sizes-grid">
            {AT_SIZES.map((size) => (
              <div key={size.label} className="at-sizes-item">
                <div className="at-sizes-img-wrap">
                  <img src={size.img} alt={t('at.sizes.alt', { label: t(size.label) })} className="at-sizes-img" loading="lazy" />
                </div>
                <p className="at-sizes-label">{t(size.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opções ────────────────────────────────────────── */}
      <section className="at-options-section" aria-label={t('at.options.aria')}>
        <div className="at-options-inner">
          <nav className="at-tabs-nav" role="tablist" aria-label={t('at.tabs.aria')}>
            {AT_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`at-tab-btn${activeTab === tab.key ? ' at-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {t(tab.label)}
              </button>
            ))}
          </nav>

          <div className="at-tabs-body">
            <div id="at-panel-materiais" role="tabpanel" className={`at-tab-panel${activeTab === 'materiais' ? ' at-tab-panel--active' : ''}`}>
              <ul className="at-mat-list">
                <li>{t('at.tab.materials.1')}</li>
                <li>{t('at.tab.materials.2')}</li>
                <li>{t('at.tab.materials.3')}</li>
              </ul>
            </div>

            <div id="at-panel-cores" role="tabpanel" className={`at-tab-panel${activeTab === 'cores' ? ' at-tab-panel--active' : ''}`}>
              <p className="at-tab-desc">{t('at.tab.colors.desc')}</p>
              <div className="at-colors-grid">
                {ralColors.map((c) => (
                  <div key={c.code} className="at-color-item">
                    <div className="at-color-swatch" style={{ background: c.hex }} />
                    <span className="at-color-label">{c.code}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="at-panel-sinaletica" role="tabpanel" className={`at-tab-panel${activeTab === 'sinaletica' ? ' at-tab-panel--active' : ''}`}>
              <div className="at-feature-grid">
                <div className="at-feature-grid-item">
                  <div className="at-feature-grid-img-wrap">
                    <img src={storageUrl('produtos/ambi_2.7/tabs/placa-residuo.svg')} alt={t('at.tab.signs.waste')} className="at-feature-grid-img" loading="lazy" />
                  </div>
                  <p className="at-feature-grid-title">{t('at.tab.signs.waste')}</p>
                  <p className="at-feature-grid-sub">{t('at.tab.signs.sub')}</p>
                </div>
                <div className="at-feature-grid-item">
                  <div className="at-feature-grid-img-wrap">
                    <img src={storageUrl('produtos/ambi_2.7/tabs/placa-entidade.svg')} alt={t('at.tab.signs.entity')} className="at-feature-grid-img" loading="lazy" />
                  </div>
                  <p className="at-feature-grid-title">{t('at.tab.signs.entity')}</p>
                  <p className="at-feature-grid-sub">{t('at.tab.signs.sub')}</p>
                </div>
              </div>
            </div>

            <div id="at-panel-rodas" role="tabpanel" className={`at-tab-panel${activeTab === 'rodas' ? ' at-tab-panel--active' : ''}`}>
              <p className="at-tab-desc">
                {rodas
                  ? t('at.tab.wheels.desc', { wheels: rodas.toLowerCase() })
                  : t('at.tab.wheels.descDefault')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vídeo ─────────────────────────────────────────── */}
      <section className="at-video-section" aria-label={t('at.video.aria', { name: product.name })}>
        <div className="at-video-wrap">
          <video
            className="at-video"
            poster={product.hero_images[0] ?? product.cover_image}
            autoPlay
            muted
            loop
            playsInline
            controls
          >
            <source src="/assets/video-carga-traseira.mp4" type="video/mp4" />
          </video>
          <div className="at-video-overlay">
            <span className="at-section-eyebrow">{t('at.video.eyebrow')}</span>
            <h2 className="at-video-title">{t('at.video.title', { name: product.name })}</h2>
          </div>
        </div>
      </section>

      {/* ── Produtos Semelhantes ─────────────────────────────── */}
      {relatedDisplay.length > 0 && (
        <section className="at-related-section" aria-labelledby="at-related-heading">
          <div className="at-related-inner">
            <div className="at-related-head">
              <span className="at-section-eyebrow">AMBI TWO</span>
              <h2 id="at-related-heading" className="at-related-title">
                {t('at.related.title')}
              </h2>
              <p className="at-related-sub">
                {t('at.related.sub.1')}<br />{t('at.related.sub.2')}
              </p>
            </div>
            <ul className="at-related-grid" role="list">
              {relatedDisplay.map((p) => (
                <li key={p.id}>
                  <Link to={`/produtos/carga-traseira/${p.slug}`} className="at-related-card">
                    <div className="at-related-img-wrap">
                      {p.cover_image ? (
                        <img
                          src={p.cover_image}
                          alt={p.name}
                          className="at-related-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="at-related-placeholder">
                          <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="at-related-info">
                      <p className="at-related-name">{p.name}</p>
                      {p.capacity && <p className="at-related-capacity">{p.capacity}</p>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── FAQs ──────────────────────────────────────────── */}
      <section className="at-faq-section" aria-labelledby="at-faq-heading">
        <div className="at-faq-inner">
          <div className="at-faq-head">
            <span className="at-section-eyebrow">{t('at.faq.eyebrow')}</span>
            <h2 id="at-faq-heading" className="at-related-title">
              {t('at.faq.title', { name: product.name })}
            </h2>
          </div>
          <div className="at-faq-list">
            {AT_FAQS.map((item, i) => (
              <div key={item.q} className="at-faq-item">
                <button
                  type="button"
                  className="at-faq-question"
                  aria-expanded={openFaq === i}
                  aria-controls={`at-faq-panel-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="at-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  id={`at-faq-panel-${i}`}
                  role="region"
                  className={`at-faq-answer${openFaq === i ? ' at-faq-answer--open' : ''}`}
                >
                  <div className="at-faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sistema de Recolha ────────────────────────────── */}
      <section className="at-flow-section" aria-labelledby="at-flow-heading">
        <div className="at-flow-inner">
          <h2 id="at-flow-heading" className="at-flow-title">{t('at.flow.title')}</h2>
          <p className="at-flow-sub">
            {t('at.flow.sub.1')}<br />
            {t('at.flow.sub.2')}
          </p>
          <Link to="/fluxos/porta-a-porta" className="at-flow-badge">
            {t('at.flow.badge')}
          </Link>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="at-cta-section" aria-labelledby="at-cta-heading">
        <div className="at-cta-inner">
          <h2 id="at-cta-heading" className="at-cta-title">
            {t('at.cta.title.1')}<br />{t('at.cta.title.2')}<br />{t('at.cta.title.3')}
          </h2>
          <p className="at-cta-sub">
            {t('at.cta.sub')}
          </p>
          <Link to="/contactos" className="btn-dark">
            {t('at.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  )
}
