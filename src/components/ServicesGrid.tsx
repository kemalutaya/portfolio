import type { CSSProperties } from 'react'
import { IdentificationCard, ShieldCheck, ArrowsSplit, CheckCircle } from '@/components/slab'
import type { Icon } from '@/components/slab'
import Autopilot, { TOOLS } from '@/components/Autopilot'
import { asset } from '@/lib/asset'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Three bands, top to bottom: how an eligibility check resolves (on a dark
 * plate so it is the first thing the eye lands on), the six services as
 * cards, and the schedule macro drawn as a live flow. Every line is taken
 * from the live site's #services, "Where I add value" and #improvements
 * sections; nothing here is invented.
 */

/* ---------- The eligibility check ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Patient + plan',
    body: 'Start from the patient and plan details: member ID and date of birth.',
    Icon: IdentificationCard,
    chips: ['Member ID', 'DOB'],
  },
  {
    index: '02',
    label: 'Payer portal',
    body: 'Verify eligibility and benefits in the payer portal.',
    Icon: ShieldCheck,
    chips: ['Availity', 'NJMMIS', 'Davis Vision', 'March Vision', 'UnitedHealthcare'],
  },
  {
    index: '03',
    label: 'Outcome',
    body: 'Active goes on to chart prep. Terminated is flagged to the office. Prior auth is escalated; clinical review stays with the RN.',
    Icon: ArrowsSplit,
    chips: ['Active', 'Terminated', 'Needs prior auth'],
  },
]

/* ---------- The services ---------- */

// Neutral glyphs from /public/icons/tools, the same marks the tools marquee
// uses for these systems. Decorative only.
const SHIELD = asset('/icons/tools/shield.svg')
const IDCARD = asset('/icons/tools/idcard.svg')
const EYE = asset('/icons/tools/eye.svg')
const DATABASE = asset('/icons/tools/database.svg')
const BUILDING = asset('/icons/tools/building.svg')
const DOC = asset('/icons/tools/doc.svg')
const SHEET = asset('/icons/tools/sheet.svg')
const MAIL = asset('/icons/tools/mail.svg')

type Service = {
  index: string
  title: string
  description: string
  /** Depth tier from the live site's "Where I add value" ladder, where one maps. */
  chip?: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Insurance Verification',
    description:
      'Eligibility and benefits verification across Medicare, Medicaid, and vision plans, plus ongoing patient insurance information review.',
    chip: 'Hands-On, Daily',
    logos: [SHIELD, IDCARD, EYE],
    bullets: ['Availity', 'NJMMIS', 'UnitedHealthcare', 'Davis Vision', 'March Vision'],
  },
  {
    index: '02',
    title: 'EMR & Patient Records',
    description:
      'Patient creation, demographic updates, document uploads, and day-to-day record maintenance inside the EMR.',
    chip: 'Hands-On, Daily',
    logos: [DATABASE, BUILDING, IDCARD],
    bullets: ['ICD-10 / CPT entry', 'Medication documentation', 'Report generation', 'Census updates'],
  },
  {
    index: '03',
    title: 'Chart Preparation',
    description:
      'Pre-charting for upcoming physician schedules: reviewing allergies, diagnoses, and medication history, and flagging anything missing before the visit.',
    chip: 'Hands-On, Daily',
    logos: [BUILDING, DATABASE, DOC],
    bullets: ['Allergies & diagnoses', 'Medication history', 'PDPM lookups'],
  },
  {
    index: '04',
    title: 'Healthcare Documentation',
    description:
      'EOB processing with CPT/payment matching, dictation editing, and the day-to-day documentation that keeps records accurate.',
    chip: 'Hands-On, Daily',
    logos: [DOC, SHEET, DATABASE],
    bullets: ['EOB processing', 'Dictation editing', 'Data entry'],
  },
  {
    index: '05',
    title: 'Facility & Physician Support',
    description:
      'Facility census and status verification, plus the notifications, flyers, and schedule communications that keep physicians and facilities coordinated.',
    logos: [SHEET, MAIL, DOC],
    bullets: ['Facility notifications', 'Doctor-visit flyers', 'Room confirmations'],
  },
  {
    index: '06',
    title: 'Prior Authorization Support',
    description:
      'Prior authorization intake, eligibility verification, and CPT entry, including urgent, out-of-network, and peer-to-peer requests, escalated to clinical personnel when needed.',
    chip: 'Prior Experience',
    logos: [SHIELD, DOC, IDCARD],
    bullets: ['Medical & surgical', 'DME / Part B', 'Transplant'],
  },
]

// Six cards, three to a row. The stylesheet's five-column rule is shared with
// other views, so the column count is set here, the same way RoleView does it.
const CARDS: CSSProperties = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(max(min(100%, 240px), calc((100% - 32px) / 3)), 1fr))',
}

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Back-office support across the healthcare workflow.
        </h1>
        <p className="pgrid__lede">
          Six areas where I regularly support healthcare teams, from eligibility checks to chart preparation.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate: the eligibility check on the left, its three
            stages wired in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">Eligibility check</span>
            <h2 className="sgrid__method-title" id="method-title">
              Patient. Portal. Outcome.
              <br />
              <span>How a verification resolves.</span>
            </h2>
            <p className="sgrid__method-sub">
              Illustration of the process. No patient or payer data shown.
            </p>
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
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Six cards, one per service, tagged with the depth tier where the
            live site's ladder names one. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">What I do.</h2>
            <p className="sgrid__offers-sub">
              My strongest fit is back-office healthcare support. I&rsquo;m open to limited call
              handling, but I&rsquo;m not positioning myself as a high-volume inbound call specialist.
            </p>
          </div>
          <ul className="bento sgrid__services" role="list" style={CARDS}>
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / {String(SERVICES.length).padStart(2, '0')}</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                {s.chip && <span className="sgrid__chip">{s.chip}</span>}
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="sgrid__offers-sub">
            Prior authorization experience was gained at Optum and reflects administrative and
            operational workflow support. Clinical authorization decisions remained with licensed
            clinical personnel.
          </p>
        </div>

        {/* The schedule macro as a live flow. Its caption and the tool chips sit in a header
            above the window, so the canvas gets the whole glass width. */}
        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">Automation</span>
              <h2 className="sgrid__flow-title">How the schedule macro works.</h2>
              <p className="sgrid__flow-sub">
                Excel holds the doctor and facility assignments. The macro matches the highlighted
                facility to the assigned doctor, attaches the required files and builds the Outlook
                draft. I review every detail, then send. Illustration of the process, not a
                screenshot; no patient or facility data shown.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools that power this flow">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>
      </div>
    </section>
  )
}
