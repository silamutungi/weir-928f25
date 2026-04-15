import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setLoading(false); navigate('/dashboard') }, 800)
      return
    }
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } }
    })
    setLoading(false)
    if (authError) { setError(authError.message); return }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="text-center max-w-sm">
          <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: 'var(--color-success)' }} strokeWidth={1.5} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Check your email</h2>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          <Button asChild className="font-semibold text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Link to="/login">Back to sign in</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Shield size={28} style={{ color: 'var(--color-primary)' }} strokeWidth={2} />
            <span className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>WEIR</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Start protecting your identity</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Free to start. No credit card required.</p>
        </div>
        <div className="rounded-xl p-8 border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Display name</Label>
              <Input id="name" type="text" placeholder="Your creator name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Min. 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm p-3 rounded-lg" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
                {error}
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full font-semibold text-white" style={{ backgroundColor: 'var(--color-primary)', minHeight: '44px' }}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : 'Create free account'}
            </Button>
          </form>
        </div>
        <p className="text-center mt-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-medium" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
