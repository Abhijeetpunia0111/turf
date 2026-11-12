import { Landmark, Lock, Receipt, ShieldCheck, Timer, type LucideIcon } from 'lucide-react'
import { LogoMark } from '../components/ui/Logo'
import { Reveal } from '../components/ui/Reveal'

const FACTS: { Icon: LucideIcon; t: string; b: string }[] = [
  { Icon: ShieldCheck, t: 'Never double-sold', b: 'Overlaps are refused at the database, not by a check that can race.' },
  { Icon: Timer, t: 'Held while they pay', b: 'A 15-minute hold keeps a slot yours while a customer finishes checkout.' },
  { Icon: Receipt, t: 'GST done properly', b: '18% GST on every invoice, numbered per venue and emailed automatically.' },
  { Icon: Landmark, t: 'Your money, your gateway', b: 'Turfleo never holds the funds. Payments settle with your own provider.' },
  { Icon: Lock, t: 'Secrets stay secret', b: 'Gateway credentials are encrypted and never shown again after you save them.' },
]

type Chip = { n: string; c: string; live?: boolean }
const INNER: Chip[] = [
  { n: 'UPI', c: '#12301c' },
  { n: 'WhatsApp', c: '#25a35a' },
  { n: 'Razorpay', c: '#2f6df0' },
  { n: 'Cashfree', c: '#6a3fd1' },
  { n: 'Playo', c: '#5b66d9' },
]
const OUTER: Chip[] = [
  { n: 'Stripe', c: '#635bff' },
  { n: 'PhonePe', c: '#5f259f' },
  { n: 'PayU', c: '#e8863b' },
  { n: 'WordPress', c: '#21759b' },
  { n: 'Excel', c: '#1d7a46' },
  { n: 'Email', c: '#8a5a00' },
  { n: 'Elementor', c: '#c43c7a' },
]

/** The ring turns; each chip turns back at the same speed, so labels stay upright. */
function Ring({ chips, radius, reverse = false, dur = '60s' }: { chips: Chip[]; radius: number; reverse?: boolean; dur?: string }) {
  return (
    <div className={`absolute left-1/2 top-1/2 ${reverse ? 'animate-orbit-rev' : 'animate-orbit'}`} style={{ width: 0, height: 0, animationDuration: dur }}>
      {chips.map((c, i) => {
        const a = (360 / chips.length) * i
        return (
          <div key={c.n} className="absolute left-0 top-0" style={{ transform: `rotate(${a}deg) translateX(${radius}px) rotate(${-a}deg)` }}>
            <div className={`-translate-x-1/2 -translate-y-1/2 ${reverse ? 'animate-orbit' : 'animate-orbit-rev'}`} style={{ animationDuration: dur }}>
              <span className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-[13px] font-semibold shadow-card ring-1 ring-black/[0.06]">
                <span className="grid size-6 place-items-center rounded-full text-[11px] font-extrabold text-white" style={{ background: c.c }}>
                  {c.n[0]}
                </span>
                {c.n}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Trust() {
  return (
    <section className="relative bg-page py-24 lg:py-32">
      <div className="wrap">
        <Reveal as="h2" className="max-w-[18ch] text-[clamp(2.2rem,4.8vw,4.2rem)] font-extrabold leading-[1] tracking-[-0.05em]">
          Built so the numbers can <span className="serif-i text-[1.08em] text-forest-2">be trusted.</span>
        </Reveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {FACTS.map(({ Icon, t, b }, i) => (
            <Reveal key={t} delay={i * 0.06} className="rounded-[26px] bg-white p-5 ring-1 ring-line">
              <span className="grid size-11 place-items-center rounded-2xl bg-mint text-lime-ink">
                <Icon size={21} />
              </span>
              <h3 className="mt-5 font-display text-[18px] font-bold leading-tight tracking-[-0.03em]">{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate">{b}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal as="h2" className="max-w-[14ch] text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1] tracking-[-0.05em]">
              Works with the tools you <span className="serif-i text-[1.08em] text-forest-2">already use.</span>
            </Reveal>
            <Reveal as="p" delay={0.08} className="mt-5 max-w-[440px] text-[17px] leading-relaxed text-slate">
              Take payments through five gateways, list on Playo, put a booking button on WordPress or any site, and hand
              your accountant an Excel file.
            </Reveal>
            <Reveal as="p" delay={0.12} className="mt-4 max-w-[440px] text-[14px] text-muted">
              Hudle and District are coming soon.
            </Reveal>
          </div>

          {/* Small screens get a plain list: an orbit at phone size would shrink the labels past reading. */}
          <ul className="flex flex-wrap gap-2.5 sm:hidden">
            {[...INNER, ...OUTER].map((c) => (
              <li key={c.n} className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-[13.5px] font-semibold shadow-card ring-1 ring-black/[0.06]">
                <span className="grid size-6 place-items-center rounded-full text-[11px] font-extrabold text-white" style={{ background: c.c }}>
                  {c.n[0]}
                </span>
                {c.n}
              </li>
            ))}
          </ul>

          <Reveal scale={0.96} y={0} className="relative mx-auto hidden aspect-square w-full max-w-[600px] overflow-hidden sm:block">
            <div className="absolute inset-0 origin-center sm:scale-[0.78] lg:scale-100">
              <div aria-hidden className="absolute inset-[9%] rounded-full border border-dashed border-ink/15" />
              <div aria-hidden className="absolute inset-[24%] rounded-full border border-dashed border-ink/15" />
              <div aria-hidden className="absolute inset-[38%] rounded-full bg-[radial-gradient(circle,rgba(191,240,107,0.55),transparent_70%)]" />
              <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28px] bg-white shadow-float ring-1 ring-black/[0.06]">
                <LogoMark size={56} />
              </div>
              <Ring chips={INNER} radius={145} dur="60s" />
              <Ring chips={OUTER} radius={232} reverse dur="80s" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
