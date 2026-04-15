import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t py-12" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Shield size={18} style={{ color: 'var(--color-primary)' }} strokeWidth={2} aria-hidden="true" />
          <span className="font-bold" style={{ color: 'var(--color-text)' }}>WEIR</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <Link to="/pricing" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Pricing</Link>
          <Link to="/login" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Sign in</Link>
          <Link to="/signup" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Sign up</Link>
        </nav>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          &copy; {year} WEIR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
