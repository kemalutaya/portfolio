import { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  SquaresFour,
  Stethoscope,
  Buildings,
  FileDoc,
  FlowArrow,
  MicrosoftExcelLogo,
  CaretRight,
  CheckCircle,
  ShieldCheck,
  UserCheck,
  EnvelopeSimple,
  CalendarDots,
  TextAa,
  Lightning,
} from '@/components/slab'
import type { Icon } from '@/components/slab'

/**
 * Flagship - the automation case study. Used at the bottom of Projects and
 * as the body of the /showcase (Automation) page. Walks through the three
 * macros built with Excel, Outlook and Word via a 5-tab carousel.
 *
 * Architecture:
 *   - Tabs control the carousel slide. Click to switch instantly.
 *   - The active slide auto-advances every 6s but pauses on hover and
 *     when the carousel is offscreen (IntersectionObserver) so it does
 *     not chew CPU when the user is reading the rest of the page.
 *
 * The preview is NOT a screenshot and does not depict a software product.
 * Every slide is a hand-built HTML/CSS illustration of what the macros fill
 * in (an Excel sheet, an Outlook draft, a flyer), with no patient or facility
 * data, and the frame is labelled "Illustration" for that reason. The mock
 * sits on a container-query stage (.flagship__stage) whose font-size is the
 * single scale knob - every dimension inside is in em, so Phosphor icons in
 * the mock take an em size, never px.
 *
 * Every fact below comes from the live site's #improvements and #security
 * sections. Figures keep their qualifiers.
 */

type TabId = 'overview' | 'schedules' | 'notifications' | 'flyers' | 'how'

type FlagshipTab = {
  id: TabId
  label: string
  /** Display text in the frame's address strip. Not a route. */
  path: string
  /** Heading in the frame's top strip. */
  pageTitle: string
  caption: string
  Icon: Icon
}

const ILLUSTRATION_NOTE =
  'Illustration of the process, not a screenshot. No patient or facility data shown.'

const TABS: FlagshipTab[] = [
  {
    id: 'overview',
    label: 'Overview',
    path: ' / three automations',
    pageTitle: 'Overview',
    caption:
      'Three recurring daily tasks, each one manual, repetitive and error-prone, automated with Excel, Outlook and Word macros. Daily schedule prep went from 3 hours to 1, estimated from the previous manual process.',
    Icon: SquaresFour,
  },
  {
    id: 'schedules',
    label: 'Schedules',
    path: ' / Outlook draft',
    pageTitle: 'Physician schedules',
    caption:
      "13 doctors, each assigned 1–10 facilities daily. The macro matches the highlighted facility to the correct doctor's email, CCs the right staff and attaches the right files, which eliminated wrong-doctor, wrong-CC and wrong-attachment errors.",
    Icon: Stethoscope,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    path: ' / Outlook draft',
    pageTitle: 'Facility notifications',
    caption:
      '50+ facilities, each with its own contact details. The macro drafts each notification with the correct facility email, date, template and attachments: 25+ notifications a day with zero mistakes (typical; exact daily volume varied).',
    Icon: Buildings,
  },
  {
    id: 'flyers',
    label: 'Flyers',
    path: ' / flyer draft',
    pageTitle: 'Doctor-visit flyers',
    caption:
      'Same drafting logic, plus auto-renaming the facility name and visit date per doctor. It took the longest to build: some facility names run long, and the flyer layout had to be adjusted to handle that without breaking.',
    Icon: FileDoc,
  },
  {
    id: 'how',
    label: 'How it works',
    path: ' / Excel to Outlook',
    pageTitle: 'How the schedule macro works',
    caption:
      'Built only with the tools already on a locked-down remote desktop, where installing anything new required IT approval. The macro builds the draft; I review every detail and send it myself. Presented and approved for operational use.',
    Icon: FlowArrow,
  },
]

/* ---- Illustration data. Decorative only (the frame is aria-hidden); the
   same facts are in the captions above, which screen readers do get. */

