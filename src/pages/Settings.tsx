import { useState, useEffect, type FormEvent } from 'react'
import { CheckCircle2, AlertCircle, Trash2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'

type ProfileForm = { display_name: string; bio: string; creator_category: string }

export default function Settings() {
  const [form, setForm] = useState<ProfileForm>({ display_name: '', bio: '', creator_category: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      if (!isSupabaseConfigured) {
        setTimeout(() => {
          setForm({ display_name: 'Demo Creator', bio: 'Lifestyle and fashion content creator.', creator_category: 'Lifestyle' })
          setLoading(false)
        }, 500)
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }
      const { data } = await supabase.from('profiles').select('*').eq('user_id', session.user.id).single()
      if (data) setForm({ display_name: data.display_name ?? '', bio: data.bio ?? '', creator_category: data.creator_category ?? '' })
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setSaving(false); setSuccess(true) }, 600)
      return
    }
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setSaving(false); setError('Not authenticated'); return }
    const { error: dbError } = await supabase.from('profiles').upsert({ user_id: session.user.id, ...form, updated_at: new Date().toISOString() })
    setSaving(false)
    if (dbError) { setError(dbError.message); return }
    setSuccess(true)
  }

  async function handleDeleteAccount() {
    if (!window.confirm('This will permanently delete your account and all data. Are you sure?')) return
    if (!isSupabaseConfigured) return
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    await supabase.from('profiles').update({ deleted_at: new Date().toISOString() }).eq('user_id', session.user.id)
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>Settings</h1>

        <Card className="mb-6">
          <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1,2,3].map((i) => <div key={i} className="h-10 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--color-bg-muted)' }} />)}
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="display_name">Display name</Label>
                  <Input id="display_name" value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} placeholder="Your creator name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Short bio" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="category">Creator category</Label>
                  <Input id="category" value={form.creator_category} onChange={(e) => setForm({ ...form, creator_category: e.target.value })} placeholder="e.g. Lifestyle, Music, Gaming" />
                </div>
                {success && (
                  <div className="flex items-center gap-2 text-sm p-3 rounded-lg" style={{ backgroundColor: 'rgba(22,163,74,0.08)', color: 'var(--color-success)', border: '1px solid rgba(22,163,74,0.2)' }}>
                    <CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" /> Profile saved.
                  </div>
                )}
                {error && (
                  <div className="flex items-center gap-2 text-sm p-3 rounded-lg" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
                    <AlertCircle size={16} strokeWidth={2} aria-hidden="true" /> {error}
                  </div>
                )}
                <Button type="submit" disabled={saving} className="font-semibold text-white" style={{ backgroundColor: 'var(--color-primary)', minHeight: '44px' }}>
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : 'Save changes'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle style={{ color: 'var(--color-error)' }}>Danger Zone</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Permanently delete your account and all associated data. This cannot be undone.</p>
            <Button variant="outline" onClick={handleDeleteAccount} className="flex items-center gap-2" style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)', minHeight: '44px' }}>
              <Trash2 size={15} strokeWidth={2} />
              Delete account
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
