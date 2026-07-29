// components/layout/order-list-badge.tsx
'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOrderStore } from '@/lib/store/order-store'
import { useHydrated } from '@/lib/store/use-hydrated'

export function OrderListBadge() {
  const hydrated = useHydrated()
  const totalItems = useOrderStore((s) => s.getTotalItems())

  return (
    <Link href="/order-list">
      <Button size="sm" variant="secondary" className="relative">
        <ShoppingBag size={16} /> Order List
        {hydrated && totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>
    </Link>
  )
}