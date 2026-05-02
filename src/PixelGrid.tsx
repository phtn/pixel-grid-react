import React, { useEffect, useMemo, useRef } from 'react'
import { ANIMATIONS } from './animations.ts'
import type { AnimationConfig, AnimationName, PixelGridProps } from './types.ts'

const STYLES = `.pixel-grid{display:grid;grid-template-columns:repeat(3,3px);grid-template-rows:repeat(3,3px);gap:1px}
.pixel-grid__cell{background-color:var(--pixel-off);box-shadow:none;border-radius:0;transition:background-color 200ms ease-out,box-shadow 200ms ease-out}
.pixel-grid__cell.is-on{background-color:var(--pixel-on)}
.pixel-grid--bloom .pixel-grid__cell{border-radius:1px}
.pixel-grid--bloom .pixel-grid__cell.is-on{box-shadow:0 0 3px var(--pixel-glow),0 0 6px var(--pixel-glow)}
:root{--pixel-off:oklch(35% 0.04 195/0.5);--pixel-on:oklch(85% 0.15 195);--pixel-glow:oklch(75% 0.18 195/0.8)}
.pixel-grid--cyan{--pixel-off:oklch(40% 0.08 195/0.4);--pixel-on:oklch(90% 0.2 195);--pixel-glow:oklch(80% 0.25 195/0.9)}
.pixel-grid--magenta{--pixel-off:oklch(40% 0.08 330/0.4);--pixel-on:oklch(85% 0.25 330);--pixel-glow:oklch(75% 0.3 330/0.9)}
.pixel-grid--yellow{--pixel-off:oklch(50% 0.08 90/0.4);--pixel-on:oklch(95% 0.2 90);--pixel-glow:oklch(90% 0.25 90/0.9)}
.pixel-grid--green{--pixel-off:oklch(40% 0.08 145/0.4);--pixel-on:oklch(90% 0.25 145);--pixel-glow:oklch(80% 0.3 145/0.9)}
.pixel-grid--orange{--pixel-off:oklch(45% 0.08 50/0.4);--pixel-on:oklch(85% 0.22 50);--pixel-glow:oklch(75% 0.28 50/0.9)}
.pixel-grid--blue{--pixel-off:oklch(40% 0.08 260/0.4);--pixel-on:oklch(80% 0.22 260);--pixel-glow:oklch(70% 0.28 260/0.9)}
.pixel-grid--red{--pixel-off:oklch(40% 0.08 25/0.4);--pixel-on:oklch(70% 0.25 25);--pixel-glow:oklch(60% 0.3 25/0.9)}
.pixel-grid--purple{--pixel-off:oklch(40% 0.08 300/0.4);--pixel-on:oklch(75% 0.22 300);--pixel-glow:oklch(65% 0.28 300/0.9)}
.pixel-grid--white{--pixel-off:oklch(50% 0 0/0.3);--pixel-on:oklch(98% 0 0);--pixel-glow:oklch(95% 0 0/0.8)}
.pixel-grid--teal{--pixel-off:oklch(40% 0.08 175/0.4);--pixel-on:oklch(82% 0.18 175);--pixel-glow:oklch(72% 0.24 175/0.9)}
.pixel-grid--pink{--pixel-off:oklch(45% 0.08 350/0.4);--pixel-on:oklch(80% 0.2 350);--pixel-glow:oklch(70% 0.26 350/0.9)}
.pixel-grid--lime{--pixel-off:oklch(45% 0.08 120/0.4);--pixel-on:oklch(88% 0.22 120);--pixel-glow:oklch(80% 0.28 120/0.9)}
.pixel-grid__cell--cyan{--pixel-off:oklch(40% 0.08 195/0.4);--pixel-on:oklch(90% 0.2 195);--pixel-glow:oklch(80% 0.25 195/0.9)}
.pixel-grid__cell--magenta{--pixel-off:oklch(40% 0.08 330/0.4);--pixel-on:oklch(85% 0.25 330);--pixel-glow:oklch(75% 0.3 330/0.9)}
.pixel-grid__cell--yellow{--pixel-off:oklch(50% 0.08 90/0.4);--pixel-on:oklch(95% 0.2 90);--pixel-glow:oklch(90% 0.25 90/0.9)}
.pixel-grid__cell--green{--pixel-off:oklch(40% 0.08 145/0.4);--pixel-on:oklch(90% 0.25 145);--pixel-glow:oklch(80% 0.3 145/0.9)}
.pixel-grid__cell--orange{--pixel-off:oklch(45% 0.08 50/0.4);--pixel-on:oklch(85% 0.22 50);--pixel-glow:oklch(75% 0.28 50/0.9)}
.pixel-grid__cell--blue{--pixel-off:oklch(40% 0.08 260/0.4);--pixel-on:oklch(80% 0.22 260);--pixel-glow:oklch(70% 0.28 260/0.9)}
.pixel-grid__cell--red{--pixel-off:oklch(40% 0.08 25/0.4);--pixel-on:oklch(70% 0.25 25);--pixel-glow:oklch(60% 0.3 25/0.9)}
.pixel-grid__cell--purple{--pixel-off:oklch(40% 0.08 300/0.4);--pixel-on:oklch(75% 0.22 300);--pixel-glow:oklch(65% 0.28 300/0.9)}
.pixel-grid__cell--white{--pixel-off:oklch(50% 0 0/0.3);--pixel-on:oklch(98% 0 0);--pixel-glow:oklch(95% 0 0/0.8)}
.pixel-grid__cell--teal{--pixel-off:oklch(40% 0.08 175/0.4);--pixel-on:oklch(82% 0.18 175);--pixel-glow:oklch(72% 0.24 175/0.9)}
.pixel-grid__cell--pink{--pixel-off:oklch(45% 0.08 350/0.4);--pixel-on:oklch(80% 0.2 350);--pixel-glow:oklch(70% 0.26 350/0.9)}
.pixel-grid__cell--lime{--pixel-off:oklch(45% 0.08 120/0.4);--pixel-on:oklch(88% 0.22 120);--pixel-glow:oklch(80% 0.28 120/0.9)}
@media(prefers-reduced-motion:reduce){.pixel-grid__cell{transition:none}}`

