export const SITE_ORIGIN = 'https://rouletabille.fr';

// `base` lets callers resolve `value` relative to a specific page (e.g. a
// bare `#fragment` link) instead of always defaulting to the site root.
export function canonicalUrl(value, base = SITE_ORIGIN) {
  const url = new URL(value, base);

  if (url.origin !== SITE_ORIGIN) {
    return url.href;
  }

  let pathname = url.pathname.replace(/\/+$/, '');

  if (pathname === '') {
    pathname = '/';
  }

  pathname = pathname.replace(/\/index(?:\.html)?$/, '').replace(/\.html$/, '');

  if (pathname === '') {
    pathname = '/';
  }

  return `${url.origin}${pathname === '/' ? '' : pathname}${url.search}${url.hash}`;
}
