import { useState, useEffect, useRef } from 'react'
import { useScrollSequence } from '@/hooks/useScrollSequence'
import { Link } from '@/i18n/router'
import type { Product } from '@/types'
import { useCategoryContent } from '@/hooks/useCategoryContent'
import { storageUrl } from '@/data/local'
import { useProducts } from '@/hooks/useProducts'
import { useRalColors } from '@/hooks/useRalColors'
import { useCategoryHighlights } from '@/hooks/useCategoryHighlights'
import { useI18n } from '@/i18n'
import PageSeo from '@/components/seo/PageSeo'
import { SMART_BOX_FEATURE_ICONS as FEATURE_ICONS } from './smart-box-feature-icons'
import '@/styles/template-smart-box.css'

interface Props {
  product: Product
}

const SB_TABS = [
  { key: 'materiais',    labelKey: 'sb.tab.materiais' },
  { key: 'cores',        labelKey: 'sb.tab.cores' },
  { key: 'sinaletica',   labelKey: 'sb.tab.sinaletica' },
  { key: 'sensorizacao', labelKey: 'sb.tab.sensorizacao' },
]

// TODO: placeholders (imagens do AMBI 2.5) — substituir por imagens próprias do AMBI 1.0
const SB_CUSTOM_ITEMS = [
  { labelKey: 'sb.custom.item.manual', img: storageUrl('produtos/ambi_2.5/fotos/digital/12_ambi2_5_decor.png') },
  { labelKey: 'sb.custom.item.damper', img: storageUrl('produtos/ambi_2.5/fotos/digital/07_ambi2_5_vidro_pilhao.png') },
  { labelKey: 'sb.custom.item.pedal', img: storageUrl('produtos/ambi_2.5/fotos/digital/09_ambi2_5_volteador.png') },
]

const SCROLL_FRAME_COUNT = 60
const SCROLL_FRAMES = Array.from(
  { length: SCROLL_FRAME_COUNT },
  (_, i) => `/assets/AMBI10-scroll-${String(i + 1).padStart(2, '0')}.png`
)

