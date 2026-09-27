// Builds a link to a page on this site that works both at the temporary
// GitHub Pages address (which has a /Elephant-Path-Website prefix) and at
// the final custom domain (which has none).
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

// True when `href` (a site path such as '/about/') is the current page.
export function isCurrent(href: string, pathname: string): boolean {
  const strip = (p: string) => p.replace(/\/$/, '') || '/';
  return strip(url(href)) === strip(pathname);
}
