// components/ui/price-slider.tsx
// A single-thumb range input controlling a price *ceiling* (min is fixed
// at PRICE_RANGE_MIN). Deliberately a plain <input type="range"> rather
// than a new primitive/dependency — it's fully accessible by default and
// easy to restyle.
import { cn } from '@/lib/utils'
import { PRICE_RANGE_MIN, PRICE_RANGE_MAX } from '@/lib/shop-filters'
import { formatPrice } from '@/lib/format'

export function PriceSlider({
  value,
  onChange,
  min = PRICE_RANGE_MIN,
  max = PRICE_RANGE_MAX,
  step = 100,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}) {
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Maximum price"
        className={cn(
          'w-full h-1.5 cursor-pointer appearance-none rounded-full bg-secondary accent-primary',
          '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-background [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer'
        )}
      />
      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <span>{formatPrice(min)}</span>
        <span>{value >= max ? `${formatPrice(max)}+` : formatPrice(value)}</span>
      </div>
    </div>
  )
}
