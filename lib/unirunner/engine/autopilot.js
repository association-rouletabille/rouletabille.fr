import { GRAVITY, PLAYER_HOP, SCENE_SPEED } from './constants.js';
import { bounceMs } from './physics.js';

// The footer's unicycle plays itself. It also has to *never miss*, because an
// ambient animation that trips over is a bug rather than a flourish — so the
// timing here is derived rather than tuned.

// The window within a hop during which the tyre is higher than `height`.
// Returns times in ms from the hop's start.
export function clearanceWindow(height, rise = PLAYER_HOP, gravity = GRAVITY) {
  if (height >= rise) {
    return null; // never gets above it
  }

  const ms = bounceMs(rise, gravity);
  const half = Math.sqrt((2 * (rise - height)) / gravity);
  return [ms / 2 - half, ms / 2 + half];
}

// How long a rock of this size spends overlapping the tyre's contact patch.
export function overlapMs(rockWidth, tyreWidth, speed = SCENE_SPEED) {
  return ((tyreWidth + rockWidth) / speed) * 1000;
}

// Whether a rock can be cleared at all: the tyre must stay above it for longer
// than it spends inside the hitbox. This is the guard that caught a 26px hop
// leaving the tallest rocks mathematically unjumpable.
export function clearable(
  rock,
  tyreWidth,
  rise = PLAYER_HOP,
  speed = SCENE_SPEED,
) {
  const window = clearanceWindow(rock.h, rise);

  if (!window) {
    return false;
  }

  return window[1] - window[0] > overlapMs(rock.w, tyreWidth, speed);
}

// Launch the hop so its apex lands on the rock: the rock has to travel from
// where it is now to the tyre in half a hop.
export function idealLead(rise = PLAYER_HOP, speed = SCENE_SPEED) {
  return (speed * (bounceMs(rise) / 2)) / 1000;
}

// Given the rocks still on their way in, decide whether to hop this frame.
// `rocks` carry the same shape the run loop keeps: { x, inset, w, h, spent }.
export function shouldHop(rocks, tyre, rise = PLAYER_HOP, speed = SCENE_SPEED) {
  const lead = idealLead(rise, speed);
  const centre = (tyre.left + tyre.right) / 2;

  for (const rock of rocks) {
    if (rock.spent) {
      continue;
    }

    const gap = rock.x + rock.inset + rock.w / 2 - centre;

    // Hop once the rock is at (or just past) the ideal lead. The lower bound
    // keeps a rock that is already on top of the tyre from triggering a hop
    // that could never clear it.
    if (gap <= lead && gap > 0) {
      return true;
    }
  }

  return false;
}
