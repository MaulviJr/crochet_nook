// components/admin/dashboard/quick-actions.tsx
import Link from 'next/link'
import { PlusCircle, ListOrdered, Store, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const ACTIONS = [
  {
    href: '/admin/products/new',
    icon: PlusCircle,
    title: 'Add Product',
    description: 'Create a new handmade piece for the catalog',
  },
  {
    href: '/admin/products',
    icon: ListOrdered,
    title: 'Manage Products',
    description: 'Edit, update, or remove existing products',
  },
  {
    href: '/',
    icon: Store,
    title: 'View Store',
    description: 'See how the shop looks to your customers',
  },
] as const

export function DashboardQuickActions() {
  return (
    <div>
      <h2 className="font-heading text-lg sm:text-xl text-primary mb-3">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACTIONS.map(({ href, icon: Icon, title, description }) => (
          <Link key={href} href={href} className="block">
            <Card className="h-full transition-colors hover:bg-muted/50 active:bg-muted">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="shrink-0 size-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground shrink-0" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}