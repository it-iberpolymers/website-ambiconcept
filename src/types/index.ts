import type { Lang } from '@/i18n/routing'

/**
 * Traduções do conteúdo criado no admin, geradas ao guardar (api/translate.ts): língua → campo → texto.
 * Ganham às chaves `data.*` (src/i18n/localize.ts). null = a última tradução falhou: fica o português.
 */
export type ContentTranslations = Partial<Record<Exclude<Lang, 'pt'>, Record<string, string>>>

export interface Product {
  id: string
  slug: string
  name: string
  short_description: string
  description: string
  category_id: string
  category?: ProductCategory
  specifications: ProductSpec
  /** especificações originais em português (preenchido quando os textos são traduzidos; serve para lógica interna, ex. fluxos) */
  specifications_pt?: ProductSpec
  cover_image: string
  hero_images: string[]
  anatomy_image?: string
  anatomy_image_2?: string
  images?: string[]
  featured: boolean
  /** false = retirado do site sem ser apagado (ausente = ativo) */
  active?: boolean
  price?: number
  sort_order?: number
  created_at: string
  i18n?: ContentTranslations | null
}

export interface ProductSpec {
  capacity?: string
  materials?: string[]
  colors?: string[]
  dimensions?: string
  lifting_system?: string
  customization?: string[]
  certifications?: string[]
  [key: string]: unknown
}

export interface ProductCategory {
  id: string
  slug: string
  name: string
  description?: string
  icon?: string
  sort_order: number
}

export interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  language: 'pt'
  image_url?: string
  /** false = retirado do site sem ser apagado (ausente = ativo) */
  active?: boolean
  published_at: string
  created_at: string
  i18n?: ContentTranslations | null
}

export interface SiteStat {
  id: string
  key: string
  value: number
  label: string
  updated_at: string
}

export interface Municipality {
  id: string
  name: string
  sort_order: number
}

export interface ContactSubmission {
  id: string
  name: string
  company?: string
  email: string
  phone?: string
  subject: string
  message?: string
  created_at: string
  read: boolean
}

export interface FeaturedBanner {
  /** id do documento em siteContent ('featured-banner' é o banner original; novos: 'banner-<data>') */
  id?: string
  /** false = retirado do site sem ser apagado (ausente = ativo) */
  active?: boolean
  created_at?: string
  title: string
  subtitle?: string
  description: string
  image_url: string
  cta_label: string
  cta_url: string
  overlay_opacity: number
  i18n?: ContentTranslations | null
}

export interface HeroSlide {
  id: string
  image_url: string
  title: string
  subtitle?: string
  cta_label?: string
  cta_url?: string
  /** cor das partes do título marcadas com *asteriscos* (ausente = verde) */
  highlight_color?: string
  /** false = retirado do site sem ser apagado (ausente = ativo) */
  active?: boolean
  sort_order: number
  i18n?: ContentTranslations | null
}
