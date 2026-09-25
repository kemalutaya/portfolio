import { asset } from '@/lib/asset'
/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline. All values are real and sourced from
 * the previous static site; figures keep their qualifiers attached.
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

export type Stat = { value: string; label: string }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Kem Alutaya',
  firstName: 'Kem',
  handle: '@kalutaya',
  role: 'Medical Virtual Administrative Assistant',
  avatarSrc: asset('/kem-alutaya.jpg'),
  // The tick is a real credential, not a platform badge: say exactly what it is.
  verifiedLabel: 'HIPAA Compliance Certified (Biologix, 2024, renewed 2026)',
  email: 'kemalutaya96@gmail.com',
  location: 'Philippines (GMT+8), aligned to US & UK hours',
  // Figures are representative workload from the most recent healthcare role;
  // the label keeps that qualifier attached rather than implying a career average.
  stats: [
    { value: '5+ yrs', label: 'Healthcare admin' },
    { value: '50+', label: 'Charts prepped / day, typical' },
    { value: 'GMT+8', label: 'Covers US & UK hours' },
  ],
  // The intro types this line, then flies it into the Home headline.
  displayName: { line1: 'Healthcare back-office,', line2: 'accurate at volume.' },
  hero: {
    body: 'Insurance verification, EMR support, chart preparation and documentation for U.S. and UK healthcare teams.',
    portraitSrc: asset('/kem-alutaya.jpg'),
    portraitAlt: 'Kem Alutaya',
  },
  socials: [
    { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/kalutaya/', iconPath: asset('/icons/linkedin.svg') },
    { label: 'Résumé (PDF)', href: asset('/Kem-Alutaya-Resume.pdf'), iconPath: asset('/icons/tools/doc.svg') },
  ],
}
