// components/product/product-tabs.tsx
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/product'

const TABS = ['Description', 'Details', 'Care Instructions', 'Customization'] as const
type Tab = (typeof TABS)[number]

// Details / Care Instructions / Customization have no dedicated DB fields
// yet — rendered as static, product-relevant placeholder copy so the tab
// structure is real today. Swap in real fields later without touching layout.
export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<Tab>('Description')

  return (
    <div>
      <div className="flex gap-6 border-b border-border overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={cn(
              'pb-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap',
              active === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="py-6 text-sm text-foreground/90 leading-relaxed max-w-2xl">
        {active === 'Description' && (
          <p>
            {product.description ||
              `Our ${product.name} is carefully handcrafted with attention to every detail — lightweight, elegant, and made to last.`}
          </p>
        )}
        {active === 'Details' && (
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Length: Approx. 22–24 inches</li>
            <li>Materials: 100% Cotton yarn, Pearls, Thread</li>
            <li>Each piece is handmade — slight variations make it unique</li>
          </ul>
        )}
        {active === 'Care Instructions' && (
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Store flat in a cool, dry place</li>
            <li>Avoid direct contact with water or perfume</li>
            <li>Gently reshape petals if flattened during storage</li>
          </ul>
        )}
        {active === 'Customization' && (
          <p>
            Need it in a different color or size? We&apos;d love to create it just for you — reach
            out on WhatsApp and let&apos;s design something special together.
          </p>
        )}
      </div>
    </div>
  )
}