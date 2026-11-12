import type { ReactNode } from 'react'
import { ArrowLeft, CheckCheck, Mic, PhoneMissed, Plus, Smile, Video } from 'lucide-react'

export type Msg = {
  name?: string
  text: string
  time: string
  out?: boolean
  flag?: boolean
  missed?: boolean
}

const NAME_COLORS = ['#c2410c', '#0e7490', '#7c3aed', '#b45309', '#be185d', '#15803d']
const colorFor = (n: string) => NAME_COLORS[[...n].reduce((a, c) => a + c.charCodeAt(0), 0) % NAME_COLORS.length]

/** One WhatsApp-style message. The wrapper is what a scene animates open (height 0 to auto). */
export function Bubble({ name, text, time, out, flag, missed }: Msg) {
  return (
    <div data-msg className="overflow-hidden px-3 py-[3px]">
      <div className={`flex ${out ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[86%] rounded-2xl px-3 py-2 text-[13px] leading-snug shadow-[0_1px_1px_rgba(0,0,0,0.12)] ${
            out ? 'rounded-tr-md bg-[#dcf8c6]' : 'rounded-tl-md bg-white'
          } ${flag ? 'ring-2 ring-ember' : ''}`}
        >
          {!out && name && (
            <p className="mb-0.5 text-[11.5px] font-bold" style={{ color: colorFor(name) }}>
              {name}
            </p>
          )}
          {missed ? (
            <p className="flex items-center gap-1.5 font-medium text-[#c0392b]">
              <PhoneMissed size={14} /> {text}
            </p>
          ) : (
            <p className="text-[#1c1c1c]">{text}</p>
          )}
          <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#8a8a8a]">
            {time}
            {out && <CheckCheck size={13} className="text-[#34a8e0]" />}
          </p>
        </div>
      </div>
    </div>
  )
}

/** A phone with a chat on screen. Children are the messages, bottom-aligned like a real thread. */
export function ChatPhone({
  title,
  subtitle,
  unread,
  children,
  className = '',
}: {
  title: string
  subtitle: string
  unread?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div
      data-phone
      className={`relative aspect-[9/18.4] rounded-[46px] bg-[#0e0e0e] p-[9px] shadow-[0_50px_100px_-24px_rgba(0,0,0,0.75),inset_0_0_0_2px_#2a2a2a] ${className}`}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[37px] bg-[#ece5dd]">
        <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-[#0e0e0e]" />

        <div className="flex items-center justify-between bg-[#0e5a4c] px-5 pb-1 pt-3 text-[11px] font-semibold text-white">
          <span>6:24</span>
          <span className="opacity-0">.</span>
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-white" />
            <span className="size-1.5 rounded-full bg-white" />
            <span className="size-1.5 rounded-full bg-white/50" />
          </span>
        </div>
        <div className="flex items-center gap-2.5 bg-[#0e5a4c] px-3 pb-2.5 pt-1.5 text-white">
          <ArrowLeft size={18} />
          <span className="grid size-9 place-items-center rounded-full bg-white/20 font-display text-[13px] font-bold">AB</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold leading-tight">{title}</p>
            <p className="truncate text-[11px] text-white/70">{subtitle}</p>
          </div>
          {unread}
          <Video size={18} />
        </div>

        <div
          className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden pb-2 pt-3"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.045) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        >
          {children}
        </div>

        <div className="flex items-center gap-2 bg-[#f0f0f0] px-2.5 py-2.5">
          <span className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-2 text-[12px] text-[#9a9a9a]">
            <Smile size={16} /> Message
          </span>
          <Plus size={18} className="text-[#6b6b6b]" />
          <span className="grid size-8 place-items-center rounded-full bg-[#0e5a4c] text-white">
            <Mic size={15} />
          </span>
        </div>
      </div>
    </div>
  )
}
