// lib/queries/public-products.ts
// Public-read product queries for customer-facing pages. Uses the anon-key
// client (lib/supabase.ts), NOT lib/supabase-server.ts / productService —
// those are wired to the service-role key for the admin panel and should
// never be used to serve public pages.
//
// Requires a Supabase RLS policy allowing SELECT on `products` for the
// anon role (see setup notes at the end of this response).

import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/product'

/**
 * Returns up to `limit` products, preferring featured ones. If there
 * aren't enough featured products, backfills with the newest remaining
 * products — easy to simplify to "featured only" later once the catalog
 * has enough featured items.
 */
export async function getFeaturedOrRecentProducts(limit = 4): Promise<Product[]> {
  const { data: featured, error: featuredError } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (featuredError) throw featuredError
  if (featured.length >= limit) return featured as Product[]

  const excludeIds = featured.map((p) => p.id)
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit - featured.length)

  if (excludeIds.length > 0) {
    query = query.not('id', 'in', `(${excludeIds.join(',')})`)
  }

  const { data: recent, error: recentError } = await query
  if (recentError) throw recentError

  return [...featured, ...(recent ?? [])] as Product[]
}