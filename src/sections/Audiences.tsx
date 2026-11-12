import { useState } from 'react'
import { Building2, Check } from 'lucide-react'
import { PitchArt, type PitchVariant } from '../components/art/PitchArt'
import { Chapter } from '../components/ui/Chapter'
import { Reveal } from '../components/ui/Reveal'
import { SportGlyph } from '../components/ui/SportGlyph'
import { LiveDot, Pill } from '../components/mocks/bits'

type Persona = {
  id: string
  name: string
  icon: React.ReactNode
  art: PitchVariant
  line: string
  points: string[]
  chips: [string, string][]
}

const PERSONAS: Persona[] = [
  {
    id: 'turf',
    name: 'Box cricket and football turfs',
    icon: <SportGlyph sport="football" size={22} />,
    art: 'football',
    line: 'Evenings and weekends carry the business, so those hours need to be priced, held and sold properly.',
    points: [
      'Weekday, weekend and peak rates from four prices per court',
      'A 15-minute hold, so two people never pay for one slot',
      'Boots and bibs rented by the hour, with a deposit',
    ],
    chips: [
      ['Court A · In play', 'live'],
      ['Peak rate applied', 'warn'],
    ],
  },
  {
    id: 'arena',
    name: 'Multi-sport arenas',
    icon: <SportGlyph sport="badminton" size={22} />,
    art: 'badminton',
    line: 'Badminton, pickleball, tennis and table tennis under one roof, each with its own courts and rules.',
    points: [
      'Per-court hours, rates, photos and facilities such as AC and lockers',
      'Membership plans priced for each sport',
      'Pause a court for maintenance without deleting it',
    ],
    chips: [
      ['4 sports · 16 courts', 'ok'],
      ['Court C · Free now', 'free'],
    ],
  },
  {
    id: 'academy',
    name: 'Sports academies',
    icon: <SportGlyph sport="cricket" size={22} />,
    art: 'cricket',
    line: 'The coaching business runs on attendance, fees and parents. It should not run on a register.',
    points: [
      'Batches, coaches and attendance taken at the counter',
      'Fees pending and collected, with a list of who to call',
      'Parent reports and promotion flags from the same data',
    ],
    chips: [
      ['18 of 20 present', 'ok'],
      ['3 repeat absentees', 'due'],
    ],
  },
  {
    id: 'chain',
    name: 'Chains and franchises',
    icon: <Building2 size={22} />,
    art: 'chain',
    line: 'More sites should mean more revenue, not more spreadsheets and more phone calls.',
    points: [
      'One login with a branch switcher, or all branches at once',
      'Roles for admin, reception and coaches',
      'Pro adds white-label branding, a custom domain and an API',
    ],
    chips: [
      ['3 branches', 'neutral'],
      ['All branches', 'ok'],
    ],
  },
]

export function Audiences() {
  const [i, setI] = useState(0)
  const p = PERSONAS[i]

  return (
    <section id="who" className="relative bg-page py-24 lg:py-32">
      <div className="wrap">
        <Reveal>
          <Chapter n={6}>Who it is for</Chapter>
        </Reveal>
        <Reveal as="h2" className="mt-6 max-w-[17ch] text-[clamp(2.3rem,5vw,4.3rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
          Built for the way <span className="serif-i text-[1.08em] text-forest-2">you run your ground.</span>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <div role="tablist" aria-label="Types of venue" className="flex flex-col gap-2.5">
            {PERSONAS.map((x, k) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={k === i}
                onClick={() => setI(k)}
                className={`group flex items-center gap-4 rounded-[22px] p-4 text-left transition-all duration-300 ${
                  k === i ? 'bg-ink text-white shadow-float' : 'bg-white ring-1 ring-line hover:ring-ink/30'
                }`}
              >
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl transition-colors ${
                    k === i ? 'bg-lime text-lime-ink' : 'bg-mint text-lime-ink'
                  }`}
                >
                  {x.icon}
                </span>
                <span className="font-display text-[19px] font-bold leading-tight tracking-[-0.03em]">{x.name}</span>
              </button>
            ))}
          </div>

          <div key={p.id} className="animate-[rise_0.6s_cubic-bezier(0.19,1,0.22,1)] overflow-hidden rounded-[30px] bg-white ring-1 ring-line">
            <div className="relative">
              <PitchArt variant={p.art} className="block w-full" />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {p.chips.map(([t, tone]) => (
                  <span key={t} className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-card">
                    {tone === 'live' && <LiveDot />}
                    <Pill tone={tone as 'live'} className="!bg-transparent !p-0 !text-[12px] !text-ink">
                      {t}
                    </Pill>
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[18px] leading-relaxed text-slate">{p.line}</p>
              <ul className="mt-5 space-y-3">
                {p.points.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-[15.5px] leading-snug">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
