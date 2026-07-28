// lib/products.ts
import { z } from 'zod'
import { supabaseServer } from '@/lib/supabase-server'

/* ============================================================
   1. SCHEMA
   ============================================================ */

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug must be lowercase, hyphen-separated'),
  category: z.enum(['gajray', 'bouquet', 'baby_item', 'custom']),
  price: z.number().positive().nullable(),
  description: z.string().optional(),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  featured: z.boolean().optional().default(false),
})

export const updateProductSchema = createProductSchema.partial()

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>

/* ============================================================
   2. REPOSITORY
   ============================================================ */

const productRepository = {
  async findAll() {
    const { data, error } = await supabaseServer
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return data
  },

  async findById(id: string) {
    const { data, error } = await supabaseServer
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async findBySlug(slug: string) {
    const { data, error } = await supabaseServer
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data
  },

  async findByCategory(category: string) {
    const { data, error } = await supabaseServer
      .from('products')
      .select('*')
      .eq('category', category)
    if (error) throw error
    return data
  },

  async create(input: CreateProductInput) {
    const { data, error } = await supabaseServer
      .from('products')
      .insert(input)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update(id: string, input: UpdateProductInput) {
    const { data, error } = await supabaseServer
      .from('products')
      .update(input)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async remove(id: string) {
    const { error } = await supabaseServer.from('products').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },
}

/* ============================================================
   3. SERVICE
   ============================================================ */

export const productService = {
  async list() {
    return productRepository.findAll()
  },

  async getById(id: string) {
    return productRepository.findById(id)
  },

  async getBySlug(slug: string) {
    return productRepository.findBySlug(slug)
  },

  async listByCategory(category: string) {
    return productRepository.findByCategory(category)
  },

  async create(rawInput: unknown) {
    const input = createProductSchema.parse(rawInput)
    return productRepository.create(input)
  },

  async update(id: string, rawInput: unknown) {
    const input = updateProductSchema.parse(rawInput)
    return productRepository.update(id, input)
  },

  async delete(id: string) {
    return productRepository.remove(id)
  },
}