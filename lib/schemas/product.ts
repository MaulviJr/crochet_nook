// lib/schemas/product.ts
// No Supabase imports here on purpose — this must be safely importable
// from Client Components (the product form) as well as server code.

import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug must be lowercase, hyphen-separated'),
  category: z.enum(['gajray', 'bouquet', 'baby_item', 'custom', 'bags_purses', 'flowers', 'keychains']),
  price: z.number().positive().nullable(),
  description: z.string().optional(),
  images: z.array(z.string().url()).min(1, 'At least one image URL is required'),
  featured: z.boolean().optional().default(false),
})

export const updateProductSchema = createProductSchema.partial()

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>

export const CATEGORY_OPTIONS = [
  { value: 'gajray', label: 'Gajray' },
  { value: 'bouquet', label: 'Bouquet' },
  { value: 'baby_item', label: 'Baby Item' },
  { value: 'bags_purses', label: 'Bags & Purses' },
  { value: 'flowers', label: 'Flowers' },
  { value: 'keychains', label: 'Keychains' },
  { value: 'custom', label: 'Custom Order' },
] as const