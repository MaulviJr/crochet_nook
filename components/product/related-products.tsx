// components/product/related-products.tsx
import { SectionHeading } from '@/components/ui/section-heading'
import { ProductCard } from '@/components/ui/product-card'
import { getRelatedProducts } from '@/lib/queries/public-products'

export async function RelatedProducts({ category, excludeId }: { category: string; excludeId: string }) {
  const products = await getRelatedProducts(category, excludeId, 5)
  if (products.length === 0) return null

  return (
    <section className="mt-12">
      <SectionHeading title="You may also love" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}