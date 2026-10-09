import { useState, useEffect, useCallback, useMemo } from 'react'
import { getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db, siteCollection, siteDoc } from '@/lib/firebase'
import { useI18n } from '@/i18n'
import { localizeBanner } from '@/i18n/localize'
import type { FeaturedBanner } from '@/types'

const USE_LOCAL = !db

// Modelo de um banner novo (o admin preenche o resto)
export const emptyBanner: FeaturedBanner = {
  title: '',
  description: '',
  image_url: '',
  cta_label: 'Saber Mais',
  cta_url: '/produtos',
  overlay_opacity: 0.45,
  active: true,
}

// Os banners vivem em siteContent (a coleção que as regras já permitem): o original
// 'featured-banner' e os novos 'banner-<data>'.
const isBannerId = (id: string) => id === 'featured-banner' || id.startsWith('banner-')

export function useBanners(opts: { onlyActive?: boolean } = {}): {
  banners: FeaturedBanner[]
  loading: boolean
  error: string | null
  refetch: () => void
} {
  const { onlyActive } = opts
  const { lang, tf } = useI18n()
  const [rawBanners, setBanners] = useState<FeaturedBanner[]>([])
  const [loading, setLoading] = useState(!USE_LOCAL)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const refetch = useCallback(() => setRefreshKey((k) => k + 1), [])

  useEffect(() => {
    if (USE_LOCAL) return

    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const snap = await getDocs(siteCollection('siteContent'))
        if (cancelled) return
        let list = snap.docs
          .filter((d) => isBannerId(d.id))
          .map((d) => ({ ...emptyBanner, ...d.data(), id: d.id }) as FeaturedBanner)
          .sort((a, b) => (a.created_at ?? '').localeCompare(b.created_at ?? ''))
        if (onlyActive) list = list.filter((b) => b.active !== false)
        setBanners(list)
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [onlyActive, refreshKey])

  const banners = useMemo(() => (lang === 'pt' ? rawBanners : rawBanners.map((b) => localizeBanner(b, tf, lang))), [rawBanners, lang, tf])

  return { banners, loading, error, refetch }
}

// sem id = banner novo
export async function saveBanner(banner: FeaturedBanner): Promise<void> {
  const { id, ...data } = banner
  const docId = id ?? `banner-${Date.now()}`
  await setDoc(siteDoc('siteContent', docId), { ...data, created_at: data.created_at ?? new Date().toISOString() })
}

export async function setBannerActive(id: string, active: boolean): Promise<void> {
  await updateDoc(siteDoc('siteContent', id), { active })
}

export async function deleteBanner(id: string): Promise<void> {
  await deleteDoc(siteDoc('siteContent', id))
}
