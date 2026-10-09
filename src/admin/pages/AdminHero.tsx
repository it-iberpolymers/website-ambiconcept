import { useState, useEffect } from 'react'
import { useHeroSlides, saveHeroSlides, setSlideActive } from '@/hooks/useHeroSlides'
import type { HeroSlide } from '@/types'
import { HERO_RENDER, HIGHLIGHT_COLORS, slideOwnImage, titleParts } from '@/lib/heroSlide'
import FirebaseNotice from '../FirebaseNotice'
import { StatusBadge, ToggleButton } from '../ActiveControls'

// o primeiro slide é o principal: está sempre ativo e não se elimina (o site precisa de pelo menos um)
const withFirstActive = (list: HeroSlide[]): HeroSlide[] =>
  list.length > 0 && list[0].active === false ? [{ ...list[0], active: true }, ...list.slice(1)] : list

export default function AdminHero() {
  const { slides: fetchedSlides, loading } = useHeroSlides({ includeInactive: true })
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [originalIds, setOriginalIds] = useState<string[]>([])
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading) {
      setSlides(withFirstActive(fetchedSlides))
      setOriginalIds(fetchedSlides.map(s => s.id))
    }
  }, [loading, fetchedSlides])

  function updateSlide(id: string, patch: Partial<HeroSlide>) {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s))
  }

  // um slide já guardado muda logo na base de dados; um slide novo só quando se carregar em Guardar
  async function toggleSlide(slide: HeroSlide) {
    const active = slide.active === false
    try {
      if (originalIds.includes(slide.id)) await setSlideActive(slide.id, active)
      updateSlide(slide.id, { active })
    } catch (e) {
      alert('Erro ao alterar: ' + e)
    }
  }

  function addSlide() {
    setSlides(prev => [
      ...prev,
      {
        id: `slide-${Date.now()}`,
        image_url: '',
        title: '',
        subtitle: '',
        cta_label: 'Saber Mais',
        cta_url: '/',
        sort_order: prev.length + 1,
      },
    ])
  }

  function removeSlide(id: string) {
    setSlides(prev =>
      prev.filter((s, i) => i === 0 || s.id !== id).map((s, i) => ({ ...s, sort_order: i + 1 })),
    )
  }

  function moveSlide(id: string, dir: -1 | 1) {
    setSlides(prev => {
      const idx = prev.findIndex(s => s.id === id)
      const next = idx + dir
      if (next < 0 || next >= prev.length) return prev
      const arr = [...prev]
      ;[arr[idx], arr[next]] = [arr[next], arr[idx]]
      return withFirstActive(arr).map((s, i) => ({ ...s, sort_order: i + 1 }))
    })
  }

  async function handleSave() {
    setSaving(true)
    try {
      await saveHeroSlides(slides, originalIds)
      setOriginalIds(slides.map(s => s.id))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      alert('Erro ao guardar: ' + e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#1a2535]">Slider Hero</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {slides.length} slide{slides.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-[color:var(--green-text)] font-medium">Guardado!</span>}
          <button
            type="button"
            onClick={addSlide}
            className="flex items-center gap-2 px-4 py-2 border border-[#7ab929] text-[color:var(--green-text)] text-sm font-semibold rounded-xl hover:bg-[#7ab929]/5 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Adicionar Slide
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#7ab929] text-[#0e1a10] text-sm font-semibold rounded-xl hover:bg-[#6aa520] transition-colors disabled:opacity-60"
          >
            {saving ? 'A guardar…' : 'Guardar'}
          </button>
        </div>
      </div>

      <FirebaseNotice />

      <div className="mt-4 space-y-4">
        {slides.map((slide, idx) => (
          <div key={slide.id} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start gap-5">

              {/* Miniatura */}
              <div className="shrink-0 w-36 h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                {slideOwnImage(slide) ? (
                  <img src={slideOwnImage(slide)} alt="" className="w-full h-full object-cover" />
                ) : (
                  // sem imagem própria o site mostra o render do AMBI 2.7
                  <div className="w-full h-full flex items-center justify-center bg-[#16241a]">
                    <img src={HERO_RENDER} alt="" className="h-full object-contain" />
                  </div>
                )}
              </div>

              {/* Campos */}
              <div className="flex-1 grid grid-cols-2 gap-3 min-w-0">
                <div className="col-span-2 flex items-center justify-between gap-3 flex-wrap">
                  <StatusBadge active={slide.active !== false} />
                  {idx === 0 ? (
                    <span className="text-xs text-gray-400">Slide principal: está sempre ativo (o site precisa de pelo menos um)</span>
                  ) : (
                    <ToggleButton active={slide.active !== false} onClick={() => toggleSlide(slide)} />
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                    URL da Imagem <span className="normal-case font-normal text-gray-300">(vazio = render do AMBI 2.7)</span>
                  </label>
                  <input
                    type="text"
                    value={slide.image_url}
                    onChange={e => updateSlide(slide.id, { image_url: e.target.value })}
                    placeholder="/assets/imagem.webp"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={e => updateSlide(slide.id, { title: e.target.value })}
                    placeholder="Título do slide"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">
                    Para dar cor a parte do título, rodeie essas palavras com asteriscos. Ex.: A infraestrutura que a <strong>*sua cidade*</strong> merece.
                  </p>
                  {slide.title.includes('*') && (
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <div className="rounded-lg bg-[#16241a] px-3 py-2 text-[15px] font-bold text-white leading-snug">
                        {titleParts(slide.title).map((p, i) => (
                          <span key={i} style={p.highlight ? { color: slide.highlight_color ?? HIGHLIGHT_COLORS[0].value } : undefined}>{p.text}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Cor do destaque</span>
                        {HIGHLIGHT_COLORS.map(c => (
                          <button
                            key={c.value}
                            type="button"
                            title={c.label}
                            aria-label={c.label}
                            aria-pressed={(slide.highlight_color ?? HIGHLIGHT_COLORS[0].value) === c.value}
                            onClick={() => updateSlide(slide.id, { highlight_color: c.value })}
                            className="h-6 w-6 rounded-full border border-gray-300 aria-pressed:ring-2 aria-pressed:ring-offset-1 aria-pressed:ring-[#303f49]"
                            style={{ background: c.value }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                    Subtítulo
                  </label>
                  <textarea
                    value={slide.subtitle ?? ''}
                    onChange={e => updateSlide(slide.id, { subtitle: e.target.value })}
                    placeholder="Descrição breve…"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                    Texto do Botão
                  </label>
                  <input
                    type="text"
                    value={slide.cta_label ?? ''}
                    onChange={e => updateSlide(slide.id, { cta_label: e.target.value })}
                    placeholder="Ver Produto"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                    URL do Botão
                  </label>
                  <input
                    type="text"
                    value={slide.cta_url ?? ''}
                    onChange={e => updateSlide(slide.id, { cta_url: e.target.value })}
                    placeholder="/produtos/exemplo"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
                  />
                </div>
              </div>

              {/* Ações */}
              <div className="shrink-0 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => moveSlide(slide.id, -1)}
                  disabled={idx === 0}
                  aria-label="Mover para cima"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15"/>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => moveSlide(slide.id, 1)}
                  disabled={idx === slides.length - 1}
                  aria-label="Mover para baixo"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeSlide(slide.id)}
                  disabled={idx === 0}
                  title={idx === 0 ? 'O slide principal não se elimina' : undefined}
                  aria-label="Eliminar slide"
                  className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors mt-2"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                    <path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>
            </div>

            <p className="mt-3 text-[12px] font-semibold uppercase tracking-widest text-gray-300">
              Slide {idx + 1}
            </p>
          </div>
        ))}

        {slides.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-400 text-sm">{loading ? 'A carregar…' : 'Sem slides. Adiciona um para começar.'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
