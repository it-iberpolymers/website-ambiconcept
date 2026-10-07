import { useState, useEffect, useRef } from 'react'
import { useScrollSequence } from '@/hooks/useScrollSequence'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { getCategoryContent } from '@/data/categories-content'
import { useProducts } from '@/hooks/useProducts'
import { useRalColors } from '@/hooks/useRalColors'
import { useCategoryHighlights } from '@/hooks/useCategoryHighlights'
import PageSeo from '@/components/seo/PageSeo'
import { AMBI_FOUR_FEATURE_ICONS as FEATURE_ICONS } from './ambi-four-feature-icons'
import '@/styles/template-carga-traseira.css'

interface Props {
  product: Product
}

const CT_TABS = [
  { key: 'materiais', label: 'Materiais' },
  { key: 'cores',     label: 'Cores' },
  { key: 'rodas',     label: 'Rodas' },
]

const SCROLL_FRAME_COUNT = 60
const SCROLL_FRAMES = Array.from(
  { length: SCROLL_FRAME_COUNT },
  (_, i) => `/assets/AMBITWO-scroll-${String(i + 1).padStart(2, '0')}.png`
)

export default function CargaTraseiraTemplate({ product }: Props) {
  const [slideIndex, setSlideIndex] = useState(0)
  const content = getCategoryContent('carga-traseira')!
  const { colors: ralColors } = useRalColors('carga-traseira')
  const { intro: categoryIntro, highlights: sharedHighlights } = useCategoryHighlights('carga-traseira')
  // AMBI FOUR não é de fácil manuseamento (é de grande capacidade) — substitui esse
  // destaque, partilhado com o AMBI TWO, só neste template.
  const categoryHighlights = sharedHighlights.map((h) =>
    h.title === 'Fácil Manuseamento'
      ? { title: 'Personalização', description: 'Frente e tampa preparadas para personalizar o contentor com logótipo do município.' }
      : h
  )
  const { products: relatedRaw } = useProducts({ categorySlug: 'carga-traseira' })
  const related = relatedRaw.filter((p) => p.id !== product.id && !p.slug.startsWith('ambi-two'))
  const relatedDisplay: { id: string; slug: string; name: string; cover_image: string; capacity?: string }[] =
    related.map((p) => ({ id: p.id, slug: p.slug, name: p.name, cover_image: p.cover_image, capacity: p.specifications?.capacity ?? (p.specifications?.['Capacidade'] as string | undefined) }))

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const spec = product.specifications
  const capacity = spec.capacity ?? (spec['Capacidade'] as string | undefined)
  const rodas = (spec['Rodas'] as string | undefined)
  const fracoes = (spec['Frações'] as string | undefined)

  const CT_FAQS = [
    {
      q: `Qual a capacidade do ${product.name}?`,
      a: capacity
        ? `O ${product.name} tem capacidade de ${capacity}, adaptando-se a qualquer tipologia de habitação.`
        : `O ${product.name} está disponível em diferentes capacidades, adequadas à recolha porta-a-porta.`,
    },
    rodas && {
      q: `Quantas rodas tem o ${product.name}?`,
      a: `O ${product.name} está disponível com ${rodas.toLowerCase()} rodas, facilitando a movimentação e a recolha.`,
    },
    fracoes && {
      q: `Que frações de resíduos posso recolher com o ${product.name}?`,
      a: `O ${product.name} está preparado para as seguintes frações: ${fracoes.toLowerCase()}.`,
    },
    {
      q: `O ${product.name} é compatível com identificação RFID?`,
      a: `Sim. O ${product.name} pode ser equipado com sistema de identificação por RFID, para controlo e monitorização da recolha.`,
    },
    {
      q: `Que materiais compõem o ${product.name}?`,
      a: `O corpo do ${product.name} é fabricado em PEAD, resistente a uso intensivo e às condições climáticas.`,
    },
    {
      q: `Como posso pedir um orçamento ou ficha técnica do ${product.name}?`,
      a: 'Contacte a nossa equipa através da página de contactos, indicando a quantidade pretendida e o contexto de instalação — preparamos uma proposta e ficha técnica adaptadas ao seu projeto.',
    },
  ].filter(Boolean) as { q: string; a: string }[]

  const specProperties = [
    capacity && { '@type': 'PropertyValue', name: 'Capacidade', value: capacity },
    rodas && { '@type': 'PropertyValue', name: 'Rodas', value: rodas },
    fracoes && { '@type': 'PropertyValue', name: 'Frações', value: fracoes },
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

  const [activeTab, setActiveTab] = useState('materiais')

  const scrollAnimRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useScrollSequence(scrollAnimRef, canvasRef, SCROLL_FRAMES)

  return (
    <div className="min-h-screen bg-white">
      <PageSeo
        title={`${product.name} — Carga Traseira`}
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
              category: 'Carga Traseira',
              ...(specProperties.length > 0 && { additionalProperty: specProperties }),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.ambiconcept.pt/' },
                { '@type': 'ListItem', position: 2, name: 'Produtos', item: 'https://www.ambiconcept.pt/produtos' },
                { '@type': 'ListItem', position: 3, name: 'Carga Traseira', item: 'https://www.ambiconcept.pt/categorias/carga-traseira' },
                { '@type': 'ListItem', position: 4, name: product.name, item: `https://www.ambiconcept.pt/produtos/carga-traseira/${product.slug}` },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: CT_FAQS.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ],
        }}
      />

      {/* ── Showcase ──────────────────────────────────────── */}
      <section className="ct-showcase" aria-labelledby="ct-title">
        <div className="ct-showcase-inner">

          <div className="ct-showcase-head">
            <nav aria-label="Localização" className="ct-breadcrumb">
              <Link to="/">Início</Link>
              <span aria-hidden="true">/</span>
              <Link to="/produtos">Produtos</Link>
              <span aria-hidden="true">/</span>
              <Link to="/categorias/carga-traseira">Carga Traseira</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>
            <h1 id="ct-title" className="ct-showcase-title">{product.name}</h1>
            <p className="ct-showcase-desc">
              {product.short_description ?? product.description}
            </p>
          </div>

          <div className="ct-showcase-grid">

            <div className="ct-features-col ct-features-col--left">
              {leftHighlights.map((h, i) => (
                <div key={h.title} className="ct-feature">
                  <span className="ct-feature-icon">{FEATURE_ICONS[i]}</span>
                  <h3 className="ct-feature-title">{h.title}</h3>
                  <p className="ct-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

            <div className="ct-carousel">
              <div className="ct-carousel-stage">
                {product.hero_images.map((img, i) => (
                  <img
                    key={img}
                    src={img}
                    alt={`${product.name} — variante ${i + 1}`}
                    className={`ct-slide${slideIndex === i ? ' ct-slide--active' : ''}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
              {product.hero_images.length > 1 && (
                <div className="ct-carousel-dots" aria-label="Selecionar variante">
                  {product.hero_images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      className={`ct-dot${slideIndex === i ? ' ct-dot--active' : ''}`}
                      aria-label={`Variante ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="ct-features-col ct-features-col--right">
              {rightHighlights.map((h, i) => (
                <div key={h.title} className="ct-feature">
                  <span className="ct-feature-icon">{FEATURE_ICONS[i + 2]}</span>
                  <h3 className="ct-feature-title">{h.title}</h3>
                  <p className="ct-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Sobre a categoria ─────────────────────────────── */}
      <section className="ct-intro-section" aria-labelledby="ct-intro-heading">
        <div className="ct-intro-inner">
          <span className="ct-section-eyebrow">{content.eyebrow}</span>
          <h2 id="ct-intro-heading" className="ct-related-title">{content.headline}</h2>
          <p className="ct-intro-text">{categoryIntro}</p>
        </div>
      </section>

      {/* ── Animação de scroll ────────────────────────────── */}
      <section ref={scrollAnimRef} className="ct-scroll-anim" aria-label={`${product.name} — vista em detalhe`}>
        <div className="ct-scroll-anim-sticky">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`${product.name} — vista em detalhe`}
            className="ct-scroll-anim-img"
          />
        </div>
      </section>

      {/* ── Opções ────────────────────────────────────────── */}
      <section className="ct-options-section" aria-label="Opções de personalização">
        <div className="ct-options-inner">
          <nav className="ct-tabs-nav" role="tablist" aria-label="Categorias de personalização">
            {CT_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`ct-tab-btn${activeTab === tab.key ? ' ct-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="ct-tabs-body">
            <div id="ct-panel-materiais" role="tabpanel" className={`ct-tab-panel${activeTab === 'materiais' ? ' ct-tab-panel--active' : ''}`}>
              <ul className="ct-mat-list">
                <li>Corpo em polietileno de alta densidade (PEAD), resistente a uso intensivo</li>
                <li>Rodas reforçadas para movimentação diária</li>
                <li>Compatível com sistemas de identificação RFID</li>
              </ul>
            </div>

            <div id="ct-panel-cores" role="tabpanel" className={`ct-tab-panel${activeTab === 'cores' ? ' ct-tab-panel--active' : ''}`}>
              <p className="ct-tab-desc">Cores standard disponíveis para o corpo do contentor.</p>
              <div className="ct-colors-grid">
                {ralColors.map((c) => (
                  <div key={c.code} className="ct-color-item">
                    <div className="ct-color-swatch" style={{ background: c.hex }} />
                    <span className="ct-color-label">{c.code}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="ct-panel-rodas" role="tabpanel" className={`ct-tab-panel${activeTab === 'rodas' ? ' ct-tab-panel--active' : ''}`}>
              <p className="ct-tab-desc">
                {rodas
                  ? `Disponível com ${rodas.toLowerCase()} rodas, para facilitar a movimentação e a recolha em qualquer contexto.`
                  : 'Disponível com 2 ou 4 rodas, para facilitar a movimentação e a recolha em qualquer contexto.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vídeo ─────────────────────────────────────────── */}
      <section className="ct-video-section" aria-label={`Vídeo — ${product.name}`}>
        <div className="ct-video-wrap">
          <video
            className="ct-video"
            poster={product.hero_images[0] ?? product.cover_image}
            autoPlay
            muted
            loop
            playsInline
            controls
          >
            <source src="/assets/video-carga-traseira.mp4" type="video/mp4" />
          </video>
          <div className="ct-video-overlay">
            <span className="ct-section-eyebrow">Vídeo</span>
            <h2 className="ct-video-title">Veja o {product.name} em ação</h2>
          </div>
        </div>
      </section>

      {/* ── Produtos Semelhantes ─────────────────────────────── */}
      {relatedDisplay.length > 0 && (
        <section className="ct-related-section" aria-labelledby="ct-related-heading">
          <div className="ct-related-inner">
            <div className="ct-related-head">
              <span className="ct-section-eyebrow">Carga Traseira</span>
              <h2 id="ct-related-heading" className="ct-related-title">
                Produtos Semelhantes
              </h2>
              <p className="ct-related-sub">
                Outras soluções para recolha seletiva domiciliária adaptadas <br />às necessidades de cada contexto.
              </p>
            </div>
            <ul className="ct-related-grid" role="list">
              {relatedDisplay.map((p) => (
                <li key={p.id}>
                  <Link to={`/produtos/carga-traseira/${p.slug}`} className="ct-related-card">
                    <div className="ct-related-img-wrap">
                      {p.cover_image ? (
                        <img
                          src={p.cover_image}
                          alt={p.name}
                          className="ct-related-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="ct-related-placeholder">
                          <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ct-related-info">
                      <p className="ct-related-name">{p.name}</p>
                      {p.capacity && <p className="ct-related-capacity">{p.capacity}</p>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── FAQs ──────────────────────────────────────────── */}
      <section className="ct-faq-section" aria-labelledby="ct-faq-heading">
        <div className="ct-faq-inner">
          <div className="ct-faq-head">
            <span className="ct-section-eyebrow">Perguntas Frequentes</span>
            <h2 id="ct-faq-heading" className="ct-related-title">
              Dúvidas sobre o {product.name}
            </h2>
          </div>
          <div className="ct-faq-list">
            {CT_FAQS.map((item, i) => (
              <div key={item.q} className="ct-faq-item">
                <button
                  type="button"
                  className="ct-faq-question"
                  aria-expanded={openFaq === i}
                  aria-controls={`ct-faq-panel-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="ct-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  id={`ct-faq-panel-${i}`}
                  role="region"
                  className={`ct-faq-answer${openFaq === i ? ' ct-faq-answer--open' : ''}`}
                >
                  <div className="ct-faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="ct-cta-section" aria-labelledby="ct-cta-heading">
        <div className="ct-cta-inner">
          <h2 id="ct-cta-heading" className="ct-cta-title">
            Apresente o seu projeto. <br />Os nossos especialistas <br />encontram a solução certa.
          </h2>
          <p className="ct-cta-sub">
            Partilhe os requisitos do seu município ou condomínio. Desenvolvemos a solução de recolha porta-a-porta mais adequada ao seu contexto.
          </p>
          <Link to="/contactos" className="btn-dark">
            Falar com um Especialista
          </Link>
        </div>
      </section>
    </div>
  )
}
