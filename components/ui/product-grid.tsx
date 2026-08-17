// components/ui/product-grid.tsx
import { ProductCard } from '@/components/ui/product-card'
import type { Product } from '@/lib/product'

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}