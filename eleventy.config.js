import process from 'node:process';
import { Buffer } from 'node:buffer';

import pluginWebc from '@11ty/eleventy-plugin-webc';
import dirOutputPlugin from '@11ty/eleventy-plugin-directory-output';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

import pluginIcons from 'eleventy-plugin-icons';

import minifyHtml from '@minify-html/node';
import { transform } from 'lightningcss';

function transformCSS(content) {
  if (this.type !== 'css') {
    return content;
  }

  const { code, warnings } = transform({
    code: Buffer.from(content),
    minify: true,
  });

  if (warnings.length > 0) {
    throw new Error(warnings.toString());
  }

  return code;
}

// The same icon can be inlined several times in one page.
// Each copy carries the ids of its own gradients and clip paths,
// so the later copies end up referencing the first copy's definitions.
// That breaks as soon as the first copy is not rendered:
// below 800px the header nav is `display: none`, and a hidden subtree exposes
// no paint servers or clip paths, so the footer logo painted nothing.
// Renaming the ids of every repeated occurrence makes each inline SVG
// self-contained.
function transformSVGIds(content, outputPath) {
  if (!outputPath.endsWith('.html')) {
    return content;
  }

  const seen = new Set();
  let copy = 0;

  return content.replace(/<svg\b[\s\S]*?<\/svg>/g, (svg) => {
    const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    const duplicates = new Set(ids.filter((id) => seen.has(id)));

    for (const id of ids) {
      seen.add(id);
    }

    if (duplicates.size === 0) {
      return svg;
    }

    const suffix = `-${++copy}`;

    return [...duplicates].reduce((markup, id) => {
      const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      seen.add(id + suffix);

      return markup
        .replace(
          new RegExp(`(\\sid=")${escaped}(")`, 'g'),
          `$1${id}${suffix}$2`,
        )
        .replace(
          new RegExp(`url\\(#${escaped}\\)`, 'g'),
          `url(#${id}${suffix})`,
        )
        .replace(
          new RegExp(`((?:\\sxlink:href|\\shref)=")#${escaped}(")`, 'g'),
          `$1#${id}${suffix}$2`,
        );
    }, svg);
  });
}

function transformHTML(content, outputPath) {
  if (!outputPath.endsWith('.html')) {
    return content;
  }

  const minified = minifyHtml.minify(Buffer.from(content), {});

  return minified;
}

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(dirOutputPlugin);

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // output image formats
    formats: ['avif', 'webp', 'jpeg'],

    // output image widths
    widths: [400, 600, 800, 1200, 1600],

    sharpAvifOptions: {
      quality: 80,
      effort: 9,
      chromaSubsampling: '4:4:4',
    },

    sharpWebpOptions: {
      quality: 90,
      effort: 6,
    },

    sharpJpegOptions: {
      quality: 92,
      mozjpeg: true,
      chromaSubsampling: '4:4:4',
      progressive: true,
    },

    // optional, attributes assigned on <img> nodes override these values
    htmlOptions: {
      imgAttributes: {
        decoding: 'async',
      },
      pictureAttributes: {},
    },
  });

  eleventyConfig.addPlugin(pluginIcons, {
    mode: 'inline',
    sources: [{ name: 'custom', path: './src/assets', default: true }],
  });

  eleventyConfig.addPlugin(pluginWebc, {
    components: ['./src/_includes/webc/*.webc'],
    bundlePluginOptions: {
      transforms: [transformCSS],
    },
  });

  eleventyConfig.addTransform('svgids', transformSVGIds);
  eleventyConfig.addTransform('htmlmin', transformHTML);

  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });

  eleventyConfig.addGlobalData('deployedAt', () =>
    new Date().toISOString().substring(0, 10),
  );

  eleventyConfig.addGlobalData('commitSha', () =>
    (process.env.COMMIT_SHA || 'deadbeefc0ffee').substring(0, 7),
  );

  return {
    htmlTemplateEngine: 'webc',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
}
