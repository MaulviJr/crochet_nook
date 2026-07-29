// components/sections/shop/product-catalog.tsx
'use client'

import { useMemo, useState } from 'react'
import { CategoryChip } from '@/components/ui/category-chip'
import { ProductSort } from '@/components/ui/product-sort'
import { ProductGrid } from '@/components/ui/product-grid'
import { ProductPagination } from '@/components/ui/product-pagination'
import { EmptyProducts } from '@/components/ui/empty-products'
import { MobileFilterDrawer } from '@/components/ui/mobile-filter-drawer'
import { FiltersSidebar } from '@/components/sections/shop/filters-sidebar'
import { CATEGORY_OPTIONS } from '@/lib/schemas/product'
import {
  ALL_CATEGORY,
  DEFAULT_SHOP_FILTERS,
  DEFAULT_SHOP_SORT,
  filterProducts,
  sortProducts,
  type ShopFilters,
  type ShopSort,
} from '@/lib/shop-filters'
import type { Product } from '@/lib/product'

const PAGE_SIZE = 9

/**
 * Owns every piece of interactive state for the shop page (category,
 * price ceiling, occasion, sort, how many products are "loaded"). Products
 * themselves are fetched once on the server and handed down as a prop —
 * this component only filters/sorts/paginates the array it's given, via
 * the pure helpers in lib/shop-filters.ts.
 */
export function ProductCatalog({
  products,
  categoryCounts,
}: {
  products: Product[]
  categoryCounts: Record<string, number>
}) {
  const [filters, setFilters] = useState<ShopFilters>(DEFAULT_SHOP_FILTERS)
  const [sort, setSort] = useState<ShopSort>(DEFAULT_SHOP_SORT)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  function updateFilters(next: ShopFilters) {
    setFilters(next)
    setVisibleCount(PAGE_SIZE)
  }

  const filteredAndSorted = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [products, filters, sort]
  )

  const visibleProducts = filteredAndSorted.slice(0, visibleCount)
  const hasMore = visibleCount < filteredAndSorted.length

  return (
    <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-10 items-start">
        <aside className="hidden lg:block sticky top-24">
          <FiltersSidebar
            filters={filters}
            onFiltersChange={updateFilters}
            categoryCounts={categoryCounts}
            totalCount={products.length}
          />
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <MobileFilterDrawer>
              <FiltersSidebar
                filters={filters}
                onFiltersChange={updateFilters}
                categoryCounts={categoryCounts}
                totalCount={products.length}
              />
            </MobileFilterDrawer>

            {/* Category chips duplicate what the Filters drawer already offers
                on small screens, so they only appear from `sm` up. */}
            <div className="hidden sm:flex flex-wrap gap-2 flex-1 min-w-0">
              <CategoryChip
                label="All"
                count={products.length}
                active={filters.category === ALL_CATEGORY}
                onClick={() => updateFilters({ ...filters, category: ALL_CATEGORY })}
              />
              {CATEGORY_OPTIONS.map((opt) => (
                <CategoryChip
                  key={opt.value}
                  label={opt.label}
                  count={categoryCounts[opt.value] ?? 0}
                  active={filters.category === opt.value}
                  onClick={() => updateFilters({ ...filters, category: opt.value })}
                />
              ))}
            </div>

            <ProductSort value={sort} onChange={setSort} />
          </div>

          {visibleProducts.length === 0 ? (
            <EmptyProducts onReset={() => updateFilters(DEFAULT_SHOP_FILTERS)} />
          ) : (
            <>
              <ProductGrid products={visibleProducts} />
              <ProductPagination hasMore={hasMore} onLoadMore={() => setVisibleCount((c) => c + PAGE_SIZE)} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}