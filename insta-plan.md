# Instagram Integration Plan — rouletabille.fr

Target website: https://rouletabille.fr
Source code: https://github.com/association-rouletabille/rouletabille.fr
Techno stack: Static website - Eleventy / WebC
Hosting: Cloudflare Worker

## Summary

This feature adds a Cloudflare Worker-backed Instagram feed for `rtb_monocycle` and exposes it through a browser-safe Eleventy page at `/insta`. The Worker is written in TypeScript, uses Cloudflare KV to store the long-lived Instagram token, and refreshes that token weekly via a scheduled Worker. The browser only sees a `GET /api/latest-posts` endpoint and never the raw token.

Key constraints:

- Worker must be TypeScript
- Cloudflare runtime types must be generated with `npx wrangler types`
- `npm run build` must validate Cloudflare types using a `prebuild` script
- `/api/latest-posts` must be invoked only through GET
- API errors must return `posts: []` and log a descriptive error
- CORS should be applied minimally and safely

---

## Cloudflare Documentation References

| Topic                  | Link                                                                       |
| ---------------------- | -------------------------------------------------------------------------- |
| Wrangler configuration | https://developers.cloudflare.com/workers/wrangler/configuration/          |
| Worker fetch handler   | https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/     |
| Cron Triggers          | https://developers.cloudflare.com/workers/configuration/cron-triggers/     |
| Scheduled handler      | https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/ |
| KV Storage overview    | https://developers.cloudflare.com/kv/                                      |
| KV Binding API         | https://developers.cloudflare.com/kv/api/                                  |
| Free tier pricing      | https://www.cloudflare.com/plans/developer-platform/                       |
| Wrangler types         | https://developers.cloudflare.com/workers/cli-wrangler/commands#types      |

---

## Technical Context

| Element           | Value                                                               |
| ----------------- | ------------------------------------------------------------------- |
| Stack             | Eleventy 3.x + WebC, Node 24, LightningCSS                          |
| Build output      | dist                                                                |
| Deployment        | Cloudflare Worker via Wrangler 4.x                                  |
| Domain            | `rouletabille.fr` with `custom_domain: true` ✅ Cache API available |
| Instagram account | `rtb_monocycle`                                                     |

---

## Part A — Instagram Prerequisites

These steps must be completed **before** any Cloudflare or code work. They are done entirely in the Instagram app, the Facebook dashboard, and the Meta developer portal.

Meta reference documentation: https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/get-started

---

### A1 — Convert the Instagram account to Business

The Instagram Graph API requires a **Business** or **Creator** account. Personal accounts are not supported.

**In the Instagram mobile app:**

1. Go to your profile → hamburger menu (☰) → **Settings and privacy**
1. **Account** → **Switch to professional account**
1. Choose **Business** (not Creator)
1. Select a category (e.g. “Non-profit organization”)
1. Complete the setup — no payment required

This is free and reversible at any time.

---

### A2 — Create a Facebook Page and link it to the Instagram account

A Facebook Page is required to use the Instagram Graph API, even if you never use Facebook actively.

**Create the Page:**

1. Go to https://www.facebook.com/pages/create
1. Choose a Page name (e.g. “Roule Ta Bille”)
1. Select a category → click **Create Page**
1. Skip all optional setup steps

**Link the Instagram account to the Page:**

1. On the Facebook Page → **Settings** → **Linked accounts** (or **Instagram**)
1. Click **Connect account**
1. Log in with the `rtb_monocycle` Instagram credentials
1. Confirm the connection

---

### A3 — Create a Meta Developer App

1. Go to https://developers.facebook.com/apps/
1. Click **Create App**
1. Select use case: **Other** → **Next**
1. Select app type: **Business** → **Next**
1. Fill in:

- App name: e.g. `rouletabille-instagram`
- Contact email: your email
- Business account: select your Facebook Page (or create a Business account)

1. Click **Create App**

---

### A4 — Add Instagram Graph API to the App

