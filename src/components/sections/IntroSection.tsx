import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '@/styles/home-premium.css'

export default function IntroSection() {
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
        <div className="hp-intro-aside hp-reveal" />
        <div className="hp-reveal" style={{ transitionDelay: '.1s' }}>
          <p className="hp-label">Equipamento de Precisão</p>
          <h2 className="hp-intro-title">
            Um produto de recolha seletiva não é um utensílio. É mobiliário urbano.
          </h2>
          <p className="hp-intro-body">
            Cada contentor Ambiconcept é desenvolvido para resistir ao uso intensivo, às condições climáticas e ao tempo — mantendo uma presença digna no espaço público. Engenharia pensada para a cidade, para o operador e para o ambiente.
          </p>
          <Link to="/produtos" className="btn-primary">
            Ver Produtos
          </Link>
        </div>
      </div>
    </section>
  )
}
