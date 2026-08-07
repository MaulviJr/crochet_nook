// lib/format.ts
export function formatPrice(price: number | null): string {
  if (price === null) return 'Custom Pricing'
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const CATEGORY_LABELS: Record<string, string> = {
  gajray: 'Gajray',
  bouquet: 'Bouquet',
  baby_item: 'Baby Item',
  custom: 'Custom Order',
  bags_purses: 'Bags & Purses',
  flowers: 'Flowers',
  keychains: 'Keychains',
}