1. In the app dashboard → **Add a product**
1. Find **Instagram** → click **Set up**
1. In the left sidebar: **Instagram** → **API setup with Instagram Business Login**
1. Under **Generate access tokens** → click **Add Instagram account**
1. Log in and authorize with `rtb_monocycle` credentials
1. The app is now connected to the Instagram account

---

### A5 — Generate the Short-Lived Token

Still in the Instagram API setup page:

1. Under **Generate access tokens**, your account `rtb_monocycle` should appear
1. Click **Generate token** next to it
1. Check the permissions: `instagram_business_basic` is sufficient for reading posts
1. Copy the generated token — this is the **short-lived token** (valid 1 hour)

---

### A6 — Convert to a Long-Lived Token (valid 60 days)

Run this curl command, replacing the placeholders:

```bash
curl -X GET "https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_id=<YOUR_APP_ID>
  &client_secret=<YOUR_APP_SECRET>
  &access_token=<SHORT_LIVED_TOKEN>"
```

Your App ID and App Secret are found in the Meta app dashboard under **App settings → Basic**.

The response looks like:

```json
{
  "access_token": "EAAxxxxx...",
  "token_type": "bearer",
  "expires_in": 5183944
}
```

Copy the `access_token` value — this is the **long-lived token** you will inject into Cloudflare KV in Step 3.

---

### A7 — Verify the token works

Before proceeding, confirm the token returns data:

```bash
curl "https://graph.instagram.com/me/media
  ?fields=id,caption,media_type,timestamp
  &limit=3
  &access_token=<LONG_LIVED_TOKEN>"
```

Expected response: a JSON object with a `data` array containing your 3 most recent posts. If you see an error, double-check the account connection in Step A4.

---

### Prerequisites Summary

| Step | Action                                | Where                   |
| ---- | ------------------------------------- | ----------------------- |
| A1   | Switch to Business account            | Instagram mobile app    |
| A2   | Create Facebook Page + link Instagram | facebook.com            |
| A3   | Create Meta Developer app             | developers.facebook.com |
| A4   | Add Instagram Graph API product       | Meta app dashboard      |
| A5   | Generate short-lived token            | Meta app dashboard      |
| A6   | Convert to long-lived token           | Terminal (curl)         |
| A7   | Verify token works                    | Terminal (curl)         |

Once A7 succeeds, proceed to Part B.

---

## Part B — Cloudflare & Code Integration

### Feature objective

- Add a secure `GET /api/latest-posts` Worker endpoint.
- Store and refresh the Instagram API token in KV.
- Add a static Eleventy page at `/insta` that fetches and renders posts client-side.
- Return an empty posts list on backend failure and log a descriptive error.
- Avoid exposing the raw token anywhere in the browser.

### Why KV instead of Secrets?

- Cloudflare Secrets are read-only from Worker code.
- The scheduled refresh needs writable storage.
- KV is the correct server-side storage for the long-lived token and refresh metadata.

---

## Release plan

The rollout is split into four sub releases.

### Release 1 — Worker skeleton code

**Objective**

- Deploy TypeScript Worker skeleton and route structure before KV exists.
- Implement the full endpoint and scheduled logic, with safe behavior when KV is missing.

**Prerequisites**

- wrangler.jsonc includes `main: "src/worker.ts"` and `triggers.crons`.

  Full Cloudflare Wrangler configuration reference: https://developers.cloudflare.com/workers/wrangler/configuration/

  ```jsonc
  {
    "$schema": "./node_modules/wrangler/config-schema.json",
    "name": "rouletabille-fr",
    "compatibility_date": "2025-10-28",
    "main": "src/worker.js", // ← ADD
    "assets": {
      "directory": "./dist/",
      "not_found_handling": "404-page",
      "html_handling": "drop-trailing-slash",
    },
    "kv_namespaces": [
      // ← ADD: token storage
      {
        "binding": "INSTAGRAM_KV",
        "id": "<ID_TO_FILL_AFTER_CREATION>",
      },
    ],
    "triggers": {
      // ← ADD: post refresh and token refresh
      "crons": ["*/30 * * * *", "0 3 * * 1"], // every 30 minutes and every Monday at 3am UTC
    },
    "workers_dev": true,
    "preview_urls": true,
    "routes": [
      {
        "pattern": "rouletabille.fr",
        "custom_domain": true,
      },
    ],
  }
  ```

