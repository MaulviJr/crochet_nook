// lib/fb-pixel.ts
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function pageview() {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView')
  }
}

// For later — e.g. firing "Lead" when someone clicks "Order on WhatsApp"
export function fbEvent(name: string, options?: Record<string, unknown>) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', name, options)
  }
}