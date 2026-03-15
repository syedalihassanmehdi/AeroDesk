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

