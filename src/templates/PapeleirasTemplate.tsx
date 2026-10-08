import { useState, useEffect } from 'react'
import { Link } from '@/i18n/router'
import type { Product } from '@/types'
import { storageUrl } from '@/data/local'
import { useI18n } from '@/i18n'
import { useCategoryContent } from '@/hooks/useCategoryContent'
import { useProducts } from '@/hooks/useProducts'
import { useRalColors } from '@/hooks/useRalColors'
import { useCategoryHighlights } from '@/hooks/useCategoryHighlights'
import PageSeo from '@/components/seo/PageSeo'
import { FEATURE_ICONS } from './carga-vertical-feature-icons'
import '@/styles/template-papeleiras.css'

interface Props {
  product: Product
}

// `label` guarda a chave i18n; t() é chamado ao desenhar
const PP_TABS = [
  { key: 'materiais',  label: 'pp.tab.materiais' },
  { key: 'cores',      label: 'pp.tab.cores' },
  { key: 'decoracao',  label: 'pp.tab.decoracao' },
  { key: 'sinaletica', label: 'pp.tab.sinaletica' },
]

const CUSTOM_ITEMS: Record<string, { label: string; img: string }[]> = {
  'ambi-urban': [{ label: 'pp.custom.fixacao', img: storageUrl('produtos/ambi_urban/personalizacao/fixacao.png') }],
  'ambi-beach': [{ label: 'pp.custom.ancoragem', img: storageUrl('produtos/ambi_beach/personalizacao/ancoragem.png') }],
}
const CUSTOM_ITEMS_DEFAULT = [{ label: 'pp.custom.fixacao', img: storageUrl('produtos/ambi_urban/personalizacao/fixacao.png') }]

// TODO: substituir os placeholders (AMBI2.7-*) quando houver assets próprios para os restantes produtos
const DECOR_ITEMS: Record<string, { label: string; img: string }[]> = {
  'ambi-urban': [
    { label: 'pp.decor.frente', img: storageUrl('produtos/ambi_urban/tabs/decor-frente.svg') },
    { label: 'pp.decor.lateral', img: storageUrl('produtos/ambi_urban/tabs/decor-lateral.svg') },
  ],
  'ambi-beach': [
    { label: 'pp.decor.frente', img: storageUrl('produtos/ambi_beach/tabs/decor-frente.svg') },
    { label: 'pp.decor.lateral', img: storageUrl('produtos/ambi_beach/tabs/decor-lateral.svg') },
  ],
}
const DECOR_ITEMS_DEFAULT = [
  { label: 'pp.decor.frente', img: '/assets/AMBI2.7-decor-frentes.svg' },
  { label: 'pp.decor.laterais', img: '/assets/AMBI2.7-decor-laterais.svg' },
]

const SINAL_ITEMS: Record<string, { label: string; sub: string; img: string }[]> = {
  'ambi-urban': [
    { label: 'pp.sinal.label', sub: 'pp.sinal.sub', img: storageUrl('produtos/ambi_urban/tabs/sinaletica-frente.svg') },
  ],
  'ambi-beach': [
    { label: 'pp.sinal.label', sub: 'pp.sinal.sub', img: storageUrl('produtos/ambi_beach/tabs/sinaletica-frente.svg') },
  ],
}
const SINAL_ITEMS_DEFAULT = [
  { label: 'pp.sinal.placaResiduo', sub: 'pp.sinal.sub', img: '/assets/AMBI2.7-placa-residuo.svg' },
  { label: 'pp.sinal.placaEntidade', sub: 'pp.sinal.sub', img: '/assets/AMBI2.7-placa-entidade.svg' },
]

