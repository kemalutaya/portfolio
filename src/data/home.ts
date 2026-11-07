import {
  Briefcase,
  CalendarCheck,
  ClipboardText,
  Clock,
  Handshake,
  Keyboard,
  ShieldCheck,
  Stamp,
  UserFocus,
  type Icon,
} from '@/components/slab'

/**
 * The recruiter-facing facts on Home, shared by the desktop bento and the
 * phone layout so both always say the same thing. Every fact matches the
 * About page, the résumé and the role pages.
 */

/** One ledger row. No `Icon` means no tile; `short` replaces `title` on the
 *  narrowest laptops; `when` (years) is always shown. */
export type HomeRow = { Icon?: Icon; title: string; note: string; when?: string; short?: string }

// Job titles a recruiter would search for, each with the evidence behind it.
// Kept short: the card is too narrow at 1280-1440 for long titles, and a
// title cut to "Prior Authorization Su..." reads as a mistake.
export const ROLES: HomeRow[] = [
  { Icon: UserFocus, title: 'Medical Admin VA', note: 'Back-office, 3 years at a U.S. practice' },
  { Icon: ShieldCheck, title: 'Insurance Verification', note: '50+ checks a day across 4 portals' },
  { Icon: Stamp, title: 'Prior Authorization', note: '2 years at Optum, 8 U.S. states' },
  { Icon: ClipboardText, title: 'Chart Prep & Records', note: '50+ charts a day in Compulink' },
  { Icon: Keyboard, title: 'VA / Data Entry', note: 'High-volume entry, Excel macros' },
]

// Where I've worked, most recent first (the About timeline in brief). The
// Home card is wide, so the title carries role and employer in full; `short`
// takes over on the narrowest laptops, and the years always show.
export const EXPERIENCE: HomeRow[] = [
  { title: 'Medical VA, Resident Eye Care Associates', short: 'Medical VA, eye care', note: 'Back-office for a U.S. eye care practice', when: '2023–26' },
  { title: 'Subject matter expert, Optum', short: 'SME, Optum', note: 'Coached agents across up to 3 teams', when: '2022–23' },
  { title: 'Prior authorization, Optum', short: 'Prior auth, Optum', note: 'Provider requests across 8 U.S. states', when: '2020–22' },
]

// The screening questions, answered before they are asked.
export const AVAILABILITY: HomeRow[] = [
  { Icon: CalendarCheck, title: 'Starts immediately', note: 'Ready to start now' },
  { Icon: Briefcase, title: 'Full or part-time', note: 'Contract work too' },
  { Icon: Clock, title: 'U.S. and UK hours', note: 'Remote, from the Philippines' },
  { Icon: Handshake, title: '15-min intro call', note: 'Book it on the Contact page' },
]
