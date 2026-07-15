import { useContacts, markContactRead, deleteContact } from '@/hooks/useContacts'
import type { ContactSubmission } from '@/types'
import FirebaseNotice from '../FirebaseNotice'

export default function AdminContactos() {
  const { contacts, loading, refetch } = useContacts()

  async function toggleRead(contact: ContactSubmission) {
    await markContactRead(contact.id, !contact.read)
    refetch()
  }

  async function handleDelete(contact: ContactSubmission) {
    if (!window.confirm(`Eliminar a submissão de "${contact.name}"?`)) return
    await deleteContact(contact.id)
    refetch()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#1a2535]">Contactos</h1>
        <p className="text-sm text-gray-400 mt-0.5">Submissões do formulário de contacto</p>
      </div>

      <FirebaseNotice />

      {loading ? (
        <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-400 text-sm">A carregar…</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <svg className="h-12 w-12 text-gray-200 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          <p className="text-gray-500 font-medium">Sem submissões</p>
          <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
            As submissões do formulário de contacto aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nome</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Contacto</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Assunto</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Data</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {contacts.map(contact => (
                <tr key={contact.id} className="hover:bg-gray-50/60 transition-colors align-top">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {!contact.read && (
                        <span className="mt-0.5 shrink-0 h-2 w-2 rounded-full bg-[#7ab929]" aria-label="Não lido" />
                      )}
                      <div>
                        <p className={contact.read ? 'text-gray-700' : 'font-semibold text-gray-900'}>{contact.name}</p>
                        {contact.company && <p className="text-xs text-gray-400 mt-0.5">{contact.company}</p>}
                        {contact.message && (
                          <details className="mt-1.5">
                            <summary className="text-xs text-[#7ab929] cursor-pointer select-none">Ver mensagem</summary>
                            <p className="text-xs text-gray-500 mt-1 max-w-xs whitespace-pre-wrap">{contact.message}</p>
                          </details>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    <p>{contact.email}</p>
                    {contact.phone && <p className="text-xs text-gray-400 mt-0.5">{contact.phone}</p>}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{contact.subject}</td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                    {new Date(contact.created_at).toLocaleDateString('pt-PT')}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => toggleRead(contact)}
                      className="text-xs font-medium text-[#7ab929] hover:text-[#5d9519] transition-colors mr-4"
                    >
                      {contact.read ? 'Marcar não lido' : 'Marcar como lido'}
                    </button>
                    <button
                      onClick={() => handleDelete(contact)}
                      className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
