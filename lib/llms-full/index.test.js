import { fileURLToPath } from 'node:url';

import { expect, test } from 'vitest';

import { buildLlmsFull } from './index.js';

const fixtureDir = fileURLToPath(
  new URL('./__fixtures__/dist', import.meta.url),
);

test('builds llms-full.txt from a built site', async () => {
  await expect(buildLlmsFull(fixtureDir)).toMatchFileSnapshot(
    './__snapshots__/llms-full.txt',
  );
});
