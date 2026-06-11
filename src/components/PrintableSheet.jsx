import logo from "../assets/sgp-logo.png";

function resolveWeeks(weeks) {
  const resolved = [...weeks];
  let lastValue = "";

  for (let i = 0; i < resolved.length; i++) {
    if (resolved[i] && resolved[i].trim() !== "") {
      lastValue = resolved[i];
    } else if (lastValue) {
      resolved[i] = lastValue;
    }
  }

  return resolved;
}

export default function PrintableSheet({ data }) {
  return (
    <div className="print-root">

      {/* ================= PAGE 1 ================= */}
      <div className="page a4">

        {/* HEADER */}
        <div className="header-row">
          <img src={logo} className="logo" alt="Sai Ganga Panakeia" />

          <div className="contact">
            <div>Appointment: 7331109988 / 6305853769</div>
            <div>Medicines: 9182140113</div>
            <div>Online Yoga Sessions: 9440539030</div>
            <div>Call Between 10am - 6pm</div>
          </div>
        </div>

        {/* PATIENT INFO */}
        <div className="patient-info">
          <div>
            Patient Name:
            <span className="line center-text">{data.patientName}</span>
          </div>

          <div className="row">
            <div>
              Age: <span className="line short center-text">{data.age}</span>
            </div>
            <div>
              Weight: <span className="line short center-text">{data.weight}</span>
            </div>
          </div>

          <div className="row">
            Consulted Date:
            <span className="line center-text">{data.consultedDate}</span>
            Review After:
            <span className="line short center-text">{data.reviewAfter}</span>
          </div>

          <div>
            Follow Up Doctor Name:
            <span className="line center-text">{data.followUpDoctor}</span>
            Phone number:
            <span className="line short center-text">{data.phone}</span>
          </div>
        </div>

        {/* VPK ANALYSIS */}
        <div className="vpk-box" style={{ marginTop: "4mm" }}>
          <div className="box-title">Pulse Diagnosis:</div>
          <div className="box-content" style={{ minHeight: "12mm", whiteSpace: "pre-wrap" }}>
            {data.vpkAnalysis}
          </div>
        </div>

        {/* SUPPLEMENT TABLE */}
        <table className="supplement-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Supplement</th>
              <th>Quantity</th>
              <th>1st<br />week</th>
              <th>2nd<br />week</th>
              <th>3rd<br />week</th>
              <th>4th<br />week</th>
              <th>5th<br />week</th>
              <th>6th<br />week</th>
              <th>7th<br />week</th>
              <th>8th<br />week</th>
            </tr>
          </thead>
          <tbody>
            {data.supplements.map(r => (
              <tr key={r.sno}>
                <td>{r.sno}</td>
                <td>{r.name}</td>
                <td>{r.quantity}</td>
                {resolveWeeks(r.weeks).map((w, i) => (
                  <td key={i}>{w}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* BOTTOM BOXES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "4mm",
            marginTop: "4mm"
          }}
        >
          {/* ALLOPATHY */}
          <div className="box">
            <div className="box-title">Allopathy Medicines Prescribed</div>
            <div className="box-content">{data.allopathyMedicines}</div>
          </div>

          {/* PANCHAKARMA */}
          <div className="box">
            <div className="box-title">Panchakarma</div>
            <div className="box-content">{data.panchakarma}</div>
          </div>

          {/* TEST */}
          <div className="box">
            <div className="box-title">Test To Be Done</div>
            <div className="box-content">{data.testsToBeDone}</div>
          </div>

          {/* OTHERS */}
          <div className="box">
            <div className="box-title">Others</div>
            <div className="box-content">{data.otherNote}</div>
          </div>
        </div>

      </div>

      {/* ================= PAGE 2 ================= */}
      <div className="page a4 page-break">

        {/* DAILY REGIMEN */}
        <h3>DAILY REGIMEN</h3>

        <div className="regimen-grid">

          {/* OILS + HOME REMEDIES COLUMN */}
          <div>
            <h4>Oil Applications</h4>

            {data.regimen?.bodyOils && (
              <p>
                o Body Oils – Apply daily
                <br />
                Nutex Oil <span className="fill">{data.nutexOil}</span>
                <br />
                Chandanadi Oil <span className="fill">{data.chandanadiOil}</span>
              </p>
            )}

            {data.regimen?.skinOils && (
              <p>o Skin Oils – Apply on affected areas daily</p>
            )}

            {data.regimen?.neelibringadi && (
              <p>o Scalp Oil – Neelibringadi Kera Tailam</p>
            )}

            <h4>Home Remedies</h4>

            {data.regimen?.anutailam && (
              <p>o Anutailam (2 drops each nostril &amp; ear)</p>
            )}

            {data.regimen?.gandusham && (
              <p>o Gandusham (30ml Sesame oil)</p>
            )}

            {data.regimen?.steam && (
              <p>o Steam (Water + Zandubalm + Turmeric + Ghee)</p>
            )}

            {data.regimen?.corianderMilk && (
              <p>
                o Coriander Milk
                {data.regimen.withGinger && " (With Ginger)"}
                {data.regimen.withoutGinger && " (Without Ginger)"}
              </p>
            )}
          </div>

          {/* DETOX + BREATHING COLUMN */}
          <div>
            <h4>Detox Procedures</h4>

            {data.regimen?.fennelWater && (
              <p>
                o Fennel Water
                <span className="fill">{data.fennelWater}</span>
              </p>
            )}

            {data.regimen?.soups && (
              <p>
                o Soups
                <span className="fill">{data.soups}</span>
              </p>
            )}

            {data.regimen?.nithyaVirechana && (
              <>
                <p><b>o Nithya Virechana – 7 days</b></p>
                <p>
                  Warm Water <span className="fill">{data.warmWater}</span><br />
                  Lemon <span className="fill">{data.lemon}</span><br />
                  Black Salt <span className="fill">{data.blackSalt}</span><br />
                  Castor Oil <span className="fill">{data.castorOil}</span>
                </p>
              </>
            )}

            {data.regimen?.prativaaraVirechana && (
              <p>o Prativaara Virechana – Once weekly</p>
            )}

            <h4>Breathing Exercises</h4>

            {data.regimen?.dnb && (
              <p>o DNB (Left → Hold → Right | 1:4:2)</p>
            )}

            {data.regimen?.rdnb && (
              <p>o RDNB (Right → Hold → Left | 1:4:2)</p>
            )}

            {data.regimen?.pranayama && (
              <p>o Pranayama</p>
            )}

            {data.regimen?.other && data.otherNote && (
              <p>o Other: {data.otherNote}</p>
            )}
          </div>

        </div>

        <hr style={{ margin: "6mm 0" }} />

        {/* DIET TABLE */}
        <table className="diet-table">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Diet</th>
              <th>No of weeks</th>
            </tr>
          </thead>
          <tbody>
            {data.diets.map((d, i) => (
              <tr key={i}>
                <td className="center-cell">{d.sno}</td>
                <td className="center-cell">{d.diet}</td>
                <td className="center-cell">{d.weeks}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr style={{ margin: "4mm 0" }} />

        {/* INSTRUCTION BULLETS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "8mm",
            alignItems: "start"
          }}
        >
          {/* LEFT — ENGLISH BULLETS */}
          <ul style={{ margin: "2mm 0", paddingLeft: "16px", fontSize: "10.5px", lineHeight: "1.2" }}>
            <li>Medicines should be taken twice a day</li>
            <li>Timing: 6:00 AM to 8:00 AM and 6:00 PM to 8:00 PM</li>
            <li>Give 5–10 mins gap for each supplement</li>
            <li>Tablet forms can be taken directly with water</li>
            <li>Avoid CCRSTT (Cabbage, Cauliflower, Radish, Spinach, Tomato, tamarind) foods</li>
            <li>5 cashew, 5 almonds, soaked groundnuts (2 tablespoons) daily</li>
            <li>2 liters fennel water daily</li>
            <li>One type of soup – 2 glasses daily</li>
          </ul>

          {/* RIGHT — DIET REFERENCE */}
          <ul style={{ margin: "2mm 0", fontSize: "10.5px", lineHeight: "1.2" }}>
            <li><b>Diet Reference / ఆహార సూచనలు</b></li>
            <li>Fennel Water – (All diets) / సొంపు నీరు – (అన్ని)</li>
            <li>Biyyam – (Pitha &amp; Vata) / బియ్యం – (పిత్త &amp; వాత)</li>
            <li>Barley – (Pitha &amp; Vata) / బార్లీ – (పిత్త &amp; వాత)</li>
            <li>Saggubiyyam – (Pitha &amp; Vata) / బార్లీ – (పిత్త &amp; వాత)</li>
            <li>Jonna – (Kapha / PAD) / జొన్న – (కఫ / PAD)</li>
            <li>Ragi – (Kapha / PAD) / రాగి – (కఫ / PAD)</li>
            <li>Cabbage – (Pitha &amp; Vata) / క్యాబేజీ – (పిత్త &amp; వాత)</li>
          </ul>
        </div>

        {/* TELUGU BULLETS */}
        <ul style={{ margin: "2mm 0", paddingLeft: "16px", fontSize: "10.5px" }}>
          <li>మందులు రోజుకు రెండుసార్లు తీసుకోవాలి</li>
          <li>సమయం: ఉదయం 6–8 మరియు సాయంత్రం 6–8</li>
          <li>ప్రతి సప్లిమెంట్‌కు 5–10 నిమిషాల గ్యాప్ ఇవ్వండి</li>
          <li>మాత్రలు నేరుగా నీటితో తీసుకోవచ్చు</li>
          <li>CCRSTT (క్యాబేజీ, క్యాలీఫ్లవర్, ముల్లంగి, పాలకూర, టమోటా, చింతపండు) ఆహారాలు తీసుకోకూడదు</li>
          <li>ప్రతి రోజు 5 జీడిపప్పు, 5 బాదంపప్పు, 2 టేబుల్ స్పూన్ల వేరుశెనగ</li>
          <li>ప్రతి రోజు 2 లీటర్లు ఫెన్నెల్ వాటర్</li>
          <li>ప్రతి రోజు ఒక రకం సూప్ 2 గ్లాసులు</li>
        </ul>
        <hr />

        <p className="footer">
          "Save trees, save the future and Write off paper—go electronic" – Think before printing.
        </p>

      </div>

    </div>
  );
}