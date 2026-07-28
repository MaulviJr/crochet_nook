// components/admin/dashboard/attention-alerts.tsx
import Link from 'next/link'
import { ImageOff, Tag, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { DashboardProduct } from '@/lib/dashboard'

function AlertRow({
  icon,
  product,
  message,
}: {
  icon: React.ReactNode
  product: DashboardProduct
  message: string
}) {
  return (
    <div className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
      <span className="shrink-0 text-destructive mt-0.5">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
      <Link
        href={`/admin/products/${product.id}/edit`}
        className="text-xs sm:text-sm text-primary hover:underline shrink-0 self-center"
      >
        Fix
      </Link>
    </div>
  )
}

export function DashboardAttentionAlerts({
  productsMissingImage,
  productsMissingCategory,
}: {
  productsMissingImage: DashboardProduct[]
  productsMissingCategory: DashboardProduct[]
}) {
  const hasIssues = productsMissingImage.length > 0 || productsMissingCategory.length > 0

  return (
    <div>
      <h2 className="font-heading text-lg sm:text-xl text-primary mb-3">Products Needing Attention</h2>
      <Card>
        <CardContent className="p-5 sm:p-6">
          {!hasIssues ? (
            <div className="text-center py-4">
              <CheckCircle2 size={28} className="mx-auto text-primary mb-2" />
              <p className="font-medium text-foreground">Everything looks good.</p>
              <p className="text-sm text-muted-foreground">No products require attention.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {productsMissingImage.map((product) => (
                <AlertRow
                  key={`img-${product.id}`}
                  icon={<ImageOff size={18} />}
                  product={product}
                  message="Missing product image"
                />
              ))}
              {productsMissingCategory.map((product) => (
                <AlertRow
                  key={`cat-${product.id}`}
                  icon={<Tag size={18} />}
                  product={product}
                  message="Missing or invalid category"
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}