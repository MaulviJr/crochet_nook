// components/sections/how-to-order/contact-cta.tsx
import { MessageCircle, ArrowRight } from 'lucide-react'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/site-config'
import { trackContact } from '@/lib/fb-pixel'

export function ContactCTA() {
  return (
    <section className="px-4 sm:px-6 md:px-8 pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto bg-secondary/70 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="text-center md:text-left shrink-0">
          <h2 className="font-script text-3xl sm:text-4xl text-primary">Need Help?</h2>
          <p className="text-muted-foreground text-sm mt-1">We&apos;re just a message away.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 md:justify-center">
          <a
            href={buildWhatsAppUrl("Hi! I have a question about ordering.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm text-foreground/80 hover:text-primary transition-colors"
          >
            <span className="size-9 rounded-full bg-background flex items-center justify-center text-primary shrink-0">
              <MessageCircle size={16} />
            </span>
            <span>
              <span className="block font-medium text-foreground">Chat on WhatsApp</span>
              <span className="block text-xs text-muted-foreground">We reply quickly</span>
            </span>
          </a>

          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm text-foreground/80 hover:text-primary transition-colors"
          >
            <span className="size-9 rounded-full bg-background flex items-center justify-center text-primary shrink-0">
              <InstagramIcon size={16} />
            </span>
            <span>
              <span className="block font-medium text-foreground">DM us on Instagram</span>
              <span className="block text-xs text-muted-foreground">{SITE_CONFIG.instagramHandle}</span>
            </span>
          </a>
        </div>

        <a
          href={buildWhatsAppUrl("Hi! I'd like to place an order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto shrink-0"
           onClick={() => trackContact()}
        >
          <Button size="lg" className="w-full md:w-auto">
            Let&apos;s Create Something Beautiful <ArrowRight size={16} />
          </Button>
        </a>
      </div>
    </section>
  )
}