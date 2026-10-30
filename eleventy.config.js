import process from 'node:process';
import { Buffer } from 'node:buffer';
import {
  cpSync,
  existsSync,
  globSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { basename, join, resolve } from 'node:path';

import pluginWebc from '@11ty/eleventy-plugin-webc';
import dirOutputPlugin from '@11ty/eleventy-plugin-directory-output';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

import pluginIcons from 'eleventy-plugin-icons';

import minifyHtml from '@minify-html/node';
import { transform } from 'lightningcss';

import { generateLlmsFull } from './lib/llms-full/index.js';
import {
  canonicalHeaders,
  createHtmlRenderer,
  createMarkdownRenderer,
  hasMarkdownVersion,
  markdownUrl,
  resolvePermalink,
} from './lib/markdown-pages/index.js';
import markdownComponents from './src/_config/markdown-components.js';

const WEBC_COMPONENTS = './src/_includes/webc/*.webc';
const HEADERS = './src/public/_headers';

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
  const CACHE_DIR = '.cache/@11ty/img/';
  const URL_PATH = '/img/';

  eleventyConfig.addPlugin(dirOutputPlugin);

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // output image formats
    formats: ['avif', 'webp', 'jpeg'],

    // output image widths
    widths: [400, 600, 800, 1200, 1600],

    outputDir: CACHE_DIR,
    urlPath: URL_PATH,
    useCache: true,

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
    components: [WEBC_COMPONENTS],
    bundlePluginOptions: {
      transforms: [transformCSS],
    },
  });

  // Pages are authored in Markdown and published twice: as HTML, and as
  // Markdown at /<page>.md. See lib/markdown-pages/README.md.
  //
  // The component names are listed again before each page is rendered, so
  // that a component added while serving is recognised without a restart.
  const componentNames = new Set();
  const refreshComponentNames = () => {
    componentNames.clear();

    for (const file of globSync(WEBC_COMPONENTS)) {
      componentNames.add(basename(file, '.webc'));
    }
  };
  const renderHtml = createHtmlRenderer(componentNames);
  const renderMarkdown = createMarkdownRenderer(
    componentNames,
    markdownComponents,
  );

  // The Markdown is turned into HTML first, then compiled by the WebC engine
  // (which inlines the components and bundles their CSS and JS). The other way
  // around, WebC would mangle the Markdown before it gets rendered. The
  // source is kept aside for the page's Markdown version.
  //
  // Every template is therefore rendered by WebC, .md ones included. WebC
  // would then also render front matter permalinks as templates and fail on
  // them, so permalinks are plain strings.
  eleventyConfig.addGlobalData('templateEngineOverride', 'webc');
  eleventyConfig.addGlobalData('dynamicPermalink', false);
  eleventyConfig.addPreprocessor('markdown-pages', 'md', (data, content) => {
    // Runs before Eleventy computes the page's output path from it.
    data.permalink = resolvePermalink(data);
    data.markdownSource = content;
    refreshComponentNames();

    return renderHtml(content, data.page.inputPath);
  });

  eleventyConfig.addCollection('markdownPages', (collectionApi) =>
    collectionApi.getAll().filter((item) => hasMarkdownVersion(item.data)),
  );

  eleventyConfig.addTemplate('markdown-pages.11ty.js', {
    data: {
      pagination: {
        data: 'collections.markdownPages',
        size: 1,
        alias: 'source',
      },
      permalink: ({ source }) => markdownUrl(source.url),
      eleventyExcludeFromCollections: true,
      // Opts out of the WebC defaults set as global data above.
      templateEngineOverride: '11ty.js',
      dynamicPermalink: true,
    },
    render: ({ source, collections }) => {
      refreshComponentNames();

      return renderMarkdown(
        source.data.markdownSource,
        source.page,
        collections.markdownPages.map((item) => item.url),
      );
    },
  });

  eleventyConfig.addTransform('svgids', transformSVGIds);
  eleventyConfig.addTransform('htmlmin', transformHTML);

  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });

  // The unirunner's maths is unit tested under lib/, and the browser loads the
  // very same files rather than a copy that could drift from them.
  eleventyConfig.addPassthroughCopy({ 'lib/unirunner/engine': 'js/unirunner' });

  eleventyConfig.addGlobalData('deployedAt', () =>
    new Date().toISOString().substring(0, 10),
  );

  eleventyConfig.addGlobalData('commitSha', () =>
    (process.env.COMMIT_SHA || 'deadbeefc0ffee').substring(0, 7),
  );

  eleventyConfig.on('eleventy.after', ({ results }) => {
    // Never apply post processing when in dev mode
    if (process.env.ELEVENTY_RUN_MODE !== 'build') {
      return;
    }

    // The Markdown versions' canonical links are added to the copy of
    // src/public/_headers, which is built from the source each time so they
    // are never appended twice.
    const markdownUrls = results
      .map(({ url }) => url)
      .filter((url) => typeof url === 'string' && url.endsWith('.md'));

    writeFileSync(
      join(eleventyConfig.directories.output, '_headers'),
      `${readFileSync(HEADERS, 'utf8').trimEnd()}\n\n${canonicalHeaders(markdownUrls)}`,
    );

    generateLlmsFull(eleventyConfig.directories.output, eleventyConfig.logger);

    // First build, or cache unavailable
    if (!existsSync(CACHE_DIR)) {
      return;
    }

    const dest = join(
      resolve(eleventyConfig.directories.output),
      ...URL_PATH.split('/').filter((value) => value !== ''),
    );

    mkdirSync(dest, { recursive: true });
    cpSync(CACHE_DIR, dest, { recursive: true });
  });

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
