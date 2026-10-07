import { useMunicipalities } from '@/hooks/useStats'

export default function MunicipalitiesSection() {
  const { municipalities, loading } = useMunicipalities()

  if (loading || municipalities.length === 0) return null

  // Duplicar para o loop infinito funcionar sem saltos
  const items = [...municipalities, ...municipalities]

  return (
    <section
      aria-label="Municípios aderentes"
      className="municipalities-marquee-section overflow-hidden"
    >
      <div
        className="municipalities-marquee flex items-center gap-16 whitespace-nowrap py-[14px]"
        aria-hidden="true"
      >
        {items.map((m, i) => (
          <span
            key={`${m.id}-${i}`}
            className="text-[15px] font-normal text-white/80 tracking-[0.05em] lowercase flex-shrink-0"
          >
            {m.name}
            <span className="ml-16 text-white/75">·</span>
          </span>
        ))}
      </div>

      {/* Lista acessível oculta visualmente */}
      <ul className="sr-only">
        {municipalities.map((m) => (
          <li key={m.id}>{m.name}</li>
        ))}
      </ul>
    </section>
  )
}
