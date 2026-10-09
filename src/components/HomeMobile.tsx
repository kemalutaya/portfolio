import { Link } from 'react-router-dom'
import { ArrowUpRight, Quotes } from '@/components/slab'
import { profile } from '@/data/profile'
import ThemeButton from './ThemeButton'
import { asset } from '@/lib/asset'

/**
 * Home on a phone, the parts the rail and the bento used to carry:
 *
 *   HomeProfile  avatar, name, role and the theme switch -
 *                the rail's identity block, laid flat
 *   HomeStats    three proof facts (profile.stats)
 *   HomeExplore  one tile per rail view in a snap row, then the three
 *                testimonials as proof cards
 */

export function HomeProfile() {
  return (
    <header className="hprofile">
      <img className="hprofile__avatar" src={profile.avatarSrc} alt="" width={56} height={56} />
      <div className="hprofile__who">
        <span className="hprofile__name">
          {profile.name}
        </span>
        <span className="hprofile__role">{profile.role}</span>
      </div>
      <ThemeButton className="hprofile__theme" />
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map((s, i) => (
        <li key={i}>
          <b>{s.value}</b>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  )
}

// Same facts as the desktop bento (HomeBento). Every tile shows something real:
// a case diagram, her photo, or who the feedback came from.
type Tile = { n: string; label: string; to: string; title: string; desc: string; img?: string }
const REVIEWERS = [
  ['Onshore Team', 'Resident Eye Care Associates'],
  ['Supervisor', 'Optum'],
  ['Supervisor', 'Resident Eye Care Associates'],
]
const TILES: Tile[] = [
  { n: '01', label: 'Case Studies', to: '/projects', title: 'Daily schedule prep, 3 hours to about 1', desc: 'Estimated, based on the previous manual process.', img: asset('/home/case-impact.svg') },
  { n: '02', label: 'Services', to: '/services', title: 'Back-office support for U.S. and UK healthcare teams', desc: 'Insurance verification, EMR support, chart preparation and documentation.', img: asset('/home/case-eligibility.svg') },
  { n: '03', label: 'Automation', to: '/showcase', title: 'Excel, Outlook and Word macros', desc: 'Built with the tools already on the remote desktop. I still review and send the output myself.', img: asset('/home/case-automation.svg') },
  { n: '04', label: 'Testimonials', to: '/testimonials', title: 'What onshore teams and supervisors said', desc: 'Colleagues at Resident Eye Care Associates and Optum.' },
  { n: '05', label: 'About', to: '/about', title: `Hi, I'm ${profile.firstName}.`, desc: 'Five years inside U.S. healthcare operations.', img: profile.avatarSrc },
]

// The three testimonials from the live site, attributions verbatim. The third
// is a paraphrase there, so it carries no quotation marks here either.
const QUOTES = [
  { text: '"Attentive to detail and finishes the task very fast and accurate."', source: 'Onshore Team, Resident Eye Care Associates', kind: 'Testimonial' },
  { text: '"Easy going and not hard to approach as an assistant team leader / subject matter expert, very proactive and tidy when it comes to assigned tasks."', source: 'Supervisor, Optum', kind: 'Testimonial' },
  { text: "Noted for being proactive about solving problems as they came up, and for consistently looking for ways to improve how the clinic's workflows ran, rather than just following the process as-is.", source: 'Supervisor, Resident Eye Care Associates', kind: 'Paraphrased feedback' },
] as const

export function HomeExplore() {
  return (
    <>
      <div className="hsec">
        <h2 className="hsec__title">Explore</h2>
        <span className="hsec__aside">Swipe</span>
      </div>
      <ul className="htiles" role="list">
        {TILES.map((t) => (
          <li key={t.to}>
            <Link to={t.to} className="htile">
              {t.img ? (
                <img className="htile__img" src={t.img} alt="" loading="lazy" />
              ) : (
                <span className="htile__reviews" aria-hidden="true">
                  {REVIEWERS.map(([who, org], i) => (
                    <span key={i} className="htile__review">
                      <Quotes size={13} weight="fill" />
                      <b>{who}</b>
                      <span>{org}</span>
                    </span>
                  ))}
                </span>
              )}
              <span className="htile__body">
                <span className="htile__n">{t.n} {t.label}</span>
                <span className="htile__title">{t.title}</span>
                <span className="htile__desc">{t.desc}</span>
              </span>
              <span className="htile__go" aria-hidden="true"><ArrowUpRight size={16} weight="bold" /></span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hsec">
        <h2 className="hsec__title">What colleagues say</h2>
        <Link to="/testimonials" className="hsec__aside">See all</Link>
      </div>
      {QUOTES.map((q) => (
        <Link key={q.source} to="/testimonials" className="hproof">
          {/* No client photos exist, so the thumb is a quote mark, not a face. */}
          <span className="hproof__thumb" style={{ height: 96 }}>
            <span className="hproof__play" aria-hidden="true"><Quotes size={14} weight="fill" /></span>
          </span>
          <span className="hproof__copy">
            <span className="hproof__kicker">{q.kind}</span>
            <span className="hproof__title">{q.text}</span>
            <span className="hproof__meta">{q.source}</span>
          </span>
        </Link>
      ))}
    </>
  )
}
