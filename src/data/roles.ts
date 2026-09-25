import { asset } from '@/lib/asset'

/**
 * The two role-variant pages, /da and /va.
 *
 * Every string is condensed from the old static pages (da/index.html and
 * va/index.html). Figures keep the qualifier those pages gave them. The
 * healthcare role is named "U.S.-based private practice" on both pages, as
 * the /va page does, so no clinic name appears.
 */

export type RoleKey = 'da' | 'va'

export type RoleService = { title: string; description: string }

export type RoleJob = {
  role: string
  org: string
  dates: string
  bullets: string[]
  /** The qualifier that belongs to this entry, shown under its bullets. */
  note?: string
}

export type RoleCredential = { title: string; meta: string; kind: 'cert' | 'degree' }

export type Role = {
  /** document.title while the page is mounted. */
  title: string
  description: string
  eyebrow: string
  headline: string
  lede: string
  summary: string
  servicesTitle: string
  servicesSub: string
  services: RoleService[]
  /** The qualifier that covers every figure in the experience list. */
  experienceNote: string
  experience: RoleJob[]
  credentials: RoleCredential[]
  resume: string
  contactTitle: string
  contactLine: string
}

const DEGREE: RoleCredential = {
  title: 'Bachelor of Science in Computer Engineering',
  meta: 'STI College Surigao · 2019',
  kind: 'degree',
}

