export default function FirebaseNotice() {
  if (import.meta.env.VITE_FIREBASE_PROJECT_ID) return null

  return (
    <div className="flex items-start gap-2.5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
      <svg className="mt-0.5 shrink-0 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
      </svg>
      <span>
        <strong className="font-semibold">Firebase não configurado.</strong>{' '}
        Preencha as variáveis de ambiente no ficheiro <code className="font-mono text-xs bg-amber-100 px-1 rounded">.env</code> para activar a criação, edição e persistência de dados.
      </span>
    </div>
  )
}
