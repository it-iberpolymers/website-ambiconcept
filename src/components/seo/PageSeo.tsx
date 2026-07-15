import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Ambiconcept'
const BASE_URL = 'https://www.ambiconcept.pt'
const DEFAULT_IMAGE = `${BASE_URL}/assets/hero-ecoponto-ambi-27.webp`
const META_DESCRIPTION_LIMIT = 155

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
  const canonical = `${BASE_URL}${path}`
  const fullTitle = `${title} | ${SITE_NAME}`
  const metaDescription = truncate(description, META_DESCRIPTION_LIMIT)
  const image = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`)
    : DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_PT" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      <link rel="alternate" hrefLang="pt-PT" href={canonical} />
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
