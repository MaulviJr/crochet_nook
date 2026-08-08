import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/site-config'

export const DEFAULT_OG_IMAGE = {
  url: '/og-default.jpg', // 1200x630 — add this to /public
  width: 1200,
  height: 630,
  alt: `${SITE_CONFIG.name} — handmade crochet bouquets, gajray & gifts`,
}

type SeoInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: { url: string; width?: number; height?: number; alt?: string }
  noIndex?: boolean
}

export function buildMetadata({ title, description, path, keywords, image, noIndex }: SeoInput): Metadata {
  const url = `${SITE_CONFIG.siteUrl}${path}`
  const ogImage = image ?? DEFAULT_OG_IMAGE

  return {
    title,
    description,
    keywords: keywords ?? [...SITE_CONFIG.defaultKeywords],
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.siteUrl }],
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: 'en_PK',
      type: 'website',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  }
}