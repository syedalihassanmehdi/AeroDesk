'use client'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type SortKey = 'title' | 'price' | 'destination'

interface Tour {
  id: string
  slug: string
  title: string
  destination: string
  country: string
  price: number
  duration: string
  group_size: string
  difficulty: string
  image: string
  highlights: string[]
  created_at: string
}

export default function ToursManagePage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('title')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    fetch('/api/tours')
      .then(r => r.json())
      .then(data => { setTours(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return tours
      .filter(t => !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === 'price') return a.price - b.price
        if (sort === 'destination') return a.destination.localeCompare(b.destination)
        return a.title.localeCompare(b.title)
      })
  }, [tours, search, sort])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    const res = await fetch(`/api/tours/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setTours(prev => prev.filter(t => t.id !== id))
      setSuccessMsg('Tour deleted successfully')
      setTimeout(() => setSuccessMsg(''), 3000)
    }
    setConfirmDelete(null)
    setDeletingId(null)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Tours</h1>
          <p className="text-white/40 text-sm">{tours.length} packages live on your site</p>
        </div>
        <Link
          href="/dashboard/add-tour"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #C5A059, #a07d3a)', color: '#0a0a0a' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Tour
        </Link>
      </div>

      {/* Stats */}
      {tours.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
          {[
            { label: 'Total Packages', value: tours.length, icon: '🗺️', color: '#C5A059' },
            { label: 'Lowest Price', value: `$${Math.min(...tours.map(t => t.price)).toLocaleString()}`, icon: '💚', color: '#4ade80' },
            { label: 'Highest Price', value: `$${Math.max(...tours.map(t => t.price)).toLocaleString()}`, icon: '💎', color: '#a78bfa' },
            { label: 'Avg Price', value: `$${Math.round(tours.reduce((s,t) => s+t.price,0)/tours.length).toLocaleString()}`, icon: '📊', color: '#60a5fa' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-4 border border-white/6" style={{ background: '#111' }}>
              <span className="text-lg">{s.icon}</span>
              <p className="text-xl font-bold mt-2" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" placeholder="Search tours..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/25 border border-white/8 focus:border-yellow-600/40 focus:outline-none transition-all"
            style={{ background: '#111' }} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/30">Sort:</span>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            {(['title','price','destination'] as SortKey[]).map(s => (
              <button key={s} onClick={() => setSort(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                style={sort === s ? { background: 'rgba(197,160,89,0.15)', color: '#C5A059' } : { color: 'rgba(255,255,255,0.3)' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mb-4 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          {successMsg}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/6 overflow-hidden animate-pulse" style={{ background: '#111' }}>
              <div className="h-44 bg-white/5" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-3 bg-white/5 rounded w-1/3" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
                <div className="h-3 bg-white/5 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/6 py-16 text-center" style={{ background: '#111' }}>
          <div className="text-4xl mb-3">🗺️</div>
          <p className="text-white/30 text-sm">{search ? 'No tours match your search' : 'No tours yet'}</p>
          {!search && <Link href="/dashboard/add-tour" className="mt-4 inline-block text-xs font-semibold" style={{ color: '#C5A059' }}>+ Add your first tour</Link>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(tour => (
            <div key={tour.id} className="group rounded-2xl border border-white/6 hover:border-yellow-700/30 transition-all duration-300 overflow-hidden" style={{ background: '#111' }}>
              <div className="relative h-44 overflow-hidden">
                {tour.image ? (
                  <Image src={tour.image} alt={tour.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl" style={{ background: 'rgba(197,160,89,0.05)' }}>🗺️</div>
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.85) 0%, transparent 60%)' }} />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
                  style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', backdropFilter: 'blur(8px)', border: '1px solid rgba(74,222,128,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />Live
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                  style={{ background: 'rgba(18,18,18,0.75)', color: '#C5A059', backdropFilter: 'blur(8px)' }}>
                  {tour.duration}
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10px] text-white/35 uppercase tracking-widest mb-1">{tour.destination}, {tour.country}</p>
                <h3 className="text-white font-bold text-base mb-2 leading-tight">{tour.title}</h3>
                {tour.highlights?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tour.highlights.slice(0,3).map((h: string) => (
                      <span key={h} className="text-[10px] px-2 py-0.5 rounded-full text-white/40" style={{ background: 'rgba(255,255,255,0.05)' }}>{h}</span>
                    ))}
                    {tour.highlights.length > 3 && <span className="text-[10px] text-white/25">+{tour.highlights.length - 3}</span>}
                  </div>
                )}
                <div className="flex items-center justify-between mb-4 pt-3 border-t border-white/6">
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wide">From</p>
                    <p className="text-lg font-bold" style={{ color: '#C5A059' }}>${tour.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/25 uppercase tracking-wide">Group</p>
                    <p className="text-white/60 text-sm font-semibold">{tour.group_size || '—'}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/tours/${tour.slug}`} target="_blank"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all hover:bg-white/8 border border-white/8 text-white/40 hover:text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Preview
                  </Link>
                  <Link href={`/dashboard/add-tour?edit=${tour.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all border border-white/8 text-white/40 hover:text-white hover:border-yellow-700/30"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Edit
                  </Link>
                  <button onClick={() => setConfirmDelete(tour.id)}
                    className="px-3 py-2 rounded-xl text-xs transition-all border border-white/8 text-white/25 hover:text-red-400 hover:border-red-500/30">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="rounded-2xl p-7 w-full max-w-sm border border-white/10 text-center" style={{ background: '#1a1a1a' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl" style={{ background: 'rgba(248,113,113,0.1)' }}>🗑️</div>
            <h3 className="text-white font-bold text-lg mb-2">Delete Tour?</h3>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              <span className="text-white font-semibold">{tours.find(t => t.id === confirmDelete)?.title}</span> will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-white/50 hover:text-white transition-all">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} disabled={deletingId === confirmDelete}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
                {deletingId === confirmDelete ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}