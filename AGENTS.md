# AI Agent Guide for rouletabille.fr

This file helps AI coding agents understand the project structure, build process, and conventions to be immediately productive.

## Project Overview

**rouletabille.fr** is a static website with Cloudflare Workers backend integration, featuring:

- Eleventy 3.x for static site generation with WebC components
- Cloudflare Workers for serverless backend (scheduled tasks, API routes)
- TypeScript with strict type checking
- Wrangler 4.x for Workers configuration and deployment

## Build & Deployment

### Commands

- `npm install` — Install dependencies (Node 24.x required)
- `npm run build:dev` — Build Eleventy site for local dev/agent use; outputs to `dist/`; fully cross-platform
- `npm run build:dist` — Build for Wrangler deployment (bash-only; injects real git SHA); outputs to `dist/`
- `npm run clean` — Delete `dist/` folder cross-platform (safe even if absent)
- `npm run serve` — Start Eleventy dev server at http://localhost:8080 with hot reload; cross-platform
- `npm run lint` — Run ESLint with auto-fix
- `npm run format` — Format code with Prettier
- `npm run prepare` — Set up Husky git hooks

### Build Process

1. **Git commit SHA**: `COMMIT_SHA` env var passed to Eleventy (fallback: `deadbeefc0ffee`, truncated to `deadbeef` in the `<meta name="version">` tag). Only meaningful for Wrangler deployment — `build:dist` sets it via bash; `build:dev` and `serve` intentionally omit it and use the fallback
2. **Eleventy**:
   - Input: `src/` → Output: `dist/`
   - Layouts: `src/_layouts/*.webc`
   - Components: `src/_includes/webc/*.webc`
   - Transforms: CSS minification (Lightning CSS), HTML minification
   - Pass-through: `src/public/` → `/` (robots.txt, llms.txt, etc.)
3. **Cloudflare Workers**: `src/worker.ts` compiled & deployed via Wrangler

### Deployment Target

- **Custom Domain**: rouletabille.fr (Cloudflare Workers)
- **Assets**: Static files from `dist/` served as Cloudflare Worker assets
- **Scheduled Tasks**: Crons defined in `wrangler.jsonc`
  - 30-minute interval: post refresh (Instagram feed)
  - Monday 3am UTC: token refresh (Instagram access token)

## Code Organization

### Static Site (`src/`)

```
src/
  404.webc              — 404 error page
  index.webc            — Homepage
  _includes/webc/       — Reusable WebC components
  _layouts/             — Page layout templates
  assets/               — Icons, sprites
  public/               — Static files (robots.txt, llms.txt)
```

### Cloudflare Worker (`src/worker.ts`)

**Purpose**: API routes and scheduled tasks

- **GET /api/latest-posts**: Returns Instagram feed (cached 2 hours)
- **Scheduled (30 min)**: Fetch latest posts from Instagram Graph API, cache with metadata
- **Scheduled (Monday 3am)**: Refresh Instagram access token if near expiry

**Key Interfaces**:

- `Env`: `ASSETS` (Fetcher), `INSTAGRAM_KV` (optional KV namespace for Release 2+)
- `PostsResponse`: Posts array + metadata (cached_at, token_refreshed_at)

**Release Phases**:

- **Release 1** (current): KV optional; crons run but skip if KV unconfigured
- **Release 2+**: Add KV binding, seed with long-lived token
- **Release 4+**: Create `/insta` page with client-side feed fetcher

## Configuration Files

- **wrangler.jsonc**: Worker config, cron triggers, assets directory, custom domain
- **eleventy.config.js**: Eleventy plugins (WebC, Icons), CSS/HTML transforms, global data
- **tsconfig.json**: TypeScript strict mode (ES2020, bundler resolution, Node types)
- **eslint.config.js**: ESLint + Prettier configuration
- **package.json**: Dependencies, build/lint/format scripts, lint-staged hooks

## TypeScript & Type Checking

- **Strict mode enabled**: `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`
- **Worker types**: Auto-generated `worker-configuration.d.ts` by Wrangler (included in tsconfig)
- **Node types**: Included for build scripts (build.mjs)

## WebC Components

WebC components are located in `src/_includes/webc/` and used in layouts/pages:

