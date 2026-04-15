import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'For creators just getting started with identity protection.',
    features: ['Up to 50 detections/month', '3 platforms monitored', 'Manual takedown requests', 'Basic earnings report', 'Email alerts'],
    cta: 'Start free',
    href: '/signup',
    highlight: false
  },
  {
    name: 'Creator',
    price: '$29',
    period: 'per month',
    description: 'For active creators who need automated enforcement and monetization.',
    features: ['Unlimited detections', '12 platforms + ad networks', 'One-tap takedown execution', 'Automated license monetization', 'Flexible license templates', 'CPM + earnings dashboard', 'Priority risk alerts', 'Creator benchmarking'],
    cta: 'Start free trial',
    href: '/signup',
    highlight: true
  },
  {
    name: 'Studio',
    price: '$99',
    period: 'per month',
    description: 'For agencies and multi-creator studios managing identity at scale.',
    features: ['Everything in Creator', 'Up to 10 creator profiles', 'Bulk action workflows', 'Custom license contracts', 'API access', 'Dedicated account manager', 'SLA-backed uptime'],
    cta: 'Contact us',
    href: '/signup',
    highlight: false
  }
]

const faqs = [
  { q: 'How does WEIR detect unauthorized uses?', a: 'WEIR uses AI-powered visual and audio fingerprinting to scan public content across social platforms and ad networks. Matches are surfaced within minutes of detection.' },
  { q: 'What happens when I click Monetize?', a: 'WEIR automatically applies your chosen license template to the detected use and invoices the content owner at the configured rate. You receive earnings directly to your connected payout account.' },
  { q: 'Can I customize what content gets taken down vs. monetized?', a: 'Yes. You can configure per-platform rules and choose from Restricted, Balanced, or Open license templates. Rules apply automatically to new detections.' },
  { q: 'Is there a contract?', a: 'No contracts. All plans are month-to-month. Cancel any time from your settings.' }
]

export default function Pricing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main>
        <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Simple, transparent pricing</h1>
              <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>Start free. Scale when you earn more.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-2xl p-7 border flex flex-col transition-all duration-200"
                  style={{
                    backgroundColor: plan.highlight ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                    borderColor: plan.highlight ? 'transparent' : 'var(--color-border)',
                    color: plan.highlight ? '#fff' : 'var(--color-text)'
                  }}
                >
                  <div className="mb-6">
                    <div className="text-sm font-semibold mb-1" style={{ opacity: plan.highlight ? 0.85 : 1, color: plan.highlight ? '#fff' : 'var(--color-text-secondary)' }}>{plan.name}</div>
                    <div className="flex items-end gap-1 mb-3">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-sm mb-1.5" style={{ opacity: 0.7 }}>/{plan.period}</span>
                    </div>
                    <p className="text-sm" style={{ opacity: plan.highlight ? 0.8 : 1, color: plan.highlight ? '#fff' : 'var(--color-text-secondary)' }}>{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 size={15} strokeWidth={2.5} className="mt-0.5 flex-shrink-0" style={{ color: plan.highlight ? '#93c5fd' : 'var(--color-success)' }} />
                        <span style={{ opacity: plan.highlight ? 0.9 : 1 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full font-semibold" style={{ backgroundColor: plan.highlight ? '#fff' : 'var(--color-primary)', color: plan.highlight ? 'var(--color-primary)' : '#fff', minHeight: '44px' }}>
                    <Link to={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-10" style={{ color: 'var(--color-text)' }}>Frequently asked questions</h2>
            <div className="space-y-8">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{faq.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
