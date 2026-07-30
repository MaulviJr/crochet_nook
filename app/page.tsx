import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { SiteHeader } from '@/components/layout/site-header'
import { Hero } from '@/components/sections/home/hero'
import { FeaturedProducts } from '@/components/sections/home/featured-products'
import { CategoriesPreview } from '@/components/sections/home/categories-preview'
import { Testimonials } from '@/components/sections/home/testimonials'
import { InstagramSection } from '@/components/sections/home/instagram-section'
import { FeatureHighlights } from '@/components/sections/home/feature-highlights'
import { FooterCTA } from '@/components/sections/home/footer-cta'
import {Suspense} from 'react'
export default function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />
   
      <CategoriesPreview />
      <Testimonials />
      <InstagramSection />
      <FeatureHighlights />
      <FooterCTA />
    </>
  )
}