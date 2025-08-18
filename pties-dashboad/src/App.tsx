import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SNIESHeader from "./components/SNIESHeader";
import IESDashboard from "./pages/IESDashboard";
import MENDashboard from "./pages/MENDashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <SNIESHeader />
        <Navigation />
        <Routes>
          <Route path="/" element={<IESDashboard />} />
          <Route path="/men-global" element={<MENDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
