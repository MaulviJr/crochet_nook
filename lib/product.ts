// lib/products.ts
// Replaces: lib/schemas/product.schema.ts, lib/repositories/product.repository.ts,
// lib/services/product.service.ts — all consolidated here since this project only
// has one real entity. Split into separate files later only if this genuinely grows.

import { z } from 'zod'
import { supabaseServer } from '@/lib/supabase-server'

/* ============================================================
   1. SCHEMA — validation rules (was product.schema.ts)
   ============================================================ */

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['gajray', 'bouquet', 'baby_item', 'custom']),
  price: z.number().positive().nullable(), // null = "custom pricing"
  description: z.string().optional(),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  featured: z.boolean().optional().default(false),
})

// Update allows partial fields — you don't want to resubmit the whole product to change one field
export const updateProductSchema = createProductSchema.partial()

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>

/* ============================================================
   2. REPOSITORY — raw Supabase queries (was product.repository.ts)
   Only this section should ever touch supabaseServer directly.
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

  async findByCategory(category: string) {
    const { data, error } = await supabaseServer
      .from('products')
      .select('*')
      .eq('category', category)
    if (error) throw error
    return data
  },

  async create(input: CreateProductInput) {
    console.log('Creating product with input:', input) // Debugging line
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
   3. SERVICE — validation + orchestration (was product.service.ts)
   This is what route.ts and Server Components should import.
   Nothing outside this file should call productRepository directly.
   ============================================================ */

export const productService = {
  async list() {
    return productRepository.findAll()
  },

  async getById(id: string) {
    return productRepository.findById(id)
  },

  async listByCategory(category: string) {
    return productRepository.findByCategory(category)
  },

  async create(rawInput: unknown) {
    const input = createProductSchema.parse(rawInput) // throws ZodError if invalid
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