import { profile } from '@/data/profile'

/**
 * Contact submission.
 *
 * Three paths, first match wins:
 *   1. VITE_WEB3FORMS_KEY set (.env.production): the message is posted to
 *      Web3Forms, which emails it to the address the key was issued for
 *      (profile.email). The key is public by design and only ever sends to
 *      that inbox, so it is safe in client code.
 *   2. VITE_CONTACT_ENDPOINT set: a JSON POST to your own backend (below).
 *   3. Neither: submitLead() opens the visitor's mail client with a message
 *      addressed to profile.email (src/data/profile.ts).
 *
 * To wire your own backend instead (Formspree, a serverless function...):
 *   1. Set VITE_CONTACT_ENDPOINT in .env.production to the URL that accepts
 *      a JSON POST of the Lead type below.
 *   2. Have it answer 2xx on success, or a non-2xx with { "error": "..." }
 *      and that sentence is shown to the visitor as-is.
 * With the variable unset the mail client path below is used instead.
 */

export const ENDPOINT: string = import.meta.env.VITE_CONTACT_ENDPOINT ?? ''
export const WEB3FORMS_KEY: string = import.meta.env.VITE_WEB3FORMS_KEY ?? ''
const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
/** True when Send delivers the message itself, without the visitor's mail app. */
export const SENDS_ONLINE = Boolean(WEB3FORMS_KEY || ENDPOINT)
export const RECIPIENT = profile.email

export const MAX_NAME = 80
export const MAX_EMAIL = 254
export const MAX_MESSAGE = 5000

// Built from \u escapes so the source stays pure ASCII.
// Control chars U+0000-U+001F and U+007F; when newlines are allowed, tab,
// LF and CR survive. Zero-width and bidi marks always go.
const CTRL_NO_NL = new RegExp('[\\u0000-\\u001F\\u007F]', 'g')
const CTRL_KEEP_NL = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g')
const ZERO_WIDTH = new RegExp('[\\u200B-\\u200F\\u202A-\\u202E\\u2060\\uFEFF]', 'g')

export function sanitize(input: string, allowNewlines = false): string {
  const controls = allowNewlines ? CTRL_KEEP_NL : CTRL_NO_NL
  return input.replace(controls, '').replace(ZERO_WIDTH, '')
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Lead = {
  firstName: string
  lastName: string
  email: string
  message: string
  /** Honeypot. Empty for a person; your backend should drop anything else. */
  website: string
}

export type SubmitResult = { via: 'webhook' } | { via: 'mailto' }

/** Read, trim, cap and sanitise the four fields. Returns null if a required
 *  field is missing or the email does not look like one. */
export function readLead(data: FormData): Lead | null {
  const firstName = sanitize(String(data.get('firstName') ?? '').trim()).slice(0, MAX_NAME)
  const lastName = sanitize(String(data.get('lastName') ?? '').trim()).slice(0, MAX_NAME)
  const email = sanitize(String(data.get('email') ?? '').trim()).slice(0, MAX_EMAIL)
  const message = sanitize(String(data.get('message') ?? '').trim(), true).slice(0, MAX_MESSAGE)
  if (!firstName || !lastName || !email || !message || !EMAIL_RE.test(email)) return null
  const website = String(data.get('website') ?? '')
  return { firstName, lastName, email, message, website }
}

export class SubmitError extends Error {}

const subjectFor = (lead: Lead) => `Healthcare admin support enquiry from ${lead.firstName} ${lead.lastName}`

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  if (WEB3FORMS_KEY) {
    const res = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: subjectFor(lead),
        from_name: 'Portfolio contact form',
        name: `${lead.firstName} ${lead.lastName}`,
        email: lead.email,
        // Web3Forms puts this in Reply-To, so replying answers the visitor.
        replyto: lead.email,
        message: lead.message,
        // Honeypot: Web3Forms drops the post when botcheck is filled.
        botcheck: lead.website,
      }),
    })
    const body = await res.json().catch(() => null)
    if (!res.ok || !body?.success) {
      throw new SubmitError(`That did not go through. Email me directly at ${RECIPIENT}.`)
    }
    return { via: 'webhook' }
  }

  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => null)
      throw new SubmitError(body?.error || `The server answered ${res.status}.`)
    }
    return { via: 'webhook' }
  }

  const subject = subjectFor(lead)
  const body = [`Name: ${lead.firstName} ${lead.lastName}`, `Email: ${lead.email}`, '', lead.message].join('\n')
  // encodeURIComponent on every value blocks header injection (CR/LF) and
  // parameter smuggling via & or ?.
  window.location.href = `mailto:${encodeURIComponent(RECIPIENT)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { via: 'mailto' }
}
