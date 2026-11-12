import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const DESKTOP = '(min-width: 1024px)'
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export type Q = (selector: string) => HTMLElement[]

/**
 * Runs `build` inside gsap.matchMedia so every tween and ScrollTrigger it creates is
 * reverted when the query stops matching or the component unmounts (React StrictMode
 * mounts twice in dev, so cleanup has to be complete).
 *
 * With `desktopOnly` the scene only exists at lg and up, and on phones the markup simply
 * stays in its resting, fully visible state.
 */
export function useScene(
  ref: RefObject<HTMLElement | null>,
  build: (q: Q, root: HTMLElement) => void | (() => void),
  options: { desktopOnly?: boolean } = {},
) {
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const mm = gsap.matchMedia()
    const query = options.desktopOnly ? `${DESKTOP} and ${MOTION_OK}` : MOTION_OK
    mm.add(query, () => build(gsap.utils.selector(root) as Q, root))
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/** A scrubbed timeline bound to the progress of a tall section (sticky-stage pattern). */
export function scrubSection(section: HTMLElement, tl: gsap.core.Timeline, scrub: number | boolean = 0.7) {
  return ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub,
    animation: tl,
    invalidateOnRefresh: true,
  })
}