export default function SmartBoxTemplate({ product }: Props) {
  const { t, tf } = useI18n()
  const [slideIndex, setSlideIndex] = useState(0)
  const content = useCategoryContent('smart-box')!
  const { colors: ralColors } = useRalColors('smart-box')
  const { intro: categoryIntro, highlights: categoryHighlights } = useCategoryHighlights('smart-box')
  const { products: relatedRaw } = useProducts({ categorySlug: 'smart-box' })
  const related = relatedRaw.filter((p) => p.id !== product.id)
  const relatedDisplay: { id: string; slug: string; name: string; cover_image: string; capacity?: string }[] =
    related.map((p) => ({ id: p.id, slug: p.slug, name: p.name, cover_image: p.cover_image, capacity: p.specifications?.capacity ?? (p.specifications?.['Capacidade'] as string | undefined) }))

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const spec = product.specifications
  const capacity = spec.capacity ?? (spec['Capacidade'] as string | undefined)
  const acesso = (spec['Acesso'] as string | undefined)
  const instalacao = (spec['Instalação'] as string | undefined)
  const name = product.name

  const SB_FAQS = [
    {
      q: t('sb.faq.capacity.q', { name }),
      a: capacity
        ? t('sb.faq.capacity.a', { name, capacity })
        : t('sb.faq.capacity.a.generic', { name }),
    },
    acesso && {
      q: t('sb.faq.access.q', { name }),
      a: t('sb.faq.access.a', { name, access: acesso.toLowerCase() }),
    },
    instalacao && {
      q: t('sb.faq.install.q', { name }),
      a: t('sb.faq.install.a', { name, install: instalacao.toLowerCase() }),
    },
    {
      q: t('sb.faq.materials.q', { name }),
      a: t('sb.faq.materials.a', { name }),
    },
    {
      q: t('sb.faq.custom.q', { name }),
      a: t('sb.faq.custom.a', { name }),
    },
    {
      q: t('sb.faq.quote.q', { name }),
      a: t('sb.faq.quote.a', { name }),
    },
  ].filter(Boolean) as { q: string; a: string }[]

  const specProperties = [
    capacity && { '@type': 'PropertyValue', name: tf('spec.label.Capacidade', 'Capacidade'), value: capacity },
    acesso && { '@type': 'PropertyValue', name: tf('spec.label.Acesso', 'Acesso'), value: acesso },
    instalacao && { '@type': 'PropertyValue', name: tf('spec.label.Instalação', 'Instalação'), value: instalacao },
    spec.materials?.length && { '@type': 'PropertyValue', name: t('sb.tab.materiais'), value: spec.materials.join(', ') },
    spec.colors?.length && { '@type': 'PropertyValue', name: t('sb.tab.cores'), value: spec.colors.join(', ') },
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
        title={t('sb.seo.title', { name })}
        description={product.short_description ?? product.description}
        path={`/produtos/smart-box/${product.slug}`}
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
              category: 'Smart Box',
              ...(specProperties.length > 0 && { additionalProperty: specProperties }),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('common.home'), item: 'https://www.ambiconcept.pt/' },
                { '@type': 'ListItem', position: 2, name: t('common.products'), item: 'https://www.ambiconcept.pt/produtos' },
                { '@type': 'ListItem', position: 3, name: 'Smart Box', item: 'https://www.ambiconcept.pt/categorias/smart-box' },
                { '@type': 'ListItem', position: 4, name: product.name, item: `https://www.ambiconcept.pt/produtos/smart-box/${product.slug}` },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: SB_FAQS.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ],
        }}
      />

      {/* ── Showcase ──────────────────────────────────────── */}
      <section className="sb-showcase" aria-labelledby="sb-title">
        <div className="sb-showcase-inner">

          <div className="sb-showcase-head">
            <nav aria-label={t('sb.breadcrumb.aria')} className="sb-breadcrumb">
              <Link to="/">{t('common.home')}</Link>
              <span aria-hidden="true">/</span>
              <Link to="/produtos">{t('common.products')}</Link>
              <span aria-hidden="true">/</span>
              <Link to="/categorias/smart-box">Smart Box</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>
            <h1 id="sb-title" className="sb-showcase-title">{product.name}</h1>
            <p className="sb-showcase-desc">
              {product.short_description ?? product.description}
            </p>
          </div>

          <div className="sb-showcase-grid">

            <div className="sb-features-col sb-features-col--left">
              {leftHighlights.map((h, i) => (
                <div key={h.title} className="sb-feature">
                  <span className="sb-feature-icon">{FEATURE_ICONS[i]}</span>
                  <h3 className="sb-feature-title">{h.title}</h3>
                  <p className="sb-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

            <div className="sb-carousel">
              <div className="sb-carousel-stage">
                {product.hero_images.map((img, i) => (
                  <img
                    key={img}
                    src={img}
                    alt={t('sb.carousel.alt', { name, n: i + 1 })}
                    className={`sb-slide${slideIndex === i ? ' sb-slide--active' : ''}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
              {product.hero_images.length > 1 && (
                <div className="sb-carousel-dots" aria-label={t('sb.carousel.dots')}>
                  {product.hero_images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      className={`sb-dot${slideIndex === i ? ' sb-dot--active' : ''}`}
                      aria-label={t('sb.carousel.dot', { n: i + 1 })}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="sb-features-col sb-features-col--right">
              {rightHighlights.map((h, i) => (
                <div key={h.title} className="sb-feature">
                  <span className="sb-feature-icon">{FEATURE_ICONS[i + 2]}</span>
                  <h3 className="sb-feature-title">{h.title}</h3>
                  <p className="sb-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Sobre a categoria ─────────────────────────────── */}
      <section className="sb-intro-section" aria-labelledby="sb-intro-heading">
        <div className="sb-intro-inner">
          <span className="sb-section-eyebrow">{content.eyebrow}</span>
          <h2 id="sb-intro-heading" className="sb-related-title">{content.headline}</h2>
          <p className="sb-intro-text">{categoryIntro}</p>
        </div>
      </section>

      {/* ── Animação de scroll ────────────────────────────── */}
      <section ref={scrollAnimRef} className="sb-scroll-anim" aria-label={t('sb.scroll.label', { name })}>
        <div className="sb-scroll-anim-sticky">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={t('sb.scroll.label', { name })}
            className="sb-scroll-anim-img"
          />
        </div>
      </section>

      {/* ── Personalização ────────────────────────────────── */}
      <section className="sb-custom-section" aria-labelledby="sb-custom-heading">
        <div className="sb-custom-inner">
          <div className="sb-custom-head">
            <h2 id="sb-custom-heading" className="sb-custom-title">
              {t('sb.custom.title', { name })}
            </h2>
            <p className="sb-custom-sub">
              {t('sb.custom.sub.0')}<br />
              {t('sb.custom.sub.1')}<br />
              {t('sb.custom.sub.2')}
            </p>
          </div>
          <div className="sb-custom-grid">
            {SB_CUSTOM_ITEMS.map((item) => (
              <div key={item.labelKey} className="sb-custom-item">
                <div className="sb-custom-img-wrap">
                  <img src={item.img} alt={t(item.labelKey)} className="sb-custom-img" loading="lazy" />
                </div>
                <p className="sb-custom-label">{t(item.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opções ────────────────────────────────────────── */}
      <section className="sb-options-section" aria-label={t('sb.options.aria')}>
        <div className="sb-options-inner">
          <nav className="sb-tabs-nav" role="tablist" aria-label={t('sb.tabs.aria')}>
            {SB_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`sb-tab-btn${activeTab === tab.key ? ' sb-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </nav>

          <div className="sb-tabs-body">
            <div id="sb-panel-materiais" role="tabpanel" className={`sb-tab-panel${activeTab === 'materiais' ? ' sb-tab-panel--active' : ''}`}>
              <ul className="sb-mat-list">
                <li>{t('sb.materials.0')}</li>
                <li>{t('sb.materials.1')}</li>
                <li>{t('sb.materials.2')}</li>
              </ul>
            </div>

            <div id="sb-panel-cores" role="tabpanel" className={`sb-tab-panel${activeTab === 'cores' ? ' sb-tab-panel--active' : ''}`}>
              <p className="sb-tab-desc">{t('sb.colors.desc')}</p>
              <div className="sb-colors-grid">
                {ralColors.map((c) => (
                  <div key={c.code} className="sb-color-item">
                    <div className="sb-color-swatch" style={{ background: c.hex }} />
                    <span className="sb-color-label">{c.code}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="sb-panel-sinaletica" role="tabpanel" className={`sb-tab-panel${activeTab === 'sinaletica' ? ' sb-tab-panel--active' : ''}`}>
              <div className="sb-feature-grid">
                <div className="sb-feature-grid-item">
                  <div className="sb-feature-grid-img-wrap">
                    <img src={storageUrl('produtos/ambi_1.0/tabs/sinaletica-frente.svg')} alt={t('sb.signage.title')} className="sb-feature-grid-img" loading="lazy" />
                  </div>
                  <p className="sb-feature-grid-title">{t('sb.signage.title')}</p>
                  <p className="sb-feature-grid-sub">{t('sb.signage.sub')}</p>
                </div>
              </div>
            </div>

            <div id="sb-panel-sensorizacao" role="tabpanel" className={`sb-tab-panel${activeTab === 'sensorizacao' ? ' sb-tab-panel--active' : ''}`}>
              <div className="sb-feature-grid">
                <div className="sb-feature-grid-item">
                  <div className="sb-feature-grid-img-wrap">
                    <img src={storageUrl('produtos/ambi_1.0/tabs/sensor-controlo.svg')} alt={t('sb.level.title')} className="sb-feature-grid-img" loading="lazy" />
                  </div>
                  <p className="sb-feature-grid-title">{t('sb.level.title')}</p>
                  <p className="sb-feature-grid-sub">{t('sb.level.sub')}</p>
                </div>
                <div className="sb-feature-grid-item">
                  <div className="sb-feature-grid-img-wrap">
                    <img src={storageUrl('produtos/ambi_1.0/tabs/sensor-localizacao.svg')} alt={t('sb.location.title')} className="sb-feature-grid-img" loading="lazy" />
                  </div>
                  <p className="sb-feature-grid-title">{t('sb.location.title')}</p>
                  <p className="sb-feature-grid-sub">{t('sb.location.sub')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vídeo ─────────────────────────────────────────── */}
      <section className="sb-video-section" aria-label={t('sb.video.aria', { name })}>
        <div className="sb-video-wrap">
          <video
            className="sb-video"
            poster={product.hero_images[0] ?? product.cover_image}
            autoPlay
            muted
            loop
            playsInline
            controls
          >
            <source src="/assets/video-smart-box.mp4" type="video/mp4" />
          </video>
          <div className="sb-video-overlay">
            <span className="sb-section-eyebrow">{t('sb.video.eyebrow')}</span>
            <h2 className="sb-video-title">{t('sb.video.title', { name })}</h2>
          </div>
        </div>
      </section>

      {/* ── Produtos Semelhantes ─────────────────────────────── */}
      {relatedDisplay.length > 0 && (
        <section className="sb-related-section" aria-labelledby="sb-related-heading">
          <div className="sb-related-inner">
            <div className="sb-related-head">
              <span className="sb-section-eyebrow">Smart Box</span>
              <h2 id="sb-related-heading" className="sb-related-title">
                {t('sb.related.title')}
              </h2>
              <p className="sb-related-sub">
                {t('sb.related.sub.0')}<br />{t('sb.related.sub.1')}
              </p>
            </div>
            <ul className="sb-related-grid" role="list">
              {relatedDisplay.map((p) => (
                <li key={p.id}>
                  <Link to={`/produtos/smart-box/${p.slug}`} className="sb-related-card">
                    <div className="sb-related-img-wrap">
                      {p.cover_image ? (
                        <img
                          src={p.cover_image}
                          alt={p.name}
                          className="sb-related-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="sb-related-placeholder">
                          <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="sb-related-info">
                      <p className="sb-related-name">{p.name}</p>
                      {p.capacity && <p className="sb-related-capacity">{p.capacity}</p>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── FAQs ──────────────────────────────────────────── */}
      <section className="sb-faq-section" aria-labelledby="sb-faq-heading">
        <div className="sb-faq-inner">
          <div className="sb-faq-head">
            <span className="sb-section-eyebrow">{t('sb.faq.eyebrow')}</span>
            <h2 id="sb-faq-heading" className="sb-related-title">
              {t('sb.faq.title', { name })}
            </h2>
          </div>
          <div className="sb-faq-list">
            {SB_FAQS.map((item, i) => (
              <div key={item.q} className="sb-faq-item">
                <button
                  type="button"
                  className="sb-faq-question"
                  aria-expanded={openFaq === i}
                  aria-controls={`sb-faq-panel-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="sb-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  id={`sb-faq-panel-${i}`}
                  role="region"
                  className={`sb-faq-answer${openFaq === i ? ' sb-faq-answer--open' : ''}`}
                >
                  <div className="sb-faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sistemas de Recolha ───────────────────────────── */}
      <section className="sb-flow-section" aria-label={t('sb.flow.aria')}>
        <div className="sb-flow-inner">
          <div className="sb-flow-grid">
            <div className="sb-flow-item">
              <h2 className="sb-flow-title">{t('sb.flow.bio.title')}</h2>
              <p className="sb-flow-sub">
                <span className="sb-flow-sub-line">{t('sb.flow.bio.sub.0')}</span><br />
                <span className="sb-flow-sub-line">{t('sb.flow.bio.sub.1')}</span>
              </p>
              <Link to="/fluxos/porta-a-porta" className="sb-flow-badge">
                {t('sb.flow.bio.badge')}
              </Link>
            </div>
            <div className="sb-flow-item">
              <h2 className="sb-flow-title">{t('sb.flow.uco.title')}</h2>
              <p className="sb-flow-sub">
                <span className="sb-flow-sub-line">{t('sb.flow.uco.sub.0')}</span><br />
                <span className="sb-flow-sub-line">{t('sb.flow.uco.sub.1')}</span>
              </p>
              <Link to="/categorias/smart-box" className="sb-flow-badge">
                {t('sb.flow.uco.badge')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="sb-cta-section" aria-labelledby="sb-cta-heading">
        <div className="sb-cta-inner">
          <h2 id="sb-cta-heading" className="sb-cta-title">
            {t('sb.cta.title.0')}<br />{t('sb.cta.title.1')}<br />{t('sb.cta.title.2')}
          </h2>
          <p className="sb-cta-sub">
            {t('sb.cta.sub')}
          </p>
          <Link to="/contactos" className="btn-dark">
            {t('sb.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  )
}
