// components/sections/about/contact-strip.tsx
import { MessageCircle, Heart } from 'lucide-react'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/site-config'

export function ContactStrip() {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16 max-w-6xl mx-auto">
      <div className="bg-secondary/70 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <a
          href={SITE_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-left flex-1 hover:opacity-80 transition-opacity"
        >
          <span className="size-11 rounded-full bg-background flex items-center justify-center text-primary shrink-0">
            <InstagramIcon size={18} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">
              Follow us on Instagram
            </span>
            <span className="block text-xs text-muted-foreground">
              For new creations, behind-the-scenes and happy customer stories.
            </span>
          </span>
        </a>

        <div className="hidden md:block w-px self-stretch bg-primary-foreground/20" aria-hidden="true" />

        <a
          href={buildWhatsAppUrl("Hi! I'd like to know more about Crochet Nook.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-left flex-1 hover:opacity-80 transition-opacity"
        >
          <span className="size-11 rounded-full bg-background flex items-center justify-center text-primary shrink-0">
            <MessageCircle size={18} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">
              Chat with us on WhatsApp
            </span>
            <span className="block text-xs text-muted-foreground">
              For orders, custom requests and any questions!
            </span>
          </span>
        </a>

        <a
          href={buildWhatsAppUrl("Hi! I'd like to place an order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto shrink-0"
        >
          <Button size="lg" className="w-full md:w-auto">
            Let&apos;s Connect <Heart size={16} />
          </Button>
        </a>
      </div>
    </section>
  )
}