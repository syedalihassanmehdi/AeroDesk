'use client'
import { useState } from 'react'

const DESTINATIONS = ['Dubai, UAE', 'Bali, Indonesia', 'Switzerland', 'Paris, France', 'Maldives', 'Istanbul, Turkey', 'Tokyo, Japan', 'Santorini, Greece', 'Amalfi Coast, Italy', 'Safari, Kenya']
const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging']

interface TourForm {
  title: string
  destination: string
  country: string
  price: string
  duration: string
  groupSize: string
  difficulty: string
  image: string
  description: string
  overview: string
  highlights: string
  whatsapp_message: string
  inclusions: string
  exclusions: string
}

const EMPTY: TourForm = {
  title: '', destination: '', country: '', price: '', duration: '',
  groupSize: '', difficulty: 'Easy', image: '', description: '',
  overview: '', highlights: '', whatsapp_message: '', inclusions: '', exclusions: '',
}

export default function AddTourPage() {
  const [form, setForm] = useState<TourForm>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [activeSection, setActiveSection] = useState<'basic' | 'content' | 'logistics'>('basic')

  const set = (key: keyof TourForm, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = async () => {
    if (!form.title || !form.destination || !form.price) {
      setError('Title, destination, and price are required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      setForm(EMPTY)
      setActiveSection('basic')
    } catch (err: any) {
      setError(err.message || 'Failed to save tour.')
    } finally {
      setSaving(false)
    }
  }

  const SECTIONS = [
    { key: 'basic', label: 'Basic Info', icon: '📋' },
    { key: 'content', label: 'Content', icon: '📝' },
    { key: 'logistics', label: 'Logistics', icon: '⚙️' },
  ] as const

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 focus:border-yellow-600/40 focus:outline-none transition-all"
  const inputStyle = { background: 'rgba(255,255,255,0.04)' }
  const labelCls = "block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-semibold"

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-white mb-1">Add New Tour</h1>
        <p className="text-white/40 text-sm">Create a new tour package — it'll appear on the homepage immediately.</p>
      </div>

      {/* Section tabs */}
      <div
        className="flex gap-1 p-1 rounded-2xl mb-7"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {SECTIONS.map(s => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={activeSection === s.key
              ? { background: 'linear-gradient(135deg, #C5A059, #a07d3a)', color: '#0a0a0a' }
              : { color: 'rgba(255,255,255,0.35)' }
            }
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: '#111' }}>
        <div className="p-6 flex flex-col gap-5">

          {/* ── BASIC INFO ── */}
          {activeSection === 'basic' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Tour Title *</label>
                  <input className={inputCls} style={inputStyle} placeholder="e.g. Dubai Desert Oasis" value={form.title} onChange={e => set('title', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Destination *</label>
                  <input className={inputCls} style={inputStyle} placeholder="e.g. Dubai" value={form.destination} onChange={e => set('destination', e.target.value)} list="dest-list" />
                  <datalist id="dest-list">
                    {DESTINATIONS.map(d => <option key={d} value={d} />)}
                  </datalist>
                </div>
                <div>
                  <label className={labelCls}>Country *</label>
                  <input className={inputCls} style={inputStyle} placeholder="e.g. UAE" value={form.country} onChange={e => set('country', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Price Per Person (USD) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
                    <input
                      className={inputCls + ' pl-8'}
                      style={inputStyle}
                      type="number"
                      placeholder="3200"
                      value={form.price}
                      onChange={e => set('price', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Duration</label>
                  <input className={inputCls} style={inputStyle} placeholder="e.g. 7 Days" value={form.duration} onChange={e => set('duration', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Group Size</label>
                  <input className={inputCls} style={inputStyle} placeholder="e.g. Max 12" value={form.groupSize} onChange={e => set('groupSize', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Difficulty</label>
                  <div className="flex gap-2">
                    {DIFFICULTIES.map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => set('difficulty', d)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border"
                        style={form.difficulty === d
                          ? { background: 'rgba(197,160,89,0.12)', color: '#C5A059', borderColor: 'rgba(197,160,89,0.3)' }
                          : { background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.07)' }
                        }
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className={labelCls}>Cover Image URL</label>
                <input className={inputCls} style={inputStyle} placeholder="https://images.unsplash.com/..." value={form.image} onChange={e => set('image', e.target.value)} />
                {form.image && (
                  <div className="mt-2 h-32 rounded-xl overflow-hidden">
                    <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}
              </div>

              <div>
                <label className={labelCls}>Short Description</label>
                <input className={inputCls} style={inputStyle} placeholder="One-line tagline for the tour card..." value={form.description} onChange={e => set('description', e.target.value)} />
              </div>

              <div>
                <label className={labelCls}>WhatsApp Inquiry Message</label>
                <textarea
                  className={inputCls}
                  style={inputStyle}
                  rows={3}
                  placeholder="Hi! I'm interested in the Dubai Desert Oasis tour..."
                  value={form.whatsapp_message}
                  onChange={e => set('whatsapp_message', e.target.value)}
                />
                <p className="text-[10px] text-white/20 mt-1">This is pre-filled when a customer clicks WhatsApp on the tour card.</p>
              </div>
            </>
          )}

          {/* ── CONTENT ── */}
          {activeSection === 'content' && (
            <>
              <div>
                <label className={labelCls}>Overview</label>
                <textarea
                  className={inputCls}
                  style={inputStyle}
                  rows={5}
                  placeholder="Write a rich, evocative overview of the tour experience..."
                  value={form.overview}
                  onChange={e => set('overview', e.target.value)}
                />
              </div>

              <div>
                <label className={labelCls}>Highlights</label>
                <textarea
                  className={inputCls}
                  style={inputStyle}
                  rows={5}
                  placeholder={'One highlight per line:\nDesert Safari\nBurj Khalifa\nYacht Charter'}
                  value={form.highlights}
                  onChange={e => set('highlights', e.target.value)}
                />
                <p className="text-[10px] text-white/20 mt-1">One per line — these appear as tags on the tour card and detail page.</p>
              </div>

              {/* Highlights preview */}
              {form.highlights && (
                <div>
                  <p className={labelCls}>Preview</p>
                  <div className="flex flex-wrap gap-2">
                    {form.highlights.split('\n').filter(Boolean).map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{ background: 'rgba(197,160,89,0.1)', color: '#C5A059', border: '1px solid rgba(197,160,89,0.2)' }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── LOGISTICS ── */}
          {activeSection === 'logistics' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Inclusions</label>
                  <textarea
                    className={inputCls}
                    style={inputStyle}
                    rows={8}
                    placeholder={'One per line:\n6 nights accommodation\nAll transfers\nDaily breakfast'}
                    value={form.inclusions}
                    onChange={e => set('inclusions', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Exclusions</label>
                  <textarea
                    className={inputCls}
                    style={inputStyle}
                    rows={8}
                    placeholder={'One per line:\nInternational flights\nVisa fees\nTravel insurance'}
                    value={form.exclusions}
                    onChange={e => set('exclusions', e.target.value)}
                  />
                </div>
              </div>

              {/* Preview */}
              {(form.inclusions || form.exclusions) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {form.inclusions && (
                    <div className="rounded-xl p-4 border border-green-500/15" style={{ background: 'rgba(34,197,94,0.04)' }}>
                      <p className="text-xs text-green-400 font-semibold mb-2">✓ Included</p>
                      {form.inclusions.split('\n').filter(Boolean).map((i, idx) => (
                        <p key={idx} className="text-white/50 text-xs py-0.5">· {i}</p>
                      ))}
                    </div>
                  )}
                  {form.exclusions && (
                    <div className="rounded-xl p-4 border border-red-500/15" style={{ background: 'rgba(239,68,68,0.04)' }}>
                      <p className="text-xs text-red-400 font-semibold mb-2">✕ Not Included</p>
                      {form.exclusions.split('\n').filter(Boolean).map((i, idx) => (
                        <p key={idx} className="text-white/50 text-xs py-0.5">· {i}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer actions */}
        <div
          className="px-6 py-4 border-t border-white/6 flex items-center justify-between gap-4"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex gap-2">
            {SECTIONS.map(s => (
              <div
                key={s.key}
                className="w-2 h-2 rounded-full transition-all"
                style={{ background: activeSection === s.key ? '#C5A059' : 'rgba(255,255,255,0.1)' }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            {error && <p className="text-red-400 text-xs">{error}</p>}
            {saved && (
              <span className="text-green-400 text-xs flex items-center gap-1 font-semibold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                Tour saved!
              </span>
            )}
            {activeSection !== 'logistics' && (
              <button
                onClick={() => setActiveSection(activeSection === 'basic' ? 'content' : 'logistics')}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all"
              >
                Next →
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #C5A059, #a07d3a)', color: '#0a0a0a' }}
            >
              {saving ? 'Saving...' : 'Save Tour'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}