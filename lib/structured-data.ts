import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_LABELS } from '@/lib/format'
import type { Product } from '@/lib/product'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    logo: `${SITE_CONFIG.siteUrl}/icon-512.png`,
    sameAs: [SITE_CONFIG.instagramUrl],
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.siteUrl}${DEFAULT_OG_IMAGE_PATH}`,
    url: SITE_CONFIG.siteUrl,
    description: 'Handmade crochet bouquets, gajray, baby items & custom gifts, crafted in Karachi.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressCountry: 'PK',
    },
    areaServed: 'Karachi, Pakistan',
    priceRange: '$$',
    sameAs: [SITE_CONFIG.instagramUrl],
  }
}
const DEFAULT_OG_IMAGE_PATH = '/og-default.jpg'

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_CONFIG.siteUrl}${item.path}`,
    })),
  }
}

export function productSchema(product: Product) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images ?? [],
    description: product.description ?? `Handmade ${CATEGORY_LABELS[product.category] ?? product.category} from ${SITE_CONFIG.name}.`,
    category: CATEGORY_LABELS[product.category] ?? product.category,
    brand: { '@type': 'Brand', name: SITE_CONFIG.name },
    url: `${SITE_CONFIG.siteUrl}/product/${product.slug}`,
  }

  // No online checkout — orders happen over WhatsApp. Only attach a
  // schema.org Offer when there's a fixed price to report; custom-priced
  // items skip `offers` rather than fabricating a number.
  if (product.price === null) return base

  return {
    ...base,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PKR',
      price: product.price,
      availability: 'https://schema.org/InStock',
      url: `${SITE_CONFIG.siteUrl}/product/${product.slug}`,
      seller: { '@type': 'Organization', name: SITE_CONFIG.name },
    },
  }
}