import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/motion'

/** A number that counts up when it scrolls into view. Renders its final value without JS. */
export function Count({
  to,
  from = 0,
  duration = 1.8,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  indian = true,
  immediate = false,
  className = '',
}: {
  to: number
  from?: number
  duration?: number
  delay?: number
  decimals?: number
  prefix?: string
  suffix?: string
  indian?: boolean
  /** Start on mount instead of waiting to scroll into view. */
  immediate?: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const fmt = (n: number) =>
    prefix +
    n.toLocaleString(indian ? 'en-IN' : 'en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const state = { v: from }
    el.textContent = fmt(from)
    const tween = gsap.to(state, {
      v: to,
      duration,
      delay,
      ease: 'power3.out',
      paused: true,
      onUpdate: () => {
        el.textContent = fmt(state.v)
      },
    })
    if (immediate) {
      tween.play()
      return () => {
        tween.kill()
      }
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 94%', once: true, onEnter: () => tween.play() })
    return () => {
      st.kill()
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, from])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {fmt(to)}
    </span>
  )
}
