import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { getCategoryContent } from '@/data/categories-content'
import { storageUrl } from '@/data/local'
import { useProducts } from '@/hooks/useProducts'
import { useRalColors } from '@/hooks/useRalColors'
import { useCategoryHighlights } from '@/hooks/useCategoryHighlights'
import PageSeo from '@/components/seo/PageSeo'
import { FEATURE_ICONS } from './carga-vertical-feature-icons'
import '@/styles/template-papeleiras.css'

interface Props {
  product: Product
}

const PP_TABS = [
  { key: 'materiais',  label: 'Materiais' },
  { key: 'cores',      label: 'Cores' },
  { key: 'decoracao',  label: 'Decoração' },
  { key: 'sinaletica', label: 'Sinalética' },
]

const CUSTOM_ITEMS: Record<string, { label: string; img: string }[]> = {
  'ambi-urban': [{ label: 'Fixação', img: storageUrl('produtos/ambi_urban/personalizacao/fixacao.png') }],
  'ambi-beach': [{ label: 'Ancoragem', img: storageUrl('produtos/ambi_beach/personalizacao/ancoragem.png') }],
}
const CUSTOM_ITEMS_DEFAULT = [{ label: 'Fixação', img: storageUrl('produtos/ambi_urban/personalizacao/fixacao.png') }]

// TODO: substituir os placeholders (AMBI2.7-*) quando houver assets próprios para os restantes produtos
const DECOR_ITEMS: Record<string, { label: string; img: string }[]> = {
  'ambi-urban': [
    { label: 'Decoração de Frente', img: storageUrl('produtos/ambi_urban/tabs/decor-frente.svg') },
    { label: 'Decoração Lateral', img: storageUrl('produtos/ambi_urban/tabs/decor-lateral.svg') },
  ],
  'ambi-beach': [
    { label: 'Decoração de Frente', img: storageUrl('produtos/ambi_beach/tabs/decor-frente.svg') },
    { label: 'Decoração Lateral', img: storageUrl('produtos/ambi_beach/tabs/decor-lateral.svg') },
  ],
}
const DECOR_ITEMS_DEFAULT = [
  { label: 'Decoração de Frente', img: '/assets/AMBI2.7-decor-frentes.svg' },
  { label: 'Decoração de Laterais', img: '/assets/AMBI2.7-decor-laterais.svg' },
]

const SINAL_ITEMS: Record<string, { label: string; sub: string; img: string }[]> = {
  'ambi-urban': [
    { label: 'Sinalética', sub: 'Área útil para informação', img: storageUrl('produtos/ambi_urban/tabs/sinaletica-frente.svg') },
  ],
  'ambi-beach': [
    { label: 'Sinalética', sub: 'Área útil para informação', img: storageUrl('produtos/ambi_beach/tabs/sinaletica-frente.svg') },
  ],
}
const SINAL_ITEMS_DEFAULT = [
  { label: 'Placa de Resíduo', sub: 'Área útil para informação', img: '/assets/AMBI2.7-placa-residuo.svg' },
  { label: 'Placa de Entidade', sub: 'Área útil para informação', img: '/assets/AMBI2.7-placa-entidade.svg' },
]

