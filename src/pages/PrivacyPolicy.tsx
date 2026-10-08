import { Link } from '@/i18n/router'
import { useI18n } from '@/i18n'
import PageSeo from '@/components/seo/PageSeo'
import '@/styles/page-shell.css'

export default function PrivacyPolicy() {
  const { t } = useI18n()
  return (
    <div className="ps-page">
      <PageSeo title={t('privacy.seo.title')} description={t('privacy.seo.description')} path="/politica-de-privacidade" />

      <div className="ps-hero">
        <div className="max-w-[800px] mx-auto px-5 relative z-[1]">
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#95d855] mb-3">{t('privacy.eyebrow')}</p>
          <h1 className="text-[34px] md:text-[48px] font-bold tracking-[-0.03em] text-white leading-tight">
            {t('privacy.title')}
          </h1>
        </div>
        <svg className="ps-hero-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60V28C240 -4 480 -4 720 22s480 30 720 4V60z" />
        </svg>
      </div>

      <div className="max-w-[800px] mx-auto px-5 pt-[30px] pb-[100px]">
       <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_24px_50px_-38px_rgba(14,26,16,0.4)]">
        <div className="space-y-8 text-[#303f49]">

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">{t('privacy.s1.title')}</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              {t('privacy.s1.before')}<strong>{t('privacy.s1.bold')}</strong>{t('privacy.s1.after')}
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">{t('privacy.s2.title')}</h2>
            <p className="leading-relaxed text-[#303f49]/75 mb-3">
              {t('privacy.s2.intro')}
            </p>
            <ul className="list-disc list-inside space-y-1 text-[#303f49]/75">
              <li>{t('privacy.s2.item.0')}</li>
              <li>{t('privacy.s2.item.1')}</li>
              <li>{t('privacy.s2.item.2')}</li>
              <li>{t('privacy.s2.item.3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">{t('privacy.s3.title')}</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              {t('privacy.s3.text')}
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">{t('privacy.s4.title')}</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              {t('privacy.s4.text')}
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">{t('privacy.s5.title')}</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              {t('privacy.s5.before')}{' '}
              <Link to="/contactos" className="text-[color:var(--green-text)] hover:underline">{t('common.contacts')}</Link>{t('privacy.s5.after')}
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">{t('privacy.s6.title')}</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              {t('privacy.s6.before')}{' '}
              <Link to="/contactos" className="text-[color:var(--green-text)] hover:underline">{t('common.contacts')}</Link>{t('privacy.s6.after')}
            </p>
          </section>

        </div>

        <div className="mt-[60px] pt-[30px] border-t border-[#eaeaea]">
          <Link
            to="/"
            className="btn-outline"
          >
            {t('common.backHome')}
          </Link>
        </div>
       </div>
      </div>

    </div>
  )
}
