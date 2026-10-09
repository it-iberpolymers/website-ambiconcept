import type { ContentTranslations, FeaturedBanner, HeroSlide, NewsArticle, Product, ProductCategory, SiteStat } from '@/types'
import type { Lang } from './routing'

// Traduz os campos de texto dos dados (produtos, categorias, notícias…) pelas chaves `data.*`.
// O conteúdo guardado no admin traz as suas traduções no campo `i18n` (geradas ao guardar, ver
// api/translate.ts), que ganham às chaves. Sem nenhuma das duas fica o texto original.
type Tf = (key: string, fallback: string) => string

/** tradutor dos campos de um documento: tradução guardada no documento → chave `<prefixo>.<campo>` → português */
function fields(item: { i18n?: ContentTranslations | null }, lang: Lang, prefix: string, tf: Tf) {
  const own = lang === 'pt' ? undefined : item.i18n?.[lang]
  return (field: string, pt: string) => own?.[field] ?? tf(`${prefix}.${field}`, pt)
}

export function localizeCategory(c: ProductCategory, tf: Tf): ProductCategory {
  return {
    ...c,
    name: tf(`data.category.${c.slug}.name`, c.name),
    description: c.description ? tf(`data.category.${c.slug}.description`, c.description) : c.description,
  }
}

export function localizeProduct(p: Product, tf: Tf, lang: Lang): Product {
  const tr = fields(p, lang, `data.product.${p.slug}`, tf)
  const specs = p.specifications
    ? Object.fromEntries(
        Object.entries(p.specifications).map(([k, v]) => [k, typeof v === 'string' ? tr(`spec.${k}`, v) : v]),
      )
    : p.specifications
  return {
    ...p,
    name: tr('name', p.name),
    short_description: p.short_description ? tr('short_description', p.short_description) : p.short_description,
    description: p.description ? tr('description', p.description) : p.description,
    specifications: specs as Product['specifications'],
    specifications_pt: p.specifications,
    category: p.category ? localizeCategory(p.category, tf) : p.category,
  }
}

export function localizeArticle(a: NewsArticle, tf: Tf, lang: Lang): NewsArticle {
  const tr = fields(a, lang, `data.news.${a.slug}`, tf)
  return {
    ...a,
    title: tr('title', a.title),
    excerpt: a.excerpt ? tr('excerpt', a.excerpt) : a.excerpt,
    content: a.content ? tr('content', a.content) : a.content,
    category: a.category ? tr('category', a.category) : a.category,
  }
}

export function localizeHeroSlide(s: HeroSlide, tf: Tf, lang: Lang): HeroSlide {
  const tr = fields(s, lang, `data.hero.${s.id}`, tf)
  return {
    ...s,
    title: tr('title', s.title),
    subtitle: s.subtitle ? tr('subtitle', s.subtitle) : s.subtitle,
    cta_label: s.cta_label ? tr('cta_label', s.cta_label) : s.cta_label,
  }
}

export function localizeBanner(b: FeaturedBanner, tf: Tf, lang: Lang): FeaturedBanner {
  const tr = fields(b, lang, `data.banner.${b.id}`, tf)
  return {
    ...b,
    title: tr('title', b.title),
    subtitle: b.subtitle ? tr('subtitle', b.subtitle) : b.subtitle,
    description: tr('description', b.description),
    cta_label: tr('cta_label', b.cta_label),
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
