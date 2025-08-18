import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Building, Globe } from "lucide-react";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-[#4a5570]">PTIES Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"}
              className={location.pathname === "/" ? "bg-[#4a5570] text-white" : "text-[#4a5570]"}
            >
              <Building className="w-4 h-4 mr-2" />
              Dashboard IES
            </Button>
          </Link>
          <Link to="/men-global">
            <Button 
              variant={location.pathname === "/men-global" ? "default" : "ghost"}
              className={location.pathname === "/men-global" ? "bg-[#4a5570] text-white" : "text-[#4a5570]"}
            >
              <Globe className="w-4 h-4 mr-2" />
              MEN Dashboard Global
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
