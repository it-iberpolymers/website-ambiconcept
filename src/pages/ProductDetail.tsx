import { useState, lazy, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct } from '@/hooks/useProducts'
import { categoryHref } from '@/lib/categorySlug'
import PageSeo from '@/components/seo/PageSeo'

// Cada template de produto (com o respetivo CSS) só é pedido quando a
// categoria correspondente é mesmo visitada, em vez de ir todo no bundle inicial.
const CargaVerticalTemplate = lazy(() => import('@/templates/CargaVerticalTemplate'))
const PapeleirasTemplate = lazy(() => import('@/templates/PapeleirasTemplate'))
const BaldesDomesticosTemplate = lazy(() => import('@/templates/BaldesDomesticosTemplate'))
const SmartBoxTemplate = lazy(() => import('@/templates/SmartBoxTemplate'))
const CargaTraseiraTemplate = lazy(() => import('@/templates/CargaTraseiraTemplate'))
const AmbiTwoTemplate = lazy(() => import('@/templates/AmbiTwoTemplate'))

function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1140px] mx-auto px-5 py-20 animate-pulse">
        <div className="h-4 w-48 bg-[#eaeaea] mb-10" />
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="aspect-[4/3] bg-[#eaeaea]" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-[#eaeaea]" />
            <div className="h-4 w-full bg-[#eaeaea]" />
            <div className="h-4 w-2/3 bg-[#eaeaea]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductDetail() {
  const { slug, categoria } = useParams<{ slug: string; categoria?: string }>()
  const { product, loading, error } = useProduct(slug ?? '')
  const [activeImage, setActiveImage] = useState(0)

  if (loading) {
    return <ProductSkeleton />
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-5">
        <h1 className="text-2xl font-semibold text-[#303f49] mb-3">Produto não encontrado</h1>
        <p className="text-[#6b6b6b] mb-8">O produto que procura não existe ou foi removido.</p>
        <Link
          to="/produtos"
          className="btn-primary"
        >
          Ver todos os produtos
        </Link>
      </div>
    )
  }

  if (product.category?.slug === 'carga-vertical') {
    return <Suspense fallback={<ProductSkeleton />}><CargaVerticalTemplate product={product} /></Suspense>
  }

  if (product.category?.slug === 'limpeza-urbana') {
    return <Suspense fallback={<ProductSkeleton />}><PapeleirasTemplate product={product} /></Suspense>
  }

  if (product.category?.slug === 'baldes-domesticos') {
    return <Suspense fallback={<ProductSkeleton />}><BaldesDomesticosTemplate product={product} /></Suspense>
  }

  if (product.category?.slug === 'smart-box') {
    return <Suspense fallback={<ProductSkeleton />}><SmartBoxTemplate product={product} /></Suspense>
  }

  if (product.category?.slug === 'carga-traseira' && product.slug.startsWith('ambi-two')) {
    return <Suspense fallback={<ProductSkeleton />}><AmbiTwoTemplate product={product} /></Suspense>
  }

  if (product.category?.slug === 'carga-traseira') {
    return <Suspense fallback={<ProductSkeleton />}><CargaTraseiraTemplate product={product} /></Suspense>
  }

  const specs = product.specifications

  return (
    <div className="min-h-screen bg-white">

      <PageSeo
        title={`${product.name} — ${product.category?.name ?? 'Produto'} | Ambiconcept`}
        description={product.short_description ?? product.description}
        path={`/produtos/${product.category?.slug ?? categoria}/${product.slug}`}
        ogImage={product.cover_image}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Product',
              name: product.name,
              description: product.description,
              image: `https://www.ambiconcept.pt${product.cover_image}`,
              manufacturer: { '@type': 'Organization', name: 'Ambiconcept' },
              category: product.category?.name ?? 'Equipamento de Recolha',
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.ambiconcept.pt/' },
                { '@type': 'ListItem', position: 2, name: 'Produtos', item: 'https://www.ambiconcept.pt/produtos' },
                { '@type': 'ListItem', position: 3, name: product.category?.name, item: `https://www.ambiconcept.pt${categoryHref(product.category?.slug ?? '')}` },
                { '@type': 'ListItem', position: 4, name: product.name, item: `https://www.ambiconcept.pt/produtos/${product.category?.slug}/${product.slug}` },
              ],
            },
          ],
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-[#303f49] border-b border-white/10 pt-[90px]">
        <div className="max-w-[1140px] mx-auto px-5 py-4">
          <nav aria-label="Localização" className="flex items-center gap-2 text-[12px] text-white/75">
            <Link to="/" className="hover:text-[color:var(--green-text)] transition-colors">Início</Link>
            <span aria-hidden="true">/</span>
            <Link to="/produtos" className="hover:text-[color:var(--green-text)] transition-colors">Produtos</Link>
            {product.category && (
              <>
                <span aria-hidden="true">/</span>
                <Link
                  to={categoryHref(product.category.slug)}
                  className="hover:text-[color:var(--green-text)] transition-colors"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <span aria-hidden="true">/</span>
            <span className="text-white/70">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-5 py-[60px]">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Galeria */}
          <div>
            <div className="aspect-[4/3] overflow-hidden bg-[#f4f6f4] border border-[#eaeaea] mb-3">
              {product.hero_images[activeImage] ? (
                <img
                  src={product.hero_images[activeImage]}
                  alt={`${product.name} — imagem ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#d0d8d0]">
                  <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            {product.hero_images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.hero_images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Ver imagem ${i + 1}`}
                    className={`flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-[#7ab929]' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.category && (
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[color:var(--green-text)] mb-3">
                {product.category.name}
              </p>
            )}
            <h1 className="text-[30px] md:text-[38px] font-semibold uppercase text-[#303f49] leading-tight mb-4">
              {product.name}
            </h1>
            <p className="text-[15px] text-[#303f49]/70 leading-relaxed mb-8">{product.description}</p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/contactos"
                className="btn-primary"
              >
                Falar com um Especialista
              </Link>
              <Link
                to="/contactos"
                className="btn-outline"
              >
                Contactar
              </Link>
            </div>

            {/* Especificações */}
            {Object.keys(specs).length > 0 && (
              <div className="mt-10">
                <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[color:var(--green-text)] mb-4">
                  Especificações
                </p>
                <dl className="divide-y divide-[#eaeaea]">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4 py-3">
                      <dt className="text-[13px] font-medium text-[#303f49]/50 capitalize">
                        {key.replace(/_/g, ' ')}
                      </dt>
                      <dd className="text-[13px] text-[#303f49]">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
