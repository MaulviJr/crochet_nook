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
    name: 'Verified Customer',
    rating: 5,
    comment:
      "Received my sunflower purse parcel — beautiful work ماشاء اللہ I've already ordered two more پوٹلی purses. Best of luck, and keep up the great work!",
  },
  {
    id: '2',
    name: 'Verified Customer',
    rating: 5,
    comment:
      "I ordered hand crochet gajray for my daughter, they are super cute with the finest quality. I'll definitely shop again, jazakAllah ❤️",
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