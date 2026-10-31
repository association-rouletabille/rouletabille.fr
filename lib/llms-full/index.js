// Rebuilds src/public/llms-full.txt (the full-text companion to llms.txt) from
// the Markdown version of each page (`/<page>.md`, see lib/markdown-pages/).
// Wired into eleventy.config.js's `eleventy.after` hook, so it runs as part of
// every build.

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { toString } from 'mdast-util-to-string';
import { SKIP, visit } from 'unist-util-visit';
import { canonicalUrl, SITE_ORIGIN } from '../canonical-url.js';
import { formatDestination } from '../markdown-pages/index.js';

// A page's top-level (h1) content nests three levels under the document's own
// H1, under this section's "## <title>" heading (level 2).
const PAGE_HEADING_BASE_LEVEL = 3;

// Serializes the way llms-full.txt always has (from its former HTML-to-Markdown
// conversion): "-   item" and "1.  item" lists, `_emphasis_`, `**strong**`,
// trailing-spaces hard breaks, and link destinations as written rather than
// with their parentheses escaped.
const TO_MARKDOWN_OPTIONS = {
  bullet: '-',
  listItemIndent: 'tab',
  emphasis: '_',
  strong: '*',
  rule: '-',
  fences: true,
  resourceLink: true,
  handlers: {
    break: () => '  \n',
    link(node, _, state, info) {
      const tracker = state.createTracker(info);

      if (node.data?.autolink) {
        return tracker.move(`<${node.url}>`);
      }

      const exit = state.enter('link');
      let value = tracker.move('[');

      value += tracker.move(
        state.containerPhrasing(node, {
          before: value,
          after: '](',
          ...tracker.current(),
        }),
      );
      value += tracker.move(`](${formatDestination(node.url)}`);

      if (node.title) {
        value += tracker.move(` "${node.title.replace(/["\\]/g, '\\$&')}"`);
      }

      exit();

      return value + tracker.move(')');
    },
  },
};

// The nodes an HTML block can sit in; anywhere else, HTML is inline.
const BLOCK_CONTAINERS = new Set(['root', 'blockquote', 'listItem']);

// Takes an image out of its paragraph, along with a space around it, so
// "a ![photo](x) b" reads "a b", and "a ![photo](x)." reads "a.".
function removeImage(parent, index) {
  const previous = parent.children[index - 1];
  const next = parent.children[index + 1];
  const spaceBefore = !previous || /\s$/.test(previous.value ?? '');

  parent.children.splice(index, 1);

  if (next?.type === 'text' && spaceBefore && /^\s/.test(next.value)) {
    next.value = next.value.replace(/^\s+/, '');
  } else if (
    previous?.type === 'text' &&
    (!next || (next.type === 'text' && /^[.,;)…]/.test(next.value)))
  ) {
    previous.value = previous.value.replace(/\s+$/, '');
  } else if (!previous && next?.type === 'text') {
    next.value = next.value.replace(/^\s+/, '');
  }
}

