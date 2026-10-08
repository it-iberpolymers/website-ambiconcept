/**
 * Gera public/sitemap.xml com todas as páginas públicas em cada língua (pt na raiz; /en, /fr, /es com prefixo),
 * cada uma com as ligações `hreflang` para as outras línguas.
 *
 *   npm run sitemap
 *
 * Usa os dados locais (src/data). Conteúdo criado só no painel de administração (Firestore) não aparece aqui.
 */
import { writeFileSync } from 'node:fs'
import { products, articles } from '../src/data/local.ts'
import { categoriesContent } from '../src/data/categories-content.ts'
import { flowsContent } from '../src/data/flows-content.ts'
import { localizePath, PREFIXED_LANGS, type Lang } from '../src/i18n/routing.ts'

const BASE = 'https://www.ambiconcept.pt'
const LANGS: Lang[] = ['pt', ...PREFIXED_LANGS]
const HREFLANG: Record<Lang, string> = { pt: 'pt-PT', en: 'en', fr: 'fr', es: 'es' }

interface Page { path: string; changefreq: string; priority: string; lastmod?: string }

const pages: { group: string; items: Page[] }[] = [
  { group: 'Páginas principais', items: [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/produtos', changefreq: 'weekly', priority: '0.9' },
    { path: '/contactos', changefreq: 'monthly', priority: '0.7' },
    { path: '/noticias', changefreq: 'weekly', priority: '0.7' },
  ] },
  { group: 'Categorias', items: categoriesContent.map((c) => ({ path: `/categorias/${c.slug}`, changefreq: 'monthly', priority: '0.75' })) },
  { group: 'Fluxos de resíduos', items: flowsContent.map((f) => ({ path: `/fluxos/${f.slug}`, changefreq: 'monthly', priority: '0.75' })) },
  { group: 'Produtos', items: products.filter((p) => p.category).map((p) => ({ path: `/produtos/${p.category!.slug}/${p.slug}`, changefreq: 'monthly', priority: '0.8' })) },
  { group: 'Artigos', items: articles.map((a) => ({ path: `/noticias/${a.slug}`, lastmod: a.published_at.slice(0, 10), changefreq: 'monthly', priority: '0.6' })) },
  { group: 'Legal', items: [{ path: '/politica-de-privacidade', changefreq: 'yearly', priority: '0.2' }] },
]

const url = (path: string, lang: Lang) => `${BASE}${localizePath(path, lang)}`

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`
let count = 0
for (const { group, items } of pages) {
  xml += `\n  <!-- ${group} -->\n`
  for (const page of items) {
    for (const lang of LANGS) {
      xml += `  <url>\n    <loc>${url(page.path, lang)}</loc>\n`
      for (const alt of LANGS) xml += `    <xhtml:link rel="alternate" hreflang="${HREFLANG[alt]}" href="${url(page.path, alt)}" />\n`
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(page.path, 'pt')}" />\n`
      if (page.lastmod) xml += `    <lastmod>${page.lastmod}</lastmod>\n`
      xml += `    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`
      count++
    }
  }
}
xml += `\n</urlset>\n`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml: ${count} endereços (${count / LANGS.length} páginas × ${LANGS.length} línguas)`)
