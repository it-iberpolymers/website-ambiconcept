/**
 * Migração: categoria "Papeleiras" (slug `papeleiras`) → "Limpeza Urbana" (slug `limpeza-urbana`)
 *
 * O que faz no Firestore (namespace ambiconceptSite/main):
 *   1. categories      — documento com slug `papeleiras`: slug e nome passam a `limpeza-urbana` / "Limpeza Urbana"
 *   2. products        — produtos com category.slug `papeleiras`: category.slug e category.name atualizados
 *   3. siteContent     — `ral-papeleiras` e `highlights-papeleiras` são COPIADOS para `ral-limpeza-urbana`
 *                        e `highlights-limpeza-urbana` (os antigos ficam, a menos que uses --delete-old)
 *   4. qualquer campo de texto `/produtos?categoria=papeleiras` em siteContent, heroSlides e news
 *      passa a `/categorias/limpeza-urbana`
 *
 * Por defeito é um ENSAIO: só mostra o que mudaria. Para escrever mesmo:
 *   npm run migrate:limpeza-urbana -- --apply
 *   npm run migrate:limpeza-urbana -- --apply --delete-old   (apaga também os documentos antigos copiados)
 *
 * É seguro repetir: só toca no que ainda tem o slug antigo.
 * O site continua a funcionar antes e depois da migração (src/lib/categorySlug.ts aceita os dois slugs).
 */

import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where,
} from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const OLD = 'papeleiras'
const NEW = 'limpeza-urbana'
const NEW_NAME = 'Limpeza Urbana'
const OLD_LINK = `/produtos?categoria=${OLD}`
const NEW_LINK = `/categorias/${NEW}`

const APPLY = process.argv.includes('--apply')
const DELETE_OLD = process.argv.includes('--delete-old')

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  SEED_ADMIN_EMAIL,
  SEED_ADMIN_PASSWORD,
} = process.env

if (!VITE_FIREBASE_API_KEY || !VITE_FIREBASE_PROJECT_ID) {
  console.error('❌  Credenciais Firebase em falta no .env')
  process.exit(1)
}
if (!SEED_ADMIN_EMAIL || !SEED_ADMIN_PASSWORD) {
  console.error('❌  SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD em falta no .env — as regras do Firestore exigem sessão de admin para escrever.')
  process.exit(1)
}

const app = initializeApp({
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
})
const db = getFirestore(app)
await signInWithEmailAndPassword(getAuth(app), SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD)

const siteCollection = (name: string) => collection(db, 'ambiconceptSite', 'main', name)
const siteDoc = (name: string, id: string) => doc(db, 'ambiconceptSite', 'main', name, id)

console.log(APPLY ? '⚠️  MODO APPLY — vai escrever no Firestore\n' : 'ENSAIO (nada é escrito). Usa --apply para aplicar.\n')
let changes = 0
const note = (msg: string) => { changes++; console.log(`  • ${msg}`) }

// 1. categorias
console.log('1. categories')
for (const d of (await getDocs(query(siteCollection('categories'), where('slug', '==', OLD)))).docs) {
  note(`${d.id}: slug ${OLD} → ${NEW}, nome → "${NEW_NAME}"`)
  if (APPLY) await updateDoc(d.ref, { slug: NEW, name: NEW_NAME })
}

// 2. produtos
console.log('2. products')
for (const d of (await getDocs(query(siteCollection('products'), where('category.slug', '==', OLD)))).docs) {
  const data = d.data() as { name?: string; category?: Record<string, unknown> }
  note(`${data.name ?? d.id}: category.slug ${OLD} → ${NEW}`)
  if (APPLY) await updateDoc(d.ref, { category: { ...data.category, slug: NEW, name: NEW_NAME } })
}

// 3. siteContent: copiar documentos com o slug no id
console.log('3. siteContent (documentos por categoria)')
for (const prefix of ['ral', 'highlights']) {
  const oldSnap = await getDoc(siteDoc('siteContent', `${prefix}-${OLD}`))
  if (!oldSnap.exists()) { console.log(`  – ${prefix}-${OLD} não existe (nada a copiar)`); continue }
  const newSnap = await getDoc(siteDoc('siteContent', `${prefix}-${NEW}`))
  if (newSnap.exists()) {
    console.log(`  – ${prefix}-${NEW} já existe (mantido)`)
  } else {
    note(`copiar ${prefix}-${OLD} → ${prefix}-${NEW}`)
    if (APPLY) await setDoc(siteDoc('siteContent', `${prefix}-${NEW}`), oldSnap.data())
  }
  if (DELETE_OLD) {
    note(`apagar ${prefix}-${OLD}`)
    if (APPLY) await deleteDoc(oldSnap.ref)
  }
}

// 4. ligações antigas guardadas como texto
console.log('4. ligações /produtos?categoria=papeleiras em textos')
function rewrite(value: unknown): unknown {
  if (typeof value === 'string') return value.split(OLD_LINK).join(NEW_LINK)
  if (Array.isArray(value)) return value.map(rewrite)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, rewrite(v)]))
  }
  return value
}
for (const name of ['siteContent', 'heroSlides', 'news']) {
  for (const d of (await getDocs(siteCollection(name))).docs) {
    const before = JSON.stringify(d.data())
    if (!before.includes(OLD_LINK)) continue
    note(`${name}/${d.id}: ligação atualizada`)
    if (APPLY) await updateDoc(d.ref, rewrite(d.data()) as Record<string, unknown>)
  }
}

console.log(`\n${changes} alteração(ões) ${APPLY ? 'aplicada(s)' : 'por aplicar (ensaio)'}.`)
process.exit(0)
