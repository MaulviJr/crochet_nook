// components/ui/testimonial-card.tsx
import { Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export type Testimonial = {
  id: string
  quote: string
  /** Optional — most real testimonials come in without a name/location attached. */
  name?: string
  location?: string
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Heart size={16} className="text-primary fill-primary mb-3" />
        <p className="text-sm text-foreground/90 leading-relaxed flex-1 whitespace-pre-line">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          {testimonial.name ?? 'Verified Customer'}
          {testimonial.location && <span>· {testimonial.location}</span>}
        </div>
      </CardContent>
    </Card>
  )
}