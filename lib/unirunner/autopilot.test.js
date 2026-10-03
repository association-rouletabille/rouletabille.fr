import { expect, test } from 'vitest';

import {
  clearable,
  clearanceWindow,
  idealLead,
  overlapMs,
  shouldHop,
} from './engine/autopilot.js';
import {
  PLAYER_HOP,
  ROCK_BOX,
  ROCK_SIZE,
  SCENE_SPEED,
  TYRE_SPAN,
} from './engine/constants.js';

const ICON_PX = 80; // the footer renders the unicycle at 5rem
const TYRE_WIDTH = (TYRE_SPAN[1] - TYRE_SPAN[0]) * ICON_PX;
const rockWidth = (height) => (height * ROCK_BOX[0]) / ROCK_BOX[1];

// The contract the passive footer rests on: every rock the generator can
// produce is clearable. A hop too low makes the tallest ones unjumpable.
test.each([ROCK_SIZE[0], (ROCK_SIZE[0] + ROCK_SIZE[1]) / 2, ROCK_SIZE[1]])(
  'a %ipx rock is clearable with the shipped hop',
  (height) => {
    const rock = { h: height, w: rockWidth(height) };
    expect(clearable(rock, TYRE_WIDTH)).toBe(true);
  },
);

test('a rock as tall as the hop is not clearable', () => {
  expect(clearanceWindow(PLAYER_HOP)).toBeNull();
  expect(clearable({ h: PLAYER_HOP, w: 10 }, TYRE_WIDTH)).toBe(false);
});

test('the clearance window shrinks as the rock grows', () => {
  const low = clearanceWindow(ROCK_SIZE[0]);
  const high = clearanceWindow(ROCK_SIZE[1]);
  expect(low[1] - low[0]).toBeGreaterThan(high[1] - high[0]);
});

test('the clearance window is centred on the apex', () => {
  const [start, end] = clearanceWindow(ROCK_SIZE[1]);
  const apex = (start + end) / 2;
  expect(apex).toBeCloseTo(idealLead() / (SCENE_SPEED / 1000), 6);
});

test('a wider hitbox keeps a rock inside it for longer', () => {
  expect(overlapMs(20, 40)).toBeGreaterThan(overlapMs(20, 26));
});

const tyre = { left: 100, right: 100 + TYRE_WIDTH };
const rockAt = (gap, height = ROCK_SIZE[1]) => {
  const w = rockWidth(height);
  const centre = (tyre.left + tyre.right) / 2;
  return { x: centre + gap - w / 2, inset: 0, w, h: height, spent: false };
};

test('holds while the rock is still far out', () => {
  expect(shouldHop([rockAt(idealLead() + 40)], tyre)).toBe(false);
});

test('hops once the rock reaches the ideal lead', () => {
  expect(shouldHop([rockAt(idealLead() - 1)], tyre)).toBe(true);
});

test('ignores rocks already dealt with, and ones already past', () => {
  const spent = { ...rockAt(idealLead() - 1), spent: true };
  expect(shouldHop([spent], tyre)).toBe(false);
  expect(shouldHop([rockAt(-40)], tyre)).toBe(false);
});

// Frame by frame: hop when the autopilot says to, and check the tyre stays
// above the rock for the whole overlap.
test.each([ROCK_SIZE[0], 11, ROCK_SIZE[1]])(
  'autopilot timing actually clears a %ipx rock',
  (height) => {
    const step = 1000 / 60;
    const pxPerFrame = (SCENE_SPEED * step) / 1000;
    const rock = rockAt(400, height);
    let hopStart = null;

    for (let t = 0; t < 4000; t += step) {
      if (hopStart === null && shouldHop([rock], tyre)) {
        hopStart = t;
      }

      const overlapping =
        rock.x + rock.inset < tyre.right &&
        rock.x + rock.inset + rock.w > tyre.left;

      if (overlapping) {
        expect(
          hopStart,
          'should have hopped before the rock arrived',
        ).not.toBeNull();
        const window = clearanceWindow(height);
        const into = t - hopStart;
        expect(into).toBeGreaterThanOrEqual(window[0]);
        expect(into).toBeLessThanOrEqual(window[1]);
      }

      rock.x -= pxPerFrame;
    }
  },
);

// The game scales the scenery and the scroll speed together, so overlap costs
// what it did in the footer while the hop, growing as sqrt(rise), buys more.
// Scaling sizes without the speed is what would make rocks unjumpable.
test.each([1.5, 2.5, 4])(
  'the tallest rock stays clearable at %fx the footer',
  (scale) => {
    const height = ROCK_SIZE[1] * scale;
    const rock = { h: height, w: rockWidth(height) };
    const margin = (s) => {
      const [start, end] = clearanceWindow(ROCK_SIZE[1] * s, PLAYER_HOP * s);
      return (
        (end - start) /
        overlapMs(rockWidth(ROCK_SIZE[1] * s), TYRE_WIDTH * s, SCENE_SPEED * s)
      );
    };

    expect(
      clearable(
        rock,
        TYRE_WIDTH * scale,
        PLAYER_HOP * scale,
        SCENE_SPEED * scale,
      ),
    ).toBe(true);
    expect(margin(scale)).toBeGreaterThan(margin(1));
  },
);
