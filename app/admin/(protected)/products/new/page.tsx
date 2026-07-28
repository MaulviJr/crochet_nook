import { ProductForm } from '@/components/admin/product-form'

export default function NewProductPage() {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-primary">New Product</h1>
        <p className="text-muted-foreground text-sm mt-1">Add a new handmade piece to the catalog</p>
      </div>
      <ProductForm mode="create" />
    </div>
  )
}