import { Logo } from '../components/ui/Logo'
import { scrollToTarget } from '../lib/smooth'

const COLS: { h: string; links: [string, string][] }[] = [
  {
    h: 'Product',
    links: [
      ['The problem', '#problem'],
      ['What you get', '#product'],
      ['A day on Turfleo', '#day'],
      ['Pricing', '#pricing'],
    ],
  },
  {
    h: 'Resources',
    links: [
      ['FAQ', '#faq'],
      ['Book a court widget', '#product'],
      ['Developer docs', '#'],
      ['Playo integration', '#'],
    ],
  },
  {
    h: 'Company',
    links: [
      ['Book a demo', '#demo'],
      ['Contact', '#demo'],
      ['Privacy', '#'],
      ['Terms', '#'],
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div className="wrap relative pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo tone="light" size={36} />
            <p className="mt-5 max-w-[360px] text-[15px] leading-relaxed text-white/55">
              Turf, court and academy management for India. Bookings, payments, members and the counter, in one calm
              screen.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.h}>
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-white/40">{c.h}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map(([l, href]) => (
                    <li key={l}>
                      <a
                        href={href}
                        onClick={(e) => {
                          if (href.startsWith('#') && href.length > 1) {
                            e.preventDefault()
                            scrollToTarget(href)
                          }
                        }}
                        className="text-[15px] text-white/75 transition-colors hover:text-lime"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-white/40">
          <span>© {new Date().getFullYear()} Turfleo. All rights reserved.</span>
          <span>Made for the people who keep the lights on at 11 PM.</span>
        </div>
      </div>

      {/* The oversized wordmark, cropped by the bottom edge. */}
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[clamp(6rem,26vw,25rem)] font-extrabold leading-[0.74] tracking-[-0.07em] text-transparent [-webkit-background-clip:text] [background-clip:text] bg-[linear-gradient(180deg,rgba(191,240,107,0.9),rgba(191,240,107,0.06)_82%)]"
        style={{ marginBottom: '-0.02em' }}
      >
        Turfleo
      </p>
    </footer>
  )
}
