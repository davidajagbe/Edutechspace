import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import logoiii from '../assets/logoii.png';
import LogoutDialog from './logoutDialog';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md border border-white/10">
        <nav className="px-10 py-7 border-y-4">
          <div className="relative flex items-center justify-between">
            <NavLink to="/" className="relative z-10 pr-4 xl:pr-0">
              <img className="h-10" src={logoiii} alt="RUNTechSpace Logo" />
            </NavLink>
            <div className="hidden xl:flex xl:justify-center gap-16 xl:absolute xl:w-full xl:top-1/2 xl:left-1/2 xl:-translate-y-1/2 xl:-translate-x-1/2">
              <NavLink className="navlinks" to="/">Home</NavLink>
              <NavLink className="navlinks" to="/course">All Courses</NavLink>
              <NavLink className="navlinks" to="/certification-exam">RTS Certification Exams</NavLink>
              <NavLink className="navlinks" to="/contact">Contact us</NavLink>
            </div>
            {isLoggedIn && (
              <div className="flex items-center space-x-4">
                <NavLink className="text-lg font-medium text-blue-950 navlinks cursor-pointer" to="/profile">
                  {userName}
                </NavLink>
                <button
                  className="bg-slate-200 text-blue-950 px-4 py-2 rounded-lg text-lg font-medium hover:bg-blue-950 hover:text-white transition-all hidden md:block md:ml-auto"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Logout
                </button>
              </div>
            )}
            <button className="xl:hidden" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <Bars3Icon className="w-8 h-8 text-slate-900" />
            </button>
          </div>
        </nav>
      </header>

      <LogoutDialog
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        setIsLoggedIn={setIsLoggedIn}
        setUserName={setUserName}
      />

      {mobileNavOpen && (
        <div className="fixed top-0 left-0 bottom-0 w-5/6 max-w-xs z-[9999]">
          <div className="fixed inset-0 bg-black opacity-20" onClick={() => setMobileNavOpen(false)}></div>
          <nav className="relative p-8 w-full h-full bg-white overflow-y-auto">
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <NavLink className="pr-4" to="/" onClick={() => setMobileNavOpen(false)}>
                  <img className="h-10" src={logoiii} alt="RUNTechSpace Logo" />
                </NavLink>
                <button onClick={() => setMobileNavOpen(false)}>
                  <XMarkIcon className="w-8 h-8 text-black" />
                </button>
              </div>
              <div className="flex flex-col gap-8 py-16">
                <NavLink className="max-w-max navlinks" to="/" onClick={() => setMobileNavOpen(false)}>
                  Home
                </NavLink>
                <NavLink className="max-w-max navlinks" to="/course" onClick={() => setMobileNavOpen(false)}>
                  All Courses
                </NavLink>
                <NavLink className="max-w-max navlinks" to="/certification-exam" onClick={() => setMobileNavOpen(false)}>
                  Certification Exams
                </NavLink>
                {isLoggedIn && (
                  <button
                    className="max-w-max navlinks text-left"
                    onClick={() => {
                      setMobileNavOpen(false);
                      setShowLogoutModal(true);
                    }}
                  >
                    Logout
                  </button>
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <NavLink
                  className="inline-flex justify-center items-center text-center w-full h-12 p-5 font-medium tracking-tight text-lg hover:text-white focus:text-white bg-transparent hover:bg-neutral-900 focus:bg-neutral-900 border border-neutral-900 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200"
                  to="/support"
                  onClick={() => setMobileNavOpen(false)}
                >
                  Contact us
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
