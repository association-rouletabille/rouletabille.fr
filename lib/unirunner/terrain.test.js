import { expect, test } from 'vitest';

import {
  GROUND_BASE,
  GROUND_BUMP,
  ROCK_BOX,
  ROCK_GAP_MAX,
  ROCK_GAP_MIN,
  ROCK_SIZE,
  ROCK_STROKE,
  SCENE_SPEED,
  TREE_SPEED_MIN,
} from './engine/constants.js';
import {
  groundProfile,
  nextRockGap,
  rockMetrics,
  rockShape,
  treeParams,
} from './engine/terrain.js';

// A small deterministic PRNG so the generators can be pinned. Values are
// uniform in [0, 1) like Math.random.
function seeded(seed = 1) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
}

test('the ground tile joins itself, so scrolling by one span is seamless', () => {
  const { span, yAt } = groundProfile(900, seeded(7));
  expect(yAt(span)).toBeCloseTo(yAt(0), 10);
});

// The scroll wraps at `span`, so the path must reach a screen past it.
test('the drawn width covers a screenful past the wrap, and no more', () => {
  for (const sceneWidth of [320, 900, 2400]) {
    const { span, width } = groundProfile(sceneWidth, seeded(11));
    expect(width).toBeGreaterThanOrEqual(span + sceneWidth);
    expect(width).toBeLessThan(span * 2 + 1);
  }
});

test('the ground only ever rises from its resting depth', () => {
  const { span, yAt } = groundProfile(900, seeded(3));

  for (let x = 0; x <= span; x += 3) {
    // Screen coordinates: smaller y is higher up.
    expect(yAt(x)).toBeLessThanOrEqual(GROUND_BASE + 1e-9);
    expect(yAt(x)).toBeGreaterThanOrEqual(GROUND_BASE - GROUND_BUMP - 1e-9);
  }
});

test('the ground undulates rather than zig-zagging', () => {
  const { yAt } = groundProfile(900, seeded(11));
  let worst = 0;

  for (let x = 4; x <= 800; x += 4) {
    worst = Math.max(worst, Math.abs(yAt(x) - yAt(x - 4)));
  }

  // Cosine interpolation over 40px knots cannot step far in 4px.
  expect(worst).toBeLessThan(GROUND_BUMP / 4);
});

test('a rock is a five-cornered half octagon sitting flat on the ground', () => {
  const shape = rockShape(seeded(5));
  const corners = shape.d
    .slice(1, -1)
    .split('L')
    .map((pair) => pair.split(' ').map(Number));

  expect(corners).toHaveLength(5);
  // The two that meet the ground keep their exact angle, so the base is flat.
  expect(corners.at(0)[1]).toBeCloseTo(corners.at(-1)[1], 10);
});

// The outline is centred on the path, so a corner nearer the edge than half
// the stroke would be clipped by the viewBox.
test.each([1, 2, 3, 4, 5, 6, 7, 8])(
  'rock %i keeps its corners clear of the viewBox edges',
  (seed) => {
    const shape = rockShape(seeded(seed));
    const margin = ROCK_STROKE / 2;

    expect(shape.left).toBeGreaterThan(margin);
    expect(shape.right).toBeLessThan(ROCK_BOX[0] - margin);
    expect(shape.top).toBeGreaterThan(margin);
  },
);

test('the hitbox is the rock that was drawn, not its box', () => {
  const random = seeded(9);
  const shape = rockShape(random);
  const metrics = rockMetrics(shape, { random });

  expect(metrics.h).toBeGreaterThanOrEqual(ROCK_SIZE[0]);
  expect(metrics.h).toBeLessThanOrEqual(ROCK_SIZE[1]);
  // A box-derived hitbox would be the full span; the real one is narrower.
  expect(metrics.w).toBeLessThan(metrics.span);
  expect(metrics.inset).toBeGreaterThan(0);
});

test('rock gaps stay within their floor and ceiling', () => {
  const random = seeded(13);

  for (let i = 0; i < 500; i++) {
    const gap = nextRockGap(random);
    expect(gap).toBeGreaterThanOrEqual(ROCK_GAP_MIN);
    expect(gap).toBeLessThanOrEqual(ROCK_GAP_MAX);
  }
});

test('gaps are irregular rather than metronomic', () => {
  const random = seeded(17);
  const gaps = Array.from({ length: 400 }, () => nextRockGap(random));
  const mean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  const sd = Math.sqrt(
    gaps.reduce((a, g) => a + (g - mean) ** 2, 0) / gaps.length,
  );

  // A uniform 1400-3600 band had sd ~640ms; the exponential is far wider.
  expect(sd).toBeGreaterThan(1000);
});

// The game moves trees from its loop so they stay in step with the rocks as
// the run speeds up. That only works if their share of the scene's speed is
// free of the rider's size.
test('a tree keeps its share of the scene speed at any scale', () => {
  const plain = treeParams(600, { random: () => 0.4 });
  const zoomed = treeParams(600, { scale: 2.5, random: () => 0.4 });

  expect(zoomed.parallax).toBeCloseTo(plain.parallax, 10);
  expect(plain.parallax).toBeGreaterThan(TREE_SPEED_MIN / SCENE_SPEED - 1e-9);
  expect(plain.parallax).toBeLessThanOrEqual(1);
  expect(treeParams(600, { random: () => 1 }).parallax).toBeCloseTo(1, 10);
});

test('nearer trees are bigger, darker and quicker to cross', () => {
  const near = treeParams(600, { random: () => 0.95 });
  const far = treeParams(600, { random: () => 0.05 });

  expect(near.height).toBeGreaterThan(far.height);
  expect(near.tint).toBeGreaterThan(far.tint);
  expect(near.durationMs).toBeLessThan(far.durationMs);
});

test('scale zooms the scenery without changing its proportions', () => {
  const shape = rockShape(seeded(23));
  const plain = rockMetrics(shape, { random: () => 0.5 });
  const zoomed = rockMetrics(shape, { scale: 2.5, random: () => 0.5 });

  expect(zoomed.h).toBeCloseTo(plain.h * 2.5, 6);
  expect(zoomed.w / zoomed.h).toBeCloseTo(plain.w / plain.h, 6);

  const tree = treeParams(600, { random: () => 0.6 });
  const bigTree = treeParams(600, { scale: 2.5, random: () => 0.6 });

  expect(bigTree.height).toBeCloseTo(tree.height * 2.5, 6);
  expect(bigTree.tint).toBeCloseTo(tree.tint, 6);
});
