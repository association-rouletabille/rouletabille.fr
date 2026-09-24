import { expect, test } from 'vitest';

import { canonicalUrl } from './canonical-url.js';

test.each([
  ['/', 'https://rouletabille.fr'],
  ['/index', 'https://rouletabille.fr'],
  ['/index.html', 'https://rouletabille.fr'],
  ['/foo', 'https://rouletabille.fr/foo'],
  ['/foo/', 'https://rouletabille.fr/foo'],
  ['/foo.html', 'https://rouletabille.fr/foo'],
  ['/foo/index', 'https://rouletabille.fr/foo'],
  ['/foo/index.html', 'https://rouletabille.fr/foo'],
  ['/foo///', 'https://rouletabille.fr/foo'],
  ['/foo/index.html/', 'https://rouletabille.fr/foo'],
  ['/foo.html?tab=1#details', 'https://rouletabille.fr/foo?tab=1#details'],
  ['https://rouletabille.fr/foo.html', 'https://rouletabille.fr/foo'],
  ['https://external.example/page/', 'https://external.example/page/'],
  ['#section', 'https://rouletabille.fr#section'],
])('canonicalizes %s to %s', (value, expected) => {
  expect(canonicalUrl(value)).toBe(expected);
});
