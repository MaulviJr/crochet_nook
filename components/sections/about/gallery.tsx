// components/sections/about/gallery.tsx
import Image from 'next/image'

// Placeholder gallery. Accepting `images` as a prop (with this default)
// mirrors the InstagramSection pattern on the homepage, so swapping in real
// product photography — or a Supabase-backed source later — stays a
// one-line change at the call site.
const DEFAULT_IMAGES = [
  { src: '/images/about/gallery/1.jpg', alt: 'Handmade crochet flower gajray' },
  { src: '/images/about/gallery/2.jpg', alt: 'Crochet flower bouquet wrapped for gifting' },
  { src: '/images/about/gallery/3.jpg', alt: 'Handmade crochet bunny hat' },
  { src: '/images/about/gallery/4.jpg', alt: 'Personalized crochet daisy keychain' },
]

export function GallerySection({
  images = DEFAULT_IMAGES,
}: {
  images?: { src: string; alt: string }[]
}) {
  return (
    <section className="px-4 sm:px-6 md:px-8 pb-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {images.slice(0, 4).map((image) => (
          <div
            key={image.src}
            className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </section>
  )
}