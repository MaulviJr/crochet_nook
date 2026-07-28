'use client'

import { Button } from '@/components/ui/button'

export default function ProductsError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8 text-center">
      <p className="text-destructive font-medium mb-4">Couldn't load products: {error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}