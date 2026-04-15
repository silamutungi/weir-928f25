import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, AlertCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setLoading(false); navigate('/dashboard') }, 800)
      return
    }
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) { setError(authError.message); return }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Shield size={28} style={{ color: 'var(--color-primary)' }} strokeWidth={2} />
            <span className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>WEIR</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Welcome back</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Sign in to your dashboard</p>
        </div>
        <div className="rounded-xl p-8 border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          {!isSupabaseConfigured && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(37,99,235,0.08)', color: 'var(--color-info)', border: '1px solid rgba(37,99,235,0.2)' }}>
              Demo mode — connect Supabase to enable real auth.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
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
                  Signing in...
                </span>
              ) : 'Sign in'}
            </Button>
          </form>
        </div>
        <p className="text-center mt-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          No account?{' '}
          <Link to="/signup" className="font-medium" style={{ color: 'var(--color-primary)' }}>Create one free</Link>
        </p>
      </div>
    </div>
  )
}
