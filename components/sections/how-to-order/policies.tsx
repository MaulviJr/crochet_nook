// components/sections/how-to-order/policies.tsx
import { ShieldCheck, HeartHandshake } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { Card, CardContent } from '@/components/ui/card'

type Policy = {
  icon: React.ReactNode
  title: string
  body: string
  note: string
}

const POLICIES: Policy[] = [
  {
    icon: <ShieldCheck size={24} />,
    title: 'Advance Payment Only',
    body: 'Every order is made by hand, just for you. Because materials and time are set aside for your piece the moment we begin, work only starts once the advance payment has been received.',
    note: 'Your support helps our small business grow. Thank you.',
  },
  {
    icon: <HeartHandshake size={24} />,
    title: 'No Refunds or Returns',
    body: "Each item is handmade specifically for the customer who ordered it, so unfortunately we're unable to offer refunds or returns once an order is confirmed.",
    note: 'Every stitch is made with love and care.',
  },
]

export function PoliciesSection() {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Good to Know" title="Our Policies" align="center" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 max-w-3xl mx-auto">
        {POLICIES.map((policy) => (
          <Card key={policy.title} className="h-full text-center">
            <CardContent className="p-6 sm:p-8 flex flex-col items-center">
              <div className="size-14 rounded-full bg-secondary flex items-center justify-center text-primary mb-4">
                {policy.icon}
              </div>
              <h3 className="font-script text-3xl text-primary mb-1">{policy.title}</h3>
              <div className="flex items-center gap-2 my-2 text-primary/40" aria-hidden="true">
                <span className="h-px w-8 bg-primary/30" />
                <span className="size-1.5 rounded-full bg-primary/40" />
                <span className="h-px w-8 bg-primary/30" />
              </div>
              <p className="text-muted-foreground text-sm">{policy.body}</p>
              <p className="mt-5 rounded-2xl bg-secondary/60 px-4 py-3 text-xs sm:text-sm text-primary">
                {policy.note}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}