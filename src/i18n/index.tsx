/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DEFAULT_LANG, langFromPath, localizePath, stripLangPrefix, type Lang } from './routing'

// Internacionalização (pt / en / fr).
// - Os textos vivem em src/i18n/locales/<língua>/<namespace>.ts (ver src/i18n/README.md).
// - O português é a língua de origem e carrega sempre; en e fr carregam só quando escolhidos.
// - Chave em falta numa língua → usa o português → usa a própria chave.

export type { Lang }

export const LANGS: { code: Lang; name: string; locale: string }[] = [
  { code: 'pt', name: 'Português', locale: 'pt-PT' },
  { code: 'en', name: 'English', locale: 'en-GB' },
  { code: 'fr', name: 'Français', locale: 'fr-FR' },
  { code: 'es', name: 'Español', locale: 'es-ES' },
]

type Dict = Record<string, string>
type Vars = Record<string, string | number>

const STORAGE_KEY = 'ambiconcept-lang'

const ptDict: Dict = Object.assign(
  {},
  ...Object.values(import.meta.glob('./locales/pt/*.ts', { eager: true, import: 'default' }) as Record<string, Dict>),
)

const loaders: Record<Exclude<Lang, 'pt'>, Record<string, () => Promise<unknown>>> = {
  en: import.meta.glob('./locales/en/*.ts', { import: 'default' }),
  fr: import.meta.glob('./locales/fr/*.ts', { import: 'default' }),
  es: import.meta.glob('./locales/es/*.ts', { import: 'default' }),
}

const cache: Partial<Record<Lang, Dict>> = { pt: ptDict }

async function loadDict(lang: Lang): Promise<Dict> {
  if (cache[lang]) return cache[lang]!
  const parts = await Promise.all(Object.values(loaders[lang as Exclude<Lang, 'pt'>]).map((load) => load() as Promise<Dict>))
  cache[lang] = Object.assign({}, ...parts)
  return cache[lang]!
}

function interpolate(text: string, vars?: Vars): string {
  if (!vars) return text
  return text.replace(/\{\{(\w+)\}\}/g, (_, name) => (name in vars ? String(vars[name]) : `{{${name}}}`))
}

function readSaved(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en' || saved === 'fr' || saved === 'es') return saved
  } catch { /* sem armazenamento: português */ }
  return 'pt'
}

interface I18n {
  lang: Lang
  /** locale para datas e números (pt-PT, en-GB, fr-FR) */
  locale: string
  setLang: (lang: Lang) => void
  /** texto da chave na língua atual (com {{variáveis}}); sem tradução usa o português e depois a chave */
  t: (key: string, vars?: Vars) => string
  /** como t, mas com um texto de recurso quando não existe chave (para dados vindos da base de dados) */
  tf: (key: string, fallback: string) => string
}

const Ctx = createContext<I18n | null>(null)

export function I18nProvider({ children, forceLang }: { children: ReactNode; forceLang?: Lang }) {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  // a língua vem do endereço (/en/..., /fr/..., /es/...; sem prefixo é português)
  const urlLang: Lang = forceLang ?? langFromPath(pathname)

  // a língua e o dicionário mudam em conjunto, só depois de o dicionário carregar (sem textos a meio)
  const [state, setState] = useState<{ lang: Lang; dict: Dict } | null>(() =>
    cache[urlLang] ? { lang: urlLang, dict: cache[urlLang]! } : null,
  )

  useEffect(() => {
    if (state?.lang === urlLang) return
    let cancelled = false
    loadDict(urlLang).then((dict) => { if (!cancelled) setState({ lang: urlLang, dict }) })
    return () => { cancelled = true }
  }, [state, urlLang])

  useEffect(() => {
    if (state && !forceLang) document.documentElement.lang = state.lang
  }, [state, forceLang])

  // visitante que já escolheu uma língua e abre um endereço sem prefixo (português): leva-o para a língua dele
  useEffect(() => {
    if (forceLang || langFromPath(pathname) !== DEFAULT_LANG || /^\/admin(\/|$)/.test(pathname)) return
    const saved = readSaved()
    if (saved !== DEFAULT_LANG) navigate(localizePath(pathname, saved) + search + hash, { replace: true })
    // só na primeira entrada
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLang = useCallback((next: Lang) => {
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* ignorar */ }
    navigate(localizePath(stripLangPrefix(pathname), next) + search + hash)
  }, [navigate, pathname, search, hash])

  const value = useMemo<I18n | null>(() => {
    if (!state) return null
    const { lang, dict } = state
    return {
      lang,
      locale: LANGS.find((l) => l.code === lang)!.locale,
      setLang,
      t: (key, vars) => interpolate(dict[key] ?? ptDict[key] ?? key, vars),
      tf: (key, fallback) => dict[key] ?? fallback,
    }
  }, [state, setLang])

  // espera pela língua do endereço na primeira carga, para não piscar em português
  if (!value) return null
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n(): I18n {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n fora do I18nProvider')
  return ctx
}
