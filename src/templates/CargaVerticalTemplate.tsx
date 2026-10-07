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
import { FEATURE_ICONS } from './carga-vertical-feature-icons'
import '@/styles/template-carga-vertical.css'

interface Props {
  product: Product
}

const CV_TABS = [
  { key: 'materiais',        label: 'Materiais' },
  { key: 'cores',            label: 'Cores' },
  { key: 'decoracao',        label: 'Decoração' },
  { key: 'sinaletica',       label: 'Sinalética' },
  { key: 'controlo-acesso',  label: 'Controlo de Acesso' },
  { key: 'sensorizacao',     label: 'Sensorização' },
]

const CV_BASE_FRAME_COUNT = 142
// índice (0-based) onde a imagem 132 é atingida — é aqui que a animação para para dar tempo de ler os callouts
const CV_HOLD_AT_INDEX = 9
// passos extra de scroll durante os quais a imagem fica congelada na 132
const CV_HOLD_STEPS = 40
// índice (0-based, antes de qualquer pausa) onde a imagem 064 é atingida — segunda pausa, igual à anterior
const CV_HOLD_AT_INDEX_2 = CV_BASE_FRAME_COUNT - 64
const CV_HOLD_STEPS_2 = CV_HOLD_STEPS
// índice (0-based, antes de qualquer pausa) onde a imagem 007 é atingida — terceira pausa, igual às anteriores
const CV_HOLD_AT_INDEX_3 = CV_BASE_FRAME_COUNT - 7
const CV_HOLD_STEPS_3 = CV_HOLD_STEPS

// cada pausa congela a imagem em `at` durante `steps` passos extra de scroll — aplicadas por ordem
const CV_HOLDS = [
  { at: CV_HOLD_AT_INDEX, steps: CV_HOLD_STEPS },
  { at: CV_HOLD_AT_INDEX_2, steps: CV_HOLD_STEPS_2 },
  { at: CV_HOLD_AT_INDEX_3, steps: CV_HOLD_STEPS_3 },
]

const SCROLL_FRAME_COUNT = CV_BASE_FRAME_COUNT + CV_HOLDS.reduce((sum, h) => sum + h.steps, 0)
const SCROLL_FRAMES = Array.from({ length: SCROLL_FRAME_COUNT }, (_, i) => {
  let j = i
  let baseIndex = j
  for (const hold of CV_HOLDS) {
    if (j <= hold.at) {
      baseIndex = j
      break
    } else if (j <= hold.at + hold.steps) {
      baseIndex = hold.at
      break
    } else {
      j -= hold.steps
      baseIndex = j
    }
  }
  // imagens hospedadas no Storage: índice do ficheiro é o baseIndex invertido (0143 = pose fechada, 0002 = pose aberta)
  const frameIndex = CV_BASE_FRAME_COUNT + 1 - baseIndex
  return storageUrl(`produtos/ambi_2.7/scroll/scroll_AMBI_2_7_${String(frameIndex).padStart(4, '0')}_AB2523_ANM001.1.${31 + baseIndex}.webp`)
})

// callouts ficam visíveis desde a imagem 132 até ao fim da pausa — o fadeout arranca logo aí
const CV_CALLOUTS_FIRST_FRAME = CV_HOLD_AT_INDEX
const CV_CALLOUTS_LAST_FRAME = CV_HOLD_AT_INDEX + CV_HOLD_STEPS

// limites reais do contentor dentro da imagem quadrada (~17% a 84% de largura) — medidos no novo set de imagens do Storage
const CV_IMAGE_LEFT_BOUND = 17
const CV_IMAGE_RIGHT_BOUND = 84
// distância de segurança entre a etiqueta e o contentor — aumentar afasta mais a etiqueta
const CV_CALLOUT_SAFETY_GAP = 9

// índice do scroll onde a imagem 064 é atingida (depois da 1ª pausa, por isso soma-se CV_HOLD_STEPS)
const CV_ELEVACAO_CALLOUT_FRAME = CV_HOLD_AT_INDEX_2 + CV_HOLD_STEPS
// callout fica visível durante toda a 2ª pausa — o fadeout arranca logo no fim da pausa
const CV_ELEVACAO_CALLOUT_LAST_FRAME = CV_ELEVACAO_CALLOUT_FRAME + CV_HOLD_STEPS_2

