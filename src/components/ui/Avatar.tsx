const TONES: [string, string][] = [
  ['#fde2c8', '#8a4b12'],
  ['#d6ecf5', '#1d5a73'],
  ['#e6dcfa', '#4b3a8c'],
  ['#d9f0d2', '#2b6a2e'],
  ['#fbd9e0', '#8f2b44'],
  ['#fdf0b8', '#7a5d00'],
]

export function Avatar({
  name,
  size = 32,
  className = '',
  ring = false,
}: {
  name: string
  size?: number
  className?: string
  ring?: boolean
}) {
  const parts = name.trim().split(/\s+/)
  const initials = ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase()
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0)
  const [bg, fg] = TONES[hash % TONES.length]
  return (
    <span
      aria-hidden
      className={`inline-grid shrink-0 place-items-center rounded-full font-display font-bold ${
        ring ? 'ring-2 ring-white' : ''
      } ${className}`}
      style={{ width: size, height: size, background: bg, color: fg, fontSize: Math.round(size * 0.38) }}
    >
      {initials}
    </span>
  )
}
