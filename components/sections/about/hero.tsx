// components/sections/about/hero.tsx
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16 grid md:grid-cols-2 gap-10 md:gap-8 items-center">
        <div>
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-primary leading-[1.1] flex items-center gap-2">
            Our Story
            <Heart size={28} className="text-primary/50 fill-primary/20 shrink-0" aria-hidden="true" />
          </h1>

          <div className="flex items-center gap-2 mt-4 text-primary/50" aria-hidden="true">
            <span className="h-px w-10 bg-primary/30" />
            <Heart size={12} className="fill-primary/40 text-primary/40" />
            <span className="h-px w-10 bg-primary/30" />
          </div>

          <div className="mt-6 space-y-4 text-muted-foreground max-w-md">
            <p>
              Hi, I&apos;m the heart behind <span className="text-primary font-medium">Crochet Nook</span>. 💚
            </p>
            <p>
              What started as a simple love for crochet slowly became my happy place — a place
              where I could turn yarn into something meaningful. Every flower, keychain, plushie,
              and handmade piece is carefully crafted by me, one stitch at a time.
            </p>
            <p>
              For me, crochet isn&apos;t just about making products; it&apos;s about creating
              little pieces of happiness that become part of your special moments.
            </p>
            <p>
              Thank you for supporting my dream and choosing handmade, it truly means the world
              to me.
            </p>
            <p className="font-script text-2xl text-primary">~ Neha ♡</p>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-lg">
            {/* Placeholder photography — replace with a real lifestyle photo
                at /public/images/about/hero.jpg */}
            <Image
              src="/images/about.jpeg"
              alt="A handmade crochet heart keychain surrounded by dried flowers"
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