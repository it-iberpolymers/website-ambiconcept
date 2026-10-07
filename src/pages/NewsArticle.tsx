import { useParams, Link } from 'react-router-dom'
import { useNewsArticle } from '@/hooks/useNews'
import PageSeo from '@/components/seo/PageSeo'
import '@/styles/page-shell.css'

export default function NewsArticle() {
  const { slug } = useParams<{ slug: string }>()
  const { article, loading } = useNewsArticle(slug ?? '')

  if (loading) {
    return (
      <div className="ps-page">
        <div className="max-w-[800px] mx-auto px-5 py-32 animate-pulse">
          <div className="h-6 w-32 bg-[#eaeaea] mb-8" />
          <div className="aspect-[1100/460] bg-white/70 rounded-[32px] mb-10" />
          <div className="h-10 w-3/4 bg-[#eaeaea] mb-4" />
          <div className="h-4 w-full bg-[#eaeaea] mb-2" />
          <div className="h-4 w-2/3 bg-[#eaeaea]" />
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="ps-page flex flex-col items-center justify-center text-center px-5">
        <p className="text-6xl font-black text-[#eaeaea] mb-4">404</p>
        <h1 className="text-2xl font-semibold text-[#303f49] mb-2">Artigo não encontrado</h1>
        <p className="text-[#6b6b6b] mb-8">O artigo que procura não existe ou foi removido.</p>
        <Link
          to="/noticias"
          className="btn-outline"
        >
          Ver todas as notícias
        </Link>
      </div>
    )
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_at,
    image: article.image_url
      ? (article.image_url.startsWith('http')
          ? article.image_url
          : `https://www.ambiconcept.pt${article.image_url}`)
      : 'https://www.ambiconcept.pt/assets/hero-ecoponto-ambi-27.webp',
    url: `https://www.ambiconcept.pt/noticias/${article.slug}`,
    author: { '@type': 'Organization', name: 'Ambiconcept' },
    publisher: {
      '@type': 'Organization',
      name: 'Ambiconcept',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.ambiconcept.pt/assets/Logo-Ambiconcept-Principal-1.svg',
      },
    },
  }

  return (
    <div className="ps-page">

      <PageSeo
        title={article.title}
        description={article.excerpt}
        path={`/noticias/${article.slug}`}
        ogType="article"
        ogImage={article.image_url}
        publishedAt={article.published_at}
        schema={articleSchema}
      />

      {/* Cabeçalho da página */}
      <div className="ps-hero">
        <div className="max-w-[800px] mx-auto px-5 relative z-[1]">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-white/75 hover:text-[#95d855] transition-colors mb-6"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Notícias
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="rounded-full bg-[#7ab929] text-[#0e1a10] text-[12px] font-normal uppercase tracking-wide px-[1.2em] py-[0.5em]">
              {article.category}
            </span>
            <time dateTime={article.published_at} className="text-[12px] text-white/75">
              {new Date(article.published_at).toLocaleDateString('pt-PT', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </time>
          </div>

          <h1 className="text-[28px] md:text-[40px] font-bold tracking-[-0.02em] text-white leading-tight">
            {article.title}
          </h1>
        </div>
        <svg className="ps-hero-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60V28C240 -4 480 -4 720 22s480 30 720 4V60z" />
        </svg>
      </div>

      {/* Imagem */}
      {article.image_url && (
        <div className="max-w-[800px] mx-auto px-5 -mt-12 relative z-[2]">
          <div className="aspect-[1100/460] overflow-hidden rounded-[32px] shadow-[0_30px_60px_-34px_rgba(14,26,16,0.5)]">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover rounded-none"
            />
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <div className="max-w-[800px] mx-auto px-5 pt-8 pb-[100px]">
       <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_24px_50px_-38px_rgba(14,26,16,0.4)]">
        <p className="text-[17px] text-[#303f49]/80 leading-relaxed mb-6 font-medium">
          {article.excerpt}
        </p>
        <div className="prose prose-slate max-w-none text-[#303f49] leading-relaxed">
          <p>{article.content}</p>
        </div>

        <div className="mt-[60px] pt-[30px] border-t border-[#eaeaea]">
          <Link
            to="/noticias"
            className="btn-outline"
          >
            ← Ver todas as notícias
          </Link>
        </div>
       </div>
      </div>

    </div>
  )
}
