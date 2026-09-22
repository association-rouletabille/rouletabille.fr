import {
  GROUND_BASE,
  GROUND_BOX,
  GROUND_BUMP,
  GROUND_KNOT,
  GROUND_SPAN_MIN,
  ROCK_ANGLE_NOISE,
  ROCK_BASE,
  ROCK_BOX,
  ROCK_GAP_MAX,
  ROCK_GAP_MEAN,
  ROCK_GAP_MIN,
  ROCK_RADIUS_NOISE,
  ROCK_RX,
  ROCK_RY,
  ROCK_SIZE,
  SCENE_SPEED,
  TREE_GAP,
  TREE_SIZE,
  TREE_SPEED_MIN,
} from './constants.js';

// Everything the scenery is made of, as plain geometry. `random` is a
// parameter throughout so tests can pin it; callers pass nothing and get
// Math.random.

// A continuous line with gentle irregularities: random heights every
// GROUND_KNOT px, cosine-interpolated between them so it undulates instead of
// zig-zagging. The last knot wraps onto the first and the path is drawn twice,
// so sliding it by one tile repeats seamlessly. The noise only ever rises from
// the resting depth, so the unicycle runs at the lowest point and every bump
// passes in front of the tyre.
export function groundProfile(sceneWidth, random = Math.random) {
  const span = Math.max(GROUND_SPAN_MIN, Math.ceil(sceneWidth));
  const knots = Math.round(span / GROUND_KNOT);
  const rises = Array.from({ length: knots }, () => random() * GROUND_BUMP);

  const yAt = (x) => {
    const t = (x % span) / GROUND_KNOT;
    const i = Math.floor(t);
    const blend = (1 - Math.cos((t - i) * Math.PI)) / 2;
    return (
      GROUND_BASE -
      (rises[i % knots] * (1 - blend) + rises[(i + 1) % knots] * blend)
    );
  };

  // The offset wraps at `span`, so this is the most that can ever be on show.
  // Two full tiles would make the moving layer half as wide again for nothing.
  const width = span + Math.ceil(sceneWidth);

  let line = `M0 ${yAt(0).toFixed(2)}`;
  for (let x = 4; x <= width; x += 4) {
    line += ` L${x} ${yAt(x).toFixed(2)}`;
  }

  return {
    span,
    width,
    yAt,
    line,
    // Solid earth below the line, so it occludes the tyre on a rise rather
    // than just drawing over it.
    fill: `${line} L${width} ${GROUND_BOX} L0 ${GROUND_BOX} Z`,
    scrollMs: (span / SCENE_SPEED) * 1000,
  };
}

// The top half of an octagon: five corners from one side of the base to the
// other, each pushed off its regular angle and radius. The two that meet the
// ground keep their exact angle, so the rock still sits flat however the rest
// is nudged.
export function rockShape(random = Math.random) {
  const wobble = (amount) => (random() * 2 - 1) * amount;
  const corners = [];

  for (let i = 0; i <= 4; i++) {
    const onGround = i === 0 || i === 4;
    const degrees = i * 45 + (onGround ? 0 : wobble(ROCK_ANGLE_NOISE));
    const radians = (degrees * Math.PI) / 180;
    const reach = 1 + wobble(ROCK_RADIUS_NOISE);
    corners.push([
      ROCK_BOX[0] / 2 + Math.cos(radians) * ROCK_RX * reach,
      ROCK_BASE - Math.sin(radians) * ROCK_RY * reach,
    ]);
  }

  return {
    d: `M${corners.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')}Z`,
    left: Math.min(...corners.map(([x]) => x)),
    right: Math.max(...corners.map(([x]) => x)),
    top: Math.min(...corners.map(([, y]) => y)),
  };
}

// ROCK_SIZE is the height you can see, so the box is scaled around the shape.
// The hitbox comes from the same measurements, so it is the rock as drawn.
export function rockMetrics(shape, { scale = 1, random = Math.random } = {}) {
  const height =
    (ROCK_SIZE[0] + random() * (ROCK_SIZE[1] - ROCK_SIZE[0])) * scale;
  // viewBox units -> px, so the drawn rock is exactly `height` tall.
  const unit = height / (ROCK_BASE - shape.top);

  return {
    h: height,
    box: ROCK_BOX[1] * unit,
    inset: shape.left * unit, // from the svg's left edge to the rock's
    w: (shape.right - shape.left) * unit,
    span: ROCK_BOX[0] * unit, // the whole box, for knowing when it is gone
  };
}

export function nextTreeGap(random = Math.random) {
  return TREE_GAP[0] + random() * (TREE_GAP[1] - TREE_GAP[0]);
}

// Exponential gaps, so rocks arrive in clusters and lulls instead of on a
// near-metronome; the ceiling stops the tail from stalling the run.
export function nextRockGap(random = Math.random) {
  const gap = ROCK_GAP_MIN - Math.log(1 - random()) * ROCK_GAP_MEAN;
  return Math.min(ROCK_GAP_MAX, gap);
}

// Nearer trees are bigger, darker and pass faster: cheap parallax. `scale` is
// the rider's size relative to the footer's 5rem.
export function treeParams(
  sceneWidth,
  { scale = 1, random = Math.random } = {},
) {
  const depth = random();
  const height = (TREE_SIZE[0] + depth * (TREE_SIZE[1] - TREE_SIZE[0])) * scale;
  const travel = sceneWidth + height * 2;

  return {
    height,
    travel,
    depth,
    // The tree's speed as a fraction of the scene's, for callers that move it
    // frame by frame rather than with the animation. Free of scale, which
    // cancels out.
    parallax:
      (TREE_SPEED_MIN + depth * (SCENE_SPEED - TREE_SPEED_MIN)) / SCENE_SPEED,
    // How far towards the foreground colour the tree is mixed. Solid, not
    // alpha, so overlapping trees do not show through one another.
    tint: 0.15 + depth * 0.5,
    durationMs:
      (travel /
        ((TREE_SPEED_MIN + depth * (SCENE_SPEED - TREE_SPEED_MIN)) * scale)) *
      1000,
  };
}
