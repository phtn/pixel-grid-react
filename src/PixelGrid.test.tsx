import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'bun:test'
import { PixelGrid } from './PixelGrid.tsx'

afterEach(cleanup)

describe('PixelGrid', () => {
  describe('structure', () => {
    test('renders exactly 9 cells', () => {
      const { container } = render(<PixelGrid />)
      expect(container.querySelectorAll('.pixel-grid__cell').length).toBe(9)
    })

    test('root element has pixel-grid class', () => {
      const { container } = render(<PixelGrid />)
      expect(container.firstElementChild?.classList.contains('pixel-grid')).toBe(true)
    })

    test('forwards className to container', () => {
      const { container } = render(<PixelGrid className='my-loader' />)
      expect(container.firstElementChild?.classList.contains('my-loader')).toBe(true)
    })

    test('forwards style to container', () => {
      const { container } = render(<PixelGrid style={{ marginTop: '8px' }} />)
      expect((container.firstElementChild as HTMLElement).style.marginTop).toBe('8px')
    })
  })

  describe('bloom', () => {
    test('does not add bloom class by default', () => {
      const { container } = render(<PixelGrid />)
      expect(container.firstElementChild?.classList.contains('pixel-grid--bloom')).toBe(false)
    })

    test('adds bloom class when bloom is enabled', () => {
      const { container } = render(<PixelGrid bloom />)
      expect(container.firstElementChild?.classList.contains('pixel-grid--bloom')).toBe(true)
    })

    test('applies bloom filter when bloom is enabled', () => {
      const { container } = render(<PixelGrid bloom={6} />)
      const el = container.firstElementChild as HTMLElement
      expect(el.style.filter).toContain('pg-bloom-')
    })
  })

  describe('color', () => {
    test('applies named color class to container', () => {
      const { container } = render(<PixelGrid color='magenta' />)
      expect(container.firstElementChild?.classList.contains('pixel-grid--magenta')).toBe(true)
    })

    test('applies hex color as CSS custom properties', () => {
      const { container } = render(<PixelGrid color='#ff0000' />)
      const el = container.firstElementChild as HTMLElement
      expect(el.style.getPropertyValue('--pixel-on')).toBe('#ff0000')
    })

    test('does not add a color class for hex values', () => {
      const { container } = render(<PixelGrid color='#00ff00' />)
      const classes = Array.from(container.firstElementChild?.classList ?? [])
      expect(classes.some((c) => c.startsWith('pixel-grid--'))).toBe(false)
    })
  })

  describe('multi-color animations', () => {
    test('applies cell color classes from animation config', () => {
      const { container } = render(<PixelGrid animation='prism' />)
      const cells = container.querySelectorAll('.pixel-grid__cell')
      // prism: red, orange, yellow, green, cyan, blue, purple, magenta, pink
      expect(cells[0]?.classList.contains('pixel-grid__cell--red')).toBe(true)
      expect(cells[2]?.classList.contains('pixel-grid__cell--yellow')).toBe(true)
      expect(cells[8]?.classList.contains('pixel-grid__cell--pink')).toBe(true)
    })

    test('applies cell colors from custom animation config', () => {
      const { container } = render(
        <PixelGrid
          animation={{
            name: 'custom',
            delays: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            duration: 100,
            colors: ['red', 'blue', 'green', 'red', 'blue', 'green', 'red', 'blue', 'green']
          }}
        />
      )
      const cells = container.querySelectorAll('.pixel-grid__cell')
      expect(cells[0]?.classList.contains('pixel-grid__cell--red')).toBe(true)
      expect(cells[1]?.classList.contains('pixel-grid__cell--blue')).toBe(true)
    })

    test('no cell color classes for single-color animations', () => {
      const { container } = render(<PixelGrid animation='wave-lr' />)
      const cells = container.querySelectorAll('.pixel-grid__cell')
      for (const cell of cells) {
        const hasCellColor = Array.from(cell.classList).some((c) => c.startsWith('pixel-grid__cell--'))
        expect(hasCellColor).toBe(false)
      }
    })
  })

  describe('playback', () => {
    test('cells start without is-on when playing is false', () => {
      const { container } = render(<PixelGrid playing={false} />)
      const cells = container.querySelectorAll('.pixel-grid__cell')
      for (const cell of cells) {
        expect(cell.classList.contains('is-on')).toBe(false)
      }
    })
  })

  describe('style injection', () => {
    test('injects a style element into document head', () => {
      render(<PixelGrid />)
      expect(document.getElementById('pixel-grid-styles')).not.toBeNull()
    })

    test('injected styles contain core class', () => {
      render(<PixelGrid />)
      const content = document.getElementById('pixel-grid-styles')?.textContent ?? ''
      expect(content).toContain('.pixel-grid')
      expect(content).toContain('.pixel-grid--bloom')
      expect(content).toContain('.pixel-grid__cell')
    })

    test('style element is only injected once across multiple renders', () => {
      render(<PixelGrid />)
      render(<PixelGrid animation='prism' />)
      render(<PixelGrid color='magenta' />)
      expect(document.querySelectorAll('#pixel-grid-styles').length).toBe(1)
    })
  })
})
