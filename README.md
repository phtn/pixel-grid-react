# pixel-grid-react

A React component for the 3×3 animated pixel grid indicator — a tiny, expressive loading signal driven by delay arrays. Zero external dependencies, full TypeScript support, under 10 KB.

**[Live demo & animation designer →](https://3pxgrid.com)**

```tsx
<PixelGrid animation="spiral-cw" color="magenta" />
```

```
▪ · ▪       ▪ ▪ ▪       · · ·
· ▪ ·  →    · · ·  →    · · ·  →  …
▪ · ▪       · · ·       ▪ ▪ ▪
```

---

## Installation

```sh
npm install pixel-grid-react
# or
yarn add pixel-grid-react
# or
bun add pixel-grid-react
```

---

## Quick start

```tsx
import { PixelGrid } from 'pixel-grid-react';

export function App() {
  return <PixelGrid />;
}
```

Styles are injected automatically. No CSS import needed.

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `animation` | `AnimationName \| AnimationConfig` | `"wave-lr"` | Preset name or custom animation object |
| `playing` | `boolean` | `true` | Start or stop the animation |
| `color` | `ColorName \| string` | — | Override the grid color. Named value or hex (`"#ff6b6b"`) |
| `bloom` | `boolean \| number` | `false` | Enable glow bloom. Pass a number to control blur radius (default `4`) |
| `className` | `string` | — | Extra class names on the container |
| `style` | `CSSProperties` | — | Inline styles on the container |

---

## Animation presets

24 built-in presets, grouped by type.

### Single-color

| Name | Description |
|---|---|
| `wave-lr` | Wave sweeping left to right |
| `wave-rl` | Wave sweeping right to left |
| `wave-tb` | Wave sweeping top to bottom |
| `wave-bt` | Wave sweeping bottom to top |
| `spiral-cw` | Clockwise spiral |
| `diagonal-tl` | Diagonal cascade from top-left |
| `snake` | Snake / S-curve path |
| `pinwheel` | Pinwheel rotation |
| `orbit` | Orbiting outer ring |
| `cross` | Cross / plus shape pulse |
| `checkerboard` | Alternating checkerboard flash |
| `corners-first` | Corners light before center |
| `center-out` | Center pulse expanding outward |
| `converge` | Edges converge to center |
| `rain` | Randomised rain drops |
| `zigzag` | Zigzag diagonal path |

### Multi-color

These presets assign a different color to each cell.

| Name | Palette |
|---|---|
| `prism` | Red → orange → yellow → green → cyan → blue → purple → magenta → pink |
| `aurora` | Cyan → teal → blue → purple → magenta |
| `ember` | Yellow → orange → red → magenta |
| `sunset` | Purple → magenta → red → orange → yellow |
| `tide` | Teal → cyan → blue → purple |
| `frost` | Blue → cyan → white |
| `toxic` | Lime → green → yellow |
| `neon-cross` | Magenta / cyan cross on white center |

```tsx
<PixelGrid animation="prism" />
<PixelGrid animation="aurora" bloom />
```

---

## Color variants

Apply a named color to the whole grid with the `color` prop.

| Name | | Name | |
|---|---|---|---|
| `cyan` | Default | `teal` | |
| `magenta` | | `pink` | |
| `yellow` | | `lime` | |
| `green` | | `white` | |
| `orange` | | `blue` | |
| `red` | | `purple` | |

```tsx
<PixelGrid color="magenta" />
<PixelGrid color="lime" animation="checkerboard" />
```

You can also pass any hex color directly:

```tsx
<PixelGrid color="#a78bfa" animation="spiral-cw" />
```

---

## Controlling playback

Use the `playing` prop to start and stop the animation declaratively — no refs needed.

```tsx
function LoadingButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button disabled={isLoading}>
      {isLoading && <PixelGrid playing={isLoading} animation="snake" />}
      {isLoading ? 'Loading…' : 'Submit'}
    </button>
  );
}
```

---

## Bloom effect

The `bloom` prop adds an SVG-based glow filter, creating a neon-light feel.

```tsx
// Default bloom intensity
<PixelGrid animation="aurora" bloom />

// Custom blur radius
<PixelGrid animation="prism" bloom={8} />
```

Bloom pairs especially well with multi-color presets and dark backgrounds.

---

## Custom animations

Pass an `AnimationConfig` object instead of a preset name to define your own pattern. The `delays` array holds exactly nine numbers — one per cell, in reading order:

```
 0  1  2
 3  4  5
 6  7  8
```

```tsx
import { PixelGrid, type AnimationConfig } from 'pixel-grid-react';

const pulse: AnimationConfig = {
  name: 'pulse',
  delays: [
    200, 100, 200,
    100,   0, 100,
    200, 100, 200,
  ],
  duration: 300,
};

<PixelGrid animation={pulse} color="blue" />
```

Wrap the config in `useMemo` when defined inside a component to keep it stable across renders:

```tsx
const config = useMemo<AnimationConfig>(() => ({
  name: 'custom',
  delays: [0, 80, 160, 240, 320, 400, 480, 560, 640],
  duration: 200,
  colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'magenta', 'pink'],
}), []);

<PixelGrid animation={config} />
```

### AnimationConfig reference

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | Identifier (used for debugging) |
| `delays` | `[number × 9]` | Yes | Stagger delay in ms for each cell |
| `duration` | `number` | Yes | Hold time in ms before fade-out begins |
| `colors` | `(ColorName \| string)[]` | No | Per-cell color — named or hex |

---

## Utilities

```ts
import { ANIMATIONS, getAnimationNames } from 'pixel-grid-react';

// All 24 preset configs as a record
console.log(ANIMATIONS['spiral-cw']); // { name, delays, duration }

// Array of all preset names
const names = getAnimationNames(); // ['wave-lr', 'wave-rl', ...]
```

---

## TypeScript

All types are exported from the main entry point.

```ts
import type {
  AnimationName,   // union of all 24 preset names
  AnimationConfig, // { name, delays, duration, colors? }
  ColorName,       // union of all 12 named colors
  PixelGridProps,  // component props interface
} from 'pixel-grid-react';
```

---

## Accessibility

The component respects `prefers-reduced-motion`. When the user has enabled this system preference, the grid renders in a static fully-lit state — no animation, no transitions.

---

## Browser support

Requires CSS `oklch()` and `color-mix()`. Supported in all modern browsers (Chrome 111+, Firefox 113+, Safari 16.2+).

---

## Credits

The pixel grid loading concept was originally created by [SuCodee](https://www.youtube.com/@SuCodee) for Swift, and brought to the web by [MetaHeavies](https://github.com/MetaHeavies) via [this post](https://x.com/k_grajeda/status/2017358045957759121) by [Kevin Grajeda](https://www.kvin.me/).

This package is a React wrapper around the [original vanilla JS library](https://github.com/MetaHeavies/3-pixel-grid).

---

## License

MIT
