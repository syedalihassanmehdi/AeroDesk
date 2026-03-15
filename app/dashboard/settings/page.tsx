'use client'
import { useState } from 'react'

interface Settings {
  agencyName: string
  logo: string
  whatsappNumber: string
  email: string
  phone: string
  heroTitle: string
  heroSubtitle: string
  heroBadge: string
  primaryCTA: string
  secondaryCTA: string
  address: string
  instagram: string
  facebook: string
  twitter: string
}

const DEFAULTS: Settings = {
  agencyName: 'LuxeVoyage',
  logo: '',
  whatsappNumber: '15551234567',
  email: 'hello@luxevoyage.com',
  phone: '+1 555 123 4567',
  heroTitle: 'The Art of Extraordinary Travell',
  heroSubtitle: 'Immersive journeys designed for those who dare to claim and live the extraordinary.',
  heroBadge: 'The Private Agency',
  primaryCTA: 'Explore Expeditions',
  secondaryCTA: 'Plan Your Journey',
  address: 'Dubai, UAE',
  instagram: 'luxevoyage',
  facebook: 'luxevoyage',
  twitter: 'luxevoyage',
}

const TABS = ['Agency', 'Homepage Hero', 'Contact & Social'] as const
type Tab = typeof TABS[number]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS)
  const [tab, setTab] = useState<Tab>('Agency')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const set = (key: keyof Settings, val: string) => setSettings(s => ({ ...s, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    // Replace with: await supabase.from('settings').upsert([{ id: 1, ...settings }])
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 focus:border-yellow-600/40 focus:outline-none transition-all"
  const inputStyle = { background: 'rgba(255,255,255,0.04)' }
  const labelCls = "block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-semibold"

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-white mb-1">Agency Settings</h1>
        <p className="text-white/40 text-sm">Changes here update your site and dashboard in real time.</p>
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-1 p-1 rounded-2xl mb-7"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={tab === t
              ? { background: 'linear-gradient(135deg, #C5A059, #a07d3a)', color: '#0a0a0a' }
              : { color: 'rgba(255,255,255,0.35)' }
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: '#111' }}>
        <div className="p-6 flex flex-col gap-5">

          {/* ── AGENCY ── */}
          {tab === 'Agency' && (
            <>
              <div className="flex items-center gap-5 p-4 rounded-xl border border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C5A059, #a07d3a)', color: '#0a0a0a' }}
                >
                  {settings.agencyName[0] || 'L'}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold">{settings.agencyName}</p>
                  <p className="text-white/35 text-xs mt-0.5">Agency logo placeholder</p>
                  <p className="text-[10px] text-white/20 mt-1">Upload logo via Supabase Storage when connected</p>
                </div>
              </div>

              <div>
                <label className={labelCls}>Agency Name</label>
                <input className={inputCls} style={inputStyle} value={settings.agencyName} onChange={e => set('agencyName', e.target.value)} placeholder="LuxeVoyage" />
              </div>

              <div>
                <label className={labelCls}>Logo URL</label>
                <input className={inputCls} style={inputStyle} value={settings.logo} onChange={e => set('logo', e.target.value)} placeholder="https://..." />
              </div>

              <div
                className="rounded-xl p-4 border border-yellow-700/20"
                style={{ background: 'rgba(197,160,89,0.05)' }}
              >
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-3">WhatsApp</p>
                <label className={labelCls}>WhatsApp Number (with country code, digits only)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">+</span>
                  <input
                    className={inputCls + ' pl-8'}
                    style={inputStyle}
                    value={settings.whatsappNumber}
                    onChange={e => set('whatsappNumber', e.target.value.replace(/\D/g, ''))}
                    placeholder="15551234567"
                  />
                </div>
                <p className="text-[10px] text-white/20 mt-1.5">
                  All WhatsApp buttons across the site use this number.
                  Preview: <span style={{ color: '#C5A059' }}>wa.me/{settings.whatsappNumber}</span>
                </p>
              </div>
            </>
          )}

          {/* ── HOMEPAGE HERO ── */}
          {tab === 'Homepage Hero' && (
            <>
              {/* Live preview */}
              <div
                className="rounded-xl p-6 text-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0A2342 0%, #121212 100%)', minHeight: '180px' }}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-4"
                  style={{ background: 'rgba(197,160,89,0.15)', color: '#C5A059', border: '1px solid rgba(197,160,89,0.3)' }}
                >
                  <span className="w-1 h-1 rounded-full bg-current" />
                  {settings.heroBadge || 'Badge text'}
                </div>
                <h2 className="text-white text-xl font-bold mb-2 leading-tight">
                  {settings.heroTitle || 'Your hero headline here'}
                </h2>
                <p className="text-white/40 text-xs max-w-xs mx-auto leading-relaxed mb-4">
                  {settings.heroSubtitle || 'Your subtitle text'}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span
                    className="px-4 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: '#C5A059', color: '#0a0a0a' }}
                  >
                    {settings.primaryCTA || 'Primary CTA'}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-xs font-semibold border border-white/25 text-white/70">
                    {settings.secondaryCTA || 'Secondary CTA'}
                  </span>
                </div>
                <div className="absolute top-2 right-3 text-[10px] text-white/20 font-medium">Live Preview</div>
              </div>

              <div>
                <label className={labelCls}>Badge Text</label>
                <input className={inputCls} style={inputStyle} value={settings.heroBadge} onChange={e => set('heroBadge', e.target.value)} placeholder="The Private Agency" />
              </div>

              <div>
                <label className={labelCls}>Hero Title</label>
                <textarea
                  className={inputCls}
                  style={inputStyle}
                  rows={2}
                  value={settings.heroTitle}
                  onChange={e => set('heroTitle', e.target.value)}
                  placeholder="The Art of Extraordinary Travel"
                />
              </div>

              <div>
                <label className={labelCls}>Hero Subtitle</label>
                <textarea
                  className={inputCls}
                  style={inputStyle}
                  rows={3}
                  value={settings.heroSubtitle}
                  onChange={e => set('heroSubtitle', e.target.value)}
                  placeholder="Immersive journeys..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Primary CTA Button</label>
                  <input className={inputCls} style={inputStyle} value={settings.primaryCTA} onChange={e => set('primaryCTA', e.target.value)} placeholder="Explore Expeditions" />
                </div>
                <div>
                  <label className={labelCls}>Secondary CTA Button</label>
                  <input className={inputCls} style={inputStyle} value={settings.secondaryCTA} onChange={e => set('secondaryCTA', e.target.value)} placeholder="Plan Your Journey" />
                </div>
              </div>
            </>
          )}

          {/* ── CONTACT & SOCIAL ── */}
          {tab === 'Contact & Social' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs">@</span>
                    <input className={inputCls + ' pl-8'} style={inputStyle} type="email" value={settings.email} onChange={e => set('email', e.target.value)} placeholder="hello@agency.com" />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <input className={inputCls} style={inputStyle} value={settings.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 555 123 4567" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Office Address</label>
                  <input className={inputCls} style={inputStyle} value={settings.address} onChange={e => set('address', e.target.value)} placeholder="Dubai, UAE" />
                </div>
              </div>

              <div
                className="rounded-xl p-5 border border-white/6"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-4">Social Media</p>
                <div className="flex flex-col gap-4">
                  {[
                    { key: 'instagram', label: 'Instagram', prefix: 'instagram.com/', icon: '📸' },
                    { key: 'facebook',  label: 'Facebook',  prefix: 'facebook.com/',  icon: '👤' },
                    { key: 'twitter',   label: 'X (Twitter)', prefix: 'x.com/',        icon: '🐦' },
                  ].map(s => (
                    <div key={s.key}>
                      <label className={labelCls}>{s.icon} {s.label}</label>
                      <div className="flex items-center rounded-xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <span className="px-3 text-white/25 text-xs border-r border-white/8 py-3 bg-white/3 flex-shrink-0">{s.prefix}</span>
                        <input
                          className="flex-1 px-3 py-3 text-sm text-white placeholder-white/20 bg-transparent focus:outline-none"
                          value={settings[s.key as keyof Settings]}
                          onChange={e => set(s.key as keyof Settings, e.target.value)}
                          placeholder={`your${s.label.toLowerCase()}handle`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Save footer */}
        <div
          className="px-6 py-4 border-t border-white/6 flex items-center justify-between"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <p className="text-[10px] text-white/20">Changes apply globally across the site</p>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-green-400 text-xs flex items-center gap-1 font-semibold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                Saved!
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #C5A059, #a07d3a)', color: '#0a0a0a' }}
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}