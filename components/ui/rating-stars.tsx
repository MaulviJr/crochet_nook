// components/ui/rating-stars.tsx
import { Star } from 'lucide-react'

export function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5 text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(rating) ? 'fill-primary' : 'fill-none text-muted-foreground'}
        />
      ))}
    </div>
  )
}