import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import { SportGlyph, type SportKey } from '../ui/SportGlyph'

type SlotState = 'free' | 'walkin' | 'staff' | 'partner'
const SLOTS: { t: string; s: SlotState; peak?: boolean }[] = [
  { t: '9 AM', s: 'free' },
  { t: '10 AM', s: 'staff' },
  { t: '11 AM', s: 'free' },
  { t: '12 PM', s: 'free' },
  { t: '1 PM', s: 'partner' },
  { t: '2 PM', s: 'free' },
  { t: '3 PM', s: 'free' },
  { t: '4 PM', s: 'staff' },
  { t: '5 PM', s: 'free', peak: true },
  { t: '6 PM', s: 'partner', peak: true },
  { t: '7 PM', s: 'free', peak: true },
  { t: '8 PM', s: 'walkin', peak: true },
  { t: '9 PM', s: 'free', peak: true },
  { t: '10 PM', s: 'free', peak: true },
  { t: '11 PM', s: 'free' },
]
const FREE = SLOTS.map((s, i) => (s.s === 'free' ? i : -1)).filter((i) => i >= 0)

const SPORTS: { k: SportKey; n: string }[] = [
  { k: 'football', n: 'Football' },
  { k: 'cricket', n: 'Cricket' },
  { k: 'pickleball', n: 'Pickleball' },
  { k: 'badminton', n: 'Badminton' },
]
const DAYS = [
  ['Fri', 10],
  ['Sat', 11],
  ['Sun', 12],
  ['Mon', 13],
  ['Tue', 14],
  ['Wed', 15],
]

const LOOK: Record<SlotState, string> = {
  free: 'border border-black/10 bg-white text-ink',
  walkin: 'bg-walkin-tint text-walkin-ink',
  staff: 'bg-staff-tint text-staff-ink',
  partner: 'hatch-partner border border-partner/30 text-partner-ink',
}
const LABEL: Record<SlotState, string> = { free: '', walkin: 'Walk-in', staff: 'Staff', partner: 'Playo' }

export function SlotGridMock({ active }: { active: boolean }) {
  const [sel, setSel] = useState(10)

  useEffect(() => {
    if (!active) return
    let n = FREE.indexOf(10)
    const id = window.setInterval(() => {
      n = (n + 1) % FREE.length
      setSel(FREE[n])
    }, 2300)
    return () => window.clearInterval(id)
  }, [active])

  const slot = SLOTS[sel]
  const price = slot.peak ? '₹1,180' : '₹944'

  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-[18px] font-bold tracking-[-0.03em]">New Booking</p>
        <div className="flex rounded-lg bg-black/[0.05] p-0.5 text-[11px] font-medium text-slate">
          <span className="rounded-md px-2.5 py-1">1 · Step by step</span>
          <span className="rounded-md bg-white px-2.5 py-1 text-ink shadow-sm">2 · One page</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {SPORTS.map((s) => (
          <span
            key={s.k}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium ${
              s.k === 'pickleball' ? 'bg-ink text-white' : 'border border-black/10 bg-white text-slate'
            }`}
          >
            <SportGlyph sport={s.k} size={14} /> {s.n}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {['Court A', 'Court B', 'Court C'].map((c, i) => (
          <div key={c} className={`rounded-xl border p-2.5 ${i === 1 ? 'border-ink bg-white' : 'border-black/10 bg-white/60'}`}>
            <p className="text-[12px] font-semibold">{c}</p>
            <p className="text-[11px] text-muted">₹800 / hr</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1.5 overflow-hidden">
        {DAYS.map(([d, n]) => (
          <div
            key={d}
            className={`flex-1 rounded-xl py-1.5 text-center ${d === 'Sat' ? 'bg-lime text-lime-ink' : 'border border-black/10 bg-white text-slate'}`}
          >
            <p className="text-[10px] font-medium opacity-70">{d}</p>
            <p className="font-display text-[15px] font-bold leading-tight">{n}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <p className="text-[13px] font-semibold">Start time</p>
          <p className="text-[11px] text-slate">Peak hours marked with a dot</p>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {SLOTS.map((s, i) => {
            const selected = i === sel
            return (
              <div
                key={i}
                className={`relative flex h-11 flex-col items-center justify-center rounded-lg text-[11.5px] font-medium transition-all duration-300 ${
                  selected ? 'scale-[1.04] bg-ink text-white shadow-lg' : LOOK[s.s]
                }`}
              >
                {s.peak && <span className={`absolute right-1.5 top-1.5 size-1.5 rounded-full ${selected ? 'bg-lime' : 'bg-flame'}`} />}
                <span>{s.t}</span>
                {s.s !== 'free' && <span className="text-[9px] opacity-70">{LABEL[s.s]}</span>}
              </div>
            )
          })}
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[10.5px] text-slate">
          <span className="flex items-center gap-1.5">
            <i className="size-2.5 rounded-sm bg-walkin-tint ring-1 ring-black/5" /> Walk-in
          </span>
          <span className="flex items-center gap-1.5">
            <i className="size-2.5 rounded-sm bg-staff-tint ring-1 ring-black/5" /> Staff
          </span>
          <span className="flex items-center gap-1.5">
            <i className="hatch-partner size-2.5 rounded-sm ring-1 ring-partner/30" /> Playo
          </span>
          <span className="ml-auto flex items-center gap-1">
            <Info size={11} /> Next free · 9 AM
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-white">
        <div>
          <p className="text-[11px] text-white/60">Court B · Sat 11 Oct</p>
          <p className="font-display text-[15px] font-bold tracking-[-0.02em]">
            {slot.t} · 1 hour · <span className="text-lime">{price}</span>
            <span className="ml-1 text-[11px] font-medium text-white/50">incl. GST</span>
          </p>
        </div>
        <span className="rounded-full bg-lime px-4 py-2 text-[12px] font-bold text-lime-ink">Continue</span>
      </div>
    </div>
  )
}
