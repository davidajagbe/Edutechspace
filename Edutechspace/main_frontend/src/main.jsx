import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorBoundary from './component/ErrorBoundary.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1045202747081-1o2vm7upt8dbc0851sqgt19u1dka83u0.apps.googleusercontent.com">
      <BrowserRouter> 
        <ErrorBoundary>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);