
import { SiteHeader } from '@/components/layout/site-header'
import { FooterCTA } from '@/components/sections/home/footer-cta'
import { JsonLd } from "@/components/seo/json-ld"
import { localBusinessSchema } from "@/lib/structured-data"
// ...

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <SiteHeader />
      {children}
      <FooterCTA />
    </>
  )
}