// components/product/product-information.tsx
import { Heart, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/ui/rating-stars'
import { AddToOrderButton } from '@/components/product/add-to-order-button'
import { OrderNowWhatsAppButton } from '@/components/product/order-now-whatsapp-button'
import { formatPrice, CATEGORY_LABELS } from '@/lib/format'
import type { Product } from '@/lib/product'

// Rating, feature list, and occasion chips have no dedicated DB columns
// yet — shown as sensible static placeholders so the design renders
// correctly today. Swap for real product.rating / product.features /
// product.occasions once those columns exist; no layout change required.
const PLACEHOLDER_FEATURES = ['Handmade with love', 'Premium cotton yarn', 'Lightweight & comfortable']
const PLACEHOLDER_OCCASIONS = ['Weddings', 'Mayun', 'Mehndi', 'Eid', 'Gifting']

export function ProductInformation({ product }: { product: Product }) {
  return (
    <div>
      <Badge variant="secondary">{CATEGORY_LABELS[product.category] ?? product.category}</Badge>

      <h1 className="font-script text-4xl sm:text-5xl text-primary mt-3">{product.name}</h1>

      <div className="flex items-center gap-2 mt-2">
        <RatingStars rating={5} />
        <span className="text-xs text-muted-foreground">Customer favorite</span>
      </div>

      <p className="font-heading text-2xl sm:text-3xl text-primary mt-4">{formatPrice(product.price)}</p>

      {product.description && (
        <p className="text-muted-foreground text-sm mt-3 max-w-md">{product.description}</p>
      )}

      <ul className="space-y-2 mt-5">
        {PLACEHOLDER_FEATURES.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-foreground/90">
            <Heart size={13} className="text-primary fill-primary shrink-0" /> {feature}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <p className="text-sm font-medium text-foreground mb-2">Perfect for</p>
        <div className="flex flex-wrap gap-2">
          {PLACEHOLDER_OCCASIONS.map((occasion) => (
            <Badge key={occasion} variant="secondary">
              {occasion}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <OrderNowWhatsAppButton product={product} />
        <AddToOrderButton product={product} />
      </div>

      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2.5">
        <Truck size={16} className="text-primary shrink-0" />
        Made to order — dispatched in 3–5 working days
      </div>
    </div>
  )
}