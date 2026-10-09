import { useState, type FormEvent } from 'react'
import { useBanners, saveBanner, setBannerActive, deleteBanner, emptyBanner } from '@/hooks/useFeaturedBanner'
import type { FeaturedBanner } from '@/types'
import Modal from '@/components/ui/Modal'
import FirebaseNotice from '../FirebaseNotice'

const inputClass = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors'
const labelClass = 'block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1'

export default function AdminFeatured() {
  const { banners, loading, refetch } = useBanners()
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<FeaturedBanner>(emptyBanner)
  const [saving, setSaving] = useState(false)

  const activeCount = banners.filter(b => b.active !== false).length

  function openCreate() {
    setForm(emptyBanner)
    setModalOpen(true)
  }

  function openEdit(banner: FeaturedBanner) {
    setForm(banner)
    setModalOpen(true)
  }

  function update(patch: Partial<FeaturedBanner>) {
    setForm(prev => ({ ...prev, ...patch }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await saveBanner(form)
      setModalOpen(false)
      refetch()
    } catch (err) {
      alert('Erro ao guardar: ' + err)
    } finally {
      setSaving(false)
    }
  }

  async function handleToggle(banner: FeaturedBanner) {
    try {
      await setBannerActive(banner.id!, banner.active === false)
      refetch()
    } catch (err) {
      alert('Erro ao alterar: ' + err)
    }
  }

  async function handleDelete(banner: FeaturedBanner) {
    if (!window.confirm(`Eliminar o banner "${banner.title}"? Para o tirar do site sem o apagar, use "Retirar do site".`)) return
    try {
      await deleteBanner(banner.id!)
      refetch()
    } catch (err) {
      alert('Erro ao eliminar: ' + err)
    }
  }

  const overlayPercent = Math.round(form.overlay_opacity * 100)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#1a2535]">Banners</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {banners.length} banner{banners.length !== 1 ? 's' : ''} · {activeCount} ativo{activeCount !== 1 ? 's' : ''} na página inicial
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#7ab929] text-[#0e1a10] text-sm font-semibold rounded-xl hover:bg-[#6aa520] transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Novo Banner
        </button>
      </div>

      <FirebaseNotice />

      <div className="mt-4 space-y-3">
        {loading ? (
          <p className="px-5 py-8 text-center text-gray-400">A carregar…</p>
        ) : banners.length === 0 ? (
          <p className="px-5 py-8 text-center text-gray-400 bg-white rounded-2xl border border-gray-100">
            Ainda não há banners. Clique em "Novo Banner".
          </p>
        ) : banners.map(banner => {
          const active = banner.active !== false
          return (
            <div key={banner.id} className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl border border-gray-100 p-4">
              <div
                className="shrink-0 w-full sm:w-[180px] h-[100px] rounded-xl bg-gray-100 bg-cover bg-center"
                style={banner.image_url ? { backgroundImage: `url(${banner.image_url})` } : undefined}
                role="img"
                aria-label={banner.title}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${active ? 'bg-[#e9f5d8] text-[#3f6b0f]' : 'bg-gray-100 text-gray-500'}`}>
                    {active ? 'Ativo — visível no site' : 'Inativo — escondido do site'}
                  </span>
                </div>
                <p className="font-medium text-gray-800 truncate">{banner.title}</p>
                <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">{banner.description}</p>
              </div>
              <div className="flex sm:flex-col sm:items-end justify-end gap-2 sm:gap-1.5 flex-wrap">
                <button
                  onClick={() => handleToggle(banner)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${active ? 'border-gray-200 text-gray-600 hover:bg-gray-50' : 'border-[#7ab929] text-[#3f6b0f] hover:bg-[#f2f9e6]'}`}
                >
                  {active ? 'Retirar do site' : 'Mostrar no site'}
                </button>
                <div className="flex gap-4">
                  <button onClick={() => openEdit(banner)} className="text-xs font-medium text-[color:var(--green-text)] hover:text-[#5d9519] transition-colors">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(banner)} className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? 'Editar Banner' : 'Novo Banner'}
        maxWidthClassName="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>URL da Imagem de Fundo</label>
            <input type="text" required value={form.image_url} onChange={e => update({ image_url: e.target.value })} placeholder="/assets/imagem.png" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Título</label>
              <input type="text" required value={form.title} onChange={e => update({ title: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Subtítulo <span className="normal-case font-normal text-gray-300">(opcional)</span></label>
              <input type="text" value={form.subtitle ?? ''} onChange={e => update({ subtitle: e.target.value || undefined })} placeholder="ex: Novidade" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Descrição</label>
            <textarea required rows={3} value={form.description} onChange={e => update({ description: e.target.value })} className={`${inputClass} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Texto do Botão</label>
              <input type="text" required value={form.cta_label} onChange={e => update({ cta_label: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>URL do Botão</label>
              <input type="text" required value={form.cta_url} onChange={e => update({ cta_url: e.target.value })} placeholder="/produtos" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Escurecer a imagem — {overlayPercent}%</label>
            <input type="range" min="0" max="1" step="0.05" value={form.overlay_opacity} onChange={e => update({ overlay_opacity: parseFloat(e.target.value) })} className="w-full accent-[#7ab929]" />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.active !== false} onChange={e => update({ active: e.target.checked })} className="accent-[#7ab929] h-4 w-4" />
            Mostrar este banner no site
          </label>

          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border border-gray-200 text-gray-500 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-[#7ab929] text-[#0e1a10] text-sm font-semibold rounded-xl hover:bg-[#6aa520] transition-colors disabled:opacity-60">
              {saving ? 'A guardar…' : 'Guardar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
