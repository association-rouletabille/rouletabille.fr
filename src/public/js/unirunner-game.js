import {
  PLAYER_HOP,
  SCENE_SPEED,
  TYRE_BOTTOM,
} from '/js/unirunner/constants.js';
import { bounceMs } from '/js/unirunner/physics.js';
import {
  groundProfile,
  nextRockGap,
  nextTreeGap,
  rockMetrics,
  rockShape,
  treeParams,
} from '/js/unirunner/terrain.js';
import { hitsRock, spacedGap, tyreBox } from '/js/unirunner/run.js';
import {
  BURST_SPEED,
  burstVelocities,
  debrisAt,
  settleMs,
} from '/js/unirunner/debris.js';
import {
  formatMetres,
  metres,
  nextBest,
  parseBest,
  speedFactor,
} from '/js/unirunner/score.js';
import {
  buildGround,
  dropRock,
  hopper,
  plantTree,
  snap,
  svgNode,
} from '/js/unirunner-scene.js';

// The playable version. Same scene and same physics as the footer easter egg;
// what differs is that you steer it, the distance is scored, and hitting a
// rock ends the run rather than costing a stumble.

const BEST_KEY = 'unirunner:best';
// From a char code: a literal one in source trips no-irregular-whitespace.
const NBSP = String.fromCharCode(0xa0);
const GROUND_FRACTION = 0.78; // where the ground sits down the viewport
const DEBRIS_FALL = 900; // px below the crash before the pieces are done
// The footer's rider size, which every engine distance is calibrated against.
const REFERENCE_RIDER = 80;

// localStorage throws in some privacy modes; a best is not worth crashing for.
const readBest = () => {
  try {
    return parseBest(localStorage.getItem(BEST_KEY));
  } catch {
    return 0;
  }
};

const writeBest = (value) => {
  try {
    localStorage.setItem(BEST_KEY, String(value));
  } catch {
    // Nothing to do: the run still counted, it just will not be remembered.
  }
};

