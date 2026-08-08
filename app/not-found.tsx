import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-heading text-4xl text-primary mb-2">Page Not Found</h1>
      <p className="text-muted-foreground max-w-sm mb-6">
        We couldn&apos;t find that page — but there&apos;s plenty of handmade goodness waiting in the shop.
      </p>
      <Link href="/shop"><Button>Browse the Shop</Button></Link>
    </main>
  )
}