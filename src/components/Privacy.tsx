import { ArrowLeft } from '@/components/slab'
import { useNavigate } from 'react-router-dom'
import { profile } from '@/data/profile'

/**
 * Privacy Policy. Every statement here was checked against the code:
 * - no analytics or tracking scripts (no gtag, GTM, Plausible, Umami, PostHog,
 *   fbq, Hotjar) in index.html or src/; fonts are bundled, not fetched;
 * - localStorage holds only the theme ('theme') and accessibility settings
 *   ('kv-a11y'); sessionStorage holds a performance tier ('perf-tier');
 * - the contact form opens the visitor's mail app (lib/contact.ts) because
 *   VITE_CONTACT_ENDPOINT is not set. If a form endpoint is ever configured,
 *   rewrite "What is collected" before deploying.
 */
export default function Privacy() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Privacy Policy">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <h1 className="legal-page__title">Privacy Policy</h1>
        <p className="legal-page__updated">Last updated: September 2026</p>

        <div className="legal-page__body">
          <h2>Who this covers</h2>
          <p>
            This is the personal portfolio of {profile.name}. This page describes what the site itself does with
            information when you visit it.
          </p>

          <h2>What is collected</h2>
          <p>
            Nothing is collected by me through this site. There are no analytics, tracking pixels or advertising
            scripts, and no cookies are set.
          </p>
          <p>
            The contact form does not send your details to a server. It opens your own email app with the message
            filled in, and nothing leaves your device until you press send there. If you do, I receive it as an
            ordinary email.
          </p>

          <h2>Stored in your browser</h2>
          <p>
            If you change the theme or the accessibility settings, that choice is saved in your browser&apos;s local
            storage so it is remembered on your next visit. The site also keeps a performance setting for the current
            tab in session storage. None of this is sent anywhere, and you can clear it by clearing your browser&apos;s
            site data.
          </p>

          <h2>Other sites</h2>
          <p>
            The site is hosted on GitHub Pages. Links to Cal.com (booking a call) and LinkedIn take you to those
            services, and their own privacy policies apply there.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </div>
    </main>
  )
}
