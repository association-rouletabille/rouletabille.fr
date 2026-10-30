import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, describe, expect, test } from 'vitest';

import { buildLlmsFull, generateLlmsFull } from './index.js';

const fixtureDir = fileURLToPath(
  new URL('./__fixtures__/dist', import.meta.url),
);

const tempRoot = mkdtempSync(join(tmpdir(), 'llms-full-'));

afterAll(() => rmSync(tempRoot, { recursive: true, force: true }));

// The URLs Eleventy reports writing the Markdown versions to: all the .md
// files of `dir`, unless `except` says otherwise.
function markdownUrls(dir, except = []) {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir, { recursive: true })
    .map((entry) => `/${entry.replace(/\\/g, '/')}`)
    .filter((url) => url.endsWith('.md') && !except.includes(url));
}

function build(dir) {
  return buildLlmsFull(dir, markdownUrls(dir));
}

test('builds llms-full.txt from a built site', async () => {
  await expect(build(fixtureDir)).toMatchFileSnapshot(
    './__snapshots__/llms-full.txt',
  );
});

// Builds a throwaway dist/ with the given pages, all listed in its llms.txt
// unless `pages` says otherwise.
function site(files, { pages = Object.keys(files), manifest } = {}) {
  const dir = mkdtempSync(join(tempRoot, 'dist-'));
  const list = pages
    .map((name) => `- [Titre](https://rouletabille.fr/${name}): Description`)
    .join('\n');

  writeFileSync(
    join(dir, 'llms.txt'),
    manifest ?? `# Site\n\n## Pages\n\n${list}\n\n## Contact\n\nContact\n`,
  );

  for (const [name, markdown] of Object.entries(files)) {
    mkdirSync(join(dir, name, '..'), { recursive: true });
    writeFileSync(join(dir, name), markdown);
  }

  return dir;
}

// The page as it ends up in llms-full.txt. Its "# Titre" matches its llms.txt
// title, so it's removed.
function nested(markdown) {
  const text = build(site({ 'a.md': `# Titre\n\n${markdown}` }));

  return text.match(/Source : \S+\n\n([\s\S]*?)\n\n---\n/)[1];
}

describe('nests pages', () => {
  test.each([
    ['lists in a quote', '> - a\n>\n>   b\n', '> -   a\n>\n>     b'],
    ['long ordered lists', '9. a\n10. b\n', '9.  a\n10. b'],
    // Adjacent lists stay apart, as in the source.
    ['other bullets', '* a\n\n+ b\n', '-   a\n\n*   b'],
    ['hard breaks', 'ligne  \nsuite\n', 'ligne  \nsuite'],
    ['code', '```\na  \n\n\n\nb\n```\n', '```\na  \n\n\n\nb\n```'],
    ['underlined headings', 'Sous-titre\n---\n', '### Sous-titre'],
    [
      'images',
      '![a](/a.png) Avant, ![b](/b.png) et ![c][c].\n\n![d](/d.png)\n\nFin ![e](/e.png)\n\n[c]: /c.png\n',
      'Avant, et.\n\nFin',
    ],
    [
      'definitions links still use',
      '[Lien][r] ![i][r]\n\n## [Titre][s] ![j][s]\n\n[r]: /r\n\n[s]: /s\n',
      '[Lien][r]\n\n### [Titre][s]\n\n[r]: /r\n\n[s]: /s',
    ],
    [
      'link destinations as written, without angle brackets',
      '[a](https://e.com/a_(b)) [b](<https://e.com/a b> "t")\n',
      '[a](https://e.com/a_(b)) [b](https://e.com/a%20b "t")',
    ],
    [
      'inline HTML',
      '<a>Sans href</a>, <span class="x">texte</span>\n\n<div>\nBloc\n</div>\n',
      'Sans href, texte\n\n<div>\nBloc\n</div>',
    ],
    [
      'links holding an image and text',
      '[![logo](/x.png) Logo](https://e.com) [Ref ![i](/y.png)][r]\n\n[r]: /r\n',
      '[Logo](https://e.com) [Ref][r]\n\n[r]: /r',
    ],
  ])('%s', (_, markdown, expected) => {
    expect(nested(markdown)).toBe(expected);
  });

  test('keeps an h1 not matching the title', () => {
    const text = build(site({ 'a.md': '# Autre\n\n## Section\n' }));

    expect(text).toContain('### Autre\n\n#### Section');
  });

  test('reads nested pages and any line ending', () => {
    const text = build(site({ 'dir/a.md': '# Titre\r\n\r\nUn\rDeux\r\n' }));

    expect(text).toContain(
      'Source : https://rouletabille.fr/dir/a.md\n\nUn\nDeux\n',
    );
  });

  test('links to the Markdown version of a directory index', () => {
    const text = build(site({ 'dir/index.md': '# Titre\n\nTexte\n' }));

    expect(text).toContain(
      'Source : https://rouletabille.fr/dir/index.md\n\nTexte\n',
    );
  });

  test('ignores .md files the build did not write', () => {
    // A page renamed while serving leaves its former Markdown version behind.
    const dir = site(
      { 'a.md': '# Titre\n\nTexte\n', 'ancienne.md': '# Ancienne\n' },
      { pages: ['a.md'] },
    );

    expect(buildLlmsFull(dir, markdownUrls(dir, ['/ancienne.md']))).toContain(
      'Texte',
    );
  });
});

