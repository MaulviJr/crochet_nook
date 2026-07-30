// app/(site)/product/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { FeatureHighlights } from '@/components/sections/home/feature-highlights'
import { ProductGallery } from '@/components/product/product-gallery'
import { ProductInformation } from '@/components/product/product-information'
import { ProductTabs } from '@/components/product/product-tabs'
import { RelatedProducts } from '@/components/product/related-products'
import { ReviewsSection } from '@/components/product/reviews-section'
import { StickyOrderSidebar } from '@/components/product/sticky-order-sidebar'
import { StickyOrderMobileBar } from '@/components/product/sticky-order-mobile-bar'
import { getProductBySlug } from '@/lib/queries/public-products'
import { CATEGORY_LABELS } from '@/lib/format'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 pb-28 lg:pb-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/shop?category=${product.category}`} className="hover:text-primary transition-colors">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInformation product={product} />
        </div>

     <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 mt-10">
  <div className="min-w-0">
    <ProductTabs product={product} />
    <RelatedProducts category={product.category} excludeId={product.id} />
    <ReviewsSection />
  </div>

  <StickyOrderSidebar />
</div>
      </div>

      <FeatureHighlights />
      {/* <FooterCTA /> */}
      <StickyOrderMobileBar />
    </>
  )
}