// components/sections/home/instagram-section.tsx
import Image from 'next/image'
import {InstagramIcon} from '@/components/icons/instagram-icon'
import { SITE_CONFIG } from '@/lib/site-config'

// Placeholder gallery. Accepting `images` as a prop (with this default)
// keeps swapping in a real source later — a `social_posts` table or the
// Instagram Graph API — a one-line change at the call site, no rewrite.
const DEFAULT_IMAGES = [
  '/images/home_1.jpeg',
  '/images/home_2.jpeg',
  '/images/home_3.jpeg',
  '/images/home_4.jpeg',
]

export function InstagramSection({ images = DEFAULT_IMAGES }: { images?: string[] }) {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-4">
      <div className="max-w-6xl mx-auto bg-secondary/70 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="flex gap-3 shrink-0">
          {images.slice(0, 4).map((src, i) => (
            <div
              key={src}
              className={`relative size-20 sm:size-24 rounded-xl overflow-hidden shadow-sm ${i % 2 === 1 ? 'mt-4' : ''}`}
            >
              <Image src={src} alt="From our Instagram" fill className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
            </div>
          ))}
        </div>

        <div className="text-center md:text-left">
          <p className="text-xs font-medium tracking-widest text-primary uppercase mb-1">
            From Our Instagram
          </p>
          <h2 className="font-script text-3xl sm:text-4xl text-primary">A little glimpse of love</h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-sm">
            See what&apos;s new, get inspired & be part of our handmade journey.
          </p>
        <a
  href={SITE_CONFIG.instagramUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 mt-4 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
>
            <InstagramIcon size={16} /> Follow {SITE_CONFIG.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  )
}