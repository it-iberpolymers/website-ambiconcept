import { type FormEvent, useState, useEffect } from 'react'
import { useStats, updateStat } from '@/hooks/useStats'
import FirebaseNotice from '../FirebaseNotice'

export default function AdminEstatisticas() {
  const { stats, loading } = useStats()
  const [values, setValues] = useState({ containers: 0, municipalities: 0 })
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading) {
      setValues({
        containers: stats.find(s => s.key === 'containers_installed')?.value ?? 0,
        municipalities: stats.find(s => s.key === 'municipalities_count')?.value ?? 0,
      })
    }
  }, [loading, stats])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await updateStat('stat-1', values.containers)
      await updateStat('stat-2', values.municipalities)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      alert('Erro ao guardar: ' + err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#1a2535]">Estatísticas</h1>
        <p className="text-sm text-gray-400 mt-0.5">Valores exibidos na secção de impacto da homepage</p>
      </div>

      <FirebaseNotice />

      <form onSubmit={handleSubmit} className="mt-4 bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
        <div className="space-y-5">
          <div>
            <label htmlFor="stat-containers" className="block text-sm font-medium text-gray-700 mb-1.5">
              Contentores Instalados
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-semibold">+</span>
              <input
                id="stat-containers"
                type="number"
                min={0}
                value={values.containers}
                onChange={e => setValues(v => ({ ...v, containers: Number(e.target.value) }))}
                className="w-36 px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="stat-municipalities" className="block text-sm font-medium text-gray-700 mb-1.5">
              Municípios Aderentes
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-semibold">+</span>
              <input
                id="stat-municipalities"
                type="number"
                min={0}
                value={values.municipalities}
                onChange={e => setValues(v => ({ ...v, municipalities: Number(e.target.value) }))}
                className="w-36 px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-[#7ab929] text-[#0e1a10] text-sm font-semibold rounded-xl hover:bg-[#6aa520] transition-colors disabled:opacity-60"
          >
            {saving ? 'A guardar…' : 'Guardar'}
          </button>
          {saved && (
            <p className="text-sm text-[color:var(--green-text)] font-medium">Guardado!</p>
          )}
        </div>
      </form>
    </div>
  )
}
