#!/bin/bash
# Run from travel-agency/ root: bash fix-tour-slug.sh

mkdir -p "app/tours/[slug]"
cat > 'app/tours/[slug]/page.tsx' << 'ENDOFFILE'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getSiteConfig } from '@/lib/site-config'
import BookingForm from '@/app/components/BookingForm'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import TourTabs from './TourTabs'

export const dynamic = 'force-dynamic'

async function getTourBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error || !data) return null
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      destination: data.destination,
      country: data.country,
      price: data.price,
      duration: data.duration,
      groupSize: data.group_size || 'Max 12',
      difficulty: data.difficulty || 'Easy',
      image: data.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
      gallery: data.gallery || [],
      description: data.description || '',
      overview: data.overview || '',
      highlights: data.highlights || [],
      whatsapp_message: data.whatsapp_message || `Hi! I'm interested in the ${data.title} tour.`,
      inclusions: data.inclusions || [],
      exclusions: data.exclusions || [],
      policy: data.policy || { cancellation: '', payment: '', childPolicy: '', healthRequirements: '' },
      itinerary: data.itinerary || [],
    }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tour = await getTourBySlug(slug)
  return {
    title: tour ? `${tour.title} — LuxeVoyage` : 'Tour Not Found',
    description: tour?.description,
  }
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tour = await getTourBySlug(slug)
  if (!tour) notFound()

  const config = await getSiteConfig()

  return (
    <div style={{ background: '#0e0e0e', minHeight: '100vh' }}>
      <Navbar config={config} />

      {/* ─── Hero ─── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          priority
          className="object-cover"
          style={{ filter: 'brightness(0.45)' }}
        />
        {/* Layered gradients */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #0e0e0e 0%, rgba(14,14,14,0.5) 40%, rgba(10,35,66,0.2) 100%)',
          }}
        />
        {/* Diagonal accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom right, transparent 49%, #0e0e0e 51%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5 text-xs text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#tours" className="hover:text-white/60 transition-colors">Expeditions</Link>
            <span>/</span>
            <span style={{ color: '#C5A059' }}>{tour.title}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { icon: '📍', label: `${tour.destination}, ${tour.country}` },
              { icon: '⏱', label: tour.duration },
              { icon: '👥', label: tour.groupSize },
              { icon: '⚡', label: tour.difficulty },
            ].map((b) => (
              <span
                key={b.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/70"
                style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
              >
                <span>{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            {tour.title}
          </h1>
          <p className="text-white/50 text-base max-w-xl leading-relaxed">{tour.description}</p>
        </div>
      </section>

      {/* ─── Gallery strip ─── */}
      <div className="max-w-7xl mx-auto px-6 -mt-2 mb-8">
        <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden h-28">
          {tour.gallery.map((src: string, i: number) => (
            <div key={i} className="relative overflow-hidden group cursor-pointer">
              <Image
                src={src}
                alt={`${tour.title} gallery ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* ─── Main layout: left content + right form ─── */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* ─── LEFT COLUMN ─── */}
          <div>
            {/* Highlights pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {tour.highlights.map((h: string) => (
                <span
                  key={h}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(197,160,89,0.1)', color: '#C5A059', border: '1px solid rgba(197,160,89,0.2)' }}
                >
                  <span className="w-1 h-1 rounded-full bg-current" />
                  {h}
                </span>
              ))}
            </div>

            {/* ─── Tabs (CSS-only via details/summary for SSR) ─── */}
            <TourTabs tour={tour} />
          </div>

          {/* ─── RIGHT COLUMN — Sticky booking card ─── */}
          <div className="lg:sticky lg:top-24">
            <div
              className="rounded-3xl border border-white/8 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #1a1a1a 0%, #141414 100%)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Card header */}
              <div
                className="px-6 py-4 flex items-center justify-between border-b border-white/6"
                style={{ background: 'rgba(197,160,89,0.04)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/40 font-medium">Available to Book</span>
                </div>
                <span className="text-xs text-white/20">Secure · Confidential</span>
              </div>
              <BookingForm tour={tour} />
            </div>

            {/* Trust signals */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { icon: '🔒', label: 'Secure Booking' },
                { icon: '✈️', label: 'Free Planning' },
                { icon: '⭐', label: '5-Star Rated' },
              ].map((t) => (
                <div
                  key={t.label}
                  className="rounded-xl p-3 text-center border border-white/6"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="text-lg mb-1">{t.icon}</div>
                  <p className="text-[10px] text-white/30 leading-tight font-medium">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer config={config} />
    </div>
  )
}

ENDOFFILE

git add "app/tours/[slug]/page.tsx"
git commit -m "Fix tour slug page to fetch from Supabase"
git push
echo "✅ Done — Vercel will redeploy automatically"
