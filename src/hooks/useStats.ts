import { useState, useEffect, useMemo } from 'react'
import { useI18n } from '@/i18n'
import { localizeStat } from '@/i18n/localize'
import { getDocs, updateDoc } from 'firebase/firestore'
import { db, siteCollection, siteDoc } from '@/lib/firebase'
import { stats as localStats, municipalities as allMunicipalities } from '@/data/local'
import type { Municipality, SiteStat } from '@/types'

const USE_LOCAL = !db

export function useStats(): { stats: SiteStat[]; loading: boolean; error: string | null } {
  const { lang, tf } = useI18n()
  const [rawStats, setStats] = useState<SiteStat[]>(USE_LOCAL ? localStats : [])
  const [loading, setLoading] = useState(!USE_LOCAL)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (USE_LOCAL) return

    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const snap = await getDocs(siteCollection('stats'))
        if (!cancelled) {
          setStats(snap.docs.map((d) => ({ id: d.id, ...d.data() } as SiteStat)))
        }
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [])

  const stats = useMemo(() => (lang === 'pt' ? rawStats : rawStats.map((s) => localizeStat(s, tf))), [rawStats, lang, tf])

  return { stats, loading, error }
}

export function useMunicipalities(): { municipalities: Municipality[]; loading: false } {
  return { municipalities: allMunicipalities, loading: false }
}

export async function updateStat(id: 'stat-1' | 'stat-2', value: number): Promise<void> {
  await updateDoc(siteDoc('stats', id), { value, updated_at: new Date().toISOString() })
}