/** Sidebar rows: one per tab, so the active one follows the carousel. */
const NAV: { id: TabId; label: string; Icon: Icon }[] = [
  { id: 'overview', label: 'Overview', Icon: SquaresFour },
  { id: 'schedules', label: 'Physician schedules', Icon: Stethoscope },
  { id: 'notifications', label: 'Facility notifications', Icon: Buildings },
  { id: 'flyers', label: 'Doctor-visit flyers', Icon: FileDoc },
  { id: 'how', label: 'How it works', Icon: FlowArrow },
]

/* Scale card in the sidebar (reuses the clock card's layout). */
const SCALE = [
  { value: '13', label: 'Doctors' },
  { value: '50+', label: 'Facilities' },
]

const GO_TO = ['Schedules', 'Notifications', 'Flyers', 'How it works']

type Automation = { n: string; figure: string; title: string; text: string }

const AUTOMATIONS: Automation[] = [
  {
    n: '01',
    figure: '13 doctors',
    title: 'Physician Schedules',
    text: "Matches the highlighted facility to the correct doctor's email, CCs the right staff and attaches the right files.",
  },
  {
    n: '02',
    figure: '50+ facilities',
    title: 'Facility Notifications',
    text: 'Drafts each notification with the correct facility email, date, template and attachments.',
  },
  {
    n: '03',
    figure: 'Longest build',
    title: 'Doctor-Visit Flyers',
    text: 'Same drafting logic, plus auto-renaming the facility name and visit date per doctor.',
  },
]

/** One field of a draft the macro fills in. `tone` picks an existing pill colour. */
type Field = { label: string; tone: 'olj' | 'linkedin' | 'jobstreet'; title: string; meta: string }

const SCHEDULE_FIELDS: Field[] = [
  { label: 'To', tone: 'linkedin', title: "The assigned doctor's email", meta: 'Matched to the highlighted facility' },
  { label: 'CC', tone: 'linkedin', title: 'The right staff', meta: 'Set by the macro' },
  { label: 'Subject', tone: 'jobstreet', title: 'Filled by the macro', meta: 'Part of the built draft' },
  { label: 'Body', tone: 'jobstreet', title: 'Filled by the macro', meta: 'Part of the built draft' },
  { label: 'Attach', tone: 'olj', title: 'The required files', meta: 'Located and attached by the macro' },
]

const NOTIFICATION_FIELDS: Field[] = [
  { label: 'To', tone: 'linkedin', title: "The facility's own email", meta: 'From its contact details' },
  { label: 'Date', tone: 'jobstreet', title: 'The correct date', meta: 'Filled by the macro' },
  { label: 'Template', tone: 'jobstreet', title: 'The correct template', meta: 'Filled by the macro' },
  { label: 'Attach', tone: 'olj', title: 'The correct attachments', meta: 'Filled by the macro' },
]

type Tile = { name: string; note: string; Icon: Icon }

const FLYER_TILES: Tile[] = [
  { name: 'Drafting logic', note: 'Same as the other two', Icon: Lightning },
  { name: 'Facility name', note: 'Auto-renamed per doctor', Icon: Buildings },
  { name: 'Visit date', note: 'Auto-renamed per doctor', Icon: CalendarDots },
  { name: 'Long names', note: 'Layout adjusted so it does not break', Icon: TextAa },
  { name: 'Review', note: 'Checked by me before it goes out', Icon: UserCheck },
]

/* The schedule macro, grouped by where each step happens. */
const STEPS: { name: string; tasks: string[] }[] = [
  { name: 'Excel', tasks: ['Doctor + facility assignment sheet'] },
  {
    name: 'Macro',
    tasks: [
      'Match the highlighted facility to the assigned doctor',
      'Locate and attach the required patient files',
    ],
  },
  { name: 'Outlook', tasks: ['Draft built: recipient, CC, subject, body, attachments'] },
  { name: 'Me', tasks: ['Review every detail, then send'] },
]

/* ---- The frame. Every slide renders inside this, so switching tabs moves
   the active row in the sidebar and retitles the top strip. Pure markup, no
   images, no network. The parent is aria-hidden. */

