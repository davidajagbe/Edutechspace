// LogoutDialog.jsx
import React from 'react';
import { Dialog,DialogPanel,DialogTitle } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LogoutDialog = ({ isOpen, onClose, setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser('');
    onClose();
    navigate('/');
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
    >
      <DialogPanel className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <DialogTitle className="text-lg font-medium text-neutral-900">
          Are you sure you want to logout?
        </DialogTitle>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={handleConfirmLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Yes, Logout
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-neutral-900 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default LogoutDialog;
