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

