'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Lead {
  id: string
  name: string
  tour_title: string
  travelers: number
  total_price: number
  status: 'new' | 'contacted' | 'converted' | 'lost'
  created_at: string
}

interface Tour {
  id: string
  title: string
}

const STATUS_CONFIG = {
  new:       { label: 'New',       color: '#60a5fa', bg: 'rgba(96,165,250,0.1)'  },
  contacted: { label: 'Contacted', color: '#C5A059', bg: 'rgba(197,160,89,0.1)' },
  converted: { label: 'Converted', color: '#4ade80', bg: 'rgba(74,222,128,0.1)' },
  lost:      { label: 'Lost',      color: '#f87171', bg: 'rgba(248,113,113,0.1)' },
}

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-white/5 ${className}`} />
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/leads').then(r => r.json()),
      fetch('/api/tours').then(r => r.json()),
    ]).then(([leadsData, toursData]) => {
      setLeads(Array.isArray(leadsData) ? leadsData : [])
      setTours(Array.isArray(toursData) ? toursData : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const totalLeads = leads.length
  const newLeads = leads.filter(l => l.status === 'new').length
  const converted = leads.filter(l => l.status === 'converted').length
  const conversionRate = totalLeads > 0 ? Math.round((converted / totalLeads) * 100) : 0
  const totalRevenue = leads.filter(l => l.status === 'converted').reduce((s, l) => s + (l.total_price || 0), 0)

  const STATS = [
    { label: 'Active Tours',      value: tours.length,              sub: 'Live on site',         icon: '🗺️', color: '#C5A059', bg: 'rgba(197,160,89,0.08)'  },
    { label: 'Total Leads',       value: totalLeads,                sub: 'All time inquiries',   icon: '📋', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)'  },
    { label: 'New Inquiries',     value: newLeads,                  sub: 'Needs follow-up',      icon: '📩', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)'  },
    { label: 'Conversion Rate',   value: `${conversionRate}%`,      sub: 'Leads → converted',    icon: '📈', color: '#4ade80', bg: 'rgba(74,222,128,0.08)'  },
    { label: 'Confirmed Revenue', value: `$${totalRevenue.toLocaleString()}`, sub: 'Converted bookings', icon: '💰', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
  ]

  const statusCounts = {
    new:       leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
    lost:      leads.filter(l => l.status === 'lost').length,
  }

  // Recent activity derived from real leads sorted by date
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    const hrs = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (mins < 60) return `${mins}m ago`
    if (hrs < 24) return `${hrs}h ago`
    return `${days}d ago`
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Good morning 👋</h1>
        <p className="text-white/40 text-sm">Here's what's happening with your agency today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl p-4 border border-white/6 hover:border-white/10 transition-all duration-200" style={{ background: s.bg }}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-xl">{s.icon}</span>
            </div>
            {loading ? (
              <Skeleton className="h-8 w-16 mb-2" />
            ) : (
              <p className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</p>
            )}
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">{s.label}</p>
            <p className="text-[10px] text-white/25 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Recent Leads table */}
        <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: '#111' }}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
            <h2 className="text-white font-bold text-sm">Recent Leads</h2>
            <Link href="/dashboard/leads" className="text-xs font-medium flex items-center gap-1 hover:opacity-80" style={{ color: '#C5A059' }}>
              View All
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {loading ? (
            <div className="divide-y divide-white/5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-3.5">
                  <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-2.5 w-48" />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentLeads.length === 0 ? (
            <div className="text-center py-14">
              <div className="text-3xl mb-2">📭</div>
              <p className="text-white/25 text-sm">No leads yet</p>
              <p className="text-white/15 text-xs mt-1">They'll appear here when customers inquire</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {recentLeads.map(lead => {
                const s = STATUS_CONFIG[lead.status]
                return (
                  <div key={lead.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/2 transition-colors">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: 'rgba(197,160,89,0.12)', color: '#C5A059' }}>
                      {lead.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{lead.name}</p>
                      <p className="text-white/35 text-xs truncate">{lead.tour_title || 'Unknown tour'} · {lead.travelers} traveler{lead.travelers !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-white/70 text-sm font-semibold">{lead.total_price ? `$${lead.total_price.toLocaleString()}` : '—'}</p>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Activity feed from real leads */}
          <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: '#111' }}>
            <div className="px-5 py-4 border-b border-white/6">
              <h2 className="text-white font-bold text-sm">Recent Activity</h2>
            </div>
            <div className="p-4 flex flex-col gap-4">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="w-8 h-8 rounded-xl flex-shrink-0" />
                    <div className="flex-1 flex flex-col gap-1.5">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-2.5 w-3/4" />
                    </div>
                  </div>
                ))
              ) : recentLeads.length === 0 ? (
                <p className="text-white/20 text-xs text-center py-4">No activity yet</p>
              ) : (
                recentLeads.slice(0, 4).map(lead => {
                  const cfg = STATUS_CONFIG[lead.status]
                  const isConverted = lead.status === 'converted'
                  return (
                    <div key={lead.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{ background: `${cfg.color}15` }}>
                        {isConverted ? '✅' : '📩'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 text-xs font-medium leading-snug truncate">
                          {isConverted ? `${lead.name} converted` : `New inquiry from ${lead.name}`}
                        </p>
                        <p className="text-white/30 text-[10px] mt-0.5 truncate">
                          {lead.tour_title} {lead.total_price ? `· $${lead.total_price.toLocaleString()}` : ''}
                        </p>
                      </div>
                      <p className="text-white/20 text-[10px] flex-shrink-0 mt-0.5">{timeAgo(lead.created_at)}</p>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Lead status breakdown */}
          <div className="rounded-2xl border border-white/6 p-5" style={{ background: '#111' }}>
            <h2 className="text-white font-bold text-sm mb-4">Lead Status</h2>
            {loading ? (
              <div className="flex flex-col gap-3">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
              </div>
            ) : totalLeads === 0 ? (
              <p className="text-white/20 text-xs text-center py-2">No leads yet</p>
            ) : (
              <div className="flex flex-col gap-3">
                {(Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).map(key => {
                  const cfg = STATUS_CONFIG[key]
                  const count = statusCounts[key]
                  const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0
                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-white/50">{cfg.label}</span>
                        <span className="text-xs font-semibold" style={{ color: cfg.color }}>{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: cfg.color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/dashboard/add-tour" className="rounded-xl p-3.5 border border-white/6 hover:border-yellow-700/30 transition-all text-center group" style={{ background: '#111' }}>
              <div className="text-xl mb-1.5">✈️</div>
              <p className="text-white/60 text-xs font-medium group-hover:text-white transition-colors">Add Tour</p>
            </Link>
            <Link href="/dashboard/settings" className="rounded-xl p-3.5 border border-white/6 hover:border-yellow-700/30 transition-all text-center group" style={{ background: '#111' }}>
              <div className="text-xl mb-1.5">⚙️</div>
              <p className="text-white/60 text-xs font-medium group-hover:text-white transition-colors">Settings</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}