import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Auth/useAuth';

const  ProtectedRoute = ({ requireAdmin = false }) => {
  const { user, isAdmin } = useAuth();
  
  // If no user is found, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
    // Alternative: Show login UI directly instead of redirecting
    // return <LoginComponent />;
  }
  
  // If admin is required but user is not admin
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
};

export default ProtectedRoute;