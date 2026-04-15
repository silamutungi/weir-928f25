import { Link } from 'react-router-dom'

import { Button } from '../components/ui/button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const features = [
  { icon: Shield, title: 'Real-Time Detection', description: 'AI scans every major platform and ad network 24/7, flagging unauthorized uses of your name, image, and likeness within minutes.' },
  { icon: Zap, title: 'One-Tap Actions', description: 'Take down, monetize, or approve any content match in a single click. No legal team required.' },
  { icon: DollarSign, title: 'Earn from Every Use', description: 'Convert unauthorized uses into passive income via automated license approvals. Stop leaving money on the table.' },
  { icon: FileText, title: 'Flexible License Templates', description: 'Choose Restricted, Balanced, or Open licensing. Automate negotiations so deals close without back-and-forth.' },
  { icon: TrendingUp, title: 'Earnings Dashboard', description: 'Track CPM and revenue by platform and content type. Know exactly where your identity is generating money.' },
  { icon: Bell, title: 'Instant Risk Alerts', description: 'High-risk detections surface immediately with context: platform, estimated reach, and recommended action.' }
]

const stats = [
  { value: '$2.4M', label: 'Earnings recovered for creators' },
  { value: '14,800+', label: 'Matches detected monthly' },
  { value: '4.2 min', label: 'Average detection time' },
  { value: '93%', label: 'Takedown success rate' }
]

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1660911441421-21522ab8de73?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwY29uZmlkZW50JTIwY3JlYXRvciUyMGF0JTIwYSUyMG1vZGVybiUyMGRlc2slMkMlMjBzdXJyb3VuZGVkJTIwYnklMjBnbG93aW5nJTIwfGVufDB8MHx8fDE3NzYyMzQ5MDd8MA&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: 'rgba(37,99,235,0.25)', border: '1px solid rgba(96,165,250,0.4)', color: '#93c5fd' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live detection across 12 platforms
          </div>
          <h1 className="text-white font-bold mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: '1.15', letterSpacing: '-0.02em', maxWidth: '680px' }}>
            Stop losing money to unauthorized uses of your identity.
          </h1>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '520px', lineHeight: '1.6' }}>
            WEIR detects every use of your name, image, and likeness across social media and ad networks — then turns those detections into takedowns or passive income.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="text-white font-semibold" style={{ backgroundColor: 'var(--color-primary)', minHeight: '48px' }}>
              <Link to="/signup">Start free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)', minHeight: '48px' }}>
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--color-primary)' }}>{s.value}</div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)', letterSpacing: 'var(--tracking-title)' }}>Everything you need to protect and monetize your identity</h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)', maxWidth: '540px' }}>One dashboard. Every platform. Complete control.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-xl border transition-all duration-200 hover:-translate-y-0.5" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(37,99,235,0.1)' }}>
                  <f.icon size={22} style={{ color: 'var(--color-primary)' }} strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>Ready to take control?</h2>
          <p className="text-lg mb-10" style={{ color: 'var(--color-text-secondary)' }}>Join thousands of creators who protect and earn from their identity every day.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="font-semibold text-white" style={{ backgroundColor: 'var(--color-primary)', minHeight: '48px' }}>
              <Link to="/signup">Get started free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold" style={{ minHeight: '48px' }}>
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
