import { useCallback, useEffect, useRef, useState, type CSSProperties, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowUpRight,
  X,
  CalendarBlank,
  EnvelopeSimple,
  FileText,
  Wrench,
  WarningCircle,
  Gear,
  CheckCircle,
  type Icon,
} from '@/components/slab'
import { BarrelPanel, AIWindow } from './ProjectPanels'
import FlyerMock from './FlyerMock'
import { caseDiagrams } from '@/data/funnels'
import { caseStudy, automations, improvements } from '@/data/projects'
import { aiStack, type StackNode } from '@/data/ai-stack'
import ToolMark from './ToolMark'
import ThemedImg from '@/components/ThemedImg'

/**
 * Case Studies. It scrolls like Services and borrows its bands (sgrid__*):
 * the case study on the plate, the three macros as cards, the two smaller
 * fixes with the flyer illustration, then the diagrams and the systems list,
 * which still open in a near-fullscreen dialog because they are interactive.
 *
 * Every line comes from data/projects.ts. Nothing names a patient or facility.
 */

type Stage = { index: string; label: string; body: string; Icon: Icon; chips: string[] }

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'The problem',
    body: caseStudy.problem,
    Icon: WarningCircle,
    chips: ['Wrong doctor', 'Wrong CC', 'Wrong date', 'Wrong attachment', 'Typos'],
  },
  {
    index: '02',
    label: 'What I built',
    body: caseStudy.contribution,
    Icon: Gear,
    chips: ['Excel', 'Outlook', 'Word'],
  },
  {
    index: '03',
    label: 'The result',
    body: `Daily task time went from about 3 hours to about 1. ${caseStudy.outcome}`,
    Icon: CheckCircle,
    chips: ['About 3 hrs to about 1', 'Approved for use'],
  },
]

const MACRO_ICONS: Icon[] = [CalendarBlank, EnvelopeSimple, FileText]

const leaves = (n: StackNode): StackNode[] => (n.children?.length ? n.children.flatMap(leaves) : [n])
// Training-only systems stay out of the preview chips; the Systems list labels them.
const SYSTEMS = leaves(aiStack).filter((n) => n.status !== 'Training')

type Dialog = { id: string; title: string; Section: ComponentType }
const DIAGRAMS: Dialog = { id: 'diagrams', title: 'Process diagrams', Section: BarrelPanel }
const SYSTEMS_LIST: Dialog = { id: 'systems', title: 'Systems', Section: AIWindow }

/* ---------- Dialog ----------
   A backdrop, a close button in the corner, and the work. Each Section
   brings its own window. z 8000, under the carousel preview (9000) so the
   barrel's own "open this diagram" dialog can still stack on top of it. */
function ProjectModal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="pmodal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
        <X size={18} weight="bold" />
      </button>
      <div className="pmodal__stage">{children}</div>
    </div>,
    document.body,
  )
}

/* ---------- The page ---------- */

