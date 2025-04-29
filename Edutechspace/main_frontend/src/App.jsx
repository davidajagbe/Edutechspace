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
import ExamPage from './ExamPages/ExamPage';
import {frontendExam} from './ExamPages/Data/FrontendExam';
import { dataScienceExam } from './ExamPages/Data/DataScienceExam';
import { uiuxExam } from './ExamPages/Data/UiUxExam';
import { backendExam } from './ExamPages/Data/BackendExam';
import { aiExam } from './ExamPages/Data/AiExam';
import { cyberSecurityExam } from './ExamPages/Data/CyberSecurityExam';
import CyberSecurityStack from './stacks/CyberSecurityStack';
import FrontendDevStack from './stacks/FrontendDevStack';
import BackendDevStack from './stacks/BackendDevStack';
import DataScienceStack from './stacks/DataScienceStack';
import UiUxStack from './stacks/UiUxStack';
import MLStack from './stacks/MLStack';
import AiStack from './stacks/AiStack';
import UserDashboard from './pages/Dashboard';
import ProtectedRoute from './component/ProtectedRoute';
import AdminUploadPage from './pages/AdminUploadPage';


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
        <Route path='/dashboard' element={<UserDashboard />} />
        <Route path='/coursedatabase' element={<CourseDatabase />} />
        <Route path='/course/frontendcourse' element={<FrontendDevStack />} />
        <Route path='/course/cybersecuritycourse' element={<CyberSecurityStack />} />
        <Route path='/course/backendcourse' element={<BackendDevStack />} />
        <Route path='/course/datasciencecourse' element={<DataScienceStack />} />
        <Route path='/course/mlcourse' element={<MLStack />} />
        <Route path='/course/uiuxcourse' element={<UiUxStack />} />
        <Route path='/course/aicourse' element={<AiStack />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/certification-exam' element={<CertificateExam />} />
        <Route path='/certification-exam/frontend' element={
          <ExamPage 
            title={frontendExam.title}
            instructions={frontendExam.instructions}
            timeLimit={frontendExam.timeLimit}
            passingScore={frontendExam.passingScore}
            onSuccessLink={frontendExam.onSuccessLink}
            questionsData={frontendExam.questionData}
          />
        } />
        <Route path='/certification-exam/datascience' element={<ExamPage {...dataScienceExam} />} />
        <Route path='/certification-exam/uiux' element={<ExamPage {...uiuxExam} />} />
        <Route path='/certification-exam/backend' element={<ExamPage {...backendExam} />} />
        <Route path='/certification-exam/cybersecurity' element={<ExamPage {...cyberSecurityExam} />} />
        <Route path='/certification-exam/AI' element={<ExamPage {...aiExam} />} />
        <Route path='/certification-exam/machine-learning' element={<ExamPage {...aiExam} />} />
      {/* Direct route to admin page (no protection at router level) */}
      <Route path="/admin/resource-upload" element={<AdminUploadPage />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
