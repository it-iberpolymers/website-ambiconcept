import { useEffect, useRef } from 'react'
import { Link } from '@/i18n/router'
import { useI18n } from '@/i18n'
import '@/styles/home-premium.css'

export default function AudiencesSection() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.hp-reveal')
    if (!els) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('hp-in'); io.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="hp-audiences" ref={sectionRef}>
      <div className="hp-aud-inner">
        <div className="hp-aud-head hp-reveal">
          <p className="hp-label" style={{ color: '#95d855' }}>{t('home.audiences.eyebrow')}</p>
          <h2 className="hp-aud-title">{t('home.audiences.title')}</h2>
          <p className="hp-aud-body">
            {t('home.audiences.body')}
          </p>
        </div>
        <div className="hp-aud-grid">

          <div className="hp-aud-panel hp-reveal">
            <p className="hp-aud-panel-eyebrow">{t('home.audiences.mun.eyebrow')}</p>
            <h3 className="hp-aud-panel-title">
              {t('home.audiences.mun.title')}
            </h3>
            <p className="hp-aud-panel-desc">
              {t('home.audiences.mun.desc')}
            </p>
            <ul>
              <li>{t('home.audiences.mun.item.0')}</li>
              <li>{t('home.audiences.mun.item.1')}</li>
              <li>{t('home.audiences.mun.item.2')}</li>
              <li>{t('home.audiences.mun.item.3')}</li>
            </ul>
            <Link to="/contactos" className="hp-aud-cta">
              {t('common.talkToSpecialist')}
            </Link>
          </div>

          <div className="hp-aud-panel hp-reveal" style={{ transitionDelay: '.1s' }}>
            <p className="hp-aud-panel-eyebrow">{t('home.audiences.op.eyebrow')}</p>
            <h3 className="hp-aud-panel-title">
              {t('home.audiences.op.title')}
            </h3>
            <p className="hp-aud-panel-desc">
              {t('home.audiences.op.desc')}
            </p>
            <ul>
              <li>{t('home.audiences.op.item.0')}</li>
              <li>{t('home.audiences.op.item.1')}</li>
              <li>{t('home.audiences.op.item.2')}</li>
              <li>{t('home.audiences.op.item.3')}</li>
            </ul>
            <Link to="/contactos" className="hp-aud-cta">
              {t('common.talkToSpecialist')}
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
