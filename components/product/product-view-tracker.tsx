// components/product/product-view-tracker.tsx
'use client'

import { useEffect } from 'react'
import { trackViewContent } from '@/lib/fb-pixel'
import type { Product } from '@/lib/product'

export function ProductViewTracker({ product }: { product: Product }) {
  useEffect(() => {
    trackViewContent({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    })
    // Only re-fire if the viewed product actually changes (e.g. client nav
    // between product pages), not on every unrelated re-render.
  }, [product.id])

  return null
}