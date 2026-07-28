// lib/upload.ts
// Shared validation + helpers for the image upload route. Kept free of
// Supabase imports so it stays a plain, easily testable utility module.

import { randomUUID } from 'crypto'

export const PRODUCT_IMAGES_BUCKET = 'product-images'

export const ALLOWED_IMAGE_MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
} as const

export type AllowedImageMimeType = keyof typeof ALLOWED_IMAGE_MIME_TYPES

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export function isAllowedImageMimeType(mime: string): mime is AllowedImageMimeType {
  return mime in ALLOWED_IMAGE_MIME_TYPES
}

function extensionForMimeType(mime: AllowedImageMimeType): string {
  return ALLOWED_IMAGE_MIME_TYPES[mime]
}

/**
 * Never trust the original filename — generate our own safe, unique,
 * collision-free name. Only the extension is derived, and only from the
 * validated MIME type, not from anything the client sent as a filename.
 */
export function generateStorageFilename(mime: AllowedImageMimeType): string {
  return `${randomUUID()}.${extensionForMimeType(mime)}`
}

export type ImageValidationError = 'EMPTY' | 'INVALID_TYPE' | 'TOO_LARGE'

export function validateImageFile(file: File): ImageValidationError | null {
  if (!file || file.size === 0) return 'EMPTY'
  if (!isAllowedImageMimeType(file.type)) return 'INVALID_TYPE'
  if (file.size > MAX_IMAGE_SIZE_BYTES) return 'TOO_LARGE'
  return null
}

export const IMAGE_VALIDATION_MESSAGES: Record<ImageValidationError, string> = {
  EMPTY: 'The selected file is empty.',
  INVALID_TYPE: 'Only JPEG, PNG, WEBP, and GIF images are supported.',
  TOO_LARGE: 'Images must be smaller than 5MB.',
}