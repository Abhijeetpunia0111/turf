import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './motion'

let lenis: Lenis | null = null

/** Smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in step with it. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis = instance
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Web fonts change heights, so measure again once they are in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenis = null
    }
  }, [])
}

export function scrollToTarget(selector: string) {
  const el = document.querySelector<HTMLElement>(selector)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -12, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
