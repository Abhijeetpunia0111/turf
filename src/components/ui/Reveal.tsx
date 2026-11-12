import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap, MOTION_OK } from '../../lib/motion'

/** Fades and lifts its content in once, when it enters the viewport. */
export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  delay = 0,
  y = 36,
  x = 0,
  scale = 1,
  start = 'top 88%',
}: {
  children: ReactNode
  className?: string
  as?: ElementType
  delay?: number
  y?: number
  x?: number
  scale?: number
  start?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from(el, {
        autoAlpha: 0,
        y,
        x,
        scale,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start, once: true },
      })
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
