import { useState, type FormEvent } from 'react'
import { useProducts, useProductCategories, createProduct, updateProduct, deleteProduct } from '@/hooks/useProducts'
import type { Product } from '@/types'
import Modal from '@/components/ui/Modal'
import FirebaseNotice from '../FirebaseNotice'

const inputClass = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors'
const labelClass = 'block text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

interface SpecRow { label: string; value: string }

interface FormState {
  name: string
  slug: string
  category_id: string
  short_description: string
  description: string
  cover_image: string
  hero_images: string[]
  specRows: SpecRow[]
  featured: boolean
  price: string
}

function toFormState(product: Product | null): FormState {
  if (!product) {
    return {
      name: '', slug: '', category_id: '', short_description: '', description: '',
      cover_image: '', hero_images: [''], specRows: [{ label: '', value: '' }],
      featured: false, price: '',
    }
  }
  return {
    name: product.name,
    slug: product.slug,
    category_id: product.category_id,
    short_description: product.short_description,
    description: product.description,
    cover_image: product.cover_image,
    hero_images: product.hero_images.length ? product.hero_images : [''],
    specRows: Object.entries(product.specifications ?? {}).map(([label, value]) => ({ label, value: String(value) })),
    featured: product.featured,
    price: product.price != null ? String(product.price) : '',
  }
}

export default function AdminProdutos() {
  const { products, loading, refetch } = useProducts()
  const { categories } = useProductCategories()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<FormState>(toFormState(null))
  const [saving, setSaving] = useState(false)

  function openCreate() {
    setEditing(null)
    setForm(toFormState(null))
    setModalOpen(true)
  }

  function openEdit(product: Product) {
    setEditing(product)
    setForm(toFormState(product))
    setModalOpen(true)
  }

  function updateForm(patch: Partial<FormState>) {
    setForm(prev => ({ ...prev, ...patch }))
  }

  function updateHeroImage(idx: number, value: string) {
    setForm(prev => ({ ...prev, hero_images: prev.hero_images.map((v, i) => i === idx ? value : v) }))
  }
  function addHeroImage() {
    setForm(prev => ({ ...prev, hero_images: [...prev.hero_images, ''] }))
  }
  function removeHeroImage(idx: number) {
    setForm(prev => ({ ...prev, hero_images: prev.hero_images.filter((_, i) => i !== idx) }))
  }

  function updateSpecRow(idx: number, patch: Partial<SpecRow>) {
    setForm(prev => ({ ...prev, specRows: prev.specRows.map((r, i) => i === idx ? { ...r, ...patch } : r) }))
  }
  function addSpecRow() {
    setForm(prev => ({ ...prev, specRows: [...prev.specRows, { label: '', value: '' }] }))
  }
  function removeSpecRow(idx: number) {
    setForm(prev => ({ ...prev, specRows: prev.specRows.filter((_, i) => i !== idx) }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const category = categories.find(c => c.id === form.category_id)
      const payload = {
        name: form.name,
        slug: form.slug || slugify(form.name),
        category_id: form.category_id,
        category,
        short_description: form.short_description,
        description: form.description,
        cover_image: form.cover_image,
        hero_images: form.hero_images.map(s => s.trim()).filter(Boolean),
        specifications: Object.fromEntries(
          form.specRows.filter(r => r.label.trim()).map(r => [r.label, r.value])
        ),
        featured: form.featured,
        price: form.price ? Number(form.price) : undefined,
        created_at: editing?.created_at ?? new Date().toISOString(),
      }
      if (editing) {
        await updateProduct(editing.id, payload)
      } else {
        await createProduct(payload)
      }
      setModalOpen(false)
      refetch()
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(product: Product) {
    if (!window.confirm(`Eliminar "${product.name}"?`)) return
    await deleteProduct(product.id)
    refetch()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#1a2535]">Produtos</h1>
          <p className="text-sm text-gray-400 mt-0.5">{products.length} produto{products.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#7ab929] text-white text-sm font-semibold rounded-xl hover:bg-[#6aa520] transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Novo Produto
        </button>
      </div>

      <FirebaseNotice />

      <div className="mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Produto</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Categoria</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Destaque</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400">A carregar…</td></tr>
            ) : products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {product.cover_image && (
                      <img
                        src={product.cover_image}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg object-cover bg-gray-100 shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[200px] mt-0.5">{product.short_description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-600">{product.category?.name ?? '—'}</td>
                <td className="px-5 py-4">
                  {product.featured ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#7ab929]/10 text-[#5d9519] text-xs font-semibold rounded">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      Destaque
                    </span>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => openEdit(product)}
                    className="text-xs font-medium text-[#7ab929] hover:text-[#5d9519] transition-colors mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
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
        title={editing ? 'Editar Produto' : 'Novo Produto'}
        maxWidthClassName="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Nome</label>
              <input
                type="text" required value={form.name}
                onChange={e => updateForm({ name: e.target.value, slug: form.slug || slugify(e.target.value) })}
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

          <div>
            <label className={labelClass}>Categoria</label>
            <select
              required value={form.category_id}
              onChange={e => updateForm({ category_id: e.target.value })}
              className={inputClass}
            >
              <option value="" disabled>Selecionar categoria…</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className={labelClass}>Descrição Curta</label>
            <textarea
              required rows={2} value={form.short_description}
              onChange={e => updateForm({ short_description: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>Descrição</label>
            <textarea
              required rows={4} value={form.description}
              onChange={e => updateForm({ description: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Imagem de Capa</label>
              <input
                type="text" required value={form.cover_image}
                onChange={e => updateForm({ cover_image: e.target.value })}
                placeholder="/assets/imagem.png"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Preço <span className="normal-case font-normal text-gray-300">(opcional)</span></label>
              <input
                type="number" step="0.01" value={form.price}
                onChange={e => updateForm({ price: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Imagens da Galeria</label>
            <div className="space-y-2">
              {form.hero_images.map((url, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text" value={url}
                    onChange={e => updateHeroImage(idx, e.target.value)}
                    placeholder="/assets/imagem.png"
                    className={inputClass}
                  />
                  <button type="button" onClick={() => removeHeroImage(idx)} className="px-2 text-red-400 hover:text-red-600">✕</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addHeroImage} className="mt-2 text-xs font-medium text-[#7ab929] hover:text-[#5d9519]">
              + Adicionar imagem
            </button>
          </div>

          <div>
            <label className={labelClass}>Especificações</label>
            <div className="space-y-2">
              {form.specRows.map((row, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text" value={row.label}
                    onChange={e => updateSpecRow(idx, { label: e.target.value })}
                    placeholder="Etiqueta (ex: Capacidade)"
                    className={inputClass}
                  />
                  <input
                    type="text" value={row.value}
                    onChange={e => updateSpecRow(idx, { value: e.target.value })}
                    placeholder="Valor (ex: 2.700 L)"
                    className={inputClass}
                  />
                  <button type="button" onClick={() => removeSpecRow(idx)} className="px-2 text-red-400 hover:text-red-600">✕</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addSpecRow} className="mt-2 text-xs font-medium text-[#7ab929] hover:text-[#5d9519]">
              + Adicionar especificação
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox" checked={form.featured}
              onChange={e => updateForm({ featured: e.target.checked })}
              className="accent-[#7ab929]"
            />
            Produto em destaque
          </label>

          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button" onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-500 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit" disabled={saving}
              className="px-4 py-2 bg-[#7ab929] text-white text-sm font-semibold rounded-xl hover:bg-[#6aa520] transition-colors disabled:opacity-60"
            >
              {saving ? 'A guardar…' : 'Guardar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
