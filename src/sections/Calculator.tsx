import { useMemo, useState } from 'react'
import { Chapter } from '../components/ui/Chapter'
import { Reveal } from '../components/ui/Reveal'
import { inr } from '../lib/format'

function Slider({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit: string
  onChange: (n: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-[14px] font-medium text-white/75">
          {label}
        </label>
        <span className="font-mono text-[15px] font-medium text-lime">
          {unit === '₹' ? inr(value) : `${value}${unit}`}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-3 w-full"
        style={{ ['--pct' as string]: `${pct}%` }}
      />
    </div>
  )
}

function DayBar({ hours, filled, extra, label }: { hours: number; filled: number; extra: number; label: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[12px] text-white/55">
        <span>{label}</span>
        <span className="font-mono">
          {Math.round(filled)} booked, {Math.round(filled + extra) - Math.round(filled)} to fill
        </span>
      </div>
      <div className="flex gap-[3px]">
        {Array.from({ length: hours }, (_, i) => {
          const base = i < Math.floor(filled)
          const added = !base && i < Math.round(filled + extra)
          return (
            <span
              key={i}
              className={`h-9 flex-1 rounded-[5px] transition-all duration-500 ${
                base ? 'bg-white/80' : added ? 'bg-lime shadow-[0_0_16px_rgba(191,240,107,0.5)]' : 'border border-dashed border-white/20'
              }`}
              style={{ transitionDelay: `${i * 14}ms` }}
            />
          )
        })}
      </div>
    </div>
  )
}

export function Calculator() {
  const [courts, setCourts] = useState(4)
  const [hours, setHours] = useState(14)
  const [price, setPrice] = useState(1000)
  const [occ, setOcc] = useState(45)
  const [target, setTarget] = useState(65)

  const r = useMemo(() => {
    const t = Math.max(target, occ)
    const monthly = (o: number) => courts * hours * 30 * price * (o / 100)
    const now = monthly(occ)
    const goal = monthly(t)
    return { now, goal, gap: goal - now, perPoint: monthly(10) , t }
  }, [courts, hours, price, occ, target])

  return (
    <section id="math" className="relative overflow-hidden bg-forest py-24 text-white lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 size-[620px] rounded-full bg-[radial-gradient(circle,rgba(191,240,107,0.14),transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 size-[620px] rounded-full bg-[radial-gradient(circle,rgba(71,162,87,0.25),transparent_65%)]" />

      <div className="wrap relative">
        <Reveal>
          <Chapter n={5} tone="lime">
            The math
          </Chapter>
        </Reveal>
        <Reveal as="h2" className="mt-6 max-w-[17ch] text-[clamp(2.4rem,5.2vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
          What is an empty slot <span className="serif-i text-[1.08em] text-lime">really costing you?</span>
        </Reveal>
        <Reveal as="p" delay={0.08} className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-white/65">
          Put in your own numbers. Turfleo does not promise a lift. It gives you online booking, off-peak offers and
          WhatsApp nudges to chase the target you choose.
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="rounded-[30px] bg-white/[0.05] p-6 ring-1 ring-white/10 sm:p-8">
            <div className="grid gap-7">
              <Slider id="courts" label="Courts" value={courts} min={1} max={20} unit="" onChange={setCourts} />
              <Slider id="hours" label="Hours open per day" value={hours} min={6} max={18} unit=" h" onChange={setHours} />
              <Slider id="price" label="Average price per hour" value={price} min={400} max={3000} step={50} unit="₹" onChange={setPrice} />
              <Slider id="occ" label="Share of hours booked now" value={occ} min={10} max={90} unit="%" onChange={(n) => { setOcc(n); if (target < n) setTarget(n) }} />
              <Slider id="target" label="Where you want to be" value={Math.max(target, occ)} min={occ} max={100} unit="%" onChange={setTarget} />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col rounded-[30px] bg-white p-6 text-ink sm:p-8">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-grass">Left on the table each month</p>
            <p className="mt-2 font-display text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-none tracking-[-0.06em] tabular-nums">
              {inr(r.gap)}
            </p>
            <p className="mt-2 text-[15px] text-slate">
              That is {inr(r.gap * 12)} a year, between {occ}% and {r.t}% booked.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#f3f8ee] p-4">
                <p className="text-[12px] text-muted">Revenue now</p>
                <p className="mt-1 font-display text-[24px] font-extrabold tracking-[-0.04em] tabular-nums">{inr(r.now)}</p>
              </div>
              <div className="rounded-2xl bg-lime p-4 text-lime-ink">
                <p className="text-[12px] opacity-70">At {r.t}% booked</p>
                <p className="mt-1 font-display text-[24px] font-extrabold tracking-[-0.04em] tabular-nums">{inr(r.goal)}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-forest p-4">
              <DayBar hours={hours} filled={(hours * occ) / 100} extra={(hours * (r.t - occ)) / 100} label="One court, one day" />
              <div className="mt-3 flex items-center gap-4 text-[11.5px] text-white/60">
                <span className="flex items-center gap-1.5">
                  <i className="size-2.5 rounded-sm bg-white/80" /> Booked today
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="size-2.5 rounded-sm bg-lime" /> To fill
                </span>
              </div>
            </div>

            <p className="mt-5 text-[13px] leading-relaxed text-muted">
              Every 10 points of occupancy on your courts is worth {inr(r.perPoint)} a month. Figures are before GST and
              assume {courts} courts for {hours} hours a day over 30 days.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
