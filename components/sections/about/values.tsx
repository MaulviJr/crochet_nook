// components/sections/about/values.tsx
import { HeartHandshake, PackageCheck, Flower2, Gift, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const VALUES = [
  {
    icon: <HeartHandshake size={24} />,
    title: 'Handmade with Love',
    description: 'Every piece is handmade by me with care.',
  },
  {
    icon: <PackageCheck size={24} />,
    title: 'Small Batch',
    description: 'I create in small batches to ensure quality and uniqueness.',
  },
  {
    icon: <Flower2 size={24} />,
    title: 'Made for You',
    description: "Custom orders are always welcome. Let's create something meaningful together.",
  },
  {
    icon: <Gift size={24} />,
    title: 'Thoughtful Gifting',
    description: 'Perfect for birthdays, weddings and special occasions.',
  },
  {
    icon: <MapPin size={24} />,
    title: 'Made in Karachi',
    description: 'Proudly handmade in Karachi, Pakistan.',
  },
] as const

export function ValuesSection() {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {VALUES.map((value) => (
          <Card
            key={value.title}
            className="h-full text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <CardContent className="p-6 flex flex-col items-center">
              <div className="size-14 rounded-full bg-secondary flex items-center justify-center text-primary mb-4">
                {value.icon}
              </div>
              <h3 className="font-heading text-base text-primary mb-1">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}