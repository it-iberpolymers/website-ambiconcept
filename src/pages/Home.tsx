import Hero from '@/components/sections/Hero'
import AudiencesSection from '@/components/sections/AudiencesSection'
import IntroSection from '@/components/sections/IntroSection'
import FlowsSection from '@/components/sections/FlowsSection'
import ProductsPremiumSection from '@/components/sections/ProductsPremiumSection'
import StatsSection from '@/components/sections/StatsSection'
import NewsSection from '@/components/sections/NewsSection'
import ContactSection from '@/components/sections/ContactSection'
import PageSeo from '@/components/seo/PageSeo'
import { useI18n } from '@/i18n'

export default function Home() {
  const { t } = useI18n()
  return (
    <>
      <PageSeo
        title={t('home.seo.title')}
        description={t('home.seo.description')}
        path="/"
        ogImage="/assets/hero-ecoponto-ambi-27.webp"
      />
      <Hero />
      <AudiencesSection />
      <IntroSection />
      <FlowsSection />
      <ProductsPremiumSection />
      <StatsSection />
      <NewsSection />
      <ContactSection />
    </>
  )
}
