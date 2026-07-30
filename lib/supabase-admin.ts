// lib/supabase-server.ts
// Server-only Supabase client — uses the service role key, which BYPASSES
// Row Level Security entirely. This can read/write/delete anything in the
// database with no restrictions.
//
// Rule: only ever import this file from code that runs on the server —
// app/api/**/route.ts files, or lib/products.ts (which those routes call).
// NEVER import this in a component marked "use client", and never in any
// file that could end up in the browser bundle.

import { createClient } from '@supabase/supabase-js'

// Guard: if this ever gets bundled for the browser, fail loudly instead of
// silently leaking the service role key.
if (typeof window !== 'undefined') {
  throw new Error(
    'lib/supabase-server.ts was imported in the browser. This file must only be used server-side.'
  )
}

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)