import { expect, test } from 'vitest';

import { LAUNCH_MS } from './engine/constants.js';
import {
  flightKeyframes,
  linksKeyframes,
  plan,
  sampleFlight,
} from './engine/flight.js';

// Measurements roughly as the footer produces them at desktop width: the
// unicycle leaps 181px right and 74px up onto the links, is carried 220px left
// as they slide away, then drops off to the right.
const measurements = {
  jumpX: 180.75,
  jumpY: -73.59,
  rideX: -39,
  fallX: 141.75,
  linksX: -219.75,
};

const flight = plan(measurements);

test('the flight starts at rest and ends standing on the ground', () => {
  expect(sampleFlight(flight, 0)).toEqual({ x: 0, y: 0 });

  const end = sampleFlight(flight, flight.total);
  expect(end.x).toBeCloseTo(measurements.fallX, 6);
  expect(end.y).toBeCloseTo(0, 6);
});

test('it arrives on the links exactly, not near them', () => {
  const onLanding = sampleFlight(flight, LAUNCH_MS);
  expect(onLanding.x).toBeCloseTo(measurements.jumpX, 6);
  expect(onLanding.y).toBeCloseTo(measurements.jumpY, 6);
});

test('the leap goes forward, onto the links where they still are', () => {
  // Targeting where the links are *about* to slide to sent it hopping
  // backwards; jumpX must be the positive, forward distance.
  expect(sampleFlight(flight, LAUNCH_MS).x).toBeGreaterThan(0);
});

test('the legs join up with no jump in position', () => {
  // Each leg must end exactly where the next one begins. Comparing the
  // endpoints is exact, where sampling either side of the boundary would just
  // measure however far the rider travels in the sampling interval.
  for (const [i, leg] of flight.legs.slice(0, -1).entries()) {
    const next = flight.legs[i + 1];

    expect(next.x(0)).toBeCloseTo(leg.x(leg.ms), 9);
    expect(next.y(0)).toBeCloseTo(leg.y(leg.ms), 9);
  }
});

test('it never dips below the ground mid-flight', () => {
  for (let t = 0; t <= flight.total; t += 5) {
    expect(sampleFlight(flight, t).y).toBeLessThanOrEqual(1e-6);
  }
});

test('the bounces on the links clear the links', () => {
  // Between landing and the drop it should rise above jumpY at least twice.
  const rises = [];
  let wasUp = false;

  for (let t = LAUNCH_MS; t <= flight.landsAt; t += 2) {
    const up = sampleFlight(flight, t).y < measurements.jumpY - 1;
    if (up && !wasUp) {
      rises.push(t);
    }
    wasUp = up;
  }

  expect(rises).toHaveLength(2);
});

test('acceleration is constant within a leg, which is what makes it a parabola', () => {
  const step = 4;
  const start = LAUNCH_MS + 40; // inside the first bounce, clear of boundaries
  const second = [];

  for (let t = start; t < start + 100; t += step) {
    const a = sampleFlight(flight, t - step).y;
    const b = sampleFlight(flight, t).y;
    const c = sampleFlight(flight, t + step).y;
    second.push(c - 2 * b + a);
  }

  for (const value of second) {
    expect(value).toBeCloseTo(second[0], 9);
  }
});

test('keyframes run from 0% to 100% and end where the flight ends', () => {
  const css = flightKeyframes('uni-flight-x', flight, 'x');

  expect(css.startsWith('@keyframes uni-flight-x{0.00%{')).toBe(true);
  expect(css).toContain(
    `100%{transform:translateX(${measurements.fallX.toFixed(2)}px)}`,
  );

  const stops = [...css.matchAll(/([\d.]+)%\{/g)].map((m) => Number(m[1]));
  const sorted = [...stops].sort((a, b) => a - b);
  expect(stops).toEqual(sorted);
});

test('the links hold still until it lands, then finish before it drops off', () => {
  const css = linksKeyframes('uni-links', flight, measurements.linksX);
  const pct = (ms) => `${((ms / flight.total) * 100).toFixed(2)}%`;

  // Still at 0 from the start until it has landed on them...
  expect(css).toContain(`0%,${pct(flight.rideStart)}{transform:translateX(0)}`);
  // ...then fully slid by the time it drops off, and held there.
  expect(css).toContain(
    `${pct(flight.rideStart + flight.rideMs)},100%{transform:translateX(${measurements.linksX.toFixed(2)}px)}`,
  );
});
