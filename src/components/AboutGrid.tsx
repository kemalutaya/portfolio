import { Link } from 'react-router-dom'
import { GraduationCap, Student } from '@/components/slab'
import { profile } from '@/data/profile'
import { asset } from '@/lib/asset'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who I am on the left, the portrait on the
 * right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder: one statement, one paragraph of context with
 * the scope note, then the work history (dates in the left column where the
 * template had tool marks), then the credentials. Every fact here comes from
 * the live site's About, Work Experience and Credentials sections.
 */

type Role = {
  index: string
  when: string
  title: string
}

const EXPERIENCE: Role[] = [
  {
    index: '01',
    when: 'Nov 2023–Jul 2026',
    title: 'Medical Virtual Administrative Assistant, Resident Eye Care Associates',
  },
  {
    index: '02',
    when: 'Nov 2022–Oct 2023',
    title: 'Subject Matter Expert / Assistant Team Leader, Optum',
  },
  {
    index: '03',
    when: 'Nov 2020–Nov 2022',
    title: 'Customer Service Representative, Prior Authorization, Optum',
  },
  {
    index: '04',
    when: 'Additional',
    title: 'AI data annotation and transcription at Innodata and TELUS Digital AI; customer sales at Teleperformance; freelance Amazon product research',
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          A Medical Virtual Administrative Assistant based in the Philippines, supporting U.S. and UK healthcare teams remotely.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            5+ years in non-clinical healthcare administration.
            <span> Be accurate, be dependable, understand the workflow, and make the team’s job easier.</span>
          </p>

          <p className="agrid__note">
            I verify insurance eligibility, keep patient records accurate, prepare charts and review documentation.
            Most recently at <strong>Resident Eye Care Associates</strong>, working in Compulink and PointClickCare; before that,
            prior authorization at <strong>Optum</strong>. Clinical judgment, diagnosis and complex-case decisions stay
            with licensed clinical personnel.
          </p>

          <p className="agrid__note">
            Other work:{' '}
            <Link className="agrid__link" to="/da">
              AI data annotation &amp; transcription
            </Link>
            {' · '}
            <Link className="agrid__link" to="/va">
              General VA &amp; admin
            </Link>
          </p>

          <ul className="agrid__caps" role="list" aria-label="Work experience">
            {EXPERIENCE.map((r) => (
              <li key={r.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  <span className="agrid__cell-meta">{r.when}</span>
                </span>
                <span className="agrid__cap-title">{r.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {r.index}
                </span>
              </li>
            ))}
          </ul>

          {/* Credentials: one plate, a pair of cells and one full-width row. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--img">
                <img src={asset('/hipaa-badge.svg')} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">HIPAA Compliance Certification</span>
                <span className="agrid__cell-meta">Biologix · 2024, renewed 2026</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <GraduationCap size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">BS Computer Engineering</span>
                <span className="agrid__cell-meta">STI College Surigao · 2019</span>
              </span>
            </span>

            <span className="agrid__cell agrid__cell--wide">
              <span className="agrid__cell-mark">
                <Student size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Virtual Assistant Training</span>
                <span className="agrid__cell-meta">Ready To Round · 360MVA · VA Of The Future · 2024</span>
              </span>
            </span>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.hero.portraitSrc}
            alt={profile.hero.portraitAlt}
            loading="eager"
            decoding="async"
            width={640}
            height={640}
          />
        </div>
      </div>
    </section>
  )
}