- Local Wrangler and TypeScript tooling is available.
- No KV namespace required yet.

**Implementation details**

- `src/worker.ts` using TypeScript.
- Match `/api/latest-posts` in the Worker fetch handler.
- Accept only GET requests; reject other methods with 405-style validation.
- If KV or `access_token` is missing, return `{ posts: [] }` and log `console.error`.
  **Implementation details**
- `src/worker.ts` using TypeScript.
- Match `/api/latest-posts` in the Worker fetch handler.
- Accept only GET requests; reject other methods with 405-style validation.
- `GET /api/latest-posts` behavior (detailed):
  - Allow only `GET`. For other methods return `405` with `Allow: GET`.
  - The handler must _only_ read the prebuilt response from the Cloudflare Cache API (i.e. `caches.default`). It must not call the Instagram Graph API or attempt to read/modify the token in KV.
  - Implementation flow for `GET`:
    1. Attempt to match the incoming request in the default cache: `const cached = await caches.default.match(req)` using the request URL as key.
    2. If `cached` is found: return `cached.clone()` after ensuring the response has `Content-Type: application/json` and minimal CORS, e.g. `Access-Control-Allow-Origin: *` (or same-origin if preferred). Do not log or expose the token.
    3. If `cached` is not found: return `200` JSON `{ "posts": [] }` with the same minimal headers and a descriptive `console.error` log indicating cache-miss.
  - Keep the handler fast and deterministic: never perform network calls to Instagram from the fetch path.
- Add both scheduled handlers in Release 1: a 30-minute post-refresh cron and a weekly token-refresh cron.
- Keep each scheduled operation isolated so token renewal failure does not prevent post refresh and vice versa.
- Keep CORS handling minimal: add headers only on outgoing JSON responses and clone cached responses only when necessary.

**Checks after deploy**

- Worker starts without KV-related failures.
- `GET /api/latest-posts` returns `posts: []`.
- Scheduled preview or `wrangler dev --test-scheduled` logs a missing-token or missing-cache message.

---

### Background cron behavior (implementation notes)

- Post-refresh cron (every 30 minutes):
  - Runs server-side only.
  - Reads `access_token` from `INSTAGRAM_KV` and fetches latest media from the Instagram Graph API.
  - Normalizes the media into the JSON shape used by the frontend.
  - Creates a `Response` with `Content-Type: application/json` and `Cache-Control: public, max-age=7200` (2 hours), then writes it into the default cache with `await caches.default.put(request, response.clone())` where `request` is a `Request` object representing `/api/latest-posts`.
  - Update KV with `cached_at` timestamp for traceability (optional).

- Token-renewal cron (weekly/daily):
  - Reads `expires_at` and `token_refreshed_at` from `INSTAGRAM_KV`.
  - If the token is near expiry (e.g. < 7 days left) perform the renewal flow and update `access_token`, `token_refreshed_at`, and `expires_at` in KV.
  - Always isolate errors: wrap each step in `try/catch` and log failures without throwing to the scheduler.

---

### Notes

- The fetch handler never exposes the raw token; only server-side cron uses KV.
- Cache eviction is possible; if the cached response is evicted, clients will see `{ posts: [] }` until the next post-refresh cron run.
- The post-refresh cron should be resilient and idempotent: it must write a valid JSON response to cache even if some media entries fail to download.

---

### Release 2 — Provision empty KV

**Objective**

- Add the Cloudflare KV namespace and bind it to the Worker.
- Verify the Worker can access KV before the token is seeded.

**Prerequisites**

- Cloudflare account access with KV creation permissions.
- Run `wrangler kv namespace create INSTAGRAM_KV`.
- Add the returned namespace ID to wrangler.jsonc.

**Implementation details**

- Add `kv_namespaces` binding `INSTAGRAM_KV`.
- Keep the Worker returning `{ posts: [] }` when the token key does not exist.
- Continue descriptive `console.error` logging for missing token conditions.

**Checks after deploy**