// índice do scroll onde a imagem 007 é atingida (depois das 2 pausas anteriores, por isso soma-se CV_HOLD_STEPS + CV_HOLD_STEPS_2)
const CV_DESCARGA_CALLOUT_FRAME = CV_HOLD_AT_INDEX_3 + CV_HOLD_STEPS + CV_HOLD_STEPS_2
// callout fica visível durante toda a 3ª pausa — o fadeout arranca logo no fim da pausa, igual aos anteriores
const CV_DESCARGA_CALLOUT_LAST_FRAME = CV_DESCARGA_CALLOUT_FRAME + CV_HOLD_STEPS_3

const CV_SCROLL_CALLOUTS = [
  {
    title: 'Boca de Depósito',
    description: 'Dimensão ajustada ao tipo de resíduo.',
    left: 35, top: 31, align: 'left' as const,
    firstFrame: CV_CALLOUTS_FIRST_FRAME, lastFrame: CV_CALLOUTS_LAST_FRAME,
  },
  {
    title: 'Placa de Resíduo',
    description: 'Identifica o resíduo a depositar.',
    left: 34, top: 41, align: 'left' as const,
    firstFrame: CV_CALLOUTS_FIRST_FRAME, lastFrame: CV_CALLOUTS_LAST_FRAME,
  },
  {
    title: 'Placa de Entidade',
    description: 'Identifica o operador ou município.',
    left: 65, top: 38, align: 'right' as const,
    firstFrame: CV_CALLOUTS_FIRST_FRAME, lastFrame: CV_CALLOUTS_LAST_FRAME,
  },
  {
    title: 'Sistema de Elevação',
    description: 'Compatível com sistemas universais.',
    left: 50, top: 13, align: 'right' as const,
    firstFrame: CV_ELEVACAO_CALLOUT_FRAME, lastFrame: CV_ELEVACAO_CALLOUT_LAST_FRAME,
  },
  {
    title: 'Sistema de Descarga',
    description: 'Alçapão para descarga por gravidade.',
    left: 66, top: 83, align: 'right' as const,
    firstFrame: CV_DESCARGA_CALLOUT_FRAME, lastFrame: CV_DESCARGA_CALLOUT_LAST_FRAME,
  },
]

// TODO: substituir por imagens próprias da Argola Simples quando disponíveis (usa Argola Dupla como placeholder)
const LIFTING_STRUCTURES: Record<string, { label: string; closed: string; open: string }[]> = {
  'ambi-2-7': [
    { label: 'Argola Dupla', closed: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-AD-Fechado.png'), open: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-AD-Aberto.png') },
    { label: 'Meio Cogumelo', closed: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-KS-Fechado.png'), open: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-KS-Aberto.png') },
    { label: 'F90', closed: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-KS-Fechado.png'), open: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-KS-Aberto.png') },
  ],
  'ambi-2-5': [
    { label: 'Argola Simples', closed: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-AD-Fechado.png'), open: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-AD-Aberto.png') },
    { label: 'Argola Dupla', closed: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-AD-Fechado.png'), open: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-AD-Aberto.png') },
    { label: 'Meio Cogumelo', closed: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-KS-Fechado.png'), open: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-KS-Aberto.png') },
  ],
  'ambi-3-7': [
    { label: 'Argola Dupla', closed: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-AD-Fechado.png'), open: storageUrl('produtos/_shared/estruturas-elevacao/AMBI2.7-AD-Aberto.png') },
  ],
}

