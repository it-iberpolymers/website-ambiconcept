import { getCategoryContent } from '@/data/categories-content'
import { getFlowContent } from '@/data/flows-content'

// A categoria "Papeleiras" passou a "Limpeza Urbana" (slug 'limpeza-urbana').
// A base de dados pode ainda ter o slug antigo, por isso aceita-se e traduz-se nos dois sentidos
// até os dados serem migrados (scripts/migrate-limpeza-urbana.mts).
const LEGACY_SLUG = 'papeleiras'
const PUBLIC_SLUG = 'limpeza-urbana'

/** Slug a usar no site (aceita também o antigo). */
export function toPublicSlug(slug: string): string {
  return slug === LEGACY_SLUG ? PUBLIC_SLUG : slug
}

/** Slugs sob os quais a categoria pode estar na base de dados (atual e antigo). */
export function slugVariants(slug: string): string[] {
  return toPublicSlug(slug) === PUBLIC_SLUG ? [PUBLIC_SLUG, LEGACY_SLUG] : [slug]
}

/** Página a abrir para uma categoria: a página própria se tiver conteúdo; se o nome for também um fluxo (ex. porta-a-porta), a página do fluxo; senão o catálogo filtrado. */
export function categoryHref(slug: string): string {
  const s = toPublicSlug(slug)
  if (getCategoryContent(s)) return `/categorias/${s}`
  if (getFlowContent(s)) return `/fluxos/${s}`
  return `/produtos?categoria=${s}`
}
