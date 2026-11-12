import { useEffect, useState } from 'react'
import { Banknote, BadgeCheck, CheckCheck, CreditCard, Landmark, Loader2, QrCode } from 'lucide-react'

const METHODS = [
  { k: 'upi', n: 'UPI', hint: 'QR with the amount filled in', Icon: QrCode },
  { k: 'cash', n: 'Cash', hint: 'Staff confirm on WhatsApp', Icon: Banknote },
  { k: 'card', n: 'Card', hint: 'Razorpay checkout on the tablet', Icon: CreditCard },
  { k: 'bank', n: 'Bank transfer', hint: 'Marked received once it lands', Icon: Landmark },
]

function Qr() {
  const n = 13
  let s = 11
  const cells: boolean[] = []
  for (let i = 0; i < n * n; i++) {
    s = (s * 9301 + 49297) % 233280
    cells.push(s / 233280 > 0.48)
  }
  /** The three corner eyes: a 4x4 ring each, drawn instead of random cells. */
  const eye = (x: number, y: number) => {
    const corners = [
      [0, 0],
      [n - 4, 0],
      [0, n - 4],
    ]
    for (const [cx, cy] of corners) {
      if (x >= cx && x < cx + 4 && y >= cy && y < cy + 4) {
        const lx = x - cx
        const ly = y - cy
        return lx === 0 || ly === 0 || lx === 3 || ly === 3
      }
    }
    return null
  }
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className="size-[92px]" aria-hidden>
      {cells.map((on, i) => {
        const x = i % n
        const y = Math.floor(i / n)
        const e = eye(x, y)
        const fill = e === null ? on : e
        return fill ? <rect key={i} x={x} y={y} width="1.02" height="1.02" fill="#0f1f14" /> : null
      })}
    </svg>
  )
}

/** 0: waiting for staff · 1: staff taps Yes · 2: payment recorded. */
export function SettleMock({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!active) return
    setPhase(0)
    const steps = [2600, 1100, 3200]
    let i = 0
    let id = 0
    const tick = () => {
      i = (i + 1) % 3
      setPhase(i)
      id = window.setTimeout(tick, steps[i])
    }
    id = window.setTimeout(tick, steps[0])
    return () => window.clearTimeout(id)
  }, [active])

  const done = phase === 2

  return (
    <div className="grid h-full gap-4 p-5 lg:grid-cols-[1fr_0.92fr]">
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-display text-[18px] font-bold tracking-[-0.03em]">Settle booking</p>
          <p className="text-[12px] text-slate">TL0042 · Court B · Pickleball · Sat 7 to 8 PM</p>
        </div>

        <div className="flex items-end justify-between rounded-2xl bg-white p-4 ring-1 ring-black/[0.06]">
          <div>
            <p className="text-[11px] text-muted">Balance due</p>
            <p className="font-display text-[30px] font-extrabold leading-none tracking-[-0.05em]">
              {done ? '₹0' : '₹944'}
            </p>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              done ? 'bg-positive/12 text-[#1f7a5a]' : 'bg-negative/10 text-negative'
            }`}
          >
            {done ? 'Paid' : 'Unpaid'}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {METHODS.map(({ k, n, hint, Icon }) => (
            <div
              key={k}
              className={`flex items-center gap-3 rounded-xl border p-2.5 ${k === 'upi' ? 'border-ink bg-white' : 'border-black/10 bg-white/60'}`}
            >
              <span className="grid size-9 place-items-center rounded-lg bg-black/[0.05] text-ink">
                <Icon size={17} />
              </span>
              <div className="flex-1">
                <p className="text-[13px] font-semibold leading-tight">{n}</p>
                <p className="text-[11px] text-muted">{hint}</p>
              </div>
              {k === 'upi' && <span className="size-2.5 rounded-full bg-ink ring-4 ring-ink/10" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/[0.06]">
          <Qr />
          <div>
            <p className="text-[11px] text-muted">Customer scans to pay</p>
            <p className="font-display text-[22px] font-extrabold tracking-[-0.04em]">₹944</p>
            <p className="font-mono text-[10.5px] text-slate">greenfield@okhdfcbank</p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#e7f0dd] p-3.5">
          <div className="rounded-xl rounded-tl-sm bg-[#dcf8c6] p-3 shadow-sm">
            <p className="text-[11px] font-bold text-[#128c7e]">Turfleo</p>
            <p className="mt-1 text-[12px] leading-snug text-[#1c2b1c]">
              <b>Greenfield Sports Arena:</b> please confirm a payment. UPI of ₹944.00 for booking TL0042, Court B ·
              Pickleball, Sat 11 Oct, 7 PM to 8 PM. Customer: Aarav · +91 98765 43210. Has it been received?
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-1.5">
              <span
                className={`rounded-lg py-1.5 text-center text-[11.5px] font-bold transition-all duration-300 ${
                  phase >= 1 ? 'scale-[0.97] bg-[#128c7e] text-white' : 'bg-white text-[#128c7e]'
                }`}
              >
                Yes, received
              </span>
              <span className="rounded-lg bg-white py-1.5 text-center text-[11.5px] font-bold text-[#8a8a8a]">No</span>
            </div>
          </div>
          <p className="mt-2 flex items-center justify-end gap-1 text-[10px] text-[#5d7a5d]">
            Sent to staff WhatsApp <CheckCheck size={13} className="text-[#34a8e0]" />
          </p>
        </div>

        <div
          className={`flex items-center gap-3 rounded-2xl p-3.5 transition-colors duration-500 ${
            done ? 'bg-lime text-lime-ink' : 'bg-white ring-1 ring-black/[0.06]'
          }`}
        >
          {done ? <BadgeCheck size={22} /> : <Loader2 size={20} className="animate-spin text-muted" />}
          <div>
            <p className="text-[13px] font-bold leading-tight">{done ? 'Payment recorded' : 'Waiting for staff to confirm'}</p>
            <p className={`text-[11px] ${done ? 'text-lime-ink/70' : 'text-muted'}`}>
              {done ? 'UPI · ₹944 · invoice emailed' : 'Checking every two seconds'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
