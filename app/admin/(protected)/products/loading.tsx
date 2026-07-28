import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-4">
      <Skeleton className="h-9 w-48" />
      <Skeleton className="h-4 w-72" />
      <div className="space-y-3 mt-6">
        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
      </div>
    </div>
  )
}