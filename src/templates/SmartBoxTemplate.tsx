import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { getCategoryContent } from '@/data/categories-content'
import { storageUrl } from '@/data/local'
import { useProducts } from '@/hooks/useProducts'
import { useRalColors } from '@/hooks/useRalColors'
import { useCategoryHighlights } from '@/hooks/useCategoryHighlights'
import PageSeo from '@/components/seo/PageSeo'
import { SMART_BOX_FEATURE_ICONS as FEATURE_ICONS } from './smart-box-feature-icons'
import '@/styles/template-smart-box.css'

interface Props {
  product: Product
}

const SB_TABS = [
  { key: 'materiais',    label: 'Materiais' },
  { key: 'cores',        label: 'Cores' },
  { key: 'sinaletica',   label: 'Sinalética' },
  { key: 'sensorizacao', label: 'Sensorização' },
]

// TODO: placeholders (imagens do AMBI 2.5) — substituir por imagens próprias do AMBI 1.0
const SB_CUSTOM_ITEMS = [
  { label: 'Abertura Manual', img: storageUrl('produtos/ambi_2.5/fotos/digital/12_ambi2_5_decor.png') },
  { label: 'Fecho com Amortecedor', img: storageUrl('produtos/ambi_2.5/fotos/digital/07_ambi2_5_vidro_pilhao.png') },
  { label: 'Abertura com Pedal', img: storageUrl('produtos/ambi_2.5/fotos/digital/09_ambi2_5_volteador.png') },
]

const SCROLL_FRAME_COUNT = 60
const SCROLL_FRAMES = Array.from(
  { length: SCROLL_FRAME_COUNT },
  (_, i) => `/assets/AMBI10-scroll-${String(i + 1).padStart(2, '0')}.png`
)

