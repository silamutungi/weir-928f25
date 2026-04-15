import { useState, useEffect, useCallback } from 'react'
import { TrendingUp, RefreshCw, CheckCircle2, XCircle } from 'lucide-react'

import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'
import { formatCurrency, formatNumber, formatDate } from '../lib/utils'
import type { ContentMatch } from '../types'

const SEED_MATCHES: ContentMatch[] = [
  { id: '1', user_id: 'demo', platform: 'Instagram', content_url: 'https://instagram.com/p/demo1', match_type: 'image', risk_level: 'high', status: 'pending', estimated_cpm: 4.20, impressions: 128000, created_at: new Date(Date.now() - 3600000).toISOString(), deleted_at: null },
  { id: '2', user_id: 'demo', platform: 'TikTok', content_url: 'https://tiktok.com/@demo', match_type: 'video', risk_level: 'high', status: 'pending', estimated_cpm: 3.80, impressions: 245000, created_at: new Date(Date.now() - 7200000).toISOString(), deleted_at: null },
  { id: '3', user_id: 'demo', platform: 'YouTube', content_url: 'https://youtube.com/watch?v=demo', match_type: 'video', risk_level: 'medium', status: 'monetized', estimated_cpm: 6.10, impressions: 88000, created_at: new Date(Date.now() - 86400000).toISOString(), deleted_at: null },
  { id: '4', user_id: 'demo', platform: 'Facebook', content_url: 'https://facebook.com/post/demo', match_type: 'image', risk_level: 'low', status: 'approved', estimated_cpm: 2.90, impressions: 34000, created_at: new Date(Date.now() - 172800000).toISOString(), deleted_at: null },
  { id: '5', user_id: 'demo', platform: 'Twitter', content_url: 'https://twitter.com/demo', match_type: 'image', risk_level: 'medium', status: 'pending', estimated_cpm: 1.75, impressions: 67000, created_at: new Date(Date.now() - 259200000).toISOString(), deleted_at: null },
  { id: '6', user_id: 'demo', platform: 'Snapchat', content_url: 'https://snapchat.com/demo', match_type: 'video', risk_level: 'low', status: 'taken_down', estimated_cpm: 2.20, impressions: 19000, created_at: new Date(Date.now() - 345600000).toISOString(), deleted_at: null }
]

const riskColors: Record<string, string> = { high: 'var(--color-error)', medium: 'var(--color-warning)', low: 'var(--color-success)' }
const statusLabels: Record<string, string> = { pending: 'Pending', taken_down: 'Taken Down', monetized: 'Monetized', approved: 'Approved', dismissed: 'Dismissed' }

