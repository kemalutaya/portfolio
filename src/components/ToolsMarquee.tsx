import { useMemo } from 'react'
import { asset } from '@/lib/asset'
import { TOOL_LOGOS, type ToolLogo } from '@/data/tool-logos'

/**
 * ToolsMarquee
 *
 * Horizontally scrolling strip of the tools used day to day, each shown with
 * its official logo from data/tool-logos.ts. The strip lives on the cream
 * shader page, NOT inside a dark section.
 *
 * Implementation notes:
 * - The tools list is duplicated in JSX (`doubled`) so the CSS keyframe can translate
 *   by exactly -50% and produce a seamless loop. The halfway point lands on the seam
 *   between the two copies, so the reset at 100% is invisible.
 * - Software logos render as plain <img> in full color. A symbol sits beside
 *   the name; a wordmark (Zoom) is drawn wider and replaces it. Payer portals
 *   carry no vendor mark: a generic glyph tinted to the accent via CSS mask.
 * - Accessibility: the animated track is aria-hidden because its content is
 *   duplicated and moving. The real semantic list sits in an sr-only <ul> so
 *   screen readers get a clean, deduped enumeration of the tools.
 */

type Tool = {
  name: string
  /** Official logo (software only). Payers have none and get `glyph`. */
  logo?: ToolLogo
  /** Generic line glyph in public/icons/tools, tinted to the site accent. */
  glyph?: string
}

// The tools actually used day to day, each with its official logo
// (data/tool-logos.ts). Full color: brand rules forbid recoloring.
const t = (name: string, id: string): Tool => ({ name, logo: TOOL_LOGOS[id] })
// Payer portals: no vendor marks on the public site, a neutral glyph instead.
const payer = (name: string, glyph: string): Tool => ({ name, glyph: asset(`/icons/tools/${glyph}.svg`) })

export const tools: Tool[] = [
  t('Compulink', 'compulink'),
  t('PointClickCare', 'pointclickcare'),
  payer('Availity', 'shield'),
  payer('NJMMIS', 'idcard'),
  payer('Davis Vision', 'eye'),
  payer('March Vision', 'eye'),
  payer('UnitedHealthcare', 'shield'),
  t('Excel', 'excel'),
  t('Outlook', 'outlook'),
  t('Word', 'word'),
  t('Slack', 'slack'),
  t('Zoom', 'zoom'),
  t('Canva', 'canva'),
]

export default function ToolsMarquee() {
  // Duplicate the list so the -50% translate lands on a seamless seam.
  // useMemo keeps the doubled array reference-stable across renders.
  const doubled = useMemo(() => [...tools, ...tools], [])

  return (
    <section className="tools-marquee" aria-label="Tools I work with" data-reveal>
      <div className="tools-marquee__track" aria-hidden="true">
        {doubled.map((tool, i) => (
          <div
            key={`${tool.name}-${i}`}
            className={`tools-marquee__item${tool.logo?.wordmark ? ' tools-marquee__item--wordmark' : ''}`}
          >
            {tool.logo ? (
              <img
                className="tools-marquee__img"
                style={tool.logo.scale ? { ['--wordmark-scale' as string]: tool.logo.scale } : undefined}
                src={tool.logo.src}
                alt=""
                decoding="async"
              />
            ) : (
              <span
                className="tools-marquee__icon"
                style={{ ['--icon-url' as string]: `url('${tool.glyph}')`, ['--brand-color' as string]: 'var(--orange)' }}
              />
            )}
            {/* A wordmark already spells the name. */}
            {!tool.logo?.wordmark && <span className="tools-marquee__label">{tool.name}</span>}
          </div>
        ))}
      </div>

      {/* Real semantic list for screen readers, dedupes the visual loop. */}
      <ul className="sr-only">
        {tools.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>
    </section>
  )
}
