import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BellRing, MessageCircle, ShieldCheck } from 'lucide-react'
import { Avatar } from '../components/ui/Avatar'
import { Chapter } from '../components/ui/Chapter'
import { Reveal } from '../components/ui/Reveal'
import { Pill } from '../components/mocks/bits'
import { useInView } from '../lib/useInView'

function Tile({ className = '', children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} className={`relative overflow-hidden rounded-[30px] p-6 sm:p-7 ${className}`}>
      {children}
    </Reveal>
  )
}

function TileHead({
  kicker,
  title,
  body,
  tone = 'light',
}: {
  kicker: string
  title: string
  body: string
  tone?: 'light' | 'dark' | 'lime'
}) {
  const k = { light: 'text-grass', dark: 'text-lime/80', lime: 'text-lime-ink/70' }[tone]
  const b = { light: 'text-slate', dark: 'text-white/65', lime: 'text-lime-ink/80' }[tone]
  return (
    <div>
      <p className={`font-mono text-[11.5px] uppercase tracking-[0.14em] ${k}`}>{kicker}</p>
      <h3 className="mt-2.5 font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-bold leading-[1.08] tracking-[-0.04em]">{title}</h3>
      <p className={`mt-2.5 max-w-[46ch] text-[15px] leading-relaxed ${b}`}>{body}</p>
    </div>
  )
}

function Switch({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`relative h-[22px] w-[38px] shrink-0 rounded-full transition-colors duration-300 ${on ? 'bg-ink' : 'bg-black/15'}`}
    >
      <span
        className={`absolute top-[3px] size-4 rounded-full bg-white transition-all duration-300 ease-out-expo ${on ? 'left-[19px]' : 'left-[3px]'}`}
      />
    </button>
  )
}

/* ------------------------------------------------------------------ Leo Cal */

const SNIPPET = `<script src="https://cal.turfleo.com/v1/embed.js"
  data-key="gxp_••••••••" async></script>

<div data-leo-cal-inline></div>
<button data-leo-cal>Book a court</button>`

function highlight(s: string) {
  return s.split(/(<\/?[a-z]+|"[^"]*"|data-[a-z-]+|\/?>)/g).map((t, i) => {
    let c = 'rgba(255,255,255,0.7)'
    if (/^<\/?[a-z]+$/.test(t) || /^\/?>$/.test(t)) c = '#9be564'
    else if (t.startsWith('"')) c = '#ffd166'
    else if (t.startsWith('data-')) c = '#8fd3ff'
    return (
      <span key={i} style={{ color: c }}>
        {t}
      </span>
    )
  })
}

