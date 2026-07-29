// lib/store/order-store.ts
// Single source of truth for the frontend Order List. All order state
// lives here — UI components must go through this store's actions and
// selectors only, and must never touch localStorage or Supabase directly.
// This keeps a future migration (localStorage -> Supabase-backed order
// for authenticated customers) contained entirely to this file.

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type OrderItem = {
  productId: string
  slug: string
  name: string
  price: number | null
  image: string
  quantity: number
}

type OrderState = {
  items: OrderItem[]
  addItem: (item: Omit<OrderItem, 'quantity'>, quantity?: number) => void
  removeItem: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  clearOrder: () => void
  getSubtotal: () => number
  getTotalItems: () => number
  isInOrderList: (productId: string) => boolean
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity }] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }))
      },

      increaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }))
      },

      decreaseQuantity: (productId) => {
        set((state) => ({
          items: state.items
            .map((i) => (i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        }))
      },

      clearOrder: () => set({ items: [] }),

      getSubtotal: () => get().items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      isInOrderList: (productId) => get().items.some((i) => i.productId === productId),
    }),
    {
      name: 'crochet-nook-order-list',
      partialize: (state) => ({ items: state.items }),
    }
  )
)