export const roles: Record<RoleKey, Role> = {
  da: {
    title: 'Kem Alutaya | AI Data Annotation & Transcription',
    description:
      'Kem Alutaya, AI data annotation and transcription specialist. Bounding boxes, segmentation, classification, medical image annotation, audio transcription, and QA, delivered to production quotas.',
    eyebrow: 'AI Data Annotation & Transcription · Remote',
    headline: 'I label training data to spec, consistently, at production pace, and I check my own work before it ships.',
    lede: 'Bounding boxes, segmentation, classification and attribute tagging across medical and everyday imagery, plus audio transcription and dataset QA.',
    summary:
      "My annotation and transcription work has been with Innodata and TELUS Digital AI, both part-time, across roughly eight months in 2025 and 2026. Before that I spent five years doing high-volume, high-accuracy work inside systems I didn't own: electronic medical records, payer portals, and booking platforms. I read the guideline properly before starting, flag the genuinely ambiguous case instead of guessing, and review my own output before submission. I annotate and transcribe to a client's specification; I don't set the labelling schema or make research decisions about what the data should mean.",
    servicesTitle: 'What I do',
    servicesSub: "Six task types I've worked on in production, not in training exercises.",
    services: [
      {
        title: 'Bounding Box Annotation',
        description: 'Object localisation on everyday-object imagery, worked to a client guideline with defined edge-case rules.',
      },
      {
        title: 'Segmentation & Masks',
        description: 'Outlining object shape rather than boxing it. The slowest task type per image and the one where care matters most.',
      },
      {
        title: 'Classification & Attribute Tagging',
        description: 'Labelling what an image contains and tagging its properties against a fixed taxonomy.',
      },
      {
        title: 'Medical Image Annotation',
        description: 'Annotation on medical imagery, supported by five years of working with clinical records and medical terminology.',
      },
      {
        title: 'Audio Transcription',
        description: 'Speech recordings transcribed and structured into clean, standardised text for model training.',
      },
      {
        title: 'QA & Data Validation',
        description: "Reviewing datasets against the annotation guideline before submission, mine and other people's.",
      },
    ],
    experienceNote: 'Self-reported averages from my own tracking, not employer-published figures.',
    experience: [
      {
        role: 'Analyst Level 2, AI Data Annotation & QA',
        org: 'Innodata',
        dates: 'Jan–Apr 2026 · Part-time, remote',
        bullets: [
          'Annotated medical and everyday-object images across bounding box, segmentation, and classification tasks.',
          'Worked to per-task KPI quotas, consistently delivering above the required target.',
        ],
        note: '~50 images/hr on simpler tasks. Throughput varied with task complexity.',
      },
      {
        role: 'AI Data Contributor: Training Data & Transcription',
        org: 'TELUS Digital AI',
        dates: 'Sep–Dec 2025 · Part-time, remote',
        bullets: [
          'Transcribed audio recordings into structured datasets used for AI model training.',
          'Performed data validation and quality review for consistency across assigned projects.',
        ],
        note: '~50 short clips/hr. Clip length varied; longer recordings took proportionally more time.',
      },
      {
        role: 'Medical Virtual Administrative Assistant',
        org: 'Resident Eye Care Associates / RTR, Eye Care Clinic',
        dates: 'Nov 2023–Jul 2026 · Remote',
        bullets: [
          'Reviewed roughly 100 patient records a shift and prepared around 50 charts a day, working to next-day deadlines.',
          'Entered ICD-10 and CPT codes, reviewed medication and diagnosis history, and edited physician dictation from voice recordings.',
        ],
        note: 'Included for the transferable part: high-volume accuracy, medical terminology, sensitive data handling, and audio-to-text work.',
      },
    ],
    credentials: [
      { title: 'HIPAA Compliance Certification', meta: 'Biologix · 2024, renewed 2026', kind: 'cert' },
      DEGREE,
    ],
    resume: asset('/KemAlutaya_Resume_AI_DataAnnotation.pdf'),
    contactTitle: "Let's talk about your dataset.",
    contactLine:
      "Tell me the task type, the guideline, and the volume, and I'll tell you honestly whether I'm a fit and what pace you can expect from me.",
  },

  va: {
    title: 'Kem Alutaya | Virtual Assistant, Admin, Research & Customer Support',
    description:
      'Kem Alutaya, remote virtual assistant. Data entry, research, customer communication, scheduling, and document management, with 5+ years of accurate high-volume administrative work.',
    eyebrow: 'Virtual Assistant · Remote',
    headline: 'I keep your admin work accurate, at volume, inside whatever system you already use.',
    lede: 'Data entry, research, customer communication, scheduling, and document management for busy teams and business owners.',
    summary:
      "I've done data entry, research, customer communication, scheduling, and document management across e-commerce product research, hotel and airline booking support, and back-office administrative and records work for a U.S.-based private practice. What connects that work is the pattern: a high volume of tasks, real accuracy requirements, and a system that belongs to someone else. I'm best suited to administrative, research, and customer-support work. Roles centered on outbound sales or cold-calling aren't a good fit for me, and I'd rather say that upfront.",
    servicesTitle: 'What I do',
    servicesSub: "Six areas I've handled in real, paid roles, not just training exercises.",
    services: [
      {
        title: 'Data Entry & Records',
        description: "Creating and updating records, maintaining demographics and details, and keeping data clean across the systems I'm given access to.",
      },
      {
        title: 'Research & Data Collection',
        description: 'Product and market research, cross-platform comparisons, and organizing findings into a usable spreadsheet or report.',
      },
      {
        title: 'Customer Communication',
        description: 'Phone and written support for customer questions, bookings, and issue resolution, with a calm and professional tone.',
      },
      {
        title: 'Scheduling & Coordination',
        description: 'Managing calendars, coordinating between multiple parties, and preparing materials ahead of time so nothing gets missed.',
      },
      {
        title: 'Document Management',
        description: "Organizing, uploading, and maintaining documents and records so they're easy for a team to find and trust.",
      },
      {
        title: 'Reporting & Tracking',
        description: 'Building and maintaining trackers and reports that give a team an accurate, current view of where things stand.',
      },
    ],
    experienceNote: 'Figures are self-reported from specific past roles, not averaged across my whole career.',
    experience: [
      {
        role: 'Virtual Administrative Assistant',
        org: 'U.S.-based private practice',
        dates: 'Nov 2023–Jul 2026 · Remote, full-time',
        bullets: [
          'Reviewed roughly 100 records a shift and prepared around 50 documents a day to next-day deadlines.',
          'Built an Excel and Outlook macro that cut a daily 3-hour task down to 1.',
        ],
        note: 'Time saving estimated, based on the previous manual process.',
      },
      {
        role: 'Customer Sales Representative',
        org: 'Teleperformance',
        dates: 'Nov 2019–Jun 2020 · Remote, full-time',
        bullets: [
          'Handled inbound booking calls for Hotels.com: searching availability, confirming details, and reviewing bookings back to the customer before finalizing.',
          'Reassigned to back-office work on a United Airlines account, using Amadeus to verify and correct booking details and clear a backlog with zero data errors.',
        ],
      },
      {
        role: 'Product Researcher',
        org: 'Amazon',
        dates: 'Nov 2018–Oct 2019 · Freelance',
        bullets: [
          'Cross-platform price research between Amazon and eBay, identifying items with a workable resale margin.',
          'Pulled product photos and full listing details, and listed 20+ items per day.',
        ],
      },
      {
        role: 'General SEO Internship',
        org: 'Kherk Roldan Advanced Digital Solutions',
        dates: '2026 · 240 hours',
        bullets: [
          'Link building, directory submissions, guest posting, and social bookmarking as core daily work.',
          'Optimized and maintained Google Business Profile listings, including posting updates and citation building.',
        ],
      },
    ],
    credentials: [
      { title: 'Virtual Assistant Training', meta: 'Ready To Round · 2024', kind: 'cert' },
      { title: 'Virtual Assistant Training', meta: '360MVA · 2024', kind: 'cert' },
      { title: 'Virtual Assistant Training', meta: 'VA Of The Future · 2024', kind: 'cert' },
      DEGREE,
    ],
    resume: asset('/KemAlutaya_Resume_VA_DataEntry.pdf'),
    contactTitle: "Let's talk about what you need help with.",
    contactLine:
      "Tell me what's eating your time, whether it's data entry, research, scheduling, or customer follow-up, and I'll tell you honestly whether I'm a fit.",
  },
}
