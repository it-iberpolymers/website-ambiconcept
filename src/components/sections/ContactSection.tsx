import { useEffect, useRef } from 'react'
import ContactForm from '@/components/ui/ContactForm'
import { useI18n } from '@/i18n'
import '@/styles/contact-layout.css'

export default function ContactSection() {
  const { t } = useI18n()
  const leafRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = leafRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.15
      el.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="contacto" aria-labelledby="contact-heading" className="cl-section">
      <div className="max-w-[1140px] mx-auto px-5">

        {/* Cabeçalho: texto (80%) + símbolo (12%) */}
        <div className="flex flex-wrap items-start mb-[50px]">
          <div className="w-full md:w-[80%]">
            <h2
              id="contact-heading"
              className="cl-heading text-[30px] md:text-[45px] font-semibold uppercase leading-none"
            >
              {t('home.contact.title')}
            </h2>
            <p className="cl-subheading text-[22px] md:text-[34px] font-normal leading-none">
              {t('home.contact.subtitle')}
            </p>
            <p className="cl-desc">
              {t('home.contact.desc.0')}<br />
              {t('home.contact.desc.1')}
            </p>
          </div>
          <div ref={leafRef} className="hidden md:flex md:w-[12%] md:ml-auto justify-center items-start pt-12">
            <img
              src="/assets/Ambiconcept-Simbolo-Green-368C.svg"
              alt=""
              aria-hidden="true"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Formulário full-width */}
        <ContactForm />

      </div>
    </section>
  )
}
