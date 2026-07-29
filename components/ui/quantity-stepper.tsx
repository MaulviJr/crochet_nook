// components/ui/quantity-stepper.tsx
'use client'

import { Minus, Plus } from 'lucide-react'

export function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
  size = 'default',
}: {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  size?: 'default' | 'sm'
}) {
  const btnSize = size === 'sm' ? 'size-6' : 'size-7'
  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrease}
        className={`${btnSize} rounded-full border border-input flex items-center justify-center text-foreground hover:bg-muted transition-colors`}
        aria-label="Decrease quantity"
      >
        <Minus size={12} />
      </button>
      <span className="text-sm font-medium w-4 text-center">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        className={`${btnSize} rounded-full border border-input flex items-center justify-center text-foreground hover:bg-muted transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus size={12} />
      </button>
    </div>
  )
}