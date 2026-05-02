export type AnimationName =
  | 'wave-lr'
  | 'wave-rl'
  | 'wave-tb'
  | 'wave-bt'
  | 'spiral-cw'
  | 'corners-first'
  | 'center-out'
  | 'diagonal-tl'
  | 'snake'
  | 'cross'
  | 'checkerboard' // BOARD
  | 'rain'
  | 'pinwheel'
  | 'orbit'
  | 'converge'
  | 'zigzag'
  | 'aurora'
  | 'ember'
  | 'prism'
  | 'neon-cross'
  | 'tide'
  | 'sunset'
  | 'toxic'
  | 'frost'

export type ColorName =
  | 'cyan'
  | 'magenta'
  | 'yellow'
  | 'green'
  | 'orange'
  | 'blue'
  | 'red'
  | 'purple'
  | 'white'
  | 'teal'
  | 'pink'
  | 'lime'

/**
 * @name AnimationName
 * @delays number[0..8]
 * @duration in ms
 * @colors ColorName | string[]
 *
 */
export interface AnimationConfig {
  name: string
  delays: [number, number, number, number, number, number, number, number, number]
  duration: number // duration in milliseconds
  colors?: (ColorName | string)[]
}

export interface PixelGridProps {
  animation?: AnimationName | AnimationConfig
  playing?: boolean
  bloom?: boolean | number
  color?: ColorName | string
  className?: string
  style?: React.CSSProperties
  duration?: number // duration in milliseconds
}
