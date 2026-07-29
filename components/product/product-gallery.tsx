// components/product/product-gallery.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
// import { isRenderableImageUrl } from '@/lib/utils/image'
import { cn } from '@/lib/utils'

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center text-muted-foreground text-sm">
        No image available
      </div>
    )
  }

  function goTo(index: number) {
    setActive((index + images.length) % images.length)
  }

  return (
    <div>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-cover transition-opacity duration-300"
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
        <button
          type="button"
          className="absolute top-3 right-3 size-9 rounded-full bg-background/90 flex items-center justify-center text-primary hover:scale-105 transition-transform"
          aria-label="Add to wishlist"
        >
          <Heart size={16} />
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-background transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-background transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2 mt-3">
          {images.slice(0, 6).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                'relative aspect-square rounded-lg overflow-hidden ring-2 transition-all',
                i === active ? 'ring-primary' : 'ring-transparent hover:ring-border'
              )}
            >
              <Image src={src} alt={`${name} thumbnail ${i + 1}`} fill className="object-cover" />
              {i === 5 && images.length > 6 && (
                <span className="absolute inset-0 bg-foreground/60 text-background text-xs font-medium flex items-center justify-center">
                  +{images.length - 6}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}