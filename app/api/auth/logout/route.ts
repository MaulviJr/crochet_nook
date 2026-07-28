import { supabaseServer } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  

  // Check if a user's logged in
  const { data: claimsData } = await  supabaseServer.auth.getClaims()

  if (claimsData?.claims) {
    await supabaseServer.auth.signOut()
  }

  revalidatePath('/', 'layout')
  return NextResponse.redirect(new URL('/admin/login', req.url), {
    status: 302,
  })
}