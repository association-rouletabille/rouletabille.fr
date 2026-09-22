// Scoring for the standalone game. The score is simply how far you got, so
// there is nothing to award and nothing to lose — a faceplant ends the run,
// which is penalty enough.

// Scene pixels per displayed metre. Chosen so a decent run reads in the
// hundreds rather than the tens of thousands.
export const PX_PER_METRE = 20;

export function metres(distancePx, pxPerMetre = PX_PER_METRE) {
  return Math.floor(distancePx / pxPerMetre);
}

// Every SPEEDUP_EVERY metres the rider keeps SPEEDUP_RATE of its current
// speed on top. The cap is load-bearing: compounding against distance is a
// runaway that reaches infinite speed about 88s in.
export const SPEEDUP_EVERY = 100; // metres
export const SPEEDUP_RATE = 0.1; // +10% of the current speed
export const SPEED_CAP = 3;

export function speedFactor(distancePx, pxPerMetre = PX_PER_METRE) {
  const steps = Math.max(0, distancePx) / (SPEEDUP_EVERY * pxPerMetre);

  return Math.min(SPEED_CAP, (1 + SPEEDUP_RATE) ** steps);
}

// Grouped by hand rather than with toLocaleString, whose separator depends on
// how Node's ICU was built. The char code avoids a literal U+202F in source,
// which trips no-irregular-whitespace.
const NARROW_NBSP = String.fromCharCode(0x202f);

export function formatMetres(value) {
  const grouped = String(Math.round(value)).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    NARROW_NBSP,
  );

  return `${grouped} m`;
}

// localStorage hands back anything at all, so treat junk as no score yet.
export function parseBest(raw) {
  const value = Number.parseInt(raw, 10);

  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function nextBest(best, score) {
  return Math.max(parseBest(best), Math.max(0, Math.floor(score)));
}
