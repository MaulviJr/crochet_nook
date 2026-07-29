// lib/store/use-hydrated.ts
// Zustand's persist middleware only reads localStorage on the client, after
// mount. Any component rendering order-store data must wait for this flag
// to avoid an SSR/client hydration mismatch (server renders empty state,
// client would otherwise flash real data a tick later).
'use client'

import { useEffect, useState } from 'react'

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}