import { Fragment, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, CalendarBlank, EnvelopeSimple, FileText, Wrench, CursorClick } from '@/components/slab'
import { FlowIcon, PlanIcon, SparkIcon } from './ProjectIcons'
import { CaseStudyWindow, SchedulesPanel, NotificationsPanel, FlyersPanel, ImprovementsWindow, BarrelPanel, AIWindow } from './ProjectPanels'
import { caseDiagrams } from '@/data/funnels'
import { automations } from '@/data/projects'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { useIsPhone } from '@/hooks/useMediaQuery'

/**
 * Case Studies, as one viewport in Home's bento language: a glass panel of
 * cards, each previewing its own body of work, each opening the work itself
 * in a near-fullscreen dialog (see ProjectPanels).
 *
 * The dialog is a portal at z 8000, under the carousel preview (9000) so the
 * barrel's own "open this diagram" dialog can still stack on top of it.
 */
type Project = {
  id: string
  index: string
  title: string
  desc: string
  Icon: ComponentType<{ size?: number }>
  eyebrow: string
  Section: ComponentType
  span?: 2
  /** Open Builds style: a small orange kicker above the title. */
  kicker?: string
  /** Real marks of what the work was built in; replaces the icon tile. */
  logos?: string[]
  Preview: ComponentType
  /** Phone filter bucket. */
  cat: Cat
}

type Cat = 'work' | 'sites' | 'ai'
const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'work', label: 'Case studies' },
  { key: 'sites', label: 'Diagrams' },
  { key: 'ai', label: 'Systems' },
]

/** The three automations: each its own card in the stack, each its own
 *  pop-up. */
const BUILDS: Project[] = [
  { id: 'ticketing', cat: 'work', index: '02', kicker: 'Automation 01', title: automations[0].title, desc: automations[0].short, Icon: () => <CalendarBlank size={20} weight="duotone" />, eyebrow: 'Automation', Section: SchedulesPanel, Preview: () => null },
  { id: 'framework', cat: 'work', index: '03', kicker: 'Automation 02', title: automations[1].title, desc: automations[1].short, Icon: () => <EnvelopeSimple size={20} weight="duotone" />, eyebrow: 'Automation', Section: NotificationsPanel, Preview: () => null },
  { id: 'workflow', cat: 'work', index: '04', kicker: 'Automation 03', title: automations[2].title, desc: automations[2].short, Icon: () => <FileText size={20} weight="duotone" />, eyebrow: 'Automation', Section: FlyersPanel, Preview: () => null },
]

const leaves = (n: StackNode): StackNode[] => (n.children?.length ? n.children.flatMap(leaves) : [n])
const AI_LEAVES = leaves(aiStack)

/* ---------- Previews ---------- */

/** A paper mock of the case study: the macro's steps, ending with review. */
function PlanPreview() {
  return (
    <div className="bento__media bento__doc" aria-hidden="true">
      <span className="bento__doc-eyebrow">Case study</span>
      <span className="bento__doc-title">3 hrs to 1 hr a day, estimated.</span>
      <span className="bento__doc-flow">
        <i>Excel</i>
        <i>Macro</i>
        <i>Outlook</i>
        <i className="is-on">Review</i>
      </span>
      <span className="bento__doc-line" />
      <span className="bento__doc-line bento__doc-line--short" />
    </div>
  )
}

/** The first three diagrams, fanned. Letterboxed on the diagrams' own
 *  background so the 16:9 art is not cropped by the 3:4 frame. */
function FunnelsPreview() {
  return (
    <div className="bento__media bento__fan" aria-hidden="true">
      {caseDiagrams.slice(0, 3).map((f, i) => (
        <span key={f.file} className="bento__photo bento__photo--page" style={{ ['--i' as string]: i }}>
          <img src={f.thumb} alt="" loading="lazy" decoding="async" style={{ objectFit: 'contain', background: '#0B1720' }} />
        </span>
      ))}
    </div>
  )
}

/** The two smaller fixes as a paper note. */
function ImprovementsPreview() {
  return (
    <div className="bento__media bento__doc" aria-hidden="true">
      <span className="bento__doc-eyebrow">Other improvements</span>
      <span className="bento__doc-title">Facility headings in PointClickCare.</span>
      <span className="bento__doc-line" />
      <span className="bento__doc-title">Facility flyer template.</span>
      <span className="bento__doc-line bento__doc-line--short" />
    </div>
  )
}

