import { useState, useEffect } from 'react'
import { Link } from '@/i18n/router'
import { useI18n } from '@/i18n'
import { useBanners } from '@/hooks/useFeaturedBanner'
import type { FeaturedBanner } from '@/types'
import '@/styles/home-premium.css'

// Banners em destaque geridos no admin: os ativos alternam sozinhos, como o slider do topo.
export default function FeaturedSection() {
  const { t } = useI18n()
  const { banners, loading } = useBanners({ onlyActive: true })
  const [current, setCurrent] = useState(0)
  const count = banners.length

  useEffect(() => {
    if (count <= 1) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % count), 6000)
    return () => clearInterval(timer)
  }, [count, current])

  if (loading || count === 0) return null

  const active = current < count ? current : 0

  return (
    <section aria-label={banners[active].title} className="hp-banner">
      <div className="hp-banner-stack">
        {banners.map((banner, idx) => (
          <Banner key={banner.id} banner={banner} active={idx === active} />
        ))}
        {count > 1 && (
          <div className="hp-banner-dots">
            {banners.map((banner, idx) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={t('home.hero.slide', { n: idx + 1 })}
                className={`hp-hero-dot${idx === active ? ' is-active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Banner({ banner, active }: { banner: FeaturedBanner; active: boolean }) {
  const isExternal = banner.cta_url.startsWith('http')
  const overlay = Math.min(1, banner.overlay_opacity + 0.3)

  return (
    <div
      className={`hp-banner-box${active ? ' is-active' : ''}`}
      aria-hidden={!active}
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(14,26,16,${overlay}) 0%, rgba(14,26,16,${overlay / 3}) 100%), url(${banner.image_url})`,
      }}
    >
      <div className="hp-banner-copy">
        {banner.subtitle && <p className="hp-banner-eyebrow">{banner.subtitle}</p>}
        <h2>{banner.title}</h2>
        <p className="hp-banner-text">{banner.description}</p>
        {isExternal ? (
          <a href={banner.cta_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {banner.cta_label}
          </a>
        ) : (
          <Link to={banner.cta_url} className="btn-primary">
            {banner.cta_label}
          </Link>
        )}
      </div>
    </div>
  )
}
