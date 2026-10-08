import { Link, useNavigate } from '@/i18n/router'
import { useI18n } from '@/i18n'
import './WasteCollectionSection.css'

const solutions = [
  { slug: 'vidro',             image: '/assets/home-vidro.jpg',             link: '/produtos?categoria=carga-vertical' },
  { slug: 'biorresiduos',      image: '/assets/home-biorresiduos.png',       link: '/fluxos/porta-a-porta'  },
  { slug: 'limpeza-urbana',     image: '/assets/home-papeleiras.png',         link: '/produtos?categoria=limpeza-urbana'     },
  { slug: 'porta-a-porta',     image: '/assets/home-porta-a-porta.webp',     link: '/fluxos/porta-a-porta'  },
  { slug: 'oleos-alimentares', image: '/assets/fluxo-oleos-alimentares.png', link: '/produtos?categoria=smart-box'      },
]

export default function WasteCollectionSection() {
  const { t } = useI18n()
  return (
    <>
      {/* Texto + cards — section única "solutions" */}
      <section id="solutions" aria-labelledby="solutions-heading" className="bg-white pt-[80px]">
        <div className="max-w-[1140px] mx-auto px-5 pb-[60px]">
          <h2
            id="solutions-heading"
            className="text-[40px] md:text-[45px] font-semibold uppercase text-[#303f49] leading-none pb-[5px] m-0"
          >
            {t('home.waste.title')}
          </h2>
          <p className="text-[28px] md:text-[31px] font-normal text-[#303f49] leading-none pb-[20px] m-0">
            {t('home.waste.subtitle')}
          </p>
          <p className="text-[15px] text-[#303f49]/75 leading-relaxed m-0 max-w-[760px]">
            {t('home.waste.body')}
          </p>
        </div>

        <div className="max-w-[1140px] mx-auto px-5 pb-[80px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px] mb-[10px]">
            {solutions.slice(0, 3).map((sol) => (
              <SolutionCard key={sol.slug} {...sol} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
            {solutions.slice(3).map((sol) => (
              <SolutionCard key={sol.slug} {...sol} />
            ))}
          </div>
        </div>
      </section>

    </>
  )
}

function SolutionCard({
  slug,
  image,
  link,
}: {
  slug: string
  image: string
  link: string
}) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const title = t(`home.waste.sol.${slug}`)
  const label = t('home.waste.cardLabel', { title })

  return (
    <div
      className="solution-card group relative overflow-hidden cursor-pointer"
      onClick={() => navigate(link)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(link) }}
      aria-label={label}
    >
      {/* Imagem */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      {/* Conteúdo — topo esquerdo */}
      <div className="relative z-10 p-6 flex flex-col items-start gap-3">
        <h3 className="text-[26px] md:text-[30px] font-bold uppercase text-white leading-tight drop-shadow-md">
          {title}
        </h3>
        <Link
          to={link}
          onClick={(e) => e.stopPropagation()}
          className="btn-outline"
          aria-label={label}
        >
          {t('home.waste.cardCta')}
        </Link>
      </div>
    </div>
  )
}
