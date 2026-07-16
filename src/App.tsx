import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetail from '@/pages/ProductDetail'
import News from '@/pages/News'
import NewsArticle from '@/pages/NewsArticle'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import Contacts from '@/pages/Contacts'
import CategoryPage from '@/pages/CategoryPage'
import FlowPage from '@/pages/FlowPage'
import AdminLayout from '@/admin/AdminLayout'
import AdminLogin from '@/admin/AdminLogin'
import AdminDashboard from '@/admin/pages/AdminDashboard'
import AdminNoticias from '@/admin/pages/AdminNoticias'
import AdminProdutos from '@/admin/pages/AdminProdutos'
import AdminContactos from '@/admin/pages/AdminContactos'
import AdminEstatisticas from '@/admin/pages/AdminEstatisticas'
import AdminHero from '@/admin/pages/AdminHero'
import AdminFeatured from '@/admin/pages/AdminFeatured'

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl font-black text-ink-100 mb-4">404</p>
      <h1 className="text-2xl font-bold text-ink-900 mb-2">Página não encontrada</h1>
      <p className="text-ink-500 mb-6">A página que procura não existe.</p>
      <Link to="/" className="text-brand-600 font-semibold hover:underline">← Voltar ao início</Link>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Site público */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="produtos" element={<Products />} />
          <Route path="produtos/:categoria/:slug" element={<ProductDetail />} />
          <Route path="produtos/:slug" element={<ProductDetail />} />
          <Route path="categorias/:slug" element={<CategoryPage />} />
          <Route path="fluxos/:slug" element={<FlowPage />} />
          <Route path="noticias" element={<News />} />
          <Route path="noticias/:slug" element={<NewsArticle />} />
          <Route path="politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="contactos" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin */}
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="noticias" element={<AdminNoticias />} />
          <Route path="produtos" element={<AdminProdutos />} />
          <Route path="contactos" element={<AdminContactos />} />
          <Route path="estatisticas" element={<AdminEstatisticas />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="featured" element={<AdminFeatured />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
