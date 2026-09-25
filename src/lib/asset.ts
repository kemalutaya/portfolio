/**
 * Resolve a file in public/ against the deploy base.
 *
 * The site is served from a sub-path on GitHub Pages (/portfolio/), not a
 * domain root. Vite rewrites asset imports for that automatically, but not
 * plain strings like '/icons/x.svg' in data files and JSX - those would
 * resolve to the domain root and 404. Route paths are not assets and must
 * never go through this; the router handles its own basename.
 */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