export default function SmartBoxTemplate({ product }: Props) {
  const [slideIndex, setSlideIndex] = useState(0)
  const content = getCategoryContent('smart-box')!
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

  const SB_FAQS = [
    {
      q: `Qual a capacidade do ${product.name}?`,
      a: capacity
        ? `O ${product.name} tem capacidade de ${capacity}.`
        : `O ${product.name} está disponível em diferentes capacidades, adequadas a fluxos especiais de resíduos.`,
    },
    acesso && {
      q: `Como funciona o acesso ao ${product.name}?`,
      a: `O ${product.name} está equipado com ${acesso.toLowerCase()}, que impede depósitos indevidos e garante a qualidade do fluxo recolhido.`,
    },
    instalacao && {
      q: `Que tipos de instalação são possíveis para o ${product.name}?`,
      a: `O ${product.name} pode ser instalado em ${instalacao.toLowerCase()}, adaptando-se ao espaço disponível.`,
    },
    {
      q: `Que materiais compõem o ${product.name}?`,
      a: `O corpo do ${product.name} é fabricado em aço e PEAD, resistente a uso intensivo e às condições climáticas.`,
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
    acesso && { '@type': 'PropertyValue', name: 'Acesso', value: acesso },
    instalacao && { '@type': 'PropertyValue', name: 'Instalação', value: instalacao },
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
  const [scrollFrame, setScrollFrame] = useState(0)

  useEffect(() => {
    SCROLL_FRAMES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    let ticking = false
    function updateFrame() {
      const el = scrollAnimRef.current
      ticking = false
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      setScrollFrame(Math.min(SCROLL_FRAME_COUNT - 1, Math.floor(progress * SCROLL_FRAME_COUNT)))
    }
    function onScroll() {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(updateFrame)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    updateFrame()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <PageSeo
        title={`${product.name} — Smart Box`}
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
                { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.ambiconcept.pt/' },
                { '@type': 'ListItem', position: 2, name: 'Produtos', item: 'https://www.ambiconcept.pt/produtos' },
                { '@type': 'ListItem', position: 3, name: 'Smart Box', item: 'https://www.ambiconcept.pt/produtos?categoria=smart-box' },
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
            <nav aria-label="Localização" className="sb-breadcrumb">
              <Link to="/">Início</Link>
              <span aria-hidden="true">/</span>
              <Link to="/produtos">Produtos</Link>
              <span aria-hidden="true">/</span>
              <Link to="/produtos?categoria=smart-box">Smart Box</Link>
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
                    alt={`${product.name} — variante ${i + 1}`}
                    className={`sb-slide${slideIndex === i ? ' sb-slide--active' : ''}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
              {product.hero_images.length > 1 && (
                <div className="sb-carousel-dots" aria-label="Selecionar variante">
                  {product.hero_images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      className={`sb-dot${slideIndex === i ? ' sb-dot--active' : ''}`}
                      aria-label={`Variante ${i + 1}`}
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
      <section ref={scrollAnimRef} className="sb-scroll-anim" aria-label={`${product.name} — vista em detalhe`}>
        <div className="sb-scroll-anim-sticky">
          <img
            src={SCROLL_FRAMES[scrollFrame]}
            alt={`${product.name} — vista em detalhe`}
            className="sb-scroll-anim-img"
          />
        </div>
      </section>

      {/* ── Personalização ────────────────────────────────── */}
      <section className="sb-custom-section" aria-labelledby="sb-custom-heading">
        <div className="sb-custom-inner">
          <div className="sb-custom-head">
            <h2 id="sb-custom-heading" className="sb-custom-title">
              Características e Personalização do {product.name}
            </h2>
            <p className="sb-custom-sub">
              Cada unidade pode ser configurada com opções de personalização visual e funcional,<br />
              adaptadas às necessidades específicas do município ou condomínio<br />
              e às frações de resíduo a recolher.
            </p>
          </div>
          <div className="sb-custom-grid">
            {SB_CUSTOM_ITEMS.map((item) => (
              <div key={item.label} className="sb-custom-item">
                <div className="sb-custom-img-wrap">
                  <img src={item.img} alt={item.label} className="sb-custom-img" loading="lazy" />
                </div>
                <p className="sb-custom-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opções ────────────────────────────────────────── */}
      <section className="sb-options-section" aria-label="Opções de personalização">
        <div className="sb-options-inner">
          <nav className="sb-tabs-nav" role="tablist" aria-label="Categorias de personalização">
            {SB_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`sb-tab-btn${activeTab === tab.key ? ' sb-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="sb-tabs-body">
            <div id="sb-panel-materiais" role="tabpanel" className={`sb-tab-panel${activeTab === 'materiais' ? ' sb-tab-panel--active' : ''}`}>
              <ul className="sb-mat-list">
                <li>Estrutura em aço resistente a uso intensivo</li>
                <li>Corpo em polietileno de alta densidade (PEAD), fácil de limpar</li>
                <li>Sistema de abertura controlada</li>
              </ul>
            </div>

            <div id="sb-panel-cores" role="tabpanel" className={`sb-tab-panel${activeTab === 'cores' ? ' sb-tab-panel--active' : ''}`}>
              <p className="sb-tab-desc">Cores standard disponível para o corpo da Smart Box.</p>
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
                    <img src={storageUrl('produtos/ambi_1.0/tabs/sinaletica-frente.svg')} alt="Sinalética" className="sb-feature-grid-img" loading="lazy" />
                  </div>
                  <p className="sb-feature-grid-title">Sinalética</p>
                  <p className="sb-feature-grid-sub">Área útil para informação</p>
                </div>
              </div>
            </div>

            <div id="sb-panel-sensorizacao" role="tabpanel" className={`sb-tab-panel${activeTab === 'sensorizacao' ? ' sb-tab-panel--active' : ''}`}>
              <div className="sb-feature-grid">
                <div className="sb-feature-grid-item">
                  <div className="sb-feature-grid-img-wrap">
                    <img src={storageUrl('produtos/ambi_1.0/tabs/sensor-controlo.svg')} alt="Controlo de Nível" className="sb-feature-grid-img" loading="lazy" />
                  </div>
                  <p className="sb-feature-grid-title">Controlo de Nível</p>
                  <p className="sb-feature-grid-sub">Monitorização do estado{'\n'}de enchimento</p>
                </div>
                <div className="sb-feature-grid-item">
                  <div className="sb-feature-grid-img-wrap">
                    <img src={storageUrl('produtos/ambi_1.0/tabs/sensor-localizacao.svg')} alt="Localização" className="sb-feature-grid-img" loading="lazy" />
                  </div>
                  <p className="sb-feature-grid-title">Localização</p>
                  <p className="sb-feature-grid-sub">Georreferenciação do equipamento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vídeo ─────────────────────────────────────────── */}
      <section className="sb-video-section" aria-label={`Vídeo — ${product.name}`}>
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
            <span className="sb-section-eyebrow">Vídeo</span>
            <h2 className="sb-video-title">Veja o {product.name} em ação</h2>
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
                Produtos Semelhantes
              </h2>
              <p className="sb-related-sub">
                Outras soluções para fluxos especiais de resíduos adaptadas <br />às necessidades de cada contexto.
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
            <span className="sb-section-eyebrow">Perguntas Frequentes</span>
            <h2 id="sb-faq-heading" className="sb-related-title">
              Dúvidas sobre o {product.name}
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
      <section className="sb-flow-section" aria-label="Sistemas de recolha">
        <div className="sb-flow-inner">
          <div className="sb-flow-grid">
            <div className="sb-flow-item">
              <h2 className="sb-flow-title">Um Sistema para Recolha de Biorresíduos</h2>
              <p className="sb-flow-sub">
                <span className="sb-flow-sub-line">Um sistema completo para a separação e recolha dos resíduos orgânicos,</span><br />
                <span className="sb-flow-sub-line">da sua cozinha até ao contentor.</span>
              </p>
              <Link to="/produtos?categoria=porta-a-porta" className="sb-flow-badge">
                Solução de Recolha Seletiva de Biorresíduos
              </Link>
            </div>
            <div className="sb-flow-item">
              <h2 className="sb-flow-title">Um Sistema para Recolha de Óleos Alimentares Usados</h2>
              <p className="sb-flow-sub">
                <span className="sb-flow-sub-line">Um sistema completo para a recolha segura de óleos alimentares usados,</span><br />
                <span className="sb-flow-sub-line">do ponto de descarte doméstico até à reciclagem.</span>
              </p>
              <Link to="/produtos?categoria=smart-box" className="sb-flow-badge">
                Solução de Recolha de Óleos Alimentares Usados
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="sb-cta-section" aria-labelledby="sb-cta-heading">
        <div className="sb-cta-inner">
          <h2 id="sb-cta-heading" className="sb-cta-title">
            Apresente o seu projeto. <br />Os nossos especialistas <br />encontram a solução certa.
          </h2>
          <p className="sb-cta-sub">
            Partilhe os requisitos do seu município ou condomínio. Desenvolvemos a solução de Smart Box mais adequada ao seu contexto.
          </p>
          <Link to="/contactos" className="btn-dark">
            Falar com um Especialista
          </Link>
        </div>
      </section>
    </div>
  )
}
