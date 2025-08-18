import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import IESDashboard from "./pages/IESDashboard";
import MENDashboard from "./pages/MENDashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* SNIES Header Banner */}
        <div className="w-full bg-white border-b border-gray-200 p-2">
          <img
            src={`${process.env.PUBLIC_URL}/snies-header.png`}
            alt="SNIES - Sistema Nacional de Información de la Educación Superior"
            className="w-full h-auto object-contain"
            style={{ maxHeight: '100px' }}
            onError={(e) => {
              console.error('Image failed to load. Trying fallback path...');
              console.log('Current src:', e.currentTarget.src);
              console.log('PUBLIC_URL:', process.env.PUBLIC_URL);
              
              // Hide image and show fallback
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector('.fallback-text')) {
                const fallback = document.createElement('div');
                fallback.className = 'fallback-text text-center py-4 bg-red-50 text-red-600 font-semibold text-xl border-2 border-red-200 rounded';
                fallback.innerHTML = '<strong>SNIES</strong><br/>Sistema Nacional de Información de la Educación Superior<br/><small>⚠️ Image not found</small>';
                parent.appendChild(fallback);
              }
            }}
            onLoad={() => console.log('✅ SNIES image loaded successfully')}
          />
        </div>
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
