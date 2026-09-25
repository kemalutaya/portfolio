import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Certificate, CheckCircle, GraduationCap } from '@/components/slab'
import { profile } from '@/data/profile'
import { roles } from '@/data/roles'
import type { RoleKey } from '@/data/roles'

/**
 * RoleView - the /da and /va pages, one component driven by src/data/roles.ts.
 *
 * Built from the Services and About object language (glass sheet, bento
 * cards, the credential plate) so it reads as part of the site. It scrolls:
 * the .sgrid class is what releases the fixed height on wide screens.
 *
 * These pages are kept out of search engines. The build writes static noindex
 * HTML per route; the effect below is the runtime backstop.
 */

// At most three columns, so six cards always land as 3+3, 2+2+2 or 1 each.
const CARDS: CSSProperties = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(max(min(100%, 240px), calc((100% - 32px) / 3)), 1fr))',
}
const ACTIONS: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px 24px',
}

export default function RoleView({ role: key }: { role: RoleKey }) {
  const role = roles[key]

  useEffect(() => {
    const previous = document.title
    document.title = role.title
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.appendChild(robots)
    return () => {
      document.title = previous
      robots.remove()
    }
  }, [role])

  const count = String(role.services.length).padStart(2, '0')

  return (
    <section className="pgrid sgrid" aria-labelledby="role-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">{role.eyebrow}</span>
        <h1 className="pgrid__title" id="role-title">{role.headline}</h1>
        <p className="pgrid__lede">{role.lede}</p>
        <p className="pgrid__lede">
          <Link className="agrid__link" to="/">
            <ArrowLeft size={13} weight="bold" aria-hidden="true" /> Main portfolio
          </Link>
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        <p className="agrid__note">{role.summary}</p>

        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">{role.servicesTitle}</h2>
            <p className="sgrid__offers-sub">{role.servicesSub}</p>
          </div>
          <ul className="bento sgrid__services" role="list" style={CARDS}>
            {role.services.map((s, i) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')} / {count}
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">Experience</h2>
            <p className="sgrid__offers-sub">{role.experienceNote}</p>
          </div>
          <ul className="bento sgrid__services" role="list" style={CARDS}>
            {role.experience.map((job) => (
              <li key={job.role} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-index">{job.dates}</span>
                  <span className="bento__title">{job.role}</span>
                  <span className="bento__desc">{job.org}</span>
                </span>
                <ul className="sgrid__bullets" role="list">
                  {job.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {job.note && <p className="sgrid__offers-sub">{job.note}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">Credentials</h2>
          </div>
          <div className="agrid__bar">
            {role.credentials.map((c) => {
              const Mark = c.kind === 'degree' ? GraduationCap : Certificate
              return (
                <span key={c.title + c.meta} className="agrid__cell">
                  <span className="agrid__cell-mark">
                    <Mark size={16} weight="fill" aria-hidden="true" />
                  </span>
                  <span className="agrid__cell-copy">
                    <span className="agrid__cell-title">{c.title}</span>
                    <span className="agrid__cell-meta">{c.meta}</span>
                  </span>
                </span>
              )
            })}
          </div>
        </div>

        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">{role.contactTitle}</h2>
          </div>
          <p className="sgrid__offers-sub" style={{ textAlign: 'center' }}>{role.contactLine}</p>
          <div style={ACTIONS}>
            <a className="home__cta" href="https://cal.com/kem-alutaya" target="_blank" rel="noopener noreferrer">
              Book a call
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </a>
            <a className="agrid__link" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="agrid__link" href={role.resume} download>
              Download résumé (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
