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

