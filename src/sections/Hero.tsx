import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { BadgeCheck, CheckCheck, ChevronDown, Plus } from 'lucide-react'
import { GrassScene } from '../components/art/GrassScene'
import { Button } from '../components/ui/Button'
import { Count } from '../components/ui/Count'
import { Words } from '../components/ui/Words'
import { SportGlyph } from '../components/ui/SportGlyph'
import { Avatar } from '../components/ui/Avatar'
import { CARD, LiveDot, Pill, Stat } from '../components/mocks/bits'
import { gsap, useScene } from '../lib/motion'
import { scrollToTarget } from '../lib/smooth'

const BOOKINGS = [
  { who: 'Aarav Khanna', what: 'Court B · Pickleball', when: 'Sat, 7:00 to 8:00 PM', amt: '₹944', via: 'UPI' },
  { who: 'Meera Shah', what: 'Court A · Football', when: 'Sat, 8:00 to 10:00 PM', amt: '₹1,888', via: 'Razorpay' },
  { who: 'Rohan Desai', what: 'Court C · Badminton', when: 'Sun, 6:00 to 7:00 AM', amt: '₹944', via: 'Book a court widget' },
  { who: 'Falcons XI', what: 'Court D · Box cricket', when: 'Sun, 5:00 to 8:00 PM', amt: '₹2,832', via: 'UPI' },
]

function LiveToast() {
  const [i, setI] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % BOOKINGS.length), 4200)
    return () => window.clearInterval(id)
  }, [])

  useLayoutEffect(() => {
    if (i === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(ref.current, { y: 22, autoAlpha: 0, scale: 0.97 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.7, ease: 'power3.out' })
  }, [i])

  const b = BOOKINGS[i]
  return (
    <div ref={ref} className={`${CARD} flex items-center gap-3.5 p-3.5 pr-4`}>
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
        <BadgeCheck size={22} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-[12px] font-semibold text-positive">
          <LiveDot /> New booking
        </p>
        <p className="mt-0.5 truncate font-display text-[15px] font-bold tracking-[-0.02em] text-ink">{b.who}</p>
        <p className="truncate text-[12px] text-slate">
          {b.what} · {b.when}
        </p>
      </div>
      <div className="text-right">
        <p className="font-display text-[15px] font-bold tracking-[-0.02em] text-ink">{b.amt}</p>
        <p className="text-[11px] font-medium text-positive">Paid · {b.via}</p>
      </div>
    </div>
  )
}

function Floaty({ depth = 1, className = '', children }: { depth?: number; className?: string; children: ReactNode }) {
  return (
    <div data-card className={className}>
      <div data-depth={depth}>
        <div data-float>{children}</div>
      </div>
    </div>
  )
}

