import { useState, useEffect, useRef } from 'react'
import { useScrollSequence } from '@/hooks/useScrollSequence'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { getCategoryContent } from '@/data/categories-content'
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
  { key: 'materiais',  label: 'Materiais' },
  { key: 'cores',      label: 'Cores' },
  { key: 'decoracao',  label: 'Decoração' },
]

const SCROLL_FRAME_COUNT = 60
const SCROLL_FRAMES = Array.from(
  { length: SCROLL_FRAME_COUNT },
  (_, i) => `/assets/LOCKEY5L-scroll-${String(i + 1).padStart(2, '0')}.png`
)

export default function BaldesDomesticosTemplate({ product }: Props) {
  const [slideIndex, setSlideIndex] = useState(0)
  const content = getCategoryContent('baldes-domesticos')!
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
  const introText = capacity
    ? `O ${product.name} foi desenvolvido para a recolha de proximidade de biorresíduos em contexto doméstico, com capacidade de ${capacity}. Compacto e higiénico, integra sistema de fecho que reduz a contaminação da fração orgânica, adaptando-se a programas porta-a-porta e pontos de proximidade em condomínios.`
    : categoryIntro

  const BD_FAQS = [
    {
      q: `Qual a capacidade do ${product.name}?`,
      a: capacity
        ? `O ${product.name} tem capacidade de ${capacity}.`
        : `O ${product.name} está disponível em diferentes capacidades, adequadas ao contexto doméstico e a pontos de proximidade.`,
    },
    fecho && {
      q: `Como funciona o sistema de fecho do ${product.name}?`,
      a: `O ${product.name} está equipado com ${fecho}, que impede depósitos indevidos e reduz a contaminação da fração de biorresíduos.`,
    },
    {
      q: `Que materiais compõem o ${product.name}?`,
      a: `O corpo do ${product.name} é fabricado em PEAD de fácil limpeza, resistente a uso diário intensivo.`,
    },
    {
      q: `É possível personalizar a cor e o logótipo do ${product.name}?`,
      a: `Sim. O ${product.name} pode ser configurado com cores RAL personalizadas e logótipo do município ou entidade.`,
    },
    {
      q: `Como posso pedir um orçamento ou ficha técnica do ${product.name}?`,
      a: 'Contacte a nossa equipa através da página de contactos, indicando a quantidade pretendida e o contexto de instalação — preparamos uma proposta e ficha técnica adaptadas ao seu projeto.',
    },
  ].filter(Boolean) as { q: string; a: string }[]

  const specProperties = [
    capacity && { '@type': 'PropertyValue', name: 'Capacidade', value: capacity },
    fecho && { '@type': 'PropertyValue', name: 'Sistema de Fecho', value: fecho },
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
        title={`${product.name} — Baldes Domésticos`}
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
              category: 'Balde Doméstico',
              ...(specProperties.length > 0 && { additionalProperty: specProperties }),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.ambiconcept.pt/' },
                { '@type': 'ListItem', position: 2, name: 'Produtos', item: 'https://www.ambiconcept.pt/produtos' },
                { '@type': 'ListItem', position: 3, name: 'Baldes Domésticos', item: 'https://www.ambiconcept.pt/categorias/baldes-domesticos' },
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
            <nav aria-label="Localização" className="bd-breadcrumb">
              <Link to="/">Início</Link>
              <span aria-hidden="true">/</span>
              <Link to="/produtos">Produtos</Link>
              <span aria-hidden="true">/</span>
              <Link to="/categorias/baldes-domesticos">Baldes Domésticos</Link>
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
                    alt={`${product.name} — variante ${i + 1}`}
                    className={`bd-slide${slideIndex === i ? ' bd-slide--active' : ''}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
              {product.hero_images.length > 1 && (
                <div className="bd-carousel-dots" aria-label="Selecionar variante">
                  {product.hero_images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      className={`bd-dot${slideIndex === i ? ' bd-dot--active' : ''}`}
                      aria-label={`Variante ${i + 1}`}
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
      <section ref={scrollAnimRef} className="bd-scroll-anim" aria-label={`${product.name} — vista em detalhe`}>
        <div className="bd-scroll-anim-sticky">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`${product.name} — vista em detalhe`}
            className="bd-scroll-anim-img"
          />
        </div>
      </section>

      {/* ── Tamanhos ──────────────────────────────────────── */}
      <section className="bd-sizes-section" aria-labelledby="bd-sizes-heading">
        <div className="bd-sizes-inner">
          <div className="bd-sizes-head">
            <h2 id="bd-sizes-heading" className="bd-sizes-title">
              2 Tamanhos de Baldes do Lixo<br />
              <span className="bd-sizes-title-line">para Bancada da Cozinha, Maior Flexibilidade</span>
            </h2>
            <p className="bd-sizes-sub">
              Com duas capacidades 5L e 7L, o Lockey é perfeito para ser utilizado em qualquer habitação.
            </p>
          </div>
          <div className="bd-sizes-grid">
            <div className="bd-sizes-item">
              <div className="bd-sizes-img-wrap">
                <img src={storageUrl('produtos/_shared/lockey-tamanhos/LOCKEY5L-Tamanho.png')} alt="Lockey 5 Litros" className="bd-sizes-img" loading="lazy" />
              </div>
              <p className="bd-sizes-label">5 Litros</p>
            </div>
            <div className="bd-sizes-item">
              <div className="bd-sizes-img-wrap">
                <img src={storageUrl('produtos/_shared/lockey-tamanhos/LOCKEY7L-Tamanho.png')} alt="Lockey 7 Litros" className="bd-sizes-img" loading="lazy" />
              </div>
              <p className="bd-sizes-label">7 Litros</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Opções ────────────────────────────────────────── */}
      <section className="bd-options-section" aria-label="Opções de personalização">
        <div className="bd-options-inner">
          <nav className="bd-tabs-nav" role="tablist" aria-label="Categorias de personalização">
            {BD_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`bd-tab-btn${activeTab === tab.key ? ' bd-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="bd-tabs-body">
            <div id="bd-panel-materiais" role="tabpanel" className={`bd-tab-panel${activeTab === 'materiais' ? ' bd-tab-panel--active' : ''}`}>
              <ul className="bd-mat-list">
                <li>Corpo em polietileno de alta densidade (PEAD), fácil de limpar</li>
                <li>Interior liso, sem cantos que favoreçam a acumulação de resíduos</li>
                <li>Sistema de fecho com chave personalizada</li>
              </ul>
            </div>

            <div id="bd-panel-cores" role="tabpanel" className={`bd-tab-panel${activeTab === 'cores' ? ' bd-tab-panel--active' : ''}`}>
              <p className="bd-tab-desc">Cor standard disponível para o balde, tampa e pega.</p>
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
                    <img src={storageUrl('produtos/lockey_5l/tabs/decor-frente.svg')} alt="Decoração" className="bd-feature-grid-img" loading="lazy" />
                  </div>
                  <p className="bd-feature-grid-title">Decoração</p>
                  <p className="bd-feature-grid-sub">Área útil para personalização</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vídeo ─────────────────────────────────────────── */}
      <section className="bd-video-section" aria-label={`Vídeo — ${product.name}`}>
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
            <span className="bd-section-eyebrow">Vídeo</span>
            <h2 className="bd-video-title">Veja o {product.name} em ação</h2>
          </div>
        </div>
      </section>

      {/* ── Produtos Semelhantes ─────────────────────────────── */}
      {relatedDisplay.length > 0 && (
        <section className="bd-related-section" aria-labelledby="bd-related-heading">
          <div className="bd-related-inner">
            <div className="bd-related-head">
              <span className="bd-section-eyebrow">Baldes Domésticos</span>
              <h2 id="bd-related-heading" className="bd-related-title">
                Produtos Semelhantes
              </h2>
              <p className="bd-related-sub">
                Outras soluções de recolha de proximidade adaptadas <br />às necessidades de cada contexto.
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
            <span className="bd-section-eyebrow">Perguntas Frequentes</span>
            <h2 id="bd-faq-heading" className="bd-related-title">
              Dúvidas sobre o {product.name}
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
          <h2 id="bd-flow-heading" className="bd-flow-title">Um Sistema para Recolha de Biorresíduos</h2>
          <p className="bd-flow-sub">
            Um sistema completo para a separação e recolha dos resíduos orgânicos,<br />
            da sua cozinha até ao contentor.
          </p>
          <Link to="/fluxos/porta-a-porta" className="bd-flow-badge">
            Solução de Recolha Seletiva de Biorresíduos
          </Link>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bd-cta-section" aria-labelledby="bd-cta-heading">
        <div className="bd-cta-inner">
          <h2 id="bd-cta-heading" className="bd-cta-title">
            Apresente o seu projeto. <br />Os nossos especialistas <br />encontram a solução certa.
          </h2>
          <p className="bd-cta-sub">
            Partilhe os requisitos do seu município ou condomínio. Desenvolvemos a solução de recolha de proximidade mais adequada ao seu contexto.
          </p>
          <Link to="/contactos" className="btn-dark">
            Falar com um Especialista
          </Link>
        </div>
      </section>
    </div>
  )
}
