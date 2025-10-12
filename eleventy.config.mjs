import process from 'node:process';
import { Buffer } from 'node:buffer';
import path from 'node:path';

import { EleventyHtmlBasePlugin } from '@11ty/eleventy';

import htmlmin from 'html-minifier-terser';
import { transform } from 'lightningcss';
import * as sass from 'sass';

export default async function (eleventyConfig) {
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

  eleventyConfig.addTransform('html-minify', (content, path) => {
    if (path && path.endsWith('.html')) {
      return htmlmin.minify(content, {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: false,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      });
    }

    return content;
  });

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
    // prefix used by GitHub Pages, usually your project name
    pathPrefix: "/rouletabille.fr/"
  }
}
