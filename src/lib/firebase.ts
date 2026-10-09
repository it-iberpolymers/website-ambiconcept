import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, initializeFirestore, collection, doc, type Firestore, type CollectionReference, type DocumentReference } from 'firebase/firestore'
import { getAuth, type Auth } from 'firebase/auth'

// Este projeto Firebase é partilhado por várias apps do grupo Iberpolymers
// (frota, contratos, users, configurador de propostas, etc.). Todos os dados
// deste site vivem isolados debaixo deste namespace para nunca colidir com
// coleções de outras ferramentas nem depender de regras que não são nossas.
const SITE_ROOT = ['ambiconceptSite', 'main'] as const

const configured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID,
)

let db: Firestore | null = null
let auth: Auth | null = null

if (configured) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }
  const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  // O admin envia campos vazios como undefined (imagem, preço, subtítulo); sem
  // esta opção o Firestore recusa a gravação. Em recarga a quente já existe: reutiliza.
  try {
    db = initializeFirestore(app, { ignoreUndefinedProperties: true })
  } catch {
    db = getFirestore(app)
  }
  auth = getAuth(app)
}

export function siteCollection(name: string): CollectionReference {
  if (!db) throw new Error('Firebase não configurado')
  return collection(db, ...SITE_ROOT, name)
}

export function siteDoc(name: string, id: string): DocumentReference {
  if (!db) throw new Error('Firebase não configurado')
  return doc(db, ...SITE_ROOT, name, id)
}

export { db, auth }