export function start() {
  const stage = document.querySelector('.game');

  if (!stage) {
    return;
  }

  const rider = stage.querySelector('.uni-rider');
  const icon = rider.querySelector('svg');
  const scene = stage.querySelector('.uni-scene');
  const ground = stage.querySelector('.uni-ground');
  const proto = stage.querySelector('.uni-tree-proto svg');
  const panel = stage.querySelector('.game-panel');
  const result = stage.querySelector('.game-result');
  const tip = stage.querySelector('.game-tip');
  const goButton = stage.querySelector('.game-go');
  const distanceOut = stage.querySelector('.game-distance');
  const bestOut = stage.querySelector('.game-best');

  const body = icon.querySelector('.unicycle-body');
  const parts = [...icon.querySelectorAll('.uni-part')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hop = hopper();
  let tyre = null;
  let rocks = [];
  let trees = [];
  let debris = null;
  // `running` is the run, `scrolling` is the world: on a crash the scenery
  // carries on behind the panel.
  let running = false;
  let scrolling = false;
  let lastFrame = 0;
  let nextRockAt = 0;
  let treeTimer = null;
  let best = readBest();
  let scale = 1;
  let hopRise = PLAYER_HOP;
  let hopMs = bounceMs(PLAYER_HOP);
  let travelled = 0; // scene px at the reference speed: this is the score
  let factor = 1; // how much faster than that the run has become
  let groundSvg = null;
  let groundSpan = 0;
  let groundAt = 0;
  let shownDistance = '';
  let shownSpeed = 0;

  showBest();

  function showBest() {
    bestOut.hidden = best === 0;
    bestOut.textContent = best === 0 ? '' : `record ${formatMetres(best)}`;
  }

  function layout() {
    const box = stage.getBoundingClientRect();
    const groundY = box.height * GROUND_FRACTION;

    stage.style.setProperty('--ground-y', `${groundY.toFixed(2)}px`);

    // The icon letterboxes to its height, so its tyre sits at TYRE_BOTTOM of
    // it; place the rider so that point lands on the ground line. Everything
    // else scales off how much bigger than the footer it is drawn.
    const iconBox = icon.getBoundingClientRect();

    scale = iconBox.height / REFERENCE_RIDER;
    hopRise = PLAYER_HOP * scale;
    hopMs = bounceMs(hopRise);

    rider.style.transform = `translate(${(box.width * 0.22).toFixed(2)}px, ${(
      groundY -
      iconBox.height * TYRE_BOTTOM
    ).toFixed(2)}px)`;

    const placed = icon.getBoundingClientRect();
    tyre = {
      ...tyreBox(placed.left - box.left, placed.width),
      width: box.width,
    };
  }

  // The ground and the trees are scrolled from the loop rather than by the
  // shared css animations: an animation bakes its speed in, and everything
  // here has to stay in step as the run speeds up and a crash slows it again.
  function layGround() {
    const profile = groundProfile(tyre.width / scale);

    groundSvg = buildGround(ground, profile, scale);
    groundSvg.style.animationName = 'none';
    groundSpan = profile.span * scale;
    groundAt = 0;
  }

  function scrollGround(step) {
    groundAt = (groundAt + step) % groundSpan;
    groundSvg.style.transform = `translateX(${-snap(groundAt)}px)`;
  }

  function startTrees() {
    const tick = () => {
      if (!scrolling) {
        return;
      }

      const params = treeParams(tyre.width, { scale });
      const el = plantTree(scene, proto, params);

      el.style.animationName = 'none';
      trees.push({
        el,
        x: 0,
        travel: params.travel,
        parallax: params.parallax,
      });

      // Divided by the speed-up, so the spacing on the ground holds.
      treeTimer = setTimeout(tick, nextTreeGap() / factor);
    };
    tick();
  }

  function spawnRock() {
    const shape = rockShape();
    const metrics = rockMetrics(shape, { scale });
    const el = dropRock(scene, shape, metrics, tyre.width);

    rocks.push({ el, x: tyre.width, spent: false, ...metrics });
  }

  // A plain SVG transform attribute, which sidesteps transform-box and
  // transform-origin entirely.
  function explode(now) {
    const host = svgNode('g', { class: 'uni-debris' });
    const viewBox = icon.viewBox.baseVal;
    const unitsPerPx = viewBox.height / icon.getBoundingClientRect().height;
    const root = icon.getScreenCTM().inverse();

    // From the body rather than per part: it catches the wobble's live angle,
    // and a per-part read would double-apply any transform a part carried.
    const frame = root.multiply(body.getScreenCTM());
    const base = `matrix(${frame.a} ${frame.b} ${frame.c} ${frame.d} ${frame.e} ${frame.f})`;

    const pieces = parts.map((part) => {
      // The rotation sits left of `base`, so it happens in the icon's
      // coordinates and its centre has to be mapped out to them too.
      const bounds = part.getBBox();
      const centre = new DOMPoint(
        bounds.x + bounds.width / 2,
        bounds.y + bounds.height / 2,
      ).matrixTransform(root.multiply(part.getScreenCTM()));

      const wrapper = svgNode('g', { transform: base });
      wrapper.append(part);
      host.append(wrapper);

      return { wrapper, base, cx: centre.x, cy: centre.y, part };
    });

    icon.append(host);
    stage.dataset.uniCrashed = '';

    // The contact patch, in those same coordinates.
    const wheel = pieces.find(({ part }) => part.dataset.part === 'wheel');
    const impact = {
      x: (wheel ?? pieces[0]).cx,
      y: viewBox.height * TYRE_BOTTOM,
    };

    // Only the direction of each offset matters, so viewBox units are fine.
    const velocities = burstVelocities(
      pieces.map((piece) => ({
        dx: piece.cx - impact.x,
        dy: piece.cy - impact.y,
      })),
      { speed: BURST_SPEED * scale, carry: (SCENE_SPEED * scale) / 1000 },
    );

    debris = {
      start: now,
      unitsPerPx,
      pieces,
      velocities,
      until: now + settleMs(velocities, DEBRIS_FALL * scale),
    };
  }

  function drawDebris(now) {
    const t = now - debris.start;

    for (const [i, piece] of debris.pieces.entries()) {
      const { dx, dy, angle } = debrisAt(debris.velocities[i], t);
      piece.wrapper.setAttribute(
        'transform',
        `translate(${(dx * debris.unitsPerPx).toFixed(1)} ${(dy * debris.unitsPerPx).toFixed(1)}) ` +
          `rotate(${angle.toFixed(1)} ${piece.cx.toFixed(1)} ${piece.cy.toFixed(1)}) ` +
          piece.base,
      );
    }
  }

  function crash(now) {
    // `scrolling` stays on: the ground, the trees and the rocks carry on
    // behind the panel. Only the run itself is over.
    running = false;

    // Pin the crankset before the animation goes, or it snaps back to its
    // resting angle. CSSOM, so the CSP is fine with it.
    for (const el of icon.querySelectorAll(
      '.unicycle-cranks, .unicycle-pedal',
    )) {
      el.style.transform = getComputedStyle(el).transform;
    }

    delete stage.dataset.uniAwake;

    // `travelled` is unscaled on purpose: rock spacing scales with the
    // window, so bests stay comparable across screens.
    const score = metres(travelled);
    const record = nextBest(best, score);
    const beaten = record > best;
    best = record;
    writeBest(best);
    showBest();

    explode(now);

    // The scene carries on behind the panel, but back at its opening pace.
    factor = 1;
    shownSpeed = 0;
    stage.style.removeProperty('--uni-speed');

    result.hidden = false;
    result.textContent = beaten
      ? `${formatMetres(score)} — nouveau record${NBSP}!`
      : formatMetres(score);
    tip.textContent = `Record : ${formatMetres(best)}`;
    goButton.textContent = `Retry${NBSP}!`;
    panel.querySelector('.game-title').textContent = 'GAME OVER';

    // Let the pieces fly before the panel covers them.
    setTimeout(
      () => {
        panel.dataset.state = 'over';
        goButton.focus();
      },
      reduced ? 0 : 900,
    );
  }

  // Resetting an animation's duration restarts it, so step it coarsely: at
  // this spin rate the jump does not show.
  function showSpeed() {
    const step = Math.round(factor * 10);

    if (step !== shownSpeed) {
      shownSpeed = step;
      stage.style.setProperty('--uni-speed', ((4 * step) / 10).toFixed(2));
    }
  }

  function showDistance() {
    const text = formatMetres(metres(travelled));

    // Writing the same string back every frame still costs a repaint.
    if (text !== shownDistance) {
      shownDistance = text;
      distanceOut.textContent = text;
    }
  }

  function frame(now) {
    requestAnimationFrame(frame);

    const dt = Math.min(64, now - lastFrame);
    lastFrame = now;

    if (debris && now < debris.until) {
      drawDebris(now);
    }

    if (!scrolling) {
      return;
    }

    if (running) {
      travelled += (SCENE_SPEED * factor * dt) / 1000;
      factor = speedFactor(travelled);
      showSpeed();
      showDistance();
    }

    const step = (SCENE_SPEED * scale * factor * dt) / 1000;
    scrollGround(step);

    const height = running ? hop.height(now) : 0;
    const lift = -height;

    for (let i = trees.length - 1; i >= 0; i--) {
      const tree = trees[i];
      tree.x -= step * tree.parallax;
      tree.el.style.transform = `translateX(${snap(tree.x)}px)`;

      if (tree.x < -tree.travel) {
        tree.el.remove();
        trees.splice(i, 1);
      }
    }

    for (let i = rocks.length - 1; i >= 0; i--) {
      const rock = rocks[i];
      rock.x -= step;
      rock.el.style.transform = `translateX(${snap(rock.x)}px)`;

      if (running && !rock.spent && hitsRock(rock, tyre, lift)) {
        rock.spent = true;
        crash(now);
        return;
      }

      if (rock.x + rock.span < 0) {
        rock.el.remove();
        rocks.splice(i, 1);
      }
    }

    if (running) {
      icon.style.transform = `translateY(${height.toFixed(1)}px)`;
    }

    if (now >= nextRockAt) {
      spawnRock();
      // Scaled by the speed-up, but never tighter than a hop.
      nextRockAt = now + spacedGap(nextRockGap(), factor, hopMs);
    }
  }

  function reset() {
    scrolling = false;
    clearTimeout(treeTimer);
    travelled = 0;
    factor = 1;
    shownSpeed = 0;
    stage.style.removeProperty('--uni-speed');

    for (const rock of rocks) {
      rock.el.remove();
    }
    rocks = [];

    for (const tree of trees) {
      tree.el.remove();
    }
    trees = [];

    for (const el of icon.querySelectorAll(
      '.unicycle-cranks, .unicycle-pedal',
    )) {
      el.style.transform = '';
    }

    // Back where they belong, in document order, attributes untouched.
    const host = icon.querySelector('.uni-debris');
    if (host) {
      for (const part of parts) {
        body.append(part);
      }
      host.remove();
    }

    delete stage.dataset.uniCrashed;
    debris = null;
    hop.clear();
    icon.style.transform = '';
    shownDistance = '';
    showDistance();
  }

  function run() {
    reset();
    layout();
    layGround();

    stage.dataset.uniAwake = '';
    stage.dataset.uniRunning = '';
    panel.dataset.state = 'playing';
    result.hidden = true;

    running = true;
    scrolling = true;
    lastFrame = performance.now();
    nextRockAt = lastFrame + spacedGap(nextRockGap(), factor, hopMs);
    startTrees();
  }

  function jump() {
    if (running && !hop.airborne) {
      hop.start(performance.now(), hopMs, hopRise);
    }
  }

  goButton.addEventListener('click', run);

  stage.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.game-panel, .game-home')) {
      return;
    }
    jump();
  });

  addEventListener('keydown', (event) => {
    if (event.code !== 'Space' && event.code !== 'ArrowUp') {
      return;
    }
    // Space on the focused button should press it, not jump.
    if (event.target === goButton) {
      return;
    }
    event.preventDefault();
    jump();
  });

  addEventListener('resize', () => {
    if (running) {
      layout();
    }
  });

  layout();
  requestAnimationFrame(frame);
}
