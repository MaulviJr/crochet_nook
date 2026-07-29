// components/ui/product-sort.tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import type { ShopSort } from '@/lib/shop-filters'

const SORT_OPTIONS: { value: ShopSort; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'alphabetical', label: 'Alphabetical' },
]

export function ProductSort({
  value,
  onChange,
}: {
  value: ShopSort
  onChange: (value: ShopSort) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden sm:inline text-sm text-muted-foreground shrink-0">Sort by:</span>
      <Select value={value} onValueChange={(v) => { if (v) onChange(v as ShopSort) }}>
        <SelectTrigger className="w-full sm:w-52">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
