import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useHeroSlides } from '@/hooks/useHeroSlides'
import { storageUrl } from '@/data/local'
import '@/styles/home-premium.css'

const HERO_RENDER = storageUrl('produtos/ambi_2.7/fotos/digital/00_capa.png')

// destaca "sua cidade" no título, como na proposta aprovada
function Title({ text }: { text: string }) {
  return <>{text.split(/(sua cidade)/i).map((part, i) => (/^sua cidade$/i.test(part) ? <em key={i}>{part}</em> : part))}</>
}

export default function Hero() {
  const { slides, loading } = useHeroSlides()
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (slides.length <= 1) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 6000)
  }, [slides.length])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  function go(idx: number) {
    setCurrent(idx)
    startTimer()
  }

  if (loading || slides.length === 0) return null

  const slide = slides[current]

  return (
    <section aria-label="Destaque principal" className="hp-hero">
      <div className="hp-hero-inner">
        <div className="hp-hero-copy">
          <p className="hp-label hp-hero-eyebrow">Waste Solutions</p>
          <h1 key={slide.id + '-title'} className="hp-hero-title animate-fade-in">
            <Title text={slide.title} />
          </h1>
          {slide.subtitle && (
            <p key={slide.id + '-sub'} className="hp-hero-sub animate-fade-in">{slide.subtitle}</p>
          )}
          <div className="hp-hero-cta animate-fade-in">
            {slide.cta_label && slide.cta_url && (
              <Link to={slide.cta_url} className="btn-primary">{slide.cta_label}</Link>
            )}
            <Link to="/contactos" className="btn-ghost">Falar com a equipa</Link>
          </div>
          {slides.length > 1 && (
            <div className="hp-hero-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => go(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`hp-hero-dot${idx === current ? ' is-active' : ''}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="hp-hero-art" aria-hidden="true">
          <img src={HERO_RENDER} alt="" />
          <span className="hp-hero-tag hp-hero-tag--a">2.700 L · PEAD</span>
          <span className="hp-hero-tag hp-hero-tag--b">EN 840</span>
        </div>
      </div>

      <svg className="hp-hero-curve" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60V28C240 -4 480 -4 720 22s480 30 720 4V60z" />
      </svg>
    </section>
  )
}
