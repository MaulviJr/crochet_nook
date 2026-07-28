// components/sections/home/footer-cta.tsx
import Link from 'next/link'
import { MapPin, Phone } from 'lucide-react'
import {InstagramIcon} from '@/components/icons/instagram-icon'
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/site-config'
import { NewsletterWhatsAppForm } from '@/components/sections/home/newsletter-whatsapp-form'

export function FooterCTA() {
  return (
    
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-script text-3xl">{SITE_CONFIG.name}</p>
          <p className="text-primary-foreground/70 text-sm mt-3 max-w-xs">
            Handmade crochet creations made with love in Karachi. Thank you for supporting small
            & handmade! 💜
          </p>
        </div>

        <div>
          <p className="font-medium mb-3">Quick Links</p>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>
              <Link href="/shop" className="hover:text-primary-foreground transition-colors">Shop</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary-foreground transition-colors">About</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium mb-3">Connect</p>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Phone size={14} /> Order on WhatsApp
              </a>
            </li>
            <li>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <InstagramIcon size={14} /> Instagram
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} /> {SITE_CONFIG.location}
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium mb-3">Love Notes</p>
          <p className="text-sm text-primary-foreground/70">
            Join our little community for updates, new launches & handmade love.
          </p>
          <NewsletterWhatsAppForm />
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 text-xs text-primary-foreground/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>{SITE_CONFIG.tagline}</p>
        </div>
      </div>
    </footer>
    
  )
}