// components/layout/site-header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MessageCircle } from 'lucide-react'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/site-config'
import { OrderListBadge } from '@/components/layout/order-list-badge'
import Image from 'next/image'
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/how-to-order', label: 'How To Order' },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="font-script text-3xl text-primary leading-none shrink-0">
          {/* {SITE_CONFIG.name} */}
          <Image
            src="/images/logo_crochet.png"
            alt="Crochet Nook Logo"
            width={150}
            height={40}
            className="object-contain"
          />
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

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex text-muted-foreground hover:text-primary"
            aria-label="Instagram"
            nativeButton={false}
            render={
              <a href={SITE_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" />
            }
          >
            <InstagramIcon size={18} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex text-muted-foreground hover:text-primary"
            aria-label="WhatsApp"
            nativeButton={false}
            render={
              <a href={buildWhatsAppUrl("Hi! I'd like to place an order.")} target="_blank" rel="noopener noreferrer" />
            }
          >
            <MessageCircle size={18} />
          </Button>

          <OrderListBadge />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden text-foreground"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </Button>
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
          <a 
          href={buildWhatsAppUrl("Hi! I'd like to place an order.")} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}