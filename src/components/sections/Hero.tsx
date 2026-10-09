import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from '@/i18n/router'
import { useHeroSlides } from '@/hooks/useHeroSlides'
import { useI18n } from '@/i18n'
import { HERO_RENDER, slideOwnImage, titleParts } from '@/lib/heroSlide'
import '@/styles/home-premium.css'


// destaca a expressão (ex.: "sua cidade") no título, como na proposta aprovada; sem a expressão, o título fica como está
// o admin marca as partes a destacar com *asteriscos* e escolhe a cor
function Title({ text, phrase, color }: { text: string; phrase: string; color?: string }) {
  if (text.includes('*')) {
    return <>{titleParts(text).map((p, i) => (p.highlight ? <em key={i} style={color ? { color } : undefined}>{p.text}</em> : p.text))}</>
  }
  if (!phrase) return <>{text}</>
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const lower = phrase.toLowerCase()
  return <>{text.split(new RegExp(`(${escaped})`, 'i')).map((part, i) => (part.toLowerCase() === lower ? <em key={i}>{part}</em> : part))}</>
}

export default function Hero() {
  const { t } = useI18n()
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
  const slideImage = slideOwnImage(slide)

  return (
    <section aria-label={t('home.hero.label')} className="hp-hero">
      <div className="hp-hero-inner">
        <div className="hp-hero-copy">
          <p className="hp-label hp-hero-eyebrow">{t('home.hero.eyebrow')}</p>
          <h1 key={slide.id + '-title'} className="hp-hero-title animate-fade-in">
            <Title text={slide.title} phrase={t('home.hero.highlight')} color={slide.highlight_color} />
          </h1>
          {slide.subtitle && (
            <p key={slide.id + '-sub'} className="hp-hero-sub animate-fade-in">{slide.subtitle}</p>
          )}
          <div className="hp-hero-cta animate-fade-in">
            {slide.cta_label && slide.cta_url && (
              <Link to={slide.cta_url} className="btn-primary">{slide.cta_label}</Link>
            )}
            <Link to="/contactos" className="btn-ghost">{t('home.hero.talkToTeam')}</Link>
          </div>
          {slides.length > 1 && (
            <div className="hp-hero-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => go(idx)}
                  aria-label={t('home.hero.slide', { n: idx + 1 })}
                  className={`hp-hero-dot${idx === current ? ' is-active' : ''}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className={`hp-hero-art${slideImage ? ' has-photo' : ''}`} aria-hidden="true">
          {slideImage
            ? <img key={slide.id} src={slideImage} alt="" className="hp-hero-photo animate-fade-in" />
            : <img src={HERO_RENDER} alt="" />}
          {/* etiquetas e círculos são do render do AMBI 2.7; com a imagem de outro slide não fazem sentido */}
          {!slideImage && (
            <>
              <span className="hp-hero-tag hp-hero-tag--a">{t('home.hero.tag')}</span>
              <span className="hp-hero-tag hp-hero-tag--b">EN 840</span>
            </>
          )}
        </div>
      </div>

      <svg className="hp-hero-curve" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60V28C240 -4 480 -4 720 22s480 30 720 4V60z" />
      </svg>
    </section>
  )
}
