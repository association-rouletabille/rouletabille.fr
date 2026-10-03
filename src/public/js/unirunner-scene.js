import {
  GROUND_BASE,
  GROUND_BOX,
  ROCK_BOX,
  ROCK_STROKE,
} from '/js/unirunner/constants.js';
import { arc } from '/js/unirunner/physics.js';

// The DOM the footer easter egg and the game both build: same ground, same
// trees, same rocks, same hop. What differs between them — how fast the scene
// moves, and whether anything reads input — stays in their own modules.

const SVG_NS = 'http://www.w3.org/2000/svg';

export const svgNode = (tag, attributes) => {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [name, value] of Object.entries(attributes)) {
    node.setAttribute(name, value);
  }
  return node;
};

// One path a tile plus a screenful wide, so it can slide by a tile and repeat
// without a seam. `scale` draws it bigger without changing the geometry, which
// keeps the bumps the same size relative to the tyre. Returns the element, for
// the caller to scroll however it likes.
export function buildGround(ground, profile, scale = 1) {
  const svg = svgNode('svg', {
    viewBox: `0 0 ${profile.width} ${GROUND_BOX}`,
    width: profile.width * scale,
    height: GROUND_BOX * scale,
  });

  svg.style.top = `calc(var(--ground-y, 100%) - ${GROUND_BASE * scale}px)`;
  svg.append(
    svgNode('path', { d: profile.fill, class: 'uni-ground-fill' }),
    svgNode('path', { d: profile.line, class: 'uni-ground-line' }),
  );
  ground.replaceChildren(svg);

  return svg;
}

// Whole device pixels. A layer nudged by a fraction of one is re-rasterised
// every frame, which is what makes a scrolling scene judder on a phone;
// rounding to whole css pixels instead would be a 3px quantum there.
export const snap = (v) => {
  const ratio = devicePixelRatio || 1;
  return Math.round(v * ratio) / ratio;
};

export function plantTree(scene, proto, { height, depth, tint }) {
  const tree = proto.cloneNode(true);

  tree.removeAttribute('class');
  tree.classList.add('uni-tree');
  tree.style.height = `${height}px`;
  tree.style.top = `calc(var(--ground-y, 100%) - ${height}px)`;
  tree.style.setProperty('--tint', tint.toFixed(2));
  // Solid colours, so a nearer tree has to paint over a farther one.
  tree.style.zIndex = Math.round(depth * 100);
  scene.append(tree);

  return tree;
}

export function dropRock(scene, shape, metrics, x) {
  const rock = svgNode('svg', {
    viewBox: `0 0 ${ROCK_BOX[0]} ${ROCK_BOX[1]}`,
    class: 'uni-rock',
  });

  rock.style.height = `${metrics.box}px`;
  rock.style.top = `calc(var(--ground-y, 100%) - ${metrics.box}px)`;
  rock.style.transform = `translateX(${x}px)`;
  rock.append(svgNode('path', { d: shape.d, 'stroke-width': ROCK_STROKE }));
  scene.append(rock);

  return rock;
}

// The rider's hop. `height` is zero on the ground and negative in the air, and
// reading it is what ends the hop, so read it once a frame.
export function hopper() {
  let hop = null;

  return {
    get airborne() {
      return hop !== null;
    },
    start(now, ms, rise) {
      hop = { start: now, ms, at: arc(ms, rise) };
    },
    clear() {
      hop = null;
    },
    height(now) {
      if (!hop) {
        return 0;
      }

      const t = now - hop.start;
      if (t >= hop.ms) {
        hop = null;
        return 0;
      }

      return hop.at(t);
    },
  };
}
