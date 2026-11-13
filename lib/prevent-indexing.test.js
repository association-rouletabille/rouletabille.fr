import { expect, test } from 'vitest';

import { preventIndexingHeaders } from './prevent-indexing.js';

test('asks not to index each page, at the path it is served at', () => {
  expect(preventIndexingHeaders(['/unirunner/', '/404.html']))
    .toMatchInlineSnapshot(`
      "/404
        x-robots-tag: noindex, nofollow

      /unirunner
        x-robots-tag: noindex, nofollow
      "
    `);
});

test('has no rules without pages', () => {
  expect(preventIndexingHeaders([])).toBe('');
});
