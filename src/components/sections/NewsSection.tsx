import { Link } from 'react-router-dom'
import { useNews } from '@/hooks/useNews'

export default function NewsSection() {
  const { articles } = useNews({ limit: 2 })

  return (
    <section id="news" aria-labelledby="news-heading" className="bg-white pt-[120px] pb-[120px]">
      <div className="max-w-[1140px] mx-auto px-5">

        {/* Cabeçalho */}
        <h2
          id="news-heading"
          className="text-[40px] md:text-[45px] font-semibold uppercase text-[#303f49] leading-none pb-[5px] m-0"
        >
          Notícias
        </h2>
        <p className="text-[31px] md:text-[34px] font-normal text-[#303f49] leading-none pb-[30px] m-0">
          Ambiconcept
        </p>

        {/* Grid de artigos — gap 25px igual ao Elementor */}
        <div className="grid md:grid-cols-2 gap-[25px] mb-12">
          {articles.map((article) => (
            <article key={article.id} className="relative bg-white rounded-[3px] overflow-hidden flex flex-col">

              {/* Imagem */}
              <Link to={`/noticias/${article.slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
                <div className="aspect-[1100/460]">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>
              </Link>

              {/* Badge — irmão do link, posicionado sobre o canto superior direito da imagem */}
              <span className="absolute top-5 right-5 bg-[#7ab929] text-white text-[12px] font-normal uppercase leading-none px-[1.2em] py-[0.6em] pointer-events-none select-none">
                {article.category}
              </span>

              {/* Texto: mt-20px, padding lateral 30px */}
              <div className="mt-5 px-[30px]">
                <h3 className="text-[21px] font-semibold text-[#303f49] leading-snug mb-[25px] mt-0">
                  <Link to={`/noticias/${article.slug}`} className="text-[#303f49] hover:text-[#7ab929] transition-colors">
                    {article.title}
                  </Link>
                </h3>

                <Link
                  to={`/noticias/${article.slug}`}
                  className="inline-block text-[12px] font-bold uppercase text-[#7ab929] hover:text-[#303f49] transition-colors mb-5"
                >
                  Ler Mais »
                </Link>
              </div>

              {/* Meta-data: border-top + padding lateral 30px */}
              <div className="mt-auto border-t border-[#eaeaea] px-[30px] py-[15px]">
                <time
                  dateTime={article.published_at}
                  className="text-[12px] text-[#adadad] leading-snug"
                >
                  {new Date(article.published_at).toLocaleDateString('pt-PT', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>

            </article>
          ))}
        </div>

        {/* Botão Ver Todas */}
        <div className="text-center">
          <Link
            to="/noticias"
            className="btn-outline"
          >
            Ver Todas
          </Link>
        </div>

      </div>
    </section>
  )
}
