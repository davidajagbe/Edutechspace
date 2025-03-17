import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo2 from '../assets/logo2.png';

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-radial from-gray-900 to-black opacity-50"></div>
      <div className="text-center relative">
        <div className="w-72 h-72 mb-8 animate-pulse relative">
          <img src={logo2} alt="RUNTechSpace" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)]"></div>
        </div>
        <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto relative">
          <div className="absolute left-0 w-1/3 h-full bg-white animate-[loading_1s_infinite_ease-in-out]"></div>
        </div>
      </div>
      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingPage;
