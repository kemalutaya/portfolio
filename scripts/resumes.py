"""
Builds the three résumé PDFs in public/ from the text below.

    python scripts/resumes.py

Edit the facts here, run it, and commit the PDFs. Keep them in step with the
site (src/data/*). Needs ReportLab (pip install reportlab).
"""
from pathlib import Path

from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, KeepTogether, ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer

OUT = Path(__file__).resolve().parent.parent / 'public'
NAME = 'KEM OYL NOOKY ALUTAYA'
CONTACT = [
    'kemalutaya96@gmail.com | Phone / WhatsApp: +63 950 454 3924',
    'linkedin.com/in/kalutaya | kemalutaya.github.io/portfolio',
]
EDUCATION = 'Bachelor of Science in Computer Engineering, STI College Surigao (Aug 2019)'
HIPAA = 'HIPAA Certified, Biologix (2024, renewed 2026)'
AI_TRAINING = 'AI Training, Claude Academy: AI Fluency, AI capabilities and limitations (2026)'
RECA = 'Resident Eye Care Associates'
RECA_DATES = 'Nov 2023 - Oct 2026'
OPTUM = 'Optum | Cebu City, Philippines (Hybrid)'

RESUMES = [
    {
        'file': 'Kem-Alutaya-Resume.pdf',
        'title': 'Kem Alutaya - Resume',
        'subject': 'Medical Virtual Administrative Assistant',
        'headline': 'Medical Virtual Administrative Assistant | Ophthalmology &amp; Insurance Verification',
        'where': 'Philippines (Remote, available for UK &amp; US hours)',
        'summary': (
            'Medical virtual administrative assistant with 5+ years in U.S. healthcare back-office work: nearly 3 '
            'years with a U.S. eye care practice (chart prep, EMR records, and insurance eligibility for NJ, PA, '
            'and DE patients), and before that 2 years in prior authorization at Optum, then a year as the '
            'team’s subject matter expert. Built Excel, Outlook, and Word macros that cut daily schedule prep '
            'from about 3 hours to about 1. Available full-time or part-time on UK or US business hours.'
        ),
        'jobs': [
            ('Medical Virtual Administrative Assistant (Back-Office)', 'Remote | ' + RECA_DATES, RECA, [
                'Pre-charted 50+ patient charts a day in Compulink ahead of physician schedules across a network '
                'of 50+ partner facilities.',
                'For each chart, reviewed medical history, entered allergies, diagnoses and ICD-10/CPT codes, '
                'and checked medication and order history for conditions including diabetes, glaucoma, and '
                'multiple sclerosis.',
                'Ran 50+ insurance eligibility and benefits checks a day across Availity, NJMMIS, Davis Vision, '
                'and March Vision for NJ, PA, and DE patients, confirming coverage before appointments.',
                'Checked patient status (admitted, discharged, deceased) and medications in PointClickCare for '
                'the 10-20 facilities on each day’s physician schedule.',
                'Ran about 20 diagnosis-based record look-ups (PDPM) a day across facility charts.',
                'Sent 25+ templated notifications a day to outside facilities to schedule and confirm physician '
                'visit dates.',
                'When main tasks were done, reviewed 10-15 pages of Explanation of Benefits (EOBs) a day, '
                '10-20 patients per page, matching dollar amounts to CPT codes and flagging deductible or POS '
                '11 cases to the client.',
                'Noticed facilities missing the heading doctors see on their schedule, and added the missing '
                'ones on my own for consistency. My supervisor noticed before I mentioned it.',
                'Redesigned the clinic’s facility flyer. The client adopted it and it went to every partner facility.',
                'Built three Excel, Outlook, and Word macros: schedule drafts for 18 doctors (1-10 facilities '
                'each), notifications for 50+ facilities, and doctor-visit flyers with the facility name and date '
                'filled in.',
                'Cut daily schedule prep from about 3 hours to about 1 and sent 25+ notifications a day at a '
                'fast pace with high accuracy.',
            ]),
            ('Subject Matter Expert / Assistant Team Leader', 'Nov 2022 - Oct 2023', OPTUM, [
                'Promoted to a leadership-track role after two years of prior authorization work on both phone '
                'and back-office queues.',
                'Trained and coached 10+ agents on documentation accuracy and case tagging, covering up to 3 '
                'teams of 10+ agents at a time. One of those teams ranked 1st of 5.',
                'Trained 10+ new hires on the same tools used in production.',
                'Audited 10+ agent cases a day against standard procedure and flagged the ones that did not '
                'follow it.',
                'Tracked team KPIs (adherence, average handling time, QA, attendance) in daily and weekly '
                'trackers I built, and ran weekly performance meetings with leadership, daily when needed.',
                'Handled 1-5 backend case escalations a day.',
            ]),
            ('Customer Service Representative, Prior Authorization', 'Nov 2020 - Nov 2022', OPTUM, [
                'Processed 30-50 inbound prior authorization requests a day from providers by phone and fax '
                'across 8 U.S. states.',
                'Verified eligibility, provider details (NPI, TIN), and CPT codes, then set the outcome: no PA '
                'required, approved, or routed for RN review. Included urgent, out-of-network, and peer-to-peer '
                'cases.',
            ]),
        ],
        'certs': [HIPAA, 'Virtual Assistant Training: Ready To Round, 360MVA, VA Of The Future (2024)', AI_TRAINING],
        'skills': [
            'Chart prep: pre-charting, allergy and diagnosis entry, medication and order history review',
            'EMR/EHR: Compulink (patient creation, demographics, encounters, ICD-10/CPT coding, scanning, '
            'referrals, reporting), PointClickCare (census and status tracking)',
            'Insurance eligibility and benefits verification: Availity, NJMMIS, Davis Vision, March Vision',
            'Prior authorization case documentation and outcome determination',
            'Patient records management, record audits, QA checks, HIPAA-compliant handling of confidential '
            'information',
            'Microsoft Office (Word, Excel, PowerPoint, Outlook), including Excel, Outlook, and Word macros',
        ],
    },
    {
        'file': 'KemAlutaya_Resume_AI_DataAnnotation.pdf',
        'title': 'Kem Alutaya - Resume (AI Data Annotation)',
        'subject': 'AI Data Annotation and Quality Assurance',
        'headline': 'AI Data Annotation &amp; Quality Assurance Specialist | Transcription &amp; Data Validation',
        'where': 'Philippines (Remote, available for UK &amp; US hours)',
        'summary': (
            'AI training data specialist with hands-on experience in image annotation, audio transcription, and '
            'dataset quality assurance for machine learning applications, backed by 5+ years of high-volume, '
            'high-accuracy data processing in U.S. healthcare administration. Skilled at following detailed '
            'annotation guidelines, validating datasets before submission, and maintaining accuracy across '
            'large daily record volumes. Available full-time or part-time on UK or US hours.'
        ),
        'jobs': [
            ('Medical Virtual Administrative Assistant (Back-Office)', 'Remote | ' + RECA_DATES, RECA, [
                'Processed 50+ insurance eligibility and benefits verifications per day, cross-referencing four '
                'separate platforms against strict accuracy and compliance requirements.',
                'Pre-charted and entered clinical documentation into structured records for 50+ patient charts per '
                'day, following detailed data-entry and compliance guidelines.',
                'Reviewed and audited facility records daily across a network of 50+ partner facilities, verifying '
                'and correcting status and demographic data.',
                'Noticed facilities missing a standard schedule heading and added the missing ones on my own for '
                'consistency; my supervisor noticed the fix before I mentioned it.',
                'Built Excel, Outlook, and Word automations to standardize recurring documentation and '
                'reporting tasks, cutting daily processing time from about 3 hours to about 1.',
            ]),
            ('Analyst Level 2, AI Data Annotation &amp; Quality Assurance', 'Jan 2026 - Apr 2026',
             'Innodata | Remote, part-time day shift', [
                'Annotated medical and everyday object images to improve AI model performance and training '
                'accuracy, following detailed annotation guidelines.',
                'Reviewed image datasets against annotation guidelines while maintaining quality standards '
                'across assigned batches.',
                'Performed quality assurance and data validation on datasets before submission.',
                'Transcribed and structured speech recordings into clean, standardized text for machine learning '
                'applications.',
            ]),
            ('AI Data Contributor, AI Training Data &amp; Transcription', 'Sep 2025 - Dec 2025',
             'TELUS Digital AI | Remote, part-time day shift', [
                'Transcribed audio recordings into structured datasets used for AI model training.',
                'Constructed high-quality text outputs from spoken content, following detailed annotation '
                'guidelines.',
                'Performed data validation and quality review to ensure consistency across assigned projects.',
            ]),
            ('Subject Matter Expert / Assistant Team Leader', 'Nov 2022 - Oct 2023', OPTUM, [
                'Reviewed and corrected agent documentation for accuracy and compliance across up to 3 '
                'teams; trained and coached 10+ agents on documentation standards.',
                'Monitored QA, adherence, and performance metrics; built and maintained daily/weekly reporting '
                'trackers.',
            ]),
            ('Customer Service Representative, Prior Authorization', 'Nov 2020 - Nov 2022', OPTUM, [
                'Verified and entered patient insurance eligibility, provider details, and CPT codes into internal '
                'systems for 30-50 cases per day, determining outcomes against defined review criteria.',
            ]),
        ],
        'certs': [HIPAA, AI_TRAINING, 'Additional training: Ready To Round, 360MVA, VA Of The Future (2024)'],
        'skills': [
            'AI/ML training data annotation: image labeling (medical and everyday objects) and dataset review '
            'against detailed guidelines',
            'Audio transcription and structuring of speech recordings into clean, standardized text for machine '
            'learning applications',
            'Data validation and quality review across assigned datasets prior to submission, maintaining '
            'consistency across projects',
            'High-volume structured data entry and documentation: 50+ records processed daily across multiple '
            'systems under strict accuracy standards',
            'Documentation QA and compliance review; trained and audited 10+ team members on documentation '
            'accuracy',
            'Google Workspace, Microsoft Office (Word, Excel, PowerPoint, Outlook); comfortable with dataset '
            'organization and reporting tools',
        ],
    },
    {
        'file': 'KemAlutaya_Resume_VA_DataEntry.pdf',
        'title': 'Kem Alutaya - Resume (Virtual Assistant)',
        'subject': 'Virtual Assistant, Data Entry and Administrative Support',
        'headline': 'Virtual Assistant | Data Entry &amp; Administrative Support',
        'where': 'Philippines (Remote, available for UK &amp; US hours)',
        'summary': (
            'Virtual Assistant with 5+ years of administrative and data entry experience, including '
            'high-volume records management, multi-platform data verification, and process documentation '
            'for U.S.-based clients. Skilled in Excel, Google Workspace, and Microsoft Office. Built Excel, '
            'Outlook, and Word automations that cut a daily 3-hour task to about 1. Available full-time or '
            'part-time on UK or US business hours.'
        ),
        'jobs': [
            ('Virtual Administrative Assistant (Back-Office)', 'Remote | ' + RECA_DATES, RECA, [
                'Maintained and updated records daily across two internal systems, verifying status and '
                'demographic changes for a network of 50+ facilities.',
                'Performed 50+ data verification checks per day across four platforms to confirm accuracy '
                'before processing.',
                'Processed documentation including referrals, demographic updates, consent records, and '
                'dictation, entering corrections directly into records.',
                'Coordinated with outside facilities via templated correspondence to schedule and confirm '
                'appointments, and conducted record look-ups across facility files.',
                'Added missing facility headings on my own for consistency, which my supervisor noticed, and '
                'redesigned the client-facing flyer, which the client adopted.',
                'Built three Excel, Outlook, and Word automations for schedule drafts, client notifications, and '
                'templated flyers; cut daily prep time from about 3 hours to about 1.',
            ]),
            ('Subject Matter Expert / Assistant Team Leader', 'Nov 2022 - Oct 2023', OPTUM, [
                'Promoted into a leadership-track role supporting new agents; trained and coached 10+ agents '
                'on documentation accuracy, supporting up to 3 teams. One of those teams ranked 1st of 5.',
                'Monitored KPIs and built daily/weekly reporting trackers; reviewed and corrected '
                'documentation for compliance.',
            ]),
            ('Customer Service Representative', 'Nov 2020 - Nov 2022', OPTUM, [
                'Processed 30-50 inbound requests per day from providers, verifying eligibility and account '
                'details and entering case data into internal systems.',
            ]),
            ('Amazon Product Researcher / Lister (Freelance)', 'Nov 2018 - Oct 2019', 'Remote', [
                'Conducted product and market research, entering and updating product data in Google '
                'Sheets for seller accounts.',
                'Created weekly reports on best-sellers and pricing benchmarks; suggested listing '
                'improvements based on search ranking performance.',
            ]),
        ],
        'certs': ['Virtual Assistant Training: Ready To Round, 360MVA, VA Of The Future (2024)', HIPAA, AI_TRAINING],
        'skills': [
            'High-volume data entry and records management: 50+ records processed daily across multiple systems',
            'Excel, Google Sheets, Microsoft Office (Word, PowerPoint, Outlook); built macros and automations '
            'for recurring admin work',
            'Multi-platform data verification and cross-referencing across up to 4 systems at once',
            'Document processing, digital filing, record audits, and quality assurance checks',
            'Scheduling support, templated correspondence, and vendor/facility coordination',
            'Comfortable learning new software platforms and internal systems quickly; strong written and '
            'verbal English communication',
        ],
    },
]

S = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=22.9, leading=27, alignment=TA_CENTER),
    'headline': ParagraphStyle('headline', fontName='Helvetica', fontSize=12, leading=16, alignment=TA_CENTER),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=9.4, leading=12.5, alignment=TA_CENTER),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=12, leading=15, spaceBefore=14),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=10.9, leading=15.2),
    'item': ParagraphStyle('item', fontName='Helvetica', fontSize=10.9, leading=15.2, spaceAfter=3),
    'job': ParagraphStyle('job', fontName='Helvetica-Bold', fontSize=11.6, leading=15, spaceBefore=9),
    'org': ParagraphStyle('org', fontName='Helvetica-Oblique', fontSize=10.9, leading=15, spaceAfter=2),
}


def section(title):
    return [Paragraph(title, S['section']), HRFlowable(width='100%', thickness=0.6, color='black', spaceBefore=3, spaceAfter=6)]


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(t, S['item']), leftIndent=13, value='•') for t in items],
        bulletType='bullet', bulletFontSize=9, leftIndent=13, bulletOffsetY=-2.5, spaceBefore=1,
    )


def build(r):
    path = OUT / r['file']
    doc = SimpleDocTemplate(
        str(path), pagesize=letter, leftMargin=0.93 * inch, rightMargin=0.93 * inch,
        topMargin=0.75 * inch, bottomMargin=0.7 * inch,
        title=r['title'], author='Kem Oyl Nooky Alutaya', subject=r['subject'], creator='scripts/resumes.py',
    )
    f = [Paragraph(NAME, S['name']), Paragraph(r['headline'], S['headline']), Spacer(1, 2),
         Paragraph(r['where'], S['contact'])]
    f += [Paragraph(c, S['contact']) for c in CONTACT]
    f += section('SUMMARY') + [Paragraph(r['summary'], S['body'])]
    f += section('EXPERIENCE')
    for title, dates, org, items in r['jobs']:
        head = [Paragraph(f'{title} <font name="Helvetica">| {dates}</font>', S['job']), Paragraph(org, S['org'])]
        f.append(KeepTogether(head + [bullets(items[:1])]))
        if items[1:]:
            f.append(bullets(items[1:]))
    f += section('EDUCATION') + [Paragraph(EDUCATION, S['body'])]
    f.append(KeepTogether(section('CERTIFICATIONS &amp; TRAINING') + [bullets(r['certs'])]))
    f.append(KeepTogether(section('SKILLS') + [bullets(r['skills'])]))
    doc.build(f)
    return path


if __name__ == '__main__':
    for r in RESUMES:
        print('wrote', build(r))
