export interface Product {
  id: string
  slug: string
  name: string
  short_description: string
  description: string
  category_id: string
  category?: ProductCategory
  specifications: ProductSpec
  cover_image: string
  hero_images: string[]
  anatomy_image?: string
  anatomy_image_2?: string
  images?: string[]
  featured: boolean
  price?: number
  sort_order?: number
  created_at: string
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
  published_at: string
  created_at: string
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
  title: string
  subtitle?: string
  description: string
  image_url: string
  cta_label: string
  cta_url: string
  overlay_opacity: number
}

export interface HeroSlide {
  id: string
  image_url: string
  title: string
  subtitle?: string
  cta_label?: string
  cta_url?: string
  sort_order: number
}
