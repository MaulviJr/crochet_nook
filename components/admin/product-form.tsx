'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ZodError } from 'zod'
import { toast } from 'sonner'
import { createProductSchema, CATEGORY_OPTIONS, type CreateProductInput } from '@/lib/schemas/product'
import { slugify } from '@/lib/format'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const MAX_DESCRIPTION = 300

export function ProductForm() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [category, setCategory] = useState('gajray')
  const [isCustomPrice, setIsCustomPrice] = useState(false)
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imagesInput, setImagesInput] = useState('')
  const [featured, setFeatured] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  function handleNameChange(value: string) {
    setName(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  function buildPayload(): unknown {
    return {
      name: name.trim(),
      slug: slug.trim(),
      category,
      price: isCustomPrice ? null : price ? Number(price) : undefined,
      description: description.trim() || undefined,
      images: imagesInput.split(',').map((url) => url.trim()).filter(Boolean),
      featured,
    }
  }

  async function submit(redirectAfter: boolean) {
    setErrors({})
    let validated: CreateProductInput
    try {
      validated = createProductSchema.parse(buildPayload())
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {}
        err.issues.forEach((issue) => { fieldErrors[issue.path[0] as string] = issue.message })
        setErrors(fieldErrors)
      }
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Failed to create product')
      }

      toast.success('Product created successfully')

      if (redirectAfter) {
        router.push('/admin/products')
        router.refresh()
      } else {
        setName(''); setSlug(''); setSlugTouched(false); setPrice('')
        setIsCustomPrice(false); setDescription(''); setImagesInput(''); setFeatured(false)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(true) }} className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-5">
          <h2 className="font-heading text-2xl text-primary">Basic Details</h2>

          <Field label="Product Name" required error={errors.name}>
            <Input value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g. Rose Gajray" required />
          </Field>

          <Field label="URL Slug" required error={errors.slug} hint="Auto-generated from the name — edit if you want a custom URL">
            <Input value={slug} onChange={(e) => { setSlug(e.target.value); setSlugTouched(true) }} placeholder="rose-gajray" required />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Category" required error={errors.category}>
              <Select value={category}   onValueChange={(value) => {
    if (value) {
      setCategory(value)
    }
  }}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((opt) => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Price (PKR)" error={errors.price}>
              <div className="space-y-2">
                <Input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1800" disabled={isCustomPrice} />
                <div className="flex items-center gap-2">
                  <Checkbox id="custom-price" checked={isCustomPrice} onCheckedChange={(checked) => setIsCustomPrice(checked === true)} />
                  <Label htmlFor="custom-price" className="text-sm text-muted-foreground font-normal">
                    This is a custom-priced / made-to-order item
                  </Label>
                </div>
              </div>
            </Field>
          </div>

          <Field label="Description" error={errors.description} hint={`${description.length}/${MAX_DESCRIPTION} characters`}>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION))} placeholder="A short, warm description of this piece..." rows={4} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-5">
          <h2 className="font-heading text-2xl text-primary">Photos</h2>
          {/* Placeholder until Phase 5 builds real Supabase Storage upload */}
          <Field label="Image URLs" required error={errors.images} hint="Comma-separated URLs — replace with real upload in Phase 5">
            <Textarea value={imagesInput} onChange={(e) => setImagesInput(e.target.value)} placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg" rows={2} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Checkbox id="featured" checked={featured} onCheckedChange={(checked) => setFeatured(checked === true)} />
            <Label htmlFor="featured" className="text-sm font-medium text-foreground">
              Feature this product on the homepage
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button type="button" variant="outline" onClick={() => router.push('/admin/products')} disabled={submitting}>Cancel</Button>
        <Button type="button" variant="secondary" onClick={() => submit(false)} disabled={submitting}>
          {submitting ? 'Saving...' : 'Save & Add Another'}
        </Button>
        <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save Product'}</Button>
      </div>
    </form>
  )
}

function Field({ label, required, error, hint, children }: {
  label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode
}) {
  return (
    <div>
      <Label className="mb-1.5 block">{label} {required && <span className="text-destructive">*</span>}</Label>
      {children}
      {error ? <p className="text-xs text-destructive mt-1">{error}</p> : hint ? <p className="text-xs text-muted-foreground mt-1">{hint}</p> : null}
    </div>
  )
}