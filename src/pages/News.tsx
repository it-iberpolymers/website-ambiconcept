import { Link } from 'react-router-dom'
import { useNews } from '@/hooks/useNews'
import PageSeo from '@/components/seo/PageSeo'

export default function News() {
  const { articles, loading, error } = useNews()

  return (
    <div className="min-h-screen bg-white">

      <PageSeo
        title="Notícias — Gestão de Resíduos e Economia Circular"
        description="Artigos sobre sustentabilidade, economia circular e gestão de resíduos urbanos. Perspetivas e novidades da Ambiconcept Waste Solutions."
        path="/noticias"
      />

      {/* Cabeçalho */}
      <div className="bg-[#303f49] pt-[100px] pb-[50px]">
        <div className="max-w-[1140px] mx-auto px-5">
          <nav aria-label="Localização" className="flex items-center gap-2 text-[12px] text-white/40 mb-6">
            <Link to="/" className="hover:text-[#7ab929] transition-colors">Início</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/70">Notícias</span>
          </nav>
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7ab929] mb-3">Atualidade</p>
          <h1 className="text-[40px] md:text-[45px] font-semibold uppercase text-white leading-none">Notícias</h1>
          <p className="mt-4 text-white/60 max-w-xl text-[15px]">
            Acompanhe as novidades sobre sustentabilidade, economia circular e gestão de resíduos.
          </p>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-5 py-[60px]">
        {loading ? (
          <div className="grid md:grid-cols-2 gap-[25px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-[#eaeaea] animate-pulse h-64" />
            ))}
          </div>
        ) : error ? (
          <p className="text-[#cc3b2d] text-sm py-8">Erro ao carregar notícias. Por favor recarregue a página.</p>
        ) : articles.length === 0 ? (
          <p className="text-[#adadad] text-sm py-12 text-center">Nenhuma notícia publicada ainda.</p>
        ) : (
          <ul className="grid md:grid-cols-2 gap-[25px]" role="list">
            {articles.map((article) => (
              <li key={article.id}>
                <article className="relative bg-white rounded-[3px] overflow-hidden flex flex-col border border-[#eaeaea]">

                  {/* Imagem */}
                  <Link
                    to={`/noticias/${article.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="block overflow-hidden"
                  >
                    <div className="aspect-[1100/460]">
                      {article.image_url ? (
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#f4f6f4] flex items-center justify-center">
                          <svg className="h-12 w-12 text-[#d0d8d0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Badge */}
                  <span className="absolute top-5 right-5 bg-[#7ab929] text-white text-[12px] font-normal uppercase leading-none px-[1.2em] py-[0.6em] pointer-events-none select-none">
                    {article.category}
                  </span>

                  {/* Texto */}
                  <div className="mt-5 px-[30px]">
                    <h2 className="text-[21px] font-semibold text-[#303f49] leading-snug mb-[25px] mt-0">
                      <Link
                        to={`/noticias/${article.slug}`}
                        className="text-[#303f49] hover:text-[#7ab929] transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h2>
                    <Link
                      to={`/noticias/${article.slug}`}
                      className="inline-block text-[12px] font-bold uppercase text-[#7ab929] hover:text-[#303f49] transition-colors mb-5"
                    >
                      Ler Mais »
                    </Link>
                  </div>

                  {/* Rodapé com data */}
                  <div className="mt-auto border-t border-[#eaeaea] px-[30px] py-[15px]">
                    <time dateTime={article.published_at} className="text-[12px] text-[#adadad] leading-snug">
                      {new Date(article.published_at).toLocaleDateString('pt-PT', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}
                    </time>
                  </div>

                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
