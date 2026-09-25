import { ArrowLeft } from '@/components/slab'
import { useNavigate } from 'react-router-dom'
import { profile } from '@/data/profile'

/**
 * Terms of Service. Plain statements about this portfolio only: no pricing, no
 * jurisdiction, no liability terms, since none are stated in the sources.
 */
export default function ToS() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Terms of Service">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <h1 className="legal-page__title">Terms of Service</h1>
        <p className="legal-page__updated">Last updated: September 2026</p>

        <div className="legal-page__body">
          <h2>What this site is</h2>
          <p>
            A personal portfolio for {profile.name}, a Medical Virtual Administrative Assistant. It describes my
            experience so hiring teams can decide whether to talk to me. Nothing is sold or paid for through this
            site.
          </p>

          <h2>About the content</h2>
          <p>
            Work history, credentials and figures are my own account. Figures are self-reported from specific past
            roles, not career averages or employer-published numbers. No patient information appears
            anywhere on the site.
          </p>
          <p>
            Everything described here is administrative, operational and documentation support. Clinical judgment,
            diagnosis and complex-case decisions stay with licensed clinical personnel.
          </p>

          <h2>Working together</h2>
          <p>
            Any role or contract is agreed directly with you, including a Business Associate Agreement and any NDA
            or confidentiality terms your practice requires. Nothing on this site is itself an offer or an agreement.
          </p>

          <h2>Reuse</h2>
          <p>
            Please don&apos;t reuse the text or photo without asking. Product names and logos shown belong to their
            owners.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </div>
    </main>
  )
}