// Nests a page's headings under the "## <page title>" heading, and drops its
// images. Only the first heading may be removed, and only when it is an h1
// matching the title. A page must contain exactly one h1: any later h1 is
// rejected instead of silently being shifted to the same level as the page's
// own heading.
function nestPage(markdown, pageTitle, file) {
  const tree = fromMarkdown(markdown);
  const removedImageLabels = new Set();

  // Links written as `<https://…>` stay so: the tree doesn't tell them apart
  // from `[https://…](https://…)` otherwise.
  visit(tree, 'link', (node) => {
    if (markdown[node.position.start.offset] === '<') {
      node.data = { ...node.data, autolink: true };
    }
  });
  let firstHeadingSeen = false;
  let headingLevelOffset = PAGE_HEADING_BASE_LEVEL - 1;

  visit(tree, (node, index, parent) => {
    // Inline HTML tags are markup, not text: "<a>texte</a>" reads "texte".
    // HTML blocks are kept, as removing them would lose their text.
    if (node.type === 'html' && !BLOCK_CONTAINERS.has(parent.type)) {
      parent.children.splice(index, 1);

      return [SKIP, index];
    }

    if (node.type === 'image' || node.type === 'imageReference') {
      // Photos add no information an LLM can use and their alt text is
      // redundant with the surrounding prose.
      if (node.type === 'imageReference') {
        removedImageLabels.add(node.identifier);
      }

      removeImage(parent, index);

      return [SKIP, index];
    }

    if (node.type !== 'heading') {
      return undefined;
    }

    if (!firstHeadingSeen) {
      firstHeadingSeen = true;

      if (node.depth !== 1) {
        throw new Error(
          `llms-full.txt: ${file}: page headings must start with an h1 (found h${node.depth})`,
        );
      }

      // If h1 matches the page title, remove it and decrement offset so
      // dependent headings nest directly under ## <page title>.
      // If h1 doesn't match, keep it at the offset level.
      if (toString(node).trim() === pageTitle) {
        headingLevelOffset -= 1;
        parent.children.splice(index, 1);

        return [SKIP, index];
      }
    } else if (node.depth === 1) {
      throw new Error(
        `llms-full.txt: ${file}: found a second h1 ("${toString(node)}") — a page must contain exactly one h1`,
      );
    }

    node.depth += headingLevelOffset;

    // Markdown has no heading syntax past h6 — restructure the page instead
    // of silently emitting a wrong heading level.
    if (node.depth > 6) {
      throw new Error(
        `llms-full.txt: ${file}: heading nesting too deep for Markdown (h${node.depth}) — restructure the page's headings`,
      );
    }

    return undefined;
  });

  // Drops what removing the images emptied: paragraphs that only held an
  // image, and definitions no remaining link refers to.
  const linkLabels = new Set();

  visit(tree, 'linkReference', (node) => {
    linkLabels.add(node.identifier);
  });

  visit(tree, (node, index, parent) => {
    const emptyParagraph =
      node.type === 'paragraph' &&
      node.children.every(
        (child) => child.type === 'text' && child.value.trim() === '',
      );
    const danglingDefinition =
      node.type === 'definition' &&
      removedImageLabels.has(node.identifier) &&
      !linkLabels.has(node.identifier);

    if (emptyParagraph || danglingDefinition) {
      parent.children.splice(index, 1);

      return [SKIP, index];
    }

    return undefined;
  });

  return toMarkdown(tree, TO_MARKDOWN_OPTIONS).trim();
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

// Collects the Markdown version of each page: the dist/**/*.md files. Pages
// without one (404, unirunner) aren't authored in Markdown and aren't content
// pages.
function collectPageContents(distDir) {
  if (!existsSync(distDir)) {
    throw new Error(`${distDir} not found — run a build first`);
  }

  const contents = new Map();

  for (const entry of readdirSync(distDir, { recursive: true })) {
    const file = entry.replace(/\\/g, '/');

    if (!file.endsWith('.md')) {
      continue;
    }

    const key = canonicalUrl(`/${file.replace(/\.md$/, '')}`);
    const markdown = readFileSync(join(distDir, file), 'utf8');

    contents.set(key, { file, markdown: markdown.replace(/\r\n?/g, '\n') });
  }

  return contents;
}

// Reads llms.txt's own "## Pages" and "## Contact" sections: Pages is the
// single source of truth for which pages exist, their order, titles and
// descriptions; Contact is appended to llms-full.txt verbatim.
function readManifestEntries(manifestPath) {
  const manifest = readFileSync(manifestPath, 'utf8').replace(/\r\n?/g, '\n');
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

    // Pages link to their Markdown version, as llms.txt readers expect.
    if (!url.pathname.endsWith('.md')) {
      throw new Error(
        `llms.txt: page URL must point to the page's .md version in entry: ${line}`,
      );
    }

    const key = canonicalUrl(url.pathname.replace(/\.md$/, ''));

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
    const page = pageContents.get(key);

    if (page === undefined) {
      throw new Error(`llms-full.txt: no rendered content found for ${key}`);
    }

    const markdown = nestPage(page.markdown, title, page.file);
    // The content comes from the page's Markdown version, so that's the
    // source, except for the home page: the site's root URL reads better than
    // /index.md.
    const source = key === SITE_ORIGIN ? key : `${key}.md`;

    return `## ${title}\n\nDescription : ${description}\nSource : ${source}\n\n${markdown}`;
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

function write(logger, path, text) {
  log(logger, `Writing ./${relative('.', path).replace(/\\/g, '/')}`);
  writeFileSync(path, text);
}

// `committedPath` is the copy kept under version control (see README.md).
export function generateLlmsFull(
  outputDir,
  logger,
  committedPath = './src/public/llms-full.txt',
) {
  const text = buildLlmsFull(outputDir);

  write(logger, join(outputDir, 'llms-full.txt'), text);
  write(logger, committedPath, text);
}
