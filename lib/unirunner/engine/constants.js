// Every tunable the unirunner scene shares, in one place so the footer easter
// egg and the standalone game cannot drift apart.

// One gravity governs every arc in the scene: the flight onto the footer
// links, the bounces, the player's hop and the debris after a crash.
export const GRAVITY = 0.0016; // px/ms²

// --- the flight onto the footer's links (footer only) ---
export const LAUNCH_MS = 500; // time spent getting up onto the links
export const BOUNCES = [14, 6]; // apex heights above the links, px
export const LANDING_HOP = 10; // one last bounce where it meets the ground, px
export const FALL_SHARE = 0.7; // how much of the drop is covered before that hop
export const STOPS = 24; // keyframe samples per leg of the flight
export const EDGE = 8; // gap left between the links and the footer edge
export const TAIL = 24; // gap left between the links and the landed unicycle

// --- the run ---
export const SCENE_SPEED = 250; // px/s, for the ground and the nearest trees

// Tall enough that every rock size is clearable: the tyre has to stay above a
// rock for longer than the rock spends inside its hitbox, or the obstacle
// would be unwinnable. At 26px a 15px rock was exactly that. `clearable()` in
// ./autopilot.js is the guard that keeps this true.
export const PLAYER_HOP = 40; // apex of the hop, px
export const PLANT_MS = 520; // faceplant and recovery
export const PLANT_ANGLE = 74; // degrees pitched over the handlebars

// The contact patch, as fractions of the icon's width, deliberately narrower
// than the wheel. At full width a descent registers a hit against a rock the
// tyre is visibly past, because only the bottom of a round wheel is ever near
// the ground.
export const TYRE_SPAN = [0.25, 0.58];
// The icon letterboxes to its height and the tyre's outer edge sits at this
// fraction of it; below that is empty viewBox, which is what would make the
// unicycle hover over whatever it is supposed to be standing on.
export const TYRE_BOTTOM = 0.95;

// --- rocks ---
// Exponential gaps, so they arrive in clusters and lulls instead of on a
// near-metronome. The floor keeps two from landing on top of each other, and
// the ceiling stops the tail from stalling the run.
export const ROCK_GAP_MIN = 1300; // ms
export const ROCK_GAP_MEAN = 1700; // ms on top of the floor
export const ROCK_GAP_MAX = 6000; // ms
export const ROCK_SIZE = [8, 14]; // visible height in px
export const ROCK_BOX = [100, 70]; // viewBox each one is drawn in
// Well inside that box: the noise pushes corners outwards, and the outline is
// 2 non-scaling px, which on the smallest rock is ~18 viewBox units thick. Too
// close to the edge and both get clipped.
export const ROCK_RX = 35;
export const ROCK_RY = 48;
export const ROCK_STROKE = 6; // viewBox units, so it scales with the rock
export const ROCK_BASE = 70; // the base sits on the box's bottom edge
export const ROCK_ANGLE_NOISE = 9; // degrees either way
export const ROCK_RADIUS_NOISE = 0.14; // fraction either way

// --- ground ---
export const GROUND_BOX = 28; // svg box height, most of it fill below the line
export const GROUND_BASE = 12; // the line's resting depth within that box
export const GROUND_BUMP = 4; // how far it rises, about one tyre thickness
export const GROUND_KNOT = 40; // px between noise samples
export const GROUND_SPAN_MIN = 1200; // px, the minimum repeating tile

// --- trees ---
export const TREE_SIZE = [26, 80]; // px tall, near trees at the top of the range
export const TREE_SPEED_MIN = 90; // px/s for the most distant ones
export const TREE_GAP = [260, 960]; // ms between them