export default function ProjectsGrid() {
  const [open, setOpen] = useState<Dialog | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((d: Dialog, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(d)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const [headings, flyer] = improvements

  return (
    <section className="pgrid sgrid csgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Case Studies</span>
        <h1 className="pgrid__title" id="projects-title">
          I run the daily workflow, then look for ways to improve it.
        </h1>
        <p className="pgrid__lede">
          Three macros I built with Excel, Outlook and Word, two smaller fixes, and the systems I work in.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* The case study: the figure on the left, problem, build and result on the right. */}
        <article className="sgrid__method csgrid__case" aria-labelledby="case-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">Case study</span>
            <h2 className="sgrid__method-title" id="case-title">
              {caseStudy.title}.
              <br />
              <span>{caseStudy.figure}.</span>
            </h2>
            <p className="sgrid__method-sub">{caseStudy.qualifier}</p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label}, in short`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </article>

        {/* The three macros, each card with its full description. */}
        <section className="sgrid__offers" aria-labelledby="macros-title">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title" id="macros-title">The three macros</h2>
            <p className="sgrid__offers-sub">Each one turns a multi-step manual task into a few clicks.</p>
          </div>
          <ul className="bento csgrid__cards csgrid__cards--three" role="list">
            {automations.map((a, i) => {
              const MacroIcon = MACRO_ICONS[i] ?? FileText
              return (
                <li key={a.id} className="bento__card csgrid__card">
                  <span className="csgrid__card-top">
                    <span className="bento__icon">
                      <MacroIcon size={20} weight="fill" aria-hidden="true" />
                    </span>
                    <span className="sgrid__service-index">Macro 0{i + 1}</span>
                  </span>
                  <h3 className="bento__title">{a.title}</h3>
                  <p className="bento__desc">{a.desc}</p>
                </li>
              )
            })}
          </ul>
        </section>

        {/* The two smaller fixes. The flyer card carries the illustration. */}
        <section className="sgrid__offers" aria-labelledby="fixes-title">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title" id="fixes-title">Two smaller fixes</h2>
            <p className="sgrid__offers-sub">Both made without being asked.</p>
          </div>
          <ul className="bento csgrid__cards csgrid__cards--fixes" role="list">
            <li className="bento__card csgrid__card">
              <span className="csgrid__card-top">
                <span className="bento__icon">
                  <Wrench size={20} weight="fill" aria-hidden="true" />
                </span>
              </span>
              <h3 className="bento__title">{headings.title}</h3>
              <p className="bento__desc">{headings.desc}</p>
              {headings.note && <span className="sgrid__chip">{headings.note}</span>}
            </li>
            <li className="bento__card csgrid__card csgrid__card--flyer">
              <div className="csgrid__flyer-copy">
                <span className="csgrid__card-top">
                  <span className="bento__icon">
                    <FileText size={20} weight="fill" aria-hidden="true" />
                  </span>
                </span>
                <h3 className="bento__title">{flyer.title}</h3>
                <p className="bento__desc">{flyer.desc}</p>
                {flyer.note && <span className="sgrid__chip">{flyer.note}</span>}
              </div>
              <FlyerMock />
            </li>
          </ul>
        </section>

        {/* Diagrams and systems: interactive, so they open in a dialog. */}
        <div className="csgrid__cards csgrid__cards--two">
          <button
            type="button"
            className="bento__card bento__card--btn csgrid__open"
            onClick={(e) => show(DIAGRAMS, e.currentTarget)}
            aria-haspopup="dialog"
          >
            <span className="csgrid__open-copy">
              <span className="sgrid__flow-eyebrow">Diagrams</span>
              <span className="csgrid__open-title">Process diagrams</span>
              <span className="bento__desc">The automation, eligibility checks and chart prep, drawn out.</span>
            </span>
            <span className="csgrid__thumbs" aria-hidden="true">
              {caseDiagrams.slice(0, 3).map((f) => (
                <ThemedImg key={f.file} src={f.thumb} />
              ))}
            </span>
            <span className="sgrid__case-cta">
              Open the diagrams
              <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
            </span>
          </button>

          <button
            type="button"
            className="bento__card bento__card--btn csgrid__open"
            onClick={(e) => show(SYSTEMS_LIST, e.currentTarget)}
            aria-haspopup="dialog"
          >
            <span className="csgrid__open-copy">
              <span className="sgrid__flow-eyebrow">Systems</span>
              <span className="csgrid__open-title">Systems I work in</span>
              <span className="bento__desc">The EMRs, payer portals and macros I use, and how much I have used each.</span>
            </span>
            <span className="csgrid__chips" aria-hidden="true">
              {SYSTEMS.map((n) => (
                <span key={n.id} className="bento__chip" data-status={n.status}>
                  <ToolMark logo={n.logo} Icon={n.Icon} size={15} />
                  {!n.logo?.wordmark && n.name}
                </span>
              ))}
            </span>
            <span className="sgrid__case-cta">
              Open the systems list
              <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
            </span>
          </button>
        </div>

        <p className="sgrid__offers-sub csgrid__privacy">{caseStudy.privacy}</p>
      </div>

      {open && (
        <ProjectModal title={open.title} onClose={close}>
          <open.Section />
        </ProjectModal>
      )}
    </section>
  )
}
