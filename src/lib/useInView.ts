import { useEffect, useState, type RefObject } from 'react'

/** True once the element has scrolled into view (and stays true). */
export function useInView(ref: RefObject<Element | null>, margin = '0px 0px -12% 0px') {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, seen, margin])
  return seen
}
