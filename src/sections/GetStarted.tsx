import { useRef } from 'react'
import { Chapter } from '../components/ui/Chapter'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { gsap, useScene } from '../lib/motion'
import { scrollToTarget } from '../lib/smooth'

const STEPS = [
  { t: 'Tell us about your venue', b: 'Name, logo and the sports you offer.' },
  { t: 'Pick your counter services', b: 'Check-in, walk-in booking, student attendance, membership and rental shop. Switch on only what you run.' },
  { t: 'Pay and start', b: 'Your admin login is emailed the moment the payment clears, and the dashboard opens.' },
  { t: 'Put Book a court on your site', b: 'Connect your gateway, create a key and paste one line. About ten minutes.' },
]

export function GetStarted() {
  const root = useRef<HTMLElement>(null)

  useScene(root, (q, el) => {
    const line = q('[data-line]')[0]
    const nodes = q('[data-node]')
    const cards = q('[data-step]')
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(cards, { autoAlpha: 0, y: 40 })
    gsap.set(nodes, { scale: 0.6, backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el.querySelector('[data-steps]'), start: 'top 80%', end: 'bottom 80%', scrub: 0.6 },
    })
    tl.to(line, { scaleX: 1, ease: 'none', duration: 4 }, 0)
    cards.forEach((c, i) => {
      tl.to(c, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, i * 1.05)
      tl.to(nodes[i], { scale: 1, backgroundColor: '#bff06b', color: '#0f3318', duration: 0.4, ease: 'back.out(2)' }, i * 1.05)
    })
  })

  return (
    <section ref={root} id="start" className="relative overflow-hidden bg-night py-24 text-white lg:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(191,240,107,0.14),transparent_65%)]" />
      <div className="wrap relative">
        <Reveal>
          <Chapter n={7} tone="lime">
            Getting started
          </Chapter>
        </Reveal>
        <Reveal as="h2" className="mt-6 max-w-[18ch] text-[clamp(2.3rem,5vw,4.3rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
          From signup to your first booking in <span className="serif-i text-[1.08em] text-lime">four steps.</span>
        </Reveal>

        <div data-steps className="relative mt-16 grid gap-6 lg:grid-cols-4 lg:gap-5">
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[22px] hidden h-px bg-white/10 lg:block" />
          <div data-line aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[22px] hidden h-px bg-lime lg:block" />
          {STEPS.map((s, i) => (
            <div key={s.t} data-step className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-6 lg:text-center">
              <span
                data-node
                className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-lime font-display text-[17px] font-extrabold text-lime-ink ring-8 ring-night"
              >
                {i + 1}
              </span>
              <div className="lg:rounded-[26px] lg:bg-white/[0.05] lg:p-6 lg:ring-1 lg:ring-white/10">
                <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.03em]">{s.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{s.b}</p>
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center gap-4">
          <Button variant="lime" arrow magnetic href="#demo" onClick={() => scrollToTarget('#demo')}>
            Book a demo
          </Button>
          <span className="text-[14px] text-white/50">No card needed to look around. Cancel any time.</span>
        </Reveal>
      </div>
    </section>
  )
}