describe('fails on', () => {
  const manifest = (pages, contact = '## Contact\n\nContact\n') =>
    `# Site\n\n## Pages\n\n${pages}\n\n${contact}`;
  const page = { 'a.md': '# A\n' };

  test.each([
    ['a missing dist/', join(tempRoot, 'missing'), /not found/],
    [
      'a page without llms.txt entry',
      site(page, { pages: [] }),
      /without an llms.txt entry/,
    ],
    [
      'an entry without page',
      site({}, { pages: ['a.md'] }),
      /no rendered content/,
    ],
    [
      'a page not starting with an h1',
      site({ 'a.md': '## A\n' }),
      /must start with an h1/,
    ],
    ['a second h1', site({ 'a.md': '# A\n\n# B\n' }), /second h1/],
    [
      'headings nested too deep',
      site({ 'a.md': '# A\n\n###### F\n' }),
      /too deep/,
    ],
    [
      'a missing Contact section',
      site(page, {
        manifest: manifest('- [A](https://rouletabille.fr/a.md): A', ''),
      }),
      /"## Contact" section/,
    ],
    [
      'a "##" in a code fence',
      site(page, {
        manifest: manifest(
          '- [A](https://rouletabille.fr/a.md): A\n\n```\n## Pas un titre\n```',
        ),
      }),
      /inside a code fence/,
    ],
    [
      'a malformed entry',
      site(page, { manifest: manifest('- A, sans lien') }),
      /invalid page entry/,
    ],
    [
      'an invalid URL',
      site(page, { manifest: manifest('- [A](pas une url): A') }),
      /invalid page URL/,
    ],
    [
      'another origin',
      site(page, { manifest: manifest('- [A](https://example.com/a.md): A') }),
      /must use https:\/\/rouletabille.fr/,
    ],
    [
      'a query string',
      site(page, {
        manifest: manifest('- [A](https://rouletabille.fr/a.md?x=1): A'),
      }),
      /query string or hash/,
    ],
    [
      'an entry not pointing to .md',
      site(page, { pages: ['a'] }),
      /\.md version/,
    ],
    [
      'a duplicate entry',
      site(page, { pages: ['a.md', 'a.md'] }),
      /duplicate page URL/,
    ],
    [
      'an entry with an extra extension',
      site(page, { pages: ['a.html.md'] }),
      /must be the page's \.md version \(https:\/\/rouletabille\.fr\/a\.md\)/,
    ],
    [
      'an entry for a page with another file name',
      site({ 'dir/index.md': '# A\n' }, { pages: ['dir.md'] }),
      /must be the page's \.md version \(https:\/\/rouletabille\.fr\/dir\/index\.md\)/,
    ],
    [
      'a link only holding an image',
      site({ 'a.md': '# A\n\n[![logo](/x.png)](https://e.com)\n' }),
      /a\.md: the link to "https:\/\/e\.com" only holds an image/,
    ],
    [
      'a reference link only holding an image',
      site({ 'a.md': '# A\n\n[![logo](/x.png)][r]\n\n[r]: /r\n' }),
      /the link to "\[r\]" only holds an image/,
    ],
  ])('%s', (_, dir, error) => {
    expect(() => build(dir)).toThrow(error);
  });
});

test('writes llms-full.txt to dist/ and to its committed copy', () => {
  const dir = site({ 'a.md': '# Titre\n\nTexte\n' });
  const committed = join(dir, 'committed.txt');
  const messages = [];

  generateLlmsFull(
    dir,
    markdownUrls(dir),
    { logWithOptions: ({ message }) => messages.push(message) },
    committed,
  );

  const text = readFileSync(join(dir, 'llms-full.txt'), 'utf8');

  expect(text).toBe(build(dir));
  expect(readFileSync(committed, 'utf8')).toBe(text);
  expect(messages).toHaveLength(2);
});
