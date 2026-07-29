// components/product/reviews-section.tsx
import { SectionHeading } from '@/components/ui/section-heading'
import { RatingStars } from '@/components/ui/rating-stars'

export type ProductReview = { id: string; name: string; rating: number; comment: string }

// UI only — there's no reviews table yet. Accepting reviews as a prop
// (with this default) means a future getProductReviews(productId)
// Supabase query is a one-line change at the call site, no component rewrite.
const PLACEHOLDER_REVIEWS: ProductReview[] = [
  {
    id: '1',
    name: 'Areeba Khan',
    rating: 5,
    comment: 'The gajray was even more beautiful in person. So light and comfortable. Got so many compliments. Thank you!',
  },
  {
    id: '2',
    name: 'Sana M.',
    rating: 5,
    comment: 'Absolutely loved the quality and packaging. You can feel the love in every stitch! Will order again.',
  },
]

export function ReviewsSection({ reviews = PLACEHOLDER_REVIEWS }: { reviews?: ProductReview[] }) {
  if (reviews.length === 0) return null

  return (
    <section className="mt-12">
      <SectionHeading title="What our customers say" />
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl bg-card ring-1 ring-foreground/10 p-4 flex gap-3">
            <div className="size-9 rounded-full bg-secondary text-primary flex items-center justify-center text-sm font-medium shrink-0">
              {r.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <RatingStars rating={r.rating} size={12} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}