import type { Metadata } from 'next'
import { AboutHero } from '@/components/sections/about/hero'
import { ValuesSection } from '@/components/sections/about/values'
import { GallerySection } from '@/components/sections/about/gallery'
import { ContactStrip } from '@/components/sections/about/contact-strip'

export const metadata: Metadata = {
  title: 'About | Crochet Nook',
  description:
    'The story behind Crochet Nook — handmade crochet flowers, keychains, plushies and gifts, lovingly crafted one stitch at a time in Karachi, Pakistan.',
}

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