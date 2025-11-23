import process from 'node:process';
import { Buffer } from 'node:buffer';
import path from 'node:path';

import pluginIcons from 'eleventy-plugin-icons';

import { EleventyHtmlBasePlugin } from '@11ty/eleventy';

import minifyHtml from '@minify-html/node';
import { transform } from 'lightningcss';
import * as sass from 'sass';

function transformHTML(content, outputPath) {
  if (!outputPath.endsWith('.html')) {
    return content;
  }

  const minified = minifyHtml.minify(Buffer.from(content), {});

  return minified;
}

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginIcons, {
    mode: 'sprite',
    sources: [{ name: 'custom', path: './assets', default: true }],
    sprite: {
      writeFile: './assets/sprites.svg',
      extraIcons: { all: true },
    },
  });

  eleventyConfig.setInputDirectory('templates');

  eleventyConfig.addPassthroughCopy({ static: '/' });

  eleventyConfig.addBundle('css', {
    transforms: [
      async function (content) {
        // this.type returns the bundle name.
        if (this.type === 'css') {
          const { code } = transform({
            code: Buffer.from(content),
            minify: true,
            sourceMap: false,
          });

          return code;
        }

        return content;
      },
    ],
  });

  eleventyConfig.addTransform('htmlmin', transformHTML);

  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',

    // opt-out of Eleventy Layouts
    useLayouts: false,

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);

      // Don’t compile file names that start with an underscore
      if (parsed.name.startsWith('_')) {
        return;
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || '.', this.config.dir.includes],
      });

      // Map dependencies for incremental builds
      this.addDependencies(inputPath, result.loadedUrls);

      return async (_) => {
        return result.css;
      };
    },
  });

  eleventyConfig.addTemplateFormats('scss');

  eleventyConfig.addGlobalData('deployedAt', () =>
    new Date().toISOString().substring(0, 10),
  );
  eleventyConfig.addGlobalData('commitSha', () =>
    (process.env.COMMIT_SHA || 'deadbeefc0ffee').substring(0, 7),
  );

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  return {
    dir: {
      output: 'dist',
    },
  };
}
