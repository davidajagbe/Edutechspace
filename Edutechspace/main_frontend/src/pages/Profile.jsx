import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user, loading, fetchProfile, deleteAccount } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    console.log('Profile.jsx: useEffect [user, fetchProfile] - Starting');
    const loadProfile = async () => {
      console.log('Profile.jsx: loadProfile - Starting');
      if (!user && !loading) {
        console.log('Profile.jsx: loadProfile - User is null and not loading, fetching profile...');
        try {
          await fetchProfile();
          console.log('Profile.jsx: loadProfile - fetchProfile completed');
        } catch (err) {
          console.error('Profile.jsx: loadProfile - Error fetching profile:', err);
          toast.error('Failed to load profile.');
        }
      } else {
        console.log('Profile.jsx: loadProfile - User already exists or loading:', user);
      }
      console.log('Profile.jsx: loadProfile - Finished');
    };
    loadProfile();
    console.log('Profile.jsx: useEffect [user, fetchProfile] - Finished');
  }, [user, fetchProfile, loading]);

  useEffect(() => {
    console.log('Profile.jsx: useEffect [user] (name parsing) - Starting');
    if (user && user.name) {
      const nameParts = user.name.split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.length > 1 ? nameParts[nameParts.length - 1] : "");
      console.log('Profile.jsx: useEffect [user] (name parsing) - Name set:', firstName, lastName);
    } else {
      console.log('Profile.jsx: useEffect [user] (name parsing) - User or user.name is null/undefined, skipping');
      setFirstName("");
      setLastName("");
    }
    console.log('Profile.jsx: useEffect [user] (name parsing) - Finished');
  }, [user]);

  const handleDeleteConfirmation = () => {
    console.log('Profile.jsx: handleDeleteConfirmation - Opening delete modal');
    setDeleteModalOpen(true);
  };

  const handleDeleteAccount = async () => {
    console.log('Profile.jsx: handleDeleteAccount - Starting account deletion');
    try {
      await deleteAccount();
      toast.success('Account deleted successfully.');
      navigate('/');
      console.log('Profile.jsx: handleDeleteAccount - Account deleted successfully');
    } catch (error) {
      console.error('Profile.jsx: handleDeleteAccount - Error deleting account:', error);
      toast.error('Failed to delete account.');
    } finally {
      setDeleteModalOpen(false);
      console.log('Profile.jsx: handleDeleteAccount - Modal closed');
    }
  };

  const handleCancelDelete = () => {
    console.log('Profile.jsx: handleCancelDelete - Closing delete modal');
    setDeleteModalOpen(false);
  };

  if (loading) {
    console.log('Profile.jsx: Rendering - Loading state');
    return <div className="text-center mt-20 text-lg">Loading profile...</div>;
  }

  if (!user) {
    console.log('Profile.jsx: Rendering - User is null');
    return <div className="text-center mt-20 text-lg">No profile data available</div>;
  }

  console.log('Profile.jsx: Rendering - User data:', user);

  return (
    <div className="bg-gray-50 min-h-screen p-6 relative">
      <div className="absolute top-10 left-0 right-0 h-[300px] bg-blue-950 rounded-3xl z-0 mx-4"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col items-center">
            <img
              src={user.picture || "https://i.pravatar.cc/300"}
              alt={user.name || "User"}
              className="w-48 h-48 object-cover rounded-full border-4 border-blue-950 shadow-lg"
            />
            <h2 className="text-2xl font-semibold mt-4 text-gray-900">
              {user.name || 'John Doe'}
            </h2>
            <p className="text-gray-600">{user.email}</p>

            <div className="flex justify-between gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-700">{user.ongoingcourses || 0}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Ongoing Courses</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-700">{user.completedcourses || 0}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Completed Courses</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Link
                className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition-colors duration-300"
                to="/admin/resource-upload"
              >
                Resource Upload
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                onClick={handleDeleteConfirmation}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 text-sm">First Name</label>
              <input
                type="text"
                value={firstName}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none bg-gray-100 text-gray-700"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Last Name</label>
              <input
                type="text"
                value={lastName}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none bg-gray-100 text-gray-700"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Username</label>
              <input
                type="text"
                value={user.name || ''}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none bg-gray-100 text-gray-700"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Password</label>
              <input
                type="password"
                value={user.password ? '********' : ''}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none bg-gray-100 text-gray-700"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Phone</label>
              <input
                type="tel"
                value={user.phone || ''}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none bg-gray-100 text-gray-700"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Email</label>
              <input
                type="email"
                value={user.email || ''}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none bg-gray-100 text-gray-700"
                readOnly
              />
            </div>
            <div className="md:col-span-2 mb-4">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Weekly Goal</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value="Mon,Wed,Thu"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none bg-gray-100 text-gray-700"
                  readOnly
                />
                <button className="text-blue-600 font-medium underline hover:text-blue-700 focus:outline-none">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={deleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-900"
                  >
                    Confirm Delete Account
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-gray-700">
                      Are you sure you want to permanently delete your account? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={handleCancelDelete}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={handleDeleteAccount}
                    >
                      Delete
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UserProfile;