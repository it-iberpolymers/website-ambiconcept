import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '@/styles/home-premium.css'


export default function ProductsPremiumSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.hp-reveal')
    if (!els) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('hp-in'); io.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="produtos" className="hp-products" ref={sectionRef} aria-labelledby="products-heading">
      <h2 id="products-heading" className="sr-only">Produtos Ambiconcept — Recolha Seletiva</h2>

      {/* Vidro */}
      <div className="hp-product-panel hp-reveal">
        <div className="hp-product-vis hp-product-vis--photo">
          <img src="/assets/home-vidro.webp" alt="Contentor de recolha seletiva de vidro AMBI 2.7 — contentor de carga vertical para municípios, Portugal" className="hp-product-photo" loading="lazy" />
        </div>
        <div className="hp-product-copy">
          <p className="hp-product-index">01 — Ecopontos · Carga Vertical e Traseira</p>
          <h3 className="hp-product-name">Vidro</h3>
          <p className="hp-product-models">AMBI 2.5 · AMBI 2.7 · AMBI TWO</p>
          <p className="hp-product-desc">
            Contentores de recolha seletiva de vidro para espaço público. Equipados com volteador para preservar a integridade do material recolhido.
          </p>
          <div className="hp-product-specs">
            <div className="hp-spec-row">
              <span className="hp-spec-label">Capacidade</span>
              <span className="hp-spec-value">120 – 2.700 Litros</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">Sistema</span>
              <span className="hp-spec-value">Com volteador</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">Cor</span>
              <span className="hp-spec-value">Verde / RAL personalizado</span>
            </div>
          </div>
          <Link to="/produtos?categoria=carga-vertical" className="hp-product-cta">
            Ver contentores de vidro →
          </Link>
        </div>
      </div>

      {/* Biorresíduos */}
      <div className="hp-product-panel hp-flip hp-reveal">
        <div className="hp-product-vis hp-product-vis--photo">
          <img src="/assets/home-biorresiduos.png" alt="Contentores de biorresíduos AMBI TWO e AMBI FOUR — recolha porta-a-porta e carga traseira para municípios portugueses" className="hp-product-photo" loading="lazy" />
        </div>
        <div className="hp-product-copy">
          <p className="hp-product-index">02 — Porta-a-porta · Carga Traseira · Smart Box</p>
          <h3 className="hp-product-name">Biorresíduos</h3>
          <p className="hp-product-models">Lockey · AMBI TWO · AMBI FOUR · AMBI 1.0</p>
          <p className="hp-product-desc">
            Soluções de recolha de biorresíduos para porta-a-porta e espaço público. Do balde doméstico ao contentor de grande capacidade.
          </p>
          <div className="hp-product-specs">
            <div className="hp-spec-row">
              <span className="hp-spec-label">Capacidade</span>
              <span className="hp-spec-value">5 – 1.100 Litros</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">Sistema</span>
              <span className="hp-spec-value">Porta-a-porta / Carga traseira</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">Material</span>
              <span className="hp-spec-value">PEAD</span>
            </div>
          </div>
          <Link to="/produtos?categoria=porta-a-porta" className="hp-product-cta">
            Ver contentores de biorresíduos →
          </Link>
        </div>
      </div>

      {/* Papeleiras */}
      <div className="hp-product-panel hp-reveal">
        <div className="hp-product-vis hp-product-vis--photo">
          <img src="/assets/home-papeleiras.png" alt="Papeleiras urbanas AMBI URBAN e AMBI BEACH — limpeza urbana para espaço público e zonas balneares, Portugal" className="hp-product-photo" loading="lazy" />
        </div>
        <div className="hp-product-copy">
          <p className="hp-product-index">03 — Limpeza Urbana</p>
          <h3 className="hp-product-name">Papeleiras<br />Urbanas</h3>
          <p className="hp-product-models">AMBI URBAN · AMBI BEACH</p>
          <p className="hp-product-desc">
            Presença urbana integrada. Design que não compete com a cidade — serve-a. Para espaços públicos de alta frequência de uso.
          </p>
          <div className="hp-product-specs">
            <div className="hp-spec-row">
              <span className="hp-spec-label">Capacidade</span>
              <span className="hp-spec-value">80 Litros</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">Fixação</span>
              <span className="hp-spec-value">Poste / Solo</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">Ambiente</span>
              <span className="hp-spec-value">Urbano / Praia</span>
            </div>
          </div>
          <Link to="/produtos?categoria=papeleiras" className="hp-product-cta">
            Ver papeleiras urbanas →
          </Link>
        </div>
      </div>

      {/* Porta-a-porta */}
      <div className="hp-product-panel hp-flip hp-reveal">
        <div className="hp-product-vis hp-product-vis--photo">
          <img src="/assets/home-porta-a-porta.webp" alt="Contentor porta-a-porta AMBI TWO 240L — recolha domiciliária compatível com viatura de carga traseira, Portugal" className="hp-product-photo" loading="lazy" />
        </div>
        <div className="hp-product-copy">
          <p className="hp-product-index">04 — Carga Traseira</p>
          <h3 className="hp-product-name">Porta-a-porta</h3>
          <p className="hp-product-models">AMBI TWO 120L · AMBI TWO 140L · AMBI TWO 240L · AMBI TWO 340L</p>
          <p className="hp-product-desc">
            Contentores de recolha domiciliária concebidos para sistemas porta-a-porta. Compatíveis com frota de carga traseira e adaptáveis a qualquer contexto urbano.
          </p>
          <div className="hp-product-specs">
            <div className="hp-spec-row">
              <span className="hp-spec-label">Capacidade</span>
              <span className="hp-spec-value">120 – 340 Litros</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">Rodas</span>
              <span className="hp-spec-value">2 ou 4</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">Sistema</span>
              <span className="hp-spec-value">Carga traseira</span>
            </div>
          </div>
          <Link to="/produtos?categoria=porta-a-porta" className="hp-product-cta">
            Ver contentores porta-a-porta →
          </Link>
        </div>
      </div>

      {/* Óleos Alimentares Usados */}
      <div className="hp-product-panel hp-reveal">
        <div className="hp-product-vis hp-product-vis--photo">
          <img src="/assets/home-oleos-alimentares.png" alt="Contentor AMBI 1.0 para recolha de óleos alimentares usados — smart box de superfície para espaço público, Portugal" className="hp-product-photo" loading="lazy" />
        </div>
        <div className="hp-product-copy">
          <p className="hp-product-index">05 — Smart Box</p>
          <h3 className="hp-product-name">Óleos<br />Alimentares<br />Usados</h3>
          <p className="hp-product-models">AMBI 1.0</p>
          <p className="hp-product-desc">
            Contentor inteligente para recolha de óleos alimentares usados. Compacto, seguro e preparado para instalação em espaço público ou condomínio.
          </p>
          <div className="hp-product-specs">
            <div className="hp-spec-row">
              <span className="hp-spec-label">Capacidade</span>
              <span className="hp-spec-value">1.000 Litros</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">Instalação</span>
              <span className="hp-spec-value">Superfície</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">Acesso</span>
              <span className="hp-spec-value">Abertura controlada</span>
            </div>
          </div>
          <Link to="/produtos?categoria=smart-box" className="hp-product-cta">
            Ver contentor de óleos alimentares →
          </Link>
        </div>
      </div>

    </section>
  )
}
