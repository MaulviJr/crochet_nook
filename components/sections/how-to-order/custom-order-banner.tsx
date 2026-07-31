// components/sections/how-to-order/custom-order-banner.tsx
import { Flower } from 'lucide-react'

export function CustomOrderBanner() {
  return (
    <section className="px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto bg-secondary/70 rounded-3xl px-6 py-6 sm:px-10 sm:py-7 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <Flower size={20} className="text-primary shrink-0" aria-hidden="true" />
        <p className="text-primary text-sm sm:text-base max-w-2xl">
          For custom orders, please share as many reference photos and details as possible so we
          can create something truly special for you.
        </p>
      </div>
    </section>
  )
}