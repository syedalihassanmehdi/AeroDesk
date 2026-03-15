'use client'
import { useState, useEffect, useCallback } from 'react'
import type { SiteConfig } from '@/lib/site-config'
import { DEFAULT_CONFIG } from '@/lib/site-config'

const TABS = [
  { key: 'branding',     label: 'Branding',     icon: '🎨' },
  { key: 'navbar',       label: 'Navbar',        icon: '🧭' },
  { key: 'hero',         label: 'Hero',          icon: '🖼️' },
  { key: 'tours',        label: 'Tours',         icon: '🗺️' },
  { key: 'whyus',        label: 'Why Us',        icon: '⭐' },
  { key: 'moments',      label: 'Moments',       icon: '📷' },
  { key: 'testimonials', label: 'Testimonials',  icon: '💬' },
  { key: 'cta',          label: 'CTA Banner',    icon: '🚀' },
  { key: 'journal',      label: 'Journal',       icon: '📰' },
  { key: 'footer',       label: 'Footer',        icon: '🔗' },
] as const
type TabKey = typeof TABS[number]['key']

const i = (cls = '') => `w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 focus:border-yellow-600/40 focus:outline-none transition-all ${cls}`
const iStyle = { background: 'rgba(255,255,255,0.04)' }
const lbl = 'block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-semibold'
const card = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className={lbl}>{label}</label>{children}</div>
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">
        <label className={lbl}>{label}</label>
        <div className="flex items-center gap-2 mt-1">
          <input type="color" value={value.startsWith('#') ? value : '#C5A059'}
            onChange={e => onChange(e.target.value)}
            className="w-10 h-10 rounded-lg cursor-pointer border border-white/10 p-0.5"
            style={{ background: 'rgba(255,255,255,0.04)' }} />
          <input type="text" value={value} onChange={e => onChange(e.target.value)}
            className="w-40 px-3 py-2 rounded-lg text-xs text-white font-mono border border-white/8 focus:border-yellow-600/40 focus:outline-none"
            style={{ background: 'rgba(255,255,255,0.04)' }} />
          <div className="w-8 h-8 rounded-lg border border-white/10 flex-shrink-0" style={{ background: value }} />
        </div>
      </div>
    </div>
  )
}

function ColorGrid({ title, colors, config, set }: {
  title: string
  colors: { label: string; key: keyof SiteConfig }[]
  config: SiteConfig
  set: (k: keyof SiteConfig, v: any) => void
}) {
  return (
    <div className="rounded-xl p-5 flex flex-col gap-4" style={card}>
      <p className={lbl}>{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {colors.map(c => (
          <ColorRow key={c.key} label={c.label} value={config[c.key] as string} onChange={v => set(c.key, v)} />
        ))}
      </div>
    </div>
  )
}

function ImgPreview({ url }: { url: string }) {
  if (!url) return null
  return <div className="mt-2 h-24 rounded-xl overflow-hidden border border-white/8"><img src={url} alt="" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display='none')} /></div>
}

