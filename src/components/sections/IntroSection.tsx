import { useEffect, useRef } from 'react'
import { Link } from '@/i18n/router'
import { useI18n } from '@/i18n'
import { storageUrl } from '@/data/local'
import '@/styles/home-premium.css'

export default function IntroSection() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.hp-reveal')
    if (!els) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('hp-in'); io.unobserve(e.target) } }),
      { threshold: 0.15 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="hp-intro" ref={sectionRef}>
      <div className="hp-intro-inner">
        <div className="hp-intro-aside hp-reveal">
          <img src={storageUrl('produtos/ambi_2.7/fotos/digital/00_capa.png')} alt={t('home.intro.imageAlt')} loading="lazy" />
        </div>
        <div className="hp-reveal" style={{ transitionDelay: '.1s' }}>
          <p className="hp-label">{t('home.intro.eyebrow')}</p>
          <h2 className="hp-intro-title">
            {t('home.intro.title')}
          </h2>
          <p className="hp-intro-body">
            {t('home.intro.body')}
          </p>
          <Link to="/produtos" className="btn-primary">
            {t('common.viewProducts')}
          </Link>
        </div>
      </div>
    </section>
  )
}
