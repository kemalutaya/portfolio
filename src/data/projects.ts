/**
 * Case study copy for the /projects route ("Case Studies"). Every line is
 * condensed from the live site's #improvements section. Figures keep their
 * qualifiers; no patient, facility or client names.
 */

export type CaseItem = {
  id: string
  title: string
  /** Short line for the card. */
  short: string
  /** Full description for the dialog. */
  desc: string
  /** Small outcome tag, where the source gives one. */
  note?: string
}

export const caseStudy = {
  title: 'Automating administrative draft generation',
  figure: 'About 3 hrs to about 1 hr a day',
  qualifier: 'Estimated, based on the previous manual process.',
  problem:
    'Three recurring daily tasks were manual, repetitive and error-prone: sending physician schedules, notifying facilities, and preparing doctor-visit flyers. The usual mistakes were the wrong doctor, the wrong CC, the wrong date, the wrong attachment, and typos.',
  contribution:
    'I designed and built all three myself with Excel, Outlook and Word macros. Those were the tools already on the remote desktop, since installing anything new needed IT approval. Each one turns a multi-step manual process into a few clicks. I still review and send every draft myself.',
  outcome: 'I presented the workflow and it was approved for operational use.',
  privacy:
    'No patient information, facility names or employer materials are shown. Everything is described in general terms.',
}

export const automations: CaseItem[] = [
  {
    id: 'schedules',
    title: 'Physician schedules',
    short: '13 doctors, each assigned 1 to 10 facilities a day. Right doctor, CC and files.',
    desc: "13 doctors, each assigned 1 to 10 facilities a day. The macro matches the highlighted facility to the right doctor's email, CCs the right staff and attaches the right files, which removes wrong-doctor, wrong-CC and wrong-attachment errors. Daily schedule prep went from about 3 hours to about 1 (estimated, based on the previous manual process).",
  },
  {
    id: 'notifications',
    title: 'Facility notifications',
    short: '50+ facilities. I now send 25+ notifications a day with zero mistakes.',
    desc: 'More than 50 facilities, each with its own contact details. The macro drafts each notification with the correct facility email, date, template and attachments. I now send 25+ notifications a day with zero mistakes.',
  },
  {
    id: 'flyers',
    title: 'Doctor-visit flyers',
    short: 'Fills in the facility name and visit date on each doctor’s flyer.',
    desc: 'The same drafting logic, plus filling in the facility name and visit date for each doctor. It took the longest to build: some facility names run long, and the flyer layout had to be adjusted so it would not break.',
  },
]

export const improvements: CaseItem[] = [
  {
    id: 'headings',
    title: 'Standardized facility headings in PointClickCare',
    short: 'Added the missing facility headings doctors see on their schedule.',
    desc: 'Each facility needs a heading, the label doctors see on their schedule so they know what to expect on arrival. Some facilities had none, so I added the missing ones for consistency. My supervisor noticed before I mentioned it and called it proactive.',
    note: 'Noticed and fixed independently',
  },
  {
    id: 'flyer-template',
    title: 'Redesigned the facility flyer template',
    short: 'A clearer flyer template, approved by the client for ongoing use.',
    desc: 'The flyer template sent to facilities had not changed in years. I redesigned it to be readable for older patients, direct and professional, then took it to the client unprompted. She approved it for ongoing use.',
    note: 'Adopted for ongoing use',
  },
]
