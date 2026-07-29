// lib/shop-filters.ts
// Single source of truth for shop-page filtering/sorting. Runs client-side
// today against an already-fetched product list. If this needs to move
// server-side later (paginated Supabase queries, etc.), this is the only
// file that has to change — callers already pass plain `ShopFilters` /
// `ShopSort` values that map 1:1 onto query params or a `.match()` call.

import type { Product } from '@/lib/product'

export const ALL_CATEGORY = 'all'
export const ALL_OCCASION = 'all'

export const PRICE_RANGE_MIN = 0
export const PRICE_RANGE_MAX = 10000

export type ShopSort = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'alphabetical'

export type ShopFilters = {
  category: string
  /** Ceiling in PKR. Equal to PRICE_RANGE_MAX means "no ceiling" (shown as "10,000+"). */
  maxPrice: number
  occasion: string
}

export const DEFAULT_SHOP_FILTERS: ShopFilters = {
  category: ALL_CATEGORY,
  maxPrice: PRICE_RANGE_MAX,
  occasion: ALL_OCCASION,
}

export const DEFAULT_SHOP_SORT: ShopSort = 'newest'

export function filterProducts(products: Product[], filters: ShopFilters): Product[] {
  return products.filter((product) => {
    if (filters.category !== ALL_CATEGORY && product.category !== filters.category) {
      return false
    }

    // Custom-priced ("Custom Pricing") items have no fixed price, so a
    // price ceiling can't meaningfully exclude them.
    if (
      filters.maxPrice < PRICE_RANGE_MAX &&
      product.price !== null &&
      product.price > filters.maxPrice
    ) {
      return false
    }

    // Occasions aren't in the database yet (see lib/occasions.ts). Once
    // `product.occasions` is populated for real products, this starts
    // filtering automatically — no other file needs to change.
    if (filters.occasion !== ALL_OCCASION) {
      if (!product.occasions || !product.occasions.includes(filters.occasion)) {
        return false
      }
    }

    return true
  })
}

export function sortProducts(products: Product[], sort: ShopSort): Product[] {
  const sorted = [...products]

  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    case 'price-asc':
      return sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
    case 'price-desc':
      return sorted.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity))
    case 'alphabetical':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}

export function getCategoryCounts(products: Product[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const product of products) {
    counts[product.category] = (counts[product.category] ?? 0) + 1
  }
  return counts
}
