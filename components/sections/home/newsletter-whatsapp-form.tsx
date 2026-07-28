// components/sections/home/newsletter-whatsapp-form.tsx
'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// There's no email/newsletter backend yet, so instead of faking a signup
// that goes nowhere, this opens a WhatsApp chat — consistent with how the
// rest of the site already drives engagement through WhatsApp.
export function NewsletterWhatsAppForm() {
  const [number, setNumber] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const digitsOnly = number.replace(/\D/g, '')
    if (!digitsOnly) return
    window.open(`https://wa.me/${digitsOnly}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <Input
        type="tel"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Your WhatsApp number"
        aria-label="Your WhatsApp number"
        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
      />
      <Button type="submit" size="icon" aria-label="Send">
        <ArrowRight size={16} />
      </Button>
    </form>
  )
}