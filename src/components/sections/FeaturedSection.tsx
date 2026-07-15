import { Link } from 'react-router-dom'
import { useFeaturedBanner } from '@/hooks/useFeaturedBanner'

export default function FeaturedSection() {
  const { banner, loading } = useFeaturedBanner()

  if (loading) return null

  const isExternal = banner.cta_url.startsWith('http')

  return (
    <section
      aria-label={banner.title}
      className="featured-section relative min-h-[480px] flex items-center"
      style={{ backgroundImage: `url(${banner.image_url})` }}
    >
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(278deg, rgba(0,0,0,0) 38%, rgba(0,0,0,${banner.overlay_opacity}) 100%)` }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1140px] mx-auto px-5 py-10 w-full">
        <div className="max-w-[500px]">
          {banner.subtitle && (
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7ab929] mb-3">
              {banner.subtitle}
            </p>
          )}
          <h2 className="text-[42px] font-bold uppercase text-white leading-tight mb-[15px]">
            {banner.title}
          </h2>
          <p className="text-white/80 text-[15px] leading-relaxed mb-8">
            {banner.description}
          </p>
          {isExternal ? (
            <a
              href={banner.cta_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {banner.cta_label}
            </a>
          ) : (
            <Link
              to={banner.cta_url}
              className="btn-primary"
            >
              {banner.cta_label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
