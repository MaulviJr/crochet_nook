import { productService } from '@/lib/product'
import { ProductsPageClient } from '@/components/admin/products-page-client'

export default async function ProductsPage() {
  const products = await productService.list()
  return <ProductsPageClient initialProducts={products} />
}