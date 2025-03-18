import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoii from "../assets/logoii.png";

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only run the splash logic if we're on the root route
    if (location.pathname === "/") {
      const timer = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  // If not on root route, don't display the splash screen
  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white text-slate-900">
      <div className="absolute inset-0 bg-gradient-radial from-slate-900 to-blue-950 opacity-50"></div>
      <div className="text-center relative">
        <div className="w-72 h-72 mb-8 animate-pulse relative">
          <img src={logoii} alt="RUNTechSpace" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)]"></div>
        </div>
        <div className="w-24 h-1 bg-white rounded-full overflow-hidden mx-auto relative">
          <div className="absolute left-0 w-1/3 h-full bg-slate-900 animate-[loading_1s_infinite_ease-in-out]"></div>
        </div>
      </div>
      <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
      `}</style>
    </div>
  );
};

export default LoadingPage;
