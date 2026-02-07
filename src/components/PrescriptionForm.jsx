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

  const updateSupplement = (row, col, value) => {
    const copy = [...data.supplements];
    if (col === "name") copy[row].name = value;
    else copy[row].weeks[col] = value;
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

          <div className="field-grid two-col">
            <input
              placeholder="Fennel Water (per day)"
              value={data.fennelWater}
              onChange={e => update("fennelWater", e.target.value)}
            />

            <input
              placeholder="Soups (per day)"
              value={data.soups}
              onChange={e => update("soups", e.target.value)}
            />
          </div>
        </div>

        {/* ================= NITHYA VIRECHANA ================= */}
        <div className="form-section">
          <div className="section-title">Nithya Virechana Karma</div>

          <div className="field-grid two-col">
            <input
              placeholder="Warm Water"
              value={data.warmWater}
              onChange={e => update("warmWater", e.target.value)}
            />

            <input
              placeholder="Lemon"
              value={data.lemon}
              onChange={e => update("lemon", e.target.value)}
            />

            <input
              placeholder="Black Salt"
              value={data.blackSalt}
              onChange={e => update("blackSalt", e.target.value)}
            />

            <input
              placeholder="Castor Oil"
              value={data.castorOil}
              onChange={e => update("castorOil", e.target.value)}
            />
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
