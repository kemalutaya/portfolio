/**
 * The facility flyer redesign, as an illustration. The real flyer is the
 * client's and stays private under company policy, so both sheets here use
 * placeholder content in brackets. "Before" shows the general problem (small,
 * dense, hard to scan); "After" shows the kind of change: one clear heading,
 * the visit date large, short plain lines, readable for older patients.
 */
export default function FlyerMock() {
  return (
    <figure className="flyer">
      <div className="flyer__pair" aria-hidden="true">
        <div className="flyer__col">
          <span className="flyer__tag">Before</span>
          <div className="flyer__sheet flyer__sheet--before">
            <span className="flyer__b-title">NOTICE OF PHYSICIAN VISIT</span>
            <span className="flyer__b-text">
              PLEASE BE ADVISED THAT [DOCTOR NAME] FROM [CLINIC NAME] WILL BE VISITING [FACILITY NAME] ON [VISIT DATE]
              TO PROVIDE EYE CARE SERVICES TO RESIDENTS. ALL RESIDENTS WHO WISH TO BE SEEN SHOULD INFORM THE NURSING
              STATION. PLEASE ENSURE ALL RELEVANT RECORDS ARE AVAILABLE. FOR ANY QUESTIONS PLEASE CONTACT THE OFFICE
              AT [PHONE NUMBER] DURING BUSINESS HOURS.
            </span>
            <span className="flyer__b-lines">
              <i />
              <i />
              <i />
            </span>
            <span className="flyer__b-foot">[CLINIC NAME] · [ADDRESS] · [PHONE]</span>
          </div>
        </div>

        <div className="flyer__col">
          <span className="flyer__tag flyer__tag--after">After</span>
          <div className="flyer__sheet flyer__sheet--after">
            <span className="flyer__a-band">
              <span className="flyer__a-logo">[Logo]</span>
              <span className="flyer__a-clinic">[Clinic name]</span>
            </span>
            <span className="flyer__a-kicker">Eye doctor visit</span>
            <span className="flyer__a-title">[Doctor name] is visiting [Facility name]</span>
            <span className="flyer__a-date">
              <b>[Visit date]</b>
              <span>[Time window]</span>
            </span>
            <span className="flyer__a-list">
              <span>[What residents need to do]</span>
              <span>[What to have ready]</span>
            </span>
            <span className="flyer__a-foot">Questions? Call [phone number]</span>
          </div>
        </div>
      </div>
      <figcaption className="flyer__caption">
        Illustration with placeholder content, not the real flyer. The client&rsquo;s flyer stays private under company policy.
      </figcaption>
    </figure>
  )
}
