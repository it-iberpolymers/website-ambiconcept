import { type ChangeEvent, useState } from 'react'
import { addDoc } from 'firebase/firestore'
import { db, siteCollection } from '@/lib/firebase'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface FormState {
  name: string
  company: string
  email: string
  phone: string
  subject: string
  message: string
  privacy: boolean
}

const initialForm: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  subject: 'orcamento',
  message: '',
  privacy: false,
}

export function useContactForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [status, setStatus] = useState<Status>('idle')

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setForm((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }))
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    if (!form.privacy) return

    setStatus('loading')
    try {
      if (db) {
        await addDoc(siteCollection('contacts'), {
          name: form.name,
          company: form.company || undefined,
          email: form.email,
          phone: form.phone || undefined,
          subject: form.subject,
          message: form.message || undefined,
          created_at: new Date().toISOString(),
          read: false,
        })
      }
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  return { form, status, handleChange, handleSubmit }
}
