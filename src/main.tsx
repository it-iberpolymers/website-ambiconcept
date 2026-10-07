import { StrictMode, Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App'

// o painel de administração não entra nas estatísticas
const skipAdmin = <T extends { url: string }>(event: T): T | null =>
  new URL(event.url, window.location.origin).pathname.startsWith('/admin') ? null : event

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App crash:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: 'monospace', background: '#fee', color: '#c00', maxWidth: 800, margin: '40px auto', borderRadius: 8, border: '1px solid #c00' }}>
          <strong style={{ fontSize: 18 }}>Erro ao carregar a aplicação</strong>
          <pre style={{ marginTop: 12, whiteSpace: 'pre-wrap', fontSize: 13 }}>
            {(this.state.error as Error).message}
            {'\n\n'}
            {(this.state.error as Error).stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

const root = document.getElementById('root')
if (!root) throw new Error('Elemento #root não encontrado no DOM.')

createRoot(root).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
    <Analytics beforeSend={skipAdmin} />
    <SpeedInsights beforeSend={skipAdmin} />
  </StrictMode>
)
