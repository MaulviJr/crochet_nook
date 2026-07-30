// components/product/reviews-section.tsx

'use client'

import { SectionHeading } from '@/components/ui/section-heading'
import { RatingStars } from '@/components/ui/rating-stars'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export type ProductReview = {
  id: string
  name: string
  rating: number
  comment: string
}

const PLACEHOLDER_REVIEWS: ProductReview[] = [
  {
    id: '1',
    name: 'Areeba Khan',
    rating: 5,
    comment:
      'The gajray was even more beautiful in person. So light and comfortable. Got so many compliments. Thank you!',
  },
  {
    id: '2',
    name: 'Sana M.',
    rating: 5,
    comment:
      'Absolutely loved the quality and packaging. You can feel the love in every stitch! Will order again.',
  },
]

export function ReviewsSection({
  reviews = PLACEHOLDER_REVIEWS,
}: {
  reviews?: ProductReview[]
}) {
  if (reviews.length === 0) return null

  return (
    <section className="mt-12">
      <SectionHeading title="What our customers say" />

      <Carousel
        className="mt-6"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className="
                pl-4
                basis-full
                md:basis-1/2
              "
            >
              <div className="h-full rounded-xl bg-card ring-1 ring-foreground/10 p-4 flex gap-3">
                <div className="size-9 rounded-full bg-secondary text-primary flex items-center justify-center text-sm font-medium shrink-0">
                  {review.name.charAt(0)}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {review.name}
                    </p>

                    <RatingStars
                      rating={review.rating}
                      size={12}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {reviews.length > 2 && (
          <>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </>
        )}
      </Carousel>
    </section>
  )
}