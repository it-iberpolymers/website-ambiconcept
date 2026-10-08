import ContactSection from '@/components/sections/ContactSection'
import PageSeo from '@/components/seo/PageSeo'
import { useI18n } from '@/i18n'
import '@/styles/page-shell.css'

export default function Contacts() {
  const { t } = useI18n()
  return (
    <div className="ps-page">
      <PageSeo
        title={t('contacts.seo.title')}
        description={t('contacts.seo.description')}
        path="/contactos"
      />

      {/* Cabeçalho de página — H1 exclusivo desta rota */}
      <div className="ps-hero">
        <div className="max-w-[1140px] mx-auto px-5 relative z-[1]">
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#95d855] mb-3">{t('contacts.eyebrow')}</p>
          <h1 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] text-white leading-none">
            {t('common.contacts')}
          </h1>
          <p className="mt-5 text-[#b4c7b8] max-w-xl text-[15px] leading-relaxed">
            {t('contacts.intro')}
          </p>
        </div>
        <svg className="ps-hero-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60V28C240 -4 480 -4 720 22s480 30 720 4V60z" />
        </svg>
      </div>

      <ContactSection />
    </div>
  )
}
