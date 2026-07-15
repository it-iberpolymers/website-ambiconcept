import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email.trim(), password)
      navigate('/admin/dashboard', { replace: true })
    } catch {
      setError('Credenciais inválidas. Verifique o e-mail e a password.')
    } finally {
      setLoading(false)
    }
  }

  const firebaseConfigured = !!import.meta.env.VITE_FIREBASE_PROJECT_ID

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <img
              src="/assets/Logo-Ambiconcept-Principal-1.svg"
              alt="Ambiconcept"
              className="h-9 mx-auto mb-6"
            />
            <h1 className="text-lg font-semibold text-[#1a2535]">Painel de Administração</h1>
            <p className="text-sm text-gray-400 mt-1">Inicie sessão para continuar</p>
          </div>

          {!firebaseConfigured && (
            <div className="mb-5 flex gap-2 items-start p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
              <svg className="mt-0.5 shrink-0 h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
              </svg>
              Firebase não configurado — preencha o ficheiro .env para activar a autenticação.
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-600 mb-1.5">
                E-mail
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@ambiconcept.pt"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-600 mb-1.5">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7ab929]/40 focus:border-[#7ab929] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#7ab929] text-white text-sm font-semibold rounded-xl hover:bg-[#6aa520] active:bg-[#5d9519] transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? 'A entrar…' : 'Entrar'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Ambiconcept Waste Solutions © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
