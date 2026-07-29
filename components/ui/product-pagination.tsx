// components/ui/product-pagination.tsx
// "Load more" rather than infinite scroll or numbered pages, per the design.
// Kept prop-driven (hasMore/onLoadMore) so swapping in server-side
// pagination later (e.g. `page`/`totalPages` from a `.range()` query) only
// means changing how the parent computes these props, not this component.
import { ChevronDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ProductPagination({
  hasMore,
  onLoadMore,
  loading = false,
}: {
  hasMore: boolean
  onLoadMore: () => void
  loading?: boolean
}) {
  if (!hasMore) return null

  return (
    <div className="flex justify-center mt-10">
      <Button type="button" variant="outline" size="lg" onClick={onLoadMore} disabled={loading}>
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Loading...
          </>
        ) : (
          <>
            Load More Products <ChevronDown size={16} />
          </>
        )}
      </Button>
    </div>
  )
}
