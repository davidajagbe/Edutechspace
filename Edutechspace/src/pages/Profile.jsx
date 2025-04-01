import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import learningPathImg from '../assets/images/learning-path.png';
import QuizModal from '../component/dialog/QuizModal';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState('');
  const [overview, setOverview] = useState('');
  const [status, setStatus] = useState(true);
  const [showQuizModal, setShowQuizModal] = useState(false);
  // const navigate = useNavigate();

  const courses = [
    { title: 'Cybersecurity', path: '/course', description: 'Apply for Cybersecurity course.' },
    { title: 'Machine Learning', path: '/course', description: 'Apply for Machine Learning course.' },
    { title: 'Frontend Development', path: '/course', description: 'Apply for Frontend Development courses.' },
    { title: 'Backend Development', path: '/course', description: 'Register for Backend Development courses.' },
    { title: 'Data Analysis', path: '/course', description: 'Apply for Data Analysis course.' },
    { title: 'UI/UX', path: '/course', description: 'Apply for UI/UX course.' },
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-6">
        <header className="flex justify-between items-center border-b pb-4 mb-6 gap-2">
          <h1 className="text-2xl font-bold text-neutral-900">{name || "John Doe"} Dashboard</h1>
          <Link to="/editprofile" className="bg-slate-900 text-white p-2.5 text-[11px] md:text-lg rounded-lg hover:bg-blue-950 transition">
            Edit Profile
          </Link>
        </header>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-800">Overview</h2>
          <p className="text-neutral-700 mt-2">{overview || 'Welcome to the profile page. Discover our journey and achievements.'}</p>
        </section>

        {/* Learning Path Section */}
        <section className="mb-6 bg-slate-50 p-4 rounded-lg shadow-md border border-slate-200 cursor-pointer">
          <h2 className="text-xl font-semibold text-slate-800">Begin your learning path</h2>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4">
              <img src={learningPathImg} alt="Learning Path" className="w-14 h-14 rounded-lg" />
              <div>
                <h3 className="text-lg font-medium text-neutral-900">Introduction to CyberSecurity - 01</h3>
                <p className="text-sm text-neutral-700">Cyber Laws and Measures 
                <span className="ml-3 px-3 py-1 md:text-md text-[5px] font-semibold text-white bg-slate-600 rounded-full relative group" aria-label="work through the course material at your own speed">
                  Self Paced
                  {/* Tooltip */}
                  <span
                    role="tooltip"
                    className="hidden absolute ml-14 w-32 -top-full left-1/2 transform -translate-x-1/2 border-slate-800 bg-slate-400 text-gray-900 text-xs px-2 py-2 rounded group-hover:block"
                  >
                    work through the course material at your own speed
                  </span>
                </span>

                </p>
              </div>
            </div>
            <Link to="/course" className="bg-blue-950 text-white p-3 text-sm md:text-lg rounded-lg hover:bg-slate-900 transition">
              Begin Learning
            </Link>
          </div>
        </section>

        {/* Bio data section */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-neutral-800">Personal Information</h3>
          <div className="mt-2 space-y-2">
            <p><strong>Full Name:</strong> {name || 'John Doe'}</p>
            <p><strong>Date of Birth:</strong> {dob ? new Date(dob).toDateString() : "N/A"}</p>
            <p><strong>Email:</strong> {email || '@email.com'}</p>
            <p><strong>Phone:</strong> {phone || 'N/A'}</p>
            <p><strong>Bio:</strong> {bio || 'Update your bio.'}</p>
          </div>
        </section>

        {/* courses section */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-950">RunTech Learning Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {courses.map((course, index) => (
              <div key={index} className="bg-neutral-50 border border-neutral-300 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-medium text-neutral-900">{course.title}</h3>
                <p className="text-neutral-700 text-sm mt-1">{course.description}</p>
                {status === true ? (
                  <Link to={course.path} className="block mt-2 text-center bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition">
                    Continue Learning
                  </Link>
                ) : (
                  <button className="block w-full mt-2 text-center bg-gray-300 text-gray-700 px-4 py-2 rounded-lg cursor-not-allowed" disabled>
                    Go to course Page
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Free Courses */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-blue-950">Free Courses</h2>
          <p className="text-slate-700 text-lg mt-1">Looking to gain more hands-on experience in your tech learnings?</p>
        </section>
        
        {/* Attempt Quiz Section */}
        <section className="mt-6 ">
          <h2 className="text-2xl font-semibold text-blue-950 ">Join a Runtech Space</h2>
          <p className='text-slate-700 text-lg mb-2'>Test your knowledge with a quick quiz and unlock your spot in our exclusive Runtech community!</p>
          <button
            onClick={() => setShowQuizModal(true)}
            className="bg-blue-950 text-white px-3 py-3 rounded-xl text-lg hover:bg-blue-800 transition"
          >
            Attempt Quiz to Join Runtech Space
          </button>
        </section>
        {showQuizModal && 
          <QuizModal isOpen={showQuizModal} onClose={() => setShowQuizModal(false)} />
        }
      </div>
    </section>
  );
};

export default Profile;
