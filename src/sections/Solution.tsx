import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { CalendarDays, Check, CreditCard, GraduationCap, Goal, ShoppingBag, Users, type LucideIcon } from 'lucide-react'
import { BrowserFrame, type NavLabel } from '../components/mocks/BrowserFrame'
import { SlotGridMock } from '../components/mocks/SlotGridMock'
import { SettleMock } from '../components/mocks/SettleMock'
import { LiveCourtsMock } from '../components/mocks/LiveCourtsMock'
import { MembersMock } from '../components/mocks/MembersMock'
import { AcademyMock } from '../components/mocks/AcademyMock'
import { CounterMock } from '../components/mocks/CounterMock'
import { Chapter } from '../components/ui/Chapter'
import { Reveal } from '../components/ui/Reveal'
import { DESKTOP, ScrollTrigger } from '../lib/motion'
import { useMedia } from '../lib/useMedia'

type Step = {
  id: string
  nav: NavLabel
  Icon: LucideIcon
  label: string
  title: ReactNode
  body: string
  bullets: string[]
  mock: (active: boolean) => ReactNode
}

const STEPS: Step[] = [
  {
    id: 'bookings',
    nav: 'Bookings',
    Icon: CalendarDays,
    label: 'Bookings',
    title: (
      <>
        Every booking lands in <span className="serif-i text-[1.08em] text-forest-2">one calendar.</span>
      </>
    ),
    body: 'Customers book on your own website, a shareable link or Playo. Your counter takes walk-ins and staff add the rest. Each source looks different on the grid, and a court can never be sold twice.',
    bullets: [
      'Overlaps are refused by the database, not by a check that can race',
      'A 15-minute hold while a customer finishes paying',
      'Weekday, weekend and peak rates applied for you',
    ],
    mock: (a) => <SlotGridMock active={a} />,
  },
  {
    id: 'payments',
    nav: 'Bookings',
    Icon: CreditCard,
    label: 'Payments',
    title: (
      <>
        Get paid, <span className="serif-i text-[1.08em] text-forest-2">not chased.</span>
      </>
    ),
    body: 'A UPI QR with the amount filled in, cash, cards through your own gateway, and bank transfer. Cash and UPI are confirmed with one tap on a staff member’s WhatsApp, so nobody can mark a payment received from the counter alone.',
    bullets: [
      'Razorpay, Cashfree, Stripe, PhonePe and PayU',
      'Money moves between your customer and your gateway, never through us',
      'GST invoices numbered per venue and emailed automatically',
    ],
    mock: (a) => <SettleMock active={a} />,
  },
  {
    id: 'courts',
    nav: 'Active Courts',
    Icon: Goal,
    label: 'Live courts',
    title: (
      <>
        See every court, <span className="serif-i text-[1.08em] text-forest-2">right now.</span>
      </>
    ),
    body: 'In play, ending soon, next up, free now. The whole floor at a glance, with dues on the card, so whoever is at the counter knows who still owes before they walk out.',
    bullets: ['A countdown to the end of every session', 'Check-in by booking ID or phone number', 'Kit going out with each booking'],
    mock: (a) => <LiveCourtsMock active={a} />,
  },
  {
    id: 'members',
    nav: 'Members',
    Icon: Users,
    label: 'Members',
    title: (
      <>
        Turn regulars into <span className="serif-i text-[1.08em] text-forest-2">members.</span>
      </>
    ),
    body: 'Starter, Pro and Elite plans for each sport, priced with GST and a court discount built in. Renew, freeze or revoke from one page, and nudge people on WhatsApp before a pass ends.',
    bullets: [
      'Plans per sport: a month, a season or a year',
      'Renewal reminders and “we miss you” templates',
      'Export your customer list to Excel or CSV',
    ],
    mock: () => <MembersMock />,
  },
  {
    id: 'academy',
    nav: 'Academy',
    Icon: GraduationCap,
    label: 'Academy',
    title: (
      <>
        Run the academy without <span className="serif-i text-[1.08em] text-forest-2">the register.</span>
      </>
    ),
    body: 'Batches, coaches, attendance and fees in one place. A “Needs attention” list tells the manager who to call: repeat absentees, low attendance, renewals due and students ready for the next level.',
    bullets: ['Attendance taken at the counter tablet', 'Fees pending and collected at a glance', 'Parent reports from the same data'],
    mock: () => <AcademyMock />,
  },
  {
    id: 'counter',
    nav: 'Add ons',
    Icon: ShoppingBag,
    label: 'Counter and kit',
    title: (
      <>
        A counter that <span className="serif-i text-[1.08em] text-forest-2">keeps up.</span>
      </>
    ),
    body: 'Rent boots and bibs by the hour with a deposit, sell balls and packs, apply a coupon and settle the tab, all from a tablet your staff already know how to use.',
    bullets: [
      'Rent, buy or pack from one shelf and one stock count',
      'Coupons with their own expiry and percentage',
      'Deposits tracked until the kit comes back',
    ],
    mock: () => <CounterMock />,
  },
]

