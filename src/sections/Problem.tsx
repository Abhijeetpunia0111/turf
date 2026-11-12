import { useRef } from 'react'
import { Users } from 'lucide-react'
import { Chapter } from '../components/ui/Chapter'
import { Words } from '../components/ui/Words'
import { Bubble, ChatPhone, type Msg } from '../components/mocks/Chat'
import { gsap, ScrollTrigger, scrubSection, useScene } from '../lib/motion'

const MESSAGES: Msg[] = [
  { name: 'Rahul', text: 'Bhaiya, 7 baje ka slot hai kya?', time: '6:02 PM' },
  { out: true, text: 'Haan, Court 2 khali hai.', time: '6:03 PM' },
  { name: 'Priya Sharma', text: 'Advance bhej diya ₹500, check karo', time: '6:05 PM' },
  { name: 'Karan (cricket group)', text: 'Sunday 5 to 8 pm, 12 log aayenge', time: '6:07 PM' },
  { name: 'Coach Vikas', text: 'Kal ki attendance register mein likh di, photo bhej raha hoon', time: '6:10 PM' },
  { name: 'Rahul', text: 'Court 2 pe hamari team ka time tha na?? Koi aur khel raha hai', time: '6:14 PM', flag: true },
  { name: 'Unknown', text: 'Missed voice call (3)', time: '6:15 PM', missed: true },
  { name: 'Neha', text: 'Kal ka booking cancel kar do, refund kab milega?', time: '6:18 PM' },
  { name: 'Falcons XI', text: 'Bhai 8 baje wala confirm kar do please', time: '6:21 PM' },
  { name: 'Aman', text: 'UPI kar diya, screenshot bhej raha hoon. Paisa mila?', time: '6:23 PM' },
  { name: 'Rahul', text: 'Reply toh do yaar', time: '6:24 PM' },
]

const NOTES = [
  { text: 'Advance ₹500. Who took it?', pos: 'lg:-right-40 lg:top-8', rot: 5 },
  { text: 'Court 2 double booked, 7 PM. Two teams, one court.', pos: 'lg:-left-40 lg:top-28', rot: -6, hot: true },
  { text: 'Cash drawer short by ₹800.', pos: 'lg:-right-36 lg:top-[270px]', rot: -4 },
  { text: 'Nobody saw the empty 2 PM slot.', pos: 'lg:-left-36 lg:top-[380px]', rot: 4 },
  { text: 'Attendance register: whose handwriting is this?', pos: 'lg:-right-32 lg:bottom-28', rot: 6 },
  { text: '11 memberships expired. Nobody told them.', pos: 'lg:-left-28 lg:bottom-10', rot: -5 },
]

const COUNTERS = [
  { key: 'unread', label: 'Unread messages', value: 47, hot: false },
  { key: 'missed', label: 'Missed calls', value: 6, hot: false },
  { key: 'double', label: 'Double bookings', value: 2, hot: true },
] as const

