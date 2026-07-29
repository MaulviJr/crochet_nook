// components/sections/home/testimonials.tsx
'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'

import { SectionHeading } from '@/components/ui/section-heading'
import { TestimonialCard, type Testimonial } from '@/components/ui/testimonial-card'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

// Real customer feedback (from WhatsApp / Instagram), provided directly by
// the business for use on the site. No names or locations were supplied,
// so cards render with a generic "Verified Customer" label rather than
// inventing identifying details. Swap for a Supabase-backed query later
// if a reviews table gets added — this component's shape won't need to change.
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote:
      "My parcel was delivered yesterday including a sunflower bouquet, a customised keychain, and a stuffed toy and I'm in love with these 🥹🫶🏻 So cute, adorable, and exactly the same as I wanted 🌸 Thank you so much for all the effort, understanding my thoughts, and your precious suggestions. I am 200% satisfied with your work and service — definitely gonna order again soon and highly recommend! May Almighty bless you always and protect your talent, Ameen 💐",
  },
  {
    id: '2',
    quote:
      'Amazing job! These handmade flowers are extremely detailed, beautiful, soft, and durable. They make the perfect everlasting gift. ❤️',
  },
  {
    id: '3',
    quote:
      "Received my sunflower purse parcel — beautiful work ماشاء اللہ I've already ordered two more پوٹلی purses. Best of luck, and keep up the great work!",
  },
  {
    id: '4',
    quote:
      'I just received the order and I absolutely loved these crochet gajras. You made them so beautifully, I became so happy after seeing them, and the fragrance you used on them is also so lovely. Thank you so much 🫶🏼',
  },
  {
    id: '5',
    quote:
      "I ordered hand crochet gajray for my daughter, they are super cute with the finest quality. I'll definitely shop again, jazakAllah ❤️",
  },
  {
    id: '6',
    quote: 'This exceeds my expectations. I am thoroughly satisfied with the results.',
  },
  {
    id: '7',
    quote:
      'Received my order and absolutely loved it! The handmade flowers are so beautiful and detailed, and my mother loved her Mother\'s Day gift. Thank you for the amazing work and lovely packaging 🙌🏼',
  },
]

export function Testimonials({
  testimonials = DEFAULT_TESTIMONIALS,
}: {
  testimonials?: Testimonial[]
}) {
  const plugin = React.useRef(
    Autoplay({
      delay: 4500,
      stopOnInteraction: true,
    })
  )

  if (testimonials.length === 0) return null

  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Kind Words"
        title="Loved by Our Customers"
        align="center"
      />

      <Carousel
        plugins={[plugin.current]}
        className="mt-8"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="
                pl-4
                basis-full
                md:basis-1/2
                lg:basis-1/3
              "
            >
              <TestimonialCard testimonial={testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}