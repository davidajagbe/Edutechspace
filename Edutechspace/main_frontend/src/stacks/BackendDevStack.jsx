// FrontendCourse.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, StarIcon, CheckIcon } from '@heroicons/react/24/solid';
import { InfinityIcon,BarChart3 } from 'lucide-react';
import backendHeaderImg from '../assets/images/backendImage (1).jpg';
import videoimg1 from '../assets/images/backendImage (3).jpg';
import videoimg2 from '../assets/images/backendImage (2).jpg';
import videoimg3 from '../assets/images/backendImage.jpg';
import pdfimg1 from '../assets/images/backendImagge.jpg';
import pdfimg2 from '../assets/images/css-guide.png';
import BackendVideoPdfModal from '../component/dialog/BackendVideoPdfModal';

// The sections for scroll tracking
const sections = [
  { id: 'overview', title: '📘 Overview' },
  { id: 'benefits', title: '🚀 Key Benefits' },
  { id: 'learn', title: '🎓 What You Will Learn' },
  { id: 'requirements', title: '🧰 What You Will Need' },
  { id: 'pdf', title: '🧾 PDF Resources' },
  { id: 'videos', title: '🎥 Video Resources' },
  { id: 'recommendation', title: 'Course Recommendation' },
];

const BackendCourse = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Dummy data
  const videoResources = [
    {
      id: 1,
      title: 'Introduction to Backend Development',
      description: 'An overview of what backend development is, core responsibilities, technologies used, and how it differs from frontend development',
      duration: '10:25',
      image: videoimg1,
    },
    {
      id: 2,
      title: 'Server, Client & APIs',
      description: 'Understand how servers, clients, and APIs interact in a client-server architecture. Learn about REST and how backend communicates with frontend',
      duration: '12:30',
      image: videoimg2,
    },
    {
      id: 3,
      title: 'Databases & Data Modeling',
      description: 'Learn about relational (SQL) and non-relational (NoSQL) databases, how to model data, and interact with them in backend applications.',
      duration: '15:00',
      image: videoimg3,
    },
    {
      id: 4,
      title: 'Authentication & Authorization',
      description: 'Covers secure login systems, JWTs, OAuth, and role-based access control to protect backend routes and data.',
      duration: '23:00',
      image: videoimg1,
    }
  ];

  const pdfResources = [
    {
      id: 1,
      title: 'Backend Developer Roadmap (PDF)',
      description: 'A RoadMap guiding users on the road to Backend Development',
      image: pdfimg1,
    },
    {
      id: 2,
      title: 'REST API Design Best Practices (PDF)',
      description: 'Understand Restful API creation and best practices.',
      image: pdfimg2,
    },
  ];

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      sections.forEach(({ id }) => {
        const sectionEl = document.getElementById(id);
        if (sectionEl) {
          const rect = sectionEl.getBoundingClientRect();
          if (rect.top < 200 && rect.bottom > 150) {
            setActiveSection(id);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenModal = (type, index = 0) => {
    setModalType(type);
    setSelectedIndex(index);
    setShowModal(true);
  };

  return (
    <div className="bg-neutral-50 min-h-screen w-full">
      {/* Container for timeline (left) + content (right) */}
      <div className="mx-auto flex flex-col lg:flex-row">
        {/* Timeline Nav on the left (hidden on small screens) */}
        <aside className="hidden lg:block lg:w-1/5 sticky top-0 h-screen overflow-auto border-r border-gray-200 p-6">
          <nav className="space-y-4">
            {sections.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group block relative pl-6"
              >
                {/* Vertical line */}
                <span className="absolute left-2 top-0 bottom-0 border-l-2 border-gray-300" />
                {/* Bullet */}
                <span
                  className={`
                    w-3 h-3 rounded-full absolute left-1 top-1.5 
                    ${
                      activeSection === id
                        ? 'bg-blue-900'
                        : 'bg-gray-300 group-hover:bg-blue-600 transition-colors'
                    }
                  `}
                />
                <span
                  className={`ml-4 text-sm font-semibold ${
                    activeSection === id
                      ? 'text-blue-900'
                      : 'text-gray-700 group-hover:text-blue-700'
                  }`}
                >
                  {title}
                </span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="lg:w-4/5 py-3 px-6 lg:px-12 space-y-16">
          {/* Header Section */}
          <div className="relative w-full h-[500px] overflow-hidden pb-32">
            <img
              src={backendHeaderImg}
              alt="Backend Development Hero"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 mt-[-135px]">
              <h1 className="text-6xl md:text-7xl md:font-extrabold font-bold text-slate-900 mb-2">
                Backend Development
              </h1>
              <p className="text-lg md:text-2xl text-slate-900 font-semibold max-w-2xl">
                Master the Art of Building Beautiful, Responsive Websites with HTML, CSS, and JavaScript.
              </p>
            </div>
            {/* Horizontal Badge/Tag Section */}
            <div
              className="
                absolute 
                bottom-[120px] 
                left-1/2 
                transform 
                -translate-x-1/2 
                translate-y-1/2
                w-[90%]
                max-w-4xl
                bg-white 
                rounded-xl 
                shadow-lg 
                px-6 
                py-6 
                flex 
                flex-wrap 
                justify-between 
                gap-4
              "
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-md md:text-xl font-semibold text-blue-950">Beginner Level</p>
                  <BarChart3 className="w-6 h-6 text-blue-950" />
                </div>
                <p className="text-sm text-slate-600">Expected Proficiency</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-md md:text-xl font-semibold text-blue-950">Flexible Schedule</p>
                  <InfinityIcon className="w-6 h-6 text-blue-950" />
                </div>
                <p className="text-sm text-slate-600">Self Paced</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {[...Array(4)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-blue-950" />
                  ))}
                  <p className="text-md md:text-lg font-semibold text-blue-950">4.2 Ratings</p>
                </div>
                <p className="text-sm text-slate-600">Over 4,000 reviews</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map(i => (
                  <UserIcon key={i} className={`w-${i === 3 ? 8 : i + 4} h-${i === 3 ? 8 : i + 4} text-blue-950`} />
                ))}
                </div>
                <p className="text-md md:text-lg font-semibold text-blue-950">200 Students Applied</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-12" id='overview'>
            <h2 className="text-3xl font-bold text-blue-950 mb-4">Course Overview</h2>
            <p className="text-xl text-neutral-800 leading-relaxed">
            This course covers everything you need to get started as a backend developer. From understanding how servers work,
            working with APIs, and databases, to deploying your own full backend services. Whether you're building RESTful APIs
            or securing user data, this course is your complete guide.
            </p>
          </div>

          {/* Key Benefits Section */}
          <div id="benefits">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">Key Benefits</h2>
            <ul className="space-y-2 text-xl text-neutral-800 pl-6">
                {[
                "Hands-on backend project exposure",
                "Access to real-world API examples",
                "Self-paced and beginner-friendly",
                "Project-based learning approach for practical skills",
                "Free PDF + video resources for continuous learning",
                "Access to Runtech community for peer support"
                ].map((benefit, idx) => (
                <li key={idx} className="flex items-center">
                  <CheckIcon className="w-6 h-6 text-slate-500 mr-2" />
                  {benefit}
                </li>
                ))}
            </ul>
          </div>

          {/* Learn Section */}
          <div id="learn">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">What you will learn</h2>
            <ul className="space-y-2 text-xl text-neutral-800 pl-6">
                {[
                "Fundamentals of backend development",
                "Node.js & Express.js",
                "Php & PhpAdmin",
                "Creating and consuming APIs",
                "Database integration (MongoDB, SQL)",
                "Error handling & logging",
                "Deployment & environment management"
                ].map((learn, idx) => (
                <li key={idx} className="flex items-center">
                  <CheckIcon className="w-6 h-6 text-slate-500 mr-2" />
                  {learn}
                </li>
                ))}
            </ul>
          </div>

          {/* Requirements */}
          <div id="requirements">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">What You Will Need</h2>
            <ul className="list-disc pl-6 text-xl text-neutral-800 space-y-2">
              <li>Basic computer literacy</li>
              <li>Access to a computer with internet</li>
              <li>Basic knowledge of JavaScript</li>
              <li>Code editor (like VS Code)</li>
              <li>A desire to learn and build cool stuff</li>
            </ul>
          </div>

          {/* PDF Resources */}
          <div id="pdf">
            <h2 className="text-3xl font-bold text-blue-950 mb-6">PDF Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {pdfResources.map((pdf, index) => (
                <div key={pdf.id} className="bg-white border border-neutral-200 p-6 rounded-xl shadow-md">
                  <img src={pdf.image} alt={pdf.title} className="rounded-lg h-48 w-full object-cover mb-4" />
                  <h4 className="text-2xl font-semibold text-neutral-900 mb-2">{pdf.title}</h4>
                  <p className="text-lg text-neutral-700 mb-4">{pdf.description}</p>
                  <button
                    onClick={() => handleOpenModal('pdfresource', index)}
                    className="bg-slate-900 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-950 transition"
                  >
                    Study Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Video Resources */}
          <div id="videos">
            <h2 className="text-3xl font-bold text-blue-950 mb-6">Video Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {videoResources.map((video, index) => (
                <div key={video.id} className="bg-white border border-neutral-200 p-6 rounded-xl shadow-md">
                  <img src={video.image} alt={video.title} className="rounded-lg h-48 w-full object-cover mb-4" />
                  <h4 className="text-2xl font-semibold text-neutral-900 mb-2">{video.title}</h4>
                  <p className="text-lg text-neutral-700 mb-2">{video.description}</p>
                  <p className="text-sm text-neutral-500 mb-4">Duration: {video.duration}</p>
                  <button
                    onClick={() => handleOpenModal('video', index)}
                    className="bg-slate-900 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-950 transition"
                  >
                    Watch Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {showModal && (
            <BackendVideoPdfModal type={modalType} index={selectedIndex} onClose={() => setShowModal(false)} />
          )}

          {/* Next Course Recommendation */}
          <div className="mb-16 mt-20" id='recommendation'>
            <h2 className="text-3xl font-bold text-blue-950 mb-4">Next Course Recommendation</h2>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">CyberSecurity.</h3>
              <p className="text-lg text-neutral-700 mb-4">
                Continue your learning journey by exploring cybersecurity frameworks.
              </p>
              <Link
                to="/course/cybersecuritycourse"
                className="inline-block bg-blue-950 text-white px-6 py-3 rounded-lg text-lg hover:bg-slate-800 transition"
              >
                Explore Cyber Security Course
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BackendCourse;
