import { asset } from '@/lib/asset'

/**
 * Official logos for the tools and systems named on the site, keyed by the
 * same id as the nodes in ai-stack.ts. Everything that shows a tool (the
 * Home tools strip, the Systems chips, the Projects systems card and list)
 * reads its logo from here, so a tool always wears the same mark.
 *
 * Software only. Payer and insurer marks (Availity, NJMMIS, Davis Vision,
 * March Vision, UnitedHealthcare) deliberately stay OFF the public site,
 * whatever the intent: those tools keep their generic glyph (ToolsMarquee,
 * ai-stack.ts) and their name in text.
 *
 * Files live in public/icons/brands/ and are each vendor's own published
 * mark, unaltered apart from size: taken from the vendor's website (favicon)
 * and Microsoft's Office brand-icon CDN for Excel, Outlook and Word.
 *
 * `wordmark` marks a logo that already spells the name (it has no separate
 * symbol): it is drawn wider and takes the place of the text label.
 * Logos are full color by design: brand rules forbid recoloring them.
 */
export type ToolLogo = {
  src: string
  wordmark?: boolean
  /** Optical size for a wordmark, relative to the default height. */
  scale?: number
}

const brand = (file: string) => asset(`/icons/brands/${file}`)

export const TOOL_LOGOS: Record<string, ToolLogo> = {
  compulink: { src: brand('compulink.png') },
  pointclickcare: { src: brand('pointclickcare.png') },
  elation: { src: brand('elation.png') },
  'practice-fusion': { src: brand('practice-fusion.png') },
  excel: { src: brand('excel.svg') },
  outlook: { src: brand('outlook.svg') },
  word: { src: brand('word.svg') },
  slack: { src: brand('slack.png') },
  zoom: { src: brand('zoom.png'), wordmark: true, scale: 0.85 },
  canva: { src: brand('canva.png') },
}
