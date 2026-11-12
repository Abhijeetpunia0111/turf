import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'

const QA: [string, string][] = [
  [
    'Can my customers book from my own website?',
    'Yes. Book a court (Leo Cal) is one script tag, or a WordPress plugin with an Elementor widget. A visitor picks a sport, court, day and time, pays through your own Razorpay account, and the booking lands on your dashboard already paid. You can also share the same booking page as a link on Instagram or WhatsApp.',
  ],
  [
    'Does the money pass through Turfleo?',
    'No. Turfleo holds your gateway credentials, encrypted, and calls the gateway you already have an account with. The money moves between your customer and your provider.',
  ],
  [
    'Which payment gateways can I connect?',
    'Razorpay, Cashfree, Stripe, PhonePe and PayU. Razorpay, Cashfree and Stripe credentials are verified with a real read-only call. PhonePe and PayU are checked for format only, because those providers offer no way to test a key without starting a payment. Today the Book a court widget takes payment through Razorpay.',
  ],
  [
    'How are cash and UPI recorded at the counter?',
    'The tablet asks a staff member to confirm on WhatsApp, and they tap Yes, received or No. Nothing typed or tapped on the shared tablet alone can record a payment, so the counter cannot mark its own cash as received.',
  ],
  [
    'Do you work with Playo, Hudle and District?',
    'Playo is live. Hudle and District are coming soon and are waiting on their specifications. Every channel shares one inventory, so a slot sold on Playo is gone from your counter in the same instant.',
  ],
  [
    'Can I run more than one branch?',
    'Yes. An admin can switch between branches or look at all of them at once, and courts, bookings and the dashboard’s booking figures follow the choice. Pro adds white-label branding, a custom domain and an API.',
  ],
  [
    'How long can a booking be?',
    'On the dashboard, up to six hours. On the counter tablet and the website widget, up to three. Day-long hire is taken by phone or at the desk. The shortest booking and the step between lengths are yours to set.',
  ],
  [
    'Do you generate GST invoices?',
    'Yes. Invoices are numbered per venue, carry GST at 18% and are emailed automatically. You can export them, and your customer list, to Excel or CSV for your accountant.',
  ],
  [
    'I run a turf, not an academy. Do I pay for what I do not use?',
    'Switch on only what you run. Check-in, walk-in booking, student attendance, membership and the rental shop are chosen when you sign up and can be changed later in Settings.',
  ],
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-page py-24 lg:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal as="h2" className="max-w-[12ch] text-[clamp(2.3rem,5vw,4.2rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
            Questions turf owners <span className="serif-i text-[1.08em] text-forest-2">ask first.</span>
          </Reveal>
          <Reveal as="p" delay={0.08} className="mt-5 max-w-[360px] text-[16px] leading-relaxed text-slate">
            Something missing? Book a demo and we will walk through your own setup.
          </Reveal>
        </div>

        <Reveal className="divide-y divide-line rounded-[30px] bg-white px-6 ring-1 ring-line sm:px-8">
          {QA.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <div key={q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-[clamp(1.05rem,1.5vw,1.2rem)] font-bold leading-snug tracking-[-0.025em]">{q}</span>
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-out-expo ${
                        isOpen ? 'rotate-45 bg-ink text-white' : 'bg-mint text-lime-ink'
                      }`}
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-6 pr-12 text-[15.5px] leading-relaxed text-slate">{a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
