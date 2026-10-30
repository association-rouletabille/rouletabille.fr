// Renders a page authored in Markdown into its two published forms: the HTML
// fragment the site's WebC layout wraps, and a standalone Markdown document
// for LLMs (served next to the page as `/<page>.md`).
//
// Pages may embed WebC components as block-level tags on their own lines:
//
//   <content-hero-photo @src="/imgs/hero.jpg" @alt="…"></content-hero-photo>
//
// The HTML rendering leaves those tags untouched for WebC to compile. The
// Markdown rendering replaces each of them with whatever its handler returns.
//
// Both take the component names as an iterable. A Set is read each time a
// page is parsed, so the caller can keep it up to date (components added
// while serving).

import { decodeHTML } from 'entities';
import MarkdownIt from 'markdown-it';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';

import { canonicalUrl, SITE_ORIGIN } from '../canonical-url.js';

const { escapeHtml } = new MarkdownIt().utils;

// Tells, from its data, whether a page has a Markdown version: it was
// authored in Markdown (the `markdown-pages` preprocessor of
// eleventy.config.js kept its source aside), is published, and belongs to
// the collections (the Markdown versions are built from one).
export function hasMarkdownVersion(data) {
  return (
    data.markdownSource !== undefined &&
    typeof data.page?.url === 'string' &&
    !data.eleventyExcludeFromCollections
  );
}

// A page authored in Markdown states the URL it is published at, without
// extension (`permalink: /<page>`, or `/` for the home page). Returns the
// file Eleventy writes it to (`/<page>.html`, `/index.html`), which the host
// serves at that URL. Eleventy's default (`/<page>/index.html`) would be a
// different URL scheme from the rest of the site's pages, so a permalink is
// required. `permalink: false` (not published) is kept as is.
export function resolvePermalink(data) {
  const { permalink } = data;
  const fail = (message) => {
    throw new Error(`${data.page?.inputPath ?? 'page'}: ${message}`);
  };

  if (permalink === false) {
    return permalink;
  }

  if (permalink === undefined) {
    fail('a page authored in Markdown must set a permalink (e.g. "/<page>")');
  }

  if (typeof permalink !== 'string' || !permalink.startsWith('/')) {
    fail(`the permalink "${permalink}" must start with "/"`);
  }

  if (/\.[^/]*$/.test(permalink)) {
    fail(
      `the permalink "${permalink}" must be a URL without extension (e.g. "/<page>")`,
    );
  }

  return permalink.endsWith('/')
    ? `${permalink}index.html`
    : `${permalink}.html`;
}

// Serves the Markdown rendering of the page published at `url`.
export function markdownUrl(url) {
  if (typeof url !== 'string') {
    throw new Error(`a page without URL (${url}) has no Markdown version`);
  }

  const pathname = new URL(url, SITE_ORIGIN).pathname
    .replace(/\/$/, '/index')
    .replace(/\.html$/, '');

  return `${pathname}.md`;
}

// `_headers` rules (Cloudflare's format) declaring each Markdown version's
// HTML page as canonical, so that search engines index that page once
// rather than twice. Takes the Markdown versions' URLs (`/association.md`).
export function canonicalHeaders(markdownUrls) {
  return markdownUrls
    .toSorted()
    .map(
      (url) =>
        `${url}\n  link: <${canonicalUrl(url.replace(/\.md$/, ''))}>; rel="canonical"\n`,
    )
    .join('\n');
}

// Writes a link destination without <angle brackets>, which many Markdown
// readers don't support: what would require them (whitespace, angle
// brackets, parentheses that don't balance) is percent-encoded instead,
// which leaves the URL the same.
export function formatDestination(url) {
  let depth = 0;

  for (const char of url) {
    depth += char === '(' ? 1 : char === ')' ? -1 : 0;

    if (depth < 0) {
      break;
    }
  }

  const unsafe = depth !== 0 ? /[\s<>()]/g : /[\s<>]/g;

  return url.replace(
    unsafe,
    (char) =>
      `%${char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')}`,
  );
}

