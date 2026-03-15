#!/bin/bash
# Run from travel-agency/ root: bash fix-colors-v2.sh

echo "Writing lib/site-config.ts..."
cat > 'lib/site-config.ts' << 'ENDOFFILE'
import { supabase } from './supabase'

export interface SiteConfig {
  // Branding
  agency_name: string
  logo_url: string
  primary_color: string
  accent_color: string
  font_body: string

  // Navbar colors
  nav_bg: string
  nav_text: string
  nav_cta_bg: string
  nav_cta_text: string

  // Hero colors
  hero_bg_overlay: string
  hero_badge_bg: string
  hero_badge_text: string
  hero_title_color: string
  hero_subtitle_color: string
  hero_cta_primary_bg: string
  hero_cta_primary_text: string
  hero_cta_secondary_border: string
  hero_cta_secondary_text: string

  // Tours section colors
  tours_bg: string
  tours_badge_color: string
  tours_title_color: string
  tours_subtitle_color: string
  tours_card_bg: string
  tours_card_border: string
  tours_price_color: string
  tours_btn_bg: string
  tours_btn_text: string

  // Why Us colors
  whyus_bg: string
  whyus_badge_color: string
  whyus_title_color: string
  whyus_text_color: string
  whyus_icon_bg: string
  whyus_icon_color: string
  whyus_since_color: string

  // Moments colors
  moments_bg: string
  moments_title_color: string
  moments_badge_color: string
  moments_hover_color: string

  // Testimonials colors
  testimonials_bg: string
  testimonials_card_bg: string
  testimonials_card_border: string
  testimonials_quote_color: string
  testimonials_text_color: string
  testimonials_name_color: string
  testimonials_star_color: string

  // CTA colors
  cta_bg: string
  cta_overlay: string
  cta_title_color: string
  cta_subtitle_color: string
  cta_btn_bg: string
  cta_btn_text: string

  // Journal colors
  journal_bg: string
  journal_card_bg: string
  journal_card_border: string
  journal_title_color: string
  journal_badge_color: string
  journal_text_color: string
  journal_link_color: string

  // Footer colors
  footer_bg: string
  footer_text_color: string
  footer_muted_color: string
  footer_border_color: string
  footer_btn_bg: string
  footer_btn_text: string

  // Hero content
  hero_badge: string
  hero_title: string
  hero_subtitle: string
  hero_image: string
  hero_cta_primary: string
  hero_cta_secondary: string

  // Tours section content
  tours_badge: string
  tours_title: string
  tours_subtitle: string
  tours_cta_label: string

  // Why Us content
  whyus_badge: string
  whyus_title: string
  whyus_subtitle: string
  whyus_since: string
  whyus_features: { icon: string; title: string; desc: string }[]
  whyus_images: string[]

  // Moments content
  moments_title: string
  moments_badge: string
  moments_images: string[]

  // Testimonials content
  testimonials_badge: string
  testimonials_title: string
  testimonials: { quote: string; name: string; role: string; avatar: string }[]

  // CTA content
  cta_title: string
  cta_subtitle: string
  cta_button: string
  cta_image: string

  // Journal content
  journal_badge: string
  journal_title: string
  journal_posts: { title: string; category: string; excerpt: string; image: string; date: string }[]

  // Footer content
  footer_tagline: string
  footer_whatsapp: string
  footer_email: string
  footer_phone: string
  footer_address: string
  footer_instagram: string
  footer_facebook: string
  footer_twitter: string
  footer_newsletter_text: string

  // Navbar content
  nav_links: { label: string; href: string }[]
}

