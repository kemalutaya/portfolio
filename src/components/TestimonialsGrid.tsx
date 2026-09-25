/**
 * TestimonialsGrid - the Testimonials view as a fixed viewport.
 *
 * One glass sheet holding a single ledger: the three pieces of colleague and
 * supervisor feedback from the live site, word for word, with the exact
 * attribution each one carries there. There are no video testimonials, logos,
 * ratings or named references, so none are shown.
 *
 * The third entry is a paraphrase on the live site, not a quote. It is set
 * without quotation marks and tagged as paraphrased so it never reads as one.
 */

type Testimonial = {
  index: string
  /** Who gave the feedback, as the live site attributes it. */
  source: string
  employer: string
  text: string
  paraphrase: boolean
}

const TESTIMONIALS: Testimonial[] = [
  {
    index: '01',
    source: 'Onshore Team',
    employer: 'Resident Eye Care Associates',
    text: 'Attentive to detail and finishes the task very fast and accurate.',
    paraphrase: false,
  },
  {
    index: '02',
    source: 'Supervisor',
    employer: 'Optum',
    text: 'Easy going and not hard to approach as an assistant team leader / subject matter expert, very proactive and tidy when it comes to assigned tasks.',
    paraphrase: false,
  },
  {
    index: '03',
    source: 'Supervisor',
    employer: 'Resident Eye Care Associates',
    text: "Noted for being proactive about solving problems as they came up, and for consistently looking for ways to improve how the clinic's workflows ran, rather than just following the process as-is.",
    paraphrase: true,
  },
]

export default function TestimonialsGrid() {
  return (
    <section className="pgrid tgrid" aria-labelledby="testimonials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Testimonials</span>
        <h1 className="pgrid__title" id="testimonials-title">
          What colleagues say.
        </h1>
        <p className="pgrid__lede">
          Feedback from the onshore team and supervisors I worked with at Resident Eye Care Associates and Optum.
        </p>
      </header>

      <div className="home__glass tgrid__glass">
        <div className="tgrid__ledger">
          {/* One plate, three rows split by hairlines. */}
          <ul className="tgrid__clients" role="list">
            {TESTIMONIALS.map((t) => (
              <li key={t.index} className="tgrid__client">
                <span className="tgrid__client-ghost" aria-hidden="true">{t.index}</span>
                <span className="tgrid__client-body">
                  <span className="tgrid__client-daily">
                    {t.paraphrase ? t.text : `“${t.text}”`}
                  </span>
                  <span className="tgrid__client-head">
                    <span className="tgrid__client-name">{t.source}</span>
                    <span className="tgrid__client-role">{t.employer}</span>
                  </span>
                  {t.paraphrase && (
                    <ul className="tgrid__client-tags" role="list">
                      <li className="tgrid__client-tag">Paraphrased, not a direct quote</li>
                    </ul>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
