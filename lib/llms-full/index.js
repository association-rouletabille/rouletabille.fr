// Rebuilds src/public/llms-full.txt (the full-text companion to llms.txt) from
// the site's own built HTML output. Wired into eleventy.config.js's
// `eleventy.after` hook, so it runs as part of every build.

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import TurndownService from 'turndown';
import { canonicalUrl, SITE_ORIGIN } from '../canonical-url.js';

// Pages that exist in dist but are not real content pages, excluded from llms.txt.
const EXCLUDED_KEYS = new Set([canonicalUrl('/404')]);

// A page's top-level (h1) content nests three levels under the document's own
// H1, under this section's "## <title>" heading (level 2).
const PAGE_HEADING_BASE_LEVEL = 3;

function createTurndownService(pageTitle, pageUrl) {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
  });
  let firstHeadingSeen = false;
  let headingLevelOffset = PAGE_HEADING_BASE_LEVEL - 1;

  // Nests a page's headings under the "## <page title>" heading. Only the
  // first heading may be removed, and only when it is an h1 matching the title.
  // A page must contain exactly one h1: any later h1 is rejected instead of
  // silently being shifted to the same level as the page's own heading.
  turndownService.addRule('shiftedHeading', {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    replacement: (content, node) => {
      const originalLevel = Number(node.nodeName.charAt(1));

      if (!firstHeadingSeen) {
        firstHeadingSeen = true;

        if (originalLevel !== 1) {
          throw new Error(
            `llms-full.txt: page headings must start with an h1 (found h${originalLevel})`,
          );
        }

        // If h1 matches the page title, remove it and decrement offset so
        // dependent headings nest directly under ## <page title>.
        // If h1 doesn't match, keep it at the offset level.
        if (content.trim() === pageTitle) {
          headingLevelOffset -= 1;
          return '';
        }
      } else if (originalLevel === 1) {
        throw new Error(
          `llms-full.txt: found a second <h1> ("${content.trim()}") — a page must contain exactly one h1`,
        );
      }

      const level = originalLevel + headingLevelOffset;

      // Markdown has no heading syntax past h6 — restructure the page instead
      // of silently emitting a wrong heading level.
      if (level > 6) {
        throw new Error(
          `llms-full.txt: heading nesting too deep for Markdown (h${level}) — restructure the page's headings`,
        );
      }

      return `\n\n${'#'.repeat(level)} ${content}\n\n`;
    },
  });

  // Photos add no information an LLM can use and their alt text is redundant
  // with the surrounding prose, so drop them (and their figure captions).
  turndownService.addRule('dropPhotos', {
    filter: ['img', 'figcaption'],
    replacement: () => '',
  });

  // Out of context, a page-relative link like `/association` is meaningless to
  // an LLM reading llms-full.txt as a standalone document — always emit full URLs.
  turndownService.addRule('absoluteLink', {
    filter: 'a',
    replacement: (content, node) => {
      const href = node.getAttribute('href');

      if (!href) {
        return content;
      }

      const text = content.trim() || node.getAttribute('aria-label') || href;

      return `[${text}](${canonicalUrl(href, pageUrl)})`;
    },
  });

  return turndownService;
}

// Finds top-level section boundaries. Headings inside a fenced Markdown code
// block aren't supported and fail loudly, rather than being silently ignored
// or mis-parsed.
function findSections(lines) {
  const sections = new Map();
  let fenced = false;
  let current;

  for (let index = 0; index < lines.length; index += 1) {
    if (/^\s*(```|~~~)/.test(lines[index])) {
      fenced = !fenced;
      continue;
    }

    if (fenced) {
      if (/^##\s+/.test(lines[index])) {
        throw new Error(
          `llms.txt: markdown heading-like text inside a code fence isn't supported: "${lines[index].trim()}"`,
        );
      }

      continue;
    }

    const match = lines[index].match(/^##\s+(.+?)\s*$/);

    if (match) {
      if (current) {
        current.end = index;
      }

      current = { start: index, end: lines.length };

      if (!sections.has(match[1])) {
        sections.set(match[1], current);
      }
    }
  }

  return sections;
}

// Extracts the body of a `## <heading>` section, up to the next top-level
// `##` heading or the end of the file.
function extractSection(lines, sections, heading) {
  const section = sections.get(heading);

  if (!section) {
    throw new Error(`llms.txt: could not find a "## ${heading}" section`);
  }

  return lines
    .slice(section.start + 1, section.end)
    .join('\n')
    .trim();
}

