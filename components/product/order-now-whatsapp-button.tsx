// components/product/order-now-whatsapp-button.tsx
'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buildSingleProductWhatsAppUrl } from '@/lib/whatsapp-order-message'
import { trackInitiateCheckout } from '@/lib/fb-pixel'
import type { Product } from '@/lib/product'

export function OrderNowWhatsAppButton({ product }: { product: Product }) {
  const url = buildSingleProductWhatsAppUrl(
    {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] ?? null,
    },
    1
  )

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      onClick={() => trackInitiateCheckout([{ id: product.id, name: product.name, price: product.price }])}
    >
      <Button type="button" size="lg" className="w-full">
        <MessageCircle size={16} /> Order Now on WhatsApp
      </Button>
    </a>
  )
}