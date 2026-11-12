import { BadgeCheck, GraduationCap, Plus, ScanLine, ShoppingBag, Tag, Ticket } from 'lucide-react'

const SERVICES = [
  { n: 'Check-in', b: 'Find a booking by ID or phone and mark the players in.', Icon: ScanLine },
  { n: 'Shop', b: 'Kit rental and counter sales, billed to the booking.', Icon: ShoppingBag, on: true },
  { n: 'Academy', b: 'Batches, coaches and attendance at the desk.', Icon: GraduationCap },
  { n: 'Membership', b: 'Sell and renew passes and packages.', Icon: Ticket },
]

const OFFERS = [
  { n: 'Studs / Shoes', hint: 'Sizes 5 to 12', mode: 'Rent', price: '₹120 / hr', note: '₹300 deposit' },
  { n: 'Football', hint: 'Size 5, match ball', mode: 'Buy', price: '₹250', note: '12 in stock' },
  { n: 'Team bibs', hint: 'Set of 7', mode: 'Rent', price: '₹60 / hr', note: '₹200 deposit' },
]

export function CounterMock() {
  return (
    <div className="flex h-full flex-col gap-3.5 p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-[18px] font-bold tracking-[-0.03em]">Counter</p>
        <span className="rounded-full bg-black/[0.06] px-3 py-1 text-[11px] font-medium text-slate">Tablet · Reception</span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SERVICES.map(({ n, b, Icon, on }) => (
          <div key={n} className={`rounded-2xl p-3 ${on ? 'bg-ink text-white' : 'bg-white ring-1 ring-black/[0.07]'}`}>
            <span className={`grid size-8 place-items-center rounded-lg ${on ? 'bg-lime text-lime-ink' : 'bg-black/[0.05] text-ink'}`}>
              <Icon size={16} />
            </span>
            <p className="mt-2.5 font-display text-[13.5px] font-bold">{n}</p>
            <p className={`mt-0.5 text-[10.5px] leading-snug ${on ? 'text-white/60' : 'text-muted'}`}>{b}</p>
          </div>
        ))}
      </div>

      <div className="grid flex-1 gap-3 sm:grid-cols-[1.15fr_1fr]">
        <div className="rounded-2xl bg-white p-3.5 ring-1 ring-black/[0.07]">
          <p className="mb-2.5 font-display text-[14px] font-bold">Add-ons for TL0042</p>
          <div className="space-y-2">
            {OFFERS.map((o) => (
              <div key={o.n} className="flex items-center gap-3 rounded-xl border border-black/[0.07] p-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold leading-tight">{o.n}</p>
                  <p className="text-[10.5px] text-muted">
                    {o.hint} · {o.note}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-grass">{o.mode}</p>
                  <p className="text-[12px] font-semibold">{o.price}</p>
                </div>
                <span className="grid size-7 place-items-center rounded-full bg-lime text-lime-ink">
                  <Plus size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-2xl bg-white p-3.5 ring-1 ring-black/[0.07]">
          <p className="mb-2.5 font-display text-[14px] font-bold">Tab</p>
          <div className="space-y-1.5 text-[12px]">
            <div className="flex justify-between">
              <span>Court B · 1 hr</span>
              <span className="font-medium">₹800</span>
            </div>
            <div className="flex justify-between text-slate">
              <span>Studs / Shoes × 2</span>
              <span>₹240</span>
            </div>
            <div className="flex justify-between text-slate">
              <span>Team bibs × 1</span>
              <span>₹60</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-lime/30 px-2 py-1.5 text-lime-ink">
              <span className="flex items-center gap-1.5 font-semibold">
                <Tag size={12} /> XC1048 · 15% off
              </span>
              <span className="font-medium">-₹165</span>
            </div>
            <div className="flex justify-between text-slate">
              <span>GST 18%</span>
              <span>₹143</span>
            </div>
          </div>
          <div className="mt-auto border-t border-dashed border-black/15 pt-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] font-semibold">Total</span>
              <span className="font-display text-[22px] font-extrabold tracking-[-0.04em]">₹1,078</span>
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-muted">
              <BadgeCheck size={12} className="text-positive" /> ₹500 deposit held, refunded on return
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
