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
          <Link href="/login" className="text-sm transition-colors px-3 py-1.5 hover:opacity-80" style={{ color: config.nav_text }}>
            Admin Login
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

