import { useState, type FormEvent } from 'react'
import { useNews, createArticle, updateArticle, deleteArticle } from '@/hooks/useNews'
import type { NewsArticle } from '@/types'
import Modal from '@/components/ui/Modal'
import FirebaseNotice from '../FirebaseNotice'
import { StatusBadge, ToggleButton } from '../ActiveControls'
import { translationsFor, TRANSLATION_FAILED } from '../translate'

// textos traduzidos automaticamente ao guardar
const newsTexts = (a: Pick<NewsArticle, 'title' | 'excerpt' | 'content' | 'category'>) =>
  ({ title: a.title, excerpt: a.excerpt, content: a.content, category: a.category })

const inputClass = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors'
const labelClass = 'block text-[12px] font-semibold uppercase tracking-wide text-gray-400 mb-1'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

interface FormState {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  image_url: string
  published_at: string
}

function toFormState(article: NewsArticle | null): FormState {
  if (!article) {
    return {
      title: '', slug: '', excerpt: '', content: '', category: '',
      image_url: '', published_at: new Date().toISOString().slice(0, 10),
    }
  }
  return {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    image_url: article.image_url ?? '',
    published_at: article.published_at.slice(0, 10),
  }
}

export default function AdminNoticias() {
  const { articles, loading, refetch } = useNews({ includeInactive: true })
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<NewsArticle | null>(null)
  const [form, setForm] = useState<FormState>(toFormState(null))
  const [saving, setSaving] = useState(false)

  function openCreate() {
    setEditing(null)
    setForm(toFormState(null))
    setModalOpen(true)
  }

  function openEdit(article: NewsArticle) {
    setEditing(article)
    setForm(toFormState(article))
    setModalOpen(true)
  }

  function updateForm(patch: Partial<FormState>) {
    setForm(prev => ({ ...prev, ...patch }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const publishedAtIso = new Date(form.published_at).toISOString()
      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        language: 'pt' as const,
        image_url: form.image_url || undefined,
        published_at: publishedAtIso,
        created_at: editing?.created_at ?? new Date().toISOString(),
      }
      const i18n = await translationsFor(newsTexts(payload), editing ? newsTexts(editing) : undefined, editing?.i18n)
      if (editing) {
        await updateArticle(editing.id, { ...payload, i18n })
      } else {
        await createArticle({ ...payload, i18n })
      }
      setModalOpen(false)
      refetch()
      if (i18n === null) alert(TRANSLATION_FAILED)
    } finally {
      setSaving(false)
    }
  }

  async function handleToggle(article: NewsArticle) {
    try {
      await updateArticle(article.id, { active: article.active === false })
      refetch()
    } catch (err) {
      alert('Erro ao alterar: ' + err)
    }
  }

  async function handleDelete(article: NewsArticle) {
    if (!window.confirm(`Eliminar "${article.title}"?`)) return
    await deleteArticle(article.id)
    refetch()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#1a2535]">Notícias</h1>
          <p className="text-sm text-gray-400 mt-0.5">{articles.length} artigo{articles.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#7ab929] text-[#0e1a10] text-sm font-semibold rounded-xl hover:bg-[#6aa520] transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Novo Artigo
        </button>
      </div>

      <FirebaseNotice />

      <div className="mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Título</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Categoria</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Data</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-400">A carregar…</td></tr>
            ) : articles.map(article => (
              <tr key={article.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4 max-w-[240px]">
                  <p className="font-medium text-gray-800 truncate">{article.title}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{article.excerpt}</p>
                </td>
                <td className="px-5 py-4 text-gray-600">{article.category}</td>
                <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                  {new Date(article.published_at).toLocaleDateString('pt-PT')}
                </td>
                <td className="px-5 py-4"><StatusBadge active={article.active !== false} /></td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <span className="mr-4"><ToggleButton active={article.active !== false} onClick={() => handleToggle(article)} /></span>
                  <button
                    onClick={() => openEdit(article)}
                    className="text-xs font-medium text-[color:var(--green-text)] hover:text-[#5d9519] transition-colors mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(article)}
                    className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Editar Artigo' : 'Novo Artigo'}
        maxWidthClassName="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Título</label>
              <input
                type="text" required value={form.title}
                onChange={e => updateForm({ title: e.target.value, slug: form.slug || slugify(e.target.value) })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                type="text" required value={form.slug}
                onChange={e => updateForm({ slug: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Categoria</label>
              <input
                type="text" required value={form.category}
                onChange={e => updateForm({ category: e.target.value })}
                placeholder="ex: Sustentabilidade"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Data de Publicação</label>
              <input
                type="date" required value={form.published_at}
                onChange={e => updateForm({ published_at: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Imagem</label>
            <input
              type="text" value={form.image_url}
              onChange={e => updateForm({ image_url: e.target.value })}
              placeholder="/assets/imagem.jpg"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Resumo</label>
            <textarea
              required rows={2} value={form.excerpt}
              onChange={e => updateForm({ excerpt: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>Conteúdo</label>
            <textarea
              required rows={6} value={form.content}
              onChange={e => updateForm({ content: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button" onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-500 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit" disabled={saving}
              className="px-4 py-2 bg-[#7ab929] text-[#0e1a10] text-sm font-semibold rounded-xl hover:bg-[#6aa520] transition-colors disabled:opacity-60"
            >
              {saving ? 'A guardar…' : 'Guardar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
