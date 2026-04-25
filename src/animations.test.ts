import { describe, test, expect } from 'bun:test';
import { ANIMATIONS, getAnimationNames } from './animations.ts';

const MULTI_COLOR = ['aurora', 'ember', 'prism', 'neon-cross', 'tide', 'sunset', 'toxic', 'frost'];
const SINGLE_COLOR = ['wave-lr', 'wave-rl', 'wave-tb', 'wave-bt', 'spiral-cw', 'corners-first',
  'center-out', 'diagonal-tl', 'snake', 'cross', 'checkerboard', 'rain',
  'pinwheel', 'orbit', 'converge', 'zigzag'];

describe('ANIMATIONS', () => {
  test('has 24 presets', () => {
    expect(getAnimationNames().length).toBe(24);
  });

  test('includes all single-color preset names', () => {
    for (const name of SINGLE_COLOR) {
      expect(ANIMATIONS[name]).toBeDefined();
    }
  });

  test('includes all multi-color preset names', () => {
    for (const name of MULTI_COLOR) {
      expect(ANIMATIONS[name]).toBeDefined();
    }
  });

  test('every preset has exactly 9 delays', () => {
    for (const anim of Object.values(ANIMATIONS)) {
      expect(anim.delays.length).toBe(9);
    }
  });

  test('all delays are non-negative numbers', () => {
    for (const anim of Object.values(ANIMATIONS)) {
      for (const delay of anim.delays) {
        expect(typeof delay).toBe('number');
        expect(delay).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('all durations are positive numbers', () => {
    for (const anim of Object.values(ANIMATIONS)) {
      expect(anim.duration).toBeGreaterThan(0);
    }
  });

  test('multi-color presets have exactly 9 colors', () => {
    for (const name of MULTI_COLOR) {
      expect(ANIMATIONS[name]!.colors?.length).toBe(9);
    }
  });

  test('single-color presets have no colors array', () => {
    for (const name of SINGLE_COLOR) {
      expect(ANIMATIONS[name]!.colors).toBeUndefined();
    }
  });

  test('getAnimationNames returns array of strings', () => {
    const names = getAnimationNames();
    expect(Array.isArray(names)).toBe(true);
    for (const name of names) {
      expect(typeof name).toBe('string');
    }
  });
});
