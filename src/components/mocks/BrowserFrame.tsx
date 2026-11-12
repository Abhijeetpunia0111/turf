import type { ReactNode } from 'react'
import {
  CalendarDays,
  GraduationCap,
  Goal,
  Layers,
  LayoutGrid,
  Package,
  Receipt,
  Search,
  ShoppingCart,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import { LogoMark } from '../ui/Logo'

export const NAV_ITEMS = [
  ['Dashboard', LayoutGrid],
  ['Bookings', CalendarDays],
  ['Active Courts', Goal],
  ['Add ons', ShoppingCart],
  ['Members', Users],
  ['Manage', Layers],
  ['Sales', Receipt],
  ['Inventory', Package],
  ['Academy', GraduationCap],
  ['Events', Trophy],
] as const

export type NavLabel = (typeof NAV_ITEMS)[number][0]

/** A browser window around the Turfleo dashboard, with the product's real sidebar. */
export function BrowserFrame({
  active,
  children,
  compact = false,
  className = '',
}: {
  active: NavLabel
  children: ReactNode
  compact?: boolean
  className?: string
}) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-[22px] bg-white shadow-float ring-1 ring-black/[0.07] ${className}`}>
      <div className="flex shrink-0 items-center gap-3 border-b border-black/[0.06] bg-[#f6f8f3] px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff6159]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#28c940]" />
        </span>
        <span className="mx-auto truncate rounded-md bg-white px-4 py-1 font-mono text-[11px] text-muted ring-1 ring-black/[0.05]">
          greenfield.turfleo.com
        </span>
        <span className="w-12" />
      </div>

      <div className="flex min-h-0 flex-1">
        {!compact && (
          <aside className="hidden w-[170px] shrink-0 flex-col gap-1 border-r border-black/[0.06] bg-white p-3 md:flex">
            <div className="mb-2 flex items-center gap-2 px-1 pb-3">
              <LogoMark size={26} />
              <div className="min-w-0">
                <p className="truncate font-display text-[12px] font-bold leading-tight">Greenfield Arena</p>
                <p className="truncate text-[10px] text-muted">Koramangala</p>
              </div>
            </div>
            <div className="mb-1 flex items-center gap-2 rounded-lg border border-black/10 px-2.5 py-2 text-[11px] text-muted">
              <Search size={13} /> Quick search
            </div>
            <div className="mb-1 flex items-center gap-2 rounded-lg bg-lime px-2.5 py-2 text-[12px] font-semibold text-lime-ink">
              <Zap size={13} /> New Booking
            </div>
            {NAV_ITEMS.map(([label, Icon]) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12px] transition-colors duration-500 ${
                  label === active ? 'bg-[#f1f1ef] font-semibold text-ink' : 'text-slate'
                }`}
              >
                <Icon size={15} className={label === active ? 'text-ink' : 'text-muted'} />
                {label}
              </div>
            ))}
          </aside>
        )}
        <div className="relative min-w-0 flex-1 bg-[#fbfbfa]">{children}</div>
      </div>
    </div>
  )
}
