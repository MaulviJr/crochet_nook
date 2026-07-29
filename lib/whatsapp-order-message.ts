// lib/whatsapp-order-message.ts
// Isolated message-generation utilities — no component concatenates
// WhatsApp strings directly. Two entry points, both fed by the same
// OrderItem shape the store uses: a single-product message (product page
// "Order Now" CTA) and a full Order List message (sidebar / order-list page).
//
// Note: items with a null price (custom-priced/made-to-order) contribute
// 0 to the subtotal shown in the message — the item name still appears in
// the line list, so the recipient can follow up on pricing manually.

import { formatPrice } from '@/lib/format'
import { buildWhatsAppUrl } from '@/lib/site-config'
import type { OrderItem } from '@/lib/store/order-store'

export function buildSingleProductMessage(item: Omit<OrderItem, 'quantity'>, quantity = 1) {
  const subtotal = (item.price ?? 0) * quantity
  return [
    "Hello! I'd like to order:",
    '',
    `${quantity} × ${item.name}`,
    '',
    `Subtotal: ${formatPrice(subtotal)}`,
    '',
    'Thank you!',
  ].join('\n')
}

export function buildOrderListMessage(items: OrderItem[]) {
  if (items.length === 0) return "Hello! I'd like to place an order."

  const subtotal = items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0)
  return [
    "Hello! I'd like to order:",
    '',
    ...items.map((i) => `${i.quantity} × ${i.name}`),
    '',
    `Subtotal: ${formatPrice(subtotal)}`,
    '',
    'Thank you!',
  ].join('\n')
}

export function buildSingleProductWhatsAppUrl(item: Omit<OrderItem, 'quantity'>, quantity = 1) {
  return buildWhatsAppUrl(buildSingleProductMessage(item, quantity))
}

export function buildOrderListWhatsAppUrl(items: OrderItem[]) {
  return buildWhatsAppUrl(buildOrderListMessage(items))
}