import process from 'node:process';
import { Buffer } from 'node:buffer';

import pluginWebc from '@11ty/eleventy-plugin-webc';
import dirOutputPlugin from '@11ty/eleventy-plugin-directory-output';

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

function transformHTML(content, outputPath) {
  if (!outputPath.endsWith('.html')) {
    return content;
  }

  const minified = minifyHtml.minify(Buffer.from(content), {});

  return minified;
}

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(dirOutputPlugin);

  eleventyConfig.addPlugin(pluginIcons, {
    mode: 'sprite',
    sources: [{ name: 'custom', path: './src/assets', default: true }],
    sprite: {
      writeFile: './assets/sprites.svg',
      extraIcons: { all: true },
    },
  });

  eleventyConfig.addPlugin(pluginWebc, {
    components: ['./src/_includes/webc/*.webc'],
    bundlePluginOptions: {
      transforms: [transformCSS],
    },
  });

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
