import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  ChartLineUp,
  Briefcase,
  CalendarCheck,
  IdentificationCard,
  Medal,
  Trophy,
  SealCheck,
  type Icon as PhosphorIcon,
} from '@/components/slab'
import { ROLES, EXPERIENCE, AVAILABILITY, type HomeRow } from '@/data/home'
import { asset } from '@/lib/asset'
import ThemedImg from '@/components/ThemedImg'

/**
 * Home's showcase, ordered for a recruiter's first 30 seconds. Top row:
 * where I've worked (wide), the roles I fit, the track record. Bottom row:
 * the credential, when I can start, and the results case study (wide). Every card is a link, and every fact is one the About page,
 * the résumé or the role pages already state.
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

// Results from past roles, as the About page and /va state them. Self-reported.
const RECORD = [
  { name: 'Team ranked 1st of 5', role: 'Optum, a team I coached as subject matter expert', work: 'Coaching · Documentation' },
  { name: '1st of 5 teams, multiple months', role: 'Teleperformance, and 1st on my own team', work: 'Booking support' },
  { name: 'Flyer redesign adopted', role: 'Resident Eye Care Associates', work: 'Approved for ongoing use' },
  { name: 'Facility headings fixed', role: 'Resident Eye Care Associates', work: 'Noticed by my supervisor' },
  { name: 'About 3 hrs to about 1', role: 'Schedule prep, with three macros', work: 'Estimated' },
]

/** A ledger of rows: tile, title over a short note, optional index. Fewer
 *  rows (`few`) show their notes at a smaller card height. */
function Ledger({ rows, few, numbered }: { rows: HomeRow[]; few?: boolean; numbered?: boolean }) {
  return (
    <ul className={`bento__media bento__offers${few ? ' bento__offers--few' : ''}`} role="list">
      {rows.map(({ Icon, title, note, when, short }, i) => (
        <li key={title + note} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
          {Icon && (
            <span className="bento__offer-tile">
              <Icon size={15} weight="duotone" aria-hidden="true" />
            </span>
          )}
          <span className="bento__offer-text">
            <span className="bento__offer-title">
              {short ? (
                <>
                  <span className="bento__offer-long">{title}</span>
                  <span className="bento__offer-short">{short}</span>
                </>
              ) : (
                title
              )}
            </span>
            <span className="bento__offer-note">{note}</span>
          </span>
          {when && <span className="bento__offer-when">{when}</span>}
          {numbered && (
            <span className="bento__offer-num" aria-hidden="true">
              0{i + 1}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

function CardHead({
  Icon,
  title,
  desc,
  more,
}: {
  Icon: PhosphorIcon
  title: string
  desc: string
  /** An extra sentence under the description, for the wide cards. */
  more?: string
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
      {more && <p className="bento__more">{more}</p>}
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* Experience: employers and years, the first thing a recruiter checks,
          so it opens the grid in a wide card. Keeps the --about class. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={Briefcase} title="Experience" desc="5+ years in U.S. healthcare, at a practice and a health plan." />
        <Ledger rows={EXPERIENCE} few />
      </Link>

      {/* Roles I fit: job titles with the evidence for each. Keeps the old
          Services slot; the Services page still holds the full detail. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={IdentificationCard} title="Roles I fit" desc="Remote healthcare admin roles." />
        <Ledger rows={ROLES} numbered />
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

      {/* Availability: start date, hours and setup. Keeps the old Systems slot. */}
      <Link to="/contact" className="bento__card bento__card--ai">
        <CardHead Icon={CalendarCheck} title="Availability" desc="Open to work, remote." />
        <Ledger rows={AVAILABILITY} few />
      </Link>

      {/* Results: the wide card that closes the grid. The head carries the
          result and one line on how it was built; the diagrams drift upward
          on a looped track beside it. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead
          Icon={ChartLineUp}
          title="Results"
          desc="Case study: three macros cut an estimated 3-hour daily task to about 1."
          more="I built them in Excel, Outlook and Word for 18 doctors' daily schedules, and I still review every draft before it goes out."
        />
        <div className="bento__media bento__reel" aria-hidden="true">
          <div className="bento__reel-track">
            {[...PROJECT_SHOTS, ...PROJECT_SHOTS].map((f, i) => (
              <span key={i} className="bento__shot">
                <ThemedImg src={f} />
              </span>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
