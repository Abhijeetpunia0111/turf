import type { ReactNode } from 'react'
import { Banknote } from 'lucide-react'
import { Avatar } from '../components/ui/Avatar'
import { Reveal } from '../components/ui/Reveal'

function ClashViz() {
  return (
    <div className="relative h-full overflow-hidden">
      <p className="absolute left-0 top-0 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">Court 2 · 7 PM</p>
      <div className="absolute inset-x-0 top-8 h-9">
        <div className="absolute left-0 top-0 flex h-9 w-[60%] items-center rounded-lg bg-lime/85 px-3 text-[12px] font-semibold text-lime-ink">
          Falcons XI
        </div>
        <div className="absolute left-[34%] top-0 flex h-9 w-[60%] animate-clash items-center justify-end rounded-lg bg-flame px-3 text-[12px] font-semibold text-[#3a1608]">
          Team Rahul
        </div>
        <div className="absolute left-[34%] top-0 h-9 w-[26%] animate-blink rounded-lg bg-ember/80 mix-blend-screen" />
      </div>
    </div>
  )
}

function EmptyViz() {
  const hours = ['12', '1', '2', '3', '4', '5']
  const filled = new Set([0, 4])
  return (
    <div className="h-full">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">Weekday, 12 to 6 PM</p>
      <div className="mt-3 grid grid-cols-6 gap-1.5">
        {hours.map((h, i) => (
          <div
            key={h}
            className={`grid h-11 place-items-center rounded-lg text-[11px] font-medium ${
              filled.has(i) ? 'bg-lime/80 text-lime-ink' : 'border border-dashed border-white/20 text-white/35'
            } ${i === 2 ? 'animate-pop-fill !border-lime/70 !text-lime' : ''}`}
          >
            {filled.has(i) ? 'Booked' : `${h} PM`}
          </div>
        ))}
      </div>
    </div>
  )
}

function CashViz() {
  return (
    <div className="flex h-full items-center gap-4">
      <span className="grid size-16 shrink-0 animate-wobble place-items-center rounded-2xl bg-white/10 text-lime ring-1 ring-white/15">
        <Banknote size={32} />
      </span>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">End of day count</p>
        <p className="mt-1 font-display text-[32px] font-extrabold leading-none tracking-[-0.05em] text-ember">-₹800</p>
        <p className="mt-1 text-[12px] text-white/50">Advance? UPI? Nobody knows.</p>
      </div>
    </div>
  )
}

function DriftViz() {
  const names = ['Ananya Iyer', 'Dev Malhotra', 'Sana Qureshi', 'Kabir Joshi', 'Tara Nair', 'Yash Patil']
  return (
    <div className="h-full">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">Pass expired last week</p>
      <div className="mt-3 flex -space-x-2">
        {names.map((n, i) => (
          <span key={n} className="animate-fade-away" style={{ animationDelay: `${i * 0.45}s` }}>
            <Avatar name={n} size={42} ring />
          </span>
        ))}
      </div>
    </div>
  )
}

const TILES: { title: string; body: string; answer: string; viz: ReactNode }[] = [
  {
    title: 'Double-booked courts',
    body: 'Bookings live in a notebook, a phone and three chats. Two teams turn up for one court, and both blame you.',
    answer: 'Overlaps are refused at the database, so a court cannot be sold twice.',
    viz: <ClashViz />,
  },
  {
    title: 'Empty off-peak hours',
    body: 'Nobody sees the free 2 PM slot at 11 PM on a Friday. It sits empty and the rent keeps running.',
    answer: 'Free slots go live on your website, a shareable link and Playo.',
    viz: <EmptyViz />,
  },
  {
    title: 'Cash nobody can trace',
    body: 'An advance in one pocket, the balance in another, a UPI screenshot buried in a group chat.',
    answer: 'Every payment is recorded against its booking, and staff confirm cash and UPI with one tap.',
    viz: <CashViz />,
  },
  {
    title: 'Regulars who drift away',
    body: 'Nobody nudges a member when the pass ends, so they quietly start playing somewhere else.',
    answer: 'Renewal reminders and "we miss you" messages from your own WhatsApp number.',
    viz: <DriftViz />,
  },
]

export function Costs() {
  return (
    <section className="relative bg-dusk pb-28 pt-6 text-[#f6efe4] lg:pb-36">
      <div className="wrap">
        <Reveal as="h2" className="max-w-[18ch] text-[clamp(2.2rem,4.6vw,4rem)] font-extrabold leading-[1] tracking-[-0.05em]">
          Each of those is a booking, a rupee or a regular,{' '}
          <span className="serif-i text-[1.08em] text-flame">quietly lost.</span>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TILES.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08} className="flex flex-col rounded-[28px] bg-white/[0.04] p-5 ring-1 ring-white/10">
              <div className="h-[118px] rounded-2xl bg-black/25 p-4 ring-1 ring-white/5">{t.viz}</div>
              <h3 className="mt-6 font-display text-[22px] font-bold leading-tight tracking-[-0.03em]">{t.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-white/60">{t.body}</p>
              <p className="mt-auto border-t border-white/10 pt-4 text-[13.5px] leading-snug text-lime/90">
                <span className="mb-1 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/35">Turfleo&apos;s answer</span>
                {t.answer}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
