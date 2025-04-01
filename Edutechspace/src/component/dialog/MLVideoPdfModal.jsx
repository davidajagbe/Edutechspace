import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
const videoresource = "/videos/jsxvideo.mp4";
// import pdfresource from "../assets/pdf/SampleML.pdf";

const videoData = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    src: videoresource,
    requirement: "No prior experience needed — just basic programming knowledge.",
    description: "This video introduces the concept of machine learning, its significance, and how it's used across industries today."
  },
  {
    id: 2,
    title: "Types of Machine Learning",
    src: videoresource,
    requirement: "Watch the Introduction video first.",
    description: "Understand the difference between supervised, unsupervised, and reinforcement learning, along with real-life applications."
  },
  {
    id: 3,
    title: "Data Preprocessing & Feature Engineering",
    src: videoresource,
    requirement: "Basic knowledge of Python and Pandas is helpful.",
    description: "Learn how to clean, prepare, and engineer features to make your machine learning models more effective."
  },
  {
    id: 4,
    title: "Model Training & Evaluation",
    src: videoresource,
    requirement: "Familiarity with ML libraries like scikit-learn recommended.",
    description: "Dive into model building using popular algorithms, and evaluate model performance using metrics like accuracy, precision, and recall."
  },
  {
    id: 5,
    title: "Deep Learning Basics",
    src: videoresource,
    requirement: "Knowledge of neural networks is a plus.",
    description: "Understand neural networks, activation functions, and how deep learning differs from traditional ML."
  },
  {
    id: 6,
    title: "Popular Tools & Frameworks",
    src: videoresource,
    requirement: "No setup required — just observe.",
    description: "Explore tools like TensorFlow, PyTorch, and Jupyter Notebooks, and see a walkthrough of each."
  },
  {
    id: 7,
    title: "Machine Learning Projects",
    src: videoresource,
    requirement: "Completion of earlier videos recommended.",
    description: "Walk through real-world ML project examples like spam detection, housing price prediction, and more."
  },
  {
    id: 8,
    title: "Careers in ML & AI",
    src: videoresource,
    requirement: "At least 5 prior videos should be completed to understand this better.",
    description: "Learn how to break into ML roles, certifications to pursue, and how to build a strong ML portfolio."
  }
];

const pdfData = [
  {
    id: 1,
    title: "ML Roadmap PDF",
    src: "https://www.cs.ox.ac.uk/people/nando.defreitas/machinelearningbook.pdf"
  },
  {
    id: 2,
    title: "Hands-On ML with Scikit-Learn & TensorFlow (PDF)",
    src: "https://github.com/ageron/handson-ml2/blob/master/README.md"
  }
];

const MLVideoPdfModal = ({ type, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isVideo = type === 'video';
  const data = isVideo ? videoData : pdfData;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  useEffect(() => {
    const savedIndex = localStorage.getItem(`current-${type}-index`);
    if (savedIndex) setCurrentIndex(parseInt(savedIndex));
  }, [type]);

  useEffect(() => {
    localStorage.setItem(`current-${type}-index`, currentIndex);
  }, [currentIndex, type]);

  const next = () => {
    if (currentIndex < data.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <DialogPanel className="bg-white p-6 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <DialogTitle className="text-xl sm:text-2xl font-bold mb-4 text-center">{data[currentIndex].title}</DialogTitle>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <button onClick={prev} disabled={currentIndex === 0} className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50">Previous</button>
          <span className="text-sm sm:text-base">{currentIndex + 1} / {data.length}</span>
          <button onClick={next} disabled={currentIndex === data.length - 1} className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50">Next</button>
        </div>

        {isVideo ? (
          <video controls className="w-full h-[200px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded mb-4" src={data[currentIndex].src}></video>
        ) : (
          <iframe
            title={data[currentIndex].title}
            src={data[currentIndex].src}
            className="w-full h-[400px] sm:h-[500px] rounded mb-4"
          ></iframe>
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 my-4">
          {data.map((_, idx) => (
            <span
              onClick={() => setCurrentIndex(idx)}
              key={idx}
              className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${idx === currentIndex ? 'bg-blue-900 scale-125' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Course Outline */}
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <h3 className="text-lg font-semibold mb-2">Requirement</h3>
          <p className="text-sm text-gray-700 mb-3">{data[currentIndex].requirement}</p>

          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-sm text-gray-700">{data[currentIndex].description}</p>
        </div>

        <button onClick={onClose} className="mt-6 w-full bg-blue-950 text-white py-3 rounded-lg text-lg hover:bg-blue-800 transition">Close</button>
      </DialogPanel>
    </Dialog>
  );
};

export default MLVideoPdfModal;
