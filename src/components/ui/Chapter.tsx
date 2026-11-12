import type { ReactNode } from 'react'

/** The small label that opens each chapter of the story. */
export function Chapter({
  n,
  children,
  tone = 'light',
  className = '',
}: {
  n?: number
  children: ReactNode
  tone?: 'light' | 'dark' | 'lime'
  className?: string
}) {
  const tones = {
    light: 'border-ink/10 bg-white/70 text-slate',
    dark: 'border-white/15 bg-white/5 text-white/70',
    lime: 'border-lime/30 bg-lime/10 text-lime',
  }
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] backdrop-blur ${tones[tone]} ${className}`}
    >
      {n !== undefined && (
        <span
          className={`grid size-5 place-items-center rounded-full text-[11px] ${
            tone === 'light' ? 'bg-lime text-lime-ink' : 'bg-lime text-lime-ink'
          }`}
        >
          {n}
        </span>
      )}
      {children}
    </span>
  )
}
