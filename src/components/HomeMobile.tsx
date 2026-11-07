import { Link } from 'react-router-dom'
import { ArrowUpRight, Trophy } from '@/components/slab'
import { profile } from '@/data/profile'
import ThemeButton from './ThemeButton'
import { asset } from '@/lib/asset'

/**
 * Home on a phone, the parts the rail and the bento used to carry:
 *
 *   HomeProfile  avatar, name, role and the theme switch -
 *                the rail's identity block, laid flat
 *   HomeStats    three proof facts (profile.stats)
 *   HomeExplore  one tile per rail view in a snap row, then the track
 *                record as proof cards
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
// a case diagram or the photo.
type Tile = { n: string; label: string; to: string; title: string; desc: string; img: string }
const TILES: Tile[] = [
  { n: '01', label: 'Case Studies', to: '/projects', title: 'Daily schedule prep, 3 hours to about 1', desc: 'Estimated, based on the previous manual process.', img: asset('/home/case-impact.svg') },
  { n: '02', label: 'Services', to: '/services', title: 'Back-office support for U.S. and UK healthcare teams', desc: 'Insurance verification, EMR support, chart preparation and documentation.', img: asset('/home/case-eligibility.svg') },
  { n: '03', label: 'About', to: '/about', title: `Hi, I'm ${profile.firstName}.`, desc: 'Five years inside U.S. healthcare operations.', img: profile.avatarSrc },
]

// Results from past roles, the same ones the desktop bento lists. Self-reported.
const RECORD = [
  { text: 'A team I coached as subject matter expert ranked 1st of 5.', source: 'Optum', to: '/about' },
  { text: 'My team placed 1st of 5 in multiple months, and I placed 1st on my own team.', source: 'Teleperformance', to: '/va' },
  { text: 'My redesigned facility flyer was approved for ongoing use.', source: 'Resident Eye Care Associates', to: '/projects' },
  { text: 'I added the missing facility headings. My supervisor noticed before I mentioned it.', source: 'Resident Eye Care Associates', to: '/projects' },
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
              <img className="htile__img" src={t.img} alt="" loading="lazy" />
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
        <h2 className="hsec__title">Track record</h2>
        <span className="hsec__aside">Self-reported</span>
      </div>
      {RECORD.map((q) => (
        <Link key={q.text} to={q.to} className="hproof">
          <span className="hproof__thumb" style={{ height: 96 }}>
            <span className="hproof__play" aria-hidden="true"><Trophy size={14} weight="fill" /></span>
          </span>
          <span className="hproof__copy">
            <span className="hproof__kicker">Result</span>
            <span className="hproof__title">{q.text}</span>
            <span className="hproof__meta">{q.source}</span>
          </span>
        </Link>
      ))}
    </>
  )
}
