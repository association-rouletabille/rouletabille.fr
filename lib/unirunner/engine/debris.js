import { GRAVITY, SCENE_SPEED } from './constants.js';

// When the game's unicycle hits a rock it comes apart. Each piece is thrown
// outwards from the point of impact and then falls under the same gravity as
// everything else in the scene, so the debris belongs to the same world as the
// flight and the hop rather than looking like a separate effect.

// Tuned so the pieces arc across the screen instead of clearing the top of
// the window in a blink.
export const BURST_SPEED = 0.25; // px/ms at the impact point
const SPIN = 0.35; // deg/ms, scaled by how hard a piece is thrown
const UP_BIAS = 0.7; // share of BURST_SPEED added straight upwards

// `parts` are the pieces' centres relative to the impact point, in px.
// Returns one velocity per part, in the same order.
export function burstVelocities(parts, options = {}) {
  const {
    random = Math.random,
    speed = BURST_SPEED,
    carry = SCENE_SPEED / 1000, // the scene's own leftward drift
    spin = SPIN,
  } = options;

  return parts.map(({ dx, dy }) => {
    // Throw each piece along the line from the impact through its centre, so
    // the wheel goes where the wheel already was. Pieces sitting exactly on
    // the impact point get a straight-up nudge instead of a divide by zero.
    const length = Math.hypot(dx, dy) || 1;
    const outward = length > 1 ? speed : speed * 0.6;
    const jitter = 0.7 + random() * 0.6;

    return {
      // Everything keeps drifting backwards with the scene it was running in.
      vx: (dx / length) * outward * jitter - carry,
      // Bias upwards: a crash throws things up, and gravity brings them back.
      vy: (dy / length) * outward * jitter - speed * UP_BIAS,
      omega: (random() * 2 - 1) * spin,
    };
  });
}

// Where a piece is, and how far it has turned, `t` ms after the crash.
export function debrisAt({ vx, vy, omega }, t, gravity = GRAVITY) {
  return {
    dx: vx * t,
    dy: vy * t + 0.5 * gravity * t * t,
    angle: omega * t,
  };
}

// How long until every piece has fallen `depth` px below where it started,
// which is when they can stop being drawn.
export function settleMs(velocities, depth, gravity = GRAVITY) {
  return velocities.reduce((longest, { vy }) => {
    // Solve 0.5·g·t² + vy·t − depth = 0 for the positive root.
    const t = (-vy + Math.sqrt(vy * vy + 2 * gravity * depth)) / gravity;
    return Math.max(longest, t);
  }, 0);
}
