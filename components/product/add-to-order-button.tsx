// components/product/add-to-order-button.tsx
'use client'

import { useState } from 'react'
import { Heart, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOrderStore } from '@/lib/store/order-store'
import { trackAddToCart } from '@/lib/fb-pixel'
import type { Product } from '@/lib/product'

export function AddToOrderButton({ product }: { product: Product }) {
  const addItem = useOrderStore((s) => s.addItem)
  const [justAdded, setJustAdded] = useState(false)

  function handleClick() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] ?? null,
    })
    trackAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <Button type="button" variant="outline" size="lg" onClick={handleClick} className="w-full">
      {justAdded ? (
        <>
          <Check size={16} /> Added to Order List
        </>
      ) : (
        <>
          <Heart size={16} /> Add to Order List
        </>
      )}
    </Button>
  )
}