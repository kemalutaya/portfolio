import type { Icon } from '@/components/slab'
import type { ToolLogo } from '@/data/tool-logos'

/**
 * A tool's mark: its official logo when one ships (data/tool-logos.ts), the
 * Phosphor glyph otherwise (categories like "EMR & Patient Records").
 * Loaded eagerly: the marks are small, and most sit in moving chip rows that
 * clip them, where lazy loading made each one pop in as it scrolled into view.
 * Decorative: the tool's name is always in the text next to it, or in a
 * screen-reader label when a wordmark stands in for the name.
 */
export default function ToolMark({ logo, Icon, size }: { logo?: ToolLogo; Icon?: Icon; size: number }) {
  if (logo) {
    return (
      <img
        className={`tool-mark${logo.wordmark ? ' tool-mark--wordmark' : ''}`}
        src={logo.src}
        alt=""
        style={{ ['--tool-mark' as string]: `${size}px`, ['--wordmark-scale' as string]: logo.scale ?? 1 }}
        decoding="async"
      />
    )
  }
  return Icon ? <Icon size={size} weight="duotone" aria-hidden="true" /> : null
}
