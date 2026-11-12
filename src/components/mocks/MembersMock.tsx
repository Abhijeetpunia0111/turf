import { BellRing, Check } from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { Pill } from './bits'

/** Fees follow the product's own plan maths: court rate x 4 / 10 / 32, plus 18% GST. */
const PLANS = [
  { name: 'Pickleball Starter', months: '1 month', sessions: 4, off: 10, price: '₹3,776', blurb: 'A month at a time. Stop whenever they like.' },
  { name: 'Pickleball Pro', months: '3 months', sessions: 5, off: 15, price: '₹9,440', blurb: 'A season up front for a better court rate.' },
  { name: 'Pickleball Elite', months: '12 months', sessions: 6, off: 25, price: '₹30,208', blurb: 'The regulars’ plan. The best rate the venue does.', best: true },
]

const MEMBERS = [
  { n: 'Ananya Iyer', plan: 'Elite', ends: '14 Jan 2027', pill: <Pill tone="ok">Active</Pill> },
  { n: 'Dev Malhotra', plan: 'Pro', ends: '16 Oct', pill: <Pill tone="warn">Expiring · 5 days</Pill>, remind: true },
  { n: 'Sana Qureshi', plan: 'Starter', ends: '2 Nov', pill: <Pill tone="frozen">Frozen</Pill> },
  { n: 'Kabir Joshi', plan: 'Pro', ends: '28 Sep', pill: <Pill tone="due">Expired</Pill>, remind: true },
]

export function MembersMock() {
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div>
        <p className="font-display text-[18px] font-bold tracking-[-0.03em]">Membership plans</p>
        <p className="text-[12px] text-slate">Priced per sport, GST included</p>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col rounded-2xl p-3 ${p.best ? 'bg-ink text-white ring-2 ring-lime' : 'bg-white ring-1 ring-black/[0.07]'}`}
          >
            <p className={`text-[10.5px] font-semibold uppercase tracking-wide ${p.best ? 'text-lime' : 'text-muted'}`}>{p.months}</p>
            <p className="mt-1 font-display text-[13px] font-bold leading-tight">{p.name}</p>
            <p className="mt-2 font-display text-[20px] font-extrabold leading-none tracking-[-0.05em]">{p.price}</p>
            <ul className={`mt-3 space-y-1 text-[11px] ${p.best ? 'text-white/75' : 'text-slate'}`}>
              <li className="flex items-center gap-1.5">
                <Check size={12} className={p.best ? 'text-lime' : 'text-positive'} /> {p.off}% off courts
              </li>
              <li className="flex items-center gap-1.5">
                <Check size={12} className={p.best ? 'text-lime' : 'text-positive'} /> {p.sessions} sessions a month
              </li>
            </ul>
            <p className={`mt-3 text-[10.5px] leading-snug ${p.best ? 'text-white/55' : 'text-muted'}`}>{p.blurb}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 rounded-2xl bg-white ring-1 ring-black/[0.07]">
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-2.5">
          <p className="text-[13px] font-semibold">Members</p>
          <span className="text-[11px] text-muted">142 active</span>
        </div>
        {MEMBERS.map((m) => (
          <div key={m.n} className="flex items-center gap-3 border-b border-black/[0.05] px-4 py-2.5 last:border-b-0">
            <Avatar name={m.n} size={30} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-semibold leading-tight">{m.n}</p>
              <p className="text-[11px] text-muted">
                {m.plan} · ends {m.ends}
              </p>
            </div>
            {m.pill}
            {m.remind ? (
              <span className="flex items-center gap-1 rounded-full bg-[#dcf8c6] px-2.5 py-1 text-[10.5px] font-bold text-[#1e6b3d]">
                <BellRing size={11} /> Remind
              </span>
            ) : (
              <span className="w-[68px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
