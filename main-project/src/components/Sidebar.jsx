import { Link, useLocation } from "react-router-dom";
import { BarChart2, Clock, AlertTriangle, Settings, HomeIcon as House } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "" : "";
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-custom-gray bg-opacity-80 backdrop-blur-sm text-white p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="./logo.png" alt="SensoPredict Logo" className="h-8 w-8 rounded-full mr-2" />
          <h1 className="text-2xl font-bold mr-4">SensoPredict</h1>
          <p className="text-black text-sm hidden md:block">Smart Maintenance Guardian</p>
        </div>

        <nav className="flex space-x-2 overflow-x-auto">
          <Link
            to="/"
            className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-custom-gray-dark transition-colors ${isActive("/")}`}
          >
            <House className="w-5 h-5" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <Link
            to="/dashboard"
            className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-custom-gray-dark transition-colors ${isActive("/dashboard")}`}
          >
            <BarChart2 className="w-5 h-5" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>

          <Link
            to="/maintenance"
            className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-custom-gray-dark transition-colors ${isActive("/maintenance")}`}
          >
            <Clock className="w-5 h-5" />
            <span className="hidden md:inline">Maintenance</span>
          </Link>

          <Link
            to="/predictions"
            className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-custom-gray-dark transition-colors ${isActive("/predictions")}`}
          >
            <AlertTriangle className="w-5 h-5" />
            <span className="hidden md:inline">Predictions</span>
          </Link>

          <Link
            to="/equipment"
            className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-custom-gray-dark transition-colors ${isActive("/equipment")}`}
          >
            <Settings className="w-5 h-5" />
            <span className="hidden md:inline">Equipment</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
