# Markdown pages

Content pages (`src/*.md`) are authored in Markdown and published twice:

- `/<page>.html`: the page itself, laid out by the WebC layouts;
- `/<page>.md`: a standalone Markdown version for LLMs, linked from the page's
  `<head>` (`rel="alternate"`) and from [`llms.txt`](../../src/public/llms.txt).
  [`llms-full.txt`](../llms-full/README.md) is built from these files.

Both are rendered from the Markdown source. Neither is derived from the other.

## Authoring

```markdown
---
layout: base.webc
title: Roule Ton Caillou
description: >-
  …
permalink: /roule-ton-caillou
---

<content-hero-photo @src="/imgs/hero-rtc.jpg" @alt="…" @position="50% 42%" @caption="Photo : Ivan"></content-hero-photo>

# Roule Ton Caillou

Une à deux fois par an, nous partons en Seine-et-Marne…

## Programme

- Sorties guidées en forêt
```

- **A `permalink` is required, as a URL without extension**: `/<page>`, or
  `/` for the home page. The page is written to `/<page>.html` (or
  `/index.html`), which the host serves at that URL. Eleventy's default
  (`/<page>/index.html`) would differ from the rest of the site's pages.
- **One `# heading` per page.** It and everything after it make up the page's
  `<article>`. Whatever comes before it (the hero photo) sits above it.
- **Each `## heading` section becomes a `<card>`** titled with the heading,
  which must therefore be plain text.
- **External links** open in a new tab (`target="_blank"`,
  `rel="noopener noreferrer"`).
- **WebC components** (any `src/_includes/webc/*.webc`) can be used as
  block-level tags, starting a line, with `@prop` attributes. A tag may span
  several lines. A component may wrap Markdown: put its opening and closing
  tags on their own lines. It may not contain the page's `#` or `##`
  headings, whose `<article>` or `<card>` would overlap it.
- Prefer plain text to inline HTML (`13ᵉ` rather than `13<sup>e</sup>`): it
  reads the same in both versions.

## Rendering

[`index.js`](./index.js) shares one markdown-it parser between both outputs,
restricted to CommonMark (no tables, no strikethrough), like the parser that
rewrites the links. A dedicated block rule recognises the component tags.
CommonMark itself rejects `@prop` attribute names and would escape these tags
as text. Components added while serving are picked up without a restart.

- **HTML.** The `markdown-pages` preprocessor
  ([`eleventy.config.js`](../../eleventy.config.js)) renders the Markdown to
  HTML, component tags included, and WebC then compiles the result:
  components are inlined and their CSS/JS bundled. The engine is set for
  every template as global data, in the same file. Running WebC on the
  Markdown first doesn't work: it escapes `>` (blockquotes) and `<https://…>`
  autolinks before Markdown ever sees them.
- **Markdown.** The `markdown-pages.11ty.js` virtual template emits one
  `/<page>.md` per published page (a page with `permalink: false` or
  `eleventyExcludeFromCollections: true` has none). The source is kept byte for byte, code blocks included, except for:
  - line endings, normalised to `
`;
  - each component, replaced with its handler's output, as a block of its own
    (blank lines around it are normalised to one);
  - leading and trailing blank lines, removed;
  - link and image destinations: site ones are made absolute. Those to a
    page that has a Markdown version point to that version (`/adhesion` →
    `https://rouletabille.fr/adhesion.md`), so they can't target an anchor
    (see [Errors](#errors)). The others keep their target (`/imgs/a.jpg` →
    `https://rouletabille.fr/imgs/a.jpg`). External links are kept as
    written. Destinations are never wrapped in `<angle brackets>` (Prettier
    adds them around URLs with parentheses), which many Markdown readers
    don't support: what would need them (a space, unbalanced parentheses) is
    percent-encoded instead (`<https://e.com/a b>` → `https://e.com/a%20b`).
    Site URLs outside Markdown link syntax (`<https://…>` autolinks, raw
    HTML `href` and `src`) can't be rewritten, and fail the build (see
    [Errors](#errors)). External ones are left as written.

Each `/<page>.md` is served with a `link: <…>; rel="canonical"` header
pointing to its HTML page, so that search engines index the page once
rather than twice. The production build adds these rules to the copy of
[`src/public/_headers`](../../src/public/_headers) in `dist/`.

## Component handlers

[`src/_config/markdown-components.js`](../../src/_config/markdown-components.js)
decides how each component renders in the Markdown version. For example
(`note` is illustrative):

```js
export default {
  'content-hero-photo': () => null, // left out
  'youtube-embed': ({ id, label }) =>
    `[Visionner : ${label}](https://www.youtube-nocookie.com/embed/${id})`,
  // A component wrapping Markdown gets it, already rendered, as `content`.
  note: ({ kind }, { content }) => `> **${kind}** : ${content}`,
};
```

Props arrive with HTML entities decoded (`&amp;` → `&`), as WebC sees them.

## Errors

Rather than silently publishing a broken page, the build fails, naming the
page, on:

- a page without `permalink`, or with one that has an extension or doesn't
  start with `/`;
- a component without handler, or with a dynamic (`:prop`) attribute: those
  can only be evaluated by WebC;
- the same prop set twice (`@src` and `src`);
- an unknown tag with `@prop`s (most likely a typo in a component name);
- a component tag that never ends, is never closed, or has text after it on
  its line;
- a component within text, or nested in a list or a quote;
- no `#` heading, more than one, a `##` before it, a `##` with markup, or
  either inside a component;
- a site URL in an autolink (`<https://rouletabille.fr/adhesion>`) or a raw
  HTML `href`/`src` (`<a href="/adhesion">`): the Markdown version would
  point to the HTML page, or keep a relative URL that's broken outside the
  site (and `llms-full.txt` would drop the link). Use `[text](url)` or
  `![alt](url)` instead;
- a link to an anchor of a page that has a Markdown version
  (`/adhesion#contact`, or `#contact` on the page itself): the Markdown
  version has none of the HTML page's ids, so the link would point nowhere.
