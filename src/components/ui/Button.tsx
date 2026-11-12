import { useRef, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from '../../lib/motion'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'lime' | 'dark' | 'ghost' | 'ghost-light'
  /** Draws the circular arrow chip used by the primary calls to action. */
  arrow?: boolean
  magnetic?: boolean
  className?: string
  type?: 'button' | 'submit'
}

const VARIANTS: Record<NonNullable<Props['variant']>, string> = {
  lime: 'bg-lime text-lime-ink hover:bg-[#cdf584]',
  dark: 'bg-ink text-white hover:bg-forest',
  ghost: 'border border-ink/15 bg-white/60 text-ink backdrop-blur hover:border-ink/40 hover:bg-white',
  'ghost-light': 'border border-white/20 bg-white/5 text-white backdrop-blur hover:border-white/50 hover:bg-white/10',
}

const CHIP: Record<NonNullable<Props['variant']>, string> = {
  lime: 'bg-forest text-lime',
  dark: 'bg-lime text-lime-ink',
  ghost: 'bg-ink text-white',
  'ghost-light': 'bg-lime text-lime-ink',
}

export function Button({
  children,
  href,
  onClick,
  variant = 'lime',
  arrow = false,
  magnetic = false,
  className = '',
  type = 'button',
}: Props) {
  const ref = useRef<HTMLElement | null>(null)

  const move = (e: React.PointerEvent) => {
    if (!magnetic || !ref.current || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * 0.22
    const y = (e.clientY - (r.top + r.height / 2)) * 0.3
    gsap.to(ref.current, { x, y, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
  }
  const leave = () => {
    if (magnetic && ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' })
  }

  const cls = `group relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full font-display text-[15px] font-bold tracking-[-0.01em] transition-[background-color,border-color,transform,box-shadow] duration-300 will-change-transform active:scale-[0.98] ${
    arrow ? 'py-1.5 pl-6 pr-1.5' : 'px-6 py-3.5'
  } ${VARIANTS[variant]} ${className}`

  const inner = (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow && (
        <span
          className={`grid size-10 place-items-center overflow-hidden rounded-full ${CHIP[variant]}`}
        >
          <ArrowRight
            size={18}
            strokeWidth={2.4}
            className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-rotate-45"
          />
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <a
        ref={(el) => {
          ref.current = el
        }}
        href={href}
        onClick={onClick}
        onPointerMove={move}
        onPointerLeave={leave}
        className={cls}
      >
        {inner}
      </a>
    )
  }
  return (
    <button
      ref={(el) => {
        ref.current = el
      }}
      type={type}
      onClick={onClick}
      onPointerMove={move}
      onPointerLeave={leave}
      className={cls}
    >
      {inner}
    </button>
  )
}
