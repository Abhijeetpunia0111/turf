import { AlertTriangle, CalendarClock, TrendingUp, UserX } from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { Stat } from './bits'

const FLAGS = [
  { t: 'Repeat absentees', c: 3, Icon: UserX, tone: 'bg-negative/10 text-negative', who: ['Aryan Mehta', 'Zoya Khan', 'Veer Singh'] },
  { t: 'Low attendance', c: 5, Icon: AlertTriangle, tone: 'bg-[#fff1d6] text-[#8a5a00]', who: ['Riya Das', 'Kunal Shah', 'Mira Nair'] },
  { t: 'Renewals due', c: 4, Icon: CalendarClock, tone: 'bg-[#fff1d6] text-[#8a5a00]', who: ['Tanvi Rao', 'Dhruv Jain', 'Nisha Pal'] },
  { t: 'Ready for promotion', c: 2, Icon: TrendingUp, tone: 'bg-lime/40 text-lime-ink', who: ['Arjun Nair', 'Sia Kapoor'] },
]

const BATCHES = [
  { n: 'Under-14 Cricket', time: '5:00 PM', p: 18, of: 20 },
  { n: 'Football Juniors', time: '6:30 PM', p: 14, of: 16 },
  { n: 'Pickleball Beginners', time: '8:00 PM', p: 9, of: 10 },
]

export function AcademyMock() {
  return (
    <div className="flex h-full flex-col gap-3.5 p-5">
      <p className="font-display text-[18px] font-bold tracking-[-0.03em]">Academy</p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Active students" sub="6 joined this month">
          86
        </Stat>
        <Stat label="Today’s attendance" sub="3 sessions · 5 absent" tone="flat">
          41/46
        </Stat>
        <Stat label="Fees pending" sub="₹3,18,500 collected" tone="down">
          ₹1.42L
        </Stat>
        <Stat label="Coaches" sub="4 sports offered" tone="flat">
          7
        </Stat>
      </div>

      <div className="rounded-2xl bg-white p-3.5 ring-1 ring-black/[0.07]">
        <div className="mb-2.5 flex items-center gap-2">
          <p className="font-display text-[14px] font-bold">Needs attention</p>
          <span className="rounded-full bg-ink px-2 py-0.5 text-[10.5px] font-semibold text-white">14</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {FLAGS.map(({ t, c, Icon, tone, who }) => (
            <div key={t} className="rounded-xl border border-black/[0.07] p-2.5">
              <div className="flex items-center gap-2">
                <span className={`grid size-6 place-items-center rounded-md ${tone}`}>
                  <Icon size={13} />
                </span>
                <p className="flex-1 text-[11.5px] font-semibold leading-tight">{t}</p>
                <span className="font-display text-[15px] font-bold">{c}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="flex -space-x-1.5">
                  {who.map((n) => (
                    <Avatar key={n} name={n} size={22} ring />
                  ))}
                </span>
                <span className="text-[10.5px] font-medium text-slate">View all</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-3.5 ring-1 ring-black/[0.07]">
        <p className="mb-2 font-display text-[14px] font-bold">Today’s batches</p>
        <div className="space-y-2">
          {BATCHES.map((b) => (
            <div key={b.n} className="flex items-center gap-3 text-[11.5px]">
              <span className="w-[128px] shrink-0 truncate font-medium">{b.n}</span>
              <span className="w-14 shrink-0 font-mono text-muted">{b.time}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.07]">
                <span className="block h-full rounded-full bg-grass" style={{ width: `${(b.p / b.of) * 100}%` }} />
              </span>
              <span className="w-10 text-right font-mono text-slate">
                {b.p}/{b.of}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
