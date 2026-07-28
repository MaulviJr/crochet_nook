// components/admin/dashboard/recent-products.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { formatPrice, formatDate, CATEGORY_LABELS } from '@/lib/format'
import type { DashboardProduct } from '@/lib/dashboard'

export function DashboardRecentProducts({ products }: { products: DashboardProduct[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-heading text-lg sm:text-xl text-primary">Recently Added Products</h2>
        <Link href="/admin/products" className="text-sm text-primary hover:underline shrink-0">
          View All Products
        </Link>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="p-10 sm:p-12 text-center">
            <Package size={36} className="mx-auto text-muted-foreground mb-3" />
            <h3 className="font-heading text-xl text-primary mb-1">No products yet</h3>
            <p className="text-muted-foreground text-sm mb-5">
              Add your first handmade piece to get started.
            </p>
            <Link href="/admin/products/new" className="text-sm text-primary hover:underline">
              Add a product →
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden py-0">
          <Table className="hidden md:table">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                      {product.images?.[0] && (
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      )}
                    </div>
                    <span className="font-medium text-foreground">{product.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {CATEGORY_LABELS[product.category] ?? product.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(product.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Mobile stacked list */}
          <div className="md:hidden divide-y divide-border">
            {products.map((product) => (
              <div key={product.id} className="p-4 flex gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                  {product.images?.[0] && (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{product.name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge variant="secondary">
                      {CATEGORY_LABELS[product.category] ?? product.category}
                    </Badge>
                    <span className="text-sm text-foreground">{formatPrice(product.price)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(product.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}