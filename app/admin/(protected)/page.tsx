// app/admin/(protected)/page.tsx
import { getDashboardData } from '@/lib/dashboard'
import { DashboardGreeting } from '@/components/admin/dashboard/greeting'
import { DashboardStatCards } from '@/components/admin/dashboard/stat-cards'
import { DashboardQuickActions } from '@/components/admin/dashboard/quick-actions'
import { DashboardRecentProducts } from '@/components/admin/dashboard/recent-products'
import { DashboardAttentionAlerts } from '@/components/admin/dashboard/attention-alerts'

export default async function AdminPage() {
  const {
    totalProducts,
    totalCategories,
    recentProducts,
    productsMissingImage,
    productsMissingCategory,
  } = await getDashboardData()

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-6 sm:space-y-8">
      <DashboardGreeting />

      <DashboardStatCards totalProducts={totalProducts} totalCategories={totalCategories} />

      <DashboardQuickActions />

      <DashboardRecentProducts products={recentProducts} />

      <DashboardAttentionAlerts
        productsMissingImage={productsMissingImage}
        productsMissingCategory={productsMissingCategory}
      />
    </div>
  )
}