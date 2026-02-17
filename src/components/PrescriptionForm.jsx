const SUPPLEMENT_LIST = [
  "",
  "DTOX",
  "APD",
  "BIOTIN",
  "MIGRANONE",
  "ATHEROLYZIN-G",
  "IMUMODULIN-G",
  "Omega 3"
];

const QUANTITY_LIST = [
  "",
  "1/4",
  "1/2",
  "3/4",
  "1",
  "1 1/2",
  "2"
];


export default function PrescriptionForm({ data, setData, onPrint }) {
  const update = (key, value) =>
    setData(prev => ({ ...prev, [key]: value }));

  const parseFraction = (value) => {
  if (!value) return null;

  value = value.trim();

  // Mixed fraction (e.g., "1 1/2")
  if (value.includes(" ")) {
    const [whole, fraction] = value.split(" ");
    const [num, den] = fraction.split("/").map(Number);
    return Number(whole) + num / den;
  }

  // Simple fraction (e.g., "1/2")
  if (value.includes("/")) {
    const [num, den] = value.split("/").map(Number);
    return num / den;
  }

  // Whole number
  return Number(value);
};

const toFraction = (decimal) => {
  if (decimal === 0) return "0";

  // If whole number
  if (Number.isInteger(decimal)) {
    return decimal.toString();
  }

  const tolerance = 1.0E-6;
  let numerator = 1;
  let denominator = 1;

  while (Math.abs(numerator / denominator - decimal) > tolerance) {
    if (numerator / denominator < decimal) numerator++;
    else denominator++;
  }

  // Simplify fraction
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const divisor = gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;

  // Mixed number
  if (numerator > denominator) {
    const whole = Math.floor(numerator / denominator);
    const remainder = numerator % denominator;

    if (remainder === 0) return whole.toString();
    return `${whole} ${remainder}/${denominator}`;
  }

  return `${numerator}/${denominator}`;
};


const updateSupplement = (rowIndex, col, value) => {
  const copy = [...data.supplements];
  const currentRow = copy[rowIndex];

  // Quantity changed
  if (col === "quantity") {
    const previousQty = currentRow.quantity;
    currentRow.quantity = value;

    if (
      (previousQty === "1000mg" && value === "500mg") ||
      (previousQty === "500mg" && value === "1000mg")
    ) {
      const multiplier =
        previousQty === "1000mg" && value === "500mg"
          ? 2
          : 0.5;

      currentRow.weeks = currentRow.weeks.map(w => {
        if (!w) return "";

        const numeric = parseFraction(w);
        if (numeric === null || isNaN(numeric)) return w;

        const scaled = numeric * multiplier;
        return toFraction(scaled);
      });
    }
  }

  else if (col === "name") {
    currentRow.name = value;
  }

  else {
    currentRow.weeks[col] = value;
  }

  update("supplements", copy);
};


  

  return (
    <div className="doctor-ui">
      <div className="doctor-form">

        {/* ================= PATIENT DETAILS ================= */}
        <div className="form-section">
          <div className="section-title">Patient Details</div>

          <div className="field-grid">

            <input
              placeholder="Patient Name"
              value={data.patientName}
              onChange={e => update("patientName", e.target.value)}
            />

            <input
              placeholder="Age"
              value={data.age}
              onChange={e => update("age", e.target.value)}
            />

            <input
              placeholder="Weight"
              value={data.weight}
              onChange={e => update("weight", e.target.value)}
            />

            <input
              type="date"
              placeholder="Consulted Date"
              value={data.consultedDate}
              onChange={e => update("consultedDate", e.target.value)}
            />

            
            <input
              placeholder="Follow Up Doctor Name"
              value={data.followUpDoctor}
              onChange={e => update("followUpDoctor", e.target.value)}
            />

            
            <input
              placeholder="Phone Number"
              value={data.phone}
              onChange={e => update("phone", e.target.value)}
            />

            
            <select
              value={data.reviewAfter}
              onChange={e => update("reviewAfter", e.target.value)}
            >
              <option value="">Review After</option>
              <option value="1 Month">1 Month</option>
              <option value="2 Months">2 Months</option>
            </select>

          </div>

        </div>

        {/* ================= SUPPLEMENTS ================= */}
        <div className="form-section">
          <div className="section-title">Supplement Schedule (10 × 8 Weeks)</div>

          <div className="table-wrapper">
            <table className="grid-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Supplement</th>
                  <th>Quantity</th>
                  {[...Array(8)].map((_, i) => (
                    <th key={i}>{i + 1}w</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.supplements.map((row, r) => (
                  <tr key={r}>
                    <td>{row.sno}</td>

                    {/* 🔽 SUPPLEMENT NAME DROPDOWN */}
                    <td>
                      <input
                        value={row.name}
                        onChange={e =>
                          updateSupplement(r, "name", e.target.value)
                        }
                        placeholder="Supplement"
                      />
                    </td>
                    <td>
                      <select
                        value={row.quantity}
                        onChange={e =>
                          updateSupplement(r, "quantity", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="500mg">500mg</option>
                        <option value="1000mg">1000mg</option>
                        <option value="60 Tablets">60 Tablets</option>

                      </select>
                    </td>


                    {/* 🔽 WEEKLY QUANTITY DROPDOWNS */}
                    {row.weeks.map((w, c) => (
                      <td key={c}>
                        <input
                          type="text"
                          value={w}
                          placeholder="-"
                          onChange={e =>
                            updateSupplement(r, c, e.target.value)
                          }
                          className="week-input"
                        />
                      </td>
                    ))}


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* ================= DAILY REGIMEN ================= */}
        <div className="form-section">
          <div className="section-title">Daily Regimen</div>

          {/* ================= INTERNAL DETOX ================= */}
          <h4>Internal Detox</h4>

          {/* Fennel Water */}
          <div className="regimen-item">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={data.regimen.fennelWater}
                onChange={e =>
                  setData(prev => ({
                    ...prev,
                    regimen: { ...prev.regimen, fennelWater: e.target.checked }
                  }))
                }
              />
              Fennel Water / per day - Daily
            </label>

            {data.regimen.fennelWater && (
              <input
                placeholder="Fennel Water (Liters)"
                value={data.fennelWater}
                onChange={e => update("fennelWater", e.target.value)}
              />
            )}
          </div>

          {/* Soups */}
          <div className="regimen-item">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={data.regimen.soups}
                onChange={e =>
                  setData(prev => ({
                    ...prev,
                    regimen: { ...prev.regimen, soups: e.target.checked }
                  }))
                }
              />
              Soups / per day - Daily
            </label>

            {data.regimen.soups && (
              <input
                placeholder="Soups (Glasses)"
                value={data.soups}
                onChange={e => update("soups", e.target.value)}
              />
            )}
          </div>

          {/* ================= OIL APPLICATIONS ================= */}
          <hr />
          <h4>Oil Applications</h4>

          <div className="regimen-item">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={data.regimen.bodyOils}
                onChange={e =>
                  setData(prev => ({
                    ...prev,
                    regimen: { ...prev.regimen, bodyOils: e.target.checked }
                  }))
                }
              />
              Body Oils - Apply all over the body daily
            </label>

            {data.regimen.bodyOils && (
              <div className="sub-fields">
                <input
                  placeholder="Nutex Oil"
                  value={data.nutexOil || ""}
                  onChange={e => update("nutexOil", e.target.value)}
                />
                <input
                  placeholder="Chandanadi Oil"
                  value={data.chandanadiOil || ""}
                  onChange={e => update("chandanadiOil", e.target.value)}
                />
              </div>
            )}
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={data.regimen.skinOils}
              onChange={e =>
                setData(prev => ({
                  ...prev,
                  regimen: { ...prev.regimen, skinOils: e.target.checked }
                }))
              }
            />
            Skin Oils - Apply on affected areas daily
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={data.regimen.neelibringadi}
              onChange={e =>
                setData(prev => ({
                  ...prev,
                  regimen: { ...prev.regimen, neelibringadi: e.target.checked }
                }))
              }
            />
            Scalp Oil: Neelibringadi Kera Tailam (Kottakal brand)
          </label>

          {/* ================= VIRECHANA ================= */}
          <hr />
          <h4>Virechana Therapy</h4>

          <div className="regimen-item">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={data.regimen.nithyaVirechana}
                onChange={e => {
                  const checked = e.target.checked;
                  setData(prev => ({
                    ...prev,
                    regimen: {
                      ...prev.regimen,
                      nithyaVirechana: checked,
                      warmWater: checked,
                      lemon: checked,
                      blackSalt: checked,
                      castorOil: checked
                    }
                  }));
                }}
              />
              Nithya Virechana Karma - 7 days
            </label>

            {data.regimen.nithyaVirechana && (
              <div className="sub-fields">
                {[
                  ["warmWater", "Warm Water"],
                  ["lemon", "Lemon"],
                  ["blackSalt", "Black Salt"],
                  ["castorOil", "Castor Oil"]
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className="checkbox-row">
                      <input type="checkbox" checked readOnly />
                      {label}
                    </label>
                    <input
                      placeholder={label}
                      value={data[key]}
                      onChange={e => update(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={data.regimen.prativaaraVirechana}
              onChange={e =>
                setData(prev => ({
                  ...prev,
                  regimen: { ...prev.regimen, prativaaraVirechana: e.target.checked }
                }))
              }
            />
            Prativaara Virechana Karma - once in a week
          </label>

          {/* ================= HOME REMEDIES ================= */}
          <hr />
          <h4>Other Home Remedies</h4>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={data.regimen.anutailam}
              onChange={e =>
                setData(prev => ({
                  ...prev,
                  regimen: { ...prev.regimen, anutailam: e.target.checked }
                }))
              }
            />
            Anutailam (2 drops in each nostril and ear)
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={data.regimen.gandusham}
              onChange={e =>
                setData(prev => ({
                  ...prev,
                  regimen: { ...prev.regimen, gandusham: e.target.checked }
                }))
              }
            />
            Gandusham (Oil pulling with 30ml Sesame oil)
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={data.regimen.steam}
              onChange={e =>
                setData(prev => ({
                  ...prev,
                  regimen: { ...prev.regimen, steam: e.target.checked }
                }))
              }
            />
            Steam Inhalations (Water + Zandubalm + Turmeric + Ghee)
          </label>

          {/* Coriander Milk */}
          <div className="regimen-item">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={data.regimen.corianderMilk}
                onChange={e =>
                  setData(prev => ({
                    ...prev,
                    regimen: { ...prev.regimen, corianderMilk: e.target.checked }
                  }))
                }
              />
              Coriander Milk
            </label>

            {data.regimen.corianderMilk && (
              <div className="sub-fields">
                <label className="checkbox-row">
                  <input
                    type="radio"
                    name="ginger"
                    checked={data.regimen.withGinger}
                    onChange={() =>
                      setData(prev => ({
                        ...prev,
                        regimen: {
                          ...prev.regimen,
                          withGinger: true,
                          withoutGinger: false
                        }
                      }))
                    }
                  />
                  With Ginger
                </label>

                <label className="checkbox-row">
                  <input
                    type="radio"
                    name="ginger"
                    checked={data.regimen.withoutGinger}
                    onChange={() =>
                      setData(prev => ({
                        ...prev,
                        regimen: {
                          ...prev.regimen,
                          withGinger: false,
                          withoutGinger: true
                        }
                      }))
                    }
                  />
                  Without Ginger
                </label>
              </div>
            )}
          </div>

          {/* ================= BREATHING ================= */}
          <hr />
          <h4>Breathing Exercises</h4>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={data.regimen.dnb}
              onChange={e =>
                setData(prev => ({
                  ...prev,
                  regimen: { ...prev.regimen, dnb: e.target.checked }
                }))
              }
            />
            DNB (Left → Hold → Right in 1:4:2 ratio)
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={data.regimen.rdnb}
              onChange={e =>
                setData(prev => ({
                  ...prev,
                  regimen: { ...prev.regimen, rdnb: e.target.checked }
                }))
              }
            />
            RDNB (Right → Hold → Left in 1:4:2 ratio)
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={data.regimen.pranayama}
              onChange={e =>
                setData(prev => ({
                  ...prev,
                  regimen: { ...prev.regimen, pranayama: e.target.checked }
                }))
              }
            />
            Pranayama
          </label>

          {/* ================= OTHER ================= */}
          <div className="regimen-item">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={data.regimen.other || false}
                onChange={e =>
                  setData(prev => ({
                    ...prev,
                    regimen: { ...prev.regimen, other: e.target.checked }
                  }))
                }
              />
              Other
            </label>

            {data.regimen.other && (
              <input
                placeholder="Other instructions"
                value={data.otherNote}
                onChange={e => update("otherNote", e.target.value)}
              />
            )}
          </div>

        </div>





        {/* ================= DIET PLAN ================= */}
        <div className="form-section">
          <div className="section-title">Diet Plan</div>

          <div className="diet-grid">
            {data.diets.map((d, i) => (
              <div key={i} className="diet-row">
                <input
                  placeholder="Diet"
                  value={d.diet}
                  onChange={e => {
                    const copy = [...data.diets];
                    copy[i].diet = e.target.value;
                    update("diets", copy);
                  }}
                />

                <input
                  placeholder="No of weeks"
                  value={d.weeks}
                  onChange={e => {
                    const copy = [...data.diets];
                    copy[i].weeks = e.target.value;
                    update("diets", copy);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= ADDITIONAL NOTES ================= */}
        <div className="form-section">
          <div className="section-title">Additional Treatments & Notes</div>

          <textarea
            placeholder="Other instructions"
            value={data.otherNote}
            onChange={e => update("otherNote", e.target.value)}
          />

          <textarea
            placeholder="Panchakarma"
            value={data.panchakarma}
            onChange={e => update("panchakarma", e.target.value)}
          />

          <textarea
            placeholder="Allopathy Medicines Prescribed"
            value={data.allopathyMedicines}
            onChange={e => update("allopathyMedicines", e.target.value)}
          />

          <textarea
            placeholder="Test To Be Done"
            value={data.testsToBeDone}
            onChange={e => update("testsToBeDone", e.target.value)}
          />
        </div>

        {/* ================= PRINT ================= */}
        <div className="form-actions">
          <button className="print-btn" onClick={onPrint}>
            Print Prescription
          </button>
        </div>

      </div>
    </div>
  );
}
