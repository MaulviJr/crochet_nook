// lib/dashboard.ts
// Single source of truth for dashboard data. Reuses productService.list()
// once and derives everything else in-memory to avoid duplicate DB calls.

import { productService } from '@/lib/product'
import { CATEGORY_OPTIONS } from '@/lib/schemas/product'

export type DashboardProduct = {
  id: string
  name: string
  slug: string
  category: string
  price: number | null
  images: string[]
  featured: boolean
  created_at: string
}

export type DashboardData = {
  totalProducts: number
  totalCategories: number
  recentProducts: DashboardProduct[]
  productsMissingImage: DashboardProduct[]
  productsMissingCategory: DashboardProduct[]
}

const VALID_CATEGORIES = new Set(CATEGORY_OPTIONS.map((c) => c.value))

export async function getDashboardData(): Promise<DashboardData> {
  const products = (await productService.list()) as DashboardProduct[]

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  const productsMissingImage = products.filter((p) => !p.images || p.images.length === 0)
  const productsMissingCategory = products.filter(
    (p) => !p.category || !VALID_CATEGORIES.has(p.category as never)
  )

  return {
    totalProducts: products.length,
    totalCategories: CATEGORY_OPTIONS.length,
    recentProducts,
    productsMissingImage,
    productsMissingCategory,
  }
}