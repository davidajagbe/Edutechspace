import React from 'react';
import Navbar from '../component/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';
import ChatBot from '../component/ChatBot'; // Added import for ChatBot component

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
      <ChatBot /> {/* Added ChatBot component */}
    </div>
  );
};

export default MainLayout;