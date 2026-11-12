import { useRef, type ReactNode } from 'react'
import { BadgeCheck, BellRing, Check, MessageCircle } from 'lucide-react'
import { Avatar } from '../components/ui/Avatar'
import { Chapter } from '../components/ui/Chapter'
import { Pill } from '../components/mocks/bits'
import { clamp } from '../lib/format'
import { gsap, ScrollTrigger, useScene } from '../lib/motion'

/* ---- Small visuals that sit at the foot of each card ------------------------------------ */

function AttendanceViz() {
  const kids = ['Arjun Nair', 'Sia Kapoor', 'Aryan Mehta', 'Zoya Khan', 'Veer Singh', 'Riya Das', 'Kunal Shah', 'Mira Nair']
  return (
    <div>
      <div className="flex -space-x-2">
        {kids.map((n, i) => (
          <span key={n} className="relative">
            <Avatar name={n} size={34} ring />
            {i === 3 && <span className="absolute inset-0 grid place-items-center rounded-full bg-black/45 text-[10px] font-bold text-white">A</span>}
          </span>
        ))}
        <span className="grid size-[34px] place-items-center rounded-full bg-ink text-[11px] font-bold text-white ring-2 ring-white">+10</span>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-slate">
        <BadgeCheck size={14} className="text-positive" /> 18 of 20 present. Report ready for parents.
      </p>
    </div>
  )
}

function ChatViz() {
  return (
    <div className="space-y-1.5">
      <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-[#dcf8c6] px-3 py-2 text-[12px] leading-snug text-[#1c2b1c]">
        Hi Rohan, it’s been a while since your last game at Greenfield. Courts are open. Book a slot this week!
      </div>
      <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-white px-3 py-2 text-[12px] text-[#1c1c1c] shadow-sm ring-1 ring-black/5">
        Court C at 11 AM please
      </div>
    </div>
  )
}

function PayViz() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-xl bg-lime px-3 py-2.5 text-lime-ink">
        <span className="flex items-center gap-2 text-[12.5px] font-bold">
          <BadgeCheck size={16} /> UPI ₹944 recorded
        </span>
        <span className="text-[11px] font-medium opacity-70">TL0042</span>
      </div>
      <p className="flex items-center justify-between text-[12px] text-slate">
        <span>Outstanding dues</span>
        <span className="font-mono">
          <s className="text-muted">₹8,400</s> → <b className="text-ink">₹7,456</b>
        </span>
      </p>
    </div>
  )
}

function RenewViz() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-2.5 ring-1 ring-black/[0.07]">
      <Avatar name="Dev Malhotra" size={34} />
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-semibold leading-tight">Dev Malhotra</p>
        <p className="text-[11px] text-muted">Pickleball Pro · ends tomorrow</p>
      </div>
      <Pill tone="warn">Expiring</Pill>
      <span className="grid size-7 place-items-center rounded-full bg-[#dcf8c6] text-[#1e6b3d]">
        <BellRing size={13} />
      </span>
    </div>
  )
}

function PeakViz() {
  const courts = ['live', 'live', 'live', 'partner', 'live', 'live'] as const
  return (
    <div>
      <div className="grid grid-cols-6 gap-1.5">
        {courts.map((c, i) => (
          <div
            key={i}
            className={`grid h-12 place-items-center rounded-lg text-[10px] font-bold ${
              c === 'live' ? 'bg-ink text-lime' : 'hatch-partner border border-partner/30 text-partner-ink'
            }`}
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-[12px] font-medium text-slate">6 of 6 courts booked. Court D came in through Playo.</p>
    </div>
  )
}

function KitViz() {
  return (
    <ul className="space-y-1.5 text-[12px]">
      {['Studs / Shoes × 2 returned', 'Deposit ₹500 refunded'].map((t) => (
        <li key={t} className="flex items-center gap-2 text-slate">
          <span className="grid size-4 place-items-center rounded-full bg-positive text-white">
            <Check size={10} strokeWidth={3} />
          </span>
          {t}
        </li>
      ))}
      <li className="flex items-center justify-between rounded-lg bg-negative/10 px-2.5 py-1.5 font-medium text-negative">
        <span>Karan’s XI still owes</span>
        <span className="font-mono">₹1,200</span>
      </li>
    </ul>
  )
}

function CloseViz() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        ['₹48,600', 'Revenue'],
        ['34', 'Bookings'],
        ['₹7,456', 'Dues'],
      ].map(([v, l]) => (
        <div key={l} className="rounded-xl bg-[#f3f8ee] p-2.5">
          <p className="font-display text-[17px] font-extrabold leading-none tracking-[-0.04em]">{v}</p>
          <p className="mt-1 text-[10.5px] text-muted">{l}</p>
        </div>
      ))}
    </div>
  )
}

/* ---- The day ---------------------------------------------------------------------------- */

