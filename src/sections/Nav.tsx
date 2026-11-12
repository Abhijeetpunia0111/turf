import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '../components/ui/Logo'
import { scrollToTarget } from '../lib/smooth'

const LINKS: [string, string][] = [
  ['The problem', '#problem'],
  ['What you get', '#product'],
  ['A day on Turfleo', '#day'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
]

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 500 && y > last + 4)
      if (y < last - 4) setHidden(false)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-3 z-[70] flex justify-center px-3 transition-transform duration-500 ease-out-expo ${
        hidden && !open ? '-translate-y-[140%]' : 'translate-y-0'
      }`}
    >
      <div className="relative w-full max-w-[1120px]">
        <nav className="flex items-center justify-between rounded-full bg-white/75 py-2 pl-5 pr-2 shadow-card ring-1 ring-black/[0.06] backdrop-blur-xl">
          <a href="#top" onClick={go('#top')} aria-label="Turfleo home">
            <Logo size={30} />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={go(href)}
                  className="rounded-full px-4 py-2 text-[14px] font-medium text-slate transition-colors hover:bg-ink/[0.05] hover:text-ink"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href="#demo"
              onClick={go('#demo')}
              className="rounded-full bg-ink px-5 py-2.5 font-display text-[14px] font-bold text-white transition-colors hover:bg-forest"
            >
              Book a demo
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-full text-ink hover:bg-ink/[0.05] lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="absolute inset-x-0 top-[calc(100%+8px)] rounded-3xl bg-white p-3 shadow-float ring-1 ring-black/[0.06] lg:hidden">
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={go(href)}
                className="block rounded-2xl px-4 py-3.5 font-display text-[17px] font-semibold text-ink hover:bg-mint"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
