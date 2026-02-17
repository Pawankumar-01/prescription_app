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

        {/* ================= DIET + BOXES ONLY (STABLE) ================= */}
        <div style={{ marginTop: "6mm" }}>

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

          {/* BOXES WRAPPER */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
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

          </div>

        </div>

      </div>

      {/* ================= PAGE 2 ================= */}
      <div className="page a4 page-break">

        {/* ================= DAILY REGIMEN ================= */}
        <h3>DAILY REGIMEN</h3>

        <div className="regimen-grid">

          {/* ================= OILS COLUMN ================= */}
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
              <p>o Anutailam (2 drops each nostril & ear)</p>
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

          {/* ================= DETOX + REMEDIES + BREATHING ================= */}
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


      

 


      {/* ================= PAGE 2 ================= */}
      <div className="page a4 page-break instructions">

        <div style={{ fontSize: "10px", lineHeight: "1.3" ,}}>

          <h3 style={{ marginTop:"0",marginBottom: "4mm" }}>
            INSTRUCTIONS / సూచనలు:
          </h3>

          <p style={{ margin: "2mm 0" }}>
            శరీరంలోని మలినాలను తొలగిస్తూ పోషకాలను అందించే జావలు (సూప్స్)
          </p>

          <p style={{ margin: "2mm 0" }}>
            <b>1. సొంపు గింజల నీరు :</b>
            2 1/2 లీటర్ల నీటిలో 9 టీ స్పూన్ల సొంపు గింజలను కడిగి నానబెట్టి
            10 నిమిషాలపాటు మరిగించి వడగట్టి తరువాత సరిపడ బెల్లం కలిపి
            చల్లార్చుకొని ఉదయం నుండి సాయంత్రం లోపు 2 లీటర్లు తాగవలెను.
          </p>

          <p style={{ margin: "2mm 0" }}>
            <b>2. బియ్యం గంజి :</b>
            ఒక కప్పు కడిగిన బియ్యంలో 6 కప్పుల నీటిని పోసి బాగా ఉడికించి
            వడపోసుకొని సొంధవ లవణాన్ని తగినంత కలుపుకొని తాగవలెను.
          </p>

          <p style={{ margin: "2mm 0" }}>
            <b>3. బార్లీ జావ :</b>
            5 చంచాల బార్లీ గింజలను 1 గ్లాసు నీటిలో 30 నిమిషాలు నానబెట్టి,
            తరువాత 1 లీటరు మరిగిన నీటిలో వేసి 15–20 నిమిషాలు ఉడికించి
            చల్లార్చిన తరువాత వడకట్టి తగినంత సొంధవ లవణం కలిపి తాగవలెను.
          </p>

          <p style={{ margin: "2mm 0" }}>
            <b>4. సగ్గుబియ్యం గంజి :</b>
            5 స్పూన్ల సగ్గుబియ్యాన్ని 1 గ్లాసు నీటిలో 30 నిమిషాలు నానబెట్టి,
            తరువాత 1 లీటరు మరిగిన నీటిలో వేసి 30 నిమిషాలు ఉడికించి
            చల్లార్చిన తరువాత వడకట్టి సొంధవ లవణం లేదా కలకండ కలిపి తాగవలెను.
          </p>

          <p style={{ margin: "2mm 0" }}>
            <b>5. జొన్న జావ :</b>
            3 స్పూన్ల జొన్న పిండిని 1 గ్లాసు నీటిలో కలిపి 30 నిమిషాలు నానబెట్టి,
            తరువాత 1 లీటరు మరిగిన నీటిలో వేసి 15–20 నిమిషాలు ఉడికించి
            చల్లార్చిన తరువాత తగినంత సొంధవ లవణం కలిపి తాగవలెను.
          </p>

          <p style={{ margin: "2mm 0" }}>
            <b>6. రాగి జావ :</b>
            3 స్పూన్ల రాగి పిండిని 1 గ్లాసు నీటిలో కలిపి 30 నిమిషాలు నానబెట్టి,
            తరువాత 1 లీటరు మరిగిన నీటిలో వేసి 15–20 నిమిషాలు ఉడికించి
            చల్లార్చిన తరువాత తగినంత సొంధవ లవణం కలిపి తాగవలెను.
          </p>

          <p style={{ margin: "2mm 0" }}>
            <b>7. క్యాబేజీ మరియు బ్రోకోలీ సూప్ :</b>
            50 గ్రా క్యాబేజీ, 50 గ్రా బ్రోకోలీ, 1 ఉల్లిపాయ,
            4 వెల్లుల్లి రెబ్బలు 1 గ్లాసు నీటిలో ఉడికించి
            మిక్సీ చేసి 1 లీటరు వేడి నీటిలో వేసి బాగా మరిగించి
            చల్లార్చిన తరువాత తగినంత సొంధవ లవణం కలిపి తాగవలెను.
          </p>

          <hr style={{ margin: "4mm 0" }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "8mm",
              alignItems: "start"
            }}
          >

            {/* LEFT SIDE — ENGLISH BULLETS */}
            <ul style={{ margin: "2mm 0", paddingLeft: "16px", fontSize: "10.5px", lineHeight: "1.2" }}>
              <li>Medicines should be taken twice a day</li>
              <li>Timing: 6:00 AM to 8:00 AM and 6:00 PM to 8:00 PM</li>
              <li>Give 5–10 mins gap for each supplement</li>
              <li>Tablet forms can be taken directly with water</li>
              <li>Avoid CCRSTT (Cabbage, Cauliflower, Radish, Spinach, Tomato, tamarind) foods</li>
              <li>5 cashew, 5 almonds, soaked groundnuts daily</li>
              <li>2 liters fennel water daily</li>
              <li>One type of soup – 2 glasses daily</li>
            </ul>

            {/* RIGHT SIDE — DIET REFERENCE */}
            <ul style={{ margin: "2mm 0", fontSize: "10.5px", lineHeight: "1.2" }}>
              <li><b>Diet Reference / ఆహార సూచనలు</b></li>

              <li>Fennel Water – (All diets) / సొంపు నీరు – (అన్ని)</li>
              <li>Biyyam – (Pitha & Vata) / బియ్యం – (పిత్త & వాత)</li>
              <li>Barley – (Pitha & Vata) / బార్లీ – (పిత్త & వాత)</li>
              <li>Saggubiyyam – (Pitha & Vata) / బార్లీ – (పిత్త & వాత)</li>
              <li>Jonna – (Kapha / PAD) / జొన్న – (కఫ / PAD)</li>
              <li>Ragi – (Kapha / PAD) / రాగి – (కఫ / PAD)</li>
              <li>Cabbage – (Pitha & Vata) / క్యాబేజీ – (పిత్త & వాత)</li>
            </ul>

          </div>

          <ul style={{ margin: "2mm 0", paddingLeft: "16px" }}>
            <li>మందులు రోజుకు రెండుసార్లు తీసుకోవాలి</li>
            <li>సమయం: ఉదయం 6–8 మరియు సాయంత్రం 6–8</li>
            <li>ప్రతి సప్లిమెంట్‌కు 5–10 నిమిషాల గ్యాప్ ఇవ్వండి</li>
            <li>మాత్రలు నేరుగా నీటితో తీసుకోవచ్చు</li>
            <li>CCRSTT (క్యాబేజీ, క్యాలీఫ్లవర్, ముల్లంగి, పాలకూర, టమోటా, చింతపండు) ఆహారాలు తీసుకోకూడదు</li>
            <li>ప్రతి రోజు 5 జీడిపప్పు, 5 బాదంపప్పు</li>
            <li>ప్రతి రోజు 2 లీటర్లు ఫెన్నెల్ వాటర్</li>
            <li>ప్రతి రోజు ఒక రకం సూప్ 2 గ్లాసులు</li>
          </ul>
          <hr />
          <p className="footer">"Save trees, save the future and Write off paper—go electronic"- Think before printing.</p>
        </div>
      </div>

      </div>

 </div> ); }