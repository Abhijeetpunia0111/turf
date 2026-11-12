import { useRef } from 'react'
import { PhoneMissed } from 'lucide-react'
import { Chapter } from '../components/ui/Chapter'
import { Words } from '../components/ui/Words'
import { Ticket } from '../components/mocks/Ticket'
import { gsap, scrubSection, useScene } from '../lib/motion'

type Frag = { kind: 'in' | 'out' | 'note' | 'hot' | 'chip'; text: string; left: string; top: string; rot: number }

const FRAGS: Frag[] = [
  { kind: 'in', text: 'Slot hai kya?', left: '5%', top: '47%', rot: -4 },
  { kind: 'out', text: 'Haan, Court 2 khali', left: '74%', top: '45%', rot: 3 },
  { kind: 'hot', text: 'Double booked!', left: '13%', top: '63%', rot: -6 },
  { kind: 'chip', text: 'Missed call (3)', left: '78%', top: '60%', rot: 2 },
  { kind: 'note', text: 'Cash short ₹800', left: '3%', top: '79%', rot: 5 },
  { kind: 'in', text: 'Advance bhej diya', left: '69%', top: '77%', rot: -3 },
  { kind: 'note', text: 'Register kahan hai?', left: '22%', top: '88%', rot: 4 },
  { kind: 'chip', text: 'Pass expired', left: '58%', top: '90%', rot: -2 },
]

function Fragment({ f }: { f: Frag }) {
  const base = 'absolute z-10 hidden whitespace-nowrap shadow-[0_12px_28px_-10px_rgba(0,0,0,0.6)] lg:block'
  const style = { left: f.left, top: f.top, rotate: `${f.rot}deg` }
  if (f.kind === 'in' || f.kind === 'out')
    return (
      <div data-frag style={style} className={`${base} rounded-2xl px-3.5 py-2 text-[14px] text-[#1c1c1c] ${f.kind === 'out' ? 'bg-[#dcf8c6]' : 'bg-white'}`}>
        {f.text}
      </div>
    )
  if (f.kind === 'chip')
    return (
      <div data-frag style={style} className={`${base} flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-[#c0392b]`}>
        <PhoneMissed size={14} /> {f.text}
      </div>
    )
  return (
    <div
      data-frag
      style={style}
      className={`${base} rounded-md px-3.5 py-2.5 font-serif text-[19px] italic text-[#3a2a00] ${f.kind === 'hot' ? 'bg-[#ffb199]' : 'bg-[#ffe27a]'}`}
    >
      {f.text}
    </div>
  )
}

const DIM = 'rgba(246,239,228,0.2)'
const LIT = '#f6efe4'
const INK = '#0f1f14'

export function Turn() {
  const root = useRef<HTMLElement>(null)

  useScene(
    root,
    (q, el) => {
      const stage = q('[data-stage]')[0]
      const words = q('[data-w]')
      const frags = q('[data-frag]')
      const ticket = q('[data-ticket]')[0]
      const ring = q('[data-ring]')[0]
      const caption = q('[data-caption]')[0]

      gsap.set(stage, { backgroundColor: '#16110d' })
      gsap.set(words, { color: DIM })
      gsap.set(ticket, { autoAlpha: 0, scale: 0.55, y: 40 })
      gsap.set(ring, { autoAlpha: 0, scale: 0.4 })
      gsap.set(caption, { autoAlpha: 0, y: 20 })
      gsap.set(frags, { autoAlpha: 0, scale: 0.8 })

      const tl = gsap.timeline({ defaults: { ease: 'none' } })

      // Light the question up word by word.
      tl.to(words, { color: LIT, duration: 0.2, stagger: 0.012 }, 0.02)
      tl.to(frags, { autoAlpha: 1, scale: 1, duration: 0.12, stagger: 0.015, ease: 'back.out(1.6)' }, 0.1)

      // Everything gets pulled to the middle.
      const centre = () => ({ x: stage.clientWidth / 2, y: stage.clientHeight * 0.65 })
      frags.forEach((f, i) => {
        tl.to(
          f,
          {
            x: () => centre().x - (f.offsetLeft + f.offsetWidth / 2),
            y: () => centre().y - (f.offsetTop + f.offsetHeight / 2),
            scale: 0.15,
            rotate: 0,
            autoAlpha: 0,
            duration: 0.2,
            ease: 'power2.in',
          },
          0.34 + i * 0.012,
        )
      })

      // The room turns from dusk to day while the question resolves, by way of grass green.
      tl.to(stage, { backgroundColor: '#1d4a2c', duration: 0.12 }, 0.44)
      tl.to(stage, { backgroundColor: '#f2f8ec', duration: 0.14 }, 0.56)
      tl.to(words, { color: INK, duration: 0.2, stagger: 0.008 }, 0.46)

      tl.to(ring, { autoAlpha: 0.9, duration: 0.01 }, 0.56)
      tl.to(ring, { scale: 1.9, autoAlpha: 0, duration: 0.16, ease: 'power2.out' }, 0.56)
      tl.to(ticket, { autoAlpha: 1, scale: 1, y: 0, duration: 0.13, ease: 'back.out(1.7)' }, 0.56)
      tl.to(caption, { autoAlpha: 1, y: 0, duration: 0.09, ease: 'power2.out' }, 0.74)
      tl.set({}, {}, 1)

      const st = scrubSection(el, tl, 0.8)
      return () => st.kill()
    },
    { desktopOnly: true },
  )

  return (
    <section ref={root} id="turn" className="relative bg-page text-ink lg:motion-safe:h-[420vh]">
      <div data-stage className="relative overflow-hidden bg-page lg:sticky lg:top-0 lg:h-screen">
        <div className="wrap relative flex h-full flex-col items-center py-24 text-center lg:pt-28">
          <Chapter n={2}>The turn</Chapter>
          <h2 className="mt-6 max-w-[21ch] text-[clamp(2rem,3.7vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em]">
            <Words>What if every call, every DM and every walk-in</Words>{' '}
            <span className="serif-i text-[1.08em] leading-[0.9]">
              <Words>landed in one place</Words>
            </span>{' '}
            <Words>and confirmed itself?</Words>
          </h2>

          <div className="relative mt-12 flex flex-1 items-center justify-center lg:mt-0 lg:absolute lg:inset-x-0 lg:top-[65%] lg:-translate-y-1/2">
            <span
              data-ring
              aria-hidden
              className="absolute size-[420px] rounded-full border-2 border-lime max-lg:hidden"
            />
            <Ticket />
          </div>

          <p
            data-caption
            className="mt-10 max-w-[560px] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-slate lg:absolute lg:bottom-6 lg:mt-0"
          >
            Confirmed on WhatsApp. Paid on UPI. On the calendar. Nobody at your end touched it.
          </p>
        </div>

        {FRAGS.map((f, i) => (
          <Fragment key={i} f={f} />
        ))}
      </div>
    </section>
  )
}
