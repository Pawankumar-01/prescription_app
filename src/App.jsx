import { useState } from "react";
import PrescriptionForm from "./components/PrescriptionForm";
import PrintableSheet from "./components/PrintableSheet";
import "./App.css";

export default function App() {
  const [printMode, setPrintMode] = useState(false);

  const [data, setData] = useState({
  // ================= PATIENT =================
  patientName: "",
  age: "",
  weight: "",
  consultedDate: "",
  reviewAfter: "",
  doctorName: "",
  followUpDoctor: "",
  phone: "",

  // ================= SUPPLEMENTS =================
  supplements: Array.from({ length: 12 }, (_, i) => ({
  sno: i + 1,
  name: "",
  quantity: "1000mg",   // ✅ default
  weeks: Array(8).fill("")
})),


  // ================= DAILY REGIMEN VALUES =================
  fennelWater: "",
  soups: "",

  // Body oils values
  nutexOil: "",
  chandanadiOil: "",

  // Nithya values
  warmWater: "",
  lemon: "",
  blackSalt: "",
  castorOil: "",

  // ================= REGIMEN TOGGLES =================
  regimen: {
    // Detox
    fennelWater: false,
    soups: false,
    nithyaVirechana: false,
    prativaaraVirechana: false,

    // Oils
    bodyOils: false,
    skinOils: false,
    neelibringadi: false,

    // Remedies
    anutailam: false,
    gandusham: false,
    steam: false,
    corianderMilk: false,

    // Coriander options
    withGinger: false,
    withoutGinger: false,

    // Breathing
    dnb: false,
    rdnb: false,
    pranayama: false,

    // Other
    other: false
  },

  // ================= NOTES =================
  otherNote: "",

  // ================= DIET TABLE =================
  diets: Array.from({ length: 5 }, (_, i) => ({
    sno: i + 1,
    diet: "",
    weeks: ""
  })),

  // ================= BOTTOM BOXES =================
  panchakarma: "",
  allopathyMedicines: "",
  testsToBeDone: ""
});


 
  const handlePrint = () => {
    setPrintMode(true);
    setTimeout(() => window.print(), 300);
    setTimeout(() => setPrintMode(false), 1000);
  };

  return (
    <>
      {!printMode && (
        <PrescriptionForm
          data={data}
          setData={setData}
          onPrint={handlePrint}
        />
      )}

      <PrintableSheet data={data} />
    </>
  );
}
