/**
 * A diagram drawn in two palettes: `src` is the dark version, and the light
 * version sits beside it as `*-light.svg`. Both are in the markup and CSS
 * (themed-img in bento.css) shows the one that matches `data-theme`, so a
 * theme switch swaps them instantly with no re-render.
 */
export default function ThemedImg({ src, className = '' }: { src: string; className?: string }) {
  const light = src.replace(/\.svg$/, '-light.svg')
  return (
    <>
      <img className={`${className} themed-img themed-img--light`} src={light} alt="" loading="lazy" decoding="async" />
      <img className={`${className} themed-img themed-img--dark`} src={src} alt="" loading="lazy" decoding="async" />
    </>
  )
}
