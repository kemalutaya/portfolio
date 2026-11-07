import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Database,
  ShieldCheck,
  IdentificationCard,
  ClipboardText,
  FileText,
  Stamp,
  Medal,
  Stack,
  Trophy,
  SealCheck,
} from '@/components/slab'
import { aiStack, type StackNode } from '@/data/ai-stack'
import ToolMark from './ToolMark'
import { profile } from '@/data/profile'
import { asset } from '@/lib/asset'

/**
 * Home's showcase: one card per rail view, each an index of what that view
 * holds, each built from content the portfolio already ships. Every card is
 * a link. Nothing here invents a fact - the funnels, the tools, the clients
 * and the credentials are the same records the views render in full.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */

// Real diagrams of the work, drawn as SVG: the automation case study and the
// two everyday processes it sits inside. No product screenshots are implied.
const PROJECT_SHOTS = [
  asset('/home/case-impact.svg'),
  asset('/home/case-automation.svg'),
  asset('/home/case-eligibility.svg'),
  asset('/home/case-chartprep.svg'),
]

const OFFERS = [
  { Icon: ShieldCheck, title: 'Insurance Verification', note: 'Medicare, Medicaid and vision eligibility' },
  { Icon: IdentificationCard, title: 'EMR & Patient Records', note: 'Records, demographics, uploads' },
  { Icon: ClipboardText, title: 'Chart Preparation', note: 'Next-day physician schedules' },
  // Shorter than the Services page names: the card is too narrow at 1280-1440
  // for "Healthcare Documentation" or "Prior Authorization Support" on one
  // line, and cut to "Prior Authorization Su..." it read as a mistake.
  { Icon: FileText, title: 'Documentation', note: 'EOBs, CPT matching, dictation' },
  { Icon: Stamp, title: 'Prior Authorization', note: 'Intake, eligibility, CPT entry' },
] as const

// Results from past roles, as the About page and /va state them. Self-reported.
const RECORD = [
  { name: 'Team ranked 1st of 5', role: 'Optum, a team I coached as subject matter expert', work: 'Coaching · Documentation' },
  { name: '1st of 5 teams, multiple months', role: 'Teleperformance, and 1st on my own team', work: 'Booking support' },
  { name: 'Flyer redesign adopted', role: 'Resident Eye Care Associates', work: 'Approved for ongoing use' },
  { name: 'Facility headings fixed', role: 'Resident Eye Care Associates', work: 'Noticed by my supervisor' },
  { name: 'About 3 hrs to about 1', role: 'Schedule prep, with three macros', work: 'Estimated' },
]

/** The AI systems as a flat list: every leaf of the Projects tree, in order. */
const leaves = (n: StackNode): StackNode[] =>
  n.children?.length ? n.children.flatMap(leaves) : [n]
// Training-only systems (Elation, Practice Fusion) stay out of the chips: the
// card says "hands-on daily", and the Systems list labels them properly.
const AI_BUILDS = leaves(aiStack).filter((n) => n.status !== 'Training')

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const half = Math.ceil(AI_BUILDS.length / 2)
  const toolRows = [AI_BUILDS.slice(0, half), AI_BUILDS.slice(half)]

  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* Projects: the funnel thumbnails drift upward on a looped track. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Case Studies" desc="An automation that cut an estimated 3-hour daily task to about 1." />
        <div className="bento__media bento__reel" aria-hidden="true">
          <div className="bento__reel-track">
            {[...PROJECT_SHOTS, ...PROJECT_SHOTS].map((f, i) => (
              <span key={i} className="bento__shot">
                <img src={f} alt="" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* About: the one real portrait. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="Five years inside U.S. healthcare operations." />
        <div className="bento__media bento__fan" aria-hidden="true">
          <span className="bento__photo bento__photo--solo" style={{ ['--i' as string]: 1 }}>
            <img src={profile.avatarSrc} alt="" loading="lazy" decoding="async" />
          </span>
        </div>
      </Link>

      {/* Systems: the EMRs and payer portals from ai-stack.ts, two chip rows
          scrolling against each other. */}
      <Link to="/projects" className="bento__card bento__card--ai">
        <CardHead Icon={Database} title="Systems" desc="Hands-on daily in EMRs and payer portals." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {toolRows.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((n, i) => (
                  <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                    <ToolMark logo={n.logo} Icon={n.Icon} size={15} />
                    {!n.logo?.wordmark && n.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* Credentials: the badge that matters, on its plate. */}
      <Link to="/about" className="bento__card bento__card--creds">
        <CardHead Icon={Medal} title="Credentials" desc="HIPAA Certified by Biologix, renewed 2026." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring">
            <img src={asset('/hipaa-badge.svg')} alt="" width={72} height={72} />
          </span>
          <span className="bento__badge-tag">
            <SealCheck size={14} weight="fill" />
            HIPAA Certified
          </span>
        </div>
      </Link>

      {/* Services: the five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="Back-office support for U.S. and UK healthcare teams." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* Track record: result cards drifting up a clipped column. It keeps the
          old Testimonials slot (and its --quotes layout class). */}
      <Link to="/about" className="bento__card bento__card--quotes">
        <CardHead Icon={Trophy} title="Track record" desc="Results from past roles, self-reported." />
        <div className="bento__media bento__reviews" aria-hidden="true">
          <div className="bento__reviews-track">
            {[...RECORD, ...RECORD].map((c, i) => (
              <span key={i} className="bento__review">
                <span className="bento__review-top">
                  <Trophy size={14} weight="fill" />
                  <b>{c.name}</b>
                </span>
                <span className="bento__review-role">{c.role}</span>
                <span className="bento__review-work">{c.work}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
