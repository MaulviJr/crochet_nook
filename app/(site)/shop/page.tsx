// app/(site)/shop/page.tsx
import type { Metadata } from 'next'
import { ShopHero } from '@/components/sections/shop/shop-hero'
import { ProductCatalog } from '@/components/sections/shop/product-catalog'
import { CustomOrderCTA } from '@/components/sections/shop/custom-order-cta'
import { getAllProductsForShop } from '@/lib/queries/public-products'
import { getCategoryCounts } from '@/lib/shop-filters'

export const metadata: Metadata = {
  title: 'Shop | Crochet Nook',
  description: 'Browse handmade crochet gajrays, bouquets, baby items and custom orders — all made with love in Karachi.',
}

export default async function ShopPage() {
  const products = await getAllProductsForShop()
  const categoryCounts = getCategoryCounts(products)

  return (
    <>
      <ShopHero />
      <ProductCatalog products={products} categoryCounts={categoryCounts} />
      <CustomOrderCTA />
    </>
  )
}