export default function Dashboard() {
  const [matches, setMatches] = useState<ContentMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const loadMatches = useCallback(async () => {
    setLoading(true)
    setError('')
    if (!isSupabaseConfigured) {
      setTimeout(() => { setMatches(SEED_MATCHES); setLoading(false) }, 600)
      return
    }
    const { data, error: dbError } = await supabase
      .from('content_matches')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
    setLoading(false)
    if (dbError) { setError(dbError.message); return }
    setMatches(data ?? [])
  }, [])

  useEffect(() => { loadMatches() }, [loadMatches])

  async function updateStatus(id: string, status: ContentMatch['status']) {
    setActionLoading(id)
    if (!isSupabaseConfigured) {
      setMatches((prev) => prev.map((m) => m.id === id ? { ...m, status } : m))
      setActionLoading(null)
      return
    }
    await supabase.from('content_matches').update({ status }).eq('id', id)
    setMatches((prev) => prev.map((m) => m.id === id ? { ...m, status } : m))
    setActionLoading(null)
  }

  const pending = matches.filter((m) => m.status === 'pending')
  const totalEarnings = matches.filter((m) => m.status === 'monetized').reduce((sum, m) => sum + (m.estimated_cpm / 1000) * m.impressions, 0)
  const totalImpressions = matches.reduce((sum, m) => sum + m.impressions, 0)
  const highRisk = matches.filter((m) => m.risk_level === 'high' && m.status === 'pending').length

  const metrics = [
    { label: 'Pending Actions', value: pending.length.toString(), icon: AlertTriangle, color: 'var(--color-warning)' },
    { label: 'Total Earnings', value: formatCurrency(totalEarnings), icon: DollarSign, color: 'var(--color-success)' },
    { label: 'Total Impressions', value: formatNumber(totalImpressions), icon: BarChart3, color: 'var(--color-info)' },
    { label: 'High Risk Alerts', value: highRisk.toString(), icon: Shield, color: 'var(--color-error)' }
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      {!isSupabaseConfigured && (
        <div className="px-6 pt-4">
          <div className="max-w-5xl mx-auto p-3 rounded-lg text-sm text-center" style={{ backgroundColor: 'rgba(37,99,235,0.08)', color: 'var(--color-info)', border: '1px solid rgba(37,99,235,0.2)' }}>
            Viewing sample data — connect your database to go live.
          </div>
        </div>
      )}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Monitor and act on identity matches in real time.</p>
          </div>
          <Button variant="outline" size="sm" onClick={loadMatches} className="flex items-center gap-2" style={{ minHeight: '40px' }}>
            <RefreshCw size={15} strokeWidth={2} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {metrics.map((m) => (
            <Card key={m.label}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${m.color}18` }}>
                    <m.icon size={18} style={{ color: m.color }} strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-0.5" style={{ color: 'var(--color-text)' }}>{m.value}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{m.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Content Matches</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading && (
              <div className="p-8 space-y-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="h-14 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--color-bg-muted)' }} />
                ))}
              </div>
            )}
            {!loading && error && (
              <div className="p-8 text-center">
                <XCircle size={32} className="mx-auto mb-3" style={{ color: 'var(--color-error)' }} />
                <p className="font-medium mb-4" style={{ color: 'var(--color-text)' }}>Failed to load matches</p>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
                <Button variant="outline" onClick={loadMatches}>Retry</Button>
              </div>
            )}
            {!loading && !error && matches.length === 0 && (
              <div className="p-12 text-center">
                <CheckCircle2 size={40} className="mx-auto mb-3" style={{ color: 'var(--color-success)' }} />
                <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>No matches yet</p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>WEIR is scanning. New matches will appear here automatically.</p>
              </div>
            )}
            {!loading && !error && matches.length > 0 && (
              <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                {matches.map((match) => (
                  <div key={match.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{match.platform}</span>
                        <Badge variant="outline" className="text-xs" style={{ color: riskColors[match.risk_level], borderColor: riskColors[match.risk_level] }}>{match.risk_level} risk</Badge>
                        <Badge variant="secondary" className="text-xs">{statusLabels[match.status]}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        <span>{match.match_type}</span>
                        <span>{formatNumber(match.impressions)} impressions</span>
                        <span>CPM {formatCurrency(match.estimated_cpm)}</span>
                        <span>{formatDate(match.created_at)}</span>
                      </div>
                    </div>
                    {match.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <Button size="sm" disabled={actionLoading === match.id} onClick={() => updateStatus(match.id, 'taken_down')} className="text-white text-xs" style={{ backgroundColor: 'var(--color-error)', minHeight: '36px' }}>Take Down</Button>
                        <Button size="sm" disabled={actionLoading === match.id} onClick={() => updateStatus(match.id, 'monetized')} className="text-white text-xs" style={{ backgroundColor: 'var(--color-success)', minHeight: '36px' }}>Monetize</Button>
                        <Button size="sm" variant="outline" disabled={actionLoading === match.id} onClick={() => updateStatus(match.id, 'approved')} className="text-xs" style={{ minHeight: '36px' }}>Approve</Button>
                      </div>
                    )}
                    {match.status !== 'pending' && (
                      <div className="flex items-center gap-2">
                        <TrendingUp size={14} style={{ color: 'var(--color-text-muted)' }} />
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{statusLabels[match.status]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
