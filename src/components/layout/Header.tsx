import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link, NavLink, usePathname } from '@/i18n/router'
import { categoryHref, toPublicSlug } from '@/lib/categorySlug'
import { useProducts, useProductCategories } from '@/hooks/useProducts'
import { useI18n } from '@/i18n'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const navLinks = [
  { labelKey: 'common.news', to: '/noticias' },
  { labelKey: 'common.contacts', to: '/contactos' },
]

export default function Header() {
  const { t } = useI18n()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // submenu de Produtos: fecha ao clicar numa ligação e volta ao normal quando o rato sai
  const [menuClosed, setMenuClosed] = useState(false)
  const pathname = usePathname() // sem o prefixo de língua
  const { search } = useLocation()
  const { categories: allCategories } = useProductCategories()
  const { products } = useProducts()
  const categories = allCategories.filter((cat) => products.some((p) => p.category?.slug === cat.slug))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // O header transparente/texto branco só faz sentido sobre o hero escuro da homepage.
  // Nas restantes páginas (templates de produto, etc.) o topo é claro, por isso o header
  // nasce já no estado "sólido" para se manter legível antes do primeiro scroll.
  // categoria atual (página de categoria, de produto ou catálogo filtrado) e secção de produtos
  const currentSeg = pathname.match(/^\/(?:categorias|produtos)\/([^/]+)/)?.[1]
  const activeCat = toPublicSlug(currentSeg ?? new URLSearchParams(search).get('categoria') ?? '')
  const productsActive = pathname.startsWith('/produtos') || pathname.startsWith('/categorias')
  const isHome = pathname === '/'
  const solid = scrolled || !isHome

  const navText = solid
    ? 'text-[#303f49] hover:text-[#303f49]/60'
    : 'text-white/90 hover:text-white/75'


  return (
    <>
    {mobileOpen && (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-black/20 lg:hidden"
        onClick={() => setMobileOpen(false)}
      />
    )}
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${solid ? 'bg-white/92 backdrop-blur-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.07),0_1px_0_rgba(255,255,255,0.6)] rounded-b-[20px]' : 'bg-transparent'}`}>
      <div className="max-w-[1140px] mx-auto px-5">
        <div className="flex items-center justify-between min-h-[90px]">

          {/* Logótipo — esquerda */}
            <Link
              to="/"
              aria-label={t('layout.header.homeLink')}
              className="relative block shrink-0 w-[260px] max-sm:w-[190px]"
            >
              <img
                src="/assets/Logo-Ambiconcept-Principal-1.svg"
                alt={t('layout.header.logoAlt')}
                className={`w-[260px] h-auto block transition-opacity duration-300 ${solid ? 'opacity-100' : 'opacity-0'}`}
              />
              <img
                src="/assets/Logo-Ambiconcept-Principal-3.svg"
                alt=""
                aria-hidden="true"
                className={`w-[260px] h-auto block absolute inset-0 transition-opacity duration-300 ${solid ? 'opacity-0' : 'opacity-100'}`}
              />
            </Link>


          {/* Menu — à direita do logótipo */}
          <nav aria-label={t('layout.header.mainNav')} className="hidden lg:flex items-center self-stretch ml-auto gap-8">
            <span
              className="relative flex items-center self-stretch group"
              onMouseLeave={() => setMenuClosed(false)}
              onClickCapture={(e) => {
                if ((e.target as HTMLElement).closest('a')) {
                  setMenuClosed(true)
                  ;(document.activeElement as HTMLElement | null)?.blur()
                }
              }}
            >
              <NavLink
                to="/produtos"
                className={({ isActive }) =>
                  `flex items-center gap-1 text-[15px] font-medium transition-colors ${
                    isActive || productsActive ? `text-[color:var(--green-text)]` : navText
                  }`
                }
              >
                {t('common.products')}
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </NavLink>
              <div
                style={menuClosed ? { display: 'none' } : undefined}
                className="fixed left-0 right-0 top-[90px] px-5 pt-3 opacity-0 translate-y-1 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto"
              >
                <div className="max-w-[1140px] mx-auto overflow-hidden rounded-[28px] bg-white shadow-[0_30px_70px_-20px_rgba(14,26,16,0.35)] ring-1 ring-black/5">
                  <div className="p-4 grid grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={categoryHref(cat.slug)}
                        aria-current={activeCat === cat.slug ? 'page' : undefined}
                        className={`group/item block rounded-2xl p-5 transition-colors hover:bg-[#f1fae8] ${
                          activeCat === cat.slug ? 'bg-[#f1fae8] ring-2 ring-inset ring-[#7ab929]' : ''
                        }`}
                      >
                        <p className={`flex items-center justify-between text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors group-hover/item:text-[color:var(--green-text)] ${
                          activeCat === cat.slug ? 'text-[color:var(--green-text)]' : 'text-[#303f49]'
                        }`}>
                          {cat.name}
                          <span aria-hidden="true" className={`transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0 ${
                            activeCat === cat.slug ? 'opacity-100' : 'opacity-0 -translate-x-1'
                          }`}>→</span>
                        </p>
                        {cat.description && (
                          <p className="mt-1.5 text-[13px] leading-snug text-[#303f49]/55">
                            {cat.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                  {/* na própria página de produtos o botão levaria ao mesmo sítio */}
                  {pathname !== '/produtos' && (
                    <div className="flex items-center justify-between bg-[#f5f8f5] px-8 py-4">
                      <span className="text-[12px] text-[#303f49]/50">{t('layout.header.byFlowHint')}</span>
                      <Link
                        to="/produtos"
                        className="rounded-full bg-[#5aad1e] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0e1a10] transition-colors hover:bg-[#448a15]"
                      >
                        {t('layout.header.viewAllProducts')}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </span>
            {navLinks.map((link) => (
              <span key={link.to} className="flex items-center">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-[15px] font-medium transition-colors ${
                      isActive ? `text-[color:var(--green-text)]` : navText
                    }`
                  }
                >
                  {t(link.labelKey)}
                </NavLink>
              </span>
            ))}
            <a
              href="https://www.iberpolymers.pt"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[15px] font-medium transition-colors ${navText}`}
            >
              {t('layout.header.group')}
            </a>
          </nav>

          {/* Língua (computador) */}
          <div className="hidden lg:block ml-4">
            <LanguageSwitcher dark={solid} />
          </div>

          {/* Redes sociais */}
            <div className="hidden lg:flex items-center gap-2 ml-3">
              <a
                href="https://www.linkedin.com/company/ambiconcept-tecnologias-ambientais/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('layout.header.linkedin')}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#7ab929] transition-opacity hover:opacity-80"
              >
                <svg aria-hidden="true" fill="white" viewBox="0 0 448 512" className="h-3" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ambiconcept.waste.solutions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('layout.header.instagram')}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#7ab929] transition-opacity hover:opacity-80"
              >
                <svg aria-hidden="true" fill="white" viewBox="0 0 448 512" className="h-3" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
              </a>
            </div>

          {/* Língua (mobile e tablet) */}
          <div className="ml-auto lg:hidden">
            <LanguageSwitcher dark={solid} />
          </div>

          {/* Toggle mobile */}
          <button
            type="button"
            aria-label={mobileOpen ? t('layout.header.closeMenu') : t('layout.header.openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className={`lg:hidden p-2 ml-1 transition-colors ${solid ? 'text-[#303f49]' : 'text-white'} hover:text-[color:var(--green-text)]`}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Nav mobile */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label={t('layout.header.mobileNav')}
          className="lg:hidden border-t border-[#303f49]/10 bg-white"
        >
          <div className="max-w-[1140px] mx-auto px-5 py-4 flex flex-col gap-1">
            <NavLink
              to="/produtos"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 text-sm font-medium uppercase tracking-[0.06em] transition-colors ${
                  isActive || productsActive ? 'text-[color:var(--green-text)] border-l-4 border-[#7ab929] bg-[#f1fae8] font-semibold' : 'text-[#303f49] hover:text-[color:var(--green-text)]'
                }`
              }
            >
              {t('common.products')}
            </NavLink>
            <div className="flex flex-col gap-1 pl-6 pb-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={categoryHref(cat.slug)}
                  onClick={() => setMobileOpen(false)}
                  aria-current={activeCat === cat.slug ? 'page' : undefined}
                  className={`block px-3 py-1.5 text-sm transition-colors hover:text-[color:var(--green-text)] ${
                    activeCat === cat.slug
                      ? 'text-[color:var(--green-text)] border-l-4 border-[#7ab929] bg-[#f1fae8] font-semibold'
                      : 'text-[#303f49]/70'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm font-medium uppercase tracking-[0.06em] transition-colors ${
                    isActive ? 'text-[color:var(--green-text)] border-l-4 border-[#7ab929] bg-[#f1fae8] font-semibold' : 'text-[#303f49] hover:text-[color:var(--green-text)]'
                  }`
                }
              >
                {t(link.labelKey)}
              </NavLink>
            ))}
            <a
              href="https://www.iberpolymers.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-sm font-medium uppercase tracking-[0.06em] text-[#303f49] hover:text-[color:var(--green-text)] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t('layout.header.group')}
            </a>
          </div>
        </nav>
      )}
    </header>
    </>
  )
}
