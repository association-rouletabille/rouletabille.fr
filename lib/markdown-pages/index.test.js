import { describe, expect, test } from 'vitest';

import {
  canonicalHeaders,
  createHtmlRenderer,
  createMarkdownRenderer,
  formatDestination,
  hasMarkdownVersion,
  markdownUrl,
  resolvePermalink,
} from './index.js';

const COMPONENTS = [
  'content-hero-photo',
  'youtube-embed',
  'card',
  'note',
  'box',
  'props',
];

const HANDLERS = {
  'content-hero-photo': () => null,
  'youtube-embed': ({ id, label }) =>
    `[Vidéo : ${label}](https://www.youtube.com/watch?v=${id})`,
  note: ({ kind }, { content }) => `> **${kind}** : ${content}`,
  box: (_, { content }) => `[${content}]`,
  props: (props) => JSON.stringify(props),
};

const PAGE = { url: '/roule-ton-caillou.html', inputPath: './src/page.md' };

// The pages that have a Markdown version: /unirunner/ isn't one of them.
const MARKDOWN_PAGES = [
  '/',
  '/association.html',
  '/adhesion.html',
  '/trial-street-flat.html',
  '/roule-ton-caillou.html',
  '/dossier/',
];

const SOURCE = `<content-hero-photo @src="/imgs/a.jpg" @alt="Un &quot;alt&quot; > b" @caption="Photo : X"></content-hero-photo>

# Titre

Intro avec [un lien](/association), [un autre](adhesion), [une ancre ailleurs](/imgs/plan.pdf#page=2), [le jeu](/unirunner/), [une photo](/imgs/a.jpg), [ext](https://unicycling.org) et [mail](mailto:a@b.c?subject=X%20Y).
<youtube-embed @id="abc"
  @label="Vidéo"></youtube-embed>

## Section "A" & B

- [Wiki](<https://fr.wikipedia.org/wiki/Monocycle#Unicon_(Championnat)>) et [espace](<https://example.com/a b>)
- [Référence][r] et [accueil](https://rouletabille.fr/index.html)

<note @kind="astuce">

Du **contenu** [ici](/trial-street-flat).

</note>

## Code

\`\`\`html
<youtube-embed @id="zzz"></youtube-embed>
\`\`\`

[r]: /trial-street-flat.html
`;

describe('markdownUrl', () => {
  test.each([
    ['/', '/index.md'],
    ['/index.html', '/index.md'],
    ['/association.html', '/association.md'],
    ['/association', '/association.md'],
  ])('%s → %s', (url, expected) => {
    expect(markdownUrl(url)).toBe(expected);
  });
});

