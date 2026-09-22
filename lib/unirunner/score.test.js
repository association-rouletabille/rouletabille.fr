import { expect, test } from 'vitest';

import { SCENE_SPEED } from './engine/constants.js';
import {
  PX_PER_METRE,
  SPEEDUP_EVERY,
  SPEEDUP_RATE,
  SPEED_CAP,
  formatMetres,
  metres,
  nextBest,
  parseBest,
  speedFactor,
} from './engine/score.js';

const atMetres = (m) => speedFactor(m * PX_PER_METRE);

test('the run starts at its base speed', () => {
  expect(atMetres(0)).toBe(1);
});

test('each SPEEDUP_EVERY metres compounds on the speed already gained', () => {
  expect(atMetres(SPEEDUP_EVERY)).toBeCloseTo(1 + SPEEDUP_RATE, 10);
  expect(atMetres(2 * SPEEDUP_EVERY)).toBeCloseTo((1 + SPEEDUP_RATE) ** 2, 10);
  // Compounding, not linear: two steps beat two times one step's gain.
  expect(atMetres(2 * SPEEDUP_EVERY)).toBeGreaterThan(1 + 2 * SPEEDUP_RATE);
});

test('the speed-up is capped', () => {
  expect(atMetres(10_000)).toBe(SPEED_CAP);
  expect(atMetres(1e9)).toBe(SPEED_CAP);
});

// Why the cap exists: uncapped, the times form a converging series and the
// rider covers infinite ground in finite time.
test('a long run stays finite, which an uncapped ramp would not', () => {
  const step = 1000 / 60;
  let travelled = 0;

  for (let t = 0; t < 10 * 60 * 1000; t += step) {
    travelled += (SCENE_SPEED * speedFactor(travelled) * step) / 1000;
  }

  expect(Number.isFinite(travelled)).toBe(true);
  // Ten minutes at the capped speed, and not a metre more.
  expect(metres(travelled)).toBeLessThanOrEqual(
    metres(((SCENE_SPEED * SPEED_CAP) / 1000) * 10 * 60 * 1000),
  );
});

test('metres are floored, so the score never reads ahead of the rider', () => {
  expect(metres(PX_PER_METRE * 3.9)).toBe(3);
});

// By hand, not toLocaleString: its separator depends on Node's ICU build.
test('thousands are grouped with a narrow no-break space', () => {
  expect(formatMetres(7)).toBe('7 m');
  expect(formatMetres(999)).toBe('999 m');
  expect(formatMetres(1234)).toBe(`1${String.fromCharCode(0x202f)}234 m`);
});

test('a missing or junk best reads as no score yet', () => {
  expect(parseBest(null)).toBe(0);
  expect(parseBest('nope')).toBe(0);
  expect(parseBest('-5')).toBe(0);
  expect(parseBest('420')).toBe(420);
});

test('the best only ever goes up', () => {
  expect(nextBest(100, 40)).toBe(100);
  expect(nextBest(100, 140)).toBe(140);
});
