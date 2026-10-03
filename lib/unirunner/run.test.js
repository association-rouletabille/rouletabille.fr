import { expect, test } from 'vitest';

import {
  PLANT_ANGLE,
  PLAYER_HOP,
  ROCK_GAP_MIN,
  TYRE_SPAN,
} from './engine/constants.js';
import { burstVelocities, debrisAt, settleMs } from './engine/debris.js';
import { bounceMs } from './engine/physics.js';
import {
  REHOP_MARGIN,
  hitsRock,
  plantAngle,
  spacedGap,
  tyreBox,
} from './engine/run.js';
import {
  SPEED_CAP,
  formatMetres,
  metres,
  nextBest,
  parseBest,
} from './engine/score.js';

const tyre = tyreBox(100, 80);
const rock = { x: 0, inset: 2, w: 18, h: 12, spent: false };
const at = (x) => ({ ...rock, x });

test('the contact patch is narrower than the wheel it belongs to', () => {
  expect(tyre.left).toBeGreaterThan(100);
  expect(tyre.right).toBeLessThan(180);
  expect(tyre.right - tyre.left).toBeCloseTo(
    (TYRE_SPAN[1] - TYRE_SPAN[0]) * 80,
    9,
  );
});

test('a rock hits when it overlaps the patch at ground level', () => {
  expect(hitsRock(at(tyre.left - 40), tyre, 0)).toBe(false); // still ahead
  expect(hitsRock(at(tyre.left - 5), tyre, 0)).toBe(true); // overlapping
  expect(hitsRock(at(tyre.right + 5), tyre, 0)).toBe(false); // gone past
});

test('enough lift clears it, not quite enough does not', () => {
  const overlapping = at(tyre.left - 5);

  expect(hitsRock(overlapping, tyre, rock.h + 1)).toBe(false);
  expect(hitsRock(overlapping, tyre, rock.h - 1)).toBe(true);
});

test('the faceplant pitches over, holds, and comes back up', () => {
  expect(plantAngle(0)).toBe(0);
  expect(plantAngle(0.3)).toBeCloseTo(PLANT_ANGLE, 9);
  expect(plantAngle(0.45)).toBeCloseTo(PLANT_ANGLE, 9); // the beat face down
  expect(plantAngle(1)).toBe(0);
  expect(plantAngle(1.5)).toBe(0); // and stays put afterwards
});

test('the faceplant never leans further than its limit', () => {
  for (let p = 0; p <= 1; p += 0.01) {
    expect(plantAngle(p)).toBeGreaterThanOrEqual(0);
    expect(plantAngle(p)).toBeLessThanOrEqual(PLANT_ANGLE + 1e-9);
  }
});

test('metres round down so the score never overstates the run', () => {
  expect(metres(0)).toBe(0);
  expect(metres(19)).toBe(0);
  expect(metres(40)).toBe(2);
});

test('scores are formatted with a unit and a thousands separator', () => {
  const sep = String.fromCharCode(0x202f);

  expect(formatMetres(7)).toBe('7 m');
  expect(formatMetres(1240)).toBe(`1${sep}240 m`);
});

test('a missing or junk best score reads as no score yet', () => {
  expect(parseBest(null)).toBe(0);
  expect(parseBest('')).toBe(0);
  expect(parseBest('nope')).toBe(0);
  expect(parseBest('-5')).toBe(0);
  expect(parseBest('1240')).toBe(1240);
});

test('the best score only ever goes up', () => {
  expect(nextBest('1240', 900)).toBe(1240);
  expect(nextBest('1240', 3180)).toBe(3180);
  expect(nextBest(null, 12)).toBe(12);
});

const parts = [
  { dx: -20, dy: 6 }, // wheel, low and behind
  { dx: 4, dy: -30 }, // seat, up and forward
  { dx: 0, dy: 0 }, // something sitting on the impact point
  { dx: 14, dy: -4 },
];

test('every piece is thrown, including one sitting on the impact point', () => {
  const velocities = burstVelocities(parts, { random: () => 0.5 });

  expect(velocities).toHaveLength(parts.length);

  for (const v of velocities) {
    expect(Number.isFinite(v.vx)).toBe(true);
    expect(Number.isFinite(v.vy)).toBe(true);
    expect(Math.hypot(v.vx, v.vy)).toBeGreaterThan(0);
  }
});

test('pieces are thrown outwards, away from the impact', () => {
  const [wheel, seat] = burstVelocities(parts, { random: () => 0.5, carry: 0 });

  expect(wheel.vx).toBeLessThan(0); // it was behind, it keeps going back
  expect(seat.vx).toBeGreaterThan(0); // it was forward, it keeps going forward
  expect(seat.vy).toBeLessThan(0); // and upwards
});

test('the burst starts by going up, then gravity wins', () => {
  const [v] = burstVelocities([{ dx: 0, dy: -20 }], { random: () => 0.5 });

  const start = debrisAt(v, 0);
  expect(start.dx).toBeCloseTo(0, 9);
  expect(start.dy).toBeCloseTo(0, 9);
  expect(start.angle).toBeCloseTo(0, 9);
  expect(debrisAt(v, 60).dy).toBeLessThan(0); // still rising
  expect(debrisAt(v, 1200).dy).toBeGreaterThan(0); // come back down
});

test('pieces settle, so the debris can stop being drawn', () => {
  const velocities = burstVelocities(parts, { random: () => 0.5 });
  const ms = settleMs(velocities, 400);

  expect(ms).toBeGreaterThan(0);
  expect(Number.isFinite(ms)).toBe(true);

  for (const v of velocities) {
    expect(debrisAt(v, ms).dy).toBeGreaterThanOrEqual(400 - 1e-6);
  }
});

test('a gap shrinks with the speed-up while there is still room', () => {
  expect(spacedGap(3000, 2, 400)).toBe(1500);
});

test('but never below a hop and a bit, whatever the speed', () => {
  expect(spacedGap(3000, 10, 400)).toBeCloseTo(400 * REHOP_MARGIN, 10);
  expect(spacedGap(3000, 1000, 400)).toBeCloseTo(400 * REHOP_MARGIN, 10);
});

// At the cap the shipped numbers put the tightest gap inside a single hop.
test('the floor is what saves the tightest gap at the speed cap', () => {
  const hop = bounceMs(PLAYER_HOP);

  expect(ROCK_GAP_MIN / SPEED_CAP).toBeLessThan(hop);
  expect(spacedGap(ROCK_GAP_MIN, SPEED_CAP, hop)).toBeGreaterThan(hop);
});
