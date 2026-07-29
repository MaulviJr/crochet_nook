// lib/occasions.ts
// Occasion tagging isn't in the database yet — there's no `occasions`
// column on `products`. This lives separately from lib/schemas/product.ts
// (the Zod/DB-backed schema) on purpose: once occasions are stored for
// real, this becomes a query against the DB (or a join table) instead of a
// static list, without touching product validation at all.

export const OCCASION_OPTIONS = [
  { value: 'wedding', label: 'Weddings' },
  { value: 'baby_shower', label: 'Baby Showers' },
  { value: 'birthday', label: 'Birthdays' },
  { value: 'eid', label: 'Eid' },
  { value: 'valentines', label: "Valentine's" },
] as const

export type OccasionValue = (typeof OCCASION_OPTIONS)[number]['value']
