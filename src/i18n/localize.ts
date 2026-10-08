import type { HeroSlide, NewsArticle, Product, ProductCategory, SiteStat } from '@/types'

// Traduz os campos de texto dos dados (produtos, categorias, notícias…) pelas chaves `data.*`.
// Sem tradução fica o texto original (por ex. conteúdo novo criado no painel de administração).
type Tf = (key: string, fallback: string) => string

export function localizeCategory(c: ProductCategory, tf: Tf): ProductCategory {
  return {
    ...c,
    name: tf(`data.category.${c.slug}.name`, c.name),
    description: c.description ? tf(`data.category.${c.slug}.description`, c.description) : c.description,
  }
}

export function localizeProduct(p: Product, tf: Tf): Product {
  const specs = p.specifications
    ? Object.fromEntries(
        Object.entries(p.specifications).map(([k, v]) => [
          k,
          typeof v === 'string' ? tf(`data.product.${p.slug}.spec.${k}`, v) : v,
        ]),
      )
    : p.specifications
  return {
    ...p,
    name: tf(`data.product.${p.slug}.name`, p.name),
    short_description: p.short_description ? tf(`data.product.${p.slug}.short_description`, p.short_description) : p.short_description,
    description: p.description ? tf(`data.product.${p.slug}.description`, p.description) : p.description,
    specifications: specs as Product['specifications'],
    specifications_pt: p.specifications,
    category: p.category ? localizeCategory(p.category, tf) : p.category,
  }
}

export function localizeArticle(a: NewsArticle, tf: Tf): NewsArticle {
  return {
    ...a,
    title: tf(`data.news.${a.slug}.title`, a.title),
    excerpt: a.excerpt ? tf(`data.news.${a.slug}.excerpt`, a.excerpt) : a.excerpt,
    content: a.content ? tf(`data.news.${a.slug}.content`, a.content) : a.content,
    category: a.category ? tf(`data.news.${a.slug}.category`, a.category) : a.category,
  }
}

export function localizeHeroSlide(s: HeroSlide, tf: Tf): HeroSlide {
  return {
    ...s,
    title: tf(`data.hero.${s.id}.title`, s.title),
    subtitle: s.subtitle ? tf(`data.hero.${s.id}.subtitle`, s.subtitle) : s.subtitle,
    cta_label: s.cta_label ? tf(`data.hero.${s.id}.cta_label`, s.cta_label) : s.cta_label,
  }
}

export function localizeStat(s: SiteStat, tf: Tf): SiteStat {
  return {
    ...s,
    label: s.label ? tf(`data.stat.${s.key}.label`, s.label) : s.label,
  }
}

/**
 * Traduz um objeto de conteúdo inteiro (categorias, fluxos…) pelas chaves derivadas da estrutura:
 * `prefixo.campo`, `prefixo.lista.0.campo`… Cada texto sem tradução fica como está, por isso só é
 * preciso escrever em en/fr as chaves que se querem traduzir.
 * Exemplo: localizeDeep(flow, 'flow.vidro', tf) → 'flow.vidro.highlights.0.title'
 */
export function localizeDeep<T>(value: T, prefix: string, tf: Tf): T {
  if (typeof value === 'string') return tf(prefix, value) as unknown as T
  if (Array.isArray(value)) return value.map((v, i) => localizeDeep(v, `${prefix}.${i}`, tf)) as unknown as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, localizeDeep(v, `${prefix}.${k}`, tf)]),
    ) as T
  }
  return value
}
