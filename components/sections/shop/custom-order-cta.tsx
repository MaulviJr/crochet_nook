// components/sections/shop/custom-order-cta.tsx
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buildWhatsAppUrl } from '@/lib/site-config'

export function CustomOrderCTA() {
  return (
    <section className="px-4 sm:px-6 md:px-8 pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto rounded-3xl bg-secondary/60 px-6 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <span className="hidden sm:flex shrink-0 size-12 rounded-full bg-primary text-primary-foreground items-center justify-center">
            <MessageCircle size={20} />
          </span>
          <div>
            <h2 className="font-heading text-xl sm:text-2xl text-primary">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              We love creating custom pieces! Let&apos;s make something special together.
            </p>
          </div>
        </div>

        <a
          href={buildWhatsAppUrl("Hi! I'd like to ask about a custom order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Button size="lg">
            <MessageCircle size={16} /> Chat on WhatsApp
          </Button>
        </a>
      </div>
    </section>
  )
}
