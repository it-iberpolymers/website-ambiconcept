import { Link } from '@/i18n/router'
import { useI18n } from '@/i18n'
import '@/styles/home-premium.css'

export default function CtaPremiumSection() {
  const { t } = useI18n()
  return (
    <section id="cta-principal" className="hp-cta" aria-labelledby="cta-heading">
      <div>
        <h2 id="cta-heading" className="hp-cta-title">
          {t('home.cta.title')}
        </h2>
        <p className="hp-cta-sub">
          {t('home.cta.sub')}
        </p>
      </div>
      <Link to="/contactos" className="btn-dark">
        {t('home.cta.button')}
      </Link>
    </section>
  )
}
