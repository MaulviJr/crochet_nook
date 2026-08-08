
import { SiteHeader } from '@/components/layout/site-header'
import { Hero } from '@/components/sections/home/hero'
import { FeaturedProducts } from '@/components/sections/home/featured-products'
import { CategoriesPreview } from '@/components/sections/home/categories-preview'
import { Testimonials } from '@/components/sections/home/testimonials'
import { InstagramSection } from '@/components/sections/home/instagram-section'
import { FeatureHighlights } from '@/components/sections/home/feature-highlights'
import { FooterCTA } from '@/components/sections/home/footer-cta'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'


export const metadata: Metadata = buildMetadata({
  title: 'Handmade Crochet Bouquets, Gajray & Gifts in Karachi',
  description:
    'Shop handmade crochet bouquets, gajray, baby items, plushies & custom gifts — lovingly crafted in Karachi, Pakistan. Browse the catalogue and order on WhatsApp.',
  path: '/',
})
export const revalidate = 60 
export default function Home() {

  
  return (
    <>
      <SiteHeader />
      <Hero />
      <FeaturedProducts />
      <CategoriesPreview />
      <Testimonials />
      <InstagramSection />
      <FeatureHighlights />
      <FooterCTA />
    </>
  )
}