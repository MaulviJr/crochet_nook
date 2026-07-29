// lib/site-config.ts
// Centralized brand/contact constants so WhatsApp numbers, Instagram
// handles, etc. aren't duplicated across Hero, Header, and Footer.

export const SITE_CONFIG = {
  name: 'Crochet Nook',
  tagline: 'Handmade with love in Karachi, Pakistan',
  // TODO: replace with the real business WhatsApp number (country code, no +/spaces)
  whatsappNumber: '923249230067',
  instagramHandle: '@crochet_nook18',
  instagramUrl: 'https://www.instagram.com/crochet_nook18/',
  location: 'Karachi, Pakistan',
} as const

export function buildWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${SITE_CONFIG.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}