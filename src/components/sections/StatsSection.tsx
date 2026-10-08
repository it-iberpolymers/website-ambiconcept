import { useEffect, useRef, useState } from 'react'
import { useStats } from '@/hooks/useStats'
import { useI18n } from '@/i18n'
import '@/styles/home-premium.css'

const MUNICIPALITIES = [
  'Lisboa', 'Porto', 'Braga', 'Coimbra', 'Aveiro', 'Faro', 'Évora', 'Leiria',
  'Setúbal', 'Viseu', 'Guarda', 'Beja', 'Santarém', 'Castelo Branco', 'Portalegre',
  'Viana do Castelo', 'Vila Real', 'Bragança', 'Sintra', 'Cascais', 'Almada',
  'Oeiras', 'Loures', 'Odivelas', 'Amadora', 'Seixal', 'Barreiro', 'Moita',
  'Matosinhos', 'Gondomar', 'Vila Nova de Gaia', 'Guimarães', 'Barcelos', 'Maia',
  'Valongo', 'Palmela', 'Montijo', 'Alcochete', 'Funchal', 'Ponta Delgada',
]

function useCountUp(target: number, shouldStart: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!shouldStart) return
    const dur = 2000
    const start = performance.now()
    function step(now: number) {
      const t = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - t, 4)
      setValue(Math.round(ease * target))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, shouldStart])
  return value
}

export default function StatsSection() {
  const { t, locale } = useI18n()
  const statsRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const { stats } = useStats()

  const containersTarget = stats.find(s => s.key === 'containers_installed')?.value ?? 1200
  const municipalitiesTarget = stats.find(s => s.key === 'municipalities_count')?.value ?? 100

  const containerCount = useCountUp(containersTarget, started)
  const munCount = useCountUp(municipalitiesTarget, started)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); io.disconnect() } },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const inner = marqueeRef.current
    if (!inner) return
    const track = inner.parentElement!
    const origItems = [...inner.children] as Element[]
    function fill() {
      while (inner!.scrollWidth < track.offsetWidth * 3) {
        origItems.forEach(el => inner!.appendChild(el.cloneNode(true)))
      }
    }
    fill()
    let x = 0
    let paused = false
    const speed = 0.6
    track.addEventListener('mouseenter', () => { paused = true })
    track.addEventListener('mouseleave', () => { paused = false })
    let rafId: number
    function tick() {
      if (!paused) {
        x -= speed
        const oneSet = inner!.scrollWidth / Math.ceil(inner!.children.length / origItems.length)
        if (x <= -oneSet) x += oneSet
        inner!.style.transform = `translateX(${x}px)`
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section
      id="numeros"
      className="hp-stats"
      ref={statsRef}
      aria-labelledby="stats-heading"
    >
      <div className="hp-stats-overlay" aria-hidden="true" />

      <div className="hp-stats-inner">
        <div className="hp-stats-head">
          <div className="hp-label hp-label--centered">{t('home.stats.eyebrow')}</div>
          <h2 id="stats-heading" className="hp-stats-title">
            {t('home.stats.title', { containers: containersTarget.toLocaleString(locale), municipalities: municipalitiesTarget })}
          </h2>
        </div>

        <div className="hp-stats-grid">
          <div className="hp-stat-block">
            <div className="hp-stat-inner">
              <div className="hp-stat-num">
                <span className="hp-stat-prefix">+</span>
                <span>{containerCount.toLocaleString(locale)}</span>
              </div>
              <div className="hp-stat-label">{t('home.stats.containers')}</div>
            </div>
          </div>
          <div className="hp-stat-divider" aria-hidden="true" />
          <div className="hp-stat-block">
            <div className="hp-stat-inner">
              <div className="hp-stat-num">
                <span className="hp-stat-prefix">+</span>
                <span>{munCount.toLocaleString(locale)}</span>
              </div>
              <div className="hp-stat-label">{t('home.stats.municipalities')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hp-marquee-track">
        <div className="hp-marquee-inner" ref={marqueeRef} aria-hidden="true">
          {MUNICIPALITIES.map(name => (
            <span key={name} className="hp-marquee-item">
              {name}<span className="hp-marquee-dot"> · </span>
            </span>
          ))}
        </div>
        <ul className="sr-only" aria-label={t('home.stats.municipalitiesList')}>
          {MUNICIPALITIES.map(name => <li key={name}>{name}</li>)}
        </ul>
      </div>
    </section>
  )
}
