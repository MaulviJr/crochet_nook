// components/sections/shop/filters-sidebar.tsx
import { Heart, MapPin } from 'lucide-react'
import { CATEGORY_OPTIONS } from '@/lib/schemas/product'
import { OCCASION_OPTIONS } from '@/lib/occasions'
import { PriceSlider } from '@/components/ui/price-slider'
import { ALL_CATEGORY, ALL_OCCASION, type ShopFilters } from '@/lib/shop-filters'
import { cn } from '@/lib/utils'

/**
 * Pure presentational content for the filter sidebar. Rendered twice by
 * ProductCatalog — once in the sticky desktop <aside>, once inside
 * MobileFilterDrawer — so it never owns its own state; the parent lifts
 * `filters` up so both copies always agree.
 */
export function FiltersSidebar({
  filters,
  onFiltersChange,
  categoryCounts,
  totalCount,
}: {
  filters: ShopFilters
  onFiltersChange: (filters: ShopFilters) => void
  categoryCounts: Record<string, number>
  totalCount: number
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading text-lg text-primary mb-3">Categories</h3>
        <div className="space-y-1">
          <CategoryOption
            label="All Products"
            count={totalCount}
            active={filters.category === ALL_CATEGORY}
            onClick={() => onFiltersChange({ ...filters, category: ALL_CATEGORY })}
          />
          {CATEGORY_OPTIONS.map((opt) => (
            <CategoryOption
              key={opt.value}
              label={opt.label}
              count={categoryCounts[opt.value] ?? 0}
              active={filters.category === opt.value}
              onClick={() => onFiltersChange({ ...filters, category: opt.value })}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading text-lg text-primary mb-3">Price Range</h3>
        <PriceSlider
          value={filters.maxPrice}
          onChange={(maxPrice) => onFiltersChange({ ...filters, maxPrice })}
        />
      </div>

      <div>
        <h3 className="font-heading text-lg text-primary mb-3">Occasion</h3>
        <div className="space-y-2">
          <OccasionOption
            label="All Occasions"
            active={filters.occasion === ALL_OCCASION}
            onClick={() => onFiltersChange({ ...filters, occasion: ALL_OCCASION })}
          />
          {OCCASION_OPTIONS.map((opt) => (
            <OccasionOption
              key={opt.value}
              label={opt.label}
              active={filters.occasion === opt.value}
              onClick={() => onFiltersChange({ ...filters, occasion: opt.value })}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <InfoBadge icon={<Heart size={16} />} title="100% Handmade" description="Every piece is made by hand with love" />
        <InfoBadge icon={<MapPin size={16} />} title="Made in Karachi" description="Proudly handmade in Pakistan" />
      </div>
    </div>
  )
}

function CategoryOption({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm transition-colors',
        active ? 'bg-secondary text-primary font-medium' : 'text-foreground/80 hover:bg-muted'
      )}
    >
      <span className="flex items-center gap-2">
        <span className={cn('size-3.5 rounded-full border-2', active ? 'border-primary bg-primary' : 'border-input')} />
        {label}
      </span>
      <span
        className={cn(
          'text-xs rounded-full px-1.5 py-0.5',
          active ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
        )}
      >
        {count}
      </span>
    </button>
  )
}

function OccasionOption({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'w-full text-left rounded-xl border px-3 py-2 text-sm transition-colors',
        active ? 'border-primary bg-secondary text-primary font-medium' : 'border-border text-foreground/80 hover:border-primary/30'
      )}
    >
      {label}
    </button>
  )
}

function InfoBadge({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-secondary/50 p-3">
      <span className="shrink-0 text-primary mt-0.5">{icon}</span>
      <div>
        <p className="text-sm font-medium text-primary">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
