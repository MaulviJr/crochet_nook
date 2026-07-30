// components/admin/back-button.tsx
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function BackButton({ href, label = 'Back' }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
    >
      <ArrowLeft size={16} />
      {label}
    </Link>
  )
}