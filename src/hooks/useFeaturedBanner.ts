import { useState, useEffect } from 'react'
import { getDoc, setDoc } from 'firebase/firestore'
import { db, siteDoc } from '@/lib/firebase'
import type { FeaturedBanner } from '@/types'

const USE_LOCAL = !db

export const defaultBanner: FeaturedBanner = {
  title: 'Cápsulas',
  description: 'Conheça a nossa solução prática para a recolha das suas cápsulas de café.',
  image_url: '/assets/capsulas-restaurante.png',
  cta_label: 'Ver Produto',
  cta_url: '/produtos?categoria=capsulas',
  overlay_opacity: 0.45,
}

const bannerDocRef = () => siteDoc('siteContent', 'featured-banner')

export function useFeaturedBanner(): { banner: FeaturedBanner; loading: boolean; error: string | null } {
  const [banner, setBanner] = useState<FeaturedBanner>(defaultBanner)
  const [loading, setLoading] = useState(!USE_LOCAL)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (USE_LOCAL) return

    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const snap = await getDoc(bannerDocRef())
        if (!cancelled && snap.exists()) {
          setBanner({ ...defaultBanner, ...snap.data() } as FeaturedBanner)
        }
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [])

  return { banner, loading, error }
}

export async function saveFeaturedBanner(banner: FeaturedBanner): Promise<void> {
  await setDoc(bannerDocRef(), banner)
}
