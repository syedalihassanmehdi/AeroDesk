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

