import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SNIESHeader from "./components/SNIESHeader";
import IESLanding from "./pages/IESLanding";
import IESDashboard from "./pages/IESDashboard";
import GestionDocumentos from "./pages/GestionDocumentos";
import GestionActividades from "./pages/GestionActividades";
import MENDashboard from "./pages/MENDashboard";
import AsistenciaUpload from "./pages/upload/AsistenciaUpload";
import PlanAccionUpload from "./pages/upload/PlanAccionUpload";
import EducacionEvaluacionesUpload from "./pages/upload/EducacionEvaluacionesUpload";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f6f6f6]">
        <SNIESHeader />
        <Routes>
          <Route path="/" element={<IESLanding />} />
          <Route path="/ies-dashboard" element={<IESDashboard />} />
          <Route path="/gestion-documentos" element={<GestionDocumentos />} />
          <Route path="/gestion-actividades" element={<GestionActividades />} />
          <Route path="/men-global" element={<MENDashboard />} />
          <Route path="/upload/asistencia" element={<AsistenciaUpload />} />
          <Route path="/upload/plan-accion" element={<PlanAccionUpload />} />
          <Route path="/upload/educacion-evaluaciones" element={<EducacionEvaluacionesUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
