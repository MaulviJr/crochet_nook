// components/admin/dashboard/stat-cards.tsx
import { Package, Grid3x3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode
  label: string
  value: number
  hint: string
}) {
  return (
    <Card>
      <CardContent className="p-5 sm:p-6 flex items-center gap-4">
        <div className="shrink-0 size-11 sm:size-12 rounded-xl bg-secondary flex items-center justify-center text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
          <p className="font-heading text-2xl sm:text-3xl text-primary leading-tight">{value}</p>
          <p className="text-xs text-muted-foreground truncate">{hint}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardStatCards({
  totalProducts,
  totalCategories,
}: {
  totalProducts: number
  totalCategories: number
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StatCard
        icon={<Package size={22} />}
        label="Products"
        value={totalProducts}
        hint="Products in your catalog"
      />
      <StatCard
        icon={<Grid3x3 size={22} />}
        label="Categories"
        value={totalCategories}
        hint="Available categories"
      />
    </div>
  )
}