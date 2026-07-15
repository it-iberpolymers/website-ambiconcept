import { useState, useEffect, useCallback } from 'react'
import { getDocs, query, orderBy, updateDoc, deleteDoc } from 'firebase/firestore'
import { db, siteCollection, siteDoc } from '@/lib/firebase'
import type { ContactSubmission } from '@/types'

export function useContacts(): {
  contacts: ContactSubmission[]
  loading: boolean
  error: string | null
  refetch: () => void
} {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(!!db)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const refetch = useCallback(() => setRefreshKey((k) => k + 1), [])

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const snap = await getDocs(query(siteCollection('contacts'), orderBy('created_at', 'desc')))
        if (!cancelled) {
          setContacts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ContactSubmission)))
        }
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [refreshKey])

  return { contacts, loading, error, refetch }
}

export async function markContactRead(id: string, read: boolean): Promise<void> {
  await updateDoc(siteDoc('contacts', id), { read })
}

export async function deleteContact(id: string): Promise<void> {
  await deleteDoc(siteDoc('contacts', id))
}
