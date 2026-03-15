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

