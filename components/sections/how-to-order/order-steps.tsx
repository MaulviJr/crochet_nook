// components/sections/how-to-order/order-steps.tsx
import { MessageCircle, ClipboardList, CreditCard, Gift, Heart } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { Card, CardContent } from '@/components/ui/card'

const STEPS = [
  {
    icon: <Heart size={22} />,
    title: 'Choose Your Favorites',
    description: 'Browse our collection and shortlist the items you love.',
  },
  {
    icon: <MessageCircle size={22} />,
    title: 'Share on WhatsApp',
    description: 'Send us your chosen items, any custom requests, and occasion details.',
  },
  {
    icon: <ClipboardList size={22} />,
    title: 'Get Confirmation',
    description: "We'll check availability and share the total along with payment details.",
  },
  {
    icon: <CreditCard size={22} />,
    title: 'Make Advance Payment',
    description: 'Orders are confirmed only after advance payment is received.',
  },
  {
    icon: <Gift size={22} />,
    title: 'We Create & Deliver',
    description: 'Your order is handmade with love and delivered to you.',
  },
] as const

export function OrderSteps() {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16 max-w-6xl mx-auto">
      <SectionHeading eyebrow="How To Order" title="Five Simple Steps" align="center" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mt-8">
        {STEPS.map((step, i) => (
          <Card
            key={step.title}
            className="h-full text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <CardContent className="p-6 flex flex-col items-center">
              <span className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-3">
                {i + 1}
              </span>
              <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-primary mb-4">
                {step.icon}
              </div>
              <h3 className="font-heading text-base text-primary mb-1">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}