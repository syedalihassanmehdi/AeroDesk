'use client'
import { useState, useMemo, useEffect } from 'react'

type Status = 'all' | 'new' | 'contacted' | 'converted' | 'lost'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  tour_title: string
  travel_date: string
  travelers: number
  total_price: number
  status: 'new' | 'contacted' | 'converted' | 'lost'
  special_requests?: string
  created_at: string
}

const STATUS_CONFIG = {
  new:       { label: 'New',       color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
  contacted: { label: 'Contacted', color: '#C5A059', bg: 'rgba(197,160,89,0.12)' },
  converted: { label: 'Converted', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  lost:      { label: 'Lost',      color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
}

function StatusBadge({ status }: { status: Lead['status'] }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide" style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  )
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Status>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/leads')
      .then(r => r.json())
      .then(data => { setLeads(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const matchStatus = filter === 'all' || l.status === filter
      const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.tour_title?.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [leads, filter, search])

  const updateStatus = async (id: string, status: Lead['status']) => {
    setUpdatingId(id)
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
      setSelected(prev => prev?.id === id ? { ...prev, status } : prev)
    }
    setUpdatingId(null)
  }

  const handleWhatsApp = (lead: Lead) => {
    const msg = `Hi ${lead.name.split(' ')[0]}! 👋\n\nThis is the LuxeVoyage team following up on your inquiry for *${lead.tour_title}*.\n\n📅 Travel Date: ${lead.travel_date || 'TBD'}\n👥 Travelers: ${lead.travelers}\n💰 Total: $${lead.total_price?.toLocaleString() || 'TBD'}\n\nWe'd love to help you plan this journey. Are you available for a quick call?`
    window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const counts = useMemo(() => ({
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
    lost: leads.filter(l => l.status === 'lost').length,
  }), [leads])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Leads</h1>
        <p className="text-white/40 text-sm">{leads.length} total inquiries</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" placeholder="Search name, tour, email..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/25 border border-white/8 focus:border-yellow-600/40 focus:outline-none transition-all"
            style={{ background: '#111' }} />
        </div>
        <div className="flex gap-1 p-1 rounded-xl overflow-x-auto" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
          {(['all','new','contacted','converted','lost'] as Status[]).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize"
              style={filter === s
                ? { background: s === 'all' ? 'rgba(255,255,255,0.1)' : STATUS_CONFIG[s as Lead['status']].bg, color: s === 'all' ? 'white' : STATUS_CONFIG[s as Lead['status']].color }
                : { color: 'rgba(255,255,255,0.35)' }}>
              {s === 'all' ? 'All' : STATUS_CONFIG[s as Lead['status']].label}
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                {counts[s]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={`grid gap-5 ${selected ? 'grid-cols-1 lg:grid-cols-[1fr_360px]' : 'grid-cols-1'}`}>
        <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: '#111' }}>
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-6 h-6 border-2 border-yellow-600/40 border-t-yellow-500 rounded-full animate-spin mx-auto mb-2" />
              <p className="text-white/30 text-sm">Loading leads...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-white/25">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-sm">{search || filter !== 'all' ? 'No leads match your filters' : 'No leads yet — they\'ll appear here when customers book'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/6">
                    {['Traveler','Tour','Date','Travelers','Value','Status',''].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/4">
                  {filtered.map(lead => (
                    <tr key={lead.id} onClick={() => setSelected(selected?.id === lead.id ? null : lead)}
                      className={`cursor-pointer transition-colors hover:bg-white/2 ${selected?.id === lead.id ? 'bg-yellow-900/10' : ''}`}>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                            style={{ background: 'rgba(197,160,89,0.12)', color: '#C5A059' }}>
                            {lead.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium whitespace-nowrap">{lead.name}</p>
                            <p className="text-white/35 text-[10px]">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5"><p className="text-white/70 text-sm whitespace-nowrap">{lead.tour_title || '—'}</p></td>
                      <td className="px-4 py-3.5"><p className="text-white/50 text-xs whitespace-nowrap">{lead.travel_date || '—'}</p></td>
                      <td className="px-4 py-3.5"><p className="text-white/50 text-sm">{lead.travelers}</p></td>
                      <td className="px-4 py-3.5"><p className="text-white font-semibold text-sm">{lead.total_price ? `$${lead.total_price.toLocaleString()}` : '—'}</p></td>
                      <td className="px-4 py-3.5"><StatusBadge status={lead.status} /></td>
                      <td className="px-4 py-3.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selected && (
          <div className="rounded-2xl border border-white/8 overflow-hidden self-start sticky top-6"
            style={{ background: '#111', borderColor: 'rgba(197,160,89,0.2)' }}>
            <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between" style={{ background: 'rgba(197,160,89,0.04)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                  style={{ background: 'rgba(197,160,89,0.15)', color: '#C5A059' }}>
                  {selected.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{selected.name}</p>
                  <StatusBadge status={selected.status} />
                </div>
              </div>
              <button onClick={() => setSelected(null)}
                className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all">×</button>
            </div>

            <div className="p-5 flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Contact</p>
                {[{ icon: '📧', value: selected.email }, { icon: '📞', value: selected.phone }].map(item => (
                  <div key={item.value} className="flex items-center gap-2.5">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-white/60 text-sm">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-4 border border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-3">Trip Details</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Tour', value: selected.tour_title || '—' },
                    { label: 'Travel Date', value: selected.travel_date || '—' },
                    { label: 'Travelers', value: selected.travelers },
                    { label: 'Total Value', value: selected.total_price ? `$${selected.total_price.toLocaleString()}` : '—' },
                  ].map(d => (
                    <div key={d.label}>
                      <p className="text-[10px] text-white/25 mb-0.5">{d.label}</p>
                      <p className="text-white/80 text-xs font-semibold">{d.value}</p>
                    </div>
                  ))}
                </div>
                {selected.special_requests && (
                  <div className="mt-3 pt-3 border-t border-white/6">
                    <p className="text-[10px] text-white/25 mb-1">Special Requests</p>
                    <p className="text-white/60 text-xs leading-relaxed">{selected.special_requests}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-2">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(STATUS_CONFIG) as Lead['status'][]).map(s => {
                    const cfg = STATUS_CONFIG[s]
                    const isActive = selected.status === s
                    return (
                      <button key={s} onClick={() => updateStatus(selected.id, s)}
                        disabled={isActive || updatingId === selected.id}
                        className="py-2 rounded-xl text-xs font-semibold transition-all duration-200 disabled:opacity-50 hover:scale-[1.02]"
                        style={{
                          background: isActive ? cfg.bg : 'rgba(255,255,255,0.04)',
                          color: isActive ? cfg.color : 'rgba(255,255,255,0.35)',
                          border: `1px solid ${isActive ? cfg.color + '40' : 'rgba(255,255,255,0.06)'}`,
                        }}>
                        {updatingId === selected.id && !isActive ? '...' : cfg.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-white/6">
                <button onClick={() => handleWhatsApp(selected)}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 hover:opacity-90"
                  style={{ background: 'rgba(37,211,102,0.1)', color: '#25D366', border: '1px solid rgba(37,211,102,0.2)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Lead
                </button>
                <a href={`mailto:${selected.email}`}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 hover:bg-white/5 text-white/40 hover:text-white/70"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Send Email
                </a>
              </div>

              <p className="text-center text-[10px] text-white/20">
                Received {new Date(selected.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}