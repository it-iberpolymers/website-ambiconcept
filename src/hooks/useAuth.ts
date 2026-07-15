import { useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  async function login(email: string, password: string) {
    if (!auth) throw new Error('Firebase não configurado')
    return signInWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    if (!auth) return
    return signOut(auth)
  }

  return { user, loading, login, logout }
}
