import { getSupabaseClient } from '@/lib/supabase'
import { TourCard } from './TourCard'
import type { SiteConfig } from '@/lib/site-config'

async function getTours() {
  try {
    const { data, error } = await getSupabaseClient().from('tours').select('*').order('created_at', { ascending: false })
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
