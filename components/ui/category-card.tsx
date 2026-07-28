// components/ui/category-card.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function CategoryCard({
  href,
  icon,
  title,
  description,
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full text-center transition-shadow hover:shadow-md">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-primary mb-4 transition-transform group-hover:scale-105">
            {icon}
          </div>
          <h3 className="font-heading text-lg text-primary mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
          <span className="mt-4 size-7 rounded-full bg-secondary flex items-center justify-center text-primary">
            <ArrowRight size={14} />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}