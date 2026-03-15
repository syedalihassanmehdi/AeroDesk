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

