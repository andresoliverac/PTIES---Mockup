import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SNIESHeader from "./components/SNIESHeader";
import IESDashboard from "./pages/IESDashboard";
import MENDashboard from "./pages/MENDashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f6f6f6]">
        <SNIESHeader />
        <Routes>
          <Route path="/" element={<IESDashboard />} />
          <Route path="/men-global" element={<MENDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
