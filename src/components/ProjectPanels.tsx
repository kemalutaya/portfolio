import { lazy, Suspense, type ReactNode } from 'react'
import AIStackGrid from './AIStackGrid'
import { useFunnelModal } from './FunnelModal'
import { caseDiagrams } from '@/data/funnels'

const FunnelBarrel = lazy(() => import('./FunnelBarrel'))

/**
 * What the Case Studies dialogs show: the process diagrams on a spinning
 * barrel and the systems list. The written case study is on the page itself.
 */

/** A plain mac window with a scrolling body. */
function SectionWindow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ppanel ppanel--window">
      <div className="ppanel__bar">
        <span className="ppanel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ppanel__url">
          <span className="ppanel__url-host">{label}</span>
        </span>
      </div>
      <div className="ppanel__scroll">{children}</div>
    </div>
  )
}

/** Only the carousel, spinning on the backdrop. Its own preview dialog
 *  still stacks above (z 9000). */
export function BarrelPanel() {
  const { openFull, modal } = useFunnelModal()
  return (
    <div className="ppanel ppanel--barrel">
      <Suspense fallback={<div className="funnels__barrel-skeleton" aria-hidden="true" />}>
        <FunnelBarrel funnels={caseDiagrams} onOpen={openFull} />
      </Suspense>
      {modal}
    </div>
  )
}

/** The systems as a grid, in a scrolling window. */
export function AIWindow() {
  return (
    <SectionWindow label="Systems">
      <AIStackGrid />
    </SectionWindow>
  )
}
