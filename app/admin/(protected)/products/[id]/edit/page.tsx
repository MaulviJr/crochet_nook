// app/admin/(protected)/products/[id]/edit/page.tsx
import { notFound } from 'next/navigation'
import { productService } from '@/lib/product'
import { ProductForm } from '@/components/admin/product-form'
import { BackButton } from '@/components/admin/back-button'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = await productService.getById(id).catch(() => null)
  if (!product) notFound()

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <BackButton href="/admin/products" label="Back to Products" />
        <h1 className="font-heading text-3xl text-primary">Edit Product</h1>
        <p className="text-muted-foreground text-sm mt-1">Update details for {product.name}</p>
      </div>
      <ProductForm mode="edit" product={product} />
    </div>
  )
}