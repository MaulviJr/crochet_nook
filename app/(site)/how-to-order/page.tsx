import type { Metadata } from 'next'
import { HowToOrderHero } from '@/components/sections/how-to-order/hero'
import { OrderSteps } from '@/components/sections/how-to-order/order-steps'
import { CustomOrderBanner } from '@/components/sections/how-to-order/custom-order-banner'
import { PoliciesSection } from '@/components/sections/how-to-order/policies'
import { ContactCTA } from '@/components/sections/how-to-order/contact-cta'

export const metadata: Metadata = {
  title: 'How to Order & Policies | Crochet Nook',
  description:
    'Everything you need to know before ordering from Crochet Nook — how to place an order on WhatsApp, our advance payment policy, and our no-refunds policy for handmade pieces.',
}

export default function HowToOrderPage() {
  return (
    <>
      <HowToOrderHero />
      <OrderSteps />
      <CustomOrderBanner />
      <PoliciesSection />
      <ContactCTA />
    </>
  )
}