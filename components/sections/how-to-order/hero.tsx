// components/sections/how-to-order/hero.tsx
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export function HowToOrderHero() {
  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'How to Order & Policies' }]} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16 grid md:grid-cols-2 gap-10 md:gap-8 items-center">
        <div>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary mb-4">
            How to Order
          </span>

          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-primary leading-[1.1]">
            How to Order
            <br />
            &amp; Our Policies
          </h1>

          <div className="flex items-center gap-2 mt-5 text-primary/50" aria-hidden="true">
            <span className="h-px w-10 bg-primary/30" />
            <Heart size={12} className="fill-primary/40 text-primary/40" />
            <span className="h-px w-10 bg-primary/30" />
          </div>

          <p className="text-muted-foreground mt-5 max-w-md">
            Thank you for supporting handmade! Here&apos;s everything you need to know before
            placing your order.
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-lg">
            {/* Placeholder photography — replace with a real lifestyle photo
                at /public/images/how-to-order/hero.jpg */}
            <Image
              src="/images/how-to-order.png"
              alt="Handmade crochet heart and yarn, wrapped with love"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}