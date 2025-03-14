import { createBrowserRouter, createRoutesFromElements, RouterProvider,Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import Course from './pages/Course';
import CourseDatabase from './pages/courseDatabase';
import Contact from './pages/contact';
import Profile from './pages/Profile';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/course' element={<Course/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/coursedatabase' element={<CourseDatabase/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Route>
    )
  )

  return(
    <RouterProvider router={router}/>
  )
}

export default App
