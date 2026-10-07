import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '@/styles/home-premium.css'

export default function AudiencesSection() {
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
          <p className="hp-label" style={{ color: '#95d855' }}>Para quem serve</p>
          <h2 className="hp-aud-title">Duas realidades. Uma solução.</h2>
          <p className="hp-aud-body">
            A Ambiconcept serve decisores públicos e operadores privados de resíduos — com produtos e serviço adaptados a cada contexto.
          </p>
        </div>
        <div className="hp-aud-grid">

          <div className="hp-aud-panel hp-reveal">
            <p className="hp-aud-panel-eyebrow">Município</p>
            <h3 className="hp-aud-panel-title">
              A infraestrutura pública que os seus munícipes merecem.
            </h3>
            <p className="hp-aud-panel-desc">
              Soluções de recolha seletiva que valorizam o espaço público e cumprem as metas de reciclagem municipais.
            </p>
            <ul>
              <li>Contentores de carga vertical e traseira certificados</li>
              <li>Equipamento de limpeza urbana para espaços de alta densidade</li>
              <li>Equipamento personalizável em cor RAL</li>
              <li>Suporte técnico e pós-venda em Portugal</li>
            </ul>
            <Link to="/contactos" className="hp-aud-cta">
              Falar com um especialista →
            </Link>
          </div>

          <div className="hp-aud-panel hp-reveal" style={{ transitionDelay: '.1s' }}>
            <p className="hp-aud-panel-eyebrow">Operador RSU</p>
            <h3 className="hp-aud-panel-title">
              Equipamento concebido para a realidade operacional.
            </h3>
            <p className="hp-aud-panel-desc">
              Contentores de alto volume projetados para reduzir paragens, facilitar a recolha e durar mais ciclos de vida.
            </p>
            <ul>
              <li>AMBI FOUR até 1.100 Litros para recolha de grande volume</li>
              <li>Compatibilidade com sistemas de carga traseira e vertical</li>
              <li>Smart Box AMBI 1.0 para monitorização e óleos</li>
              <li>Baldes domésticos Lockey para porta-a-porta</li>
            </ul>
            <Link to="/contactos" className="hp-aud-cta">
              Falar com um especialista →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
