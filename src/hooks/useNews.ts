import { useState, useEffect, useCallback, useMemo } from 'react'
import { useI18n } from '@/i18n'
import { localizeArticle } from '@/i18n/localize'
import {
  getDocs, query, where, orderBy,
  limit as fsLimit, addDoc, updateDoc, deleteDoc, type QueryConstraint,
} from 'firebase/firestore'
import { db, siteCollection, siteDoc } from '@/lib/firebase'
import { articles as localArticles } from '@/data/local'
import type { NewsArticle } from '@/types'

const USE_LOCAL = !db

interface UseNewsOptions {
  limit?: number
}

export function useNews(opts: UseNewsOptions = {}): {
  articles: NewsArticle[]
  loading: boolean
  error: string | null
  refetch: () => void
} {
  const { limit } = opts
  const { lang, tf } = useI18n()
  const [rawArticles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(!USE_LOCAL)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const refetch = useCallback(() => setRefreshKey((k) => k + 1), [])

  useEffect(() => {
    if (USE_LOCAL) {
      let result = [...localArticles]
      if (limit) result = result.slice(0, limit)
      setArticles(result)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const constraints: QueryConstraint[] = [orderBy('published_at', 'desc')]
        if (limit) constraints.push(fsLimit(limit))
        const snap = await getDocs(query(siteCollection('news'), ...constraints))
        if (!cancelled) {
          setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() } as NewsArticle)))
        }
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [limit, refreshKey])

  const articles = useMemo(() => (lang === 'pt' ? rawArticles : rawArticles.map((a) => localizeArticle(a, tf))), [rawArticles, lang, tf])

  return { articles, loading, error, refetch }
}

export function useNewsArticle(slug: string): {
  article: NewsArticle | null
  loading: boolean
  error: string | null
} {
  const { lang, tf } = useI18n()
  const [rawArticle, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(!USE_LOCAL)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (USE_LOCAL) {
      setArticle(localArticles.find((a) => a.slug === slug) ?? null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const snap = await getDocs(
          query(siteCollection('news'), where('slug', '==', slug), fsLimit(1))
        )
        if (!cancelled) {
          setArticle(snap.empty ? null : ({ id: snap.docs[0].id, ...snap.docs[0].data() } as NewsArticle))
        }
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [slug])

  const article = useMemo(() => (rawArticle && lang !== 'pt' ? localizeArticle(rawArticle, tf) : rawArticle), [rawArticle, lang, tf])

  return { article, loading, error }
}

export async function createArticle(data: Omit<NewsArticle, 'id'>): Promise<string> {
  const ref = await addDoc(siteCollection('news'), data)
  return ref.id
}

export async function updateArticle(id: string, data: Partial<Omit<NewsArticle, 'id'>>): Promise<void> {
  await updateDoc(siteDoc('news', id), data)
}

export async function deleteArticle(id: string): Promise<void> {
  await deleteDoc(siteDoc('news', id))
}