// Collects each top-level dist/*.html page's own content (the layout's single
// <main>, which never includes the shared header/footer/nav).
function collectPageContents(distDir) {
  if (!existsSync(distDir)) {
    throw new Error(`${distDir} not found — run a build first`);
  }

  const contents = new Map();

  for (const file of readdirSync(distDir)) {
    if (!file.endsWith('.html')) {
      continue;
    }

    const key = canonicalUrl(`/${file}`);

    if (EXCLUDED_KEYS.has(key)) {
      continue;
    }

    const html = readFileSync(join(distDir, file), 'utf8');
    const matches = [...html.matchAll(/<main\b[^>]*>([\s\S]*?)<\/main>/gi)];

    if (matches.length !== 1) {
      throw new Error(
        `llms-full.txt: expected exactly one <main> in ${file}, found ${matches.length}`,
      );
    }

    contents.set(key, matches[0][1]);
  }

  return contents;
}

// Reads llms.txt's own "## Pages" and "## Contact" sections: Pages is the
// single source of truth for which pages exist, their order, titles and
// descriptions; Contact is appended to llms-full.txt verbatim.
function readManifestEntries(manifestPath) {
  const manifest = readFileSync(manifestPath, 'utf8').replace(/\r\n/g, '\n');
  const manifestLines = manifest.split('\n');
  const sections = findSections(manifestLines);
  const pagesSection = extractSection(manifestLines, sections, 'Pages');
  const contact = extractSection(manifestLines, sections, 'Contact');

  const entries = [];
  const knownKeys = new Set();
  const pageEntryPattern = /^-\s+\[(.+?)\]\((.+?)\):\s*(.+)$/;

  for (const line of pagesSection.split('\n')) {
    if (line.trim() === '') {
      continue;
    }

    const match = line.match(pageEntryPattern);

    if (!match) {
      throw new Error(`llms.txt: invalid page entry: ${line}`);
    }

    const [, title, rawUrl, description] = match;
    let url;

    try {
      url = new URL(rawUrl);
    } catch {
      throw new Error(`llms.txt: invalid page URL in entry: ${line}`);
    }

    if (url.origin !== SITE_ORIGIN) {
      throw new Error(
        `llms.txt: page URL must use ${SITE_ORIGIN} in entry: ${line}`,
      );
    }

    if (url.search || url.hash) {
      throw new Error(
        `llms.txt: page URL must not contain query string or hash in entry: ${line}`,
      );
    }

    const key = canonicalUrl(url.href);

    if (knownKeys.has(key)) {
      throw new Error(
        `llms.txt: duplicate page URL after normalization: ${key}`,
      );
    }

    knownKeys.add(key);
    entries.push({ title, description: description.trim(), key });
  }

  const intro = manifestLines.slice(0, sections.get('Pages').start).join('\n');

  return { intro: intro.trim(), entries, contact };
}

export function buildLlmsFull(distDir) {
  const pageContents = collectPageContents(distDir);
  const { intro, entries, contact } = readManifestEntries(
    join(distDir, 'llms.txt'),
  );

  const sections = entries.map(({ title, description, key }) => {
    const html = pageContents.get(key);

    if (html === undefined) {
      throw new Error(`llms-full.txt: no rendered content found for ${key}`);
    }

    const sourceUrl = key;
    const markdown = createTurndownService(title, key).turndown(html).trim();

    return `## ${title}\n\nDescription : ${description}\nSource : ${sourceUrl}\n\n${markdown}`;
  });

  const knownKeys = new Set(entries.map((entry) => entry.key));
  const orphans = [...pageContents.keys()].filter((key) => !knownKeys.has(key));

  if (orphans.length > 0) {
    throw new Error(
      `llms-full.txt: pages rendered without an llms.txt entry: ${orphans.join(', ')}`,
    );
  }

  const pageSection = sections.join('\n\n---\n\n');
  const contactSection = `## Contact\n\n${contact}`;

  return `${intro}\n\n${pageSection}\n\n---\n\n${contactSection}\n`;
}

function log(logger, message) {
  logger.logWithOptions({
    message,
    type: 'log',
    prefix: '[config/on.eleventy.after]',
  });
}

export function generateLlmsFull(outputDir, logger) {
  const text = buildLlmsFull(outputDir);

  const distPath = `./${join(outputDir, 'llms-full.txt').replace(/\\/g, '/')}`;

  log(logger, `Writing ${distPath}`);
  writeFileSync(distPath, text);

  const srcPublicPath = './src/public/llms-full.txt';
  log(logger, `Writing ${srcPublicPath}`);
  writeFileSync(srcPublicPath, text);
}
