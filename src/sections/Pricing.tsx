import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Chapter } from '../components/ui/Chapter'
import { Reveal } from '../components/ui/Reveal'
import { inr } from '../lib/format'
import { scrollToTarget } from '../lib/smooth'

/**
 * Plan names, prices and features are the placeholders in the API's `billing/plans.py`
 * (the repo marks them "plausible for the Indian turf market", not a commercial decision).
 * The live site reads them from `GET /signup/plans`; this page mirrors them statically.
 */
const PLANS = [
  {
    name: 'Starter',
    tag: 'One turf finding its feet. Bookings, a counter, and the numbers.',
    monthly: 2499,
    yearly: 24990,
    features: [
      'Up to 4 courts',
      'Online and walk-in bookings',
      'POS counter with check-in',
      'GST invoices and receipts',
      'Daily revenue and occupancy reports',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    tag: 'A busy venue running memberships, an academy and a rental shop.',
    monthly: 4999,
    yearly: 49990,
    popular: true,
    features: [
      'Up to 12 courts',
      'Everything in Starter',
      'Memberships and packages',
      'Academy: batches, coaches, attendance',
      'Rental shop and inventory',
      'Playo listing, Hudle and District when live',
      'Priority email and phone support',
    ],
  },
  {
    name: 'Pro',
    tag: 'Multi-venue operators who need the whole platform and an API.',
    monthly: 9999,
    yearly: 99990,
    features: [
      'Unlimited courts',
      'Everything in Growth',
      'Events and tournaments',
      'Advertising inventory',
      'Booking gateway API for your own apps',
      'Custom domain and white-label branding',
      'Dedicated account manager',
    ],
  },
]

export function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="relative bg-mint py-24 lg:py-32">
      <div className="wrap">
        <div className="text-center">
          <Reveal>
            <Chapter>Pricing</Chapter>
          </Reveal>
          <Reveal as="h2" className="mx-auto mt-6 max-w-[16ch] text-[clamp(2.3rem,5vw,4.3rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
            Simple pricing, <span className="serif-i text-[1.08em] text-forest-2">per venue.</span>
          </Reveal>
          <Reveal as="p" delay={0.08} className="mx-auto mt-5 max-w-[520px] text-[17px] text-slate">
            Every plan includes setup and migration help. Pay yearly and get two months free.
          </Reveal>

          <Reveal delay={0.12} className="mt-8 inline-flex rounded-full bg-white p-1 shadow-card ring-1 ring-black/[0.05]">
            {([false, true] as const).map((y) => (
              <button
                key={String(y)}
                type="button"
                aria-pressed={yearly === y}
                onClick={() => setYearly(y)}
                className={`rounded-full px-6 py-2.5 font-display text-[14px] font-bold transition-colors duration-300 ${
                  yearly === y ? 'bg-ink text-white' : 'text-slate hover:text-ink'
                }`}
              >
                {y ? (
                  <>
                    Yearly <span className={yearly ? 'text-lime' : 'text-grass'}>· 2 months free</span>
                  </>
                ) : (
                  'Monthly'
                )}
              </button>
            ))}
          </Reveal>
        </div>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-3">
          {PLANS.map((p, i) => {
            const dark = !!p.popular
            return (
              <Reveal
                key={p.name}
                delay={i * 0.08}
                className={`relative flex flex-col rounded-[32px] p-7 sm:p-8 ${
                  dark ? 'bg-forest text-white shadow-float lg:-my-4 lg:py-12' : 'bg-white ring-1 ring-line'
                }`}
              >
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-[24px] font-extrabold tracking-[-0.04em]">{p.name}</h3>
                  {dark && <span className="rounded-full bg-lime px-3 py-1 text-[11.5px] font-bold text-lime-ink">Most popular</span>}
                </div>
                <p className={`mt-2.5 min-h-[48px] text-[14.5px] leading-snug ${dark ? 'text-white/65' : 'text-slate'}`}>{p.tag}</p>

                <p className="mt-6 font-display text-[clamp(2.6rem,4.4vw,3.6rem)] font-extrabold leading-none tracking-[-0.06em] tabular-nums">
                  {inr(yearly ? p.yearly / 12 : p.monthly)}
                  <span className={`ml-1 font-sans text-[15px] font-medium tracking-normal ${dark ? 'text-white/55' : 'text-muted'}`}>/month</span>
                </p>
                <p className={`mt-1.5 text-[13px] ${dark ? 'text-white/50' : 'text-muted'}`}>
                  {yearly ? `${inr(p.yearly)} billed yearly` : `or ${inr(p.yearly)} billed yearly`}
                </p>

                <ul className="mt-7 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-[14.5px] leading-snug ${dark ? 'text-white/85' : 'text-ink'}`}>
                      <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${dark ? 'bg-lime text-lime-ink' : 'bg-mint text-lime-ink'}`}>
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={dark ? 'lime' : 'dark'}
                  arrow
                  className="mt-8 w-full justify-between"
                  href="#demo"
                  onClick={() => scrollToTarget('#demo')}
                >
                  Start with {p.name}
                </Button>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-8 text-center text-[13px] text-slate/80">Prices exclude GST. Payments are processed by Razorpay.</p>
      </div>
    </section>
  )
}