function AIPreview() {
  const half = Math.ceil(AI_LEAVES.length / 2)
  const rows = [AI_LEAVES.slice(0, half), AI_LEAVES.slice(half)]
  return (
    <div className="bento__media bento__chips" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
          <div className="bento__chip-track">
            {[...row, ...row].map((n, i) => (
              <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                <n.Icon size={15} weight="duotone" />
                {n.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const PROJECTS: Project[] = [
  { id: 'plan', cat: 'work', index: '01', title: 'Automating administrative draft generation', desc: 'Daily task time from about 3 hrs to about 1 hr (estimated, based on the previous manual process). Approved for operational use.', Icon: PlanIcon, eyebrow: 'Case study', Section: CaseStudyWindow, span: 2, Preview: PlanPreview },
  { id: 'funnels', cat: 'sites', index: '05', title: 'Process diagrams', desc: 'The automation, eligibility checks and chart prep, drawn out. Spin the reel.', Icon: FlowIcon, eyebrow: 'Diagrams', Section: BarrelPanel, Preview: FunnelsPreview },
  { id: 'apps', cat: 'work', index: '06', title: 'Other improvements', desc: 'Missing facility headings added in PointClickCare, and a flyer template the client approved for ongoing use.', Icon: Wrench, eyebrow: 'Other improvements', Section: ImprovementsWindow, span: 2, Preview: ImprovementsPreview },
  { id: 'ai', cat: 'ai', index: '07', title: 'Systems', desc: 'The EMRs, payer portals and macros I work in, and how much I have used each.', Icon: SparkIcon, eyebrow: 'Systems', Section: AIWindow, span: 2, Preview: AIPreview },
]

/** The icon tile, or the real marks stacked horizontally in its place. */
function Marks({ p, size = 22 }: { p: Project; size?: number }) {
  if (!p.logos?.length) {
    return (
      <span className="bento__icon">
        <p.Icon size={size} />
      </span>
    )
  }
  return (
    <span className="bento__logos" aria-hidden="true">
      {p.logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- Dialog ----------
   A backdrop, a close button in the corner, and the work. No panel, no
   header: each Section brings its own window (or, for the strip, none). */
function ProjectModal({ project, onClose, children }: { project: Project; onClose: () => void; children: ReactNode }) {
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
      aria-label={project.title}
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
  const [open, setOpen] = useState<Project | null>(null)
  const phone = useIsPhone()
  const [cat, setCat] = useState<Cat | 'all'>('all')
  const keep = (p: Project) => !phone || cat === 'all' || p.cat === cat
  const projects = PROJECTS.filter(keep)
  const builds = BUILDS.filter(keep)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((p: Project, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(p)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const stack = builds.length > 0 ? (
    <div className="bento__stack">

        {builds.map((b) => (

          <button

            key={b.id}

            type="button"

            className="bento__card bento__card--btn bento__card--build"

            onClick={(e) => show(b, e.currentTarget)}

            aria-haspopup="dialog"

          >

            <span className="bento__build-plate">

              {b.logos?.length ? <img src={b.logos[0]} alt="" width={22} height={22} /> : <b.Icon />}

            </span>

            <span className="bento__build-text">

              <span className="bento__kicker">{b.kicker}</span>

              <span className="bento__build-title">{b.title}</span>

              <span className="bento__build-desc">{b.desc}</span>

            </span>

            <span className="bento__build-arrow">

              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />

            </span>

          </button>

        ))}

      </div>
  ) : null

  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Case Studies</span>
        <h1 className="pgrid__title" id="projects-title">
          I look for ways to improve workflows, not just run them.
        </h1>
        <p className="pgrid__lede">Three macros I built with Excel, Outlook and Word, two smaller fixes, and the systems I work in. Open a card to see it full size.</p>
      </header>

      {phone && (
        <div className="pfilter" role="group" aria-label="Filter case studies">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="pfilter__btn"
              aria-pressed={cat === f.key}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="home__glass pgrid__glass">
        {/* Hung on the sheet's top edge so it reads as a tag on the container,
            not another card. aria-hidden: the lede already says it. */}
        <span className="pgrid__hint" aria-hidden="true">
          <CursorClick size={14} weight="duotone" />
          Click a card to open it
        </span>
        <div className="bento bento--projects">
          {projects.map((p) => (
            <Fragment key={p.id}>
            <button
              type="button"
              className={`bento__card bento__card--btn${p.span === 2 ? ' bento__card--wide' : ''}`}
              data-id={p.id}
              onClick={(e) => show(p, e.currentTarget)}
              aria-haspopup="dialog"
            >
              <span className="bento__head">
                <Marks p={p} />
                <span className="bento__title">{p.title}</span>
                <span className="bento__desc">{p.desc}</span>
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
              </span>
              <p.Preview />
            </button>
            {p.id === 'plan' && stack}
            </Fragment>
          ))}
          {!projects.some((p) => p.id === 'plan') && stack}
        </div>
      </div>

      {open && (
        <ProjectModal project={open} onClose={close}>
          <open.Section />
        </ProjectModal>
      )}
    </section>
  )
}
