import {
  EDGE,
  PLANT_MS,
  PLAYER_HOP,
  SCENE_SPEED,
  TAIL,
  TYRE_BOTTOM,
} from '/js/unirunner/constants.js';
import { bounceMs } from '/js/unirunner/physics.js';
import { flightKeyframes, linksKeyframes, plan } from '/js/unirunner/flight.js';
import {
  groundProfile,
  nextRockGap,
  nextTreeGap,
  rockMetrics,
  rockShape,
  treeParams,
} from '/js/unirunner/terrain.js';
import { hitsRock, plantAngle, tyreBox } from '/js/unirunner/run.js';
import { shouldHop } from '/js/unirunner/autopilot.js';
import {
  buildGround,
  dropRock,
  hopper,
  plantTree,
  snap,
} from '/js/unirunner-scene.js';

// The DOM half of the footer easter egg; the maths lives in /js/unirunner/.
// It plays itself and reads no input — the game is at /unirunner. Loaded on
// demand, since the footer is on every page.

// `style-src 'self'` blocks a script-created <style>'s contents, but not
// CSSOM. The element is the fallback where constructable sheets are missing.
function keyframeWriter() {
  if (
    'adoptedStyleSheets' in document &&
    'replaceSync' in CSSStyleSheet.prototype
  ) {
    const sheet = new CSSStyleSheet();
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    return (css) => sheet.replaceSync(css);
  }

  const el = document.createElement('style');
  document.head.append(el);
  return (css) => {
    el.textContent = css;
  };
}

// Fit the bulbs to the sign. Each side needs an even number of gaps between
// its corner bulbs: that puts both corners on the same ring, so all four blink
// together instead of the ends of each run falling into opposite phases.
function fitBulbs(play) {
  const style = getComputedStyle(play);
  const px = (name) => Number.parseFloat(style.getPropertyValue(name));
  const ring = px('--bulb-ring');
  const edge = px('--bulb-edge');
  const target = px('--bulb-gap');

  // clientWidth/clientHeight, not a client rect: the ring is inset from the
  // sign's padding box, which is what these give, and the rect would be the
  // bounding box of the tilt instead.
  const fit = (side) => {
    const span = side + 2 * ring - 2 * edge;
    const gaps = Math.max(2, Math.round(span / target / 2) * 2);
    return `${(span / gaps).toFixed(3)}px`;
  };

  play.style.setProperty('--bulb-x', fit(play.clientWidth));
  play.style.setProperty('--bulb-y', fit(play.clientHeight));
}

