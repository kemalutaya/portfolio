import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from '@/components/slab'
import type { Funnel } from '@/data/funnels'
import { asset } from '@/lib/asset'

/**
 * The carousel's preview: a browser-chrome dialog that iframes one diagram
 * page from public/funnels/ so a visitor never leaves the portfolio.
 */
export function fullSrc(funnel: Funnel) {
  return asset(`/funnels/${funnel.file}`)
}

export function useFunnelModal() {
  const [funnel, setFunnel] = useState<Funnel | null>(null)
  // Track what opened the dialog so focus goes back there on close, instead of
  // dumping keyboard users at the top of the document.
  const lastTriggerRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const openFull = useCallback((next: Funnel, trigger?: HTMLElement | null) => {
    lastTriggerRef.current = trigger ?? (document.activeElement as HTMLElement | null)
    setFunnel(next)
  }, [])

  const close = useCallback(() => {
    setFunnel(null)
    requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }, [])

  // Escape to dismiss, scroll locked while open, focus moved into the dialog.
  useEffect(() => {
    if (!funnel) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      // Always clear to default - never restore a possibly stale 'hidden'.
      document.body.style.overflow = ''
    }
  }, [funnel, close])

  const modal =
    funnel &&
    createPortal(
      <div
        className="funnels__modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${funnel.label} preview`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <div className="funnels__modal-shell">
          <div className="funnels__modal-bar">
            <div className="funnels__modal-lights" aria-hidden="true">
              <span className="funnels__modal-light funnels__modal-light--red" />
              <span className="funnels__modal-light funnels__modal-light--amber" />
              <span className="funnels__modal-light funnels__modal-light--green" />
            </div>
            <div className="funnels__modal-url" aria-hidden="true">
              <span className="funnels__modal-url-scheme">{funnel.tag}</span>
              <span className="funnels__modal-url-path">{funnel.label}</span>
            </div>
            <div className="funnels__modal-actions">
              <button
                ref={closeRef}
                type="button"
                className="funnels__modal-close"
                onClick={close}
                aria-label="Close preview"
              >
                <X weight="bold" size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
          <iframe
            className="funnels__modal-iframe"
            src={fullSrc(funnel)}
            title={funnel.label}
            sandbox="allow-same-origin allow-forms allow-scripts allow-popups"
          />
        </div>
      </div>,
      document.body,
    )

  return { openFull, modal }
}
