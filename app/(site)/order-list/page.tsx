// app/(site)/order-list/page.tsx
'use client'

import Link from 'next/link'
import { MessageCircle, ShoppingBag } from 'lucide-react'
import { trackInitiateCheckout } from '@/lib/fb-pixel'
import { FooterCTA } from '@/components/sections/home/footer-cta'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OrderListRow } from '@/components/product/order-list-row'
import { useOrderStore } from '@/lib/store/order-store'
import { useHydrated } from '@/lib/store/use-hydrated'
import { buildOrderListWhatsAppUrl } from '@/lib/whatsapp-order-message'
import { formatPrice } from '@/lib/format'

export default function OrderListPage() {
  const hydrated = useHydrated()
  const items = useOrderStore((s) => s.items)
  const subtotal = useOrderStore((s) => s.getSubtotal())
  const clearOrder = useOrderStore((s) => s.clearOrder)

  return (
    <>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-10">
        <h1 className="font-heading text-3xl text-primary mb-6">Your Order List</h1>

        {!hydrated ? null : items.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <ShoppingBag size={32} className="mx-auto text-muted-foreground mb-3" />
              <p className="font-medium text-foreground">Your Order List is empty</p>
              <p className="text-sm text-muted-foreground mt-1 mb-5">Browse the shop and add pieces you love.</p>
              <Link href="/shop"><Button>Start Shopping</Button></Link>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-5">
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <OrderListRow key={item.productId} item={item} />
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-heading text-xl text-primary">{formatPrice(subtotal)}</span>
              </div>

              <a href={buildOrderListWhatsAppUrl(items)} target="_blank" rel="noopener noreferrer" className="block mt-5"
              onClick={() =>
    trackInitiateCheckout(items.map((i) => ({ id: i.productId, name: i.name, price: i.price })))
  }>
                <Button className="w-full" size="lg">
                  <MessageCircle size={16} /> Send Order on WhatsApp
                </Button>
              </a>

              <button
                type="button"
                onClick={clearOrder}
                className="w-full text-center text-sm text-muted-foreground hover:text-destructive transition-colors mt-3"
              >
                Clear Order List
              </button>
            </CardContent>
          </Card>
        )}
      </div>

      <FooterCTA />
    </>
  )
}