describe('createHtmlRenderer', () => {
  const render = createHtmlRenderer(COMPONENTS);

  test('lays out the page and keeps components for WebC', () => {
    expect(render(SOURCE)).toMatchInlineSnapshot(`
      "<content-hero-photo @src="/imgs/a.jpg" @alt="Un &quot;alt&quot; > b" @caption="Photo : X"></content-hero-photo>
      <article>
      <h1>Titre</h1>
      <p>Intro avec <a href="/association">un lien</a>, <a href="adhesion">un autre</a>, <a href="/imgs/plan.pdf#page=2">une ancre ailleurs</a>, <a href="/unirunner/">le jeu</a>, <a href="/imgs/a.jpg">une photo</a>, <a href="https://unicycling.org" target="_blank" rel="noopener noreferrer">ext</a> et <a href="mailto:a@b.c?subject=X%20Y">mail</a>.</p>
      <youtube-embed @id="abc"
        @label="Vidéo"></youtube-embed>
      <card @heading="Section &quot;A&quot; &amp; B">
      <ul>
      <li><a href="https://fr.wikipedia.org/wiki/Monocycle#Unicon_(Championnat)" target="_blank" rel="noopener noreferrer">Wiki</a> et <a href="https://example.com/a%20b" target="_blank" rel="noopener noreferrer">espace</a></li>
      <li><a href="/trial-street-flat.html">Référence</a> et <a href="https://rouletabille.fr/index.html">accueil</a></li>
      </ul>
      <note @kind="astuce">
      <p>Du <strong>contenu</strong> <a href="/trial-street-flat">ici</a>.</p>
      </note>
      </card>
      <card @heading="Code">
      <pre><code class="language-html">&lt;youtube-embed @id=&quot;zzz&quot;&gt;&lt;/youtube-embed&gt;
      </code></pre>
      </card>
      </article>
      "
    `);
  });

  test('requires exactly one h1', () => {
    expect(() => render('## Orpheline\n')).toThrow(/must come after/);
    expect(() => render('Rien\n')).toThrow(/must contain a "# heading"/);
    expect(() => render('# Un\n\n# Deux\n')).toThrow(/exactly one/);
  });

  test('requires plain text card titles', () => {
    expect(() => render('# Titre\n\n## Un **gras**\n')).toThrow(/plain text/);
  });

  test('keeps plain HTML to CommonMark', () => {
    expect(render('# T\n\n<unknown-tag a="b"></unknown-tag>\n')).toContain(
      '<unknown-tag a="b"></unknown-tag>',
    );
  });

  test.each([
    [
      'an unknown component',
      '<youtub-embed @id="x"></youtub-embed>',
      /unknown component <youtub-embed>/,
    ],
    [
      'a tag that never ends',
      '<youtube-embed @id="x></youtube-embed>',
      /never closed by a ">"/,
    ],
    [
      'text after a tag',
      '<youtube-embed @id="x"></youtube-embed> suite',
      /must stand on its own line/,
    ],
    [
      'text after a closing tag',
      '<note>\n\nTexte\n\n</note> suite',
      /must stand on its own line/,
    ],
    [
      'a component in a list',
      '- <youtube-embed @id="x"></youtube-embed>',
      /must not be nested/,
    ],
    [
      'a component in a quote',
      '> <youtube-embed @id="x"></youtube-embed>',
      /must not be nested/,
    ],
    [
      'an h2 in a component',
      '<note>\n\n## Dedans\n\n</note>',
      /"## Dedans" can't be inside <note>/,
    ],
    [
      'a component within text',
      'Texte <youtube-embed @id="x"></youtube-embed>',
      /<youtube-embed> must start a line of its own/,
    ],
    [
      'a component tag within text',
      'Texte <note>x</note>',
      /<note> must start a line of its own/,
    ],
    [
      'an h1 in a component',
      '<note>\n\n# Dedans\n\n</note>',
      /"# Dedans" can't be inside <note>/,
    ],
  ])('fails on %s', (_, markdown, error) => {
    // Errors name the page they come from.
    expect(() => render(`# T\n\n${markdown}\n`, 'src/page.md')).toThrow(
      new RegExp(`^src/page\\.md: .*${error.source}`),
    );
  });

  test('ends a quote with the component that follows it', () => {
    expect(
      render('# T\n\n> Citation\n<youtube-embed @id="x"></youtube-embed>\n'),
    ).toMatchInlineSnapshot(`
      "<article>
      <h1>T</h1>
      <blockquote>
      <p>Citation</p>
      </blockquote>
      <youtube-embed @id="x"></youtube-embed>
      </article>
      "
    `);
  });

  test('only turns top-level "##" sections into cards', () => {
    expect(
      render(
        '# T\n\n## Carte\n\n### Sous-titre\n\n> ## Citée\n\n<note>\n\n### Dedans\n\n</note>\n',
      ),
    ).toMatchInlineSnapshot(`
      "<article>
      <h1>T</h1>
      <card @heading="Carte">
      <h3>Sous-titre</h3>
      <blockquote>
      <h2>Citée</h2>
      </blockquote>
      <note>
      <h3>Dedans</h3>
      </note>
      </card>
      </article>
      "
    `);
  });

  test('handles any line ending', () => {
    const source =
      '# T\n\n## Carte\n\n<youtube-embed @id="x"></youtube-embed>\n';

    expect(render(source.replace(/\n/g, '\r\n'))).toBe(render(source));
    expect(render(source.replace(/\n/g, '\r'))).toBe(render(source));
  });

  test('opens protocol-relative external links in a new tab', () => {
    expect(
      render('# T\n\n[a](//example.com/x) [b](//rouletabille.fr/x)\n'),
    ).toContain(
      '<a href="//example.com/x" target="_blank" rel="noopener noreferrer">a</a> <a href="//rouletabille.fr/x">b</a>',
    );
  });

  test('sticks to CommonMark', () => {
    expect(render('# T\n\n| a |\n| - |\n| b |\n\n~~barré~~\n')).toContain(
      '<p>| a |\n| - |\n| b |</p>\n<p>~~barré~~</p>',
    );
  });
});

