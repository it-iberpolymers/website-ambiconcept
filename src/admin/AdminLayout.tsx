import { useState } from 'react'
import { NavLink, Outlet, Link, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

function IconGrid() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )
}
function IconNews() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v8a2 2 0 0 1-2 2Z"/>
      <path strokeLinecap="round" d="M14 4v4h4M8 13h8M8 17h5"/>
    </svg>
  )
}
function IconBox() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.3 7 8.7 5 8.7-5M12 22V12"/>
    </svg>
  )
}
function IconMail() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}
function IconChart() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>
    </svg>
  )
}
function IconSlider() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="10" rx="1"/>
      <polyline points="7 7 7 4"/><polyline points="17 7 17 4"/>
      <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
    </svg>
  )
}
function IconStar() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}
function IconLogout() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  )
}
function IconMenu() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  )
}
function IconX() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', Icon: IconGrid },
  { to: '/admin/hero', label: 'Slider Hero', Icon: IconSlider },
  { to: '/admin/featured', label: 'Banner Destaque', Icon: IconStar },
  { to: '/admin/noticias', label: 'Notícias', Icon: IconNews },
  { to: '/admin/produtos', label: 'Produtos', Icon: IconBox },
  { to: '/admin/contactos', label: 'Contactos', Icon: IconMail },
  { to: '/admin/estatisticas', label: 'Estatísticas', Icon: IconChart },
]

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to="/admin/login" replace />

  return (
    <div className="flex h-screen bg-[#f0f4f8] overflow-hidden">

      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col w-60 bg-[#1a2535] transition-transform duration-200 ease-in-out
          md:relative md:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10 shrink-0">
          <img
            src="/assets/Logo-Ambiconcept-Principal-1.svg"
            alt="Ambiconcept"
            className="h-7 brightness-0 invert"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="md:hidden p-1 text-white/40 hover:text-white"
            aria-label="Fechar menu"
          >
            <IconX />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          <p className="px-5 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-widest text-white/25">
            Gestão
          </p>
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#7ab929] text-white'
                    : 'text-white/55 hover:bg-white/8 hover:text-white'
                }`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Voltar ao site */}
        <div className="px-4 pb-4 pt-2 border-t border-white/10 shrink-0">
          <Link
            to="/"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/45 hover:text-white hover:bg-white/8 transition-colors"
          >
            <IconLogout />
            Voltar ao site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center gap-4 px-6 shrink-0">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            <IconMenu />
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <div className="h-8 w-8 rounded-full bg-[#7ab929]/15 flex items-center justify-center text-[#7ab929] text-xs font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
