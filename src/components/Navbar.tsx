import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Shield, Menu, X, LogOut, Settings } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from './ui/button'
import { cn } from '../lib/utils'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    navigate('/')
    setMenuOpen(false)
  }

  const isActive = (path: string) => location.pathname === path

  const isApp = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/settings')

  return (
    <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Shield size={22} style={{ color: 'var(--color-primary)' }} strokeWidth={2.2} aria-hidden="true" />
          <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--color-text)' }}>WEIR</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {isApp ? (
            <>
              <Link to="/dashboard" className={cn('px-3 py-2 rounded-lg text-sm font-medium transition-colors', isActive('/dashboard') ? 'bg-blue-50 dark:bg-blue-950' : 'hover:bg-gray-100 dark:hover:bg-gray-800')} style={{ color: isActive('/dashboard') ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>Dashboard</Link>
              <Link to="/settings" className={cn('px-3 py-2 rounded-lg text-sm font-medium transition-colors', isActive('/settings') ? 'bg-blue-50 dark:bg-blue-950' : 'hover:bg-gray-100 dark:hover:bg-gray-800')} style={{ color: isActive('/settings') ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>Settings</Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-1.5 text-sm ml-2" style={{ color: 'var(--color-text-secondary)', minHeight: '36px' }}>
                <LogOut size={14} strokeWidth={2} aria-hidden="true" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/pricing" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" style={{ color: 'var(--color-text-secondary)' }}>Pricing</Link>
              {user ? (
                <Button asChild size="sm" className="ml-2 font-medium text-white" style={{ backgroundColor: 'var(--color-primary)', minHeight: '36px' }}>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Link to="/login" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" style={{ color: 'var(--color-text-secondary)' }}>Sign in</Link>
                  <Button asChild size="sm" className="ml-2 font-medium text-white" style={{ backgroundColor: 'var(--color-primary)', minHeight: '36px' }}>
                    <Link to="/signup">Start free</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {menuOpen ? <X size={20} style={{ color: 'var(--color-text)' }} /> : <Menu size={20} style={{ color: 'var(--color-text)' }} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 space-y-1" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          {isApp ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium" style={{ color: 'var(--color-text)' }}>Dashboard</Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                <Settings size={15} aria-hidden="true" />
                Settings
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-left" style={{ color: 'var(--color-error)' }}>
                <LogOut size={15} aria-hidden="true" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/pricing" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium" style={{ color: 'var(--color-text)' }}>Pricing</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium" style={{ color: 'var(--color-text)' }}>Sign in</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium" style={{ color: 'var(--color-primary)' }}>Start free</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
