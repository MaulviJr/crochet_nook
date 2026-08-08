// lib/site-config.ts
// Centralized brand/contact constants so WhatsApp numbers, Instagram
// handles, etc. aren't duplicated across Hero, Header, and Footer.

export const SITE_CONFIG = {
  name: 'Crochet Nook',
  tagline: 'Handmade with love in Karachi, Pakistan',
  whatsappNumber: '923001234567',
  instagramHandle: '@crochet_nook18',
  instagramUrl: 'https://instagram.com/crochet_nook18',
  location: 'Karachi, Pakistan',
  // Placeholder until you own a domain — swap the env var in production.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://crochetnook.example.com',
  defaultKeywords: [
    'handmade crochet Karachi',
    'crochet gajray',
    'crochet bouquet Karachi',
    'handmade crochet Pakistan',
    'crochet baby gifts',
    'custom crochet gifts Pakistan',
  ],
} as const

export function buildWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${SITE_CONFIG.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}