const BARS = [52, 64, 58, 76, 70, 62, 92]
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useScene(root, (q, el) => {
    const words = q('[data-w]')
    gsap.set(words, { yPercent: 115 })
    gsap.set(q('[data-bar]'), { scaleY: 0, transformOrigin: 'bottom' })

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.to(words, { yPercent: 0, duration: 1.15, stagger: 0.07 }, 0.1)
      .from(q('[data-fade]'), { autoAlpha: 0, y: 26, duration: 1, stagger: 0.1 }, 0.5)
      .from(q('[data-card]'), { autoAlpha: 0, y: 110, rotate: (i) => (i % 2 ? 3 : -3), duration: 1.4, stagger: 0.13 }, 0.75)
      .to(q('[data-bar]'), { scaleY: 1, duration: 1.1, stagger: 0.06 }, 1.3)

    // Each card breathes on its own clock.
    q('[data-float]').forEach((f, i) => {
      gsap.to(f, { y: i % 2 ? -9 : 9, duration: 3.4 + i * 0.55, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    })

    // Pointer parallax: nearer cards travel further.
    const movers = q('[data-depth]').map((d) => ({
      x: gsap.quickTo(d, 'x', { duration: 0.9, ease: 'power3.out' }),
      y: gsap.quickTo(d, 'y', { duration: 0.9, ease: 'power3.out' }),
      depth: Number(d.dataset.depth),
    }))
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      movers.forEach((m) => {
        m.x(nx * 26 * m.depth)
        m.y(ny * 16 * m.depth)
      })
    }
    el.addEventListener('pointermove', onMove)

    // The hills sit slightly behind the page as it scrolls.
    gsap.to(q('[data-hills]'), {
      yPercent: 7,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
    })

    return () => el.removeEventListener('pointermove', onMove)
  })

  return (
    <section ref={root} id="top" className="relative isolate overflow-hidden bg-gradient-to-b from-[#dcf0cb] via-[#eaf6df] to-page pt-[118px]">
      {/* Sun and drifting cloud, both soft enough to stay behind the type. */}
      <div aria-hidden className="pointer-events-none absolute right-[8%] top-[60px] size-[340px] rounded-full bg-[radial-gradient(circle,#fff8c9_0%,rgba(255,233,140,0.45)_38%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-[140px] h-20 w-72 animate-drift rounded-full bg-white/80 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-[300px] h-14 w-56 animate-drift rounded-full bg-white/70 blur-2xl [animation-delay:-18s] [animation-duration:52s]" />

      <div className="wrap relative z-10 text-center">
        <p
          data-fade
          className="mx-auto inline-flex items-center gap-2.5 rounded-full bg-white/80 px-4 py-2 text-[13px] font-medium text-slate shadow-card ring-1 ring-black/[0.05] backdrop-blur"
        >
          <span className="size-2 rounded-full bg-lime ring-4 ring-lime/30" />
          Built for Indian turfs, courts and academies
        </p>

        <h1 className="mx-auto mt-7 text-[clamp(3rem,8vw,6.6rem)] font-extrabold leading-[0.95] tracking-[-0.055em] text-ink">
          <Words>Fill every slot.</Words>
          <br />
          <span className="serif-i text-[1.08em] leading-[0.9] text-forest-2">
            <Words>Run the whole turf.</Words>
          </span>
        </h1>

        <p data-fade className="mx-auto mt-7 max-w-[620px] text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-slate">
          Turfleo takes your bookings, collects the money, keeps your members and academy in order, and shows you every
          court and rupee on one screen.
        </p>

        <div data-fade className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button arrow magnetic href="#demo" onClick={() => scrollToTarget('#demo')}>
            Book a demo
          </Button>
          <Button variant="ghost" href="#problem" onClick={() => scrollToTarget('#problem')}>
            Why turf owners switch
            <ChevronDown size={18} />
          </Button>
        </div>
      </div>

      {/* The scene: hills and grass underneath, product cards floating over the crest. */}
      <div className="relative mt-12 h-[600px] sm:h-[640px] lg:h-[680px]">
        <GrassScene />

        <div className="wrap relative h-full">
          <div className="grid h-full grid-cols-1 items-start gap-5 pt-2 lg:grid-cols-[1fr_1.18fr_1fr] lg:gap-6">
            {/* Left: today's numbers */}
            <Floaty depth={0.8} className="lg:mt-14">
              <div className={`${CARD} p-4`}>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="font-display text-[15px] font-bold tracking-[-0.02em]">Greenfield Sports Arena</p>
                    <p className="text-[12px] text-muted">Saturday, 11 October</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-black/10 px-2.5 py-1 text-[11px] font-medium text-slate">
                    All branches <ChevronDown size={12} />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <Stat label="Revenue" sub="18% vs last Saturday">
                    <Count prefix="₹" to={48600} immediate delay={1.1} />
                  </Stat>
                  <Stat label="Bookings" sub="6 more than last week">
                    <Count to={34} immediate delay={1.2} />
                  </Stat>
                  <Stat label="Available Courts" sub="4 in use right now" tone="flat">
                    2 / 6
                  </Stat>
                  <Stat label="Outstanding Dues" sub="Unpaid across invoices" tone="down">
                    <Count prefix="₹" to={8400} immediate delay={1.3} />
                  </Stat>
                </div>
              </div>
            </Floaty>

            {/* Centre: the week, and a booking arriving */}
            <div className="flex flex-col gap-4 lg:mt-0">
              <Floaty depth={1.2}>
                <div className={`${CARD} p-5`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[12px] font-medium text-muted">Revenue · last 7 days</p>
                      <p className="mt-1 font-display text-[34px] font-extrabold leading-none tracking-[-0.05em]">
                        <Count prefix="₹" to={312400} immediate delay={1} />
                      </p>
                    </div>
                    <Pill tone="ok">Up 12%</Pill>
                  </div>
                  <div className="mt-5 flex h-[112px] items-end gap-2.5 border-b border-dashed border-black/10 pb-0">
                    {BARS.map((h, i) => (
                      <div key={i} className="flex h-full flex-1 items-end">
                        <div
                          data-bar
                          className={`w-full rounded-t-lg ${i === 6 ? 'bg-lime' : 'bg-[#cfe6bd]'}`}
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2.5 text-center text-[11px] text-muted">
                    {DAYS.map((d, i) => (
                      <span key={d} className={`flex-1 ${i === 6 ? 'font-semibold text-ink' : ''}`}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </Floaty>
              <Floaty depth={1.7} className="lg:-mt-1 lg:px-3">
                <LiveToast />
              </Floaty>
            </div>

            {/* Right: courts live right now, and the WhatsApp confirmation */}
            <div className="hidden flex-col gap-4 lg:mt-20 lg:flex">
              <Floaty depth={1}>
                <div className={`${CARD} p-4`}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-display text-[15px] font-bold tracking-[-0.02em]">Active courts</p>
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-positive">
                      <LiveDot /> Live
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { sport: 'football', name: 'Court A', player: 'Falcons XI', pill: <Pill tone="live">In play · 42 min</Pill> },
                      { sport: 'pickleball', name: 'Court B', player: 'Aarav Khanna', pill: <Pill tone="soon">Ending soon · 8 min</Pill> },
                      {
                        sport: 'badminton',
                        name: 'Court C',
                        player: '₹800 / hr',
                        pill: (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="text-[11px] font-semibold text-positive">Free now</span>
                            <span className="grid size-6 place-items-center rounded-full bg-lime text-lime-ink">
                              <Plus size={13} />
                            </span>
                          </span>
                        ),
                      },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center gap-3 rounded-2xl bg-[#f6f9f2] p-2.5">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-slate shadow-sm">
                          <SportGlyph sport={c.sport as 'football'} size={20} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-semibold leading-tight">{c.name}</p>
                          <p className="truncate text-[11px] text-slate">{c.player}</p>
                        </div>
                        {c.pill}
                      </div>
                    ))}
                  </div>
                </div>
              </Floaty>
              <Floaty depth={1.5} className="pl-8">
                <div className="rounded-[20px] rounded-tl-md bg-[#dcf8c6] p-3.5 shadow-float ring-1 ring-black/[0.05]">
                  <p className="text-[11px] font-bold text-[#128c7e]">Turfleo</p>
                  <p className="mt-1 text-[13px] leading-snug text-[#1c2b1c]">
                    Booking confirmed. Court B · Pickleball, Sat 7 to 8 PM. ₹944 paid. See you on court!
                  </p>
                  <p className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-[#5d7a5d]">
                    7:02 PM <CheckCheck size={14} className="text-[#34a8e0]" />
                  </p>
                </div>
              </Floaty>
            </div>
          </div>
        </div>

        {/* Faces on the floor of the scene: customers who just booked. */}
        <div aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 text-[12px] font-medium text-slate shadow-card backdrop-blur md:flex">
          <span className="flex -space-x-2">
            {['Aarav Khanna', 'Meera Shah', 'Rohan Desai', 'Isha Rao'].map((n) => (
              <Avatar key={n} name={n} size={26} ring />
            ))}
          </span>
          Players booked in the last hour
        </div>
      </div>
    </section>
  )
}
