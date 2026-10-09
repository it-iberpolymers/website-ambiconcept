import { Link } from '@/i18n/router'
import { useState, useEffect } from 'react'
import { categoryHref } from '@/lib/categorySlug'
import { lenis } from '@/lib/lenis'
import { useI18n } from '@/i18n'
import '@/styles/footer-premium.css'

function SocialBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="ft-social-btn">
      {children}
    </a>
  )
}

function ScrollToTopBtn() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 100)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <button
      type="button"
      aria-label={t('layout.footer.backToTop')}
      onClick={() => lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`ft-scroll-btn${visible ? '' : ' ft-scroll-btn--hidden'}`}
    >
      <svg aria-hidden="true" viewBox="0 0 448 512" className="ft-scroll-icon">
        <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"/>
      </svg>
    </button>
  )
}

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <>
      <footer className="ft-root">
        <svg className="ft-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60V28C240 -4 480 -4 720 22s480 30 720 4V60z" />
        </svg>

        {/* ── Brand bar ─────────────────────────────────────── */}
        <div className="ft-brand-bar">
          <Link to="/" aria-label={t('layout.footer.homeLink')}>
            <img src="/assets/Logo-Ambiconcept-Principal-3.svg" alt="Ambiconcept" className="ft-logo" />
          </Link>
          <div className="ft-social-bar">
            <SocialBtn href="https://www.linkedin.com/company/ambiconcept-tecnologias-ambientais/" label={t('layout.header.linkedin')}>
              <svg aria-hidden="true" viewBox="0 0 448 512" className="ft-social-icon">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
              </svg>
            </SocialBtn>
            <SocialBtn href="https://www.instagram.com/ambiconcept.waste.solutions/" label={t('layout.header.instagram')}>
              <svg aria-hidden="true" viewBox="0 0 448 512" className="ft-social-icon">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
            </SocialBtn>
          </div>
        </div>

        {/* ── Navegação ─────────────────────────────────────── */}
        <nav className="ft-nav" aria-label={t('layout.footer.nav')}>

          {/* Empresa */}
          <div>
            <span className="ft-nav-label">{t('layout.footer.company')}</span>
            <ul className="ft-nav-list">
              {[
                { label: t('common.home'),     to: '/',                          external: false },
                { label: t('common.news'),   to: '/noticias',                  external: false },
                { label: t('common.contacts'), to: '/contactos',                 external: false },
                { label: t('layout.header.group'), to: 'https://iberpolymers.pt',    external: true },
              ].map(item => (
                <li key={item.label}>
                  {item.external
                    ? <a href={item.to} target="_blank" rel="noopener noreferrer" className="ft-nav-link">{item.label}</a>
                    : <Link to={item.to} className="ft-nav-link">{item.label}</Link>
                  }
                </li>
              ))}
            </ul>
            <a href="https://iberpolymers.pt" target="_blank" rel="noopener noreferrer" aria-label={t('layout.header.group')} className="ft-iberpoly-logo">
              <span className="ft-iberpoly-label">{t('layout.footer.companyBy')}</span>
              <img src="/assets/logo-iberpolymers-group.svg" alt={t('layout.header.group')} className="ft-iberpoly-img" />
            </a>
          </div>

          {/* Fluxos */}
          <div>
            <span className="ft-nav-label">{t('layout.footer.flows')}</span>
            <ul className="ft-nav-list">
              {[
                { label: t('layout.footer.flow.glass'), href: '/fluxos/vidro' },
                { label: t('layout.footer.flow.biowaste'), href: '/fluxos/biorresiduos' },
                { label: t('layout.footer.flow.doorToDoor'), href: '/fluxos/porta-a-porta' },
                { label: t('layout.footer.flow.cookingOil'), href: '/fluxos/oleos-alimentares-usados' },
                { label: t('layout.footer.flow.urbanCleaning'), href: '/categorias/limpeza-urbana' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="ft-nav-link">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produtos */}
          <div>
            <span className="ft-nav-label">{t('layout.footer.products')}</span>
            <ul className="ft-nav-list">
              {[
                { label: t('layout.footer.cat.rearLoading'), slug: 'carga-traseira' },
                { label: t('layout.footer.cat.verticalLoading'), slug: 'carga-vertical' },
                { label: t('layout.footer.cat.smartBox'), slug: 'smart-box' },
                { label: t('layout.footer.cat.doorToDoor'), slug: 'porta-a-porta' },
                { label: t('layout.footer.cat.domesticBins'), slug: 'baldes-domesticos' },
                { label: t('layout.footer.cat.urbanCleaning'), slug: 'limpeza-urbana' },
              ].map(item => (
                <li key={item.slug}>
                  <Link to={categoryHref(item.slug)} className="ft-nav-link">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </nav>

        {/* ── Barra legal ───────────────────────────────────── */}
        <div className="ft-legal-bg">
          <div className="ft-legal-inner">
            <p className="ft-copyright">
              {t('layout.footer.copyright', { year })}
            </p>
            <div className="ft-legal-links">
              <Link to="/politica-de-privacidade" className="ft-legal-link">{t('layout.footer.privacy')}</Link>
              <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="ft-legal-link">{t('layout.footer.complaints')}</a>
            </div>
          </div>
        </div>

        {/* ── Co-financiamento ──────────────────────────────── */}
        <div className="ft-cofin-bg">
          <div className="ft-cofin-inner">
            <p className="ft-cofin-label">{t('layout.footer.cofinanced')}</p>
            <div className="ft-cofin-logos">
              <img
                src="/assets/projeto-compete-2030-white-scaled.png"
                alt={t('layout.footer.compete')}
                className="ft-cofin-img ft-cofin-img--compete"
              />
              <img
                src="/assets/projeto-prr-white.png"
                alt={t('layout.footer.prr')}
                className="ft-cofin-img ft-cofin-img--prr"
              />
            </div>
          </div>
        </div>

      </footer>

      <ScrollToTopBtn />
    </>
  )
}
