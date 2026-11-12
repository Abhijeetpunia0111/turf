import { useEffect, useState } from 'react'
import { Package, Plus, Users } from 'lucide-react'
import { SportGlyph, type SportKey } from '../ui/SportGlyph'
import { LiveDot } from './bits'

type Court = {
  sport: SportKey
  sportName: string
  name: string
  state: 'live' | 'upcoming' | 'free'
  who?: string
  mins?: number
  players?: number
  kit?: number
  due?: number
  from?: string
}

const COURTS: Court[] = [
  { sport: 'football', sportName: 'Football', name: 'Court A', state: 'live', who: 'Falcons XI', mins: 42 * 60 + 18, players: 12, kit: 4 },
  { sport: 'pickleball', sportName: 'Pickleball', name: 'Court B', state: 'live', who: 'Aarav Khanna', mins: 8 * 60 + 5, players: 4, kit: 2, due: 300 },
  { sport: 'badminton', sportName: 'Badminton', name: 'Court C', state: 'free' },
  { sport: 'cricket', sportName: 'Box cricket', name: 'Court D', state: 'upcoming', who: 'Karan’s XI', from: '7:30 PM', players: 10, kit: 3, due: 1200 },
  { sport: 'tennis', sportName: 'Tennis', name: 'Court E', state: 'live', who: 'Isha Rao', mins: 21 * 60 + 40, players: 2, kit: 1 },
  { sport: 'table-tennis', sportName: 'Table tennis', name: 'Court F', state: 'free' },
]

const clock = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export function LiveCourtsMock({ active }: { active: boolean }) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => setTick((t) => t + 1), 1000)
    return () => window.clearInterval(id)
  }, [active])

  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-[18px] font-bold tracking-[-0.03em]">Active courts</p>
          <p className="text-[12px] text-slate">Saturday, 7:02 PM</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-positive/10 px-3 py-1.5 text-[11.5px] font-semibold text-[#1f7a5a]">
          <LiveDot /> 3 in play · 2 free
        </span>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 sm:grid-rows-2">
        {COURTS.map((c) => {
          if (c.state === 'free')
            return (
              <div key={c.name} className="flex flex-col justify-between gap-5 rounded-2xl border border-dashed border-black/15 bg-white/60 p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">{c.sportName}</p>
                    <p className="font-display text-[15px] font-bold">{c.name}</p>
                  </div>
                  <span className="grid size-9 place-items-center rounded-lg bg-black/[0.05] text-slate">
                    <SportGlyph sport={c.sport} size={18} />
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[12px] font-semibold text-positive">Free now</p>
                    <p className="text-[12px] font-semibold">₹800/hr</p>
                  </div>
                  <span className="grid size-8 place-items-center rounded-full bg-lime text-lime-ink">
                    <Plus size={15} />
                  </span>
                </div>
              </div>
            )

          const live = c.state === 'live'
          const left = live && c.mins ? Math.max(0, c.mins - tick) : 0
          const ending = live && left <= 600
          return (
            <div
              key={c.name}
              className={`flex flex-col justify-between gap-4 rounded-2xl p-3.5 ${live ? 'bg-ink text-white' : 'bg-white ring-1 ring-black/[0.07]'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-[10px] font-semibold uppercase tracking-wide ${live ? 'text-white/55' : 'text-muted'}`}>{c.sportName}</p>
                  <p className="font-display text-[15px] font-bold">{c.name}</p>
                </div>
                <span className={`grid size-9 place-items-center rounded-lg ${live ? 'bg-white/10 text-white' : 'bg-black/[0.05] text-slate'}`}>
                  <SportGlyph sport={c.sport} size={18} />
                </span>
              </div>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[12.5px] font-medium">{c.who}</p>
                  {live ? (
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${ending ? 'bg-negative text-white' : 'bg-lime text-lime-ink'}`}
                    >
                      {ending ? 'Ending soon' : 'In play'}
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-black/[0.06] px-2 py-0.5 text-[10px] font-semibold text-slate">Next up</span>
                  )}
                </div>
                <p className={`mt-0.5 font-mono text-[11.5px] ${live ? 'text-white/70' : 'text-slate'}`}>
                  {live ? `${clock(left)} left` : `From ${c.from}`}
                </p>
              </div>
              <div className="flex items-center justify-between text-[11.5px]">
                <span className={`flex items-center gap-1.5 ${live ? 'text-white/70' : 'text-slate'}`}>
                  <Users size={12} /> {c.players} <Package size={12} className="ml-1.5" /> {c.kit}
                </span>
                {c.due ? (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${live ? 'bg-white/15 text-white' : 'bg-negative/10 text-negative'}`}>
                    ₹{c.due.toLocaleString('en-IN')} due
                  </span>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