export const DEFAULT_CONFIG: SiteConfig = {
  agency_name: 'LuxeVoyage',
  logo_url: '',
  primary_color: '#0A2342',
  accent_color: '#C5A059',
  font_body: 'Inter',

  nav_bg: '#0a0a0a',
  nav_text: 'rgba(255,255,255,0.7)',
  nav_cta_bg: '#C5A059',
  nav_cta_text: '#121212',

  hero_bg_overlay: '#0A2342',
  hero_badge_bg: 'rgba(197,160,89,0.15)',
  hero_badge_text: '#C5A059',
  hero_title_color: '#ffffff',
  hero_subtitle_color: 'rgba(255,255,255,0.6)',
  hero_cta_primary_bg: '#C5A059',
  hero_cta_primary_text: '#121212',
  hero_cta_secondary_border: 'rgba(255,255,255,0.25)',
  hero_cta_secondary_text: 'rgba(255,255,255,0.8)',

  tours_bg: '#121212',
  tours_badge_color: 'rgba(255,255,255,0.3)',
  tours_title_color: '#ffffff',
  tours_subtitle_color: 'rgba(255,255,255,0.4)',
  tours_card_bg: '#1c1c1c',
  tours_card_border: 'rgba(255,255,255,0.08)',
  tours_price_color: '#C5A059',
  tours_btn_bg: 'rgba(197,160,89,0.12)',
  tours_btn_text: '#C5A059',

  whyus_bg: '#0f0f0f',
  whyus_badge_color: 'rgba(255,255,255,0.3)',
  whyus_title_color: '#ffffff',
  whyus_text_color: 'rgba(255,255,255,0.5)',
  whyus_icon_bg: 'rgba(197,160,89,0.12)',
  whyus_icon_color: '#C5A059',
  whyus_since_color: '#C5A059',

  moments_bg: '#121212',
  moments_title_color: '#ffffff',
  moments_badge_color: 'rgba(255,255,255,0.3)',
  moments_hover_color: 'rgba(197,160,89,0.25)',

  testimonials_bg: '#0f0f0f',
  testimonials_card_bg: '#1c1c1c',
  testimonials_card_border: 'rgba(255,255,255,0.08)',
  testimonials_quote_color: '#C5A059',
  testimonials_text_color: 'rgba(255,255,255,0.6)',
  testimonials_name_color: '#ffffff',
  testimonials_star_color: '#C5A059',

  cta_bg: '#121212',
  cta_overlay: '#0A2342',
  cta_title_color: '#ffffff',
  cta_subtitle_color: 'rgba(255,255,255,0.5)',
  cta_btn_bg: '#C5A059',
  cta_btn_text: '#121212',

  journal_bg: '#0f0f0f',
  journal_card_bg: '#1c1c1c',
  journal_card_border: 'rgba(255,255,255,0.08)',
  journal_title_color: '#ffffff',
  journal_badge_color: '#C5A059',
  journal_text_color: 'rgba(255,255,255,0.4)',
  journal_link_color: '#C5A059',

  footer_bg: '#0a0a0a',
  footer_text_color: 'rgba(255,255,255,0.35)',
  footer_muted_color: 'rgba(255,255,255,0.25)',
  footer_border_color: 'rgba(255,255,255,0.06)',
  footer_btn_bg: '#C5A059',
  footer_btn_text: '#121212',

  hero_badge: 'The Private Agency',
  hero_title: 'The Art of Extraordinary Travel',
  hero_subtitle: 'Immersive journeys designed for those who dare to claim and live the extraordinary.',
  hero_image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80',
  hero_cta_primary: 'Explore Expeditions',
  hero_cta_secondary: 'Plan Your Journey',

  tours_badge: 'Curated Collection',
  tours_title: 'Signature Expeditions',
  tours_subtitle: "Curated selection of the world's most evocative landscapes and cultural heritage sites.",
  tours_cta_label: 'View All Tours',

  whyus_badge: 'The LuxeVoyage Standard',
  whyus_title: 'Why Choose LuxeVoyage',
  whyus_subtitle: 'We believe luxury is found through exclusive access, expert curation, and a seamless execution.',
  whyus_since: '2009',
  whyus_features: [
    { icon: '✦', title: 'Bespoke Itineraries', desc: 'Tailored private experiences with your personal travel consultant on a blank canvas, painted with your wishes.' },
    { icon: '◈', title: 'Exclusive Access', desc: 'Unbeatable exclusive guarded access to pre-closed, off-market experiences reserved for a select few.' },
    { icon: '◎', title: 'White-Glove Service', desc: '24/7 dedicated concierge at your fingertips ensuring perfection at all moments.' },
  ],
  whyus_images: [
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
  ],

  moments_title: 'Travel Moments',
  moments_badge: 'Through the lens',
  moments_images: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    'https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=400&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80',
  ],

  testimonials_badge: 'Client Stories',
  testimonials_title: 'Voices of the Modern Voyager',
  testimonials: [
    { quote: 'The level of detail provided by LuxeVoyage is unparalleled.', name: 'Elena Rodriguez', role: 'CEO', avatar: 'ER' },
    { quote: 'I have never found the balance between adventure and absolute luxury like this.', name: 'Marcus Chen', role: 'Entrepreneur', avatar: 'MC' },
    { quote: 'LuxeVoyage crafts life-changing moments. The private access was unforgettable.', name: 'Thomas Pierre', role: 'Private Investor', avatar: 'TP' },
  ],

  cta_title: 'Your Journey Begins Here',
  cta_subtitle: 'Step into a world of curated elegance and discovery. Our consultants are waiting to design your masterpiece.',
  cta_button: 'Start Planning',
  cta_image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80',

  journal_badge: 'Stories & Insights',
  journal_title: 'The Journal',
  journal_posts: [
    { title: "The Hidden Gems of London's Historic Quarter", category: 'Destinations', excerpt: 'Uncovering the lesser-known treasures of this magnificent city...', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80', date: 'Mar 8, 2026' },
    { title: 'Conservation & Luxury: The New Safari', category: 'Experiences', excerpt: 'How modern safari camps are redefining the balance...', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', date: 'Feb 22, 2026' },
    { title: 'The Secret Tables of the Mediterranean', category: 'Culinary', excerpt: "A guide to dining experiences you won't find in any guidebook...", image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', date: 'Feb 14, 2026' },
  ],

  footer_tagline: 'Crafting extraordinary journeys for the discerning traveler since 2009.',
  footer_whatsapp: '15551234567',
  footer_email: 'hello@luxevoyage.com',
  footer_phone: '+1 555 123 4567',
  footer_address: 'Dubai, UAE',
  footer_instagram: 'luxevoyage',
  footer_facebook: 'luxevoyage',
  footer_twitter: 'luxevoyage',
  footer_newsletter_text: 'Curated travel inspiration and exclusive offers, delivered monthly.',

  nav_links: [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Journal', href: '#journal' },
    { label: 'About', href: '#about' },
  ],
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .eq('id', 1)
      .single()

    if (error || !data) return DEFAULT_CONFIG

    const merged: SiteConfig = {} as SiteConfig
    for (const key of Object.keys(DEFAULT_CONFIG) as (keyof SiteConfig)[]) {
      const val = data[key]
      ;(merged as any)[key] = (val !== undefined && val !== null) ? val : (DEFAULT_CONFIG as any)[key]
    }
    return merged
  } catch {
    return DEFAULT_CONFIG
  }
}

ENDOFFILE

echo "Writing app/page.tsx..."
cat > 'app/page.tsx' << 'ENDOFFILE'
import { getSiteConfig } from '@/lib/site-config'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ToursSection from './components/ToursSection'
import WhyUs from './components/WhyUs'
import TravelMoments from './components/TravelMoments'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import Journal from './components/Journal'
import Footer from './components/Footer'

export const revalidate = 0

export default async function HomePage() {
  const config = await getSiteConfig()

  return (
    <main style={{ background: config.tours_bg, minHeight: '100vh' }}>
      <Navbar config={config} />
      <Hero config={config} />
      <ToursSection config={config} />
      <WhyUs config={config} />
      <TravelMoments config={config} />
      <Testimonials config={config} />
      <CTABanner config={config} />
      <Journal config={config} />
      <Footer config={config} />
    </main>
  )
}

ENDOFFILE

echo "Writing app/dashboard/site-editor/page.tsx..."
cat > 'app/dashboard/site-editor/page.tsx' << 'ENDOFFILE'
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

ENDOFFILE

echo "Writing app/components/Navbar.tsx..."
cat > 'app/components/Navbar.tsx' << 'ENDOFFILE'
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { SiteConfig } from '@/lib/site-config'

export default function Navbar({ config }: { config: SiteConfig }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}
      style={scrolled ? { background: config.nav_bg + 'f5' } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {config.logo_url
            ? <img src={config.logo_url} alt={config.agency_name} className="h-8 object-contain" />
            : <span className="text-xl font-bold tracking-tight" style={{ color: config.nav_cta_bg }}>{config.agency_name}</span>
          }
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {config.nav_links.map(link => (
            <a key={link.label} href={link.href}
              className="text-sm font-medium transition-colors duration-200 tracking-wide hover:opacity-100"
              style={{ color: config.nav_text }}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard" className="text-sm transition-colors px-3 py-1.5 hover:opacity-80" style={{ color: config.nav_text }}>
            Dashboard
          </Link>
          <a href="#tours"
            className="text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ background: config.nav_cta_bg, color: config.nav_cta_text }}>
            {config.hero_cta_primary}
          </a>
        </div>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: config.nav_text }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ background: config.nav_text }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: config.nav_text }} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-t border-white/5 px-6 py-6 flex flex-col gap-5"
          style={{ background: config.nav_bg }}>
          {config.nav_links.map(link => (
            <a key={link.label} href={link.href} className="text-lg font-medium transition-colors"
              style={{ color: config.nav_text }} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#tours" className="mt-2 text-sm font-semibold px-5 py-3 rounded-full text-center"
            style={{ background: config.nav_cta_bg, color: config.nav_cta_text }}
            onClick={() => setMenuOpen(false)}>
            {config.hero_cta_primary}
          </a>
        </div>
      )}
    </nav>
  )
}