function Shell({ tab, children }: { tab: FlagshipTab; children: React.ReactNode }) {
  return (
    <div className="flagship__app">
      <aside className="flagship__side" style={{ ['--i' as string]: 0 }}>
        <div className="flagship__side-head">
          <span className="flagship__logo">
            <MicrosoftExcelLogo weight="fill" size="1.05em" />
          </span>
          <span className="flagship__wordmark">
            Excel <span className="flagship__wordmark-accent">macros</span>
          </span>
        </div>

        <div className="flagship__clock">
          {SCALE.map((c) => (
            <span key={c.label} className="flagship__clock-row">
              <span className="flagship__clock-time">{c.value}</span>
              <span className="flagship__clock-zone">{c.label}</span>
            </span>
          ))}
        </div>

        <div className="flagship__nav">
          {NAV.map((n) => {
            const NavIcon = n.Icon
            const active = n.id === tab.id
            return (
              <span
                key={n.id}
                className={`flagship__navrow${active ? ' is-active' : ''}`}
              >
                <NavIcon weight={active ? 'fill' : 'regular'} size="1em" />
                <span className="flagship__navrow-label">{n.label}</span>
                <CaretRight weight="bold" size="0.7em" className="flagship__navrow-caret" />
              </span>
            )
          })}
        </div>

        <div className="flagship__side-foot">
          <div className="flagship__shortcuts">
            <span className="flagship__shortcuts-head">Built with</span>
            <span className="flagship__shortcuts-btn">Excel, Outlook, Word</span>
          </div>
          <span className="flagship__side-link">
            <ShieldCheck weight="regular" size="1em" />
            Only tools already on the machine
          </span>
          <span className="flagship__side-link">
            <UserCheck weight="regular" size="1em" />
            I review and send
          </span>
        </div>
      </aside>

      <div className="flagship__main">
        <div className="flagship__chrome" style={{ ['--i' as string]: 1 }}>
          <span className="flagship__page-title">{tab.pageTitle}</span>
          <div className="flagship__chrome-right">
            <span className="flagship__fx">
              <span className="flagship__fx-dot" />
              Drafts only, I send
            </span>
          </div>
        </div>

        <div className="flagship__canvas">{children}</div>
      </div>
    </div>
  )
}

/** Small reusable page heading. */
function PageHead({ kicker, title, sub }: { kicker: string; title: string; sub: string }) {
  return (
    <div className="flagship__pagehead" style={{ ['--i' as string]: 2 }}>
      <span className="flagship__kicker">{kicker}</span>
      <span className="flagship__greeting">{title}</span>
      <span className="flagship__sub">{sub}</span>
    </div>
  )
}

/** The fields of one draft, as rows. Shared by Schedules and Notifications. */
function FieldRows({ fields }: { fields: Field[] }) {
  return (
    <div className="flagship__list">
      {fields.map((f, i) => (
        <div key={f.label} className="flagship__job" style={{ ['--i' as string]: i + 4 }}>
          <span className={`flagship__source flagship__source--${f.tone}`}>{f.label}</span>
          <span className="flagship__job-main">
            <span className="flagship__job-title">{f.title}</span>
            <span className="flagship__job-meta">{f.meta}</span>
          </span>
          <span className="flagship__state flagship__state--new">Filled</span>
          <CheckCircle weight="fill" size="0.85em" className="flagship__job-caret" />
        </div>
      ))}
    </div>
  )
}

