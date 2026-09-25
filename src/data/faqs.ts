export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Every answer is condensed from the live site (About, Work Experience,
 * Data Handling, Contact, the /va page) or PRODUCT.md. The accordion list
 * scrolls inside its plate, so seven short answers fit.
 */
export const FAQS: QA[] = [
  {
    q: 'What hours do you work?',
    a: 'I’m based in the Philippines (PHT, GMT+8) and work aligned to UK and U.S. business hours. I have night-shift experience, and my most recent role was flexible across time zones.',
  },
  {
    q: 'Are you HIPAA trained, and will you sign a BAA?',
    a: 'Yes. I hold a HIPAA Compliance Certification from Biologix (2024, renewed 2026), and I’ll sign a Business Associate Agreement as part of onboarding, alongside any NDA or confidentiality terms your practice requires.',
  },
  {
    q: 'Do you do clinical work?',
    a: 'No. I support administrative, operational and documentation work. Clinical judgment, diagnosis and complex-case decisions stay with licensed clinical personnel, and I escalate rather than guess.',
  },
  {
    q: 'How is your workspace set up?',
    a: 'I work from a private room with a door that closes, never a shared or public space. I use two-factor authentication, device password and encryption, a password manager, and current antivirus and firewall. A backup laptop, two backup power supplies and backup internet cover outages.',
  },
  {
    q: 'Which systems have you used?',
    a: 'Compulink and PointClickCare for EMR work; Availity, NJMMIS, UnitedHealthcare, Davis Vision and March Vision for eligibility; Microsoft Office and Outlook daily. My last role ran on a locked-down remote desktop, so I’m used to working within access controls.',
  },
  {
    q: 'What kind of role is not a fit?',
    a: 'My strongest fit is back-office healthcare support. I’m open to limited call handling, but high-volume outbound sales or cold-calling roles aren’t a good fit, and I’d rather say that upfront.',
  },
  {
    q: 'When can you start?',
    a: 'Immediately. I’m looking for a full-time remote role and I’m open to contract work alongside that.',
  },
]
