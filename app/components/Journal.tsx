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