// TODO: placeholders — substituir por imagens próprias de "Controlo de Acesso" e "Empilhável" quando disponíveis
const CUSTOM_ITEMS: Record<string, { label: string; img: string }[]> = {
  'ambi-2-7': [
    { label: 'Decoração', img: '/assets/AMBI2.7_Decoracao.png' },
    { label: 'Pilhão', img: '/assets/AMBI2.7_Pilhao.png' },
    { label: 'Volteador', img: '/assets/AMBI2.7_Volteador.png' },
    { label: 'Controlo de Acesso', img: '/assets/AMBI2.7_Decoracao.png' },
    { label: 'Empilhável', img: '/assets/AMBI2.7_Decoracao.png' },
  ],
  'ambi-2-5': [
    { label: 'Decoração', img: storageUrl('produtos/ambi_2.5/fotos/digital/12_ambi2_5_decor.png') },
    { label: 'Pilhão', img: storageUrl('produtos/ambi_2.5/fotos/digital/07_ambi2_5_vidro_pilhao.png') },
    { label: 'Volteador', img: storageUrl('produtos/ambi_2.5/fotos/digital/09_ambi2_5_volteador.png') },
  ],
  'ambi-3-7': [
    { label: 'Decoração', img: storageUrl('produtos/ambi_3.7/fotos/digital/03_ambi3_7_decoracao.png') },
    { label: 'Pilhão', img: storageUrl('produtos/ambi_3.7/fotos/digital/06_ambi3_7_pilhao.png') },
  ],
}

// AMBI 2.5, 2.7 e 3.7 não têm Controlo de Acesso
const CV_TABS_EXCLUDE: Record<string, string[]> = {
  'ambi-2-5': ['controlo-acesso'],
  'ambi-2-7': ['controlo-acesso'],
  'ambi-3-7': ['controlo-acesso'],
}

// SVGs das tabs (Decoração/Sinalética/Sensorização) — um ficheiro por produto em
// Storage, produtos/{pasta}/tabs/, para ficarem no mesmo sítio que as fotos
const TAB_ASSET_STORAGE_FOLDER: Record<string, string> = {
  'ambi-2-5': 'ambi_2.5',
  'ambi-2-7': 'ambi_2.7',
  'ambi-3-7': 'ambi_3.7',
}

function tabAsset(slug: string, filename: string): string {
  const folder = TAB_ASSET_STORAGE_FOLDER[slug] ?? TAB_ASSET_STORAGE_FOLDER['ambi-2-7']
  return storageUrl(`produtos/${folder}/tabs/${filename}`)
}

