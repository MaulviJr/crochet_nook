// app/api/upload/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { supabaseServer } from '@/lib/supabase-admin'
import {
  validateImageFile,
  generateStorageFilename,
  IMAGE_VALIDATION_MESSAGES,
  PRODUCT_IMAGES_BUCKET,
  type AllowedImageMimeType,
} from '@/lib/upload'

// Needs the Node runtime for Buffer/crypto and to talk to Supabase Storage.
export const runtime = 'nodejs'

export async function POST(req: Request) {
  // This route isn't under app/admin/(protected), so it isn't covered by
  // that layout's auth redirect — check the session ourselves.
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Expected multipart/form-data' }, { status: 400 })
  }

  const files = formData.getAll('files').filter((entry): entry is File => entry instanceof File)

  if (files.length === 0) {
    return NextResponse.json({ error: 'No files provided' }, { status: 400 })
  }

  const urls: string[] = []

  for (const file of files) {
    const validationError = validateImageFile(file)
    if (validationError) {
      return NextResponse.json({ error: IMAGE_VALIDATION_MESSAGES[validationError] }, { status: 400 })
    }

    // Safe: validateImageFile already confirmed file.type is an allowed MIME type.
    const filename = generateStorageFilename(file.type as AllowedImageMimeType)
    const path = `products/${filename}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabaseServer.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage upload failed:', uploadError)
      return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
    }

    const { data: publicUrlData } = supabaseServer.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .getPublicUrl(path)

    urls.push(publicUrlData.publicUrl)
  }

  return NextResponse.json({ urls }, { status: 201 })
}