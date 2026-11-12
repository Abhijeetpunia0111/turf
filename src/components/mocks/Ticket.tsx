import { BadgeCheck, FileText, MessageCircle } from 'lucide-react'
import { Avatar } from '../ui/Avatar'

/** Deterministic QR-looking block. Decorative: it encodes nothing. */
function FauxQr({ size = 64 }: { size?: number }) {
  const n = 11
  const cells: boolean[] = []
  let s = 7
  for (let i = 0; i < n * n; i++) {
    s = (s * 9301 + 49297) % 233280
    cells.push(s / 233280 > 0.5)
  }
  const finder = (x: number, y: number) => (x < 3 && y < 3) || (x > n - 4 && y < 3) || (x < 3 && y > n - 4)
  const cell = size / n
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      {cells.map((on, i) => {
        const x = i % n
        const y = Math.floor(i / n)
        const filled = finder(x, y) ? true : on
        return filled ? <rect key={i} x={x * cell} y={y * cell} width={cell - 0.6} height={cell - 0.6} rx="1" fill="#0f1f14" /> : null
      })}
    </svg>
  )
}

/** The booking that confirms itself: what a customer and the venue both end up with. */
export function Ticket({ className = '' }: { className?: string }) {
  return (
    <div
      data-ticket
      className={`relative w-[min(92vw,400px)] overflow-hidden rounded-[28px] bg-white text-left shadow-[0_40px_90px_-24px_rgba(15,31,20,0.45)] ring-1 ring-black/[0.06] ${className}`}
    >
      <div className="flex items-center justify-between bg-lime px-6 py-4 text-lime-ink">
        <span className="flex items-center gap-2 font-display text-[16px] font-bold tracking-[-0.02em]">
          <BadgeCheck size={20} /> Booking confirmed
        </span>
        <span className="font-mono text-[12px] font-medium">TL0042</span>
      </div>

      <div className="relative px-6 pb-5 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Court B · Pickleball</p>
            <p className="mt-1.5 font-display text-[30px] font-extrabold leading-none tracking-[-0.05em] text-ink">7:00 to 8:00 PM</p>
            <p className="mt-1.5 text-[14px] text-slate">Saturday, 11 October</p>
          </div>
          <FauxQr />
        </div>

        <div className="my-5 flex items-center gap-3">
          <span className="-ml-9 size-6 shrink-0 rounded-full bg-page ring-1 ring-black/[0.06]" />
          <span className="h-px flex-1 border-t border-dashed border-black/15" />
          <span className="-mr-9 size-6 shrink-0 rounded-full bg-page ring-1 ring-black/[0.06]" />
        </div>

        <div className="flex items-center gap-3">
          <Avatar name="Aarav Khanna" size={36} />
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-ink">Aarav Khanna</p>
            <p className="text-[12px] text-slate">+91 98•••• 43210</p>
          </div>
          <div className="text-right">
            <p className="font-display text-[20px] font-extrabold tracking-[-0.04em] text-ink">₹944</p>
            <p className="text-[11px] font-medium text-positive">Paid by UPI</p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-muted">₹800 court hire + 18% GST. Peak rate applied automatically.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f8d9] px-3 py-1.5 text-[11.5px] font-semibold text-[#2b6a2e]">
            <MessageCircle size={13} /> Confirmation sent on WhatsApp
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.06] px-3 py-1.5 text-[11.5px] font-semibold text-slate">
            <FileText size={13} /> GST invoice emailed
          </span>
        </div>
      </div>
    </div>
  )
}
