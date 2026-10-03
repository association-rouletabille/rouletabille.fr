import {
  BOUNCES,
  FALL_SHARE,
  LANDING_HOP,
  LAUNCH_MS,
  STOPS,
} from './constants.js';
import { arc, bounceMs, drop, dropMs, glide, launch } from './physics.js';

// The footer's opening flourish: the unicycle leaps onto the social links,
// bounces there while they slide out from under it, then drops off the end.
// Only the footer uses this — the game page just starts running.
//
// Every leg is a real projectile: horizontal speed constant, vertical position
// quadratic. Nothing here stands in for gravity with an easing.

export function plan(m) {
  const rideMs = BOUNCES.reduce((total, rise) => total + bounceMs(rise), 0);
  const fallMs = dropMs(m.jumpY);
  const touchX = m.rideX + (m.fallX - m.rideX) * FALL_SHARE;
  const hopMs = bounceMs(LANDING_HOP);
  // One continuous slide across both bounces, sampled per leg below.
  const ride = glide(m.jumpX, m.rideX, rideMs);
  let ridden = 0;

  const legs = [
    // Thrown up so that it arrives exactly on the links' top edge.
    {
      ms: LAUNCH_MS,
      x: glide(0, m.jumpX, LAUNCH_MS),
      y: launch(m.jumpY, LAUNCH_MS),
    },
    // Bouncing on them while they slide out from underneath.
    ...BOUNCES.map((rise) => {
      const ms = bounceMs(rise);
      const from = ridden;
      ridden += ms;
      return { ms, x: (t) => ride(from + t), y: arc(ms, rise, m.jumpY) };
    }),
    // Off the end, carrying its speed into the drop. It touches down short of
    // its final spot so the last bounce still carries it forward.
    { ms: fallMs, x: glide(m.rideX, touchX, fallMs), y: drop(m.jumpY) },
    // And one hop on the ground rather than sticking where it lands.
    { ms: hopMs, x: glide(touchX, m.fallX, hopMs), y: arc(hopMs, LANDING_HOP) },
  ];

  const landsAt = LAUNCH_MS + rideMs + fallMs;

  return {
    legs,
    rideStart: LAUNCH_MS,
    rideMs,
    landsAt,
    total: landsAt + hopMs,
  };
}

const pct = (fraction) => `${(fraction * 100).toFixed(2)}%`;

// The arcs are sampled into keyframes rather than approximated with easings,
// so the CSS animation that plays them is `linear` — the shape is in the stops.
export function flightKeyframes(name, { legs, total }, axis) {
  const move = (leg, t) =>
    `transform:translate${axis.toUpperCase()}(${leg[axis](t).toFixed(2)}px)`;
  let stops = '';
  let elapsed = 0;

  for (const leg of legs) {
    for (let i = 0; i < STOPS; i++) {
      const t = (leg.ms * i) / STOPS;
      stops += `${pct((elapsed + t) / total)}{${move(leg, t)}}`;
    }
    elapsed += leg.ms;
  }

  const last = legs.at(-1);
  stops += `100%{${move(last, last.ms)}}`;

  return `@keyframes ${name}{${stops}}`;
}

// The links slide only while the unicycle is up there bouncing on them.
export function linksKeyframes(name, { rideStart, rideMs, total }, linksX) {
  return (
    `@keyframes ${name}{0%,${pct(rideStart / total)}{transform:translateX(0)}` +
    `${pct((rideStart + rideMs) / total)},100%{transform:translateX(${linksX.toFixed(2)}px)}}`
  );
}

// Sample a planned flight at an absolute time, which is what the tests use to
// check the legs join up. Returns null past the end.
export function sampleFlight({ legs }, at) {
  let elapsed = 0;

  for (const leg of legs) {
    if (at <= elapsed + leg.ms) {
      const t = at - elapsed;
      return { x: leg.x(t), y: leg.y(t) };
    }
    elapsed += leg.ms;
  }

  return null;
}
