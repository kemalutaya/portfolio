import { lazy, Suspense, type ReactNode } from 'react'
import { CalendarBlank, EnvelopeSimple, FileText, Wrench, type Icon } from '@/components/slab'
import AIStackGrid from './AIStackGrid'
import { useFunnelModal } from './FunnelModal'
import { caseDiagrams } from '@/data/funnels'
import { caseStudy, automations, improvements, type CaseItem } from '@/data/projects'

const FunnelBarrel = lazy(() => import('./FunnelBarrel'))

/**
 * What the Case Studies dialogs show. Each panel is the work itself, on
 * screen the moment the dialog opens. The written panels reuse the systems
 * grid's classes (aig__*) so they need no styles of their own.
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

function Head({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="aig__head">
      <div className="aig__head-text">
        <span className="aig__eyebrow">{eyebrow}</span>
        <h3 className="aig__title">{title}</h3>
      </div>
    </header>
  )
}

function Block({ title, text, children }: { title: string; text?: string; children?: ReactNode }) {
  return (
    <section className="aig__group" aria-label={title}>
      <div className="aig__group-head">
        <h3 className="aig__group-title">{title}</h3>
        {text && <p className="aig__group-what">{text}</p>}
      </div>
      {children}
    </section>
  )
}

const ICONS: Record<string, Icon> = {
  schedules: CalendarBlank,
  notifications: EnvelopeSimple,
  flyers: FileText,
  headings: Wrench,
  'flyer-template': FileText,
}

function Cards({ items }: { items: CaseItem[] }) {
  return (
    <ul className="aig__cards" role="list">
      {items.map((it) => {
        const ItemIcon = ICONS[it.id] ?? FileText
        return (
          <li key={it.id} className="aig__card">
            <h4 className="aig__name">
              <ItemIcon size={16} weight="duotone" aria-hidden="true" />
              {it.title}
            </h4>
            <p className="aig__what">{it.desc}</p>
            {it.note && <p className="aig__stack">{it.note}</p>}
          </li>
        )
      })}
    </ul>
  )
}

/** The main case study, in full. */
export function CaseStudyWindow() {
  return (
    <SectionWindow label="Case study">
      <div className="aig">
        <Head eyebrow="Case study" title={caseStudy.title} />
        <Block title={caseStudy.figure} text={caseStudy.qualifier} />
        <Block title="The problem" text={caseStudy.problem} />
        <Block title="Three automations built">
          <Cards items={automations} />
        </Block>
        <Block title="My contribution" text={caseStudy.contribution} />
        <Block title="Result" text={caseStudy.outcome} />
        <p className="aig__stack">{caseStudy.privacy}</p>
      </div>
    </SectionWindow>
  )
}

/** One automation on its own. */
function AutomationWindow({ item, n }: { item: CaseItem; n: number }) {
  return (
    <SectionWindow label="Case study">
      <div className="aig">
        <Head eyebrow={`Automation 0${n}`} title={item.title} />
        <Block title="What it does" text={item.desc} />
        <Block title="How it was built" text={caseStudy.contribution} />
        <p className="aig__stack">{caseStudy.privacy}</p>
      </div>
    </SectionWindow>
  )
}
export const SchedulesPanel = () => <AutomationWindow item={automations[0]} n={1} />
export const NotificationsPanel = () => <AutomationWindow item={automations[1]} n={2} />
export const FlyersPanel = () => <AutomationWindow item={automations[2]} n={3} />

/** The two smaller fixes. */
export function ImprovementsWindow() {
  return (
    <SectionWindow label="Other improvements">
      <div className="aig">
        <Head eyebrow="Other improvements" title="Smaller fixes I made without being asked." />
        <Cards items={improvements} />
        <p className="aig__stack">{caseStudy.privacy}</p>
      </div>
    </SectionWindow>
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
