import { useState } from "react";
import PrescriptionForm from "./components/PrescriptionForm";
import PrintableSheet from "./components/PrintableSheet";
import "./App.css";

export default function App() {
  const [printMode, setPrintMode] = useState(false);

  const [data, setData] = useState({
  // Patient
  patientName: "",
  age: "",
  weight: "",
  consultedDate: "",
  reviewAfter: "",
  doctorName: "",
  followUpDoctor: "",
  phone: "",

  // Supplements
  supplements: Array.from({ length: 12 }, (_, i) => ({
    sno: i + 1,
    name: "",
    quantity: "",
    weeks: Array(8).fill("")
  })),

  // Daily regimen values
  fennelWater: "",
  soups: "",

  // Virechana values
  warmWater: "",
  lemon: "",
  blackSalt: "",
  castorOil: "",

  // ✅ NEW — Regimen toggles
  regimen: {
  fennelWater: false,
  soups: false,
  nutexOil: false,
  skinOils: false,
  neelibringadi: false,
  nithyaVirechana: false,
  warmWaterLemon: false,
  blackSalt: false,
  castorOil: false,
  prativaaraVirechana: false,
  anutailam: false,
  gandusham: false,
  steam: false,
  corianderMilk: false,
  withGinger: false,
  withoutGinger: false,

},


  // Other note
  otherNote: "",

  // Diet table
  diets: Array.from({ length: 5 }, (_, i) => ({
    sno: i + 1,
    diet: "",
    weeks: ""
  })),

  // Bottom boxes
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
