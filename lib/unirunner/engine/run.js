import { PLANT_ANGLE, TYRE_SPAN } from './constants.js';

// The stateless core of the running scene: where the rider is, whether it just
// hit something, and how far it has come.

// Whether a rock is touching the tyre's contact patch right now. `lift` is how
// far the tyre is off the ground, so a well timed hop passes straight over.
export function hitsRock(rock, tyre, lift) {
  const left = rock.x + rock.inset;

  return left < tyre.right && left + rock.w > tyre.left && lift < rock.h;
}

// The tyre's contact patch, in the rocks' coordinates. Narrower than the
// wheel: a full-width box registers hits the tyre is visibly past.
export function tyreBox(iconLeft, iconWidth) {
  return {
    left: iconLeft + iconWidth * TYRE_SPAN[0],
    right: iconLeft + iconWidth * TYRE_SPAN[1],
  };
}

// Over the handlebars quickly, a beat face down, then back up. `progress` runs
// 0 to 1 across the faceplant; the result is degrees.
export function plantAngle(progress) {
  if (progress <= 0 || progress >= 1) {
    return 0;
  }

  if (progress < 0.3) {
    return PLANT_ANGLE * (progress / 0.3);
  }

  return progress < 0.55
    ? PLANT_ANGLE
    : PLANT_ANGLE * (1 - (progress - 0.55) / 0.45);
}

// Gaps are divided by the speed-up but a hop is not, so past a certain speed
// two rocks land inside one hop. Floored at a hop and a bit.
export const REHOP_MARGIN = 1.15;

export function spacedGap(gapMs, speedUp, hopMs, margin = REHOP_MARGIN) {
  return Math.max(gapMs / speedUp, hopMs * margin);
}
