// components/product/sticky-order-sidebar.tsx
'use client'

import Link from 'next/link'
import { MessageCircle, ShoppingBag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OrderListRow } from '@/components/product/order-list-row'
import { useOrderStore } from '@/lib/store/order-store'
import { useHydrated } from '@/lib/store/use-hydrated'
import { buildOrderListWhatsAppUrl } from '@/lib/whatsapp-order-message'
import { formatPrice } from '@/lib/format'
import { trackInitiateCheckout } from '@/lib/fb-pixel'
export function StickyOrderSidebar() {
  const hydrated = useHydrated()
  const items = useOrderStore((s) => s.items)
  const subtotal = useOrderStore((s) => s.getSubtotal())

  if (!hydrated) return null // avoids a mismatched flash before localStorage restores

  if (items.length === 0) {
    return (
      <Card className="hidden lg:block sticky top-24 h-fit">
        <CardContent className="p-6 text-center">
          <ShoppingBag size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium text-foreground">Your Order List is empty</p>
          <p className="text-xs text-muted-foreground mt-1">Add products to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hidden lg:block sticky top-24 h-fit">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-heading text-lg text-primary">Your Order List</h3>
          <span className="text-xs bg-secondary text-primary rounded-full px-2 py-0.5">{items.length}</span>
        </div>

        <div className="divide-y divide-border">
          {items.map((item) => (
            <OrderListRow key={item.productId} item={item} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
        </div>

        <a href={buildOrderListWhatsAppUrl(items)} target="_blank" rel="noopener noreferrer" className="block mt-4"
         onClick={() =>
    trackInitiateCheckout(items.map((i) => ({ id: i.productId, name: i.name, price: i.price })))
  }>
          <Button type="button" className="w-full">
            <MessageCircle size={16} /> Send Order on WhatsApp
          </Button>
        </a>

        <Link href="/order-list" className="block text-center text-sm text-primary hover:underline mt-3">
          View Full Order List →
        </Link>
      </CardContent>
    </Card>
  )
}