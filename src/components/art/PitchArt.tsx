import { useId } from 'react'

export type PitchVariant = 'football' | 'cricket' | 'badminton' | 'chain'

/**
 * Top-down pitch illustrations drawn in SVG: the line markings are the real ones (centre
 * circle, creases, service lines), players and the ball move with SMIL so there are no
 * assets to load.
 */
export function PitchArt({
  variant,
  night = false,
  className = '',
}: {
  variant: PitchVariant
  night?: boolean
  className?: string
}) {
  const uid = useId().replace(/:/g, '')
  const grassA = night ? '#12361f' : '#4ba757'
  const grassB = night ? '#0f2f1a' : '#43a050'
  const line = night ? 'rgba(210,255,190,0.55)' : 'rgba(255,255,255,0.92)'

  return (
    <svg viewBox="0 0 400 280" className={className} role="img" aria-label={`${variant} pitch illustration`}>
      <defs>
        <pattern id={`s${uid}`} width="40" height="280" patternUnits="userSpaceOnUse">
          <rect width="20" height="280" fill={grassA} />
          <rect x="20" width="20" height="280" fill={grassB} />
        </pattern>
        <pattern id={`mat${uid}`} width="400" height="280" patternUnits="userSpaceOnUse">
          <rect width="400" height="280" fill={night ? '#12392a' : '#2f7a57'} />
        </pattern>
        <radialGradient id={`vig${uid}`} cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity={night ? 0.5 : 0.22} />
        </radialGradient>
      </defs>

      {variant === 'football' && <Football uid={uid} line={line} night={night} />}
      {variant === 'cricket' && <Cricket uid={uid} line={line} night={night} />}
      {variant === 'badminton' && <Badminton uid={uid} line={line} night={night} />}
      {variant === 'chain' && <Chain uid={uid} line={line} night={night} />}

      <rect width="400" height="280" fill={`url(#vig${uid})`} pointerEvents="none" />
    </svg>
  )
}

type G = { uid: string; line: string; night: boolean }

const HOME = '#bff06b'
const AWAY = '#ffffff'

function Player({ x, y, color, dx = 10, dy = 8, dur = 7, delay = 0 }: { x: number; y: number; color: string; dx?: number; dy?: number; dur?: number; delay?: number }) {
  return (
    <circle r="6.5" fill={color} stroke="rgba(0,0,0,0.35)" strokeWidth="1.5">
      <animate attributeName="cx" values={`${x};${x + dx};${x - dx * 0.5};${x}`} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
      <animate attributeName="cy" values={`${y};${y - dy};${y + dy * 0.6};${y}`} dur={`${dur * 1.15}s`} begin={`${delay}s`} repeatCount="indefinite" />
    </circle>
  )
}

function Football({ uid, line }: G) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="280" fill={`url(#s${uid})`} />
      <g fill="none" stroke={line} strokeWidth="2.4">
        <rect x="14" y="14" width="372" height="252" rx="6" />
        <line x1="200" y1="14" x2="200" y2="266" />
        <circle cx="200" cy="140" r="38" />
        <rect x="14" y="84" width="58" height="112" />
        <rect x="328" y="84" width="58" height="112" />
        <rect x="14" y="114" width="24" height="52" />
        <rect x="362" y="114" width="24" height="52" />
        <path d="M72 116 A30 30 0 0 1 72 164" />
        <path d="M328 116 A30 30 0 0 0 328 164" />
      </g>
      <circle cx="200" cy="140" r="3.4" fill={line} />
      <rect x="4" y="120" width="10" height="40" rx="2" fill="rgba(255,255,255,0.18)" stroke={line} strokeWidth="1.5" />
      <rect x="386" y="120" width="10" height="40" rx="2" fill="rgba(255,255,255,0.18)" stroke={line} strokeWidth="1.5" />

      <Player x={90} y={140} color={HOME} dur={8} />
      <Player x={140} y={90} color={HOME} dur={6.5} delay={0.6} />
      <Player x={140} y={192} color={HOME} dur={7.2} delay={1.2} />
      <Player x={225} y={120} color={HOME} dx={26} dur={5.4} />
      <Player x={245} y={168} color={HOME} dx={14} dur={6.1} delay={0.3} />
      <Player x={310} y={140} color={AWAY} dur={8.4} />
      <Player x={262} y={96} color={AWAY} dur={6.8} delay={0.4} />
      <Player x={262} y={196} color={AWAY} dur={7.6} delay={1} />
      <Player x={190} y={150} color={AWAY} dx={22} dur={5.8} delay={0.9} />
      <Player x={170} y={110} color={AWAY} dur={7} delay={0.2} />

      <circle r="4.6" fill="#fff" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2">
        <animateMotion dur="7s" repeatCount="indefinite" path="M228 124 C 260 90, 300 120, 312 142 S 250 190, 214 150 S 150 110, 228 124" />
      </circle>
    </g>
  )
}

