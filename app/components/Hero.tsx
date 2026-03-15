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