export function Problem() {
  const root = useRef<HTMLElement>(null)

  useScene(
    root,
    (q, el) => {
      const msgs = q('[data-msg]')
      const notes = q('[data-note]')
      const words = q('[data-w]')
      const phone = q('[data-phone]')[0]

      gsap.set(msgs, { height: 0, autoAlpha: 0 })
      gsap.set(notes, { autoAlpha: 0, scale: 0.6, y: 30 })
      gsap.set(words, { yPercent: 115 })
      gsap.set(q('[data-closing]'), { autoAlpha: 0, y: 24 })
      gsap.set(q('[data-glow]'), { opacity: 0.15 })

      ScrollTrigger.create({
        trigger: el,
        start: 'top 65%',
        once: true,
        onEnter: () => gsap.to(words, { yPercent: 0, duration: 1.15, stagger: 0.06, ease: 'power4.out' }),
      })

      const tl = gsap.timeline({ defaults: { ease: 'none' } })

      msgs.forEach((m, i) => tl.to(m, { height: 'auto', autoAlpha: 1, duration: 0.05 }, 0.04 + i * 0.07))

      COUNTERS.forEach((c) => {
        const node = q(`[data-counter="${c.key}"]`)[0]
        const o = { v: 0 }
        node.textContent = '0'
        tl.to(o, { v: c.value, duration: 0.82, onUpdate: () => (node.textContent = String(Math.round(o.v))) }, 0.04)
      })

      const noteTimes = [0.2, 0.43, 0.5, 0.58, 0.66, 0.74]
      notes.forEach((n, i) => {
        tl.to(n, { autoAlpha: 1, scale: 1, y: 0, duration: 0.07, ease: 'back.out(1.8)' }, noteTimes[i])
      })

      tl.to(phone, { x: 2.5, rotation: 0.5, duration: 0.012, repeat: 12, yoyo: true }, 0.4)
      tl.to(q('[data-glow]'), { opacity: 0.95, duration: 1 }, 0)
      tl.to(q('[data-closing]'), { autoAlpha: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.9)
      tl.set({}, {}, 1)

      const st = scrubSection(el, tl, 0.8)
      return () => st.kill()
    },
    { desktopOnly: true },
  )

  return (
    <section ref={root} id="problem" className="relative bg-dusk text-[#f6efe4] lg:motion-safe:h-[500vh]">
      <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-screen">
        {/* Heat that builds as the messages pile up. */}
        <div
          data-glow
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/4 size-[720px] rounded-full bg-[radial-gradient(circle,rgba(255,90,60,0.38),transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 bottom-0 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(245,129,97,0.14),transparent_65%)]"
        />

        <div className="wrap relative grid h-full items-center gap-14 py-24 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:py-0 lg:pt-20">
          <div>
            <Chapter n={1} tone="dark">
              The problem
            </Chapter>
            <h2 className="mt-6 max-w-[14ch] text-[clamp(2.6rem,5.6vw,5rem)] font-extrabold leading-[0.97] tracking-[-0.05em]">
              <Words>It is 6 PM on a Saturday.</Words>{' '}
              <span className="serif-i text-[1.08em] leading-[0.9] text-flame">
                <Words>Your phone will not stop.</Words>
              </span>
            </h2>
            <p className="mt-6 max-w-[440px] text-[17px] leading-relaxed text-white/60">
              For most turfs the business runs on WhatsApp, a notebook and whoever remembers. It works until the evening
              you need it most.
            </p>

            <dl className="mt-9 grid max-w-[430px] gap-3">
              {COUNTERS.map((c) => (
                <div
                  key={c.key}
                  className="flex items-baseline justify-between rounded-2xl bg-white/[0.045] px-5 py-3.5 ring-1 ring-white/10"
                >
                  <dt className="text-[14px] text-white/60">{c.label}</dt>
                  <dd data-counter={c.key} className={`font-mono text-[32px] font-medium ${c.hot ? 'text-flame' : 'text-white'}`}>
                    {c.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p data-closing className="mt-8 font-serif text-[clamp(2rem,3.4vw,3rem)] italic leading-none text-white/90">
              Sound familiar?
            </p>
          </div>

          <div className="relative mx-auto flex w-full justify-center">
            <div className="relative">
              <ChatPhone
                title="Arena bookings"
                subtitle="Rahul, Priya, Karan, Vikas, You"
                className="h-[560px] lg:h-[min(640px,74vh)]"
                unread={
                  <span className="flex items-center gap-1 rounded-full bg-[#25d366] px-2 py-0.5 text-[11px] font-bold text-[#073b2c]">
                    <Users size={11} /> 47
                  </span>
                }
              >
                {MESSAGES.map((m, i) => (
                  <div key={i} className={i > 5 ? 'max-lg:hidden' : ''}>
                    <Bubble {...m} />
                  </div>
                ))}
              </ChatPhone>

              {/* Sticky notes: around the phone on desktop, a grid below it on phones. */}
              <div className="mt-8 grid grid-cols-2 gap-3 lg:contents">
                {NOTES.map((n, i) => (
                  <div
                    key={i}
                    data-note
                    style={{ rotate: `${n.rot}deg` }}
                    className={`rounded-md p-3.5 font-serif text-[19px] italic leading-[1.15] text-[#3a2a00] shadow-[0_14px_30px_-10px_rgba(0,0,0,0.55)] lg:absolute lg:w-[178px] ${n.pos} ${
                      n.hot ? 'bg-[#ffb199]' : 'bg-[#ffe27a]'
                    }`}
                  >
                    <span className="absolute -top-2 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-[#c0392b] shadow-[inset_-2px_-2px_3px_rgba(0,0,0,0.3)]" />
                    {n.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