if (typeof document !== 'undefined' && !document.getElementById('pixel-grid-styles')) {
  const el = document.createElement('style')
  el.id = 'pixel-grid-styles'
  el.textContent = STYLES
  document.head.appendChild(el)
}

const DEFAULT_BLOOM_AMOUNT = 4
const SVG_NS = 'http://www.w3.org/2000/svg'
let bloomSvg: SVGSVGElement | null = null
let bloomIdCounter = 0

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function ensureBloomSvg(): SVGSVGElement {
  if (bloomSvg) return bloomSvg
  bloomSvg = document.createElementNS(SVG_NS, 'svg') as SVGSVGElement
  bloomSvg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden')
  bloomSvg.setAttribute('aria-hidden', 'true')
  bloomSvg.appendChild(document.createElementNS(SVG_NS, 'defs'))
  document.body.appendChild(bloomSvg)
  return bloomSvg
}

function createBloomFilter(id: number, amount: number): string {
  const svg = ensureBloomSvg()
  const defs = svg.firstChild!
  const filterId = `pg-bloom-${id}`

  const existing = svg.querySelector(`#${filterId}`)
  if (existing) existing.parentNode!.removeChild(existing)

  const filter = document.createElementNS(SVG_NS, 'filter')
  filter.setAttribute('id', filterId)
  filter.setAttribute('x', '-100%')
  filter.setAttribute('y', '-100%')
  filter.setAttribute('width', '300%')
  filter.setAttribute('height', '300%')

  const matrix = document.createElementNS(SVG_NS, 'feColorMatrix')
  matrix.setAttribute('in', 'SourceGraphic')
  matrix.setAttribute('type', 'matrix')
  matrix.setAttribute('values', '2 0 0 0 -0.5 0 2 0 0 -0.5 0 0 2 0 -0.5 0 0 0 1 0')
  matrix.setAttribute('result', 'bright')

  const blur = document.createElementNS(SVG_NS, 'feGaussianBlur')
  blur.setAttribute('in', 'bright')
  blur.setAttribute('stdDeviation', String(amount))
  blur.setAttribute('result', 'glow')

  const blend = document.createElementNS(SVG_NS, 'feBlend')
  blend.setAttribute('in', 'SourceGraphic')
  blend.setAttribute('in2', 'glow')
  blend.setAttribute('mode', 'screen')

  filter.appendChild(matrix)
  filter.appendChild(blur)
  filter.appendChild(blend)
  defs.appendChild(filter)

  return filterId
}