function OverviewMock() {
  return (
    <>
      <PageHead
        kicker="Case study"
        title="Automating administrative draft generation."
        sub="Daily schedule prep: 3 hrs to 1 hr. Estimated, based on the previous manual process."
      />

      <div className="flagship__card" style={{ ['--i' as string]: 3 }}>
        <div className="flagship__card-head">
          <span className="flagship__label">Result</span>
        </div>
        <div className="flagship__card-body">
          <CheckCircle weight="fill" size="1.15em" className="flagship__ok" />
          <span>Presented the workflow and it was approved for operational use.</span>
        </div>
        <div className="flagship__card-foot">
          <span className="flagship__label">See</span>
          {GO_TO.map((g) => (
            <span key={g} className="flagship__goto">
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="flagship__news" style={{ ['--i' as string]: 4 }}>
        <span className="flagship__news-title">Three automations built</span>
      </div>

      {AUTOMATIONS.map((a, i) => (
        <div key={a.title} className="flagship__update" style={{ ['--i' as string]: i + 5 }}>
          <div className="flagship__update-when">
            <span className="flagship__update-date">{a.n}</span>
            <span className="flagship__update-year">Daily task</span>
            <span className="flagship__update-ago">{a.figure}</span>
          </div>
          <div className="flagship__update-body">
            <span className="flagship__update-title">{a.title}</span>
            <span className="flagship__update-text">{a.text}</span>
          </div>
        </div>
      ))}
    </>
  )
}

function SchedulesMock() {
  return (
    <>
      <PageHead
        kicker="Excel to Outlook"
        title="Physician schedules."
        sub="13 doctors, each assigned 1–10 facilities daily."
      />
      <div className="flagship__filters" style={{ ['--i' as string]: 3 }}>
        {['Excel sheet', 'Match', 'Attach', 'Outlook draft'].map((f, i) => (
          <span key={f} className={`flagship__filter${i === 3 ? ' is-active' : ''}`}>
            {f}
          </span>
        ))}
      </div>
      <FieldRows fields={SCHEDULE_FIELDS} />
      <span className="flagship__foot" style={{ ['--i' as string]: 9 }}>
        Wrong-doctor, wrong-CC and wrong-attachment errors eliminated. {ILLUSTRATION_NOTE}
      </span>
    </>
  )
}

function NotificationsMock() {
  return (
    <>
      <div className="flagship__leadbar" style={{ ['--i' as string]: 2 }}>
        <span className="flagship__field">
          <span className="flagship__field-label">Facility</span>
          <span className="flagship__field-value">One of 50+, each with its own contacts</span>
        </span>
        <span className="flagship__field">
          <span className="flagship__field-label">Per draft</span>
          <span className="flagship__field-value">Email, date, template, attachments</span>
        </span>
        <span className="flagship__leadgo">
          <EnvelopeSimple weight="fill" size="0.95em" />
          Draft
        </span>
      </div>

      <span className="flagship__leadmeta" style={{ ['--i' as string]: 3 }}>
        25+ notifications a day, zero mistakes. Typical; exact daily volume varied.
      </span>

      <FieldRows fields={NOTIFICATION_FIELDS} />

      <span className="flagship__foot" style={{ ['--i' as string]: 9 }}>
        {ILLUSTRATION_NOTE}
      </span>
    </>
  )
}

function FlyersMock() {
  return (
    <>
      <PageHead
        kicker="Flyer draft"
        title="Doctor-visit flyers."
        sub="The longest of the three to build."
      />
      <div className="flagship__grid">
        {FLYER_TILES.map((tile, i) => {
          const TileIcon = tile.Icon
          return (
            <div key={tile.name} className="flagship__tile" style={{ ['--i' as string]: i + 4 }}>
              <span className="flagship__tile-icon">
                <TileIcon weight="fill" size="1em" />
              </span>
              <span className="flagship__tile-name">{tile.name}</span>
              <span className="flagship__tile-note">{tile.note}</span>
            </div>
          )
        })}
      </div>
      <span className="flagship__foot" style={{ ['--i' as string]: 9 }}>
        {ILLUSTRATION_NOTE}
      </span>
    </>
  )
}

function HowMock() {
  return (
    <>
      <PageHead
        kicker="How the schedule macro works"
        title="Excel to Outlook, then me."
        sub="Built on a locked-down remote desktop with only the tools already there."
      />
      <div className="flagship__board">
        {STEPS.map((col, i) => (
          <div key={col.name} className="flagship__col" style={{ ['--i' as string]: i + 3 }}>
            <div className="flagship__col-head">
              <span className="flagship__col-name">{col.name}</span>
              <span className="flagship__col-count">{col.tasks.length}</span>
            </div>
            <div className="flagship__col-list">
              {col.tasks.map((t) => (
                <div key={t} className="flagship__task">
                  <span className="flagship__task-title">{t}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <span className="flagship__foot" style={{ ['--i' as string]: 9 }}>
        {ILLUSTRATION_NOTE}
      </span>
    </>
  )
}

const MOCKS: Record<TabId, React.ComponentType> = {
  overview: OverviewMock,
  schedules: SchedulesMock,
  notifications: NotificationsMock,
  flyers: FlyersMock,
  how: HowMock,
}

const AUTO_ADVANCE_MS = 6000

type FlagshipProps = {
  /** Overrides the eyebrow. Projects numbers its sections; the Automation
   *  page does not, so it passes its own label. */
  eyebrow?: string
}

export default function Flagship({ eyebrow = 'Automation' }: FlagshipProps = {}) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(true)
  const ref = useRef<HTMLDivElement | null>(null)

  // Pause auto-advance when the carousel is offscreen so we are not
  // running an interval the user cannot see.
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !inView) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % TABS.length)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [paused, inView])

  const onTabKey = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const dir = e.key === 'ArrowRight' ? 1 : -1
        const next = (index + dir + TABS.length) % TABS.length
        setActive(next)
        const buttons = e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        )
        buttons?.[next]?.focus()
      }
    },
    [],
  )

  const current = TABS[active]
  const Mock = MOCKS[current.id]

  return (
    <aside className="flagship" aria-labelledby="flagship-heading" ref={ref}>
      <header className="flagship__header">
        <span className="flagship__eyebrow">{eyebrow}</span>
        <h3 className="flagship__title" id="flagship-heading">
          Automating draft generation
        </h3>
        <p className="flagship__desc">
          Three recurring daily tasks (sending physician schedules, notifying facilities and
          preparing doctor-visit flyers) were manual and error-prone: wrong doctor, wrong CC,
          wrong date, wrong attachment. I designed and built all three automations myself with
          Excel, Outlook and Word macros, the tools already on the remote desktop, since
          installing anything new required IT approval. I still review and send every draft
          myself. I presented the workflow and it was approved for operational use.
        </p>
        <Link className="flagship__cta" to="/contact">
          Get in touch
          <ArrowUpRight weight="bold" size={16} aria-hidden="true" />
        </Link>
      </header>

      <div
        className="flagship__showcase"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="flagship__device" aria-hidden="true">
          <div className="flagship__device-bar">
            <span className="flagship__dot flagship__dot--red" />
            <span className="flagship__dot flagship__dot--amber" />
            <span className="flagship__dot flagship__dot--green" />
            <span className="flagship__device-url">
              <span className="flagship__device-url-host">Illustration</span>
              <span className="flagship__device-url-path">{current.path}</span>
            </span>
          </div>
          <div className="flagship__device-screen">
            {/* Re-keyed on tab change so the stage remounts and replays the
                staggered entrance instead of swapping content in place. */}
            <div className="flagship__stage" key={current.id}>
              <Shell tab={current}>
                <Mock />
              </Shell>
            </div>
          </div>
        </div>

        <div className="flagship__panel">
          <div className="flagship__tabs" role="tablist" aria-label="Automation case study">
            {TABS.map((tab, i) => {
              const TabIcon = tab.Icon
              const selected = i === active
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  className={`flagship__tab${selected ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <span className="flagship__tab-icon" aria-hidden="true">
                    <TabIcon size={16} weight="bold" />
                  </span>
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
          <p className="flagship__caption" key={current.id}>
            {current.caption}
          </p>
          <div className="flagship__progress" aria-hidden="true">
            {TABS.map((_, i) => (
              <span
                key={i}
                className={`flagship__progress-bar${i === active ? ' is-active' : ''}${paused || !inView ? ' is-paused' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
