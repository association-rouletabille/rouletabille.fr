# lib/unirunner/

The shared core of the unicycle runner, which appears twice on the site: as a
self-playing easter egg in the footer, and as the game at `/unirunner`.

Everything under `engine/` is pure — no DOM, no timers, no `Math.random`
unless you pass it in — so it is testable under vitest's default node
environment, and so the two front ends cannot drift apart. The DOM half lives
in `src/public/js/`: `unirunner-scene.js` for what both front ends build (the
ground, the trees, the rocks, the hop), and `unirunner-footer.js` /
`unirunner-game.js` for what only one of them does.

| Module         | What it owns                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| `constants.js` | Every tunable, so the footer and the game share one set                                                |
| `physics.js`   | `arc`, `glide`, `launch`, `drop`, `bounceMs` — one gravity for every trajectory in the scene           |
| `flight.js`    | The footer's opening leap onto the social links, planned as projectile legs and sampled into keyframes |
| `terrain.js`   | The scrolling ground profile, rock shapes, rock sizing and spacing, tree parallax                      |
| `run.js`       | Collision against the tyre's contact patch, the faceplant curve, the rock-gap floor                    |
| `autopilot.js` | The footer's self-play timing, and whether a rock is clearable at all                                  |
| `score.js`     | Distance to metres, the run's speed-up and its cap, formatting, the persisted best                     |
| `debris.js`    | Where the pieces go when the game's unicycle comes apart                                               |

## Why the maths is tested

These numbers interact in ways that are not obvious by looking at them. During
development the hop apex was set to 26px, which quietly made the tallest rocks
**impossible** to clear: the tyre stayed above a 15px rock for 235ms, but the
rock sat inside the hitbox for 268ms. Nothing errored; the game was simply
unfair, and it took a browser session to notice.

`autopilot.clearable()` states that relationship directly, and
`autopilot.test.js` asserts it for every rock size the generator can produce —
including a frame-by-frame simulation that walks a rock in at 60fps and checks
the tyre is above it for every frame of the overlap. Change `PLAYER_HOP`,
`ROCK_SIZE`, `SCENE_SPEED` or `TYRE_SPAN` and that test tells you whether the
game is still winnable.

The same reasoning covers the rest: the ground tile has to join itself or the
scroll seams, rock corners have to stay clear of the viewBox or the outline
clips, and the flight's legs have to meet or the unicycle teleports.
