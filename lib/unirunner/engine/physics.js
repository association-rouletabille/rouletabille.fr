import { GRAVITY } from './constants.js';

// The three primitives every arc in the scene is built from. Keeping them here
// means the flight, the bounces, the player's hop and the debris all fall at
// the same rate by construction rather than by coincidence.

// How long a symmetric bounce lasts: up to `rise` and back down again.
export function bounceMs(rise, gravity = GRAVITY) {
  return 2 * Math.sqrt((2 * rise) / gravity);
}

// A symmetric arc over `ms`, peaking `rise` above `base` at its midpoint and
// returning to `base` at each end. Screen coordinates, so "up" is negative.
export function arc(ms, rise, base = 0, gravity = GRAVITY) {
  return (t) => base - rise + 0.5 * gravity * (t - ms / 2) ** 2;
}

// Constant-velocity travel, which is what the horizontal half of a projectile
// always is.
export function glide(from, to, ms) {
  return (t) => from + ((to - from) * t) / ms;
}

// A throw that starts at 0 and arrives exactly at `to` after `ms`, following
// the same gravity on the way. Used for the leap onto the footer's links.
export function launch(to, ms, gravity = GRAVITY) {
  const initial = (to - 0.5 * gravity * ms ** 2) / ms;
  return (t) => initial * t + 0.5 * gravity * t * t;
}

// A free fall from rest starting at `from`.
export function drop(from, gravity = GRAVITY) {
  return (t) => from + 0.5 * gravity * t * t;
}

// How long that fall takes to cover `height`.
export function dropMs(height, gravity = GRAVITY) {
  return Math.sqrt((2 * Math.abs(height)) / gravity);
}
