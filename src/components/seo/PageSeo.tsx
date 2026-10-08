import { Helmet } from 'react-helmet-async'
import { LANGS, useI18n } from '@/i18n'
import { localizePath } from '@/i18n/routing'

const SITE_NAME = 'Ambiconcept'
const BASE_URL = 'https://www.ambiconcept.pt'
const DEFAULT_IMAGE = `${BASE_URL}/assets/hero-ecoponto-ambi-27.webp`
const META_DESCRIPTION_LIMIT = 155
const OG_LOCALE = { pt: 'pt_PT', en: 'en_GB', fr: 'fr_FR', es: 'es_ES', it: 'it_IT', de: 'de_DE' } as const

interface PageSeoProps {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article'
  ogImage?: string
  publishedAt?: string
  schema?: object
}

function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text
  return `${text.slice(0, limit - 1).trimEnd()}…`
}

export default function PageSeo({
  title,
  description,
  path,
  ogType = 'website',
  ogImage,
  publishedAt,
  schema,
}: PageSeoProps) {
  const { lang } = useI18n()
  // cada língua tem o seu endereço (/en/..., /fr/..., /es/...) e o seu canonical; as outras entram como alternativas
  const urlFor = (l: (typeof LANGS)[number]['code']) => `${BASE_URL}${localizePath(path, l)}`
  const canonical = urlFor(lang)
  const ogLocale = OG_LOCALE[lang]
  const fullTitle = `${title} | ${SITE_NAME}`
  const metaDescription = truncate(description, META_DESCRIPTION_LIMIT)
  const image = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`)
    : DEFAULT_IMAGE

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      {LANGS.map((l) => (
        <link key={l.code} rel="alternate" hrefLang={l.locale === 'pt-PT' ? 'pt-PT' : l.code} href={urlFor(l.code)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={urlFor('pt')} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={ogLocale} />
      {LANGS.filter((l) => l.code !== lang).map((l) => (
        <meta key={l.code} property="og:locale:alternate" content={OG_LOCALE[l.code]} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