export function Solution() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const desktop = useMedia(DESKTOP)

  // Which step is in the middle of the screen decides what the app window shows.
  // This is state, not motion, so it also runs for people who prefer reduced motion.
  useLayoutEffect(() => {
    const el = root.current
    if (!el || !desktop) return
    const steps = [...el.querySelectorAll<HTMLElement>('[data-step]')]
    // Position-based, so a fast scroll or an anchor jump cannot skip a step.
    const pick = () => {
      const line = window.innerHeight * 0.58
      let idx = 0
      steps.forEach((s, i) => {
        if (s.getBoundingClientRect().top < line) idx = i
      })
      setActive(idx)
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onUpdate: pick, onRefresh: pick })
    pick()
    return () => st.kill()
  }, [desktop])

  const stepNav = STEPS[active].nav

  return (
    <section ref={root} id="product" className="relative bg-page pb-10 pt-24 lg:pt-32">
      <div className="wrap">
        <Reveal>
          <Chapter n={3}>What Turfleo does</Chapter>
        </Reveal>
        <Reveal as="h2" className="mt-6 max-w-[16ch] text-[clamp(2.4rem,5.4vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
          One calm screen for <span className="serif-i text-[1.08em] text-forest-2">the whole business.</span>
        </Reveal>
        <Reveal as="p" delay={0.1} className="mt-6 max-w-[560px] text-[18px] leading-relaxed text-slate">
          Everything the 6 PM chaos ran on, now in one place and always in step. Scroll through a normal Saturday.
        </Reveal>
      </div>

      <div className="wrap mt-10 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,390px)_minmax(0,1fr)] lg:gap-14">
        <div>
          {STEPS.map((s, i) => (
            <article
              key={s.id}
              data-step
              className="flex flex-col justify-center py-10 lg:min-h-[86vh]"
            >
              <div
                className={`transition-opacity duration-500 ${
                  desktop ? (i === active ? 'opacity-100' : 'opacity-30') : 'opacity-100'
                }`}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-lime-ink">
                  <s.Icon size={15} /> {s.label}
                </span>
                <h3 className="mt-5 text-[clamp(2rem,3.4vw,2.9rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">{s.title}</h3>
                <p className="mt-4 text-[16.5px] leading-relaxed text-slate">{s.body}</p>
                <ul className="mt-6 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15px] leading-snug text-ink">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {!desktop && (
                <div className="mt-8">
                  <BrowserFrame compact active={s.nav}>
                    {s.mock(true)}
                  </BrowserFrame>
                </div>
              )}
            </article>
          ))}
        </div>

        {desktop && (
          <div className="relative">
            <div className="sticky top-[92px]">
              <BrowserFrame active={stepNav} className="h-[min(640px,calc(100vh-128px))]">
                {STEPS.map((s, i) => (
                  <div
                    key={s.id}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out-expo ${
                      i === active ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'
                    }`}
                  >
                    {s.mock(i === active)}
                  </div>
                ))}
              </BrowserFrame>
              <div className="mx-auto mt-4 flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-card ring-1 ring-black/[0.05]">
                {STEPS.map((s, i) => (
                  <span
                    key={s.id}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-7 bg-ink' : 'w-1.5 bg-black/15'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
