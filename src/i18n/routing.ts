// Endereços por língua: o português vive na raiz (/produtos) e as outras com prefixo (/en/produtos).
// Funções puras, usadas pelo router, pelo SEO e pelo gerador do sitemap.

export type Lang = 'pt' | 'en' | 'fr' | 'es'

export const DEFAULT_LANG: Lang = 'pt'
export const PREFIXED_LANGS: Lang[] = ['en', 'fr', 'es']

const ADMIN = /^\/admin(\/|$)/

/** Língua indicada pelo endereço (`/en/...` → en; sem prefixo → português). */
export function langFromPath(pathname: string): Lang {
  if (ADMIN.test(pathname)) return DEFAULT_LANG
  const first = pathname.split('/')[1]
  return (PREFIXED_LANGS as string[]).includes(first) ? (first as Lang) : DEFAULT_LANG
}

/** Tira o prefixo de língua: `/en/produtos` → `/produtos`, `/en` → `/`. */
export function stripLangPrefix(pathname: string): string {
  const lang = langFromPath(pathname)
  if (lang === DEFAULT_LANG) return pathname
  const rest = pathname.slice(lang.length + 1)
  return rest === '' ? '/' : rest
}

/** Põe o prefixo da língua num endereço interno (`/produtos?x#y` → `/en/produtos?x#y`). */
export function localizePath(to: string, lang: Lang): string {
  if (lang === DEFAULT_LANG) return to
  if (!to.startsWith('/') || to.startsWith('//') || ADMIN.test(to)) return to
  const [path, ...tail] = to.split(/(?=[?#])/)
  if (langFromPath(path) !== DEFAULT_LANG) return to // já tem prefixo
  const suffix = tail.join('')
  return `/${lang}${path === '/' ? '' : path}${suffix}`
}
