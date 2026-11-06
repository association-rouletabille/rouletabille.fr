# llms-full.txt generation

Generates [`llms-full.txt`](../../src/public/llms-full.txt), a Markdown companion
to the hand-maintained [`llms.txt`](../../src/public/llms.txt). It runs from
Eleventy's `eleventy.after` hook after the site has been built.

### Generation flow

1. Read the `dist/**/*.md` files: the Markdown version of each content
   page, rendered from its source (see
   [`lib/markdown-pages`](../markdown-pages/README.md)). Their components are
   already replaced and their site links already absolute, pointing to the
   pages' `.md` versions.
2. Read the built `dist/llms.txt`. Its intro, `## Pages` entries, order, titles,
   descriptions, and `## Contact` section define the generated document.
3. Add one `## <page title>` section per manifest entry, followed by its
   description, source URL (the page's `.md` version, or the site root for
   the home page), and the page's Markdown, with its headings nested under
   the section.
4. Append the contact section after a horizontal rule.
5. During build, write the result to `dist/llms-full.txt` and to
   `src/public/llms-full.txt`.

The generated file combines curated metadata from `llms.txt` with content from
the current build.

### Manifest extraction scope

Only the intro, `## Pages`, and `## Contact` sections of `llms.txt` are extracted
into llms-full.txt. Other manifest sections—Affiliations, Optional, Notes—are
summaries of website content and would duplicate the full page content already
included via the Pages index. To prevent redundancy, those sections are not extracted.

`## Pages` entries link to the pages' `.md` versions
(`https://rouletabille.fr/association.md`), as llms.txt readers expect.

### Content tweaks

Each page is parsed into a Markdown syntax tree (mdast), transformed, and
serialized back with [`mdast-util-to-markdown`](https://github.com/syntax-tree/mdast-util-to-markdown):

- **Headings:** the first heading must be an `h1`. When its text is identical
  to the manifest title, it is removed to avoid duplicate titles; every
  following heading shifts up by one level.
- **Images:** removed, along with the space around them, the paragraphs they
  leave empty, and the reference definitions only they used. The document is
  intended as text context, not a media export.
- **Inline HTML:** its tags are removed, its text kept (`<a>texte</a>` →
  `texte`). HTML blocks are kept as is.
- **Layout:** the serialization keeps the one llms-full.txt always had (it used
  to be converted from HTML): `-   item` and `1.  item` lists, `_emphasis_`,
  `**strong**`, `#` headings, trailing-spaces hard breaks, and link
  destinations as written. Being rebuilt from the tree, a page may otherwise
  be normalised slightly (escaping, ordered lists past 9 using `10. item`).

### Validation and development

The build fails when a manifest page has no Markdown version, when a Markdown
page has no manifest entry, when a page doesn't have exactly one `h1`, or when
the `Pages` section contains a malformed, invalid, external, non-`.md` or
duplicate URL. This keeps the curated page list and generated content in sync.

During `npm run serve`, no generation is done to avoid triggering another
watched rebuild. A page renamed while serving leaves its former `.md` in
`dist/`, which then fails the next build as having no manifest entry: run
`npm run clean` first.

After changing page content or `llms.txt`, regenerate and add the new `llms-full.txt` version to your commit. This way it'll be reviewed by a human and give us an extra chance to catch a unexpected drift or regression:

```shell
npm run build:dev
git add src/public/llms-full.txt
```
