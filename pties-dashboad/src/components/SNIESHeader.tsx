import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Building, Globe, Calendar } from "lucide-react";

export default function SNIESHeader() {
  const location = useLocation();

  return (
    <div className="w-full">
      {/* SNIES Image Header */}
      <div className="w-full bg-[#f6f6f6] border-b border-gray-200 p-2">
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
      
      {/* Navigation Bar */}
      <div className="w-full bg-[#4a5570] border-b border-gray-200 px-6 md:px-10 py-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-white">PTIES Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/men-global">
              <Button 
                variant={location.pathname === "/men-global" ? "default" : "ghost"}
                className={location.pathname === "/men-global" ? "bg-white text-[#4a5570] hover:bg-gray-100" : "text-white hover:bg-[#3a4560] border-white"}
              >
                <Globe className="w-4 h-4 mr-2" />
                MEN
              </Button>
            </Link>
            <Link to="/ies-landing">
              <Button 
                variant={location.pathname === "/ies-landing" ? "default" : "ghost"}
                className={location.pathname === "/ies-landing" ? "bg-white text-[#4a5570] hover:bg-gray-100" : "text-white hover:bg-[#3a4560] border-white"}
              >
                <Building className="w-4 h-4 mr-2" />
                IES
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
