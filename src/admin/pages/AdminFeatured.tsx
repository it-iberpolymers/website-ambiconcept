import { useState, useEffect } from 'react'
import { useFeaturedBanner, saveFeaturedBanner, defaultBanner } from '@/hooks/useFeaturedBanner'
import type { FeaturedBanner } from '@/types'
import FirebaseNotice from '../FirebaseNotice'

export default function AdminFeatured() {
  const { banner: fetchedBanner, loading } = useFeaturedBanner()
  const [banner, setBanner] = useState<FeaturedBanner>(defaultBanner)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading) setBanner(fetchedBanner)
  }, [loading, fetchedBanner])

  function update(patch: Partial<FeaturedBanner>) {
    setBanner(prev => ({ ...prev, ...patch }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await saveFeaturedBanner(banner)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      alert('Erro ao guardar: ' + e)
    } finally {
      setSaving(false)
    }
  }

  function handleReset() {
    setBanner(defaultBanner)
  }

  const overlayPercent = Math.round(banner.overlay_opacity * 100)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#1a2535]">Banner Destaque</h1>
          <p className="text-sm text-gray-400 mt-0.5">Secção em destaque na página inicial</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-[color:var(--green-text)] font-medium">Guardado!</span>}
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-gray-200 text-gray-500 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Repor padrão
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

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Formulário */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">

          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
              URL da Imagem de Fundo
            </label>
            <input
              type="text"
              value={banner.image_url}
              onChange={e => update({ image_url: e.target.value })}
              placeholder="/assets/imagem.png"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
              Título
            </label>
            <input
              type="text"
              value={banner.title}
              onChange={e => update({ title: e.target.value })}
              placeholder="Cápsulas"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
              Subtítulo <span className="normal-case font-normal text-gray-300">(opcional)</span>
            </label>
            <input
              type="text"
              value={banner.subtitle ?? ''}
              onChange={e => update({ subtitle: e.target.value || undefined })}
              placeholder="ex: Novidade"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
              Descrição
            </label>
            <textarea
              value={banner.description}
              onChange={e => update({ description: e.target.value })}
              placeholder="Texto descritivo…"
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                Texto do Botão
              </label>
              <input
                type="text"
                value={banner.cta_label}
                onChange={e => update({ cta_label: e.target.value })}
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
                value={banner.cta_url}
                onChange={e => update({ cta_url: e.target.value })}
                placeholder="/produtos?categoria=capsulas"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-2">
              Opacidade do Overlay — {overlayPercent}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={banner.overlay_opacity}
              onChange={e => update({ overlay_opacity: parseFloat(e.target.value) })}
              className="w-full accent-[#7ab929]"
            />
            <div className="flex justify-between text-[12px] text-gray-300 mt-1">
              <span>Transparente</span>
              <span>Escuro</span>
            </div>
          </div>
        </div>

        {/* Pré-visualização */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-3">
            Pré-visualização
          </p>
          <div
            className="relative rounded-xl overflow-hidden min-h-[260px] flex items-center"
            style={{ backgroundImage: `url(${banner.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div
              className="absolute inset-0 rounded-xl"
              style={{ background: `linear-gradient(278deg, rgba(0,0,0,0) 38%, rgba(0,0,0,${banner.overlay_opacity}) 100%)` }}
            />
            <div className="relative z-10 p-6 max-w-[280px]">
              {banner.subtitle && (
                <p className="text-[12px] font-semibold tracking-widest uppercase text-[color:var(--green-text)] mb-2">
                  {banner.subtitle}
                </p>
              )}
              <h3 className="text-[28px] font-bold uppercase text-white leading-tight mb-2">
                {banner.title || 'Título'}
              </h3>
              <p className="text-white/80 text-[12px] leading-relaxed mb-4">
                {banner.description || 'Descrição…'}
              </p>
              <span className="inline-block bg-white text-[#303f49] text-[12px] font-medium uppercase tracking-wider px-4 py-2">
                {banner.cta_label || 'Botão'}
              </span>
            </div>
          </div>
          {!banner.image_url && (
            <p className="text-[12px] text-gray-300 mt-2 text-center">
              Introduz a URL da imagem para pré-visualizar
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
