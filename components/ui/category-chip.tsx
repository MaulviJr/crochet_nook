// components/ui/category-chip.tsx
import { cn } from '@/lib/utils'

export function CategoryChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count?: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-background text-foreground/80 hover:border-primary/40 hover:text-primary'
      )}
    >
      {label}
      {typeof count === 'number' && (
        <span className={cn('text-xs', active ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
          {count}
        </span>
      )}
    </button>
  )
}