function resolves(url, predicate) {
  try {
    return predicate(new URL(url, SITE_ORIGIN));
  } catch {
    return false;
  }
}

// Relative, protocol-relative and absolute URLs alike.
function isSiteUrl(url) {
  return resolves(url, ({ origin }) => origin === SITE_ORIGIN);
}

function isExternal(href) {
  return resolves(
    href,
    ({ origin, protocol }) =>
      /^https?:$/.test(protocol) && origin !== SITE_ORIGIN,
  );
}

function fail(env, message) {
  throw new Error(`${env.inputPath ?? 'page'}: ${message}`);
}

// Reads a tag starting at `start` (on its "<"), honouring quoted attribute
// values so a ">" inside one doesn't end the tag. CommonMark's own HTML rules
// reject `@prop` attribute names, which is why components need this scanner.
function scanTag(src, start) {
  const head = src.slice(start).match(/^<(\/?)([A-Za-z][\w-]*)/);

  if (!head) {
    return undefined;
  }

  const attributePattern =
    /\s+([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/y;
  const attributes = {};
  let pos = start + head[0].length;

  for (;;) {
    attributePattern.lastIndex = pos;
    const match = attributePattern.exec(src);

    if (!match) {
      break;
    }

    attributes[match[1]] = decodeHTML(match[2] ?? match[3] ?? match[4] ?? '');
    pos = attributePattern.lastIndex;
  }

  const end = src.slice(pos).match(/^\s*(\/?)>/);

  return {
    closing: head[1] === '/',
    name: head[2].toLowerCase(),
    attributes,
    selfClosing: end?.[1] === '/',
    // Unset when the tag never ends (e.g. an unterminated quote).
    end: end ? pos + end[0].length : undefined,
  };
}

// A block rule recognising component tags at the start of a line. A tag may
// span several lines; the only thing allowed after it on its last line is the
// matching closing tag (`<x …></x>`). Anything between an opening and a
// closing tag on separate lines is parsed as regular Markdown.
//
// Anything else looking like a component fails the build rather than being
// escaped and displayed as text: an unknown tag with `@prop`s (a typo),
// a tag that never ends, text after a tag, or a component nested in a list or
// a quote (whose Markdown version couldn't be spliced in).
function componentBlockRule(names) {
  return (state, startLine, endLine, silent) => {
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }

    const start = state.bMarks[startLine] + state.tShift[startLine];
    const tag =
      state.src.charCodeAt(start) === 0x3c && scanTag(state.src, start);

    if (!tag) {
      return false;
    }

    if (!names.has(tag.name)) {
      if (Object.keys(tag.attributes).some((key) => /^[@:]/.test(key))) {
        fail(state.env, `unknown component <${tag.name}>`);
      }

      return false;
    }

    if (tag.end === undefined) {
      fail(state.env, `<${tag.name}> is never closed by a ">"`);
    }

    let lastLine = startLine;

    while (lastLine < endLine - 1 && state.eMarks[lastLine] < tag.end) {
      lastLine += 1;
    }

    const rest = state.src.slice(tag.end, state.eMarks[lastLine]).trim();
    const selfContained =
      tag.selfClosing || (!tag.closing && rest === `</${tag.name}>`);

    if (rest !== '' && !selfContained) {
      fail(state.env, `<${tag.name}> must stand on its own line ("${rest}")`);
    }

    // Asked whether the tag ends a paragraph or a quote above it: it does.
    if (silent) {
      return true;
    }

    if (state.level !== 0) {
      fail(state.env, `<${tag.name}> must not be nested in a list or a quote`);
    }

    const token = state.push('webc_component', '', 0);
    token.block = true;
    token.map = [startLine, lastLine + 1];
    token.content = state.getLines(
      startLine,
      lastLine + 1,
      state.blkIndent,
      true,
    );
    token.meta = {
      name: tag.name,
      kind: selfContained ? 'void' : tag.closing ? 'close' : 'open',
      attributes: tag.attributes,
    };

    state.line = lastLine + 1;

    return true;
  };
}

// Components only work as blocks: within a paragraph, CommonMark escapes
// their tags (or passes them on as raw HTML, without `@prop`s), and the
// Markdown version couldn't replace them.
function inlineComponentsRule(names) {
  return (state) => {
    if (names.size === 0) {
      return;
    }

    const pattern = new RegExp(
      `<\\/?(${[...names].join('|')})(?=[\\s/>])`,
      'i',
    );

    for (const token of state.tokens) {
      for (const child of token.type === 'inline' ? token.children : []) {
        const match =
          (child.type === 'text' || child.type === 'html_inline') &&
          child.content.match(pattern);

        if (match) {
          fail(
            state.env,
            `<${match[1]}> must start a line of its own, not sit within text`,
          );
        }
      }
    }
  };
}

function htmlBlock(state, content) {
  const token = new state.Token('html_block', '', 0);
  token.content = `${content}\n`;

  return token;
}

// Lays out the page the way the site's CSS expects:
// - whatever precedes the h1 (the hero photo) sits before the <article>
// - the h1 and everything after it make up the <article>
// - each "## heading" section becomes a <card @heading="heading">
// Neither heading may sit inside a component: its <card> or <article> would
// overlap the component's closing tag.
function pageSectionsRule(state) {
  const output = [];
  const components = [];
  let inArticle = false;
  let inCard = false;

  for (let index = 0; index < state.tokens.length; index += 1) {
    const token = state.tokens[index];

    if (token.type === 'webc_component') {
      if (token.meta.kind === 'open') {
        components.push(token.meta.name);
      } else if (token.meta.kind === 'close') {
        components.pop();
      }
    }

    if (
      token.type === 'heading_open' &&
      token.level === 0 &&
      (token.tag === 'h1' || token.tag === 'h2')
    ) {
      const inline = state.tokens[index + 1];
      const markup = `${token.markup} ${inline.content}`;

      if (components.length > 0) {
        fail(state.env, `"${markup}" can't be inside <${components.at(-1)}>`);
      }

      if (token.tag === 'h1') {
        if (inArticle) {
          fail(
            state.env,
            `a page must contain exactly one "# heading" (found a second one: "${inline.content}")`,
          );
        }

        output.push(htmlBlock(state, '<article>'));
        inArticle = true;
      } else {
        if (!inArticle) {
          fail(state.env, `"${markup}" must come after the page's "# heading"`);
        }

        if (inline.children.some((child) => child.type !== 'text')) {
          fail(
            state.env,
            `"${markup}" becomes a card title, which must be plain text`,
          );
        }

        const heading = inline.children.map((child) => child.content).join('');

        if (inCard) {
          output.push(htmlBlock(state, '</card>'));
        }

        output.push(
          htmlBlock(state, `<card @heading="${escapeHtml(heading)}">`),
        );
        inCard = true;
        index += 2;
        continue;
      }
    }

    output.push(token);
  }

  if (!inArticle) {
    fail(state.env, 'a page must contain a "# heading"');
  }

  if (inCard) {
    output.push(htmlBlock(state, '</card>'));
  }

  output.push(htmlBlock(state, '</article>'));
  state.tokens = output;
}

// Both renderers stick to CommonMark, as mdast-util-from-markdown (which
// rewrites the links of the Markdown version) does.
function createMarkdownIt(componentNames) {
  const md = new MarkdownIt({ html: true }).disable(['table', 'strikethrough']);
  const names =
    componentNames instanceof Set ? componentNames : new Set(componentNames);

  md.block.ruler.before(
    'html_block',
    'webc_component',
    componentBlockRule(names),
    {
      alt: ['paragraph', 'reference', 'blockquote'],
    },
  );

  md.core.ruler.after(
    'inline',
    'inline_components',
    inlineComponentsRule(names),
  );
  md.renderer.rules.webc_component = (tokens, index) => tokens[index].content;

  return md;
}

function normalizeNewlines(source) {
  return source.replace(/\r\n?/g, '\n');
}

export function createHtmlRenderer(componentNames) {
  const md = createMarkdownIt(componentNames);

  md.core.ruler.push('page_sections', pageSectionsRule);

  // External links open in a new tab, without leaking the referrer or a
  // window.opener handle.
  md.renderer.rules.link_open = (tokens, index, options, env, self) => {
    const token = tokens[index];

    if (isExternal(token.attrGet('href'))) {
      token.attrSet('target', '_blank');
      token.attrSet('rel', 'noopener noreferrer');
    }

    return self.renderToken(tokens, index, options);
  };

  // `inputPath` only makes error messages point at the page.
  return (source, inputPath) =>
    md.render(normalizeNewlines(source), { inputPath });
}

// Joins Markdown blocks with one blank line, dropping the blank lines at
// their edges. Only the seams around components are touched: the authored
// Markdown in between, code blocks included, is kept as is.
function joinBlocks(blocks) {
  return blocks
    .map((block) =>
      block.replace(/^(?:[ \t]*\n)+/, '').replace(/(?:\n[ \t]*)+$/, ''),
    )
    .filter((block) => block.trim() !== '')
    .join('\n\n');
}

// Replaces each top-level component with its handler's output. Handlers get
// the component's props (`@src` and `src` both become `src`) and, for a
// component wrapping Markdown, that content already rendered. Their output
// always stands as its own block, even when the tag interrupted a paragraph.
function renderComponents(md, source, handlers, context) {
  const lines = source.split('\n');
  const tokens = md.parse(source, { inputPath: context.inputPath });
  const blocks = [];
  let cursor = 0;
  // The pending opening tag, and how many same-named tags it currently wraps
  // (components nested in it are rendered by the recursive call).
  let opening;
  let depth = 0;

  for (const token of tokens) {
    if (token.type !== 'webc_component') {
      continue;
    }

    const { name, kind } = token.meta;

    if (opening) {
      if (name === opening.meta.name && kind !== 'void') {
        depth += kind === 'open' ? 1 : -1;
      }

      if (depth > 0) {
        continue;
      }

      const content = renderComponents(
        md,
        lines.slice(opening.map[1], token.map[0]).join('\n'),
        handlers,
        context,
      );

      blocks.push(callHandler(handlers, opening.meta, content, context));
      cursor = token.map[1];
      opening = undefined;
      continue;
    }

    if (kind === 'close') {
      throw new Error(`${context.inputPath}: unexpected </${name}>`);
    }

    blocks.push(lines.slice(cursor, token.map[0]).join('\n'));

    if (kind === 'open') {
      opening = token;
      depth = 1;
      continue;
    }

    blocks.push(callHandler(handlers, token.meta, '', context));
    cursor = token.map[1];
  }

  if (opening) {
    throw new Error(
      `${context.inputPath}: <${opening.meta.name}> is never closed`,
    );
  }

  blocks.push(lines.slice(cursor).join('\n'));

  return joinBlocks(blocks);
}

function callHandler(handlers, { name, attributes }, content, context) {
  const handler = handlers[name];

  if (typeof handler !== 'function') {
    throw new Error(
      `${context.inputPath}: no Markdown handler configured for <${name}>`,
    );
  }

  const props = {};

  for (const [key, value] of Object.entries(attributes)) {
    if (key.startsWith(':') || key.startsWith('webc:')) {
      throw new Error(
        `${context.inputPath}: <${name} ${key}> can't be rendered to Markdown, use a static attribute`,
      );
    }

    const prop = key.replace(/^@/, '');

    if (Object.hasOwn(props, prop)) {
      throw new Error(
        `${context.inputPath}: <${name}> sets "${prop}" twice (as an attribute and a prop)`,
      );
    }

    props[prop] = value;
  }

  return handler(props, { content, page: context.page }) ?? '';
}

// Resolves a site URL to an absolute one. A link to a page that has a
// Markdown version points to that version instead, so a reader following it
// stays in Markdown: `/association` becomes
// `https://rouletabille.fr/association.md`. Such a link can't target an
// anchor (`/association#contact`, or `#contact` on the page itself): the
// Markdown version has none of the HTML page's ids.
//
// `markdownPages` maps each such page's canonical URL to its Markdown
// version's path, which is derived from the page's own URL: the canonical
// one has lost the trailing slash that makes `/foo/` published as
// `/foo/index.md` rather than `/foo.md`.
function resolveSiteUrl(url, { base, markdownPages, inputPath }) {
  const resolved = new URL(url, base);
  const pathname = markdownPages.get(
    canonicalUrl(resolved.origin + resolved.pathname),
  );

  if (pathname === undefined) {
    return canonicalUrl(url, base);
  }

  if (resolved.hash) {
    throw new Error(
      `${inputPath}: the link to "${url}" targets an anchor, which the page's Markdown version doesn't have`,
    );
  }

  return `${SITE_ORIGIN}${pathname}${resolved.search}`;
}

// The URLs of raw HTML `href` and `src` attributes, entities decoded.
function htmlAttributeUrls(html) {
  const pattern = /\s(href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi;

  return [...html.matchAll(pattern)].map((match) => ({
    attribute: match[1].toLowerCase(),
    url: decodeHTML(match[2] ?? match[3] ?? match[4]),
  }));
}

// Site URLs `rewriteLinks` can't reach fail the build, rather than being
// published pointing to the HTML page (`<https://…>` autolinks) or left
// relative (raw HTML), and then dropped from llms-full.txt along with the
// tag around them.
function assertNoUnrewritableSiteUrls(tree, source, inputPath) {
  visit(tree, (node) => {
    if (
      node.type === 'link' &&
      source[node.position.start.offset] === '<' &&
      isSiteUrl(node.url)
    ) {
      throw new Error(
        `${inputPath}: the autolink "<${node.url}>" points to the site, which the Markdown version can't link to: write it as "[text](${node.url})"`,
      );
    }

    if (node.type !== 'html') {
      return;
    }

    for (const { attribute, url } of htmlAttributeUrls(node.value)) {
      if (isSiteUrl(url)) {
        throw new Error(
          `${inputPath}: the HTML attribute ${attribute}="${url}" points to the site, which the Markdown version can't link to: use "[text](url)" or "![alt](url)" instead`,
        );
      }
    }
  });
}

// Rewrites link and image destinations in place, so the rest of the authored
// Markdown is kept byte for byte. Site URLs are resolved (see
// `resolveSiteUrl`); external ones are kept as written, only losing their
// <angle brackets> (see `formatDestination`). Prettier adds those around any
// URL with parentheses.
//
// The parser reports where each destination sits: `node.url` is only known
// once the whole destination has been read, hence the second pass.
function rewriteLinks(source, context) {
  const destinations = [];

  function record(token) {
    destinations.push([
      this.stack.at(-1),
      token.start.offset,
      token.end.offset,
    ]);
  }

  const tree = fromMarkdown(source, {
    mdastExtensions: [
      {
        exit: { resourceDestination: record, definitionDestination: record },
      },
    ],
  });

  assertNoUnrewritableSiteUrls(tree, source, context.inputPath);

  return destinations
    .sort((a, b) => b[1] - a[1])
    .reduce((text, [node, from, to]) => {
      const written = text.slice(from, to);
      const target = isSiteUrl(node.url)
        ? resolveSiteUrl(node.url, context)
        : written.replace(/^<(.*)>$/s, '$1');

      return text.slice(0, from) + formatDestination(target) + text.slice(to);
    }, source);
}

export function createMarkdownRenderer(componentNames, handlers) {
  const md = createMarkdownIt(componentNames);

  // `page` is the Eleventy page the source belongs to: its URL resolves the
  // relative links, which are made absolute so the document still makes
  // sense once read outside of the site. `markdownPageUrls` lists the pages
  // that have a Markdown version, which links to them point to.
  return (source, page, markdownPageUrls = []) => {
    const markdownPages = new Map(
      markdownPageUrls.map((url) => [canonicalUrl(url), markdownUrl(url)]),
    );
    const context = { page, inputPath: page.inputPath };
    const rendered = renderComponents(
      md,
      normalizeNewlines(source),
      handlers,
      context,
    );

    const linked = rewriteLinks(rendered, {
      base: canonicalUrl(page.url),
      markdownPages,
      inputPath: page.inputPath,
    });

    return `${linked}\n`;
  };
}
