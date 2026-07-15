import ContactSection from '@/components/sections/ContactSection'
import PageSeo from '@/components/seo/PageSeo'

export default function Contacts() {
  return (
    <>
      <PageSeo
        title="Contactos — Partilhe o seu Briefing"
        description="Contacte a Ambiconcept Waste Solutions. Partilhe os requisitos do seu município ou operação RSU e os nossos especialistas desenvolvem a solução de equipamento adequada."
        path="/contactos"
      />

      {/* Cabeçalho de página — H1 exclusivo desta rota */}
      <div className="bg-[#303f49] pt-[100px] pb-[60px]">
        <div className="max-w-[1140px] mx-auto px-5">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7ab929] mb-3">Fale connosco</p>
          <h1 className="text-[40px] md:text-[52px] font-semibold uppercase text-white leading-none">
            Contactos
          </h1>
          <p className="mt-4 text-white/60 max-w-xl text-[15px]">
            Partilhe os requisitos do seu projeto. A equipa especializada analisa o briefing e propõe a solução mais adequada.
          </p>
        </div>
      </div>

      <ContactSection />
    </>
  )
}
