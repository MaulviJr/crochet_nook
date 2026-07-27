// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { productService } from '@/lib/product'

export async function GET(_req: Request,{ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  const product = await productService.getById(id)
  return NextResponse.json(product)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json()
    const { id } = await params;
    const product = await productService.update(id, body)
    return NextResponse.json(product)
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  
   const { id } = await params;
   console.log('Received DELETE request for product:', id) // Debugging line
  await productService.delete(id)
  return NextResponse.json({ success: true })
}