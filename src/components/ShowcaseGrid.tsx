import Flagship from '@/components/Flagship'

/**
 * ShowcaseGrid - the /showcase view, titled Automation, on one glass sheet.
 *
 * A page head, then the Flagship build: the five-tab walkthrough of the three
 * macros, the copy and the CTA. Same head and glass as Projects and Services,
 * so the shell reads as one system. Styles live in src/styles/showcase.css
 * (.ktools). The template's "Featured on" badge slot was removed: there is no
 * real badge, award or listing to put in it.
 */
export default function ShowcaseGrid() {
  return (
    <section className="pgrid ktools" aria-labelledby="showcase-title">
      <header className="pgrid__head ktools__head">
        <div className="ktools__head-copy">
          <span className="pgrid__eyebrow">Automation</span>
          <h1 className="pgrid__title" id="showcase-title">
            Three macros. Daily schedule prep cut from 3 hours to 1.
          </h1>
          <p className="pgrid__lede">
            Built with Excel, Outlook and Word on a locked-down remote desktop. The time saving
            is an estimate, based on the previous manual process.
          </p>
        </div>
      </header>

      <div className="home__glass ktools__glass">
        <Flagship eyebrow="Case study · Highest impact" />
      </div>
    </section>
  )
}
