import { Fragment, useEffect, useRef } from 'react'
import { Link } from '@/i18n/router'
import { useI18n } from '@/i18n'
import '@/styles/home-premium.css'

// "\n" na tradução = quebra de linha (<br />) no título do painel
function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>
      ))}
    </>
  )
}

export default function ProductsPremiumSection() {
  const { t } = useI18n()
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
      <h2 id="products-heading" className="sr-only">{t('home.products.heading')}</h2>

      {/* Vidro */}
      <div className="hp-product-panel hp-reveal">
        <div className="hp-product-vis hp-product-vis--photo">
          <img src="/assets/home-vidro.jpg" alt={t('home.products.vidro.alt')} className="hp-product-photo" loading="lazy" />
        </div>
        <div className="hp-product-copy">
          <p className="hp-product-index">{t('home.products.vidro.index')}</p>
          <h3 className="hp-product-name">{t('home.products.vidro.name')}</h3>
          <p className="hp-product-models">AMBI 2.5 · AMBI 2.7 · AMBI TWO</p>
          <p className="hp-product-desc">
            {t('home.products.vidro.desc')}
          </p>
          <div className="hp-product-specs">
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.capacity')}</span>
              <span className="hp-spec-value">{t('home.products.vidro.capacity')}</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.system')}</span>
              <span className="hp-spec-value">{t('home.products.vidro.system')}</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.color')}</span>
              <span className="hp-spec-value">{t('home.products.vidro.color')}</span>
            </div>
          </div>
          <Link to="/fluxos/vidro" className="hp-product-cta">
            {t('home.products.vidro.cta')}
          </Link>
        </div>
      </div>

      {/* Biorresíduos */}
      <div className="hp-product-panel hp-flip hp-reveal">
        <div className="hp-product-vis hp-product-vis--photo">
          <img src="/assets/home-biorresiduos.png" alt={t('home.products.bio.alt')} className="hp-product-photo" loading="lazy" />
        </div>
        <div className="hp-product-copy">
          <p className="hp-product-index">{t('home.products.bio.index')}</p>
          <h3 className="hp-product-name">{t('home.products.bio.name')}</h3>
          <p className="hp-product-models">Lockey · AMBI TWO · AMBI FOUR · AMBI 1.0</p>
          <p className="hp-product-desc">
            {t('home.products.bio.desc')}
          </p>
          <div className="hp-product-specs">
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.capacity')}</span>
              <span className="hp-spec-value">{t('home.products.bio.capacity')}</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.system')}</span>
              <span className="hp-spec-value">{t('home.products.bio.system')}</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.material')}</span>
              <span className="hp-spec-value">{t('home.products.bio.material')}</span>
            </div>
          </div>
          <Link to="/fluxos/biorresiduos" className="hp-product-cta">
            {t('home.products.bio.cta')}
          </Link>
        </div>
      </div>

      {/* Limpeza Urbana */}
      <div className="hp-product-panel hp-reveal">
        <div className="hp-product-vis hp-product-vis--photo">
          <img src="/assets/home-papeleiras.png" alt={t('home.products.urbana.alt')} className="hp-product-photo" loading="lazy" />
        </div>
        <div className="hp-product-copy">
          <p className="hp-product-index">{t('home.products.urbana.index')}</p>
          <h3 className="hp-product-name"><Lines text={t('home.products.urbana.name')} /></h3>
          <p className="hp-product-models">AMBI URBAN · AMBI BEACH</p>
          <p className="hp-product-desc">
            {t('home.products.urbana.desc')}
          </p>
          <div className="hp-product-specs">
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.capacity')}</span>
              <span className="hp-spec-value">{t('home.products.urbana.capacity')}</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.fixing')}</span>
              <span className="hp-spec-value">{t('home.products.urbana.fixing')}</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.environment')}</span>
              <span className="hp-spec-value">{t('home.products.urbana.environment')}</span>
            </div>
          </div>
          <Link to="/fluxos/limpeza-urbana" className="hp-product-cta">
            {t('home.products.urbana.cta')}
          </Link>
        </div>
      </div>

      {/* Porta-a-porta */}
      <div className="hp-product-panel hp-flip hp-reveal">
        <div className="hp-product-vis hp-product-vis--photo">
          <img src="/assets/home-porta-a-porta.webp" alt={t('home.products.ptp.alt')} className="hp-product-photo" loading="lazy" />
        </div>
        <div className="hp-product-copy">
          <p className="hp-product-index">{t('home.products.ptp.index')}</p>
          <h3 className="hp-product-name">{t('home.products.ptp.name')}</h3>
          <p className="hp-product-models">AMBI TWO 120L · AMBI TWO 140L · AMBI TWO 240L · AMBI TWO 340L</p>
          <p className="hp-product-desc">
            {t('home.products.ptp.desc')}
          </p>
          <div className="hp-product-specs">
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.capacity')}</span>
              <span className="hp-spec-value">{t('home.products.ptp.capacity')}</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.wheels')}</span>
              <span className="hp-spec-value">{t('home.products.ptp.wheels')}</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.system')}</span>
              <span className="hp-spec-value">{t('home.products.ptp.system')}</span>
            </div>
          </div>
          <Link to="/fluxos/porta-a-porta" className="hp-product-cta">
            {t('home.products.ptp.cta')}
          </Link>
        </div>
      </div>

      {/* Óleos Alimentares Usados */}
      <div className="hp-product-panel hp-reveal">
        <div className="hp-product-vis hp-product-vis--photo">
          <img src="/assets/fluxo-oleos-alimentares.png" alt={t('home.products.oleos.alt')} className="hp-product-photo" loading="lazy" />
        </div>
        <div className="hp-product-copy">
          <p className="hp-product-index">{t('home.products.oleos.index')}</p>
          <h3 className="hp-product-name"><Lines text={t('home.products.oleos.name')} /></h3>
          <p className="hp-product-models">AMBI 1.0</p>
          <p className="hp-product-desc">
            {t('home.products.oleos.desc')}
          </p>
          <div className="hp-product-specs">
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.capacity')}</span>
              <span className="hp-spec-value">{t('home.products.oleos.capacity')}</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.installation')}</span>
              <span className="hp-spec-value">{t('home.products.oleos.installation')}</span>
            </div>
            <div className="hp-spec-row">
              <span className="hp-spec-label">{t('home.products.spec.access')}</span>
              <span className="hp-spec-value">{t('home.products.oleos.access')}</span>
            </div>
          </div>
          <Link to="/fluxos/oleos-alimentares-usados" className="hp-product-cta">
            {t('home.products.oleos.cta')}
          </Link>
        </div>
      </div>

    </section>
  )
}
