// components/sections/home/feature-highlights.tsx
import { CircleDot, Gift, ShieldCheck, MapPin } from 'lucide-react'
import { FeatureItem } from '@/components/ui/feature-item'

const FEATURES = [
  { icon: <CircleDot size={20} />, title: '100% Handmade', description: 'Every piece is made by hand with love' },
  { icon: <Gift size={20} />, title: 'Perfect for Gifting', description: 'Thoughtful handmade gifts for every occasion' },
  { icon: <ShieldCheck size={20} />, title: 'Quality You Can Trust', description: 'Premium yarns & careful craftsmanship' },
  { icon: <MapPin size={20} />, title: 'Made in Karachi', description: 'Proudly handmade in Pakistan' },
] as const

export function FeatureHighlights() {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((f) => (
          <FeatureItem key={f.title} icon={f.icon} title={f.title} description={f.description} />
        ))}
      </div>
    </section>
  )
}