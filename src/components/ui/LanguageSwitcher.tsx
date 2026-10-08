import { useEffect, useRef, useState } from 'react'
import { LANGS, useI18n } from '@/i18n'

// Globo + código da língua; ao clicar abre a lista Português / English / Français.
export default function LanguageSwitcher({ dark }: { dark: boolean }) {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('common.language')}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[14px] font-medium transition-colors hover:text-[color:var(--green-text)] ${dark ? 'text-[#303f49]' : 'text-white'}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-[18px] w-[18px]">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21M12 3C9.5 5.7 8.2 8.7 8.2 12s1.3 6.3 3.8 9" />
        </svg>
        {lang.toUpperCase()}
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('common.language')}
          className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_20px_50px_-16px_rgba(14,26,16,0.4)] ring-1 ring-black/5"
        >
          {LANGS.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                type="button"
                onClick={() => { setLang(l.code); setOpen(false) }}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] transition-colors hover:bg-[#f1fae8] ${l.code === lang ? 'bg-[#f1fae8] font-semibold text-[color:var(--green-text)]' : 'text-[#303f49]'}`}
              >
                {l.name}
                <span className="text-[12px] font-medium opacity-60">{l.code.toUpperCase()}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
