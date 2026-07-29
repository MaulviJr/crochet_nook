// components/product/order-list-row.tsx
// Shared row UI — used by both the product-page sidebar and the future
// /order-list page, so the two never drift out of sync.
'use client'

import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { QuantityStepper } from '@/components/ui/quantity-stepper'
// import { isRenderableImageUrl } from '@/lib/image'
import { formatPrice } from '@/lib/format'
import { useOrderStore, type OrderItem } from '@/lib/store/order-store'

export function OrderListRow({ item }: { item: OrderItem }) {
  const increaseQuantity = useOrderStore((s) => s.increaseQuantity)
  const decreaseQuantity = useOrderStore((s) => s.decreaseQuantity)
  const removeItem = useOrderStore((s) => s.removeItem)

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="relative size-12 rounded-lg overflow-hidden bg-muted shrink-0">
        
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">{formatPrice(item.price)}</p>
        <div className="mt-1">
          <QuantityStepper
            quantity={item.quantity}
            onIncrease={() => increaseQuantity(item.productId)}
            onDecrease={() => decreaseQuantity(item.productId)}
            size="sm"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item.productId)}
        className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
        aria-label={`Remove ${item.name}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}