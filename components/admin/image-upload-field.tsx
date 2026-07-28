// components/admin/image-upload-field.tsx
'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Loader2, Upload, X, ImageOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ImageUploadFieldProps = {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export function ImageUploadField({ images, onChange, maxImages = 6 }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFilesSelected(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    setError(null)

    const remainingSlots = maxImages - images.length
    if (remainingSlots <= 0) {
      setError(`You can upload up to ${maxImages} images.`)
      return
    }

    const files = Array.from(fileList).slice(0, remainingSlots)
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))

    setUploading(true)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(body.error ?? 'Upload failed. Please try again.')
      }

      onChange([...images, ...(body.urls as string[])])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong while uploading. Check your connection and try again.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function removeImage(url: string) {
    onChange(images.filter((img) => img !== url))
  }

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((url) => (
            <div key={url} className="group relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image src={url} alt="Product" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 size-6 rounded-full bg-background/90 text-foreground flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={(e) => handleFilesSelected(e.target.files)}
        disabled={uploading || images.length >= maxImages}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={uploading || images.length >= maxImages}
      >
        {uploading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Uploading...
          </>
        ) : (
          <>
            <Upload size={16} /> {images.length > 0 ? 'Add More Images' : 'Upload Images'}
          </>
        )}
      </Button>

      {images.length === 0 && !uploading && !error && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <ImageOff size={12} /> No images uploaded yet
        </p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}