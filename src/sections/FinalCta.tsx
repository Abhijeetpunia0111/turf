import { useState, type FormEvent } from 'react'
import { BadgeCheck, Loader2 } from 'lucide-react'
import { PitchArt } from '../components/art/PitchArt'
import { Chapter } from '../components/ui/Chapter'
import { Reveal } from '../components/ui/Reveal'
import { Words } from '../components/ui/Words'

type Lead = { name: string; phone: string; venue: string; courts: string }

/** Wire this to your CRM, a sheet or an email service. Nothing leaves the browser until you do. */
async function sendLead(lead: Lead) {
  await new Promise((r) => setTimeout(r, 700))
  void lead
}

const FIELD =
  'w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-[15px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-lime focus:bg-white/10'

export function FinalCta() {
  const [lead, setLead] = useState<Lead>({ name: '', phone: '', venue: '', courts: '4 to 8' })
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  const set = (k: keyof Lead) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setLead((l) => ({ ...l, [k]: e.target.value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const digits = lead.phone.replace(/\D/g, '').slice(-10)
    if (!lead.name.trim() || !lead.venue.trim()) return setError('Please add your name and your venue.')
    if (!/^[6-9]\d{9}$/.test(digits)) return setError('Enter a 10-digit Indian mobile number.')
    setError('')
    setState('sending')
    await sendLead({ ...lead, phone: `+91${digits}` })
    setState('sent')
  }

  return (
    <section id="demo" className="relative isolate overflow-hidden bg-night py-24 text-white lg:py-32">
      {/* The floodlit turf: a night pitch laid flat, with beams from the masts. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[78%] overflow-hidden [perspective:1100px]">
        <div className="absolute inset-x-[-25%] bottom-[-18%] origin-bottom opacity-70 [transform:rotateX(62deg)]">
          <PitchArt variant="football" night className="block w-full" />
        </div>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#07140c_0%,#07140c_30%,rgba(7,20,12,0.55)_70%,rgba(7,20,12,0.25)_100%)]" />
      {[
        'left-[2%] [transform:rotate(-26deg)]',
        'left-[26%] [transform:rotate(-12deg)] [animation-delay:-0.7s] max-lg:hidden',
        'right-[26%] [transform:rotate(12deg)] [animation-delay:-1.1s] max-lg:hidden',
        'right-[2%] [transform:rotate(26deg)] [animation-delay:-0.3s]',
      ].map((c) => (
        <div
          key={c}
          aria-hidden
          className={`absolute top-[-12%] -z-10 h-[88%] w-[180px] origin-top animate-blink bg-[linear-gradient(180deg,rgba(255,248,200,0.3),rgba(255,248,200,0.0))] blur-[26px] [animation-duration:5s] max-lg:opacity-60 ${c}`}
        />
      ))}

      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-night to-transparent" />

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <Chapter tone="lime">Your turn</Chapter>
          </Reveal>
          <h2 className="mt-6 max-w-[11ch] text-[clamp(3rem,7.2vw,6.4rem)] font-extrabold leading-[0.93] tracking-[-0.055em]">
            <Words>Your next slot is</Words>{' '}
            <span className="serif-i text-[1.08em] leading-[0.9] text-lime">
              <Words>waiting.</Words>
            </span>
          </h2>
          <Reveal as="p" delay={0.1} className="mt-7 max-w-[470px] text-[18px] leading-relaxed text-white/65">
            Book a short demo and we will walk through your own courts, rates and counter, so you can see your Saturday
            on Turfleo before you commit to anything.
          </Reveal>
          <Reveal as="ul" delay={0.16} className="mt-8 space-y-3 text-[15px] text-white/80">
            {['A walkthrough built around your sports and your prices', 'Help moving over your existing bookings and members', 'No card needed to look around. Cancel any time.'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid size-5 place-items-center rounded-full bg-lime text-lime-ink">
                  <BadgeCheck size={13} />
                </span>
                {t}
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="rounded-[32px] bg-white/[0.07] p-6 ring-1 ring-white/15 backdrop-blur-xl sm:p-8">
          {state === 'sent' ? (
            <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-full bg-lime text-lime-ink">
                <BadgeCheck size={32} />
              </span>
              <h3 className="mt-6 font-display text-[28px] font-extrabold tracking-[-0.04em]">Thanks, {lead.name.split(' ')[0]}.</h3>
              <p className="mt-3 max-w-[320px] text-[15px] leading-relaxed text-white/65">
                We have your details for {lead.venue}. We will message you on WhatsApp to pick a time.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4">
              <div>
                <p className="font-display text-[24px] font-extrabold tracking-[-0.04em]">Book a demo</p>
                <p className="mt-1 text-[14px] text-white/55">Four quick details. We will take it from there.</p>
              </div>
              <div>
                <label htmlFor="lead-name" className="mb-1.5 block text-[13px] font-medium text-white/70">
                  Your name
                </label>
                <input id="lead-name" className={FIELD} placeholder="Meera Shah" autoComplete="name" value={lead.name} onChange={set('name')} />
              </div>
              <div>
                <label htmlFor="lead-phone" className="mb-1.5 block text-[13px] font-medium text-white/70">
                  WhatsApp number
                </label>
                <input id="lead-phone" className={FIELD} placeholder="98765 43210" inputMode="tel" autoComplete="tel" value={lead.phone} onChange={set('phone')} />
              </div>
              <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
                <div>
                  <label htmlFor="lead-venue" className="mb-1.5 block text-[13px] font-medium text-white/70">
                    Venue name
                  </label>
                  <input id="lead-venue" className={FIELD} placeholder="Greenfield Sports Arena" autoComplete="organization" value={lead.venue} onChange={set('venue')} />
                </div>
                <div>
                  <label htmlFor="lead-courts" className="mb-1.5 block text-[13px] font-medium text-white/70">
                    Courts
                  </label>
                  <select id="lead-courts" className={`${FIELD} appearance-none`} value={lead.courts} onChange={set('courts')}>
                    {['1 to 3', '4 to 8', '9 to 12', 'More than 12'].map((o) => (
                      <option key={o} value={o} className="text-ink">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {error && (
                <p role="alert" className="rounded-xl bg-ember/15 px-4 py-2.5 text-[13.5px] text-[#ffb39f]">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={state === 'sending'}
                className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-lime py-4 font-display text-[16px] font-bold text-lime-ink transition-all hover:bg-[#cdf584] active:scale-[0.99] disabled:opacity-70"
              >
                {state === 'sending' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending
                  </>
                ) : (
                  'Book my demo'
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
