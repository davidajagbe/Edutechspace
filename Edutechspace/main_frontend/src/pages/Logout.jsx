import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Logout = () => {
  const { logout, loading } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      // Errors are handled in AuthProvider with toast
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-6">
      <h2 className="text-2xl font-bold text-neutral-900 mb-4">You have been logged out.</h2>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="bg-neutral-900 text-white py-2 px-4 rounded-lg hover:bg-neutral-800 transition"
      >
        Return to Home
      </button>
    </div>
  );
};

export default Logout;