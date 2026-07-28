// lib/supabase-browser.ts
// Used only in Client Components (things marked "use client") — e.g. the
// login form. This syncs the session into cookies so the server can read it.

import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}