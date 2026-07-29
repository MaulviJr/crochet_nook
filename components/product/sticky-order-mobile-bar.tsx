// components/product/sticky-order-mobile-bar.tsx
// Mobile equivalent of the sidebar — a fixed bottom bar instead of
// permanently occupying screen space, per the responsiveness requirement.
'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOrderStore } from '@/lib/store/order-store'
import { useHydrated } from '@/lib/store/use-hydrated'
import { formatPrice } from '@/lib/format'

export function StickyOrderMobileBar() {
  const hydrated = useHydrated()
  const totalItems = useOrderStore((s) => s.getTotalItems())
  const subtotal = useOrderStore((s) => s.getSubtotal())

  if (!hydrated || totalItems === 0) return null

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background border-t border-border p-3 flex items-center justify-between gap-3 shadow-lg">
      <div>
        <p className="text-xs text-muted-foreground">
          {totalItems} item{totalItems > 1 ? 's' : ''}
        </p>
        <p className="font-medium text-foreground">{formatPrice(subtotal)}</p>
      </div>
      <Link href="/order-list">
        <Button type="button">
          <ShoppingBag size={16} /> View Order List
        </Button>
      </Link>
    </div>
  )
}