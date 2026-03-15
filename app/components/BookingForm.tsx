'use client'
import { useState, useMemo } from 'react'
import type { TourData } from '@/app/data/tours'

interface BookingFormProps {
  tour: TourData
  whatsappNumber?: string
}

export default function BookingForm({ tour, whatsappNumber = '15551234567' }: BookingFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    travel_date: '',
    travelers: 2,
    special_requests: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const totalPrice = useMemo(() => tour.price * form.travelers, [tour.price, form.travelers])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tour_id: tour.id,
          tour_title: tour.title,
          total_price: totalPrice,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const msg = `Hi! I'd like to book the *${tour.title}* tour.\n\n👤 Name: ${form.name || '[Your name]'}\n📧 Email: ${form.email || '[Your email]'}\n📞 Phone: ${form.phone || '[Your phone]'}\n📅 Travel Date: ${form.travel_date || '[Select date]'}\n👥 Travelers: ${form.travelers}\n💰 Total: $${totalPrice.toLocaleString()}${form.special_requests ? `\n💬 Requests: ${form.special_requests}` : ''}\n\nPlease confirm availability.`
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl"
          style={{ background: 'rgba(197,160,89,0.12)', color: '#C5A059' }}
        >
          ✓
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Booking Request Sent!</h3>
        <p className="text-white/45 text-sm leading-relaxed max-w-xs mx-auto">
          Our team will reach out within 24 hours to confirm your{' '}
          <span style={{ color: '#C5A059' }}>{tour.title}</span> experience.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-xs text-white/30 hover:text-white/60 transition-colors underline underline-offset-4"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Price display */}
      <div className="mb-6 pb-5 border-b border-white/8">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold" style={{ color: '#C5A059' }}>
            ${tour.price.toLocaleString()}
          </span>
          <span className="text-white/40 text-sm">/ person</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs text-white/30">{tour.duration}</span>
          <span className="text-white/15">·</span>
          <span className="text-xs text-white/30">{tour.groupSize}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-semibold">
            Full Name *
          </label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 focus:border-yellow-600/40 focus:outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-semibold">
            Email *
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 focus:border-yellow-600/40 focus:outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-semibold">
            Phone Number *
          </label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+1 234 567 890"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 focus:border-yellow-600/40 focus:outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          />
        </div>

        {/* Travel Date */}
        <div>
          <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-semibold">
            Travel Date *
          </label>
          <input
            required
            type="date"
            value={form.travel_date}
            onChange={(e) => setForm({ ...form, travel_date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-xl text-sm text-white border border-white/8 focus:border-yellow-600/40 focus:outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', colorScheme: 'dark' }}
          />
        </div>

        {/* Travelers */}
        <div>
          <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-semibold">
            Travelers
          </label>
          <div className="flex items-center gap-0 rounded-xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, travelers: Math.max(1, f.travelers - 1) }))}
              className="w-12 h-12 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all text-lg font-light flex-shrink-0"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <span className="text-white font-semibold">{form.travelers}</span>
              <span className="text-white/30 text-xs ml-1">{form.travelers === 1 ? 'person' : 'people'}</span>
            </div>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, travelers: Math.min(20, f.travelers + 1) }))}
              className="w-12 h-12 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all text-lg font-light flex-shrink-0"
            >
              +
            </button>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-semibold">
            Special Requests{' '}
            <span className="normal-case text-white/20 tracking-normal font-normal">(optional)</span>
          </label>
          <textarea
            value={form.special_requests}
            onChange={(e) => setForm({ ...form, special_requests: e.target.value })}
            placeholder="Dietary requirements, accessibility needs, special occasions..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 focus:border-yellow-600/40 focus:outline-none transition-all resize-none"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          />
        </div>

        {/* Total Price */}
        <div
          className="rounded-xl p-4 flex items-center justify-between"
          style={{ background: 'rgba(197,160,89,0.07)', border: '1px solid rgba(197,160,89,0.18)' }}
        >
          <div>
            <p className="text-[10px] text-white/35 uppercase tracking-widest font-semibold">Total Price</p>
            <p className="text-xs text-white/40 mt-0.5">
              ${tour.price.toLocaleString()} × {form.travelers} {form.travelers === 1 ? 'person' : 'people'}
            </p>
          </div>
          <p className="text-2xl font-bold" style={{ color: '#C5A059' }}>
            ${totalPrice.toLocaleString()}
          </p>
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        {/* Book Now */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
          style={{
            background: 'linear-gradient(135deg, #C5A059 0%, #a07d3a 100%)',
            color: '#0a0a0a',
            boxShadow: '0 8px 24px rgba(197,160,89,0.3)',
          }}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
              </svg>
              Processing...
            </span>
          ) : (
            'Book Now'
          )}
        </button>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2.5 border border-green-500/25 hover:border-green-500/50"
          style={{ background: 'rgba(37,211,102,0.08)', color: '#25D366' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Inquire on WhatsApp
        </button>

        <p className="text-center text-[10px] text-white/20 leading-relaxed">
          Free cancellation · No payment due now · Secure & confidential
        </p>
      </form>
    </div>
  )
}