function removeBloomFilter(id: number): void {
  if (!bloomSvg) return
  const el = bloomSvg.querySelector(`#pg-bloom-${id}`)
  if (el) el.parentNode!.removeChild(el)
}

function isHex(str: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(str)
}

function resolveAnimation(anim: AnimationName | AnimationConfig | undefined): AnimationConfig {
  if (!anim) return ANIMATIONS['wave-lr']!
  if (typeof anim === 'string') return ANIMATIONS[anim] ?? ANIMATIONS['wave-lr']!
  return anim
}

function hexVars(hex: string): React.CSSProperties {
  return {
    '--pixel-on': hex,
    '--pixel-off': `color-mix(in oklch, ${hex} 25%, black)`,
    '--pixel-glow': `color-mix(in oklch, ${hex} 60%, transparent)`
  } as React.CSSProperties
}

export function PixelGrid({
  animation = 'wave-lr',
  playing = true,
  bloom = false,
  color,
  className,
  style,
  duration = 0
}: PixelGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cellRefs = useRef<(HTMLDivElement | null)[]>(Array(9).fill(null))
  const runningRef = useRef(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const bloomIdRef = useRef(++bloomIdCounter)

  const animationKey = useMemo(
    () => (typeof animation === 'string' ? animation : JSON.stringify(animation)),
    [animation]
  )

  const config = useMemo(() => resolveAnimation(animation), [animationKey]) // eslint-disable-line react-hooks/exhaustive-deps

  function clearTimers() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    if (cycleTimerRef.current !== null) {
      clearTimeout(cycleTimerRef.current)
      cycleTimerRef.current = null
    }
  }

  useEffect(() => {
    const cells = cellRefs.current
    cells.forEach((cell) => cell?.classList.remove('is-on'))

    if (!playing) {
      runningRef.current = false
      clearTimers()
      return
    }

    runningRef.current = true

    if (prefersReducedMotion) {
      cells.forEach((cell) => cell?.classList.add('is-on'))
      return () => {
        runningRef.current = false
      }
    }

    const { delays } = config
    const maxDelay = Math.max(...delays)
    duration = duration ?? config.duration

    function cycle() {
      if (!runningRef.current) return

      delays.forEach((delay, i) => {
        timersRef.current.push(
          setTimeout(() => {
            cells[i]?.classList.add('is-on')
          }, delay)
        )
      })

      cycleTimerRef.current = setTimeout(() => {
        if (!runningRef.current) return

        delays.forEach((delay, i) => {
          timersRef.current.push(
            setTimeout(() => {
              cells[i]?.classList.remove('is-on')
            }, delay)
          )
        })

        cycleTimerRef.current = setTimeout(
          () => {
            if (runningRef.current) cycle()
          },
          maxDelay + duration + 50
        )
      }, maxDelay + duration)
    }

    cycle()

    return () => {
      runningRef.current = false
      clearTimers()
    }
  }, [playing, animationKey, config]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const container = containerRef.current
    if (!container || !bloom) return

    const id = bloomIdRef.current
    const amount = typeof bloom === 'number' ? bloom : DEFAULT_BLOOM_AMOUNT
    const filterId = createBloomFilter(id, amount)
    container.style.filter = `url(#${filterId})`

    return () => {
      container.style.filter = ''
      removeBloomFilter(id)
    }
  }, [bloom])

  const containerClassName = [
    'pixel-grid',
    bloom ? 'pixel-grid--bloom' : null,
    color && !isHex(color) ? `pixel-grid--${color}` : null,
    className
  ]
    .filter(Boolean)
    .join(' ')

  const containerStyle: React.CSSProperties = {
    ...(color && isHex(color) ? hexVars(color) : {}),
    ...style
  }

  return (
    <div ref={containerRef} className={containerClassName} style={containerStyle}>
      {Array.from({ length: 9 }, (_, i) => {
        const cellColor = config.colors?.[i]
        const cellClassName = [
          'pixel-grid__cell',
          cellColor && !isHex(cellColor) ? `pixel-grid__cell--${cellColor}` : null
        ]
          .filter(Boolean)
          .join(' ')
        const cellStyle = cellColor && isHex(cellColor) ? hexVars(cellColor) : undefined

        return (
          <div
            key={i}
            ref={(el) => {
              cellRefs.current[i] = el
            }}
            className={cellClassName}
            style={cellStyle}
          />
        )
      })}
    </div>
  )
}
