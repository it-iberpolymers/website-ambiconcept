import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useHeroSlides } from '@/hooks/useHeroSlides'

export default function Hero() {
  const { slides, loading } = useHeroSlides()
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (slides.length <= 1) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 5000)
  }, [slides.length])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  function go(idx: number) {
    setCurrent(idx)
    startTimer()
  }

  function prev() { go((current - 1 + slides.length) % slides.length) }
  function next() { go((current + 1) % slides.length) }

  if (loading || slides.length === 0) return null

  const slide = slides[current]

  return (
    <section aria-label="Destaque principal" className="relative h-screen overflow-hidden bg-[#303f49]">

      {/* Slides — cross-fade */}
      <div className="absolute inset-0">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            aria-hidden={idx !== current ? 'true' : undefined}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {s.image_url && (
              <img src={s.image_url} alt="" aria-hidden="true" className="w-full h-full object-cover" />
            )}
          </div>
        ))}
        {/* gradiente lateral — mais escuro à esquerda onde está o texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/42 to-black/8 pointer-events-none" />
        {/* gradiente base — ancora o texto no fundo */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
      </div>

      {/* Conteúdo */}
      <div className="relative h-full flex flex-col">
        <div className="flex-1 flex flex-col items-start justify-end px-5 md:px-[64px] pb-[80px] pt-[90px]">
          <h1 key={slide.id + '-title'} className="text-[48px] md:text-[72px] lg:text-[90px] font-light italic text-white/95 leading-[1.08] max-w-[760px] animate-fade-in">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p key={slide.id + '-sub'} className="mt-5 text-white/70 text-[16px] md:text-[18px] font-normal max-w-[520px] leading-relaxed animate-fade-in">
              {slide.subtitle}
            </p>
          )}
          {slide.cta_label && slide.cta_url && (
            <div className="mt-8 flex gap-4 animate-fade-in">
              <Link
                to={slide.cta_url}
                className="btn-primary"
              >
                {slide.cta_label}
              </Link>
              <Link
                to="/contactos"
                className="btn-ghost"
              >
                Contactar
              </Link>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 left-1/2 animate-bounce-y pointer-events-none" aria-hidden="true">
          <svg className="h-6 w-6 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {slides.length > 1 && (
          <>
            {/* Seta esquerda */}
            <button
              type="button"
              onClick={prev}
              className="absolute left-5 top-1/2 -translate-y-1/2 p-3 bg-white/15 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-colors"
              aria-label="Slide anterior"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            {/* Seta direita */}
            <button
              type="button"
              onClick={next}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-3 bg-white/15 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-colors"
              aria-label="Próximo slide"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => go(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === current ? 'bg-white w-6' : 'bg-white/45 w-2 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
