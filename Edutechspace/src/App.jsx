import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from './layout/MainLayout';
import LoadingPage from './pages/LoadingPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import Course from './pages/Course';
import CourseDatabase from './pages/courseDatabase';
import Contact from './pages/contact';
import Profile from './pages/Profile';
import NotFound from './component/NotFoundPage';
import CertificateExam from './pages/CertificationExam';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Ensure the loading screen stays for 3 seconds
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/course' element={<Course />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/coursedatabase' element={<CourseDatabase />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/certification-exam' element={<CertificateExam />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