export default function PapeleirasTemplate({ product }: Props) {
  const { t, tf } = useI18n()
  const [slideIndex, setSlideIndex] = useState(0)
  const content = useCategoryContent('limpeza-urbana')!
  const { colors: ralColors } = useRalColors('limpeza-urbana')
  const { intro: categoryIntro, highlights: categoryHighlights } = useCategoryHighlights('limpeza-urbana')
  const { products: relatedRaw } = useProducts({ categorySlug: 'limpeza-urbana' })
  const related = relatedRaw.filter((p) => p.id !== product.id)
  const relatedDisplay: { id: string; slug: string; name: string; cover_image: string; capacity?: string }[] =
    related.map((p) => ({ id: p.id, slug: p.slug, name: p.name, cover_image: p.cover_image, capacity: p.specifications?.capacity ?? (p.specifications?.['Capacidade'] as string | undefined) }))

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const spec = product.specifications
  const capacity = spec.capacity ?? (spec['Capacidade'] as string | undefined)
  const fixacao = (spec['Fixação'] as string | undefined)
  const name = product.name
  const introText = capacity
    ? t('pp.intro.withCapacity', { name, capacity })
    : categoryIntro

  const PP_FAQS = [
    {
      q: t('pp.faq.capacity.q', { name }),
      a: capacity
        ? t('pp.faq.capacity.a.with', { name, capacity })
        : t('pp.faq.capacity.a.without', { name }),
    },
    fixacao && {
      q: t('pp.faq.fixacao.q', { name }),
      a: t('pp.faq.fixacao.a', { name, fixacao }),
    },
    {
      q: t('pp.faq.materials.q', { name }),
      a: t('pp.faq.materials.a', { name }),
    },
    {
      q: t('pp.faq.custom.q', { name }),
      a: t('pp.faq.custom.a', { name }),
    },
    {
      q: t('pp.faq.quote.q', { name }),
      a: t('pp.faq.quote.a'),
    },
  ].filter(Boolean) as { q: string; a: string }[]

  const specProperties = [
    capacity && { '@type': 'PropertyValue', name: tf('spec.label.Capacidade', 'Capacidade'), value: capacity },
    fixacao && { '@type': 'PropertyValue', name: tf('spec.label.Fixação', 'Fixação'), value: fixacao },
    spec.materials?.length && { '@type': 'PropertyValue', name: t('pp.tab.materiais'), value: spec.materials.join(', ') },
    spec.colors?.length && { '@type': 'PropertyValue', name: t('pp.tab.cores'), value: spec.colors.join(', ') },
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
  const decorItems = DECOR_ITEMS[product.slug] ?? DECOR_ITEMS_DEFAULT
  const sinalItems = SINAL_ITEMS[product.slug] ?? SINAL_ITEMS_DEFAULT
  const customItems = CUSTOM_ITEMS[product.slug] ?? CUSTOM_ITEMS_DEFAULT

  const [activeTab, setActiveTab] = useState('materiais')

  return (
    <div className="min-h-screen bg-white">
      <PageSeo
        title={t('pp.seo.title', { name })}
        description={product.short_description ?? product.description}
        path={`/produtos/limpeza-urbana/${product.slug}`}
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
              category: t('pp.category'),
              ...(specProperties.length > 0 && { additionalProperty: specProperties }),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('common.home'), item: 'https://www.ambiconcept.pt/' },
                { '@type': 'ListItem', position: 2, name: t('common.products'), item: 'https://www.ambiconcept.pt/produtos' },
                { '@type': 'ListItem', position: 3, name: t('pp.category'), item: 'https://www.ambiconcept.pt/categorias/limpeza-urbana' },
                { '@type': 'ListItem', position: 4, name: product.name, item: `https://www.ambiconcept.pt/produtos/limpeza-urbana/${product.slug}` },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: PP_FAQS.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ],
        }}
      />

      {/* ── Showcase ──────────────────────────────────────── */}
      <section className="pp-showcase" aria-labelledby="pp-title">
        <div className="pp-showcase-inner">

          <div className="pp-showcase-head">
            <nav aria-label={t('pp.breadcrumb.aria')} className="pp-breadcrumb">
              <Link to="/">{t('common.home')}</Link>
              <span aria-hidden="true">/</span>
              <Link to="/produtos">{t('common.products')}</Link>
              <span aria-hidden="true">/</span>
              <Link to="/categorias/limpeza-urbana">{t('pp.category')}</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>
            <h1 id="pp-title" className="pp-showcase-title">{product.name}</h1>
            <p className="pp-showcase-desc">
              {product.short_description ?? product.description}
            </p>
          </div>

          <div className="pp-showcase-grid">

            <div className="pp-features-col pp-features-col--left">
              {leftHighlights.map((h, i) => (
                <div key={h.title} className="pp-feature">
                  <span className="pp-feature-icon">{FEATURE_ICONS[i]}</span>
                  <h3 className="pp-feature-title">{h.title}</h3>
                  <p className="pp-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

            <div className="pp-carousel">
              <div className="pp-carousel-stage">
                {product.hero_images.map((img, i) => (
                  <img
                    key={img}
                    src={img}
                    alt={t('pp.carousel.alt', { name, n: i + 1 })}
                    className={`pp-slide${slideIndex === i ? ' pp-slide--active' : ''}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
              {product.hero_images.length > 1 && (
                <div className="pp-carousel-dots" aria-label={t('pp.carousel.select')}>
                  {product.hero_images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      className={`pp-dot${slideIndex === i ? ' pp-dot--active' : ''}`}
                      aria-label={t('pp.carousel.variant', { n: i + 1 })}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="pp-features-col pp-features-col--right">
              {rightHighlights.map((h, i) => (
                <div key={h.title} className="pp-feature">
                  <span className="pp-feature-icon">{FEATURE_ICONS[i + 2]}</span>
                  <h3 className="pp-feature-title">{h.title}</h3>
                  <p className="pp-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Sobre a categoria ─────────────────────────────── */}
      <section className="pp-intro-section" aria-labelledby="pp-intro-heading">
        <div className="pp-intro-inner">
          <span className="pp-section-eyebrow">{content.eyebrow}</span>
          <h2 id="pp-intro-heading" className="pp-related-title">{content.headline}</h2>
          <p className="pp-intro-text">{introText}</p>
        </div>
      </section>

      {/* ── Personalização ────────────────────────────────── */}
      <section className="pp-custom-section" aria-label={t('pp.custom.aria')}>
        <div className="pp-custom-inner">
          <div className="pp-custom-grid">
            {customItems.map((item) => (
              <div key={item.label} className="pp-custom-item">
                <div className="pp-custom-img-wrap">
                  <img src={item.img} alt={t(item.label)} className="pp-custom-img" loading="lazy" />
                </div>
                <p className="pp-custom-label">{t(item.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opções ────────────────────────────────────────── */}
      <section className="pp-options-section" aria-label={t('pp.options.aria')}>
        <div className="pp-options-inner">
          <nav className="pp-tabs-nav" role="tablist" aria-label={t('pp.tabs.aria')}>
            {PP_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`pp-tab-btn${activeTab === tab.key ? ' pp-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {t(tab.label)}
              </button>
            ))}
          </nav>

          <div className="pp-tabs-body">
            <div id="pp-panel-materiais" role="tabpanel" className={`pp-tab-panel${activeTab === 'materiais' ? ' pp-tab-panel--active' : ''}`}>
              <ul className="pp-mat-list">
                <li>{t('pp.mat.0')}</li>
                <li>{t('pp.mat.1')}</li>
                <li>{t('pp.mat.2')}</li>
              </ul>
            </div>

            <div id="pp-panel-cores" role="tabpanel" className={`pp-tab-panel${activeTab === 'cores' ? ' pp-tab-panel--active' : ''}`}>
              <p className="pp-tab-desc">{t('pp.cores.desc')}</p>
              <div className="pp-colors-grid">
                {ralColors.map((c) => (
                  <div key={c.code} className="pp-color-item">
                    <div className="pp-color-swatch" style={{ background: c.hex }} />
                    <span className="pp-color-label">{c.code}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="pp-panel-decoracao" role="tabpanel" className={`pp-tab-panel${activeTab === 'decoracao' ? ' pp-tab-panel--active' : ''}`}>
              <div className="pp-feature-grid">
                {decorItems.map((item) => (
                  <div key={item.label} className="pp-feature-grid-item">
                    <div className="pp-feature-grid-img-wrap">
                      <img src={item.img} alt={t(item.label)} className="pp-feature-grid-img" loading="lazy" />
                    </div>
                    <p className="pp-feature-grid-title">{t(item.label)}</p>
                    <p className="pp-feature-grid-sub">{t('pp.decor.sub')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="pp-panel-sinaletica" role="tabpanel" className={`pp-tab-panel${activeTab === 'sinaletica' ? ' pp-tab-panel--active' : ''}`}>
              <div className="pp-feature-grid">
                {sinalItems.map((item) => (
                  <div key={item.label} className="pp-feature-grid-item">
                    <div className="pp-feature-grid-img-wrap">
                      <img src={item.img} alt={t(item.label)} className="pp-feature-grid-img" loading="lazy" />
                    </div>
                    <p className="pp-feature-grid-title">{t(item.label)}</p>
                    <p className="pp-feature-grid-sub">{t(item.sub)}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Vídeo ─────────────────────────────────────────── */}
      <section className="pp-video-section" aria-label={t('pp.video.aria', { name })}>
        <div className="pp-video-wrap">
          <video
            className="pp-video"
            poster={product.hero_images[0] ?? product.cover_image}
            autoPlay
            muted
            loop
            playsInline
            controls
          >
            <source src="/assets/video-papeleiras.mp4" type="video/mp4" />
          </video>
          <div className="pp-video-overlay">
            <span className="pp-section-eyebrow">{t('pp.video.eyebrow')}</span>
            <h2 className="pp-video-title">{t('pp.video.title', { name })}</h2>
          </div>
        </div>
      </section>

      {/* ── Produtos Semelhantes ─────────────────────────────── */}
      {relatedDisplay.length > 0 && (
        <section className="pp-related-section" aria-labelledby="pp-related-heading">
          <div className="pp-related-inner">
            <div className="pp-related-head">
              <span className="pp-section-eyebrow">{t('pp.category')}</span>
              <h2 id="pp-related-heading" className="pp-related-title">
                {t('pp.related.title')}
              </h2>
              <p className="pp-related-sub">
                {t('pp.related.sub.1')}{' '}<br />{t('pp.related.sub.2')}
              </p>
            </div>
            <ul className="pp-related-grid" role="list">
              {relatedDisplay.map((p) => (
                <li key={p.id}>
                  <Link to={`/produtos/limpeza-urbana/${p.slug}`} className="pp-related-card">
                    <div className="pp-related-img-wrap">
                      {p.cover_image ? (
                        <img
                          src={p.cover_image}
                          alt={p.name}
                          className="pp-related-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="pp-related-placeholder">
                          <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="pp-related-info">
                      <p className="pp-related-name">{p.name}</p>
                      {p.capacity && <p className="pp-related-capacity">{p.capacity}</p>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── FAQs ──────────────────────────────────────────── */}
      <section className="pp-faq-section" aria-labelledby="pp-faq-heading">
        <div className="pp-faq-inner">
          <div className="pp-faq-head">
            <span className="pp-section-eyebrow">{t('pp.faq.eyebrow')}</span>
            <h2 id="pp-faq-heading" className="pp-related-title">
              {t('pp.faq.title', { name })}
            </h2>
          </div>
          <div className="pp-faq-list">
            {PP_FAQS.map((item, i) => (
              <div key={item.q} className="pp-faq-item">
                <button
                  type="button"
                  className="pp-faq-question"
                  aria-expanded={openFaq === i}
                  aria-controls={`pp-faq-panel-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="pp-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  id={`pp-faq-panel-${i}`}
                  role="region"
                  className={`pp-faq-answer${openFaq === i ? ' pp-faq-answer--open' : ''}`}
                >
                  <div className="pp-faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="pp-cta-section" aria-labelledby="pp-cta-heading">
        <div className="pp-cta-inner">
          <h2 id="pp-cta-heading" className="pp-cta-title">
            {t('pp.cta.title.1')} <br />{t('pp.cta.title.2')} <br />{t('pp.cta.title.3')}
          </h2>
          <p className="pp-cta-sub">
            {t('pp.cta.sub')}
          </p>
          <Link to="/contactos" className="btn-dark">
            {t('pp.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  )
}
