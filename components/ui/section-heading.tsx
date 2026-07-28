// components/ui/section-heading.tsx
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center sm:text-center',
        className
      )}
    >
      <div className={cn(align === 'center' && 'flex flex-col items-center')}>
        {eyebrow && (
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-1">
            {eyebrow}
          </p>
        )}
        <h2 className="font-script text-4xl sm:text-5xl text-primary">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-sm mt-2 max-w-md">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}