function LeoCalTile({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!seen) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(SNIPPET.length)
      return
    }
    const id = window.setInterval(() => setN((v) => (v >= SNIPPET.length ? v : v + 2)), 24)
    return () => window.clearInterval(id)
  }, [seen])

  return (
    <div ref={ref} className="grid h-full gap-7 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="flex min-w-0 flex-col">
        <TileHead
          tone="dark"
          kicker="Book a court widget · Leo Cal"
          title="A booking button for your own website."
          body="Paste one line, or use the WordPress plugin and Elementor widget. Customers pick a free slot and pay your own Razorpay. The booking arrives on your dashboard already paid."
        />
        <pre className="mt-6 overflow-x-auto rounded-2xl bg-black/35 p-4 font-mono text-[12px] leading-[1.7] ring-1 ring-white/10 no-scrollbar">
          <code>
            {highlight(SNIPPET.slice(0, n))}
            <span className="ml-px inline-block h-[1.1em] w-[7px] translate-y-[3px] animate-blink bg-lime" />
          </code>
        </pre>
        <p className="mt-4 text-[12.5px] text-white/50">Works on plain HTML, WordPress, React, Wix, Webflow. Customers pay you directly.</p>
      </div>

      <div className="self-center rounded-[24px] bg-white p-4 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between">
          <p className="font-display text-[15px] font-bold tracking-[-0.02em]">Book a court</p>
          <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[10px] font-semibold text-slate">Greenfield Arena</span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {['Football', 'Pickleball', 'Badminton'].map((s, i) => (
            <span key={s} className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${i === 1 ? 'bg-ink text-white' : 'border border-black/10 text-slate'}`}>
              {s}
            </span>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {['Fri', 'Sat', 'Sun', 'Mon'].map((d, i) => (
            <div key={d} className={`rounded-lg py-1.5 text-center text-[11px] font-semibold ${i === 1 ? 'text-lime-ink' : 'border border-black/10 text-slate'}`} style={i === 1 ? { background: accent } : undefined}>
              {d} {10 + i}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {['6 PM', '7 PM', '8 PM'].map((t, i) => (
            <div key={t} className={`rounded-lg py-2 text-center text-[11.5px] font-medium ${i === 1 ? 'bg-ink text-white' : 'border border-black/10'}`}>
              {t}
              <span className="block text-[9.5px] opacity-60">{i === 1 ? '₹1,180' : i === 0 ? 'Taken' : '₹1,180'}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl py-2.5 text-center text-[12.5px] font-bold text-lime-ink transition-colors duration-500" style={{ background: accent }}>
          Confirm &amp; Pay ₹1,180
        </div>
        <p className="mt-2 text-center text-[10px] text-muted">Prices include GST. Powered by Turfleo.</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ Notifications */

const NOTES = [
  { k: 'Booking confirmation', d: 'The details, as soon as it is made.', ch: ['WhatsApp', 'Email'] },
  { k: 'Booking cancelled', d: 'And what happens to any money paid.', ch: ['WhatsApp', 'Email'] },
  { k: 'Refund done', d: 'When a refund has gone back.', ch: ['WhatsApp', 'Email'] },
  { k: 'Payment receipt', d: 'When a payment is recorded.', ch: ['Email'] },
  { k: 'Invoice', d: 'When an invoice is raised.', ch: ['Email'] },
]

function NotificationsTile() {
  const [on, setOn] = useState<Record<string, boolean>>(() => {
    const o: Record<string, boolean> = {}
    NOTES.forEach((n) => n.ch.forEach((c) => (o[`${n.k}-${c}`] = c === 'WhatsApp' || n.k === 'Invoice')))
    return o
  })
  return (
    <div className="flex h-full flex-col">
      <TileHead
        kicker="Notifications"
        title="Customers hear from you, without you typing."
        body="Pick the channel for each message. WhatsApp messages come from Turfleo’s number and name your venue."
      />
      <div className="mt-5 flex flex-1 flex-col rounded-2xl bg-[#f7faf3] ring-1 ring-black/[0.05]">
        {NOTES.map((n) => (
          <div key={n.k} className="flex items-center justify-between gap-3 border-b border-dashed border-black/10 px-4 py-2.5 last:border-b-0">
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-tight">{n.k}</p>
              <p className="truncate text-[11px] text-muted">{n.d}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {n.ch.map((c) => (
                <label key={c} className="flex items-center gap-1.5 text-[11px] text-slate">
                  <Switch on={on[`${n.k}-${c}`]} onChange={() => setOn((s) => ({ ...s, [`${n.k}-${c}`]: !s[`${n.k}-${c}`] }))} label={`${n.k} by ${c}`} />
                  <span className="hidden sm:inline">{c}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ Heatmap */

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOURS = Array.from({ length: 14 }, (_, i) => i + 9)

function intensity(d: number, h: number) {
  const weekend = d >= 5
  let v = weekend ? 0.42 : 0.12
  if (h >= 17 && h <= 21) v += weekend ? 0.5 : 0.62
  else if (h >= 6 && h <= 10) v += weekend ? 0.34 : 0.22
  else if (weekend && h >= 11 && h <= 16) v += 0.22
  const noise = ((d * 37 + h * 11) % 9) / 70
  return Math.min(1, v + noise)
}

function HeatmapTile() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref)
  return (
    <div ref={ref} className="flex h-full flex-col">
      <TileHead
        kicker="Numbers you can act on"
        title="Which hours pay, and which courts pay for themselves."
        body="Occupancy by hour, revenue by sport and by court. The quiet Tuesday afternoon is no longer a feeling, it is a cell."
      />
      <div className="mt-5 flex-1 rounded-2xl bg-[#f7faf3] p-4 ring-1 ring-black/[0.05]">
        <div className="flex items-center justify-between text-[11px] text-muted">
          <span className="font-semibold text-ink">Occupancy by hour · last 8 weeks</span>
          <span className="flex items-center gap-1.5">
            Low
            <i className="h-2 w-16 rounded-full bg-gradient-to-r from-[#e8f3dd] to-forest" />
            High
          </span>
        </div>
        <div className="mt-3 grid gap-1" style={{ gridTemplateColumns: `34px repeat(${HOURS.length}, minmax(0, 1fr))` }}>
          <span />
          {HOURS.map((h) => (
            <span key={h} className="text-center font-mono text-[9px] text-muted">
              {h > 12 ? h - 12 : h}
            </span>
          ))}
          {DAYS.map((d, di) => (
            <div key={d} className="contents">
              <span className="self-center text-[10.5px] font-medium text-slate">{d}</span>
              {HOURS.map((h, hi) => {
                const v = intensity(di, h)
                const peak = di === 5 && h >= 19 && h <= 20
                return (
                  <span
                    key={h}
                    className={`aspect-square rounded-[5px] transition-all duration-700 ${peak ? 'ring-2 ring-lime ring-offset-1 ring-offset-[#f7faf3]' : ''}`}
                    style={{
                      background: `color-mix(in srgb, #12301c ${Math.round(v * 100)}%, #e8f3dd)`,
                      opacity: seen ? 1 : 0,
                      transform: seen ? 'scale(1)' : 'scale(0.4)',
                      transitionDelay: `${(di * HOURS.length + hi) * 9}ms`,
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill tone="ok">Peak · Sat 7 to 9 PM</Pill>
          <Pill tone="warn">Quiet · Tue 2 to 4 PM</Pill>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- Platforms */

const PLATFORMS: [string, string, 'live' | 'soon', string][] = [
  ['Your website', 'Book a court widget', 'live', '#12301c'],
  ['Playo', 'Venue integration', 'live', '#5b66d9'],
  ['Hudle', 'Waiting on their spec', 'soon', '#e8863b'],
  ['District', 'Waiting on their spec', 'soon', '#c43c7a'],
]

function PlatformsTile() {
  return (
    <div className="flex h-full flex-col">
      <TileHead
        tone="lime"
        kicker="One inventory"
        title="Sell everywhere. Never twice."
        body="A slot sold on Playo disappears from your counter in the same instant."
      />
      <div className="mt-5 flex flex-col gap-2">
        {PLATFORMS.map(([n, d, st, c]) => (
          <div key={n} className="flex items-center gap-3 rounded-2xl bg-white/70 p-2.5 ring-1 ring-black/[0.06]">
            <span className="grid size-9 place-items-center rounded-xl font-display text-[15px] font-extrabold text-white" style={{ background: c }}>
              {n[0]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold leading-tight">{n}</p>
              <p className="truncate text-[11px] text-slate">{d}</p>
            </div>
            <Pill tone={st === 'live' ? 'ok' : 'neutral'}>{st === 'live' ? 'Live' : 'Coming soon'}</Pill>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- Branches */

function BranchesTile() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref)
  const [branch, setBranch] = useState(0)
  const data = [
    { n: 'All branches', rev: [78, 54, 38], total: '₹4.8L' },
    { n: 'Koramangala', rev: [100, 0, 0], total: '₹2.2L' },
    { n: 'Indiranagar', rev: [0, 100, 0], total: '₹1.5L' },
  ]
  const names = ['Koramangala', 'Indiranagar', 'HSR Layout']
  const cur = data[branch]
  return (
    <div ref={ref} className="flex h-full flex-col">
      <TileHead
        kicker="Multi-branch"
        title="One login, every site."
        body="Filter courts, bookings and the dashboard by branch, or look at them all at once."
      />
      <div className="mt-5 flex flex-wrap gap-1.5">
        {data.map((b, i) => (
          <button
            key={b.n}
            type="button"
            onClick={() => setBranch(i)}
            className={`rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-colors ${i === branch ? 'bg-ink text-white' : 'bg-black/[0.06] text-slate hover:bg-black/10'}`}
          >
            {b.n}
          </button>
        ))}
      </div>
      <div className="mt-4 flex-1 rounded-2xl bg-white p-4 ring-1 ring-black/[0.06]">
        <p className="text-[11px] text-muted">Revenue this month</p>
        <p className="font-display text-[28px] font-extrabold leading-none tracking-[-0.05em]">{cur.total}</p>
        <div className="mt-4 space-y-2.5">
          {names.map((n, i) => (
            <div key={n} className="flex items-center gap-3 text-[11.5px]">
              <span className="w-[82px] shrink-0 truncate text-slate">{n}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                <span
                  className="block h-full rounded-full bg-grass transition-[width] duration-1000 ease-out-expo"
                  style={{ width: seen ? `${cur.rev[i]}%` : '0%' }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- Campaigns */

const TEMPLATES = [
  { id: 'Membership offer', body: (n: string) => `Hi ${n}, Greenfield Sports Arena has membership plans with court discounts and priority booking. Reply here and we'll find the right one for you.` },
  { id: 'We miss you', body: (n: string) => `Hi ${n}, it's been a while since your last game at Greenfield Sports Arena. Courts are open. Book a slot this week and we'll see you on court!` },
  { id: 'Renewal reminder', body: (n: string) => `Hi ${n}, your Pickleball Pro membership at Greenfield Sports Arena runs until 16 Oct. Renew before then to keep your benefits without a break.` },
]

function CampaignsTile() {
  const [i, setI] = useState(1)
  return (
    <div className="flex h-full flex-col">
      <TileHead
        kicker="WhatsApp campaigns"
        title="Bring people back from your own number."
        body="Pick a template, change the words, send. It opens the chat with the text typed, and a person presses send."
      />
      <div className="mt-5 flex flex-wrap gap-1.5">
        {TEMPLATES.map((t, k) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setI(k)}
            className={`rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-colors ${k === i ? 'bg-ink text-white' : 'bg-white/80 text-slate ring-1 ring-black/[0.07] hover:bg-white'}`}
          >
            {t.id}
          </button>
        ))}
      </div>
      <div className="mt-4 flex-1 rounded-2xl bg-[#e3efd8] p-3.5">
        <div key={i} className="animate-[rise_0.5s_ease-out] rounded-2xl rounded-tr-sm bg-[#dcf8c6] p-3 shadow-sm">
          <p className="text-[12.5px] leading-snug text-[#1c2b1c]">{TEMPLATES[i].body('Rohan')}</p>
          <p className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-[#5d7a5d]">
            <MessageCircle size={11} /> From your venue’s number
          </p>
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#128c7e] px-3.5 py-1.5 text-[11.5px] font-bold text-white">
          <BellRing size={12} /> Send on WhatsApp
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------- Brand */

const ACCENTS = ['#bff06b', '#ffb454', '#8fd3ff', '#f7a3c0']

function BrandTile({ accent, setAccent }: { accent: string; setAccent: (c: string) => void }) {
  return (
    <div className="flex h-full flex-col">
      <TileHead
        kicker="Your brand"
        title="Invoices and bookings that look like you."
        body="Your logo and three brand colours on invoices, receipts and the booking widget. Try one."
      />
      <div className="mt-5 flex items-center gap-2.5">
        {ACCENTS.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={`Use accent ${c}`}
            aria-pressed={accent === c}
            onClick={() => setAccent(c)}
            className={`size-9 rounded-full transition-all ${accent === c ? 'scale-110 ring-2 ring-ink ring-offset-2' : 'ring-1 ring-black/10 hover:scale-105'}`}
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="mt-4 flex-1 rounded-2xl bg-white p-4 ring-1 ring-black/[0.06]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg font-display text-[13px] font-extrabold text-lime-ink transition-colors duration-500" style={{ background: accent }}>
              G
            </span>
            <div>
              <p className="text-[12px] font-bold leading-tight">Greenfield Sports Arena</p>
              <p className="text-[10px] text-muted">GST invoice · INV-0042</p>
            </div>
          </div>
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-lime-ink transition-colors duration-500" style={{ background: accent }}>
            Paid
          </span>
        </div>
        <div className="mt-3 space-y-1.5 text-[11.5px] text-slate">
          <div className="flex justify-between">
            <span>Court B · Pickleball · 1 hr</span>
            <span>₹800.00</span>
          </div>
          <div className="flex justify-between">
            <span>GST 18%</span>
            <span>₹144.00</span>
          </div>
          <div className="flex justify-between border-t border-dashed border-black/15 pt-1.5 font-semibold text-ink">
            <span>Total</span>
            <span>₹944.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------------- Team */

function TeamTile() {
  const people = [
    { n: 'Meera Shah', r: 'Admin', d: 'Everything, including gateway keys' },
    { n: 'Rohit Verma', r: 'Reception', d: 'Counter, bookings, check-in' },
    { n: 'Coach Vikas', r: 'Coach', d: 'Academy and attendance' },
  ]
  return (
    <div className="flex h-full flex-col">
      <TileHead
        tone="dark"
        kicker="Team and roles"
        title="Staff see what they need and nothing more."
        body="Reception cannot see gateway credentials. Secrets are encrypted and are never shown again after you save them."
      />
      <div className="mt-5 flex flex-col gap-2">
        {people.map((p) => (
          <div key={p.n} className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-2.5 ring-1 ring-white/10">
            <Avatar name={p.n} size={34} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold leading-tight">{p.n}</p>
              <p className="truncate text-[11px] text-white/55">{p.d}</p>
            </div>
            <span className="rounded-full bg-lime px-2.5 py-0.5 text-[10.5px] font-bold text-lime-ink">{p.r}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 text-[12px] text-white/55">
        <ShieldCheck size={14} className="text-lime" /> Payments go straight to your gateway.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------- Section */

export function Bento() {
  const [accent, setAccent] = useState(ACCENTS[0])
  return (
    <section id="bento" className="relative bg-page py-24 lg:py-32">
      <div className="wrap">
        <Reveal>
          <Chapter>And everything around the booking</Chapter>
        </Reveal>
        <Reveal as="h2" className="mt-6 max-w-[17ch] text-[clamp(2.2rem,4.8vw,4.2rem)] font-extrabold leading-[1] tracking-[-0.05em]">
          The details that make a venue <span className="serif-i text-[1.08em] text-forest-2">run itself.</span>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Tile className="bg-forest text-white lg:col-span-7"><LeoCalTile accent={accent} /></Tile>
          <Tile delay={0.06} className="bg-white ring-1 ring-line lg:col-span-5"><NotificationsTile /></Tile>

          <Tile className="bg-white ring-1 ring-line lg:col-span-5"><HeatmapTile /></Tile>
          <Tile delay={0.06} className="bg-lime text-lime-ink lg:col-span-3"><PlatformsTile /></Tile>
          <Tile delay={0.12} className="bg-white ring-1 ring-line lg:col-span-4"><BranchesTile /></Tile>

          <Tile className="bg-mint lg:col-span-4"><CampaignsTile /></Tile>
          <Tile delay={0.06} className="bg-white ring-1 ring-line lg:col-span-4"><BrandTile accent={accent} setAccent={setAccent} /></Tile>
          <Tile delay={0.12} className="bg-forest-2 text-white lg:col-span-4"><TeamTile /></Tile>
        </div>
      </div>
    </section>
  )
}
