import { ArrowLeft } from '@/components/slab'
import { Link, useNavigate } from 'react-router-dom'

const PAGES = [
  { label: 'Case Studies', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'Automation', to: '/showcase' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'About', to: '/about' },
  { label: 'FAQs / Contact', to: '/contact' },
] as const

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Page not found">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <p className="legal-page__updated">404</p>
        <h1 className="legal-page__title">Page not found.</h1>

        <div className="legal-page__body">
          <p>
            There is no page at this address. It may have moved, or the link
            may have a typo. These pages are all here:
          </p>
          <ul>
            {PAGES.map((p) => (
              <li key={p.to}>
                <Link to={p.to}>{p.label}</Link>
              </li>
            ))}
          </ul>
          <p>
            If a link on this site sent you here, <Link to="/contact">let me know</Link> and
            I will fix it.
          </p>
        </div>
      </div>
    </main>
  )
}
