# rouletabille.fr

## Local setup

```shell
# Install dependencies
npm install
# Run the project
npx @11ty/eleventy --serve
```

## Pages

Content pages are authored in Markdown (`src/*.md`) and published both as HTML
and as Markdown (`/<page>.md`). See
[lib/markdown-pages](lib/markdown-pages/README.md).

## Checks

```shell
npm test          # unit tests (vitest)
npm run lint:ci   # eslint, no warnings tolerated
npm run format:check
```

The `CI` workflow runs these plus a production build on every push and pull
request, and fails when `src/public/llms-full.txt` was not regenerated.
