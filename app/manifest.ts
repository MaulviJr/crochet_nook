import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} — Handmade Crochet Karachi`,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#fdf7fb',
    theme_color: '#5c2a52',
    icons: [
      { src: '/icon-192.jpg', sizes: '192x192', type: 'image/jpg' },
      { src: '/icon-512.jpg', sizes: '512x512', type: 'image/jpg' },
    ],
  }
}