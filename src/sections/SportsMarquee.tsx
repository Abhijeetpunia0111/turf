import { SPORT_NAMES, SportGlyph, type SportKey } from '../components/ui/SportGlyph'

const ROW: SportKey[] = [
  'football',
  'cricket',
  'pickleball',
  'badminton',
  'tennis',
  'table-tennis',
  'basketball',
  'volleyball',
  'hockey',
  'swimming',
]

export function SportsMarquee() {
  const items = [...ROW, ...ROW]
  return (
    <section aria-label="Sports Turfleo supports" className="relative bg-page py-12">
      <p className="wrap text-center font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
        One platform for every game on your grounds
      </p>
      <div className="mt-7 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-3.5 hover:[animation-play-state:paused]">
          {items.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="inline-flex items-center gap-3 rounded-full bg-white py-2.5 pl-2.5 pr-6 font-display text-[16px] font-semibold tracking-[-0.02em] text-ink ring-1 ring-line"
            >
              <span className="grid size-9 place-items-center rounded-full bg-mint text-lime-ink">
                <SportGlyph sport={s} size={19} />
              </span>
              {SPORT_NAMES[s]}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
