// components/ui/empty-products.tsx
import { PackageSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyProducts({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-16 px-6 rounded-3xl bg-secondary/40">
      <PackageSearch size={36} className="mx-auto text-muted-foreground mb-3" />
      <h3 className="font-heading text-xl text-primary mb-1">No products matched your filters</h3>
      <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
        Try widening your price range or choosing a different category.
      </p>
      <Button type="button" variant="outline" onClick={onReset}>
        Reset Filters
      </Button>
    </div>
  )
}
