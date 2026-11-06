import { asset } from '@/lib/asset'

/**
 * Official logos for the tools and systems named on the site, keyed by the
 * same id as the nodes in ai-stack.ts. Everything that shows a tool (the
 * Home tools strip, the Systems chips, the Projects systems card and list)
 * reads its logo from here, so a tool always wears the same mark.
 *
 * Files live in public/icons/brands/ and are each vendor's own published
 * mark, unaltered apart from size: taken from the vendor's website (favicon
 * or header logo), Microsoft's Office brand-icon CDN for Excel, Outlook and
 * Word, and, for NJMMIS while njmmis.com was down, the Internet Archive's
 * copy of the logo on njmmis.com. Davis Vision is its wordmark without the
 * "by Versant Health" line, which is unreadable at chip size.
 *
 * `wordmark` marks a logo that already spells the name (it has no separate
 * symbol): it is drawn wider and takes the place of the text label.
 * Logos are full color by design: brand rules forbid recoloring them.
 */
export type ToolLogo = {
  src: string
  wordmark?: boolean
  /** Optical size for a wordmark, relative to the default height: NJMMIS has
   *  a map around small letters, Davis Vision's letters fill the box. */
  scale?: number
}

const brand = (file: string) => asset(`/icons/brands/${file}`)

export const TOOL_LOGOS: Record<string, ToolLogo> = {
  compulink: { src: brand('compulink.png') },
  pointclickcare: { src: brand('pointclickcare.png') },
  elation: { src: brand('elation.png') },
  'practice-fusion': { src: brand('practice-fusion.png') },
  availity: { src: brand('availity.png') },
  njmmis: { src: brand('njmmis.png'), wordmark: true, scale: 1.45 },
  'davis-vision': { src: brand('davis-vision.svg'), wordmark: true, scale: 0.8 },
  'march-vision': { src: brand('march-vision.png'), wordmark: true, scale: 1.15 },
  uhc: { src: brand('unitedhealthcare.svg') },
  excel: { src: brand('excel.svg') },
  outlook: { src: brand('outlook.svg') },
  word: { src: brand('word.svg') },
  slack: { src: brand('slack.png') },
  zoom: { src: brand('zoom.png'), wordmark: true, scale: 0.85 },
  canva: { src: brand('canva.png') },
}
