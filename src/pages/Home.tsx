import Hero from '@/components/sections/Hero'
import AudiencesSection from '@/components/sections/AudiencesSection'
import IntroSection from '@/components/sections/IntroSection'
import ProductsPremiumSection from '@/components/sections/ProductsPremiumSection'
import StatsSection from '@/components/sections/StatsSection'
import NewsSection from '@/components/sections/NewsSection'
import ContactSection from '@/components/sections/ContactSection'
import PageSeo from '@/components/seo/PageSeo'

export default function Home() {
  return (
    <>
      <PageSeo
        title="Ambiconcept Waste Solutions — Equipamento de Recolha Seletiva"
        description="Contentores de carga vertical, carga traseira, porta-a-porta e limpeza urbana para municípios e operadores RSU. Soluções de recolha seletiva concebidas para resistir ao tempo urbano."
        path="/"
        ogImage="/assets/hero-ecoponto-ambi-27.webp"
      />
      <Hero />
      <AudiencesSection />
      <IntroSection />
      <ProductsPremiumSection />
      <StatsSection />
      <NewsSection />
      <ContactSection />
    </>
  )
}
