export type AnimationName =
  | 'wave-lr' | 'wave-rl' | 'wave-tb' | 'wave-bt'
  | 'spiral-cw' | 'corners-first' | 'center-out' | 'diagonal-tl'
  | 'snake' | 'cross' | 'checkerboard' | 'rain' | 'pinwheel'
  | 'orbit' | 'converge' | 'zigzag'
  | 'aurora' | 'ember' | 'prism' | 'neon-cross' | 'tide' | 'sunset' | 'toxic' | 'frost';

export type ColorName =
  | 'cyan' | 'magenta' | 'yellow' | 'green' | 'orange' | 'blue'
  | 'red' | 'purple' | 'white' | 'teal' | 'pink' | 'lime';

export interface AnimationConfig {
  name: string;
  delays: [number, number, number, number, number, number, number, number, number];
  duration: number;
  colors?: (ColorName | string)[];
}

export interface PixelGridProps {
  animation?: AnimationName | AnimationConfig;
  playing?: boolean;
  bloom?: boolean | number;
  color?: ColorName | string;
  className?: string;
  style?: React.CSSProperties;
}
