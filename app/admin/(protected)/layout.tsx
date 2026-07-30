// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase-server-client'
// import { Toaster } from '@/components/ui/sonner'

// export default async function AdminLayout({ children }: { children: React.ReactNode }) {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/admin/login')

//   return (
//     <div className="min-h-screen bg-background">
//       {children}
//       <Toaster />
//     </div>
//   )
// }

// app/admin/(protected)/layout.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { Toaster } from '@/components/ui/sonner'
import { AdminNav } from '@/components/admin/admin-nav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="md:pl-64">{children}</main>
      <Toaster />
    </div>
  )
}