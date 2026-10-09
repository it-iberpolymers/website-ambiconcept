import { useState, useEffect, useMemo } from 'react'
import { useI18n } from '@/i18n'
import { localizeHeroSlide } from '@/i18n/localize'
import { getDocs, query, orderBy, writeBatch, updateDoc } from 'firebase/firestore'
import { db, siteCollection, siteDoc } from '@/lib/firebase'
import { heroSlides as localSlides } from '@/data/local'
import type { HeroSlide } from '@/types'

const USE_LOCAL = !db

/** includeInactive: só o admin, para ver também os slides retirados do site */
export function useHeroSlides(opts: { includeInactive?: boolean } = {}): { slides: HeroSlide[]; loading: boolean; error: string | null } {
  const { includeInactive } = opts
  const { lang, tf } = useI18n()
  const [rawSlides, setSlides] = useState<HeroSlide[]>(USE_LOCAL ? localSlides : [])
  const [loading, setLoading] = useState(!USE_LOCAL)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (USE_LOCAL) return

    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const snap = await getDocs(query(siteCollection('heroSlides'), orderBy('sort_order')))
        if (!cancelled) {
          const all = snap.docs.map((d) => ({ id: d.id, ...d.data() } as HeroSlide))
          const visible = all.filter((s) => includeInactive || s.active !== false)
          // o site tem sempre pelo menos um slide: se todos estiverem retirados, fica o primeiro
          setSlides(visible.length === 0 ? all.slice(0, 1) : visible)
        }
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [includeInactive])

  const slides = useMemo(() => (lang === 'pt' ? rawSlides : rawSlides.map((s) => localizeHeroSlide(s, tf))), [rawSlides, lang, tf])

  return { slides, loading, error }
}

export async function saveHeroSlides(current: HeroSlide[], originalIds: string[]): Promise<void> {
  if (!db) throw new Error('Firebase não configurado')
  const batch = writeBatch(db)
  const currentIds = new Set(current.map((s) => s.id))

  for (const id of originalIds) {
    if (!currentIds.has(id)) batch.delete(siteDoc('heroSlides', id))
  }

  current.forEach((slide, idx) => {
    const { id, ...data } = { ...slide, sort_order: idx + 1 }
    batch.set(siteDoc('heroSlides', id), data)
  })

  await batch.commit()
}

export async function setSlideActive(id: string, active: boolean): Promise<void> {
  await updateDoc(siteDoc('heroSlides', id), { active })
}
