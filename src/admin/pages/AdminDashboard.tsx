import { useNews } from '@/hooks/useNews'
import { useProducts } from '@/hooks/useProducts'
import { useStats } from '@/hooks/useStats'
import { useContacts } from '@/hooks/useContacts'

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

export default function AdminDashboard() {
  const { articles } = useNews()
  const { products } = useProducts()
  const { stats } = useStats()
  const { contacts } = useContacts()

  const containers = stats.find(s => s.key === 'containers_installed')?.value ?? 0
  const municipalities = stats.find(s => s.key === 'municipalities_count')?.value ?? 0

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#1a2535]">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Visão geral do conteúdo do site</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Artigos" value={articles.length} color="text-[color:var(--green-text)]" />
        <StatCard label="Produtos" value={products.length} color="text-blue-600" />
        <StatCard label="Submissões" value={contacts.length} color="text-purple-600" />
        <StatCard label="Municípios" value={municipalities} color="text-orange-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Últimas Notícias</h2>
          <ul className="space-y-3">
            {articles.map(a => (
              <li key={a.id} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 h-2 w-2 rounded-full bg-[#7ab929]" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{a.title}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(a.published_at).toLocaleDateString('pt-PT')} · {a.category}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Estatísticas Publicadas</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <span className="text-sm text-gray-600">Contentores Instalados</span>
              <span className="text-sm font-bold text-[color:var(--green-text)]">+{containers.toLocaleString('pt-PT')}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">Municípios Aderentes</span>
              <span className="text-sm font-bold text-[color:var(--green-text)]">+{municipalities.toLocaleString('pt-PT')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