const DAY: { t: number; label: string; title: string; body: string; viz: ReactNode }[] = [
  {
    t: 6,
    label: '6:00 AM',
    title: 'The first batch checks in',
    body: 'Coach Vikas marks attendance on the counter tablet. Nobody types it up later, and the parents’ report builds itself.',
    viz: <AttendanceViz />,
  },
  {
    t: 9,
    label: '9:00 AM',
    title: 'The quiet hours fill up',
    body: 'Mid-morning is empty, so a “we miss you” goes to players who have not booked in a month. Two replies later, 11 AM is taken.',
    viz: <ChatViz />,
  },
  {
    t: 13,
    label: '1:00 PM',
    title: 'A payment lands',
    body: 'A customer pays by UPI. Staff tap Yes on WhatsApp, the invoice is emailed and the dues on the dashboard drop.',
    viz: <PayViz />,
  },
  {
    t: 16.5,
    label: '4:30 PM',
    title: 'School is out',
    body: 'The juniors batch starts. A membership ends tomorrow, so a renewal reminder goes out tonight without anyone remembering.',
    viz: <RenewViz />,
  },
  {
    t: 19,
    label: '7:00 PM',
    title: 'Peak hour. Every court is live',
    body: 'Walk-ins see exactly what is free. A Playo booking sits on the grid beside the counter ones, and nothing gets sold twice.',
    viz: <PeakViz />,
  },
  {
    t: 22,
    label: '10:00 PM',
    title: 'The last whistle',
    body: 'Kit comes back, deposits settle and the final session ends. Anyone who has not paid shows up as dues, with a name.',
    viz: <KitViz />,
  },
  {
    t: 24,
    label: '12:00 AM',
    title: 'The books are already closed',
    body: 'Revenue, occupancy and dues are added up before you ask. Tomorrow’s 6 AM batch is already on the calendar.',
    viz: <CloseViz />,
  },
]

const SKY = ['#f8dcc0', '#e3f1d4', '#eef8e6', '#f9e3ae', '#2c3552', '#0b1d14', '#07140c']
const GROUND = ['#6fb34f', '#5aa648', '#5aa648', '#5f9a3d', '#26402f', '#0f2b1a', '#0a2114']

