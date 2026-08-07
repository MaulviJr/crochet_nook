// components/sections/home/categories-preview.tsx
import { Flower2, Flower, Baby, Heart,Handbag,KeyRound } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { CategoryCard } from '@/components/ui/category-card'
import { CATEGORY_OPTIONS } from '@/lib/schemas/product'

// Marketing copy + icon per category. Colocated here (UI concern) rather
// than in lib/schemas/product.ts, which stays focused on validation.
const CATEGORY_META: Record<string, { icon: React.ReactNode; description: string }> = {
  gajray: {
    icon: <Flower2 size={26} />,
    description: 'Handmade flower gajrays for every beautiful moment',
  },
  bouquet: {
    icon: <Flower size={26} />,
    description: 'Crochet bouquets that last forever & make hearts smile',
  },
  baby_item: {
    icon: <Baby size={26} />,
    description: 'Soft, safe & cosy crochet essentials for your little ones',
  },
  bags_purses: {
    icon: <Handbag size={26} />,
    description: 'Stylish bags and purses for every occasion',
  },
  flowers: {
    icon: <Flower size={26} />,
    description: 'Beautiful crochet flowers for any celebration',
  },
  keychains: {
    icon: <KeyRound size={26} />,
    description: 'Unique keychains to keep your keys organized',
  },
  custom: {
    icon: <Heart size={26} />,
    description: "Have something special in mind? Let's create it together",
  },
}

export function CategoriesPreview() {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Shop by Category" title="Find What You Love" align="center" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
        {CATEGORY_OPTIONS.map((opt) => (
          <CategoryCard
            key={opt.value}
            href={`/shop?category=${opt.value}`}
            icon={CATEGORY_META[opt.value]?.icon}
            title={opt.label}
            description={CATEGORY_META[opt.value]?.description ?? ''}
          />
        ))}
      </div>
    </section>
  )
}