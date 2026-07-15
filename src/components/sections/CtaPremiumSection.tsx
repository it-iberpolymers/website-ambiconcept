import { Link } from 'react-router-dom'
import '@/styles/home-premium.css'

export default function CtaPremiumSection() {
  return (
    <section id="cta-principal" className="hp-cta" aria-labelledby="cta-heading">
      <div>
        <h2 id="cta-heading" className="hp-cta-title">
          Apresente o seu projeto. Os nossos especialistas encontram a solução certa.
        </h2>
        <p className="hp-cta-sub">
          Partilhe o seu briefing connosco. Analisamos os requisitos do seu município ou operação RSU e desenvolvemos a solução mais adequada.
        </p>
      </div>
      <Link to="/contactos" className="btn-dark">
        Falar com um Especialista
      </Link>
    </section>
  )
}
