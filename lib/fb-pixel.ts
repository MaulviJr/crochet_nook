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

/* ---- Crochet Nook funnel events ---- */

/** Fired when someone views a product's detail page. */
export function trackViewContent(product: { id: string; name: string; price: number | null; category: string }) {
  fbEvent('ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_category: product.category,
    content_type: 'product',
    value: product.price ?? 0,
    currency: 'PKR',
  })
}

/** Fired when someone adds a product to the Order List. */
export function trackAddToCart(product: { id: string; name: string; price: number | null; category: string }) {
  fbEvent('AddToCart', {
    content_ids: [product.id],
    content_name: product.name,
    content_category: product.category,
    content_type: 'product',
    value: product.price ?? 0,
    currency: 'PKR',
  })
}

/** Fired when someone clicks through to WhatsApp to actually place an order. */
export function trackInitiateCheckout(items: { id: string; name: string; price: number | null }[]) {
  const value = items.reduce((sum, i) => sum + (i.price ?? 0), 0)
  fbEvent('InitiateCheckout', {
    content_ids: items.map((i) => i.id),
    contents: items.map((i) => ({ id: i.id, item_price: i.price ?? 0 })),
    num_items: items.length,
    value,
    currency: 'PKR',
  })
}

/** Fired for generic "chat with us" clicks that aren't tied to a specific order. */
export function trackContact() {
  fbEvent('Contact')
}

/** Fired when someone submits the newsletter WhatsApp form. */
export function trackLead() {
  fbEvent('Lead')
}