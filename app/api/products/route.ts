// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { productService } from '@/lib/product'
import { revalidatePath } from 'next/cache'
export async function GET() {
  const products = await productService.list()
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const product = await productService.create(body)
      revalidatePath('/')
    revalidatePath('/shop')
    return NextResponse.json(product, { status: 201 })
  } catch (err) {
    console.error('Error creating product:', err) // Debugging line
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}