export default function PapeleirasTemplate({ product }: Props) {
  const [slideIndex, setSlideIndex] = useState(0)
  const content = getCategoryContent('limpeza-urbana')!
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
  const introText = capacity
    ? `A ${product.name} foi desenvolvida para uso intensivo em espaço público, com capacidade de ${capacity}. Estrutura robusta, com opções de fixação a poste, mural ou solo, adaptada a qualquer contexto urbano.`
    : categoryIntro

  const PP_FAQS = [
    {
      q: `Qual a capacidade da ${product.name}?`,
      a: capacity
        ? `A ${product.name} tem capacidade de ${capacity}.`
        : `A ${product.name} está disponível em diferentes capacidades, adequadas a espaço público de alta frequência de uso.`,
    },
    fixacao && {
      q: `Que opções de fixação tem a ${product.name}?`,
      a: `A ${product.name} pode ser fixada a ${fixacao}, adaptando-se ao contexto urbano onde vai ser instalada.`,
    },
    {
      q: `Que materiais compõem a ${product.name}?`,
      a: `O corpo da ${product.name} é fabricado em aço resistente a uso intensivo, com interior amovível que facilita o esvaziamento e a manutenção higiénica.`,
    },
    {
      q: `É possível personalizar a cor e o logótipo da ${product.name}?`,
      a: `Sim. A ${product.name} pode ser configurada com cores RAL personalizadas e logótipo do município ou entidade.`,
    },
    {
      q: `Como posso pedir um orçamento ou ficha técnica da ${product.name}?`,
      a: 'Contacte a nossa equipa através da página de contactos, indicando a quantidade pretendida e o contexto de instalação — preparamos uma proposta e ficha técnica adaptadas ao seu projeto.',
    },
  ].filter(Boolean) as { q: string; a: string }[]

  const specProperties = [
    capacity && { '@type': 'PropertyValue', name: 'Capacidade', value: capacity },
    fixacao && { '@type': 'PropertyValue', name: 'Fixação', value: fixacao },
    spec.materials?.length && { '@type': 'PropertyValue', name: 'Materiais', value: spec.materials.join(', ') },
    spec.colors?.length && { '@type': 'PropertyValue', name: 'Cores', value: spec.colors.join(', ') },
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
        title={`${product.name} — Limpeza Urbana`}
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
              category: 'Limpeza Urbana',
              ...(specProperties.length > 0 && { additionalProperty: specProperties }),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.ambiconcept.pt/' },
                { '@type': 'ListItem', position: 2, name: 'Produtos', item: 'https://www.ambiconcept.pt/produtos' },
                { '@type': 'ListItem', position: 3, name: 'Limpeza Urbana', item: 'https://www.ambiconcept.pt/categorias/limpeza-urbana' },
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
            <nav aria-label="Localização" className="pp-breadcrumb">
              <Link to="/">Início</Link>
              <span aria-hidden="true">/</span>
              <Link to="/produtos">Produtos</Link>
              <span aria-hidden="true">/</span>
              <Link to="/categorias/limpeza-urbana">Limpeza Urbana</Link>
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
                    alt={`${product.name} — variante ${i + 1}`}
                    className={`pp-slide${slideIndex === i ? ' pp-slide--active' : ''}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
              {product.hero_images.length > 1 && (
                <div className="pp-carousel-dots" aria-label="Selecionar variante">
                  {product.hero_images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      className={`pp-dot${slideIndex === i ? ' pp-dot--active' : ''}`}
                      aria-label={`Variante ${i + 1}`}
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
      <section className="pp-custom-section" aria-label="Personalização">
        <div className="pp-custom-inner">
          <div className="pp-custom-grid">
            {customItems.map((item) => (
              <div key={item.label} className="pp-custom-item">
                <div className="pp-custom-img-wrap">
                  <img src={item.img} alt={item.label} className="pp-custom-img" loading="lazy" />
                </div>
                <p className="pp-custom-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opções ────────────────────────────────────────── */}
      <section className="pp-options-section" aria-label="Opções de personalização">
        <div className="pp-options-inner">
          <nav className="pp-tabs-nav" role="tablist" aria-label="Categorias de personalização">
            {PP_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`pp-tab-btn${activeTab === tab.key ? ' pp-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="pp-tabs-body">
            <div id="pp-panel-materiais" role="tabpanel" className={`pp-tab-panel${activeTab === 'materiais' ? ' pp-tab-panel--active' : ''}`}>
              <ul className="pp-mat-list">
                <li>Estrutura em aço pintado, resistente a uso intensivo</li>
                <li>Interior amovível em PEAD, facilita o esvaziamento e a limpeza</li>
                <li>Versão costeira em aço inox com tratamento anticorrosão salino</li>
              </ul>
            </div>

            <div id="pp-panel-cores" role="tabpanel" className={`pp-tab-panel${activeTab === 'cores' ? ' pp-tab-panel--active' : ''}`}>
              <p className="pp-tab-desc">Cores standard disponíveis para a tampa do equipamento.</p>
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
                      <img src={item.img} alt={item.label} className="pp-feature-grid-img" loading="lazy" />
                    </div>
                    <p className="pp-feature-grid-title">{item.label}</p>
                    <p className="pp-feature-grid-sub">Área útil para personalização</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="pp-panel-sinaletica" role="tabpanel" className={`pp-tab-panel${activeTab === 'sinaletica' ? ' pp-tab-panel--active' : ''}`}>
              <div className="pp-feature-grid">
                {sinalItems.map((item) => (
                  <div key={item.label} className="pp-feature-grid-item">
                    <div className="pp-feature-grid-img-wrap">
                      <img src={item.img} alt={item.label} className="pp-feature-grid-img" loading="lazy" />
                    </div>
                    <p className="pp-feature-grid-title">{item.label}</p>
                    <p className="pp-feature-grid-sub">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Vídeo ─────────────────────────────────────────── */}
      <section className="pp-video-section" aria-label={`Vídeo — ${product.name}`}>
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
            <span className="pp-section-eyebrow">Vídeo</span>
            <h2 className="pp-video-title">Veja a {product.name} em ação</h2>
          </div>
        </div>
      </section>

      {/* ── Produtos Semelhantes ─────────────────────────────── */}
      {relatedDisplay.length > 0 && (
        <section className="pp-related-section" aria-labelledby="pp-related-heading">
          <div className="pp-related-inner">
            <div className="pp-related-head">
              <span className="pp-section-eyebrow">Limpeza Urbana</span>
              <h2 id="pp-related-heading" className="pp-related-title">
                Produtos Semelhantes
              </h2>
              <p className="pp-related-sub">
                Outras soluções de mobiliário urbano adaptadas <br />às necessidades de cada município.
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
            <span className="pp-section-eyebrow">Perguntas Frequentes</span>
            <h2 id="pp-faq-heading" className="pp-related-title">
              Dúvidas sobre a {product.name}
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
            Apresente o seu projeto. <br />Os nossos especialistas <br />encontram a solução certa.
          </h2>
          <p className="pp-cta-sub">
            Partilhe os requisitos do seu município. Desenvolvemos a solução de mobiliário urbano mais adequada ao seu contexto.
          </p>
          <Link to="/contactos" className="btn-dark">
            Falar com um Especialista
          </Link>
        </div>
      </section>
    </div>
  )
}
