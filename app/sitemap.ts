import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/site-config'
import { getAllProductSlugsForSitemap } from '@/lib/queries/public-products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_CONFIG.siteUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_CONFIG.siteUrl}/shop`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_CONFIG.siteUrl}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_CONFIG.siteUrl}/how-to-order`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const products = await getAllProductSlugsForSitemap()
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_CONFIG.siteUrl}/product/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}