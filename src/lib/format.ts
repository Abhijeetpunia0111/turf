/** ₹1,24,800: Indian digit grouping. */
export const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`

/** ₹1.2L / ₹48.6K for tight spaces. */
export function inrCompact(n: number) {
  const abs = Math.abs(n)
  if (abs >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2).replace(/\.?0+$/, '')}Cr`
  if (abs >= 1_00_000) return `₹${(n / 1_00_000).toFixed(2).replace(/\.?0+$/, '')}L`
  if (abs >= 1_000) return `₹${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return `₹${Math.round(n)}`
}

export const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

/** 18 -> "6 PM", 24 -> "12 AM". Hours past 24 wrap. */
export function hourLabel(h: number) {
  const hh = ((Math.floor(h) % 24) + 24) % 24
  const suffix = hh >= 12 ? 'PM' : 'AM'
  const twelve = hh % 12 === 0 ? 12 : hh % 12
  return `${twelve} ${suffix}`
}
