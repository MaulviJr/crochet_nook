import type { Metadata } from 'next'
import { AboutHero } from '@/components/sections/about/hero'
import { ValuesSection } from '@/components/sections/about/values'
import { GallerySection } from '@/components/sections/about/gallery'
import { ContactStrip } from '@/components/sections/about/contact-strip'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About Crochet Nook — Handmade in Karachi',
  description:
    "Meet Neha, the maker behind Crochet Nook — handcrafting crochet bouquets, gajray and gifts in Karachi with care and quality yarns.",
  path: '/about',
})
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ValuesSection />
      <GallerySection />
      <ContactStrip />
    </>
  )
}