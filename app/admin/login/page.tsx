// app/admin/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Gift, Sparkles, MapPin } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-lg">

          {/* Left panel — brand/image side */}
          <div className="relative bg-gradient-to-br from-secondary via-accent/60 to-muted p-10 flex flex-col justify-between">
            <div className="text-center">
              <h1 className="font-script text-5xl text-primary mb-2">Welcome back</h1>
              <p className="text-sm tracking-wide text-muted-foreground mb-6">
                MANAGE YOUR CROCHET NOOK CATALOGUE
              </p>
              <p className="text-foreground/80 max-w-xs mx-auto ">
                Log in to add new pieces, update prices, and keep the shop looking as lovely as your work.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden mt-8 mb-8 aspect-[4/3]">
              {/* Replace with an actual product photo in /public */}
              <Image
                src="/images/login-hero.png"
                alt="Handmade crochet gajray"
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <TrustBadge icon={<ShieldCheck size={18} />} label="Secure & Safe" />
              <TrustBadge icon={<Sparkles size={18} />} label="Made with Love" />
              <TrustBadge icon={<Gift size={18} />} label="Easy Updates" />
            </div>
          </div>

          {/* Right panel — the actual form */}
          <div className="bg-card p-10 flex flex-col justify-center">
            <div className="mb-8 text-center">
            <h2 className="font-script text-5xl text-primary mb-1">Login to Crochet Nook</h2>
            <p className="text-muted-foreground text-sm mb-8">Let's get you back to your cozy corner ✂️</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background
                               text-foreground placeholder:text-muted-foreground
                               focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-background
                               text-foreground placeholder:text-muted-foreground
                               focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-destructive text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-medium
                           shadow-md hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? 'Logging in…' : 'Login'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom trust strip — mirrors the site-wide footer strip */}
        <div className="mt-6 rounded-2xl bg-muted/60 px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <FooterFeature title="100% Handmade" subtitle="Crafted by hand with care" />
          <FooterFeature title="Perfect for Gifting" subtitle="Thoughtful for every occasion" />
          <FooterFeature title="Premium Quality" subtitle="Soft yarns, careful finishing" />
          <FooterFeature title="Made in Karachi" subtitle="Proudly handmade in Pakistan" icon={<MapPin size={16} />} />
        </div>
      </div>
    </div>
  )
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-card/80 rounded-xl p-3 flex flex-col items-center gap-1.5 text-center shadow-sm">
      <span className="text-primary">{icon}</span>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </div>
  )
}

function FooterFeature({
  title,
  subtitle,
  icon,
}: {
  title: string
  subtitle: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2 justify-center md:justify-start">
      {icon && <span className="text-primary mt-0.5">{icon}</span>}
      <div>
        <p className="text-sm font-semibold text-primary">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}