ENDOFFILE

echo "Writing app/components/Hero.tsx..."
cat > 'app/components/Hero.tsx' << 'ENDOFFILE'
'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { SiteConfig } from '@/lib/site-config'

export default function Hero({ config }: { config: SiteConfig }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src={config.hero_image} alt="Hero" fill className="object-cover scale-105" priority style={{ filter: 'brightness(0.45)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${config.hero_bg_overlay}50 0%, transparent 50%, rgba(18,18,18,0.95) 100%)` }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8 border transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ background: config.hero_badge_bg, color: config.hero_badge_text, borderColor: config.hero_badge_text + '40' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {config.hero_badge}
        </div>

        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ color: config.hero_title_color, transitionDelay: '150ms', letterSpacing: '-0.02em' }}>
          {config.hero_title.split('\n').map((line, i) => (
            <span key={i}>{i > 0 && <br />}
              {i === 1 ? <span style={{ color: config.accent_color }}>{line}</span> : line}
            </span>
          ))}
        </h1>

        <p className={`text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ color: config.hero_subtitle_color, transitionDelay: '300ms' }}>
          {config.hero_subtitle}
        </p>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '450ms' }}>
          <a href="#tours" className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
            style={{ background: config.hero_cta_primary_bg, color: config.hero_cta_primary_text, boxShadow: `0 8px 32px ${config.hero_cta_primary_bg}55` }}>
            {config.hero_cta_primary}
          </a>
          <a href="#about" className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide border transition-all duration-300 hover:opacity-80"
            style={{ borderColor: config.hero_cta_secondary_border, color: config.hero_cta_secondary_text }}>
            {config.hero_cta_secondary}
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs tracking-widest uppercase" style={{ color: config.hero_subtitle_color }}>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  )
}

ENDOFFILE

echo "Writing app/components/ToursSection.tsx..."
cat > 'app/components/ToursSection.tsx' << 'ENDOFFILE'
import { supabase } from '@/lib/supabase'
import { TourCard } from './TourCard'
import type { SiteConfig } from '@/lib/site-config'

async function getTours() {
  try {
    const { data, error } = await supabase.from('tours').select('*').order('created_at', { ascending: false })
    if (error || !data) return []
    return data.map((t: any) => ({
      id: t.id, slug: t.slug, title: t.title, destination: t.destination, country: t.country,
      price: t.price, duration: t.duration, groupSize: t.group_size || 'Max 12',
      difficulty: t.difficulty || 'Easy',
      image: t.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
      gallery: t.gallery || [], description: t.description || '', overview: t.overview || '',
      highlights: t.highlights || [], whatsapp_message: t.whatsapp_message || `Hi! I'm interested in the ${t.title} tour.`,
      inclusions: t.inclusions || [], exclusions: t.exclusions || [],
      policy: t.policy || { cancellation:'', payment:'', childPolicy:'', healthRequirements:'' },
      itinerary: t.itinerary || [],
    }))
  } catch { return [] }
}

