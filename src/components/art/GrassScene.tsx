import { useEffect, useRef } from 'react'

type Blade = { x: number; y: number; h: number; w: number; phase: number; speed: number; amp: number; d: number; bucket: number }

/** Dark to light. Blades pick a bucket by depth plus a little chance, so nearer grass is brighter. */
const BUCKETS = ['#3b8636', '#46953f', '#54a448', '#63b455', '#78c564', '#92d677', '#b0e48d']

const crest = (x: number, base: number, amp: number, f: number, ph: number) =>
  base + Math.sin(x * f + ph) * amp + Math.sin(x * f * 2.3 + ph * 1.7) * amp * 0.35

/**
 * Layered hills with a mown-lawn texture, and a field of grass blades that sway in the wind
 * and bend away from the pointer. Hills are painted once; only the blades animate, drawn in
 * a handful of batched fills so it stays cheap.
 */
export function GrassScene({ className = '' }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const hillsRef = useRef<HTMLCanvasElement>(null)
  const grassRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current!
    const hills = hillsRef.current!
    const grass = grassRef.current!
    const hctx = hills.getContext('2d')!
    const gctx = grass.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let blades: Blade[] = []
    let raf = 0
    let visible = true
    let mx = -9999
    let mxSmooth = -9999
    let my = -9999
    const nearBase = () => h * 0.67
    const nearCrest = (x: number) => crest(x, nearBase(), 13, 0.0052, 4)

    const hillPath = (ctx: CanvasRenderingContext2D, base: number, amp: number, f: number, ph: number) => {
      ctx.beginPath()
      ctx.moveTo(0, h)
      for (let x = 0; x <= w + 8; x += 8) ctx.lineTo(x, crest(x, base, amp, f, ph))
      ctx.lineTo(w, h)
      ctx.closePath()
    }

    const paintHills = () => {
      hctx.clearRect(0, 0, w, h)

      const far = hctx.createLinearGradient(0, h * 0.3, 0, h * 0.7)
      far.addColorStop(0, '#d6ecc2')
      far.addColorStop(1, '#bfe1a3')
      hillPath(hctx, h * 0.4, 18, 0.0032, 0.5)
      hctx.fillStyle = far
      hctx.fill()

      const mid = hctx.createLinearGradient(0, h * 0.42, 0, h * 0.78)
      mid.addColorStop(0, '#b6df8d')
      mid.addColorStop(1, '#93c968')
      hillPath(hctx, h * 0.53, 20, 0.0041, 2.1)
      hctx.fillStyle = mid
      hctx.fill()

      const near = hctx.createLinearGradient(0, h * 0.58, 0, h)
      near.addColorStop(0, '#72bd53')
      near.addColorStop(1, '#3d8a37')
      hillPath(hctx, nearBase(), 13, 0.0052, 4)
      hctx.fillStyle = near
      hctx.fill()

      // Mowing stripes in perspective: thin at the crest, wide at the foot.
      hctx.save()
      hillPath(hctx, nearBase(), 13, 0.0052, 4)
      hctx.clip()
      const top = nearBase() - 20
      const n = 10
      for (let k = 0; k < n; k++) {
        const y0 = top + (h - top) * Math.pow(k / n, 1.55)
        const y1 = top + (h - top) * Math.pow((k + 1) / n, 1.55)
        hctx.fillStyle = k % 2 ? 'rgba(255,255,255,0.075)' : 'rgba(0,45,0,0.08)'
        hctx.fillRect(0, y0, w, y1 - y0)
      }
      // A pitch marking: the arc of a centre circle drifting off the left edge.
      hctx.strokeStyle = 'rgba(255,255,255,0.3)'
      hctx.lineWidth = 2.5
      hctx.beginPath()
      hctx.ellipse(w * 0.14, h * 1.02, w * 0.17, h * 0.2, 0, Math.PI * 1.05, Math.PI * 1.95)
      hctx.stroke()
      hctx.beginPath()
      hctx.moveTo(w * 0.86, h)
      hctx.lineTo(w * 0.95, nearBase() + 14)
      hctx.stroke()
      hctx.restore()
    }

    const makeBlades = () => {
      const count = Math.round(Math.min(1500, Math.max(520, w * 1.05)))
      blades = []
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w
        const c = nearCrest(x)
        const d = Math.pow(Math.random(), 0.85)
        const y = c + d * (h - c) + 2
        const hh = 12 + d * 40 + Math.random() * 14
        const idx = Math.min(BUCKETS.length - 1, Math.floor((d * 0.62 + Math.random() * 0.5) * BUCKETS.length))
        blades.push({
          x,
          y,
          h: hh,
          w: 1.5 + d * 2.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0009 + Math.random() * 0.0012,
          amp: 3 + d * 7,
          d,
          bucket: idx,
        })
      }
      blades.sort((a, b) => a.y - b.y)
    }

    const draw = (t: number) => {
      gctx.clearRect(0, 0, w, h)
      mxSmooth += (mx - mxSmooth) * 0.16
      const R = 130
      for (let b = 0; b < BUCKETS.length; b++) {
        gctx.fillStyle = BUCKETS[b]
        gctx.beginPath()
        for (const bl of blades) {
          if (bl.bucket !== b) continue
          const wind =
            Math.sin(t * bl.speed + bl.phase + bl.x * 0.004) * 0.55 + Math.sin(t * 0.0012 + bl.x * 0.011) * 0.35
          let s = wind * bl.amp
          const dx = bl.x - mxSmooth
          const ad = Math.abs(dx)
          if (ad < R && my > h * 0.3) {
            const f = 1 - ad / R
            s += Math.sign(dx) * f * f * (14 + bl.d * 16)
          }
          const { x, y } = bl
          gctx.moveTo(x - bl.w / 2, y)
          gctx.quadraticCurveTo(x - bl.w / 4 + s * 0.28, y - bl.h * 0.55, x + s, y - bl.h)
          gctx.quadraticCurveTo(x + bl.w / 4 + s * 0.3, y - bl.h * 0.5, x + bl.w / 2, y)
        }
        gctx.fill()
      }
    }

    const layout = () => {
      const r = wrap.getBoundingClientRect()
      w = r.width
      h = r.height
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      for (const c of [hills, grass]) {
        c.width = Math.round(w * dpr)
        c.height = Math.round(h * dpr)
        c.style.width = `${w}px`
        c.style.height = `${h}px`
      }
      hctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paintHills()
      makeBlades()
      draw(performance.now())
    }

    const loop = (t: number) => {
      if (visible) draw(t)
      raf = requestAnimationFrame(loop)
    }

    layout()
    if (!reduce) raf = requestAnimationFrame(loop)

    const ro = new ResizeObserver(layout)
    ro.observe(wrap)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 })
    io.observe(wrap)
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      mx = e.clientX - r.left
      my = e.clientY - r.top
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div ref={wrapRef} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas ref={hillsRef} data-hills className="absolute inset-0 will-change-transform" />
      <canvas ref={grassRef} className="absolute inset-0" />
    </div>
  )
}
