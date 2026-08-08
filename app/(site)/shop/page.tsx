// app/(site)/shop/page.tsx
import { ShopHero } from '@/components/sections/shop/shop-hero'
import { ProductCatalog } from '@/components/sections/shop/product-catalog'
import { CustomOrderCTA } from '@/components/sections/shop/custom-order-cta'
import { getAllProductsForShop } from '@/lib/queries/public-products'
import { getCategoryCounts } from '@/lib/shop-filters'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'


export const revalidate = 60;
export const metadata: Metadata = buildMetadata({
  title: 'Shop Handmade Crochet Bouquets, Gajray & Gifts',
  description:
    'Browse handmade crochet bouquets, gajray, baby items, plushies, keychains & custom gifts — all made in Karachi. Filter by category and order on WhatsApp.',
  path: '/shop',
})

// export default async function ShopPage() {
//   const products = await getAllProductsForShop()
//   const categoryCounts = getCategoryCounts(products)

//   return (
//     <>
//       <ShopHero />
//       <ProductCatalog products={products} categoryCounts={categoryCounts} />
//       <CustomOrderCTA />
//     </>
//   )
// }
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const products = await getAllProductsForShop()
  const categoryCounts = getCategoryCounts(products)

  return (
    <>
      <ShopHero />
      <ProductCatalog products={products} categoryCounts={categoryCounts} initialCategory={category} />
      <CustomOrderCTA />
    </>
  )
}