export default async function ToursSection({ config }: { config: SiteConfig }) {
  const tours = await getTours()
  return (
    <section id="tours" className="py-24 px-6" style={{ background: config.tours_bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: config.tours_badge_color }}>{config.tours_badge}</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: config.tours_title_color }}>
              {config.tours_title.split(' ').slice(0,-1).join(' ')}<br />
              <span style={{ color: config.accent_color }}>{config.tours_title.split(' ').slice(-1)}</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: config.tours_subtitle_color }}>{config.tours_subtitle}</p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-sm font-medium hover:opacity-80" style={{ color: config.accent_color }}>
            {config.tours_cta_label}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.length === 0 ? (
            <div className="col-span-3 text-center py-20" style={{ color: config.tours_subtitle_color }}>
              <div className="text-5xl mb-4">🗺️</div>
              <p className="text-base">No tours available yet.</p>
              <p className="text-sm mt-1 opacity-60">Check back soon.</p>
            </div>
          ) : (
            tours.map((tour: any) => (
              <TourCard key={tour.id} tour={tour}
                cardBg={config.tours_card_bg}
                cardBorder={config.tours_card_border}
                priceColor={config.tours_price_color}
                btnBg={config.tours_btn_bg}
                btnText={config.tours_btn_text}
                accentColor={config.accent_color}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

ENDOFFILE

echo "Writing app/components/TourCard.tsx..."
cat > 'app/components/TourCard.tsx' << 'ENDOFFILE'
'use client'
import Image from 'next/image'
import Link from 'next/link'

export interface Tour {
  id: string
  slug: string
  title: string
  destination: string
  country?: string
  price: number
  duration: string
  highlights: string[]
  image: string
  whatsapp_message: string
  description?: string
}

interface TourCardProps {
  tour: Tour
  cardBg?: string
  cardBorder?: string
  priceColor?: string
  btnBg?: string
  btnText?: string
  accentColor?: string
}

export function TourCard({
  tour,
  cardBg = '#1c1c1c',
  cardBorder = 'rgba(255,255,255,0.08)',
  priceColor = '#C5A059',
  btnBg = 'rgba(197,160,89,0.12)',
  btnText = '#C5A059',
  accentColor = '#C5A059',
}: TourCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
      style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
      <div className="relative h-52 overflow-hidden">
        <Image src={tour.image} alt={tour.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${cardBg}e6 0%, transparent 60%)` }} />
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(18,18,18,0.75)', color: accentColor, backdropFilter: 'blur(8px)' }}>
          {tour.duration}
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {tour.destination}{tour.country ? `, ${tour.country}` : ''}
        </p>
        <h3 className="text-lg font-bold text-white mb-3 leading-tight">{tour.title}</h3>

        {tour.highlights?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tour.highlights.slice(0, 3).map((h, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${cardBorder}` }}>
          <div>
            <p className="text-xs uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>From</p>
            <p className="text-xl font-bold" style={{ color: priceColor }}>${tour.price.toLocaleString()}</p>
          </div>
          <Link href={`/tours/${tour.slug}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-105 group/btn"
            style={{ background: btnBg, color: btnText, border: `1px solid ${btnText}40` }}>
            View Details
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

ENDOFFILE

echo "Writing app/components/WhyUs.tsx..."
cat > 'app/components/WhyUs.tsx' << 'ENDOFFILE'
import Image from 'next/image'
import type { SiteConfig } from '@/lib/site-config'

export default function WhyUs({ config }: { config: SiteConfig }) {
  return (
    <section id="about" className="py-24 px-6" style={{ background: config.whyus_bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[520px] hidden lg:block">
            {config.whyus_images[0] && <div className="absolute top-0 left-0 w-[58%] h-[55%] rounded-2xl overflow-hidden"><Image src={config.whyus_images[0]} alt="" fill className="object-cover" /></div>}
            {config.whyus_images[1] && <div className="absolute top-[10%] right-0 w-[38%] h-[40%] rounded-2xl overflow-hidden"><Image src={config.whyus_images[1]} alt="" fill className="object-cover" /></div>}
            {config.whyus_images[2] && <div className="absolute bottom-0 left-[5%] w-[42%] h-[40%] rounded-2xl overflow-hidden"><Image src={config.whyus_images[2]} alt="" fill className="object-cover" /></div>}
            {config.whyus_images[3] && <div className="absolute bottom-[5%] right-[2%] w-[48%] h-[42%] rounded-2xl overflow-hidden"><Image src={config.whyus_images[3]} alt="" fill className="object-cover" /></div>}
            <div className="absolute top-[48%] left-[30%] px-4 py-2.5 rounded-xl text-center z-10 border border-white/10"
              style={{ background: 'rgba(10,35,66,0.9)', backdropFilter: 'blur(8px)' }}>
              <p className="text-xs uppercase tracking-wider" style={{ color: config.whyus_badge_color }}>Since</p>
              <p className="text-lg font-bold" style={{ color: config.whyus_since_color }}>{config.whyus_since}</p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: config.whyus_badge_color }}>{config.whyus_badge}</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: config.whyus_title_color }}>
              {config.whyus_title.split(' ').slice(0,-1).join(' ')}<br />
              <span style={{ color: config.accent_color }}>{config.whyus_title.split(' ').slice(-1)}</span>
            </h2>
            <p className="text-sm leading-relaxed mb-10 max-w-md" style={{ color: config.whyus_text_color }}>{config.whyus_subtitle}</p>
            <div className="flex flex-col gap-7">
              {config.whyus_features.map(f => (
                <div key={f.title} className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                    style={{ background: config.whyus_icon_bg, color: config.whyus_icon_color }}>
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1.5" style={{ color: config.whyus_title_color }}>{f.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: config.whyus_text_color }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

ENDOFFILE

echo "Writing app/components/TravelMoments.tsx..."
cat > 'app/components/TravelMoments.tsx' << 'ENDOFFILE'
import Image from 'next/image'
import type { SiteConfig } from '@/lib/site-config'

export default function TravelMoments({ config }: { config: SiteConfig }) {
  return (
    <section id="experiences" className="py-24 px-6" style={{ background: config.moments_bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest mb-3 italic" style={{ color: config.moments_badge_color }}>{config.moments_badge}</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: config.moments_title_color }}>
            {config.moments_title.split(' ').slice(0,-1).join(' ')}{' '}
            <span style={{ color: config.accent_color }}>{config.moments_title.split(' ').slice(-1)}</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {config.moments_images.map((src, i) => (
            <div key={i} className={`relative rounded-2xl overflow-hidden group cursor-pointer ${i === 0 || i === 4 ? 'col-span-2' : ''}`}>
              <Image src={src} alt={`Moment ${i+1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: config.moments_hover_color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

ENDOFFILE

echo "Writing app/components/Testimonials.tsx..."
cat > 'app/components/Testimonials.tsx' << 'ENDOFFILE'
import type { SiteConfig } from '@/lib/site-config'

export default function Testimonials({ config }: { config: SiteConfig }) {
  return (
    <section className="py-24 px-6" style={{ background: config.testimonials_bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: config.testimonials_quote_color }}>{config.testimonials_badge}</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: config.testimonials_name_color }}>
            {config.testimonials_title.split(' ').slice(0,3).join(' ')}<br />
            <span style={{ color: config.accent_color }}>{config.testimonials_title.split(' ').slice(3).join(' ')}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl p-7 flex flex-col justify-between transition-all duration-300"
              style={{ background: config.testimonials_card_bg, border: `1px solid ${config.testimonials_card_border}` }}>
              <div>
                <div className="text-5xl font-serif mb-4 leading-none" style={{ color: config.testimonials_quote_color, opacity: 0.4 }}>"</div>
                <p className="text-sm leading-relaxed mb-8" style={{ color: config.testimonials_text_color }}>{t.quote}</p>
              </div>
              <div className="flex items-center gap-3 pt-5" style={{ borderTop: `1px solid ${config.testimonials_card_border}` }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: config.testimonials_quote_color + '25', color: config.testimonials_quote_color }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: config.testimonials_name_color }}>{t.name}</p>
                  <p className="text-xs" style={{ color: config.testimonials_text_color }}>{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_,j) => <span key={j} className="text-xs" style={{ color: config.testimonials_star_color }}>★</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

ENDOFFILE

echo "Writing app/components/CTABanner.tsx..."
cat > 'app/components/CTABanner.tsx' << 'ENDOFFILE'
import Image from 'next/image'
import type { SiteConfig } from '@/lib/site-config'

export default function CTABanner({ config }: { config: SiteConfig }) {
  return (
    <section className="py-24 px-6" style={{ background: config.cta_bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden py-24 px-8 text-center">
          <Image src={config.cta_image} alt="CTA" fill className="object-cover" style={{ filter: 'brightness(0.25)' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${config.cta_overlay}b0 0%, rgba(18,18,18,0.4) 100%)` }} />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: config.cta_subtitle_color }}>Begin Your Story</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-5 leading-tight" style={{ color: config.cta_title_color }}>{config.cta_title}</h2>
            <p className="text-base max-w-md mx-auto mb-10 leading-relaxed" style={{ color: config.cta_subtitle_color }}>{config.cta_subtitle}</p>
            <a href="#tours"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
              style={{ background: config.cta_btn_bg, color: config.cta_btn_text, boxShadow: `0 8px 32px ${config.cta_btn_bg}60` }}>
              {config.cta_button}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

ENDOFFILE

echo "Writing app/components/Journal.tsx..."
cat > 'app/components/Journal.tsx' << 'ENDOFFILE'
import Image from 'next/image'
import type { SiteConfig } from '@/lib/site-config'

export default function Journal({ config }: { config: SiteConfig }) {
  return (
    <section id="journal" className="py-24 px-6" style={{ background: config.journal_bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: config.journal_badge_color }}>{config.journal_badge}</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: config.journal_title_color }}>
              {config.journal_title.split(' ').slice(0,-1).join(' ')}{' '}
              <span style={{ color: config.accent_color }}>{config.journal_title.split(' ').slice(-1)}</span>
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-sm font-medium hover:opacity-80" style={{ color: config.journal_link_color }}>
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.journal_posts.map((post, i) => (
            <article key={i} className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: config.journal_card_bg, border: `1px solid ${config.journal_card_border}` }}>
              <div className="relative h-48 overflow-hidden">
                {post.image && <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(18,18,18,0.75)', color: config.journal_badge_color, backdropFilter: 'blur(8px)' }}>
                  {post.category}
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs mb-2" style={{ color: config.journal_text_color }}>{post.date}</p>
                <h3 className="font-semibold text-base leading-snug mb-2" style={{ color: config.journal_title_color }}>{post.title}</h3>
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: config.journal_text_color }}>{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium" style={{ color: config.journal_link_color }}>
                  Read More
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

ENDOFFILE

echo "Writing app/components/Footer.tsx..."
cat > 'app/components/Footer.tsx' << 'ENDOFFILE'
import Link from 'next/link'
import type { SiteConfig } from '@/lib/site-config'

const COMPANY = ['About Us', 'Our Team', 'Careers', 'Press', 'Contact']
const DESTINATIONS = ['Europe', 'Asia Pacific', 'Middle East', 'Africa', 'Americas']
const LEGAL = ['Privacy Policy', 'Terms of Service', 'Cookie Policy']

export default function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer style={{ background: config.footer_bg, borderTop: `1px solid ${config.footer_border_color}` }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          <div>
            {config.logo_url
              ? <img src={config.logo_url} alt={config.agency_name} className="h-8 object-contain mb-4" />
              : <span className="text-2xl font-bold" style={{ color: config.accent_color }}>{config.agency_name}</span>
            }
            <p className="text-sm leading-relaxed mt-4 mb-6 max-w-xs" style={{ color: config.footer_text_color }}>{config.footer_tagline}</p>
            <div className="flex gap-3">
              {[
                { handle: config.footer_instagram, url: `https://instagram.com/${config.footer_instagram}`, label: 'IG' },
                { handle: config.footer_twitter,   url: `https://x.com/${config.footer_twitter}`,          label: 'TW' },
                { handle: config.footer_facebook,  url: `https://facebook.com/${config.footer_facebook}`,  label: 'FB' },
              ].filter(s => s.handle).map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold uppercase transition-all"
                  style={{ border: `1px solid ${config.footer_border_color}`, color: config.footer_muted_color }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: config.footer_muted_color }}>Company</h4>
            <ul className="flex flex-col gap-3">
              {COMPANY.map(item => (
                <li key={item}><a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: config.footer_text_color }}>{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: config.footer_muted_color }}>Destinations</h4>
            <ul className="flex flex-col gap-3">
              {DESTINATIONS.map(dest => (
                <li key={dest}><a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: config.footer_text_color }}>{dest}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: config.footer_muted_color }}>Newsletter</h4>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: config.footer_text_color }}>{config.footer_newsletter_text}</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm placeholder-white/20 focus:outline-none transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${config.footer_border_color}`, color: config.footer_muted_color }} />
              <button className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: config.footer_btn_bg, color: config.footer_btn_text }}>Subscribe</button>
            </div>
          </div>
        </div>

        {(config.footer_email || config.footer_phone || config.footer_address) && (
          <div className="flex flex-wrap gap-6 py-5 mb-6" style={{ borderTop: `1px solid ${config.footer_border_color}`, borderBottom: `1px solid ${config.footer_border_color}` }}>
            {config.footer_email && <a href={`mailto:${config.footer_email}`} className="flex items-center gap-2 text-xs hover:opacity-80" style={{ color: config.footer_text_color }}><span>📧</span>{config.footer_email}</a>}
            {config.footer_phone && <a href={`tel:${config.footer_phone}`} className="flex items-center gap-2 text-xs hover:opacity-80" style={{ color: config.footer_text_color }}><span>📞</span>{config.footer_phone}</a>}
            {config.footer_address && <span className="flex items-center gap-2 text-xs" style={{ color: config.footer_text_color }}><span>📍</span>{config.footer_address}</span>}
            {config.footer_whatsapp && (
              <a href={`https://wa.me/${config.footer_whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold transition-colors hover:opacity-80" style={{ color: '#25D366' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            )}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: config.footer_muted_color }}>© {new Date().getFullYear()} {config.agency_name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {LEGAL.map(item => <a key={item} href="#" className="text-xs hover:opacity-70 transition-colors" style={{ color: config.footer_muted_color }}>{item}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

ENDOFFILE

echo "✅ Done. Restart: npm run dev"