- `wrangler kv key get --binding INSTAGRAM_KV "access_token"` returns empty/not found.
- `GET /api/latest-posts` still returns `posts: []`.
- Cloudflare logs show the token-missing message from the scheduled handler.

---

### Release 3 — Feed the KV with the long-lived token

**Objective**

- Seed KV with the long-lived Instagram token.
- Verify the Worker returns real posts and refresh metadata.

**Prerequisites**

- Instagram Business and Facebook Page setup complete.
- Meta Developer App configured with Instagram Graph API.
- Long-lived token generated.

**Implementation details**

- Use `wrangler kv key put --binding INSTAGRAM_KV "access_token" "<LONG_LIVED_TOKEN>"`.
- Optionally set `token_refreshed_at` for traceability.
- Feed `cached_at` for traceability.
- Confirm the Worker can fetch and normalize Instagram media into JSON.

**Checks after deploy**

- `GET /api/latest-posts` returns a populated `posts` array.
- `token_refreshed_at` exists after refresh or initial seed.
- Browser usage does not expose the token.

---

### Release 4 — Add the Eleventy `/insta` page

**Objective**

- Add `src/insta/index.webc` to render the Instagram feed.
- The page is a static shell that loads content client-side from `GET /api/latest-posts`.

**Prerequisites**

- Releases 1–3 are deployed.
- `GET /api/latest-posts` is functional and stable.

**Implementation details**

- Create `src/insta/index.webc` with `layout: base.webc`, `title`, and `permalink: /insta/`.
- Render a loading skeleton / placeholder grid in static HTML.
- Add client-side JavaScript to fetch `/api/latest-posts` via GET.
- Replace the skeleton with post tiles linking to Instagram permalinks.
- Show a friendly fallback and an Instagram link if the API fails or returns no posts.
- Handle `posts: []` gracefully without breaking layout.

**Checks after deploy**

- Visiting `/insta/` loads without build errors.
- The page fetches and renders posts or fallback UI.
- No token is visible in browser responses or HTML source.
- The page still works when the endpoint returns `posts: []`.

---

## Build and deployment guidance

- Generate Cloudflare types with `npx wrangler types`.
- Add a `prebuild` script in package.json that runs `npx wrangler types --check` before `npm run build`.
- Use `npm run build && wrangler deploy` for deployment.
- Create the KV namespace before deploy:
  - `wrangler kv namespace create INSTAGRAM_KV`
- Seed the token once ready:
  - `wrangler kv key put --binding INSTAGRAM_KV "access_token" "<LONG_LIVED_TOKEN>"`

---

## Cloudflare logs & runtime visibility

- `console.log` and `console.error` appear in Cloudflare Workers logs.
- Logs are accessible in the Cloudflare dashboard under Workers → worker name → Logs.
- Local logs are available via `npx wrangler tail --env <environment>`.
- Logs are server-side only and do not expose the token to the browser.

---

## CORS and `addCors()` guidance

- Only add CORS headers when the response actually needs them.
- For same-origin `/api/latest-posts`, a simple `Access-Control-Allow-Origin: *` is acceptable.
- If reusing a cached `Response`, clone it before mutating headers.
- Avoid unnecessary `Response` reconstruction.

---

## File summary

| File                                  | Purpose                                                |
| ------------------------------------- | ------------------------------------------------------ |
| wrangler.jsonc                        | add `main`, `triggers.crons`, and `kv_namespaces`      |
| package.json                          | add `prebuild` script for `npx wrangler types --check` |
| `src/worker.ts`                       | implement the Worker in TypeScript                     |
| `src/insta/index.webc`                | build the `/insta` page                                |
| `src/_components/nav.webc` or similar | add navigation to `/insta/`                            |

---

## Important notes

- The Worker must return `posts: []` on API processing errors to keep the page resilient.
- The long-lived Instagram token expires after 60 days, so weekly refresh is necessary.
- Cloudflare KV is not publicly readable from the browser; the token remains server-side.
- Signed Instagram image URLs are temporary, so caching should remain short.
- Avoid logging the raw token in Worker logs.