export default function SiteEditorPage() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG)
  const [tab, setTab] = useState<TabKey>('branding')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/site-config').then(r => r.json()).then(data => {
      const merged = { ...DEFAULT_CONFIG }
      for (const key of Object.keys(DEFAULT_CONFIG) as (keyof SiteConfig)[]) {
        const val = data[key]
        if (val !== undefined && val !== null) (merged as any)[key] = val
      }
      setConfig(merged)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const set = useCallback(<K extends keyof SiteConfig>(key: K, val: SiteConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: val }))
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      const res = await fetch('/api/site-config', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: any) { setError(e.message) } finally { setSaving(false) }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-yellow-600/40 border-t-yellow-500 rounded-full animate-spin" />
        <p className="text-white/30 text-sm">Loading...</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Site Editor</h1>
          <p className="text-white/40 text-sm">Every change goes live on your site after saving.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <p className="text-red-400 text-xs max-w-xs">{error}</p>}
          {saved && <span className="text-green-400 text-xs flex items-center gap-1 font-semibold"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>Saved!</span>}
          <a href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-white/10 text-white/40 hover:text-white transition-all">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Preview
          </a>
          <button onClick={save} disabled={saving}
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #C5A059, #a07d3a)', color: '#0a0a0a' }}>
            {saving ? 'Saving...' : 'Save & Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[180px_1fr] gap-6">
        {/* Sidebar */}
        <div className="flex flex-col gap-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
              style={tab === t.key ? { background: 'linear-gradient(135deg, #C5A059, #a07d3a)', color: '#0a0a0a' } : { color: 'rgba(255,255,255,0.4)' }}>
              <span>{t.icon}</span><span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Editor panel */}
        <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: '#111' }}>
          <div className="p-6 flex flex-col gap-5">

            {/* BRANDING */}
            {tab === 'branding' && <>
              <div className="flex items-center gap-4 p-4 rounded-xl" style={card}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${config.accent_color}, ${config.primary_color})`, color: '#fff' }}>
                  {config.agency_name[0]}
                </div>
                <div>
                  <p className="text-white font-bold">{config.agency_name}</p>
                  <p className="text-white/30 text-xs mt-0.5">Live brand preview</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <F label="Agency Name"><input className={i()} style={iStyle} value={config.agency_name} onChange={e => set('agency_name', e.target.value)} /></F>
                <F label="Logo URL"><input className={i()} style={iStyle} value={config.logo_url} onChange={e => set('logo_url', e.target.value)} placeholder="https://..." /></F>
              </div>
              <ColorGrid title="Brand Colors" config={config} set={set} colors={[
                { label: 'Primary (navy)', key: 'primary_color' },
                { label: 'Accent (gold)', key: 'accent_color' },
              ]} />
              {/* Live mini preview */}
              <div className="rounded-xl overflow-hidden border border-white/8">
                <p className="text-[10px] text-white/20 px-4 py-2 border-b border-white/6">Preview</p>
                <div className="p-4" style={{ background: '#1c1c1c' }}>
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl mb-3" style={{ background: '#0a0a0a' }}>
                    <span className="font-bold text-sm" style={{ color: config.accent_color }}>{config.agency_name}</span>
                    <button className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: config.accent_color, color: '#121212' }}>CTA</button>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-xs mb-1" style={{ color: config.accent_color }}>DESTINATION</p>
                    <p className="font-bold text-white text-sm">Sample Tour</p>
                    <p className="text-xl font-bold mt-2" style={{ color: config.accent_color }}>$3,200</p>
                  </div>
                </div>
              </div>
            </>}

            {/* NAVBAR */}
            {tab === 'navbar' && <>
              <div className="rounded-xl p-4 flex items-center gap-4 flex-wrap" style={card}>
                <span className="text-sm font-bold" style={{ color: config.accent_color }}>{config.agency_name}</span>
                {config.nav_links.map(l => <span key={l.label} className="text-sm" style={{ color: config.nav_text }}>{l.label}</span>)}
                <span className="ml-auto px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: config.nav_cta_bg, color: config.nav_cta_text }}>{config.hero_cta_primary}</span>
                <div className="w-full text-[10px] text-white/20">Live Preview</div>
              </div>
              <ColorGrid title="Navbar Colors" config={config} set={set} colors={[
                { label: 'Background', key: 'nav_bg' },
                { label: 'Link Text', key: 'nav_text' },
                { label: 'CTA Button', key: 'nav_cta_bg' },
                { label: 'CTA Text', key: 'nav_cta_text' },
              ]} />
              <div>
                <label className={lbl}>Navigation Links</label>
                <div className="flex flex-col gap-2">
                  {config.nav_links.map((link, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr_1fr_32px] gap-2 items-center">
                      <input className={i()} style={iStyle} value={link.label} placeholder="Label"
                        onChange={e => { const arr=[...config.nav_links]; arr[idx]={...arr[idx],label:e.target.value}; set('nav_links',arr) }} />
                      <input className={i()} style={iStyle} value={link.href} placeholder="#section"
                        onChange={e => { const arr=[...config.nav_links]; arr[idx]={...arr[idx],href:e.target.value}; set('nav_links',arr) }} />
                      <button onClick={() => set('nav_links', config.nav_links.filter((_,j)=>j!==idx))}
                        className="w-8 h-8 rounded-lg border border-white/8 text-white/25 hover:text-red-400 flex items-center justify-center">×</button>
                    </div>
                  ))}
                </div>
                <button onClick={() => set('nav_links',[...config.nav_links,{label:'',href:''}])}
                  className="mt-2 w-full py-2.5 rounded-xl text-sm border border-dashed border-white/15 text-white/30 hover:text-white/60 transition-all">+ Add Link</button>
              </div>
            </>}

            {/* HERO */}
            {tab === 'hero' && <>
              <div className="relative rounded-xl overflow-hidden h-36 flex items-end p-5">
                {config.hero_image && <img src={config.hero_image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />}
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${config.hero_bg_overlay}70, #12121290)` }} />
                <div className="relative z-10">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full mb-2 inline-block" style={{ background: config.hero_badge_bg, color: config.hero_badge_text }}>{config.hero_badge}</span>
                  <h3 className="text-lg font-bold leading-tight" style={{ color: config.hero_title_color }}>{config.hero_title}</h3>
                </div>
                <div className="absolute top-2 right-3 text-[10px] text-white/20">Preview</div>
              </div>
              <ColorGrid title="Hero Colors" config={config} set={set} colors={[
                { label: 'Overlay Color', key: 'hero_bg_overlay' },
                { label: 'Badge Background', key: 'hero_badge_bg' },
                { label: 'Badge Text', key: 'hero_badge_text' },
                { label: 'Title Color', key: 'hero_title_color' },
                { label: 'Subtitle Color', key: 'hero_subtitle_color' },
                { label: 'Primary CTA Background', key: 'hero_cta_primary_bg' },
                { label: 'Primary CTA Text', key: 'hero_cta_primary_text' },
                { label: 'Secondary CTA Border', key: 'hero_cta_secondary_border' },
                { label: 'Secondary CTA Text', key: 'hero_cta_secondary_text' },
              ]} />
              <div className="grid grid-cols-2 gap-4">
                <F label="Badge"><input className={i()} style={iStyle} value={config.hero_badge} onChange={e=>set('hero_badge',e.target.value)} /></F>
                <F label="Primary CTA"><input className={i()} style={iStyle} value={config.hero_cta_primary} onChange={e=>set('hero_cta_primary',e.target.value)} /></F>
              </div>
              <F label="Title"><textarea className={i()} style={iStyle} rows={2} value={config.hero_title} onChange={e=>set('hero_title',e.target.value)} /></F>
              <F label="Subtitle"><textarea className={i()} style={iStyle} rows={2} value={config.hero_subtitle} onChange={e=>set('hero_subtitle',e.target.value)} /></F>
              <F label="Secondary CTA"><input className={i()} style={iStyle} value={config.hero_cta_secondary} onChange={e=>set('hero_cta_secondary',e.target.value)} /></F>
              <F label="Background Image URL"><input className={i()} style={iStyle} value={config.hero_image} onChange={e=>set('hero_image',e.target.value)} placeholder="https://..." /><ImgPreview url={config.hero_image} /></F>
            </>}

            {/* TOURS */}
            {tab === 'tours' && <>
              <ColorGrid title="Tours Section Colors" config={config} set={set} colors={[
                { label: 'Section Background', key: 'tours_bg' },
                { label: 'Badge Color', key: 'tours_badge_color' },
                { label: 'Title Color', key: 'tours_title_color' },
                { label: 'Subtitle Color', key: 'tours_subtitle_color' },
                { label: 'Card Background', key: 'tours_card_bg' },
                { label: 'Card Border', key: 'tours_card_border' },
                { label: 'Price Color', key: 'tours_price_color' },
                { label: 'Button Background', key: 'tours_btn_bg' },
                { label: 'Button Text', key: 'tours_btn_text' },
              ]} />
              <F label="Badge"><input className={i()} style={iStyle} value={config.tours_badge} onChange={e=>set('tours_badge',e.target.value)} /></F>
              <F label="Title"><input className={i()} style={iStyle} value={config.tours_title} onChange={e=>set('tours_title',e.target.value)} /></F>
              <F label="Subtitle"><textarea className={i()} style={iStyle} rows={2} value={config.tours_subtitle} onChange={e=>set('tours_subtitle',e.target.value)} /></F>
              <F label="View All Label"><input className={i()} style={iStyle} value={config.tours_cta_label} onChange={e=>set('tours_cta_label',e.target.value)} /></F>
              <div className="rounded-xl p-4 border border-yellow-700/20" style={{ background: 'rgba(197,160,89,0.04)' }}>
                <p className="text-xs text-white/40">💡 Individual tour cards (image, title, price, highlights) are managed in the <strong className="text-white/60">Tours</strong> section.</p>
              </div>
            </>}

            {/* WHY US */}
            {tab === 'whyus' && <>
              <ColorGrid title="Why Us Colors" config={config} set={set} colors={[
                { label: 'Section Background', key: 'whyus_bg' },
                { label: 'Badge Color', key: 'whyus_badge_color' },
                { label: 'Title Color', key: 'whyus_title_color' },
                { label: 'Body Text Color', key: 'whyus_text_color' },
                { label: 'Icon Background', key: 'whyus_icon_bg' },
                { label: 'Icon Color', key: 'whyus_icon_color' },
                { label: '"Since" Color', key: 'whyus_since_color' },
              ]} />
              <div className="grid grid-cols-2 gap-4">
                <F label="Badge"><input className={i()} style={iStyle} value={config.whyus_badge} onChange={e=>set('whyus_badge',e.target.value)} /></F>
                <F label="Since Year"><input className={i()} style={iStyle} value={config.whyus_since} onChange={e=>set('whyus_since',e.target.value)} /></F>
              </div>
              <F label="Title"><input className={i()} style={iStyle} value={config.whyus_title} onChange={e=>set('whyus_title',e.target.value)} /></F>
              <F label="Subtitle"><textarea className={i()} style={iStyle} rows={2} value={config.whyus_subtitle} onChange={e=>set('whyus_subtitle',e.target.value)} /></F>
              <div>
                <label className={lbl}>Features</label>
                {config.whyus_features.map((f,idx) => (
                  <div key={idx} className="rounded-xl p-4 mb-3" style={card}>
                    <p className={lbl}>Feature {idx+1}</p>
                    <div className="grid grid-cols-[50px_1fr] gap-3 mb-2">
                      <F label="Icon"><input className={i('text-center text-lg')} style={iStyle} value={f.icon} onChange={e=>{const a=[...config.whyus_features];a[idx]={...a[idx],icon:e.target.value};set('whyus_features',a)}} /></F>
                      <F label="Title"><input className={i()} style={iStyle} value={f.title} onChange={e=>{const a=[...config.whyus_features];a[idx]={...a[idx],title:e.target.value};set('whyus_features',a)}} /></F>
                    </div>
                    <F label="Description"><textarea className={i()} style={iStyle} rows={2} value={f.desc} onChange={e=>{const a=[...config.whyus_features];a[idx]={...a[idx],desc:e.target.value};set('whyus_features',a)}} /></F>
                  </div>
                ))}
              </div>
              <div>
                <label className={lbl}>Collage Images (4)</label>
                {config.whyus_images.map((img,idx) => (
                  <div key={idx} className="flex gap-2 items-center mb-2">
                    <span className="text-[10px] text-white/25 w-4">{idx+1}</span>
                    <input className={i()} style={iStyle} value={img} placeholder="https://..." onChange={e=>{const a=[...config.whyus_images];a[idx]=e.target.value;set('whyus_images',a)}} />
                    {img && <img src={img} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10" onError={e=>(e.currentTarget.style.display='none')} />}
                  </div>
                ))}
              </div>
            </>}

            {/* MOMENTS */}
            {tab === 'moments' && <>
              <ColorGrid title="Moments Colors" config={config} set={set} colors={[
                { label: 'Section Background', key: 'moments_bg' },
                { label: 'Badge Color', key: 'moments_badge_color' },
                { label: 'Title Color', key: 'moments_title_color' },
                { label: 'Hover Overlay', key: 'moments_hover_color' },
              ]} />
              <div className="grid grid-cols-2 gap-4">
                <F label="Badge"><input className={i()} style={iStyle} value={config.moments_badge} onChange={e=>set('moments_badge',e.target.value)} /></F>
                <F label="Title"><input className={i()} style={iStyle} value={config.moments_title} onChange={e=>set('moments_title',e.target.value)} /></F>
              </div>
              <div>
                <label className={lbl}>Photos (6)</label>
                {config.moments_images.map((img,idx) => (
                  <div key={idx} className="flex gap-2 items-center mb-2">
                    <span className="text-[10px] text-white/25 w-4">{idx+1}</span>
                    <input className={i()} style={iStyle} value={img} placeholder="https://..." onChange={e=>{const a=[...config.moments_images];a[idx]=e.target.value;set('moments_images',a)}} />
                    {img && <img src={img} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10" onError={e=>(e.currentTarget.style.display='none')} />}
                  </div>
                ))}
              </div>
            </>}

            {/* TESTIMONIALS */}
            {tab === 'testimonials' && <>
              <ColorGrid title="Testimonials Colors" config={config} set={set} colors={[
                { label: 'Section Background', key: 'testimonials_bg' },
                { label: 'Card Background', key: 'testimonials_card_bg' },
                { label: 'Card Border', key: 'testimonials_card_border' },
                { label: 'Quote Mark Color', key: 'testimonials_quote_color' },
                { label: 'Quote Text Color', key: 'testimonials_text_color' },
                { label: 'Name Color', key: 'testimonials_name_color' },
                { label: 'Star Color', key: 'testimonials_star_color' },
              ]} />
              <div className="grid grid-cols-2 gap-4">
                <F label="Badge"><input className={i()} style={iStyle} value={config.testimonials_badge} onChange={e=>set('testimonials_badge',e.target.value)} /></F>
                <F label="Title"><input className={i()} style={iStyle} value={config.testimonials_title} onChange={e=>set('testimonials_title',e.target.value)} /></F>
              </div>
              {config.testimonials.map((t,idx) => (
                <div key={idx} className="rounded-xl p-5" style={card}>
                  <div className="flex justify-between mb-3">
                    <span className={lbl}>Testimonial {idx+1}</span>
                    <button onClick={()=>set('testimonials',config.testimonials.filter((_,j)=>j!==idx))} className="text-xs text-red-400/50 hover:text-red-400">Remove</button>
                  </div>
                  <F label="Quote"><textarea className={i()} style={iStyle} rows={2} value={t.quote} onChange={e=>{const a=[...config.testimonials];a[idx]={...a[idx],quote:e.target.value};set('testimonials',a)}} /></F>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <F label="Name"><input className={i()} style={iStyle} value={t.name} onChange={e=>{const a=[...config.testimonials];a[idx]={...a[idx],name:e.target.value,avatar:e.target.value.split(' ').map((n:string)=>n[0]).join('')};set('testimonials',a)}} /></F>
                    <F label="Role"><input className={i()} style={iStyle} value={t.role} onChange={e=>{const a=[...config.testimonials];a[idx]={...a[idx],role:e.target.value};set('testimonials',a)}} /></F>
                    <F label="Initials"><input className={i()} style={iStyle} value={t.avatar} maxLength={2} onChange={e=>{const a=[...config.testimonials];a[idx]={...a[idx],avatar:e.target.value.toUpperCase()};set('testimonials',a)}} /></F>
                  </div>
                </div>
              ))}
              <button onClick={()=>set('testimonials',[...config.testimonials,{quote:'',name:'',role:'',avatar:''}])}
                className="w-full py-3 rounded-xl text-sm border border-dashed border-white/15 text-white/30 hover:text-white/60 transition-all">+ Add Testimonial</button>
            </>}

            {/* CTA */}
            {tab === 'cta' && <>
              <div className="relative rounded-xl overflow-hidden h-32 flex items-center justify-center text-center p-4">
                {config.cta_image && <img src={config.cta_image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />}
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${config.cta_overlay}90, #12121290)` }} />
                <div className="relative z-10">
                  <h3 className="font-bold mb-1" style={{ color: config.cta_title_color }}>{config.cta_title}</h3>
                  <span className="px-4 py-1 rounded-full text-xs font-bold" style={{ background: config.cta_btn_bg, color: config.cta_btn_text }}>{config.cta_button}</span>
                </div>
                <div className="absolute top-2 right-3 text-[10px] text-white/20">Preview</div>
              </div>
              <ColorGrid title="CTA Colors" config={config} set={set} colors={[
                { label: 'Section Background', key: 'cta_bg' },
                { label: 'Overlay Color', key: 'cta_overlay' },
                { label: 'Title Color', key: 'cta_title_color' },
                { label: 'Subtitle Color', key: 'cta_subtitle_color' },
                { label: 'Button Background', key: 'cta_btn_bg' },
                { label: 'Button Text', key: 'cta_btn_text' },
              ]} />
              <F label="Title"><input className={i()} style={iStyle} value={config.cta_title} onChange={e=>set('cta_title',e.target.value)} /></F>
              <F label="Subtitle"><textarea className={i()} style={iStyle} rows={2} value={config.cta_subtitle} onChange={e=>set('cta_subtitle',e.target.value)} /></F>
              <F label="Button Label"><input className={i()} style={iStyle} value={config.cta_button} onChange={e=>set('cta_button',e.target.value)} /></F>
              <F label="Background Image URL"><input className={i()} style={iStyle} value={config.cta_image} onChange={e=>set('cta_image',e.target.value)} /><ImgPreview url={config.cta_image} /></F>
            </>}

            {/* JOURNAL */}
            {tab === 'journal' && <>
              <ColorGrid title="Journal Colors" config={config} set={set} colors={[
                { label: 'Section Background', key: 'journal_bg' },
                { label: 'Card Background', key: 'journal_card_bg' },
                { label: 'Card Border', key: 'journal_card_border' },
                { label: 'Title Color', key: 'journal_title_color' },
                { label: 'Badge / Category Color', key: 'journal_badge_color' },
                { label: 'Body Text Color', key: 'journal_text_color' },
                { label: 'Link Color', key: 'journal_link_color' },
              ]} />
              <div className="grid grid-cols-2 gap-4">
                <F label="Badge"><input className={i()} style={iStyle} value={config.journal_badge} onChange={e=>set('journal_badge',e.target.value)} /></F>
                <F label="Title"><input className={i()} style={iStyle} value={config.journal_title} onChange={e=>set('journal_title',e.target.value)} /></F>
              </div>
              {config.journal_posts.map((p,idx) => (
                <div key={idx} className="rounded-xl p-5" style={card}>
                  <div className="flex justify-between mb-3">
                    <span className={lbl}>Post {idx+1}</span>
                    <button onClick={()=>set('journal_posts',config.journal_posts.filter((_,j)=>j!==idx))} className="text-xs text-red-400/50 hover:text-red-400">Remove</button>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <F label="Title (x2)"><input className={i()} style={iStyle} value={p.title} onChange={e=>{const a=[...config.journal_posts];a[idx]={...a[idx],title:e.target.value};set('journal_posts',a)}} /></F>
                    <F label="Category"><input className={i()} style={iStyle} value={p.category} onChange={e=>{const a=[...config.journal_posts];a[idx]={...a[idx],category:e.target.value};set('journal_posts',a)}} /></F>
                    <F label="Date"><input className={i()} style={iStyle} value={p.date} onChange={e=>{const a=[...config.journal_posts];a[idx]={...a[idx],date:e.target.value};set('journal_posts',a)}} /></F>
                  </div>
                  <F label="Excerpt"><textarea className={i()} style={iStyle} rows={2} value={p.excerpt} onChange={e=>{const a=[...config.journal_posts];a[idx]={...a[idx],excerpt:e.target.value};set('journal_posts',a)}} /></F>
                  <div className="flex gap-3 items-start mt-3">
                    <div className="flex-1"><F label="Image URL"><input className={i()} style={iStyle} value={p.image} placeholder="https://..." onChange={e=>{const a=[...config.journal_posts];a[idx]={...a[idx],image:e.target.value};set('journal_posts',a)}} /></F></div>
                    {p.image && <img src={p.image} className="w-14 h-14 rounded-xl object-cover border border-white/10 mt-6 flex-shrink-0" onError={e=>(e.currentTarget.style.display='none')} />}
                  </div>
                </div>
              ))}
              <button onClick={()=>set('journal_posts',[...config.journal_posts,{title:'',category:'',excerpt:'',image:'',date:''}])}
                className="w-full py-3 rounded-xl text-sm border border-dashed border-white/15 text-white/30 hover:text-white/60 transition-all">+ Add Post</button>
            </>}

            {/* FOOTER */}
            {tab === 'footer' && <>
              <ColorGrid title="Footer Colors" config={config} set={set} colors={[
                { label: 'Background', key: 'footer_bg' },
                { label: 'Text Color', key: 'footer_text_color' },
                { label: 'Muted / Labels', key: 'footer_muted_color' },
                { label: 'Border Color', key: 'footer_border_color' },
                { label: 'Subscribe Button', key: 'footer_btn_bg' },
                { label: 'Subscribe Text', key: 'footer_btn_text' },
              ]} />
              <F label="Tagline"><textarea className={i()} style={iStyle} rows={2} value={config.footer_tagline} onChange={e=>set('footer_tagline',e.target.value)} /></F>
              <F label="Newsletter Text"><textarea className={i()} style={iStyle} rows={2} value={config.footer_newsletter_text} onChange={e=>set('footer_newsletter_text',e.target.value)} /></F>
              <div className="rounded-xl p-5" style={card}>
                <p className={lbl + ' mb-4'}>Contact Info</p>
                <div className="grid grid-cols-2 gap-4">
                  <F label="WhatsApp"><input className={i()} style={iStyle} value={config.footer_whatsapp} onChange={e=>set('footer_whatsapp',e.target.value.replace(/\D/g,''))} /></F>
                  <F label="Email"><input className={i()} style={iStyle} value={config.footer_email} onChange={e=>set('footer_email',e.target.value)} /></F>
                  <F label="Phone"><input className={i()} style={iStyle} value={config.footer_phone} onChange={e=>set('footer_phone',e.target.value)} /></F>
                  <F label="Address"><input className={i()} style={iStyle} value={config.footer_address} onChange={e=>set('footer_address',e.target.value)} /></F>
                </div>
              </div>
              <div className="rounded-xl p-5" style={card}>
                <p className={lbl + ' mb-4'}>Social Handles</p>
                <div className="grid grid-cols-3 gap-4">
                  <F label="📸 Instagram"><input className={i()} style={iStyle} value={config.footer_instagram} onChange={e=>set('footer_instagram',e.target.value)} /></F>
                  <F label="👤 Facebook"><input className={i()} style={iStyle} value={config.footer_facebook} onChange={e=>set('footer_facebook',e.target.value)} /></F>
                  <F label="🐦 Twitter"><input className={i()} style={iStyle} value={config.footer_twitter} onChange={e=>set('footer_twitter',e.target.value)} /></F>
                </div>
              </div>
            </>}

          </div>

          <div className="px-6 py-4 border-t border-white/6 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-[10px] text-white/20">Changes are live after saving</p>
            <div className="flex items-center gap-3">
              {saved && <span className="text-green-400 text-xs flex items-center gap-1 font-semibold"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>Saved!</span>}
              <button onClick={save} disabled={saving}
                className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #C5A059, #a07d3a)', color: '#0a0a0a' }}>
                {saving ? 'Saving...' : 'Save & Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

