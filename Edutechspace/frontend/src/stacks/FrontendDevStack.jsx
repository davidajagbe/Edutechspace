// FrontendCourse.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, StarIcon, CheckIcon } from '@heroicons/react/24/solid';
import { InfinityIcon,BarChart3 } from 'lucide-react';
import frontendHeaderImg from '../assets/images/frontendHeaderImage2.jpg';
import htmlImg from '../assets/images/html-image.jpg';
import cssImg from '../assets/images/css-image.jpg';
import jsImg from '../assets/images/js-thumbnail.jpg';
import htmlGuide from '../assets/images/html-guide.jpg';
import cssGuide from '../assets/images/css-guide.png';
import FrontendVideoPdfModal from '../component/dialog/FrontendVideoPdfModal';

// The sections for scroll tracking
const sections = [
  { id: 'overview', title: '📘 Overview' },
  { id: 'benefits', title: '🚀 Key Benefits' },
  { id: 'learn', title: '🧠 What You Will Learn' },
  { id: 'requirements', title: '🧰 What You Will Need' },
  { id: 'pdf', title: '🧾 PDF Resources' },
  { id: 'videos', title: '🎥 Video Resources' },
  { id: 'recommendation', title: 'Course Recommendation' },
];

const FrontendCourse = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Dummy data
  const videoResources = [
    {
      id: 1,
      title: 'Getting Started With HTML',
      description: 'Learn the basics of HTML and how to build your first webpage.',
      duration: '10:25',
      image: htmlImg,
    },
    {
      id: 2,
      title: 'Introduction to CSS',
      description: 'Understand how to style your webpages using CSS.',
      duration: '12:30',
      image: cssImg,
    },
    {
      id: 3,
      title: 'JavaScript Basics',
      description: 'Dive into JavaScript and learn how to make your site interactive.',
      duration: '15:00',
      image: jsImg,
    },
    {
      id: 4,
      title: 'Intro to React Basics',
      description: 'Dive into JavaScript framework, react and learn how to make interactive web applications!',
      duration: '23:00',
      image: jsImg,
    }
  ];

  const pdfResources = [
    {
      id: 1,
      title: 'HTML Beginner Guide',
      description: 'A complete walkthrough on HTML fundamentals.',
      image: htmlGuide,
    },
    {
      id: 2,
      title: 'CSS Design Basics',
      description: 'Understand CSS layout, colors, and visual hierarchy.',
      image: cssGuide,
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
              src={frontendHeaderImg}
              alt="Frontend Development Hero"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 mt-[-135px]">
              <h1 className="text-6xl md:text-7xl md:font-extrabold font-bold text-white mb-2">
                Frontend Development
              </h1>
              <p className="text-lg md:text-2xl text-white font-semibold max-w-2xl">
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
            Learn the fundamentals of frontend web development and build stunning, responsive websites using HTML, CSS, and JavaScript. 
            This course takes you from beginner to advanced level with hands-on projects and real-world examples.
            </p>
          </div>

          {/* Key Benefits Section */}
          <div id="benefits">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">Key Benefits</h2>
            <ul className="space-y-2 text-xl text-neutral-800 pl-6">
                {[
                "Build real-world responsive websites",
                "Learn the latest industry-standard tools",
                "Self-paced learning with access to resources anytime",
                "Project-based learning approach for practical skills",
                "Boost your resume with hands-on experience",
                "Access to mentorship and support community"
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
                "You'll master HTML5",
                "CSS3",
                "JavaScript",
                "Fundamentals",
                "Responsive design",
                "Modern frameworks like React",
                "And best practices for frontend performance and accessibility"
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
            <FrontendVideoPdfModal type={modalType} index={selectedIndex} onClose={() => setShowModal(false)} />
          )}

          {/* Next Course Recommendation */}
          <div className="mb-16 mt-20" id='recommendation'>
            <h2 className="text-3xl font-bold text-blue-950 mb-4">Next Course Recommendation</h2>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Backend Development</h3>
              <p className="text-lg text-neutral-700 mb-4">
                Continue your learning journey by exploring backend technologies like Node.js, Express, and databases.
              </p>
              <Link
                to="/course/backendcourse"
                className="inline-block bg-blue-950 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-800 transition"
              >
                Explore Backend Course
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FrontendCourse;
