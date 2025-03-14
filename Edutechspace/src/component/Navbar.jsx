import React, { useState,useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import logoiii from '../assets/logoii.png';
import Cookies from 'js-cookie';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('token');
      if (token) {
        setIsLoggedIn(true);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserName(user.name || 'User');
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <header>
      <nav className="px-10 py-7 bg-neutral-100">
        <div className="relative flex items-center justify-between">
          <NavLink to="/" className="relative z-10 pr-4 xl:pr-0">
            <img className="h-10" src={logoiii} alt="RUNTechSpace Logo" />
          </NavLink>
          <div className="hidden xl:flex xl:justify-center gap-16 xl:absolute xl:w-full xl:top-1/2 xl:left-1/2 xl:transform xl:-translate-y-1/2 xl:-translate-x-1/2">
            <NavLink className="navlinks" to="/">Home</NavLink>
            <NavLink className="navlinks" to="/course">All Courses</NavLink>
            <NavLink className="navlinks" to="/">RTS Certification Exams</NavLink>
            <NavLink className="navlinks" to="/contact">Contact us</NavLink>
          </div>
          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <NavLink className="text-lg font-medium text-blue-950 navlinks cursor-pointer" to="/profile">{userName}</NavLink>
              <button 
                className="bg-slate-200 text-blue-950 px-4 py-2 rounded-lg text-lg font-medium hover:bg-blue-950 hover:text-white transition-all"
                onClick={() => setShowLogoutModal(true)}
              >
                Logout
              </button>
            </div>
          )}
          <button className="xl:hidden" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            &#9776;
          </button>
        </div>
      </nav>
      <Dialog open={showLogoutModal} onClose={() => setShowLogoutModal(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg text-center">
          <DialogTitle className="text-lg font-medium text-neutral-900">Are you sure you want to logout?</DialogTitle>
          <div className="mt-4 flex justify-center space-x-4">
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Yes, Logout</button>
            <button onClick={() => setShowLogoutModal(false)} className="bg-gray-300 text-neutral-900 px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
          </div>
        </DialogPanel>
      </Dialog>
      {mobileNavOpen && (
        <div className="fixed top-0 left-0 bottom-0 w-5/6 max-w-xs z-50">
          <div className="fixed inset-0 bg-black opacity-20" onClick={() => setMobileNavOpen(false)}></div>
          <nav className="relative p-8 w-full h-full bg-white overflow-y-auto">
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <NavLink className="pr-4" to="/">
                  <img className="h-10" src={logoiii} alt="RUNTechSpace Logo" />
                </NavLink>
                <button onClick={() => setMobileNavOpen(false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6L18 18" stroke="#252E4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-8 py-16">
                <NavLink className="max-w-max navlinks" to="/">Home</NavLink>
                <NavLink className="max-w-max navlinks" to="/course">All Courses</NavLink>
                <NavLink className="max-w-max navlinks" to="/exams">Certification Exams</NavLink>
                <NavLink 
                className="max-w-max navlinks" 
                onClick={handleLogout}
              >
                Logout
              </NavLink>
              </div>
              <div className="flex flex-col items-center gap-2">
                <NavLink className="inline-flex 
                    justify-center 
                    items-center 
                    text-center 
                    w-full h-12 p-5 
                    font-medium tracking-tight 
                    text-lg hover:text-white 
                    focus:text-white bg-transparent 
                    hover:bg-neutral-900 focus:bg-neutral-900 
                    border border-neutral-900 rounded-lg 
                    focus:ring-4 focus:ring-neutral-400 
                    transition duration-200" 
                    to="/support"
                >Contact us</NavLink>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
