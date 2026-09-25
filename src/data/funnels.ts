import { asset } from '@/lib/asset'

export type FunnelTag = 'Case study' | 'Process'

/**
 * One card in the 3D carousel on the Case Studies page. The identifiers keep
 * their template names; the content is Kem's process diagrams.
 */
export type Funnel = {
  /** Standalone page in public/funnels/ that the preview dialog frames. */
  file: string
  label: string
  tag: FunnelTag
  desc: string
  /** Image shown on the carousel card, already resolved through asset(). */
  thumb: string
}

export const caseDiagrams: Funnel[] = [
  {
    file: 'case-impact.html',
    label: 'Daily task time, before and after',
    tag: 'Case study',
    desc: 'About 3 hrs to about 1 hr a day. Estimated, based on the previous manual process.',
    thumb: asset('/home/case-impact.svg'),
  },
  {
    file: 'case-automation.html',
    label: 'How the schedule macro works',
    tag: 'Case study',
    desc: 'Excel, macro, Outlook draft, then I review every detail and send.',
    thumb: asset('/home/case-automation.svg'),
  },
  {
    file: 'case-eligibility.html',
    label: 'Eligibility checks',
    tag: 'Process',
    desc: 'Eligibility and benefits verification across Medicare, Medicaid and vision plans.',
    thumb: asset('/home/case-eligibility.svg'),
  },
  {
    file: 'case-chartprep.html',
    label: 'Chart preparation',
    tag: 'Process',
    desc: 'Pre-charting for upcoming physician schedules, flagging anything missing before the visit.',
    thumb: asset('/home/case-chartprep.svg'),
  },
]

/**
 * Tag -> color map, passed to CSS via an inline --tag-color custom property.
 */
export const tagColors: Record<FunnelTag, string> = {
  'Case study': '#19B5A5',
  Process: '#19B5A5',
}
