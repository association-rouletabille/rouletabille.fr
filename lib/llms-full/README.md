# scripts/

## llms-full.txt generation

Generates [`llms-full.txt`](../src/public/llms-full.txt), a Markdown companion
to the hand-maintained [`llms.txt`](../src/public/llms.txt). It runs from
Eleventy's `eleventy.after` hook after the site's HTML has been built.

### Generation flow

1. Read the top-level `dist/*.html` files and extract each page's `<main>`
   content. `/404.html` is excluded.
2. Read the built `dist/llms.txt`. Its intro, `## Pages` entries, order, titles,
   descriptions, and `## Contact` section define the generated document.
3. Convert each page fragment from HTML to Markdown with `turndown`.
4. Add one `## <page title>` section per manifest entry, followed by its
   description, canonical source URL, and converted content.
5. Append the contact section after a horizontal rule.
6. During build, write the result to `dist/llms-full.txt` and to
   `src/public/llms-full.txt`.

The generated file combines curated metadata from `llms.txt` with content from
the current build.

### Manifest extraction scope

Only the intro, `## Pages`, and `## Contact` sections of `llms.txt` are extracted
into llms-full.txt. Other manifest sections—Affiliations, Optional, Notes—are
summaries of website content and would duplicate the full page content already
included via the Pages index. To prevent redundancy, those sections are not extracted.

### Content tweaks

The HTML-to-Markdown step applies three site-specific rules:

- **Headings:** the first on-page heading must be an `h1`. When its text is
  identical to the manifest title, it is removed to avoid duplicate titles;
  every following heading, including nested ones, shifts up by one level.
- **Images:** `img` and `figcaption` elements are removed. The document is
  intended as text context, not a media export.
- **Links:** internal links are rewritten to absolute `https://rouletabille.fr` URLs.
  External and `mailto:` links pass through unchanged; links without visible
  text use their `aria-label` or raw `href` as fallback text.

### Validation and development

The build fails when a manifest page has no rendered HTML, when a rendered page
has no manifest entry, when a page does not contain exactly one `<main>`, or
when the `Pages` section contains a malformed, invalid, external, or duplicate
URL. This keeps the curated page list and generated content in sync. The
script currently expects the site's flat output layout.

During `npm run serve`, no generation is done to avoid triggering another
watched rebuild.

After changing page content or `llms.txt`, regenerate and add the new `llms-full.txt` version to your commit. This way it'll be reviewed by a human and give us an extra chance to catch a unexpected drift or regression:

```shell
npm run build:dev
git add src/public/llms-full.txt
```
