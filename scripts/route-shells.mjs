// Post-build: give every route a real HTML file so GitHub Pages serves it with
// HTTP 200 (instead of a 404 fallback), with its own title, description,
// canonical and robots tag in the initial HTML - where crawlers are guaranteed
// to read them. The SPA then boots and renders the route as usual.
// 404.html is a plain copy, so unknown URLs still boot the app's NotFound view.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const SITE = 'https://kemalutaya.github.io/portfolio/'
const html = readFileSync('dist/index.html', 'utf8')

// [path, title, description, robots]
const ROUTES = [
  ['projects', 'Case Studies | Kem Alutaya', 'How an Excel, Outlook and Word automation cut an estimated 3-hour daily healthcare admin task to about 1 hour, plus the processes behind the daily work.'],
  ['services', 'Services | Kem Alutaya', 'Insurance verification, EMR support, chart preparation, documentation, facility support and prior authorization support for U.S. and UK healthcare teams.'],
  ['showcase', 'Automation | Kem Alutaya', 'The Excel, Outlook and Word macros built for physician schedules, facility notifications and doctor-visit flyers.'],
  ['testimonials', 'Testimonials | Kem Alutaya', 'What onshore teams and supervisors at Resident Eye Care Associates and Optum said.'],
  ['about', 'About | Kem Alutaya', 'Five years in U.S. healthcare back-office operations: experience, credentials and scope of work.'],
  ['contact', 'FAQs & Contact | Kem Alutaya', 'Book a call or email. Answers on hours, HIPAA, scope and availability.'],
  ['privacy', 'Privacy | Kem Alutaya', 'How this site handles your information.', 'noindex, follow'],
  ['terms', 'Terms | Kem Alutaya', 'Terms of use for this site.', 'noindex, follow'],
  ['thank-you', 'Thank you | Kem Alutaya', 'Message received.', 'noindex, follow'],
  // Role variants: deliberately kept out of search.
  ['da', 'Kem Alutaya | AI Data Annotation & Transcription', 'Kem Alutaya, AI data annotation and transcription specialist. Bounding boxes, segmentation, classification, medical image annotation, audio transcription, and QA, delivered to production quotas.', 'noindex, nofollow'],
  ['va', 'Kem Alutaya | Virtual Assistant, Admin, Research & Customer Support', 'Kem Alutaya, remote virtual assistant. Data entry, research, customer communication, scheduling, and document management, with 5+ years of accurate high-volume administrative work.', 'noindex, nofollow'],
]

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
console.log(`route-shells: wrote ${ROUTES.length} route pages + 404.html`)
