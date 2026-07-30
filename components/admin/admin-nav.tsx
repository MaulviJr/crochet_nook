// components/admin/admin-nav.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Store, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import LogoutButton from '@/components/Logout'
import { SITE_CONFIG } from '@/lib/site-config'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package, exact: false },
] as const

function isActive(pathname: string, href: string, exact: boolean) {
  return exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
        const active = isActive(pathname, href, exact)
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/80 hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        )
      })}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
      >
        <Store size={18} />
        View Store
      </a>
    </nav>
  )
}

export function AdminNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:border-r md:border-border md:bg-card md:z-30">
        <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
          <Link href="/admin" className="font-script text-3xl text-primary leading-none">
            {SITE_CONFIG.name}
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavLinks pathname={pathname} />
        </div>
        <div className="p-4 border-t border-border">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-40 bg-background border-b border-border">
        <div className="h-16 flex items-center justify-between px-4">
          <Link href="/admin" className="font-script text-2xl text-primary leading-none">
            {SITE_CONFIG.name}
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        {open && (
          <div className="border-t border-border px-4 py-4 space-y-4">
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
            <div className="pt-3 border-t border-border">
              <LogoutButton />
            </div>
          </div>
        )}
      </header>
    </>
  )
}