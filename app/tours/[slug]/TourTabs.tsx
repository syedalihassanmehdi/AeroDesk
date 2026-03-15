'use client'
import { useState } from 'react'
import type { TourData } from '@/app/data/tours'

const TABS = ['Overview', 'Itinerary', 'Inclusions & Exclusions', 'Policy'] as const
type Tab = (typeof TABS)[number]

export default function TourTabs({ tour }: { tour: TourData }) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview')

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex gap-1 p-1 rounded-2xl mb-8 overflow-x-auto"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap"
            style={
              activeTab === tab
                ? {
                    background: 'linear-gradient(135deg, #C5A059, #a07d3a)',
                    color: '#0a0a0a',
                    boxShadow: '0 4px 16px rgba(197,160,89,0.25)',
                  }
                : { color: 'rgba(255,255,255,0.4)' }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── Overview ─── */}
      {activeTab === 'Overview' && (
        <div className="animate-fade-in">
          <p className="text-white/60 text-base leading-8 mb-10">{tour.overview}</p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Duration', value: tour.duration, icon: '⏱' },
              { label: 'Group Size', value: tour.groupSize, icon: '👥' },
              { label: 'Difficulty', value: tour.difficulty, icon: '⚡' },
              { label: 'Price / Person', value: `$${tour.price.toLocaleString()}`, icon: '💰' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-4 border border-white/6 hover:border-yellow-700/30 transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="text-xl mb-2">{s.icon}</div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1 font-semibold">{s.label}</p>
                <p className="text-white font-bold text-sm">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <h3 className="text-lg font-bold text-white mb-4">
            Tour <span style={{ color: '#C5A059' }}>Highlights</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tour.highlights.map((h) => (
              <div
                key={h}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-white/6"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(197,160,89,0.12)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-white/70 text-sm">{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Itinerary ─── */}
      {activeTab === 'Itinerary' && (
        <div className="animate-fade-in">
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[18px] top-6 bottom-6 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, #C5A059, rgba(197,160,89,0.1))' }}
            />

            <div className="flex flex-col gap-6">
              {tour.itinerary.map((day, i) => (
                <div key={day.day} className="md:pl-12 relative">
                  {/* Day circle */}
                  <div
                    className="hidden md:flex absolute left-0 top-3 w-9 h-9 rounded-full items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: i === 0 ? '#C5A059' : 'rgba(197,160,89,0.1)',
                      color: i === 0 ? '#0a0a0a' : '#C5A059',
                      border: '2px solid rgba(197,160,89,0.3)',
                    }}
                  >
                    {day.day}
                  </div>

                  <div
                    className="rounded-2xl p-5 border border-white/6 hover:border-yellow-700/20 transition-all duration-300 group"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span
                        className="md:hidden px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(197,160,89,0.15)', color: '#C5A059' }}
                      >
                        Day {day.day}
                      </span>
                      <div>
                        <h4 className="text-white font-bold text-base leading-tight">{day.title}</h4>
                        <p className="text-white/40 text-sm mt-1 leading-relaxed">{day.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/6">
                      {day.activities.map((act, j) => (
                        <span
                          key={j}
                          className="flex items-center gap-1.5 text-xs text-white/50 px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.05)' }}
                        >
                          <span className="w-1 h-1 rounded-full" style={{ background: '#C5A059' }} />
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Inclusions & Exclusions ─── */}
      {activeTab === 'Inclusions & Exclusions' && (
        <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inclusions */}
          <div
            className="rounded-2xl p-6 border border-green-500/15"
            style={{ background: 'rgba(34,197,94,0.04)' }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(34,197,94,0.12)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-white font-bold">What's Included</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {tour.inclusions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="flex-shrink-0 mt-0.5"
                    width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="#22c55e" strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-white/60 text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div
            className="rounded-2xl p-6 border border-red-500/15"
            style={{ background: 'rgba(239,68,68,0.04)' }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(239,68,68,0.12)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h3 className="text-white font-bold">Not Included</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {tour.exclusions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="flex-shrink-0 mt-0.5"
                    width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="#ef4444" strokeWidth="2.5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span className="text-white/60 text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ─── Policy ─── */}
      {activeTab === 'Policy' && (
        <div className="animate-fade-in flex flex-col gap-5">
          {[
            {
              title: 'Cancellation Policy',
              icon: '📋',
              content: tour.policy.cancellation,
              color: 'rgba(197,160,89,0.08)',
              border: 'rgba(197,160,89,0.2)',
            },
            {
              title: 'Payment Terms',
              icon: '💳',
              content: tour.policy.payment,
              color: 'rgba(99,102,241,0.06)',
              border: 'rgba(99,102,241,0.2)',
            },
            {
              title: 'Child Policy',
              icon: '👶',
              content: tour.policy.childPolicy,
              color: 'rgba(34,197,94,0.05)',
              border: 'rgba(34,197,94,0.15)',
            },
            {
              title: 'Health & Fitness Requirements',
              icon: '🏃',
              content: tour.policy.healthRequirements,
              color: 'rgba(249,115,22,0.05)',
              border: 'rgba(249,115,22,0.15)',
            },
          ].map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-6"
              style={{ background: p.color, border: `1px solid ${p.border}` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{p.icon}</span>
                <h4 className="text-white font-bold text-sm">{p.title}</h4>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">{p.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
