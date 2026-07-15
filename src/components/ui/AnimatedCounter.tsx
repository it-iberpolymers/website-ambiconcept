import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
  label: string
  counterClassName?: string
  labelClassName?: string
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function AnimatedCounter({
  target,
  duration = 2000,
  prefix = '',
  suffix = '',
  label,
  counterClassName = 'text-brand-500',
  labelClassName = 'text-ink-600',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const finalRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || target === 0) { setCount(target); return }
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(easeOutCubic(progress) * target))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else if (finalRef.current) {
        finalRef.current.textContent = `${prefix}${target.toLocaleString('pt-PT')}${suffix}`
      }
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration, prefix, suffix])

  return (
    <div ref={containerRef} className="text-center">
      {/* Número visual — aria-hidden para não anunciar cada frame */}
      <p className={`text-5xl font-black tabular-nums ${counterClassName}`} aria-hidden="true">
        {prefix}{count.toLocaleString('pt-PT')}{suffix}
      </p>
      {/* Valor final anunciado apenas uma vez ao terminar a animação */}
      <span ref={finalRef} className="sr-only" aria-live="polite" aria-atomic="true" />
      <p className={`mt-2 text-sm font-medium uppercase tracking-wider ${labelClassName}`}>{label}</p>
    </div>
  )
}
