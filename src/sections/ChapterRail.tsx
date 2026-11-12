import { useEffect, useState } from 'react'
import { scrollToTarget } from '../lib/smooth'

const CHAPTERS: [string, string][] = [
  ['top', 'Start'],
  ['problem', 'The problem'],
  ['turn', 'The turn'],
  ['product', 'What you get'],
  ['day', 'A day on Turfleo'],
  ['math', 'The math'],
  ['who', 'Who it is for'],
  ['start', 'Getting started'],
  ['pricing', 'Pricing'],
  ['demo', 'Book a demo'],
]

/** A thin progress rail on the right: where you are in the story, and a way to jump. */
export function ChapterRail() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const pick = () => {
      const line = window.innerHeight * 0.45
      let idx = 0
      CHAPTERS.forEach(([id], i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < line) idx = i
      })
      setActive(idx)
    }
    pick()
    window.addEventListener('scroll', pick, { passive: true })
    window.addEventListener('resize', pick)
    return () => {
      window.removeEventListener('scroll', pick)
      window.removeEventListener('resize', pick)
    }
  }, [])

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-4 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-end gap-1 rounded-full bg-white/70 px-2 py-3 shadow-card ring-1 ring-black/[0.06] backdrop-blur-xl min-[1400px]:flex"
    >
      {CHAPTERS.map(([id, label], i) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          aria-current={i === active ? 'true' : undefined}
          onClick={(e) => {
            e.preventDefault()
            scrollToTarget(`#${id}`)
          }}
          className="group relative flex items-center justify-center rounded-full px-2 py-1.5"
        >
          <span className="pointer-events-none absolute right-full mr-3 translate-x-1 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100">
            {label}
          </span>
          <span
            className={`block rounded-full transition-all duration-500 ease-out-expo ${
              i === active ? 'h-5 w-2 bg-ink' : 'size-2 bg-ink/20 group-hover:bg-ink/50'
            }`}
          />
        </a>
      ))}
    </nav>
  )
}