- `icon.webc` — Icon sprite renderer
- `links.webc` — Navigation/link utilities
- `rocking-logo.webc` — Branded logo component
- `topstyles.webc` — Critical CSS inlining
- `under-construction.webc` — Site status indicator
- `sprite-link.webc` — Sprite link wrapper
- `not-found.webc` — 404 page component

**Pattern**: Components are registered globally in eleventy.config.js and scoped to output.

## Common Tasks

### Adding a new page

1. Create `src/[name].webc` or `src/[name]/index.webc`
2. Use layout: `<is-layout name="root">` to include in base template
3. Build: `npm run build:dev`

### Updating Worker code

1. Edit `src/worker.ts` (TypeScript)
2. Run `npm run build:dev` to validate types
3. Crons auto-trigger on schedule (preview: `wrangler publish --dry-run`)

### Adding Instagram integration (Release 2+)

1. Create KV namespace: `wrangler kv:namespace create INSTAGRAM_KV`
2. Add binding to `wrangler.jsonc`
3. Seed token + metadata to KV
4. Worker automatically refreshes posts & tokens on schedule

### Linting & Formatting

- **Pre-commit**: lint-staged runs ESLint + Prettier on staged files (via Husky)
- **Manual**: `npm run lint`, `npm run format`

## Local Development & Agent Testing

### Purging dist/

```sh
npm run clean
```

Deletes the entire `dist/` folder cross-platform (uses `npx rimraf`). Safe to run even if the folder does not exist. Do this before any full rebuild to guarantee a clean output slate.

### Building the site

```sh
# Cross-platform — use for local dev and all agent workflows
npm run build:dev

# Clean build
npm run clean && npm run build:dev
```

`build:dev` runs Eleventy without setting `COMMIT_SHA`; the fallback `deadbeef` SHA appears in the `<meta name="version">` tag, which is fine for local inspection.

> **Deployment only**: use `npm run build:dist` (bash-only; injects the real git SHA) when building for Wrangler deployment.

### Running Eleventy in serve mode

```sh
# Start dev server (cross-platform)
npm run serve

# Clean then serve
npm run clean && npm run serve
```

Starts the Eleventy dev server at **http://localhost:8080** with file watching and hot reload. Changes to `src/` are picked up automatically without restarting. Uses the `deadbeef` SHA fallback — irrelevant for local inspection.

### Using Playwright to inspect the site

Playwright is **not installed** as a project dependency. Use `npx playwright` — it fetches the browser on first use.

1. Start the dev server in one terminal: `npm run serve`
2. In a second terminal, use one of:

```sh
# Open a headed browser for manual exploration
npx playwright open http://localhost:8080

# Record interactions into a reusable script
npx playwright codegen http://localhost:8080

# Run an automated test file
npx playwright test --project=chromium
```

All site pages are navigable at `http://localhost:8080/{path}` (e.g., `/association`, `/adhesion`, `/balades-du-mardi-soir`).

## Key Decisions & Constraints

- **No client-side JavaScript by default**: Static HTML + WebC; Workers provide optional APIs
- **KV is optional in Release 1**: Gracefully skips if not configured (no deployment blocker)
- **Instagram media URLs expire in ~3 days**: 30-minute refresh interval keeps URLs fresh
- **CORS headers**: Set once on cache creation, persist through clones
- **Cron distinction**: Both scheduled handlers share same cron time; logic inside uses UTC day/hour to distinguish

## Troubleshooting

- **Build fails**: Check `npm run build:dev` output (cross-platform) or `npm run build:dist` (bash); verify Node 24.x, Wrangler types with `wrangler types --check`
- **Cache miss on /api/latest-posts**: Normal on first request; scheduled cron populates after 30 min
- **Worker preview issues**: Ensure `assets.directory` points to `./dist/` in wrangler.jsonc
- **TypeScript errors**: Run `npx wrangler types --check` to regenerate worker-configuration.d.ts

## Before Committing

1. Run `npm run lint` to auto-fix style issues
2. Run `npm run format` to format code
3. Verify `npm run build:dist` succeeds with exit code 0 (requires bash shell — Git Bash, WSL, or macOS/Linux)
4. For Worker changes, test with `wrangler publish --dry-run` (optional)
