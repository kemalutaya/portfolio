# Kem Alutaya — Portfolio

Portfolio of Kem Alutaya, Medical Virtual Administrative Assistant.
Live at https://kemalutaya.github.io/portfolio/

Built with Vite, React, TypeScript, Three.js and GSAP.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173/portfolio/
npm run build      # typecheck + production build to dist/
```

## Deploy

Pushing to `main` builds and publishes the site via GitHub Actions
(`.github/workflows/deploy.yml`). In the repo's Settings → Pages, the source
must be set to **GitHub Actions**.

The site is served from `/portfolio/`, not a domain root:

- Paths to files in `public/` go through `asset()` in `src/lib/asset.ts`.
  Route paths do not.
- `scripts/route-shells.mjs` runs after the build and writes one HTML file per
  route, so direct links return 200 with the right title, description and
  canonical. `/da/` and `/va/` get `noindex` there.

For a custom domain, build with `VITE_BASE=/` and change `SITE` in
`scripts/route-shells.mjs`.

## Where the content lives

| What | Where |
|---|---|
| Name, photo, email, headline, stats | `src/data/profile.ts` |
| Systems and proficiency | `src/data/ai-stack.ts` |
| Case study | `src/data/projects.ts`, `src/data/funnels.ts` |
| Role pages `/da` and `/va` | `src/data/roles.ts` |
| FAQs | `src/data/faqs.ts` |
| Page copy | the top of each component in `src/components/` |
| Colours | `src/styles/tokens.css` |
| SEO | `index.html`, `scripts/route-shells.mjs` |

Every figure on the site carries its qualifier (typical, estimated,
self-reported). Keep them attached when editing.

## Credits

Built on [brewed-ops/portfolio-template](https://github.com/brewed-ops/portfolio-template)
(MIT, see [LICENSE](LICENSE)). Contour background technique inspired by
landonorris.com by OFF+BRAND; simplex noise by Ashima Arts / Ian McEwan (MIT).
Icons: [Phosphor](https://phosphoricons.com) (MIT).
