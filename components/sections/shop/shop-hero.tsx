// components/sections/shop/shop-hero.tsx
import Image from 'next/image'
import { Heart } from 'lucide-react'

export function ShopHero() {
  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-primary leading-[1.1] flex items-center gap-3">
            Our Collection
            <Heart size={28} className="text-primary/50 shrink-0" aria-hidden="true" />
          </h1>
          <p className="text-muted-foreground mt-4 max-w-md">
            Thoughtfully crocheted pieces, made in small batches with love and attention to detail.
          </p>
        </div>

       <div className="relative h-56 md:h-64 rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/images/login-hero.webp"
            alt="Handmade crochet flower bouquet"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}
