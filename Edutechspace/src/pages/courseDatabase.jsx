// CourseDatabase.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion";

// Import course images
import cybersecurityImage from '../assets/images/cybersecurityImage.jpg';
import machineLearningImage from '../assets/images/machineLearningImage.jpeg';
import frontendImage from '../assets/images/frontendImage.jpg';
import backendImage from '../assets/images/backendImage.jpg';
import dataScienceImage from '../assets/images/dataScienceImage.png';
import uiuxImage from '../assets/images/uiuxImage.jpg';
import dataAnalysesImage from '../assets/images/dataAnalysesImage.jpg';
import aiImage from '../assets/images/aiImage.jpg';

const courses = [  
  {
    title: 'Frontend Development',
    description: 'Master front-end technologies and frameworks like Web5,React.',
    image: frontendImage,
    link: '/course/frontendcourse',
  },
  {
    title: 'Cybersecurity',
    description: 'Gain essential skills in protecting networks and data.',
    image: cybersecurityImage,
    link: '/course/cybersecurity',
  },
  {
    title: 'Machine Learning',
    description: 'Learn how AI models are built and applied in real-world scenarios.',
    image: machineLearningImage,
    link: '/course/machine-learning',
  },
  {
    title: 'Data Science',
    description: 'Analyze and interpret complex data to inform decisions.',
    image: dataScienceImage,
    link: '/course/data-science',
  },
  {
    title: 'Backend Development',
    description: 'Understand the fundamentals and creation of Resful API. Master back-end languages and frameworks like Vanilla javadcript, Node.js,Django,php',
    image: backendImage,
    link: '/course/backend',
  },
  {
    title: 'UI/UX',
    description: 'Design intuitive and engaging user interfaces and experiences.',
    image: uiuxImage,
    link: '/courses/ui-ux',
  },
  {
    title: 'Data Analyses',
    description: 'Learn techniques to process, analyze, and visualize data effectively.',
    image: dataAnalysesImage,
    link: '/courses/data-analyses',
  },
  {
    title: 'Artificial Intelligence',
    description: 'Explore the concepts and applications of AI.',
    image: aiImage,
    link: '/course/artificial-intelligence',
  },
];

const courseVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.5, // Delay each row by 0.2s
      ease: "easeInOut",
      duration: 0.5,
    },
  }),
};

const CourseDatabase = () => {
  return (
    <section className="bg-neutral-100 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-semibold tracking-tight text-neutral-900 text-center">
          Run Tech Course Database
        </h1>
        <p className="text-xl text-neutral-600 text-center mt-4">
          Discover a list of carefully picked courses with certifications to get you started on your tech journey!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {courses.map((course,index) => (
            <motion.div
              key={course.id}
              variants={courseVariants}
              initial="hidden"
              animate="visible"
              custom={index} // Pass index for stagger effect
            >
              <div key={course.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-neutral-900">{course.title}</h3>
                  <p className="text-neutral-600 mt-2">{course.description}</p>
                  <Link
                    className="inline-block mt-4 bg-neutral-900 text-white py-2 px-4 rounded-lg hover:bg-neutral-800 transition"
                    to={course.link}
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseDatabase;