function clockLabel(hour: number) {
  const h24 = Math.floor(hour) % 24
  const m = Math.floor((hour - Math.floor(hour)) * 60)
  const suffix = h24 >= 12 ? 'PM' : 'AM'
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`
}

export function Day() {
  const root = useRef<HTMLElement>(null)

  useScene(
    root,
    (q) => {
      const stage = q('[data-stage]')[0]
      const track = q('[data-track]')[0]
      const cards = q('[data-card]')
      const clock = q('[data-clock]')[0]
      const sun = q('[data-sun]')[0]
      const moon = q('[data-moon]')[0]
      const ground = q('[data-ground]')[0]
      const stars = q('[data-stars]')[0]
      const lights = q('[data-lights]')[0]
      const inks = q('[data-ink]')
      const n = cards.length
      const times = DAY.map((d) => d.t)
      const skyAt = gsap.utils.interpolate(SKY)
      const groundAt = gsap.utils.interpolate(GROUND)
      const inkAt = gsap.utils.interpolate(['#0f1f14', '#ffffff'])
      let lastOn = -1

      const render = (p: number) => {
        const step = cards[1].offsetLeft - cards[0].offsetLeft
        gsap.set(track, { x: -p * (n - 1) * step })

        // Clock: piecewise between each card's time, so it always agrees with the card in focus.
        const f = clamp(p, 0, 1) * (n - 1)
        const i = Math.min(n - 2, Math.floor(f))
        const hour = times[i] + (times[i + 1] - times[i]) * (f - i)
        clock.textContent = clockLabel(hour)

        stage.style.backgroundColor = skyAt(p)
        ground.style.backgroundColor = groundAt(p)
        const dark = clamp((p - 0.5) / 0.18, 0, 1)
        const ink = inkAt(dark)
        inks.forEach((el) => (el.style.color = ink))

        const vw = stage.clientWidth
        const vh = stage.clientHeight
        const horizon = vh * 0.3
        const arc = vh * 0.2
        const us = clamp(p / 0.58, 0, 1)
        sun.style.transform = `translate(${vw * 0.04 + us * vw * 0.9}px, ${horizon - Math.sin(Math.PI * us) * arc}px)`
        sun.style.opacity = String(p < 0.58 ? 1 : clamp(1 - (p - 0.58) / 0.05, 0, 1))
        // The moon keeps to the top band so it never sits behind the (white) headline.
        const um = clamp((p - 0.52) / 0.48, 0, 1)
        moon.style.transform = `translate(${vw * 0.05 + um * vw * 0.92}px, ${vh * 0.13 - Math.sin(Math.PI * um) * vh * 0.11}px)`
        moon.style.opacity = String(clamp((p - 0.6) / 0.08, 0, 1))
        stars.style.opacity = String(clamp((p - 0.68) / 0.18, 0, 1))
        lights.style.opacity = String(clamp((p - 0.62) / 0.2, 0, 1))

        const on = Math.round(f)
        if (on !== lastOn) {
          cards.forEach((c, k) => (c.dataset.on = String(k === on)))
          lastOn = on
        }
      }

      const state = { p: 0 }
      const ease = gsap.quickTo(state, 'p', { duration: 0.7, ease: 'power3.out', onUpdate: () => render(state.p) })
      const st = ScrollTrigger.create({
        trigger: root.current!,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onUpdate: (self) => ease(self.progress),
        onRefresh: (self) => {
          state.p = self.progress
          render(state.p)
        },
      })
      render(0)
      return () => st.kill()
    },
    { desktopOnly: true },
  )

  return (
    <section ref={root} id="day" className="relative bg-page lg:motion-safe:h-[520vh]">
      <div data-stage className="relative overflow-hidden bg-[#eef8e6] max-lg:py-24 lg:sticky lg:top-0 lg:h-screen">
        {/* Sky furniture, only drawn on the big scrolling version. */}
        <div aria-hidden className="max-lg:hidden">
          <div data-stars className="absolute inset-0 opacity-0">
            {Array.from({ length: 46 }, (_, i) => (
              <i
                key={i}
                className="absolute rounded-full bg-white animate-blink"
                style={{
                  left: `${(i * 53) % 100}%`,
                  top: `${(i * 29) % 46}%`,
                  width: i % 5 === 0 ? 3 : 2,
                  height: i % 5 === 0 ? 3 : 2,
                  animationDelay: `${(i % 9) * 0.3}s`,
                }}
              />
            ))}
          </div>
          <div data-sun className="absolute left-0 top-0 size-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#fff6b8_0%,#ffd166_55%,rgba(255,209,102,0)_72%)] blur-[1px]" style={{ willChange: 'transform' }} />
          <div data-moon className="absolute left-0 top-0 size-16 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ffffff,#cfe0d6_70%)] opacity-0 shadow-[0_0_60px_10px_rgba(220,240,230,0.35)]" style={{ willChange: 'transform' }} />
          <div
            data-lights
            className="absolute inset-x-0 bottom-[12vh] h-[55vh] opacity-0"
            style={{
              background:
                'radial-gradient(ellipse 28% 60% at 12% 100%, rgba(255,246,190,0.28), transparent 70%), radial-gradient(ellipse 28% 60% at 88% 100%, rgba(255,246,190,0.28), transparent 70%)',
            }}
          />
          <div data-ground className="mow absolute inset-x-0 bottom-0 h-[15vh] bg-[#6fb34f]">
            <div className="absolute inset-x-0 top-0 h-px bg-white/30" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-white/25" />
            <div className="absolute left-1/2 top-[-34px] size-[68px] -translate-x-1/2 rounded-full border border-white/25" />
          </div>
        </div>

        <div className="wrap relative z-10 flex flex-col gap-8 lg:absolute lg:inset-x-0 lg:top-0 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:pt-[104px]">
          <div data-ink style={{ color: '#0f1f14' }}>
            <Chapter n={4}>A day on Turfleo</Chapter>
            <h2 className="mt-5 max-w-[15ch] text-[clamp(2.1rem,3.8vw,3.4rem)] font-extrabold leading-[1] tracking-[-0.05em]">
              From the first batch to <span className="serif-i text-[1.08em]">the last whistle.</span>
            </h2>
            <p className="mt-3 text-[14px] opacity-70">An example Saturday at a six-court venue.</p>
          </div>
          <div className="max-lg:hidden lg:text-right" data-ink style={{ color: '#0f1f14' }}>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] opacity-60">Saturday</p>
            <p data-clock className="font-display text-[clamp(3.4rem,8vw,7.2rem)] font-extrabold leading-[0.95] tracking-[-0.06em] tabular-nums">
              6:00 AM
            </p>
          </div>
        </div>

        <div className="wrap relative z-10 mt-10 lg:absolute lg:inset-x-0 lg:bottom-[17vh] lg:mt-0 lg:max-w-none lg:p-0">
          <div
            data-track
            className="flex flex-col gap-4 lg:w-max lg:flex-row lg:gap-7 lg:will-change-transform lg:[padding-inline:calc(50vw-200px)]"
          >
            {DAY.map((d, i) => (
              <article
                key={d.label}
                data-card
                data-on={i === 0 ? 'true' : 'false'}
                className="flex flex-col rounded-[28px] bg-white/90 p-6 shadow-float ring-1 ring-black/[0.06] backdrop-blur-xl transition-[transform,opacity] duration-500 lg:h-[330px] lg:w-[400px] lg:shrink-0 lg:data-[on=false]:scale-[0.94] lg:data-[on=false]:opacity-80"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-lime px-3 py-1 font-mono text-[12px] font-medium text-lime-ink">{d.label}</span>
                  {i === 1 && <MessageCircle size={16} className="text-muted" />}
                </div>
                <h3 className="mt-4 font-display text-[22px] font-bold leading-[1.1] tracking-[-0.04em]">{d.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate">{d.body}</p>
                <div className="mt-auto pt-4">{d.viz}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
