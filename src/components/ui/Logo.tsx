/**
 * The mark is three things at once: the centre circle of a pitch, a lion's mane (Leo), and
 * the sun that the page rises on.
 */
export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4
    const [r1, r2] = i % 2 === 0 ? [8.6, 12.4] : [8.6, 11]
    return {
      x1: 16 + r1 * Math.cos(a),
      y1: 16 + r1 * Math.sin(a),
      x2: 16 + r2 * Math.cos(a),
      y2: 16 + r2 * Math.sin(a),
    }
  })
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="var(--color-lime)" />
      <circle cx="16" cy="16" r="4.2" fill="none" stroke="var(--color-lime-ink)" strokeWidth="2.2" />
      <g stroke="var(--color-lime-ink)" strokeWidth="2.2" strokeLinecap="round">
        {rays.map((r, i) => (
          <line key={i} {...r} />
        ))}
      </g>
    </svg>
  )
}

export function Logo({
  tone = 'dark',
  size = 32,
  className = '',
}: {
  tone?: 'dark' | 'light'
  size?: number
  className?: string
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <span
        className={`font-display text-[22px] font-extrabold tracking-[-0.04em] ${
          tone === 'light' ? 'text-white' : 'text-ink'
        }`}
      >
        Turfleo
      </span>
    </span>
  )
}
