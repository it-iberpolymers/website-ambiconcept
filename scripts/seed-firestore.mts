/**
 * Seed Firestore with the default content from src/data/local.ts
 *
 * Prerequisites:
 *   1. Fill in .env with real Firebase credentials
 *   2. Run: npm run seed
 *
 * Safe to run multiple times — uses setDoc with fixed IDs (upsert).
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { categories, products, articles, stats, heroSlides } from '../src/data/local.ts'
import { categoriesContent } from '../src/data/categories-content.ts'
import { DEFAULT_RAL_COLORS } from '../src/data/ral-colors.ts'

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
  console.error('❌  Firebase credentials missing. Fill in .env and run with: npm run seed')
  process.exit(1)
}

if (!SEED_ADMIN_EMAIL || !SEED_ADMIN_PASSWORD) {
  console.error('❌  SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD missing from .env — as regras do Firestore exigem sessão de admin para escrever.')
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
console.log(`Autenticado como ${SEED_ADMIN_EMAIL}\n`)

// Todo o conteúdo do site vive isolado neste namespace — ver src/lib/firebase.ts
const siteCollection = (name: string) => collection(db, 'ambiconceptSite', 'main', name)
const siteDoc = (name: string, id: string) => doc(db, 'ambiconceptSite', 'main', name, id)

const defaultBanner = {
  title: 'Cápsulas',
  description: 'Conheça a nossa solução prática para a recolha das suas cápsulas de café.',
  image_url: '/assets/capsulas-restaurante.png',
  cta_label: 'Ver Produto',
  cta_url: '/produtos?categoria=capsulas',
  overlay_opacity: 0.45,
}

console.log('Seeding categories…')
for (const cat of categories) {
  const { id, ...data } = cat
  await setDoc(doc(siteCollection('categories'), id), data)
  console.log(`  ✓ ${cat.name}`)
}

console.log('\nSeeding products…')
for (const product of products) {
  const { id, ...data } = product
  await setDoc(doc(siteCollection('products'), id), data)
  console.log(`  ✓ ${product.name}`)
}

console.log('\nSeeding news…')
for (const article of articles) {
  const { id, ...data } = article
  await setDoc(doc(siteCollection('news'), id), data)
  console.log(`  ✓ ${article.title}`)
}

console.log('\nSeeding stats…')
for (const stat of stats) {
  const { id, ...data } = stat
  await setDoc(doc(siteCollection('stats'), id), data)
  console.log(`  ✓ ${stat.label}`)
}

console.log('\nSeeding heroSlides…')
for (const slide of heroSlides) {
  const { id, ...data } = slide
  await setDoc(doc(siteCollection('heroSlides'), id), data)
  console.log(`  ✓ ${slide.title}`)
}

console.log('\nSeeding featured banner…')
await setDoc(siteDoc('siteContent', 'featured-banner'), defaultBanner)
console.log(`  ✓ ${defaultBanner.title}`)

console.log('\nSeeding RAL colors…')
for (const [categorySlug, colors] of Object.entries(DEFAULT_RAL_COLORS)) {
  await setDoc(siteDoc('siteContent', `ral-${categorySlug}`), { colors })
  console.log(`  ✓ ${categorySlug} (${colors.length} cores)`)
}

console.log('\nSeeding category highlights (descrição + características)…')
for (const c of categoriesContent) {
  await setDoc(siteDoc('siteContent', `highlights-${c.slug}`), { intro: c.intro, highlights: c.highlights })
  console.log(`  ✓ ${c.slug} (${c.highlights.length} características)`)
}

console.log('\n✅  Done. Firestore is populated.')
process.exit(0)