function Cricket({ uid, line }: G) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="280" fill={`url(#s${uid})`} />
      {/* The net cage. */}
      <g fill="none" stroke={line} strokeWidth="1.6" strokeDasharray="3 5" opacity="0.8">
        <rect x="70" y="12" width="260" height="256" rx="8" />
        <line x1="130" y1="12" x2="130" y2="268" />
        <line x1="270" y1="12" x2="270" y2="268" />
      </g>
      {/* Pitch strip and creases. */}
      <rect x="168" y="22" width="64" height="236" rx="3" fill="#d9c28f" />
      <rect x="168" y="22" width="64" height="236" rx="3" fill="none" stroke="rgba(0,0,0,0.12)" />
      <g stroke="#fff" strokeWidth="2.2" fill="none">
        <line x1="160" y1="62" x2="240" y2="62" />
        <line x1="160" y1="218" x2="240" y2="218" />
        <line x1="168" y1="50" x2="168" y2="62" />
        <line x1="232" y1="50" x2="232" y2="62" />
        <line x1="168" y1="218" x2="168" y2="230" />
        <line x1="232" y1="218" x2="232" y2="230" />
      </g>
      <g fill="#fff">
        <rect x="193" y="52" width="2.4" height="9" />
        <rect x="198.8" y="52" width="2.4" height="9" />
        <rect x="204.6" y="52" width="2.4" height="9" />
        <rect x="193" y="219" width="2.4" height="9" />
        <rect x="198.8" y="219" width="2.4" height="9" />
        <rect x="204.6" y="219" width="2.4" height="9" />
      </g>
      {/* Batter, bowler, two in the cage. */}
      <circle cx="200" cy="206" r="7" fill={HOME} stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      <circle cx="200" cy="82" r="7" fill={AWAY} stroke="rgba(0,0,0,0.35)" strokeWidth="1.5">
        <animate attributeName="cy" values="74;96;74" dur="3.6s" repeatCount="indefinite" />
      </circle>
      <Player x={104} y={140} color={AWAY} dx={6} dur={7} />
      <Player x={298} y={120} color={HOME} dx={6} dur={8} />
      <circle r="4.4" fill="#e85a4a" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2">
        <animateMotion dur="3.6s" repeatCount="indefinite" path="M200 96 L200 198 L248 232 L200 198 L200 96" keyTimes="0;0.4;0.55;0.7;1" calcMode="linear" />
      </circle>
    </g>
  )
}

function Badminton({ uid, line }: G) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="280" fill={`url(#mat${uid})`} />
      <rect x="0" y="0" width="400" height="280" fill="rgba(0,0,0,0.12)" />
      <rect x="60" y="22" width="280" height="236" fill="rgba(255,255,255,0.06)" />
      <g fill="none" stroke={line} strokeWidth="2.2">
        <rect x="60" y="22" width="280" height="236" />
        <line x1="60" y1="46" x2="340" y2="46" />
        <line x1="60" y1="234" x2="340" y2="234" />
        <line x1="84" y1="22" x2="84" y2="258" />
        <line x1="316" y1="22" x2="316" y2="258" />
        <line x1="200" y1="22" x2="200" y2="96" />
        <line x1="200" y1="184" x2="200" y2="258" />
        <line x1="60" y1="96" x2="340" y2="96" />
        <line x1="60" y1="184" x2="340" y2="184" />
      </g>
      <line x1="52" y1="140" x2="348" y2="140" stroke="#fff" strokeWidth="3.5" opacity="0.9" />
      <line x1="52" y1="140" x2="348" y2="140" stroke="rgba(0,0,0,0.5)" strokeWidth="1" strokeDasharray="2 3" />
      <Player x={140} y={70} color={HOME} dx={14} dur={4.5} />
      <Player x={270} y={72} color={HOME} dx={10} dur={5.5} delay={0.4} />
      <Player x={150} y={214} color={AWAY} dx={12} dur={4.8} />
      <Player x={262} y={210} color={AWAY} dx={14} dur={5.2} delay={0.7} />
      <circle r="4" fill="#fff" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2">
        <animateMotion dur="2.8s" repeatCount="indefinite" path="M150 210 C 160 150, 200 90, 262 72 C 220 100, 190 160, 150 210" />
      </circle>
    </g>
  )
}

function Chain({ uid, line }: G) {
  const pins = [
    { x: 70, y: 70, label: 'Branch 1' },
    { x: 200, y: 140, label: 'Branch 2' },
    { x: 330, y: 80, label: 'Branch 3' },
  ]
  return (
    <g>
      <rect x="0" y="0" width="400" height="280" fill={`url(#s${uid})`} />
      <path d="M70 70 C 120 150, 150 160, 200 140 S 300 40, 330 80" fill="none" stroke={line} strokeWidth="2.4" strokeDasharray="2 8" strokeLinecap="round" />
      <circle r="5" fill={HOME} stroke="rgba(0,0,0,0.35)" strokeWidth="1.4">
        <animateMotion dur="6s" repeatCount="indefinite" path="M70 70 C 120 150, 150 160, 200 140 S 300 40, 330 80" />
      </circle>
      {pins.map((p) => (
        <g key={p.label}>
          <rect x={p.x - 44} y={p.y - 30} width="88" height="60" rx="6" fill="rgba(255,255,255,0.12)" stroke={line} strokeWidth="1.8" />
          <line x1={p.x} y1={p.y - 30} x2={p.x} y2={p.y + 30} stroke={line} strokeWidth="1.4" />
          <circle cx={p.x} cy={p.y} r="9" fill="none" stroke={line} strokeWidth="1.4" />
          <circle cx={p.x} cy={p.y - 46} r="8" fill={HOME} stroke="rgba(0,0,0,0.35)" strokeWidth="1.4" />
          <circle cx={p.x} cy={p.y - 46} r="2.6" fill="#0f3318" />
        </g>
      ))}
    </g>
  )
}