export default function CargaVerticalTemplate({ product }: Props) {
  const [slideIndex, setSlideIndex] = useState(0)
  const content = getCategoryContent('carga-vertical')!
  const { colors: ralColors } = useRalColors('carga-vertical')
  const { intro: categoryIntro, highlights: categoryHighlights } = useCategoryHighlights('carga-vertical')
  const { products: relatedRaw } = useProducts({ categorySlug: 'carga-vertical' })
  const related = relatedRaw
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (parseFloat(a.name.match(/[\d.]+/)?.[0] ?? '0') || 0) - (parseFloat(b.name.match(/[\d.]+/)?.[0] ?? '0') || 0))
  // TODO: placeholder temporário enquanto não há mais produtos de carga vertical na base de dados
  const relatedDisplay: { id: string; slug: string; name: string; cover_image: string; capacity?: string }[] =
    related.length > 0
      ? related.map((p) => ({ id: p.id, slug: p.slug, name: p.name, cover_image: p.cover_image, capacity: p.specifications?.capacity ?? (p.specifications?.['Capacidade'] as string | undefined) }))
      : [{ id: 'ambi-27-placeholder', slug: 'ambi-2-7', name: 'AMBI 2.7', cover_image: '/assets/AMBI2.7_Capa.png', capacity: '2.700 Litros' }]

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const spec = product.specifications
  const capacity = spec.capacity ?? (spec['Capacidade'] as string | undefined)
  const certifications = spec.certifications?.length
    ? spec.certifications.join(', ')
    : (spec['Certificações'] as string | undefined)
  const introText = capacity
    ? `O ${product.name} foi desenvolvido para a recolha seletiva em espaço público, com capacidade de ${capacity}. Fabricado em PEAD de alta resistência, oferece durabilidade urbana comprovada e compatibilidade universal com volteadores de carga vertical. Disponível para os principais fluxos de recolha seletiva: papel & cartão, vidro, embalagens e indiferenciados.`
    : categoryIntro

  const liftingStructures = LIFTING_STRUCTURES[product.slug] ?? LIFTING_STRUCTURES['ambi-2-7']
  const liftingStructuresList = liftingStructures
    .map((s) => s.label)
    .join(', ')
    .replace(/, ([^,]*)$/, ' e $1')

  const CV_FAQS = [
    {
      q: `Qual a capacidade do ${product.name}?`,
      a: capacity
        ? `O ${product.name} tem capacidade de ${capacity}, para recolha seletiva de papel & cartão, vidro, embalagens e indiferenciados.`
        : `O ${product.name} está preparado para recolha seletiva de papel & cartão, vidro, embalagens e indiferenciados.`,
    },
    {
      q: `Que sistemas de elevação são compatíveis com o ${product.name}?`,
      a: `O ${product.name} é compatível com os sistemas de elevação mais utilizados em Portugal — ${liftingStructuresList} — adaptando-se à frota existente do município ou operador.`,
    },
    {
      q: `É possível personalizar cores, sinalética e decoração do ${product.name}?`,
      a: `Sim. O ${product.name} pode ser configurado com cores RAL personalizadas, sinalética de identificação de resíduo e entidade, e opções de decoração de frentes e laterais, adaptadas à identidade do município.`,
    },
    {
      q: `Que materiais compõem o ${product.name}?`,
      a: `O corpo do ${product.name} é fabricado em PEAD de alta resistência, com estrutura em aço galvanizado em conformidade com a norma NP EN ISO 1461, garantindo durabilidade em uso urbano intensivo.`,
    },
    certifications && {
      q: `Que certificações tem o ${product.name}?`,
      a: `O ${product.name} está em conformidade com ${certifications}, garantindo qualidade e segurança reconhecidas para uso em espaço público.`,
    },
    {
      q: `Como posso pedir um orçamento ou ficha técnica do ${product.name}?`,
      a: 'Contacte a nossa equipa através da página de contactos, indicando o volume pretendido e os fluxos de resíduo a recolher — preparamos uma proposta e ficha técnica adaptadas ao seu projeto.',
    },
  ].filter(Boolean) as { q: string; a: string }[]
  const liftingSystem = spec.lifting_system ?? (spec['Sistema de elevação'] as string | undefined)
  const specProperties = [
    capacity && { '@type': 'PropertyValue', name: 'Capacidade', value: capacity },
    spec.dimensions && { '@type': 'PropertyValue', name: 'Dimensões', value: spec.dimensions },
    spec.materials?.length && { '@type': 'PropertyValue', name: 'Materiais', value: spec.materials.join(', ') },
    spec.colors?.length && { '@type': 'PropertyValue', name: 'Cores', value: spec.colors.join(', ') },
    liftingSystem && { '@type': 'PropertyValue', name: 'Sistema de Elevação', value: liftingSystem },
  ].filter(Boolean)

  useEffect(() => {
    if (product.hero_images.length <= 1) return
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % product.hero_images.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [product.hero_images.length])

  // a descrição de "Alta Capacidade" vem da categoria (partilhada entre AMBI 2.5/2.7/3.7) — substitui
  // pela capacidade real deste produto em vez do valor fixo do texto da categoria.
  const displayHighlights = categoryHighlights.map((h) =>
    h.title === 'Alta Capacidade' && capacity
      ? { ...h, description: `Contentores de carga vertical com capacidade até ${capacity}. Melhor relação preço/capacidade do segmento.` }
      : h
  )
  const leftHighlights = displayHighlights.slice(0, 2)
  const rightHighlights = displayHighlights.slice(2, 4)
  const customItems = CUSTOM_ITEMS[product.slug] ?? CUSTOM_ITEMS['ambi-2-7']
  const excludedTabs = CV_TABS_EXCLUDE[product.slug] ?? []
  const cvTabs = CV_TABS.filter((tab) => !excludedTabs.includes(tab.key))

  const [activeTab, setActiveTab] = useState('materiais')
  const [argolaSlide, setArgolaSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setArgolaSlide((i) => (i + 1) % 2)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  const scrollAnimRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // só re-renderiza quando muda a visibilidade dos callouts (string igual = sem render)
  const [calloutKey, setCalloutKey] = useState('')
  useScrollSequence(scrollAnimRef, canvasRef, SCROLL_FRAMES, (frame) =>
    setCalloutKey(CV_SCROLL_CALLOUTS.map((c) => (frame < c.firstFrame || frame > c.lastFrame ? 0 : 1)).join('')),
  )

  return (
    <div className="min-h-screen bg-white">
      <PageSeo
        title={`${product.name} — Carga Vertical`}
        description={product.short_description ?? product.description}
        path={`/produtos/carga-vertical/${product.slug}`}
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
              category: 'Contentor de Carga Vertical',
              ...(specProperties.length > 0 && { additionalProperty: specProperties }),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.ambiconcept.pt/' },
                { '@type': 'ListItem', position: 2, name: 'Produtos', item: 'https://www.ambiconcept.pt/produtos' },
                { '@type': 'ListItem', position: 3, name: 'Carga Vertical', item: 'https://www.ambiconcept.pt/categorias/carga-vertical' },
                { '@type': 'ListItem', position: 4, name: product.name, item: `https://www.ambiconcept.pt/produtos/carga-vertical/${product.slug}` },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: CV_FAQS.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ],
        }}
      />

      {/* ── Showcase ──────────────────────────────────────── */}
      <section className="cv-showcase" aria-labelledby="cv-title">
        <div className="cv-showcase-inner">

          {/* Header */}
          <div className="cv-showcase-head">
            <nav aria-label="Localização" className="cv-breadcrumb">
              <Link to="/">Início</Link>
              <span aria-hidden="true">/</span>
              <Link to="/produtos">Produtos</Link>
              <span aria-hidden="true">/</span>
              <Link to="/categorias/carga-vertical">Carga Vertical</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>
            <h1 id="cv-title" className="cv-showcase-title">{product.name}</h1>
            <p className="cv-showcase-desc">
              {product.short_description ?? product.description}
            </p>
          </div>

          {/* 3-column: features | carousel | features */}
          <div className="cv-showcase-grid">

            {/* Left features */}
            <div className="cv-features-col cv-features-col--left">
              {leftHighlights.map((h, i) => (
                <div key={h.title} className="cv-feature">
                  <span className="cv-feature-icon">{FEATURE_ICONS[i]}</span>
                  <h3 className="cv-feature-title">{h.title}</h3>
                  <p className="cv-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

            {/* Center: image carousel */}
            <div className="cv-carousel">
              <div className="cv-carousel-stage">
                {product.hero_images.map((img, i) => (
                  <img
                    key={img}
                    src={img}
                    alt={`${product.name} — variante ${i + 1}`}
                    className={`cv-slide${slideIndex === i ? ' cv-slide--active' : ''}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
              {product.hero_images.length > 1 && (
                <div className="cv-carousel-dots" aria-label="Selecionar variante">
                  {product.hero_images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      className={`cv-dot${slideIndex === i ? ' cv-dot--active' : ''}`}
                      aria-label={`Variante ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right features */}
            <div className="cv-features-col cv-features-col--right">
              {rightHighlights.map((h, i) => (
                <div key={h.title} className="cv-feature">
                  <span className="cv-feature-icon">{FEATURE_ICONS[i + 2]}</span>
                  <h3 className="cv-feature-title">{h.title}</h3>
                  <p className="cv-feature-desc">{h.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Sobre a categoria ─────────────────────────────── */}
      <section className="cv-intro-section" aria-labelledby="cv-intro-heading">
        <div className="cv-intro-inner">
          <span className="cv-section-eyebrow">{content.eyebrow}</span>
          <h2 id="cv-intro-heading" className="cv-section-title">{content.headline}</h2>
          <p className="cv-intro-text">{introText}</p>
        </div>
      </section>

      {/* ── Animação de scroll ────────────────────────────── */}
      <section ref={scrollAnimRef} className="cv-scroll-anim" aria-label={`${product.name} — vista em detalhe`}>
        <div className="cv-scroll-anim-sticky">
          <div className="cv-scroll-anim-media">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label={`${product.name} — vista em detalhe`}
              className="cv-scroll-anim-img"
            />
            <div className="cv-scroll-callouts">
              {CV_SCROLL_CALLOUTS.map((c) => {
                const isLeft = c.align === 'left'
                // aresta da etiqueta mais próxima da imagem — a distância a este ponto é a margem de segurança real
                const labelNearEdge = isLeft
                  ? CV_IMAGE_LEFT_BOUND - CV_CALLOUT_SAFETY_GAP
                  : CV_IMAGE_RIGHT_BOUND + CV_CALLOUT_SAFETY_GAP
                // etiqueta ancorada pela aresta próxima da imagem, largura ajusta-se ao texto (ver .cv-callout-label)
                const labelAnchorStyle = isLeft
                  ? { right: `${100 - labelNearEdge}%` }
                  : { left: `${labelNearEdge}%` }
                const lineLeft = isLeft ? labelNearEdge : c.left
                const lineWidth = isLeft ? c.left - labelNearEdge : labelNearEdge - c.left
                const isHidden = calloutKey[CV_SCROLL_CALLOUTS.indexOf(c)] !== '1'
                return (
                  <div
                    key={c.title}
                    className={`cv-callout${isHidden ? ' cv-callout--hidden' : ''}`}
                    aria-hidden={isHidden}
                  >
                    <span className="cv-callout-dot" style={{ left: `${c.left}%`, top: `${c.top}%` }} />
                    <span
                      className="cv-callout-line"
                      style={{ top: `${c.top}%`, left: `${lineLeft}%`, width: `${lineWidth}%` }}
                    />
                    <span
                      className={`cv-callout-label cv-callout-label--${c.align}`}
                      style={{ top: `${c.top}%`, ...labelAnchorStyle }}
                    >
                      <span className="cv-callout-title">{c.title}</span>
                      <span className="cv-callout-desc">{c.description}</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Estruturas de Elevação ────────────────────────── */}
      <section className="cv-lifting-section" aria-labelledby="cv-lifting-heading">
        <div className="cv-lifting-inner">
          <div className="cv-lifting-head">
            <span className="cv-section-eyebrow">Sistema de Elevação e Descarga</span>
            <h2 id="cv-lifting-heading" className="cv-lifting-title">
              Estruturas compatíveis com o {product.name}
            </h2>
            <p className="cv-lifting-sub">
              Produzidas em aço galvanizado em conformidade com a norma NP EN ISO 1461, garantindo resistência e durabilidade em condições de utilização intensiva.
            </p>
          </div>
          <div className={`cv-lifting-grid cv-lifting-grid--${['zero', 'single', 'two', 'three'][liftingStructures.length] ?? 'three'}`}>
            {liftingStructures.map((structure) => (
              <div key={structure.label} className="cv-lifting-item">
                <div className="cv-lifting-img-wrap cv-lifting-img-wrap--slide">
                  <img src={structure.closed} alt={`${structure.label} — posição normal`} className={`cv-lifting-slide${argolaSlide === 0 ? ' cv-lifting-slide--active' : ''}`} loading="lazy" />
                  <img src={structure.open} alt={`${structure.label} — posição de descarga`} className={`cv-lifting-slide${argolaSlide === 1 ? ' cv-lifting-slide--active' : ''}`} loading="lazy" />
                </div>
                <p className="cv-lifting-label">{structure.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personalização ────────────────────────────────── */}
      <section className="cv-custom-section" aria-labelledby="cv-custom-heading">
        <div className="cv-custom-inner">
          <div className="cv-custom-head">
            <h2 id="cv-custom-heading" className="cv-custom-title">
              Características e Personalização do {product.name}
            </h2>
            <p className="cv-custom-sub">
              Cada unidade pode ser configurada com opções de personalização visual e funcional,<br />
              adaptadas às necessidades específicas do município<br />
              e às frações de resíduo a recolher.
            </p>
          </div>
          <div className={`cv-custom-grid cv-custom-grid--${customItems.length}`}>
            {customItems.map((item) => (
              <div key={item.label} className="cv-custom-item">
                <div className="cv-custom-img-wrap">
                  <img src={item.img} alt={item.label} className="cv-custom-img" loading="lazy" />
                </div>
                <p className="cv-custom-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opções ────────────────────────────────────────── */}
      <section className="cv-options-section" aria-label="Opções de personalização">
        <div className="cv-options-inner">
          <nav className="cv-tabs-nav" role="tablist" aria-label="Categorias de personalização">
            {cvTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`cv-tab-btn${activeTab === tab.key ? ' cv-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="cv-tabs-body">
            <div id="cv-panel-materiais" role="tabpanel" className={`cv-tab-panel${activeTab === 'materiais' ? ' cv-tab-panel--active' : ''}`}>
              <ul className="cv-mat-list">
                <li>Corpo do contentor em polietileno de alta densidade (PEAD) com resistência UV</li>
                <li>Aço galvanizado em conformidade com a norma <strong>NP EN ISO 1461</strong></li>
                <li>Bocas para identificação de resíduo em PEAD</li>
                <li>Tapetas em borracha</li>
              </ul>
              {/* TODO: simulação — substituir por logótipos reais quando disponíveis */}
              <div className="cv-badges-row">
                <div className="cv-badge">
                  <span className="cv-badge-value">100%</span>
                  <span className="cv-badge-label">Reciclável</span>
                </div>
                <div className="cv-badge">
                  <span className="cv-badge-value">TÜV</span>
                  <span className="cv-badge-label">Certificado</span>
                </div>
              </div>
            </div>

            <div id="cv-panel-cores" role="tabpanel" className={`cv-tab-panel${activeTab === 'cores' ? ' cv-tab-panel--active' : ''}`}>
              <p className="cv-tab-desc">Cores standard disponíveis para contentores e/ou bocas<br />identificativas do tipo de resíduo.</p>
              <div className="cv-colors-grid">
                {ralColors.map((c) => (
                  <div key={c.code} className="cv-color-item">
                    <div className="cv-color-swatch" style={{ background: c.hex }} />
                    <span className="cv-color-label">{c.code}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="cv-panel-decoracao" role="tabpanel" className={`cv-tab-panel${activeTab === 'decoracao' ? ' cv-tab-panel--active' : ''}`}>
              <div className="cv-sinal-grid">
                <div className="cv-sinal-item">
                  <div className="cv-sinal-img-wrap">
                    <img src={tabAsset(product.slug, 'decor-frentes.svg')} alt="Decoração de Frentes" className="cv-sinal-img" loading="lazy" />
                  </div>
                  <p className="cv-sinal-title">Decoração de Frentes</p>
                  <p className="cv-sinal-sub">Área útil para personalização</p>
                </div>
                <div className="cv-sinal-item">
                  <div className="cv-sinal-img-wrap">
                    <img src={tabAsset(product.slug, 'decor-laterais.svg')} alt="Decoração de Laterais" className="cv-sinal-img" loading="lazy" />
                  </div>
                  <p className="cv-sinal-title">Decoração de Laterais</p>
                  <p className="cv-sinal-sub">Área útil para personalização</p>
                </div>
              </div>
            </div>

            <div id="cv-panel-sinaletica" role="tabpanel" className={`cv-tab-panel${activeTab === 'sinaletica' ? ' cv-tab-panel--active' : ''}`}>
              <div className="cv-sinal-grid">
                <div className="cv-sinal-item">
                  <div className="cv-sinal-img-wrap">
                    <img src={tabAsset(product.slug, 'placa-residuo.svg')} alt="Placa de Resíduo" className="cv-sinal-img" loading="lazy" />
                  </div>
                  <p className="cv-sinal-title">Placa de Resíduo</p>
                  <p className="cv-sinal-sub">Área útil para informação</p>
                </div>
                <div className="cv-sinal-item">
                  <div className="cv-sinal-img-wrap">
                    <img src={tabAsset(product.slug, 'placa-entidade.svg')} alt="Placa de Entidade" className="cv-sinal-img" loading="lazy" />
                  </div>
                  <p className="cv-sinal-title">Placa de Entidade</p>
                  <p className="cv-sinal-sub">Área útil para informação</p>
                </div>
              </div>
            </div>

            {!excludedTabs.includes('controlo-acesso') && (
              <div id="cv-panel-controlo-acesso" role="tabpanel" className={`cv-tab-panel${activeTab === 'controlo-acesso' ? ' cv-tab-panel--active' : ''}`}>
                <div className="cv-sinal-grid">
                  <div className="cv-sinal-item">
                    <div className="cv-sinal-img-wrap">
                      {/* TODO: placeholder — substituir por imagem própria de "Controlo de Acesso" quando disponível */}
                      <img src="/assets/AMBI2.7_Decoracao.png" alt="Controlo de Acesso" className="cv-sinal-img" loading="lazy" />
                    </div>
                    <p className="cv-sinal-title">Controlo de Acesso</p>
                    <p className="cv-sinal-sub">Restrição de deposição a utilizadores autorizados</p>
                  </div>
                </div>
              </div>
            )}

            <div id="cv-panel-sensorizacao" role="tabpanel" className={`cv-tab-panel${activeTab === 'sensorizacao' ? ' cv-tab-panel--active' : ''}`}>
              <div className="cv-sinal-grid">
                <div className="cv-sinal-item">
                  <div className="cv-sinal-img-wrap">
                    <img src={tabAsset(product.slug, 'sensor-controlo.svg')} alt="Controlo de Nível" className="cv-sinal-img" loading="lazy" />
                  </div>
                  <p className="cv-sinal-title">Controlo de Nível</p>
                  <p className="cv-sinal-sub">Monitorização do estado de enchimento</p>
                </div>
                <div className="cv-sinal-item">
                  <div className="cv-sinal-img-wrap">
                    <img src={tabAsset(product.slug, 'sensor-localizacao.svg')} alt="Localização" className="cv-sinal-img" loading="lazy" />
                  </div>
                  <p className="cv-sinal-title">Localização</p>
                  <p className="cv-sinal-sub">Georreferenciação do equipamento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vídeo ─────────────────────────────────────────── */}
      <section className="cv-video-section" aria-label={`Vídeo — ${product.name}`}>
        <div className="cv-video-wrap">
          <video
            className="cv-video"
            poster={product.hero_images[0] ?? product.cover_image}
            autoPlay
            muted
            loop
            playsInline
            controls
          >
            <source src="/assets/video-carga-vertical.mp4" type="video/mp4" />
          </video>
          <div className="cv-video-overlay">
            <span className="cv-section-eyebrow">Vídeo</span>
            <h2 className="cv-video-title">Veja o {product.name} em ação</h2>
          </div>
        </div>
      </section>

      {/* ── Produtos Semelhantes ─────────────────────────────── */}
      {relatedDisplay.length > 0 && (
        <section className="cv-related-section" aria-labelledby="cv-related-heading">
          <div className="cv-related-inner">
            <div className="cv-related-head">
              <span className="cv-section-eyebrow">Carga Vertical</span>
              <h2 id="cv-related-heading" className="cv-related-title">
                Produtos Semelhantes
              </h2>
              <p className="cv-related-sub">
                Outras soluções de contentorização flexíveis e adaptadas <br />às necessidades de cada município.
              </p>
            </div>
            <ul className="cv-related-grid" role="list">
              {relatedDisplay.map((p) => (
                <li key={p.id}>
                  <Link to={`/produtos/carga-vertical/${p.slug}`} className="cv-related-card">
                    <div className="cv-related-img-wrap">
                      {p.cover_image ? (
                        <img
                          src={p.cover_image}
                          alt={p.name}
                          className="cv-related-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="cv-related-placeholder">
                          <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="cv-related-info">
                      <p className="cv-related-name">{p.name}</p>
                      {p.capacity && <p className="cv-related-capacity">{p.capacity}</p>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── FAQs ──────────────────────────────────────────── */}
      <section className="cv-faq-section" aria-labelledby="cv-faq-heading">
        <div className="cv-faq-inner">
          <div className="cv-faq-head">
            <span className="cv-section-eyebrow">Perguntas Frequentes</span>
            <h2 id="cv-faq-heading" className="cv-section-title">
              Dúvidas sobre o {product.name}
            </h2>
          </div>
          <div className="cv-faq-list">
            {CV_FAQS.map((item, i) => (
              <div key={item.q} className="cv-faq-item">
                <button
                  type="button"
                  className="cv-faq-question"
                  aria-expanded={openFaq === i}
                  aria-controls={`cv-faq-panel-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="cv-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  id={`cv-faq-panel-${i}`}
                  role="region"
                  className={`cv-faq-answer${openFaq === i ? ' cv-faq-answer--open' : ''}`}
                >
                  <div className="cv-faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="cv-cta-section" aria-labelledby="cv-cta-heading">
        <div className="cv-cta-inner">
          <h2 id="cv-cta-heading" className="cv-cta-title">
            Apresente o seu projeto. <br />Os nossos especialistas <br />encontram a solução certa.
          </h2>
          <p className="cv-cta-sub">
            Partilhe os requisitos do seu município ou operação RSU. Desenvolvemos a solução de carga vertical mais adequada ao seu contexto.
          </p>
          <Link to="/contactos" className="btn-dark">
            Falar com um Especialista
          </Link>
        </div>
      </section>
    </div>
  )
}
