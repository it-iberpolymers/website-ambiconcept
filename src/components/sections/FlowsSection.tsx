import { useEffect, useRef } from 'react'
import { Link } from '@/i18n/router'
import { useI18n } from '@/i18n'
import '@/styles/home-premium.css'

// cor por fluxo — as mesmas cores que as pessoas já reconhecem na rua
const FLOW_CARDS = [
  { slug: 'vidro', models: 'AMBI 2.5 · 2.7 · TWO', mod: 'vidro' },
  { slug: 'biorresiduos', models: 'Lockey · TWO · FOUR · 1.0', mod: 'bio' },
  { slug: 'limpeza-urbana', models: 'AMBI URBAN · BEACH', mod: 'urbana' },
  { slug: 'porta-a-porta', models: 'AMBI TWO 120 – 340 L', mod: 'ptp' },
  { slug: 'oleos-alimentares-usados', models: 'AMBI 1.0', mod: 'oleos' },
]

const WAVE = 'M0 60V28C240 -4 480 -4 720 22s480 30 720 4V60z'

export default function FlowsSection() {
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
    <section className="hp-flows" ref={sectionRef} aria-labelledby="flows-heading">
      {/* ondas nas duas arestas: cor da secção de cima e da de baixo */}
      <svg className="hp-wave hp-wave--top" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d={WAVE} /></svg>
      <svg className="hp-wave hp-wave--bottom" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d={WAVE} /></svg>
      <div className="hp-flows-inner">
        <div className="hp-reveal">
          <p className="hp-label">{t('home.flows.eyebrow')}</p>
          <h2 id="flows-heading" className="hp-flows-title">{t('home.flows.title')}</h2>
          <p className="hp-flows-body">{t('home.flows.body')}</p>
        </div>
        <div className="hp-flows-grid">
          {FLOW_CARDS.map((f, i) => (
            <Link
              key={f.slug}
              to={`/fluxos/${f.slug}`}
              className={`hp-flow hp-flow--${f.mod} hp-reveal`}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <span className="hp-flow-kicker">{t('home.flows.kicker')}</span>
              <span className="hp-flow-name">{t(`home.flows.card.${f.slug}`)}</span>
              <span className="hp-flow-models">{f.models}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
