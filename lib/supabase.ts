// lib/supabase.ts
// Public/client-safe Supabase client — uses the anon key, which is safe to
// expose in the browser (Supabase's Row Level Security policies are what
// actually protect your data, not this key being secret).
// Use this in: public pages (app/(site)/...), any Server Component that
// only needs to READ data, and any client-side component.

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)