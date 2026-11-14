# Development Instructions

Keep this file short, practical, and focused on repository-specific habits.

## Project

- Static website for the Rouletabille association, built with Eleventy 3
  (WebC components) and deployed with Wrangler (Cloudflare).
- Content pages are authored in Markdown (`src/*.md`) and are published both as
  HTML and as Markdown (`/<page>.md`). See
  [lib/markdown-pages](lib/markdown-pages/README.md).
- Site content is written in French; code, comments, and commit messages are in
  English.

## Working rules

- Keep changes small, focused, and consistent with the conventions already
  present in the project.
- A task is only complete when all of these succeed:
  - `npm run lint:ci` (no warnings tolerated)
  - `npm run format:check`
  - `npm run test:coverage`
  - `npm run build:dev`
- Do not reduce test coverage.
- New or updated code in `lib/` needs tests.
- Refactoring opportunities should be included when relevant.
- Prefer boring, clear, maintainable solutions over clever ones.

## Content changes

- The build regenerates `src/public/llms-full.txt`. Whenever page content
  changes, run `npm run build:dev` and commit the refreshed file; CI fails
  otherwise.
- `src/public/llms.txt` is maintained by hand. When adding, renaming, or
  removing a page, update its `## Pages` entry accordingly.

## Quality expectations

- Prefer realistic tests with real inputs and fixtures over unnecessary mocks.
- Do not modify or remove existing tests, fixtures, or snapshots without
  explicit human approval.

## Test runner

- This repository uses Vitest; tests live next to the code as `*.test.js`.
- Prefer targeted commands such as:
  - `npx vitest run lib/llms-full`
  - `npx vitest run lib/unirunner/score.test.js -t "<test name>"`
- On Windows, run Vitest from a path with an uppercase drive letter
  (`D:\…`). From `d:\…`, every suite fails with "Cannot read properties of
  undefined (reading 'config')".

## Session wrap-up

- When finishing a task, the AI agent should pause and reflect on whether any
  friction occurred during the session.
- If a recurring obstacle, workflow gap, or unclear convention appeared, update
  this file with a short, actionable note so the next task is smoother.