describe('createMarkdownRenderer', () => {
  const render = createMarkdownRenderer(COMPONENTS, HANDLERS);

  test('replaces components and points site links to Markdown pages', () => {
    expect(render(SOURCE, PAGE, MARKDOWN_PAGES)).toMatchInlineSnapshot(`
      "# Titre

      Intro avec [un lien](https://rouletabille.fr/association.md), [un autre](https://rouletabille.fr/adhesion.md), [une ancre ailleurs](https://rouletabille.fr/imgs/plan.pdf#page=2), [le jeu](https://rouletabille.fr/unirunner), [une photo](https://rouletabille.fr/imgs/a.jpg), [ext](https://unicycling.org) et [mail](mailto:a@b.c?subject=X%20Y).

      [Vidéo : Vidéo](https://www.youtube.com/watch?v=abc)

      ## Section "A" & B

      - [Wiki](https://fr.wikipedia.org/wiki/Monocycle#Unicon_(Championnat)) et [espace](https://example.com/a%20b)
      - [Référence][r] et [accueil](https://rouletabille.fr/index.md)

      > **astuce** : Du **contenu** [ici](https://rouletabille.fr/trial-street-flat.md).

      ## Code

      \`\`\`html
      <youtube-embed @id="zzz"></youtube-embed>
      \`\`\`

      [r]: https://rouletabille.fr/trial-street-flat.md
      "
    `);
  });

  test('rewrites image destinations', () => {
    expect(
      render(
        '# T\n\n![une *photo*](/imgs/a.jpg "Titre") ![](imgs/b.jpg) ![ext](<https://example.com/c.jpg>)\n',
        PAGE,
      ),
    ).toBe(
      '# T\n\n![une *photo*](https://rouletabille.fr/imgs/a.jpg "Titre") ![](https://rouletabille.fr/imgs/b.jpg) ![ext](https://example.com/c.jpg)\n',
    );
  });

  test('rewrites destinations spanning several lines', () => {
    expect(
      render(
        '# T\n\n[un\nlien](\n/association) et [r]\n\n[r]:\n  /adhesion\n  "Titre"\n',
        PAGE,
        MARKDOWN_PAGES,
      ),
    ).toBe(
      '# T\n\n[un\nlien](\nhttps://rouletabille.fr/association.md) et [r]\n\n[r]:\n  https://rouletabille.fr/adhesion.md\n  "Titre"\n',
    );
  });

  test.each([
    [
      'a trailing slash',
      '[a](/association/)',
      '[a](https://rouletabille.fr/association.md)',
    ],
    [
      'an empty text',
      '[](/association)',
      '[](https://rouletabille.fr/association.md)',
    ],
    [
      'a site URL written absolute',
      '[a](https://rouletabille.fr/association.html)',
      '[a](https://rouletabille.fr/association.md)',
    ],
    [
      'a query string',
      '[a](/association?x=1)',
      '[a](https://rouletabille.fr/association.md?x=1)',
    ],
    [
      'a target published as a directory index',
      '[a](/dossier) et [b](/dossier/)',
      '[a](https://rouletabille.fr/dossier/index.md) et [b](https://rouletabille.fr/dossier/index.md)',
    ],
  ])('rewrites links with %s', (_, link, expected) => {
    expect(render(`# T\n\n${link}\n`, PAGE, MARKDOWN_PAGES)).toBe(
      `# T\n\n${expected}\n`,
    );
  });

  test.each([
    ['another page', '[a](/association#contact)', '/association#contact'],
    ['the page itself', '[a](#programme)', '#programme'],
    ['a definition', '[a]\n\n[a]: /adhesion.html#x', '/adhesion.html#x'],
  ])('fails on an anchor in %s', (_, markdown, url) => {
    expect(() => render(`# T\n\n${markdown}\n`, PAGE, MARKDOWN_PAGES)).toThrow(
      `./src/page.md: the link to "${url}" targets an anchor`,
    );
  });

  test('keeps the authored Markdown as is, code blocks included', () => {
    const fence = '```\na  \n\n\n\nb\n```';

    expect(
      render(
        `# T\n\n<youtube-embed @id="x" @label="L"></youtube-embed>\n${fence}\n`,
        PAGE,
      ),
    ).toBe(
      `# T\n\n[Vidéo : L](https://www.youtube.com/watch?v=x)\n\n${fence}\n`,
    );
  });

  test('handles any line ending', () => {
    const source =
      '# T\n\n<youtube-embed @id="x" @label="L"></youtube-embed>\n\n[a](/association)\n';
    const expected = render(source, PAGE);

    expect(render(source.replace(/\n/g, '\r\n'), PAGE)).toBe(expected);
    expect(render(source.replace(/\n/g, '\r'), PAGE)).toBe(expected);
  });

  test('passes attributes as props', () => {
    expect(
      render(
        `# T\n\n<props @a='simple' @b=nu @c d="x &amp; y" e="a\\*b"\n  @f="multi\nligne > ok"></props>\n`,
        PAGE,
      ),
    ).toBe(
      // Entities are decoded, Markdown escapes are kept, as WebC sees them.
      `# T\n\n${JSON.stringify({ a: 'simple', b: 'nu', c: '', d: 'x & y', e: 'a\\*b', f: 'multi\nligne > ok' })}\n`,
    );
  });

  test('fails on a component without handler', () => {
    expect(() => render('# T\n\n<card @heading="X"></card>\n', PAGE)).toThrow(
      /no Markdown handler configured for <card>/,
    );
  });

  test('fails on dynamic attributes', () => {
    expect(() =>
      render('# T\n\n<youtube-embed :id="x"></youtube-embed>\n', PAGE),
    ).toThrow(/static attribute/);
  });

  test.each([
    ['an autolink', '<https://rouletabille.fr/association>', /autolink/],
    ['an inline <a>', 'Voir <a href="/association">ici</a>.', /href=/],
    ['a block <img>', '<img src="imgs/a.jpg" alt="">', /src="imgs\/a.jpg"/],
    ['an anchor', "<a href='#programme'>ici</a>", /href="#programme"/],
    [
      'an absolute URL',
      '<a href="https://rouletabille.fr/?a&amp;b">x</a>',
      /href="https:\/\/rouletabille.fr\/\?a&b"/,
    ],
  ])('fails on a site URL in %s', (_, markdown, error) => {
    expect(() => render(`# T\n\n${markdown}\n`, PAGE, MARKDOWN_PAGES)).toThrow(
      error,
    );
  });

  test('keeps external URLs in autolinks and raw HTML', () => {
    const markdown =
      '# T\n\n<https://unicycling.org> <a@b.c> <a href="https://e.com/x" data-src="/a">x</a>\n\n<img src="https://e.com/a.jpg">\n\n`<a href="/association">`\n';

    expect(render(markdown, PAGE, MARKDOWN_PAGES)).toBe(markdown);
  });

  test('fails on a prop set twice', () => {
    expect(() => render('# T\n\n<props @a="x" a="y"></props>\n', PAGE)).toThrow(
      /sets "a" twice/,
    );
  });

  test('fails on unbalanced tags', () => {
    expect(() => render('# T\n\n<note @kind="a">\n\nTexte\n', PAGE)).toThrow(
      /never closed/,
    );
    expect(() => render('# T\n\n</note>\n', PAGE)).toThrow(/unexpected/);
  });

  test('renders nested components', () => {
    const nested = `# T

<box>

<box>

Dedans

</box>

<youtube-embed @id="y" @label="Y"></youtube-embed>

<note @kind="n">

Aussi

</note>

</box>
`;

    expect(render(nested, PAGE)).toMatchInlineSnapshot(`
      "# T

      [[Dedans]

      [Vidéo : Y](https://www.youtube.com/watch?v=y)

      > **n** : Aussi]
      "
    `);
  });
});

