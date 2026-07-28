// components/layout/site-header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/site-config'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="font-script text-3xl text-primary leading-none shrink-0">
          {SITE_CONFIG.name}
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon size={18} />
          </a>
          <a href={buildWhatsAppUrl("Hi! I'd like to place an order.")} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="hidden sm:inline-flex">Order on WhatsApp</Button>
            <Button size="icon" variant="default" className="sm:hidden" aria-label="Order on WhatsApp">
              <InstagramIcon size={16} className="hidden" />
              💬
            </Button>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center size-9 rounded-lg text-foreground hover:bg-muted transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 sm:px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            <InstagramIcon size={16} /> Instagram
          </a>
        </div>
      )}
    </header>
  )
}