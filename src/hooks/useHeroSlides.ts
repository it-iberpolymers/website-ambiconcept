import { useState, useEffect } from 'react'
import { getDocs, query, orderBy, writeBatch } from 'firebase/firestore'
import { db, siteCollection, siteDoc } from '@/lib/firebase'
import { heroSlides as localSlides } from '@/data/local'
import type { HeroSlide } from '@/types'

const USE_LOCAL = !db

export function useHeroSlides(): { slides: HeroSlide[]; loading: boolean; error: string | null } {
  const [slides, setSlides] = useState<HeroSlide[]>(USE_LOCAL ? localSlides : [])
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
          setSlides(snap.docs.map((d) => ({ id: d.id, ...d.data() } as HeroSlide)))
        }
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [])

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