export function start(runner) {
  const rider = runner.querySelector('.uni-rider');
  const icon = rider?.querySelector('svg');
  const list = runner.querySelector('ul');
  const scene = runner.querySelector('.uni-scene');
  const ground = runner.querySelector('.uni-ground');
  const proto = runner.querySelector('.uni-tree-proto svg');

  if (!rider || !icon || !list || !scene || !ground || !proto) {
    return null;
  }

  const writeKeyframes = keyframeWriter();
  const rocks = [];
  const hop = hopper();
  let tyre = null; // the rider's hitbox, footer-relative and fixed once it lands
  let plant = null;
  let nextRockAt = 0;
  let lastFrame = 0;

  // The flight is pure physics, but its distances depend on where the links
  // actually sit, so they are measured at the last moment.
  function measure() {
    const f = runner.getBoundingClientRect();
    const r = rider.getBoundingClientRect();
    const l = list.getBoundingClientRect();
    const box = icon.getBoundingClientRect();
    const linksX = f.left + EDGE - l.left;
    const tyreBottom = box.top + box.height * TYRE_BOTTOM;

    return {
      width: f.width,
      linksX,
      // Forward, onto the links where they are now, not where they are about
      // to slide to, which would send it hopping backwards.
      jumpX: l.left + l.width / 2 - (r.left + r.width / 2),
      jumpY: l.top - tyreBottom,
      // Carried along as the links slide out from under it.
      rideX: l.left + linksX + l.width / 2 - (r.left + r.width / 2),
      fallX: l.right + linksX + TAIL - r.left,
      groundY: tyreBottom - f.top,
    };
  }

  // The scene runs at one fixed speed here, so the ground and the trees can
  // ride css animations rather than the loop.
  function layGround(sceneWidth) {
    const profile = groundProfile(sceneWidth);
    const svg = buildGround(ground, profile);

    svg.style.setProperty('--ground-span', `${profile.span}px`);
    svg.style.animationDuration = `${profile.scrollMs}ms`;
  }

  function startTrees(sceneWidth) {
    const tick = () => {
      const params = treeParams(sceneWidth);
      const tree = plantTree(scene, proto, params);

      tree.style.setProperty('--travel', `${params.travel}px`);
      tree.style.animationDuration = `${params.durationMs}ms`;
      tree.addEventListener('animationend', () => tree.remove());

      setTimeout(tick, nextTreeGap());
    };
    tick();
  }

  function spawnRock(sceneWidth) {
    const shape = rockShape();
    const metrics = rockMetrics(shape);
    const el = dropRock(scene, shape, metrics, sceneWidth);

    rocks.push({ el, x: sceneWidth, spent: false, ...metrics });
  }

  function plantDegrees(now) {
    if (!plant) {
      return 0;
    }

    const progress = (now - plant.start) / PLANT_MS;
    if (progress >= 1) {
      plant = null;
      return 0;
    }

    return plantAngle(progress);
  }

  function frame(now) {
    requestAnimationFrame(frame);

    const dt = Math.min(64, now - lastFrame); // a backgrounded tab must not teleport them
    lastFrame = now;
    const height = hop.height(now); // reads once: it ends the hop
    const lift = -height;

    // Derived rather than tuned, so it never misses.
    if (!hop.airborne && !plant && shouldHop(rocks, tyre)) {
      hop.start(now, bounceMs(PLAYER_HOP), PLAYER_HOP);
    }

    for (let i = rocks.length - 1; i >= 0; i--) {
      const rock = rocks[i];
      rock.x -= (SCENE_SPEED * dt) / 1000;
      rock.el.style.transform = `translateX(${snap(rock.x)}px)`;

      // Timed right, the tyre is higher than the rock as it passes underneath.
      if (!rock.spent && !plant && hitsRock(rock, tyre, lift)) {
        rock.spent = true;
        plant = { start: now };
      }

      if (rock.x + rock.span < 0) {
        rock.el.remove();
        rocks.splice(i, 1);
      }
    }

    icon.style.transform = `translateY(${height.toFixed(1)}px) rotate(${plantDegrees(now).toFixed(1)}deg)`;

    if (now >= nextRockAt) {
      spawnRock(tyre.sceneWidth);
      nextRockAt = now + nextRockGap();
    }
  }

  // Hand over from the flight's keyframes to the loop. The inline transforms
  // go on first, or everything snaps back when the stage changes.
  function startRun(m) {
    rider.style.transform = `translateX(${m.fallX.toFixed(2)}px)`;
    icon.style.transform = 'translateY(0)';
    list.style.transform = `translateX(${m.linksX.toFixed(2)}px)`;
    runner.dataset.uniStage = '3';

    const f = runner.getBoundingClientRect();
    const box = icon.getBoundingClientRect();
    tyre = { ...tyreBox(box.left - f.left, box.width), sceneWidth: m.width };

    lastFrame = performance.now();
    nextRockAt = lastFrame + nextRockGap();
    requestAnimationFrame(frame);
  }

  // All in place before the stage flips, so no animation starts against a
  // half-written stylesheet.
  const m = measure();
  const flight = plan(m);

  writeKeyframes(
    [
      flightKeyframes('uni-flight-x', flight, 'x'),
      flightKeyframes('uni-flight-y', flight, 'y'),
      linksKeyframes('uni-links', flight, m.linksX),
    ].join(''),
  );

  const play = runner.querySelector('.uni-play');
  if (play) {
    fitBulbs(play);
    addEventListener('resize', () => fitBulbs(play));
  }

  runner.style.setProperty('--uni-flight', `${Math.round(flight.total)}ms`);
  runner.style.setProperty('--ground-y', `${m.groundY.toFixed(2)}px`);
  layGround(m.width);

  runner.dataset.uniStage = '2';
  setTimeout(() => {
    runner.dataset.uniRunning = '';
    startTrees(m.width);
  }, flight.landsAt);
  setTimeout(() => startRun(m), flight.total);

  return true;
}
