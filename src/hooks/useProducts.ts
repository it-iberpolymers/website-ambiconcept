import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  getDocs, query, where,
  limit as fsLimit, orderBy, type QueryConstraint,
  updateDoc, deleteDoc,
} from 'firebase/firestore'
import { db, siteCollection, siteDoc } from '@/lib/firebase'
import { categories as localCategories, products as localProducts } from '@/data/local'
import { toPublicSlug, slugVariants } from '@/lib/categorySlug'
import { useI18n } from '@/i18n'
import { localizeProduct, localizeCategory } from '@/i18n/localize'
import type { Product, ProductCategory } from '@/types'

// When Firebase credentials are missing, db is null — fall back to local static data
const USE_LOCAL = !db

function normalizeProduct(data: Record<string, unknown>): import('@/types').Product {
  const legacyImages = (data.images as string[]) ?? []
  const category = data.category as { slug?: string; name?: string } | undefined
  return {
    ...data,
    // slug antigo ('papeleiras') guardado na base de dados → slug atual
    category: category?.slug && toPublicSlug(category.slug) !== category.slug
      ? { ...category, slug: toPublicSlug(category.slug), name: 'Limpeza Urbana' }
      : category,
    cover_image: (data.cover_image as string) ?? legacyImages[0] ?? '',
    hero_images: (data.hero_images as string[]) ?? legacyImages,
  } as import('@/types').Product
}

interface UseProductsOptions {
  categorySlug?: string
  featured?: boolean
  limit?: number
  /** só o admin: inclui os produtos retirados do site */
  includeInactive?: boolean
}

export function useProducts(opts: UseProductsOptions = {}): {
  products: Product[]
  loading: boolean
  error: string | null
  refetch: () => void
} {
  const { categorySlug, featured, limit, includeInactive } = opts
  const { lang, tf } = useI18n()
  const [rawProducts, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(!USE_LOCAL)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const refetch = useCallback(() => setRefreshKey((k) => k + 1), [])

  useEffect(() => {
    if (USE_LOCAL) {
      let result = [...localProducts].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      if (featured) result = result.filter((p) => p.featured)
      if (!includeInactive) result = result.filter((p) => p.active !== false)
      if (categorySlug) result = result.filter((p) => p.category?.slug === categorySlug)
      if (limit) result = result.slice(0, limit)
      setProducts(result)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        // Ordenação feita no cliente (não no Firestore) para não depender de
        // índices compostos quando combinada com os filtros abaixo
        const constraints: QueryConstraint[] = []
        if (featured) constraints.push(where('featured', '==', true))
        if (categorySlug) constraints.push(where('category.slug', 'in', slugVariants(categorySlug)))
        const snap = await getDocs(query(siteCollection('products'), ...constraints))
        if (!cancelled) {
          let result = snap.docs
            .map((d) => normalizeProduct({ id: d.id, ...d.data() }))
            .filter((p) => includeInactive || p.active !== false)
            .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
          if (limit) result = result.slice(0, limit)
          setProducts(result)
        }
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [categorySlug, featured, limit, includeInactive, refreshKey])

  // textos traduzidos para a língua atual (no admin a língua é sempre português)
  const products = useMemo(() => (lang === 'pt' ? rawProducts : rawProducts.map((p) => localizeProduct(p, tf, lang))), [rawProducts, lang, tf])

  return { products, loading, error, refetch }
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id'>>): Promise<void> {
  await updateDoc(siteDoc('products', id), data)
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(siteDoc('products', id))
}

export function useProduct(slug: string): {
  product: Product | null
  loading: boolean
  error: string | null
} {
  const { lang, tf } = useI18n()
  const [rawProduct, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(!USE_LOCAL)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (USE_LOCAL) {
      setProduct(localProducts.find((p) => p.slug === slug) ?? null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const snap = await getDocs(
          query(siteCollection('products'), where('slug', '==', slug), fsLimit(1))
        )
        if (!cancelled) {
          const found = snap.empty ? null : normalizeProduct({ id: snap.docs[0].id, ...snap.docs[0].data() })
          setProduct(found && found.active !== false ? found : null)
        }
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [slug])

  const product = useMemo(() => (rawProduct && lang !== 'pt' ? localizeProduct(rawProduct, tf, lang) : rawProduct), [rawProduct, lang, tf])

  return { product, loading, error }
}

export function useProductCategories(): {
  categories: ProductCategory[]
  loading: boolean
} {
  const { lang, tf } = useI18n()
  const [rawCategories, setCategories] = useState<ProductCategory[]>(USE_LOCAL ? localCategories : [])
  const [loading, setLoading] = useState(!USE_LOCAL)

  useEffect(() => {
    if (USE_LOCAL) return

    let cancelled = false
    setLoading(true)

    ;(async () => {
      try {
        const snap = await getDocs(
          query(siteCollection('categories'), orderBy('sort_order'))
        )
        if (!cancelled) {
          setCategories(snap.docs.map((d) => {
            const cat = { id: d.id, ...d.data() } as ProductCategory
            return toPublicSlug(cat.slug) !== cat.slug ? { ...cat, slug: toPublicSlug(cat.slug), name: 'Limpeza Urbana' } : cat
          }))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [])

  const categories = useMemo(() => (lang === 'pt' ? rawCategories : rawCategories.map((c) => localizeCategory(c, tf))), [rawCategories, lang, tf])

  return { categories, loading }
}
