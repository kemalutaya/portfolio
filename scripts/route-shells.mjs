// Post-build: give every route a real HTML file so GitHub Pages serves it with
// HTTP 200 (instead of a 404 fallback), with its own title, description,
// canonical and robots tag in the initial HTML - where crawlers are guaranteed
// to read them. The SPA then boots and renders the route as usual.
// 404.html is a plain copy, so unknown URLs still boot the app's NotFound view.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const SITE = 'https://kemalutaya.github.io/portfolio/'
const html = readFileSync('dist/index.html', 'utf8')

// One entry per route, shared with the app's title sync (src/main.tsx).
// '' is Home: index.html already carries its tags. /da and /va are noindex.
const ROUTES = Object.entries(JSON.parse(readFileSync('src/data/routes.json', 'utf8')))
  .filter(([path]) => path)
  .map(([path, m]) => [path, m.title, m.description, m.robots])

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function shell(path, title, desc, robots) {
  const url = `${SITE}${path}/`
  const out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(desc)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(desc)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta name="robots" content=")[^"]*/, `$1${robots ?? 'index, follow, max-image-preview:large'}`)
  if (out === html) throw new Error(`route-shells: no tags replaced for /${path}`)
  return out
}

for (const [path, title, desc, robots] of ROUTES) {
  mkdirSync(`dist/${path}`, { recursive: true })
  writeFileSync(`dist/${path}/index.html`, shell(path, title, desc, robots))
}
writeFileSync('dist/404.html', html)

// sitemap.xml from the same route list: Home plus every page without a
// noindex. robots.txt (public/) points crawlers at it.
const indexable = ['', ...ROUTES.filter(([, , , robots]) => !robots || !/noindex/.test(robots)).map(([path]) => path)]
const today = new Date().toISOString().slice(0, 10)
const urls = indexable
  .map((path) => `  <url><loc>${SITE}${path ? `${path}/` : ''}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(`route-shells: wrote ${ROUTES.length} route pages + 404.html + sitemap.xml (${indexable.length} URLs)`)
