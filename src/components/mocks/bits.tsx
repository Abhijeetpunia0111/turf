import type { ReactNode } from 'react'

/** Surface used by every floating product card on the page. */
export const CARD = 'rounded-[22px] bg-white/95 ring-1 ring-black/[0.06] shadow-float backdrop-blur-xl'

type Tone = 'live' | 'soon' | 'next' | 'free' | 'due' | 'ok' | 'warn' | 'frozen' | 'neutral'

const TONES: Record<Tone, string> = {
  live: 'bg-lime text-lime-ink',
  soon: 'bg-negative text-white',
  next: 'bg-[#f1f1ef] text-slate',
  free: 'bg-positive/10 text-positive',
  due: 'bg-negative/10 text-negative',
  ok: 'bg-positive/12 text-[#1f7a5a]',
  warn: 'bg-[#fff1d6] text-[#8a5a00]',
  frozen: 'bg-[#dfeaf7] text-[#2c5a8c]',
  neutral: 'bg-ink/[0.06] text-slate',
}

export function Pill({ tone = 'neutral', children, className = '' }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-[3px] text-[11px] font-semibold leading-none ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export function LiveDot({ className = '' }: { className?: string }) {
  return (
    <span className={`relative inline-flex size-2 ${className}`}>
      <span className="absolute inset-0 animate-ping-soft rounded-full bg-positive" />
      <span className="relative size-2 rounded-full bg-positive" />
    </span>
  )
}

/** A small stat tile in the product's dashboard style. */
export function Stat({
  label,
  children,
  sub,
  tone = 'up',
}: {
  label: string
  children: ReactNode
  sub: string
  tone?: 'up' | 'down' | 'flat'
}) {
  return (
    <div className="rounded-2xl bg-[#f6f9f2] p-3.5">
      <p className="text-[11px] font-medium text-muted">{label}</p>
      <p className="mt-1.5 font-display text-[22px] font-bold leading-none tracking-[-0.04em] text-ink">{children}</p>
      <p
        className={`mt-2 text-[11px] font-medium ${
          tone === 'up' ? 'text-positive' : tone === 'down' ? 'text-negative' : 'text-slate'
        }`}
      >
        {sub}
      </p>
    </div>
  )
}
