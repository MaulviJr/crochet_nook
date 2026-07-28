// components/layout/announcement-bar.tsx
import { Heart } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export function AnnouncementBar() {
  return (
    <div className="bg-secondary text-primary text-xs sm:text-sm py-2 text-center px-4">
      <span className="inline-flex items-center gap-1.5">
        <Heart size={12} className="fill-primary" /> {SITE_CONFIG.tagline}
      </span>
    </div>
  )
}