import { canonicalUrl } from './canonical-url.js';

// `_headers` rules (Cloudflare's format) asking search engines not to index
// the pages whose data sets `preventIndexing: true`. The root layout also
// gives those pages a robots meta tag; the header covers what reads headers
// only. Takes the pages' URLs (`/404.html`, `/unirunner/`), and writes each
// rule for the path the host serves the page at (`/404`, `/unirunner`).
export function preventIndexingHeaders(urls) {
  return urls
    .map((url) => new URL(canonicalUrl(url)).pathname)
    .toSorted()
    .map((pathname) => `${pathname}\n  x-robots-tag: noindex, nofollow\n`)
    .join('\n');
}