describe('formatDestination', () => {
  test.each([
    ['https://e.com/a_(b)', 'https://e.com/a_(b)'],
    ['https://e.com/a)b(', 'https://e.com/a%29b%28'],
    ['https://e.com/a(b', 'https://e.com/a%28b'],
    ['https://e.com/a b<c>', 'https://e.com/a%20b%3Cc%3E'],
  ])('%s → %s', (url, expected) => {
    expect(formatDestination(url)).toBe(expected);
  });
});

describe('hasMarkdownVersion', () => {
  test.each([
    [{ markdownSource: '# T', page: { url: '/a.html' } }, true],
    [{ markdownSource: '# T', page: { url: false } }, false],
    [{ page: { url: '/404.html' } }, false],
    [
      {
        markdownSource: '# T',
        page: { url: '/a.html' },
        eleventyExcludeFromCollections: true,
      },
      false,
    ],
  ])('%o → %s', (data, expected) => {
    expect(hasMarkdownVersion(data)).toBe(expected);
  });

  test('a page without URL has no Markdown URL', () => {
    expect(() => markdownUrl(false)).toThrow(/without URL/);
  });
});

describe('canonicalHeaders', () => {
  test('points each Markdown version to its HTML page', () => {
    expect(
      canonicalHeaders(['/index.md', '/dossier/index.md', '/association.md']),
    ).toMatchInlineSnapshot(`
      "/association.md
        link: <https://rouletabille.fr/association>; rel="canonical"

      /dossier/index.md
        link: <https://rouletabille.fr/dossier>; rel="canonical"

      /index.md
        link: <https://rouletabille.fr>; rel="canonical"
      "
    `);
  });
});

describe('resolvePermalink', () => {
  test.each([
    ['/', '/index.html'],
    ['/association', '/association.html'],
    ['/dossier/page', '/dossier/page.html'],
    ['/v1.2/page', '/v1.2/page.html'],
    ['/dossier/', '/dossier/index.html'],
    [false, false],
  ])('%s → %s', (permalink, expected) => {
    expect(resolvePermalink({ permalink })).toBe(expected);
  });

  test.each([
    [undefined, /\.\/src\/a\.md: .* must set a permalink/],
    ['/association.html', /without extension/],
    ['/page.md', /without extension/],
    ['association', /must start with "\/"/],
    [true, /must start with "\/"/],
  ])('fails on permalink: %s', (permalink, error) => {
    expect(() =>
      resolvePermalink({ permalink, page: { inputPath: './src/a.md' } }),
    ).toThrow(error);
  });
});
