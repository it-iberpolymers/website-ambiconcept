import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { startLenis, lenis } from '@/lib/lenis'
import { useI18n } from '@/i18n'
import 'lenis/dist/lenis.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  const { t } = useI18n()
  useEffect(() => startLenis(), [])
  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('layout.skipLink')}
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
