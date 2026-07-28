// components/sections/home/featured-products.tsx
import Link from 'next/link'
import { ArrowRight, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'
import { ProductCard } from '@/components/ui/product-card'
import { getFeaturedOrRecentProducts } from '@/lib/queries/public-products'

export async function FeaturedProducts() {
  const products = await getFeaturedOrRecentProducts(4)

  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Featured Creations"
        title="Our Favorites"
        action={
          <Link href="/shop">
            <Button variant="outline">
              View all products <ArrowRight size={16} />
            </Button>
          </Link>
        }
      />

      {products.length === 0 ? (
        <Card className="mt-8">
          <CardContent className="p-12 text-center">
            <Package size={36} className="mx-auto text-muted-foreground mb-3" />
            <h3 className="font-heading text-xl text-primary mb-1">No products yet</h3>
            <p className="text-muted-foreground text-sm">
              Check back soon — new handmade pieces are on the way.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}