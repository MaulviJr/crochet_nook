// components/sections/home/hero.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Sparkles, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buildWhatsAppUrl } from '@/lib/site-config'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20 grid md:grid-cols-2 gap-10 md:gap-8 items-center">
        <div>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary mb-4">
            Handmade Crochet Creations
          </span>

          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-primary leading-[1.1]">
            Little things,
            <br />
            made with love
          </h1>

          <p className="text-muted-foreground mt-5 max-w-md">
            From delicate gajrays to cozy baby items and custom crochet gifts — each piece is
            handcrafted in Karachi with love, care and attention to detail.
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <Link href="/shop">
              <Button size="lg">Shop the Collection</Button>
            </Link>
            <a href={buildWhatsAppUrl("Hi! I'd like to place an order.")} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">Order on WhatsApp</Button>
            </a>
          </div>

          <div className="flex flex-wrap gap-6 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Heart size={14} /> Small Batch</span>
            <span className="flex items-center gap-1.5"><Sparkles size={14} /> Premium Quality</span>
            <span className="flex items-center gap-1.5"><Gift size={14} /> Made with Love</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-lg">
            {/* Placeholder photography — replace with real product photos
                uploaded via the admin panel / Supabase Storage. */}
            <Image
              src="https://jkefcunncwgayrwwyjmq.supabase.co/storage/v1/object/public/product-images/products/268c3284-a308-4451-9255-a44885f532ff.png"
              alt="Handmade crochet gajray and flowers"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-5 -left-5 sm:bottom-6 sm:left-6 size-24 sm:size-28 rounded-full bg-primary text-primary-foreground flex flex-col items-center justify-center text-center text-xs font-medium px-2 shadow-lg">
            <Heart size={16} className="mb-1" />
            Handmade with love in Karachi
          </div>
        </div>
      </div>
    </section>
  )
}