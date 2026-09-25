/**
 * The systems tree shown in the Projects "systems" pop-up (and as chips on
 * Home and in the Projects bento card).
 *
 * This file is the ONLY place node copy lives. AIStack.tsx and AIStackGrid.tsx
 * render whatever shape they find here.
 *
 * Status is proficiency, stated honestly, matching the ladder on the previous
 * site: "Daily" (hands-on, production use every day), "Hands-On" (real
 * production use), "Training" (exposure through training, not production).
 * No vendor logos: only marks already shipped in public/icons may be used,
 * and none of these systems' marks are.
 */

import { User, IdentificationCard, Database, Buildings, FileText, ShieldCheck, Eye, Lightning } from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Daily' | 'Hands-On' | 'Training'

export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string
  /** One plain sentence a non-technical client understands. */
  what: string
  /** Where it's used / context. Rendered small and muted. */
  stack?: string
  status?: StackStatus
  /** Phosphor glyph for the card's mark tile. Every node has one. */
  Icon: Icon
  logos?: StackLogo[]
  children?: StackNode[]
}

const TRAINING = 'Exposure through VA training, not day-to-day production use.'

/** Single root: you. Branches are the categories. */
export const aiStack: StackNode = {
  id: 'root',
  Icon: User,
  name: profile.name,
  what: 'The systems I work inside every day: EMRs, payer portals, and the automation I built on top of them.',
  stack: 'Medical Virtual Administrative Assistant',
  children: [
    {
      id: 'emr',
      Icon: IdentificationCard,
      name: 'EMR & Patient Records',
      what: 'Where patient records live. Creation, demographics, uploads and chart prep all happen here.',
      children: [
        { id: 'compulink', Icon: Database, name: 'Compulink', status: 'Daily',
          what: 'Patient creation, demographic updates, document uploads, ICD-10 and CPT entry, medication documentation and reports.',
          stack: 'Primary EMR in my most recent role' },
        { id: 'pointclickcare', Icon: Buildings, name: 'PointClickCare', status: 'Daily',
          what: 'Census tracking, admission and discharge status, facility review and PDPM-related lookups.',
          stack: 'Cross-checked against Compulink' },
        { id: 'elation', Icon: FileText, name: 'Elation', status: 'Training', what: TRAINING, stack: 'Training exposure' },
        { id: 'practice-fusion', Icon: FileText, name: 'Practice Fusion', status: 'Training', what: TRAINING, stack: 'Training exposure' },
      ],
    },
    {
      id: 'payers',
      Icon: ShieldCheck,
      name: 'Insurance & Eligibility',
      what: 'Payer portals for eligibility and benefits verification across Medicare, Medicaid and vision plans.',
      children: [
        { id: 'availity', Icon: ShieldCheck, name: 'Availity', status: 'Hands-On',
          what: 'Eligibility and benefits verification.', stack: 'Multi-payer portal' },
        { id: 'njmmis', Icon: IdentificationCard, name: 'NJMMIS', status: 'Hands-On',
          what: 'Medicaid and Medicare information, and vision-plan verification.', stack: 'New Jersey Medicaid' },
        { id: 'davis-vision', Icon: Eye, name: 'Davis Vision', status: 'Hands-On',
          what: 'Vision plan eligibility checks.', stack: 'Vision payer' },
        { id: 'march-vision', Icon: Eye, name: 'March Vision', status: 'Hands-On',
          what: 'Vision plan eligibility checks.', stack: 'Vision payer' },
        { id: 'uhc', Icon: ShieldCheck, name: 'UnitedHealthcare', status: 'Hands-On',
          what: 'Live eligibility verification.', stack: 'Commercial payer' },
      ],
    },
    {
      id: 'automation',
      Icon: Lightning,
      name: 'Office Automation',
      status: 'Daily',
      what: 'Macros I designed that draft physician schedules, facility notifications and visit flyers, cutting an estimated 3-hour daily task to about 1.',
      stack: 'Excel, Outlook and Word macros, built by me',
    },
  ],
}
