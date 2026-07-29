
import { SiteHeader } from '@/components/layout/site-header'
import { FooterCTA } from '@/components/sections/home/footer-cta'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    
      <SiteHeader />
      {children}
      <FooterCTA />
    </>
  )
}