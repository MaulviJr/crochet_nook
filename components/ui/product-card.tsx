// components/ui/product-card.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice, CATEGORY_LABELS } from '@/lib/format'
import { cn } from '@/lib/utils'

import type { Product } from '@/lib/product'

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0]
  // UI-only wishlist toggle — nothing is persisted (no wishlist table yet).
  const [wishlisted, setWishlisted] = useState(false)

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      <Card className="overflow-hidden py-0 h-full transition-shadow hover:shadow-md">
        <div className="relative aspect-square bg-muted">
          {(image) ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
              No image
            </div>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setWishlisted((w) => !w)
            }}
            aria-pressed={wishlisted}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-2 right-2 size-8 rounded-full bg-background/90 flex items-center justify-center text-primary transition-transform hover:scale-110"
          >
            <Heart size={15} className={cn('transition-colors', wishlisted && 'fill-primary')} />
          </button>
        </div>
        <div className="p-3 sm:p-4">
          <p className="font-medium text-foreground text-sm sm:text-base truncate">{product.name}</p>
          <p className="text-primary text-sm mt-0.5">{formatPrice(product.price)}</p>
          <Badge variant="secondary" className="mt-2">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </Badge>
        </div>
      </Card>
    </Link>
  )
}
